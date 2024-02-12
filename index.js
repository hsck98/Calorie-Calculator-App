import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://trackapi.nutritionix.com";
const config = {
  headers: {
            "content-type": "application/json", 
            "x-app-id": "308b9b2d",
            "x-app-key": "c2b027352c8c5e4c7283b1958f0f9ac8" ,
            "x-remote-user-id": 0,
            },
};

const endpoints = {
                    natural: "/v2/natural/nutrients",
                    instant: "/v2/search/instant",
                    item: "/v2/search/item",
                    exercise: "/v2/natural/exercise"
                  };

//Body-Parser module
app.use(bodyParser.urlencoded({extended: true}));

//
app.use(express.static("public"));

app.post("/", async (req, res) => {
  const n_queries = req.body["n_queries"];
  const foods = [];
  var total = {
    food_name: "Total",
    nf_calories: 0,
    nf_total_carbohydrate: 0,
    nf_protein: 0,
    nf_total_fat: 0,
    nf_saturated_fat: 0,
    nf_sugars: 0
  }
  var errors = [];

  var promises = [];
  for(var i=1; i <= n_queries; i++) {
    promises.push(getNutrients(req.body["q" + i]));
  }

  Promise.allSettled(promises)
    .then((results) => {
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const data = result.value.data;  
          var options = [];
          data.foods.forEach((food) => {
            var adjustedFood = adjustNutrients(req.body["w" + (index+1)], req.body["u" + (index+1)], food);
            options.push(adjustedFood);
            total.nf_calories += parseFloat(adjustedFood.nf_calories);
            total.nf_total_carbohydrate +=  parseFloat(adjustedFood.nf_total_carbohydrate);
            total.nf_protein += parseFloat(adjustedFood.nf_protein);
            total.nf_total_fat += parseFloat(adjustedFood.nf_total_fat);
            total.nf_saturated_fat += parseFloat(adjustedFood.nf_saturated_fat);
            total.nf_sugars += parseFloat(adjustedFood.nf_sugars);
          });
          
          foods.push(options);
        } else {
          console.log(result.reason);
          errors.push(result.reason);
        }
      })

      foods.push([total]);
      res.render("index.ejs", {foods: foods,
                              errors: errors});
    });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

function adjustNutrients(weight, unit, food) {
  var originalWeight;
  var adjustedFood = {};

  if (unit == "g") {
    originalWeight = food.serving_weight_grams;
  } else if (unit == "kg") {
    originalWeight = food.serving_weight_grams/1000;
  } else if (unit == "qty") {
    originalWeight = food.serving_qty;
  }

  for (const [key, value] of Object.entries(food)) {
    if (typeof value == "string") {
      adjustedFood[key] = value;
    } else if (typeof value == "number") {
      adjustedFood[key] = ((value / originalWeight) * weight).toFixed(2);
    } else {
      if (key == "full_nutrients") { 
        var adjustedFullNutrients = [];
        value.forEach((nutrient) => {
          adjustedFullNutrients.push({attr_id: nutrient.attr_id,
                                      value: ((nutrient.value / originalWeight) * weight).toFixed(4)
                                    });
        })
        adjustedFood[key] = adjustedFullNutrients;
      } else {
        adjustedFood[key] = value;
      }
    }
  }
  return adjustedFood;
}

async function getNutrients(query) {
  const result = await axios.post(API_URL + endpoints.natural, {query: query}, config);
  return result;
}
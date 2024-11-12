import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { getFoods, getTotal, addFood } from "./examples.js";

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

app.post("/", (req, res) => {
  const nutrients = JSON.parse(req.body["nutrients"]);
  addFood(nutrients);

  res.render("index.ejs", {foods: getFoods(),
                          total: getTotal()});
});

app.get("/", (req, res) => {
  res.render("index.ejs", {foods: getFoods(),
                          total: getTotal()});
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
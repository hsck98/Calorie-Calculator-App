/*
1g carb = 4kcal
1g protein = 4kcal
1g fat = 9kcal
*/

var common_nutrients = [], branded_nutrients = [];

// common_nutrients = [
//   {
//     food_name: "Common 1",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Common 2",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Common 3",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Common 4",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Common 5",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   }
// ]

// branded_nutrients = [
//   {
//     food_name: "Branded 1",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Branded 2",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Branded 3",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Branded 4",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   },
//   {
//     food_name: "Branded 5",
//     nf_calories: 100,
//     nf_protein: 100,
//     nf_total_fat: 100,
//     nf_saturated_fat: 20,
//     nf_total_carbohydrate: 100,
//     nf_sugars: 50,
//     serving_qty: 10,
//     serving_weight_grams: 50
//   }
// ]

function createCalorieChart(index, food_name, calories, carb, protein, fat) {
  console.log(`Create Calorie Chart ${index}`);
  var $chart = $("<canvas>", {id: `chart${index}`, class: "chart"});

  if (food_name != "Total") {
    var first_character = food_name.charAt(0).toUpperCase();
    food_name = first_character + food_name.slice(1);
    $chart.addClass("hide");
  }

  const carb_calories = carb * 4;
  const protein_calories = protein * 4;
  const fat_calories = fat * 9;

  var xValues = ["Carbohydrates", "Proteins", "Fats"];
  var yValues = [carb_calories, protein_calories, fat_calories];
  var barColors = ["#42E2B8", "#F3DFBF", "#EB8A90"];

  new Chart($chart, {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 14,
              family: "Roboto"
            }
          }
        },
        title: {
          display: true,
          text: food_name + " Calorie Distribution (kCal)",
          font: {
            size: 20,
            family: "Roboto",
            style: "bold"
          }
        }
      },
      elements: {
        center: {
          text: calories.toFixed(1),
          color: '#595959', // Default is #000000
          fontStyle: 'Roboto', // Default is Arial
          sidePadding: 30, // Default is 20 (as a percentage)
          minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 25 // Default is 25 (in px), used for when text wraps
        }
      }
    }
  });

  $("#chart_container").append($chart);
}

Chart.register({
  id: 'doughnut-centertext',
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2) - sidePaddingCalculated;            

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart._metasets[chart._metasets.length-1].data[0].innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
            minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
    }
}
});

function openChart(index) {
  $(".chart").addClass("hide");
  $(`#chart${index}`).removeClass("hide");
}

function addFood(type, index) {
  if (type == "common")
    nutrients = common_nutrients[index];
  else if (type == "branded")
    nutrients = branded_nutrients[index];

  $("#w").val(100);
  $("#u").val("g");
  $("#type").val(type);
  $("#index").val(index);

  var adjustedFood = adjustNutrients(100, "g", nutrients);
  setNutrientValues(adjustedFood);
  $("#selected_food").removeClass("hide");
  $("#search_results").addClass("hide");
};

$("#w, #u").on("input", function() {
  var weight;
  if(!$("#w").val())
    weight = 0;
  else 
    weight = parseFloat($("#w").val());

  const unit = $("#u").val();
  const type = $("#type").val();
  const index = $("#index").val();
  
  if (type == "common")
    nutrients = common_nutrients[index];
  else if (type == "branded")
    nutrients = branded_nutrients[index];

  var adjustedFood = adjustNutrients(weight, unit, nutrients);
  setNutrientValues(adjustedFood);
});

function setNutrientValues(nutrients) {
  var first_character = nutrients.food_name.charAt(0).toUpperCase();
  var food_name = first_character + nutrients.food_name.slice(1);
  $("#selected_food_name").text(food_name);
  $("#selected_food_calories").html(nutrients.nf_calories.toFixed(2));
  $("#selected_food_protein").html(nutrients.nf_protein.toFixed(2));
  $("#selected_food_fats").html(nutrients.nf_total_fat.toFixed(2));
  $("#selected_food_saturated_fats").html(nutrients.nf_saturated_fat.toFixed(2));
  $("#selected_food_carbs").html(nutrients.nf_total_carbohydrate.toFixed(2));
  $("#selected_food_sugars").html(nutrients.nf_sugars.toFixed(2));
  $("#nutrients").val(JSON.stringify(nutrients));
}

$(".show_more").click(function(event) {
  event.preventDefault();
  event.stopPropagation();
  var id = $(this).attr("id").slice(3,4);
  
  if($(`#extra_info_${id}`).hasClass("hide")) {
    $(this).find("img").attr("src", "images/collapse.png");
    $(`#extra_info_${id}`).removeClass("hide");
  } else {
    $(this).find("img").attr("src", "images/expand.png");
    $(`#extra_info_${id}`).addClass("hide");
  }
})

const base_URL = "https://trackapi.nutritionix.com/v2/";
const headers = {
  "content-type": "application/json", 
  "x-app-id": "308b9b2d",
  "x-app-key": "c2b027352c8c5e4c7283b1958f0f9ac8" ,
  "x-remote-user-id": 0,
};

$("#search").on("click", function() {
  common_nutrients.length = 0;
  branded_nutrients.length = 0;
  var search_value = $("#search_query").val();
  var common_promises = [];
  var branded_promises = [];
  
  fetch(base_URL + `search/instant/?query=${search_value}`, {
    method: "GET",
    headers: headers
  })
  .then(res => res.json())
  .then(data => {
    var n_common = (data.common.length > 5) ? 5 : data.common.length;
    var n_branded = (data.branded.length > 5) ? 5 : data.branded.length;

    for (var i = 0; i<n_common; i++) {
      common_promises.push(
        fetch(base_URL + "natural/nutrients/",{
          method: "POST",
          headers: headers,
          body: JSON.stringify({ query: data.common[i].food_name})
        })
        .then(res => res.json())
      );
    }

    for (var i = 0; i<n_branded; i++) {
      branded_promises.push(
        fetch(base_URL + `search/item/?nix_item_id=${data.branded[i].nix_item_id}`, {
          method: "GET",
          headers: headers
        })
        .then(res => res.json())
      );
    }

    Promise.allSettled(common_promises)
    .then((results) => {
      results.forEach((result, index) => {
        common_nutrients.push(result.value.foods[0]);
        $("#common_results").append(generateHtml("common", result.value.foods[0], index));
      });
    });

    Promise.allSettled(branded_promises)
    .then((results) => {
      results.forEach((result, index) => {
        branded_nutrients.push(result.value.foods[0]);
        $("#branded_results").append(generateHtml("branded", result.value.foods[0], index));
      });
    });

    $(".blocker").removeClass("hide");
    $(".allow").removeClass("hide");
    $("#search_results").removeClass("hide");
    $("#search_results_title span").html('"' + search_value + '"');
  })
  .catch(err => console.log(err));
});

$(document).mouseup(function(e) 
{
  var container = $(".allow");

  if (!container.is(e.target) && $.contains(container, e.target)) {
      // if the target of the click isn't the container
        container.addClass("hidden");
        $(".blocker").addClass("hide");
  }
});

function generateHtml(type, food, index) {
  return `<div id="${type}_${index}" class="${type}" onClick="addFood('${type}', ${index})">
            <div class="result_foodname">${food.food_name}</div>
            <div class="result_calories">${food.nf_calories} kcal</div>
          </div>`;
}

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
      adjustedFood[key] = parseFloat(((value / originalWeight) * weight));
    } else {
      if (key == "full_nutrients") { 
        var adjustedFullNutrients = [];
        value.forEach((nutrient) => {
          adjustedFullNutrients.push({attr_id: nutrient.attr_id,
                                      value: parseFloat(((nutrient.value / originalWeight) * weight))
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

$(".close_button").on("click", function() {
  $(".blocker").addClass("hide");
  $(".allow").addClass("hide");
  $("#search_results").addClass("hide");
  $("#selected_food").addClass("hide");
})

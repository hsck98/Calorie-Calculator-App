const grapes = {
          food_name: "grapes",
          brand_name: null,
          serving_qty: 10,
          serving_weight_grams: 49,
          nf_calories: 33.81,
          nf_total_fat: 0.08,
          nf_saturated_fat: 0.03,
          nf_total_carbohydrate: 8.87,
          nf_sugars: 7.59,
          nf_protein: 0.35
      }

const doughnut = {
    food_name: "doughnut",
    brand_name: null,
    serving_qty: 1,
    serving_unit: "doughnut, medium",
    serving_weight_grams: 60,
    nf_calories: 252.6,
    nf_total_fat: 13.62,
    nf_saturated_fat: 5.67,
    nf_total_carbohydrate: 28.76,
    nf_sugars: 13.65,
    nf_protein: 3.68,
}

// var total = {
//     food_name: "Total",
//     nf_calories: 286.41,
//     nf_total_carbohydrate: 37.63,
//     nf_sugars: 21.24,
//     nf_protein: 4.03,
//     nf_total_fat: 13.7,
//     nf_saturated_fat: 5.7
// };

var total = {
    food_name: "Total",
    nf_calories: 0,
    nf_total_carbohydrate: 0,
    nf_sugars: 0,
    nf_protein: 0,
    nf_total_fat: 0,
    nf_saturated_fat: 0
};

const foods = [];

export function getFoods() {
    return foods;
}

export function getTotal() {
    return total;
}

export function addFood(food) {
    foods.push(food);
    total.nf_calories += food.nf_calories;
    total.nf_total_carbohydrate += food.nf_total_carbohydrate;
    total.nf_sugars += food.nf_sugars;
    total.nf_protein += food.nf_protein;
    total.nf_total_fat += food.nf_total_fat;
    total.nf_saturated_fat += food.nf_saturated_fat;
}
/*
1g carb = 4kcal
1g protein = 4kcal
1g fat = 9kcal
*/

function createCalorieChart(food_name, carb, protein, fat) {
  console.log("Create Calorie Chart ");
  const carb_calories = carb * 4;
  const protein_calories = protein * 4;
  const fat_calories = fat * 9;

  var data = [{
    values: [carb_calories, protein_calories, fat_calories],
    labels: ["Carbohydrates", "Proteins", "Fats"],
    type: "pie"
  }];

  var layout = {
    title: food_name + " Calorie Distribution",
    height: 400,
    width: 400
  }

  Plotly.newPlot("pieChart", data, layout);
}

$(".add").on("click", () => {
  console.log("Add Row");
  var n = parseInt($(".n_queries").val()) + 1;
  var html = `<div id="fr${n}" class="food_row">
    <input type="text" name="q${n}" id="q${n}" class="query" placeholder="Food name">
    <input type="number" name="w${n}" id="w${n}" class="weight" placeholder="0">
    <select name="u${n}" id="u${n}" class="unit">
      <option value="g">g</option>
      <option value="kg">kg</option>
      <option value="qty">quantity</option>
    </select>
  </div>`;

  $(`#fr${n-1}`).after(html);
  $(".n_queries").val(n);
});

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
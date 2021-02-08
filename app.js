// fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${search}')
//     .then(res=>res.json())
//     .then(data => console.log(data));
document.getElementById("searchBtn").addEventListener("click", function () {
    document.getElementById("mealElement").style.display = 'none';
    const mealName = document.getElementById("mealName").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals == null) {
                getNotification(`Sorry No meal found Please try again.`)
            } else {
                searchMeals(data.meals);
            }
        })

    document.getElementById("mealName").value = "";
    getNotification("");
})
function searchMeals(meals) {
    document.getElementById("mealList").innerHTML = "";
    meals.forEach(meal => {
        console.log(meals);
        const mealDiv = document.createElement("detail");
        mealDiv.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="mealPlate">
            <img src="${meal.strMealThumb}" class="mealImage">
            <h5 class="title text-center">${meal.strMeal}</h5>
            <button id='ing-btn' class="btn btn-success ">check Ingredients</button>
        </div>
        `
        document.getElementById("mealList").appendChild(mealDiv);
    });
}

// check
function getNotification(notificationText) {
    document.getElementById("notification").innerText = notificationText;
}
document.getElementById("mealName").addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("searchBtn").click();
});

// Clicked Item details
function mealDetails(search) {
    console.log(search);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${search}`)
        .then(res => res.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
}
function displayMealDetails(meal) {
    document.getElementById("mealDetailsCard").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="mealSingleImage">
        <h3 class="mealSingleTitle">${meal.strMeal}</h3>
    </div>
    <div>
        <h4 class="space">Ingredients</h4>
         <ul class="space-list" id="ingredientList">
        </ul>
    </div>
    `;

    //  Ingredients.
    let i =0;
    while (i<15){
        let ingredient = 'strIngredient' + i;
        if (meal[ingredient] === "") {
            break;
        }
        else{
        const list = document.createElement("li");
        list.innerHTML = `
            <li class="list"><i class="icon-color fas fa-check-square"></i>
            ${meal[ingredient]}
            </li>
        `;
        document.getElementById("ingredientList").appendChild(list)
        }
        i++;
    }

    document.getElementById("mealElement").style.display = "block";
    
}

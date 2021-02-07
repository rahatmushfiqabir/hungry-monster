// fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
//     .then(res=>res.json())
//     .then(data => console.log(data));

document.getElementById("searchBtn").addEventListener("click", function () {

    
    document.getElementById("mealElement").style.display = 'none';
    showNotification("");

    const mealName = document.getElementById("mealName").value;
    
    if (mealName == "") {
        showNotification("Please Enter a meal name.")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals == null) {
                    showNotification(`No meal found Please try again.`)
                } else {
                    searchMeals(data.meals);
                }
            })
    }
    document.getElementById("mealName").value = "";
})

// check
document.getElementById("mealName").addEventListener("keyup", event => {
    if (event.key === "Enter") document.getElementById("searchBtn").click();
});

function showNotification(notificationText) {
    document.getElementById("notification").innerText = notificationText;
}


function searchMeals(meals) {
    meals.forEach(meal => {
        console.log(meals);
        const mealDiv = document.createElement("detail");
        mealDiv.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="mealPlate">
            <img src="${meal.strMealThumb}" class="mealImage">
            <h5 class="title text-center">${meal.strMeal}</h5>
        </div>
        `
        document.getElementById("mealList").appendChild(mealDiv);
    });
}

// Clicked Item details
function mealDetails(mealId) {
    console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
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
        <h4>  Ingredients</h4>
         <ul id="ingredientList">
        </ul>
    </div>
    `;

   

    //  Ingredients.
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let measure = 'strMeasure' + i;

        if (meal[ingredient] === "" || meal[ingredient] == null) {
            break;
        }

        const li = document.createElement("li");
        li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${meal[measure]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredientList").appendChild(li)
    }

    document.getElementById("mealElement").style.display = "block";
    
}

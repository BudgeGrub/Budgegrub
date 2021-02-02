const firstName = $('#firstName');
const lastName = $('#lastName');
const monthlyIncome = $('#monthlyIncome');
const userLocation = $('#userLocation');
const expense = $('#expense');
const cost = $('#cost');
const categories = $('#categories');
const budgetTarget = $("#budget");
const edit = $("#editIncome")

let budget;
let locations;
let restaurants = {};
let expenses = 0;

//Create object for saving expenses to local Storage
let expenseObj = {};
let capitalExpenseName = "";

//Fixs footer no matter what screen size is.
let interval = setInterval(function () {
    if ($(document).height() > $(window).height()) {
        $('footer').css('position', 'relative');
    } else {
        $('footer').css('position', 'absolute');
    }
}, 100);

//Click event for submission of monthly expense form
$("#form-1-submit").click(function (event) {
    event.preventDefault();
    //Makes sure they input a monthly income and location
    if (monthlyIncome.val() && userLocation.val()) {
        $("#col-1").addClass("hidden");
        $("#col-2").removeClass("hidden");
        budget = parseFloat(monthlyIncome.val());
        //Saves location for use in Yelp Api part of script.
        locations = userLocation.val();

        //Removes disabled attr from restaurant request button
        $("#requestRest").prop("disabled", false);

        edit.removeClass("hidden");

        //Calculates budget (initially will be same as their input if no expenses already made).
        //calcBudget also saves to localStorage
        calcBudget();
        //Save location to localStorage
        setLocalStorage("location", locations);
    }

});
//On click event for expense form submission
$("#form-2-submit").click(function (event) {
    event.preventDefault();
    //Makes sure they input an expense name and cost
    if ($("#expense").val() && $("#cost").val()) {
        //Creates expense but passes in null to indicate this is a new expense instead of coming from localStorage.
        createExpense("");
        //Add expense to expenseObj for localStorage
        expenseObj[capitalExpenseName] = [categories.val(), parseFloat($("#cost").val()).toFixed(2)];

        //Save to localStorage
        setLocalStorage("expense", expenseObj);

        //Clear inputs
        $("#expense").val('');
        $("#cost").val('');
        capitalExpenseName = "";
    }
});
//Animation for the sites header
anime.timeline({ loop: true })
    .add({
        targets: '.ml5 .line',
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 700
    }).add({
        targets: '.ml5 .line',
        duration: 600,
        easing: "easeOutExpo",
        translateY: (el, i) => (-0.625 + 0.625 * 2 * i) + "em"
    }).add({
        targets: '.ml5 .ampersand',
        opacity: [0, 1],
        scaleY: [0.5, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
    }).add({
        targets: '.ml5 .letters-left',
        opacity: [0, 1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=300'
    }).add({
        targets: '.ml5 .letters-right',
        opacity: [0, 1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
    }).add({
        targets: '.ml5',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 3000
    });
//Requewst restaurants from yelp api
$("#requestRest").on("click", function () {
    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search"

    $.ajax({
        url: myurl,

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${atob('RTQzbnlDWU9uYTJrVDFMRTJ0a3VEcTJpMHl5SWFqWFlRdGh1ZDQ2RkhrcUlrZEFZM0RJZHpWQVpnbW4zZzlvczNWeUROaVVZRXBoTTd4MEdUcmthYmxJT2xHUS1vZ3N1NlZtRml4azNad2pQSlBZajBwdDV1R0JoTmFVWllIWXg=')}`,
        },
        method: 'GET',
        data: { term: 'restaurant', location: locations, limit: '5', price: '1' },
    }).then(function (response) {
        for (let i = 0; i < response.businesses.length; i++) {
            restaurants[response.businesses[i].name] = response.businesses[i].coordinates;
            let restData = response.businesses[i];
            console.log(restData);

            let div = $("<div>");
            let img = $("<img>");
            let listItem = $("<li>");
            let h3 = $("<h3>");
            let header = $("<div>");

            header.addClass("carouselHeader mb-0")
            h3.html(restData.name);
            h3.addClass("text-center text-light mb-0");

            listItem.attr("data-target", "#demo")
            listItem.attr("data-slide-to", i);

            img.attr("src", restData.image_url);
            img.addClass("d-block");
            div.addClass("carousel-item mt-0");
            if (i === 0) {
                div.addClass("active");
                listItem.addClass("active");
            }

            $(".carousel-indicators").append(listItem);
            header.append(h3);
            div.append(header);
            div.append(img);
            $("#carouselImages").append(div);
        }
    });
});

//For Calculating budget when a new income has been set
function calcBudget() {
    budget -= parseFloat(expenses);
    budgetTarget.html(`$${(parseFloat(budget)).toFixed(2)}`)
    //Save to local storage
    setLocalStorage("budget", budget);
}

//Calc budget when new expense is added
function subBudget(expense) {
    budget -= parseFloat(expense);
    budgetTarget.html(`$${(parseFloat(budget)).toFixed(2)}`)
    //Update localStorage budget
    setLocalStorage("budget", budget);
}
//Calc budget when expense is removed
function addBudget(removedExpense) {
    budget += parseFloat(removedExpense);
    budgetTarget.html(`$${(parseFloat(budget)).toFixed(2)}`)
    //Update localStorage budget
    setLocalStorage("budget", budget);
}

//Create expense list item;
function createExpense(passedExpense) {
    //Create html elements for list
    let div = $("<div>");
    let span = $("<span>");
    let listItem = $("<li>");
    let button = $("<span>");

    let expenseList = $("#listOfExpenses");
    let expenseCost;

    //checks if new expense or from localStorage. If from localStorage, use expense name and cost.
    if (passedExpense) {
        let expenseName = passedExpense;
        expenseCost = parseFloat(expenseObj[passedExpense][1]);
        capitalExpenseName = expenseName;
        listItem.html(`${capitalExpenseName}: ${parseFloat(expenseCost).toFixed(2)}`);
        listItem.addClass(`list-group-item text-light float-left ${expenseObj[passedExpense][0]}`);
        //Add expense costs to expenses (but dont resubtract from budget)
        expenses += parseFloat(expenseCost);;
    } else if (!passedExpense) {
        let expenseName = $("#expense").val();
        expenseCost = $("#cost").val();
        //Capitalizes the first letter of the name
        let firstLetter = expenseName[0].toUpperCase();
        //Creates new string with capital letter.
        capitalExpenseName += firstLetter;
        for (let i = 1; i < expenseName.length; i++) {
            capitalExpenseName += expenseName[i];
        }
        //Add expense to obj for localStorage with an array of its category and cost.

        listItem.html(`${capitalExpenseName}: ${parseFloat(expenseCost).toFixed(2)}`);
        listItem.addClass(`list-group-item text-light float-left ${categories.val()}`);

        //Adds expense to total expense cost if new and subs from budget.
        expenses += parseFloat(expenseCost);
        subBudget(parseFloat(expenseCost));
    }

    button.html("<i class='fa fa-trash'></i>");
    button.addClass("ml-2 float-right");

    // Click event on trash can to remove expense.
    button.on("click", function () {
        $(this).parent().remove();
        var reAdd = $(this).parent().html().split(":")[1]
        var reAdd2 = parseFloat(reAdd.split("<")[0]);
        //Subrtacts removed expense from costs and recalcs budget
        expenses -= reAdd2;
        addBudget(reAdd2);

        //remove from localStorage obj
        delete expenseObj[$(this).parent().html().split(":")[0]];
        setLocalStorage("expense", expenseObj);
    })

    listItem.append(button);
    span.append(listItem);
    div.append(span);
    expenseList.append(div);
}

function setLocalStorage(k, obj) {
    localStorage.setItem(k, JSON.stringify(obj));
}

function getLocalStorage(k) {
    if (k === "budget") {
        budget = parseFloat(localStorage.getItem(k));
    } else if (k === "expense") {
        expenseObj = JSON.parse(localStorage.getItem(k));
        //If an expenseObj already in localStorage, set ours equal to it and creat the html elements.
        if (expenseObj) {
            for (storedExpense in expenseObj) {
                createExpense(storedExpense);
            }
            //If it doesnt exist, set it back to an empty obj.
        } else {
            expenseObj = {};
        }
    } else if (k === "location") {
        locations = localStorage.getItem(k);
    }
}

edit.on("click", function (event) {
    event.preventDefault();
    $("#col-1").removeClass("hidden")
    $("#col-2").addClass("hidden")
    $(this).addClass("hidden");
});

//Check and retreive from localStorage.
getLocalStorage("budget");
getLocalStorage("expense");
getLocalStorage("location");

//If a budget and location was retreived from localStorage, update them and go to expense form.
if (budget && locations) {
    budgetTarget.html(`$${(parseFloat(budget)).toFixed(2)}`);
    $("#col-1").addClass("hidden");
    $("#col-2").removeClass("hidden");
    $("#editIncome").removeClass("hidden");
    $("#requestRest").prop("disabled", false);
}

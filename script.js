let firstName = $('#firstName');
let lastName = $('#lastName');
let monthlyIncome = $('#monthlyIncome');
let userLocation = $('#userLocation');
let expense = $('#expense');
let cost = $('#cost');
let categories = $('#categories');
let budgetTarget = $("#budget");

let budget;
let locations;
let restaurants = {};
let expenses = 0;

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
        locations = userLocation.val();
        //Sets the budget html to be equal to their monthly budget fixed to 2 decimal places.
        $("#requestRest").prop("disabled", false);
        var edit = $("#editIncome")
        edit.removeClass("hidden")

        edit.on("click", function (event) {
            event.preventDefault();
            $("#col-1").removeClass("hidden")
            $("#col-2").addClass("hidden")
            $(this).addClass("hidden");
        });
        //Calculates budget (initially will be same as their input if no expenses already made)
        calcBudget();
    }

});
//On click event for expense form submission
$("#form-2-submit").click(function (event) {
    event.preventDefault();
    //Makes sure they input an expense name and cost
    if ($("#expense").val() && $("#cost").val()) {
        let expenseName = $("#expense").val();
        let expenseCost = $("#cost").val();
        let expenseList = $("#listOfExpenses");
        //Capitalizes the first letter of the name
        let firstLetter = expenseName[0].toUpperCase();
        //Creates new string with capital letter.
        let newName = "";
        newName += firstLetter;
        for (let i = 1; i < expenseName.length; i++) {
            newName += expenseName[i];
        }

        //Create html elements for list
        let div = $("<div>");
        let span = $("<span>");
        let listItem = $("<li>");
        let button = $("<span>");

        //Create html content for list of expenses and button to remove expense
        listItem.html(`${newName}: ${parseFloat(expenseCost).toFixed(2)}`);
        listItem.addClass(`list-group-item text-light float-left ${categories.val()}`);
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
        })

        listItem.append(button);
        span.append(listItem);
        div.append(span);
        expenseList.append(div);

        //Clear inputs
        $("#expense").val('');
        $("#cost").val('');
        //Adds expense to total expense cost
        expenses += parseFloat(expenseCost);
        subBudget(parseFloat(expenseCost));
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
            'Authorization': 'Bearer L-II2r_Slet4z_EkoQ8O0wf3dRrb_tgQE2q81nmfYx5qT-TnC_Lox30a4ztshh-4S2e9bf7imSQ-dxWdjFXKW9vYQvqV6gLTYb1mCSP9gj4282zbST2TlLbJtJsNYHYx',
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

function setLocalStorage(k, obj) {
    localStorage.setItem(k, JSON.stringify(obj));
}

function getLocalStorage(k, obj) {

}
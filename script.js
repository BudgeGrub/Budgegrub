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

$("#form-1-submit").click(function (event) {
    event.preventDefault();

    if (monthlyIncome.val() && userLocation.val()) {
        $("#col-1").addClass("hidden");
        $("#col-2").removeClass("hidden");
        budget = monthlyIncome.val();
        locations = userLocation.val();
        //Sets the budget html to be equal to their monthly budget fixed to 2 decimal places.
        budgetTarget.html(`$${(parseInt(budget)).toFixed(2)}`);
        $("#requestRest").prop("disabled", false);
        var edit = $("#editIncome")
        edit.removeClass("hidden")
        edit.on("click",function (event) {
            event.preventDefault();
            $("#col-1").removeClass("hidden")
            $("#col-2").addClass("hidden")
        }
        )
    }

});

$("#form-2-submit").click(function (event) {
    event.preventDefault();

    if ($("#expense").val() && $("#cost").val()) {
        let expenseName = $("#expense").val();
        let expenseCost = $("#cost").val();
        let expenseList = $("#listOfExpenses");

        let firstLetter = expenseName[0].toUpperCase();
        //Creates new string with capital letter.
        let newName = "";
        newName += firstLetter;
        for (let i = 1; i < expenseName.length; i++) {
            newName += expenseName[i];
        }

        console.log(newName);

        let div = $("<div>");
        let span = $("<span>");
        let listItem = $("<li>");
        let button = $("<span>");

        listItem.html(`${newName}: ${expenseCost}`);
        listItem.addClass("list-group-item text-dark float-left");
        button.html("<i class='fa fa-trash'></i>");
        button.addClass("ml-2 float-right");

        listItem.append(button);
        span.append(listItem);
        div.append(span);
        expenseList.append(div);

        //Clear inputs
        $("#expense").val('');
        $("#cost").val('');
        //Subtracts expense cost from budget and reupdates html
        budget -= parseFloat(expenseCost);
        console.log(budget);
        budgetTarget.html(`$${(parseFloat(budget)).toFixed(2)}`)
    }
});



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
        console.log(response);
        for (let i = 0; i < response.businesses.length; i++) {
            restaurants[response.businesses[i].name] = response.businesses[i].coordinates;
        }
        console.log(restaurants);
    });
});

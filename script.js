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
    }
});

$("#form-2-submit").click(function (event) {
    event.preventDefault();

    if ($("#expense").val() && $("#cost").val()) {
        let expenseName = $("#expense").val();
        let expenseCost = $("#cost").val();
        let expenseList = $("#listOfExpenses");

        let listItem = $("<li>");
        listItem.html(`${expenseName}: ${expenseCost}`);
        expenseList.append(listItem);

        //Clear inputs
        $("#expense").val('');
        $("#cost").val('');
    }
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
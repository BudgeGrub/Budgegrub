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

$("#form-1-submit").click(function (event) {
    event.preventDefault();

    if (monthlyIncome.val() && userLocation.val()) {
        $("#col-1").addClass("hidden");
        $("#col-2").removeClass("hidden");

        budget = monthlyIncome.val();
        locations = userLocation.val();
        //Sets the budget html to be equal to their monthly budget fixed to 2 decimal places.
        budgetTarget.html(`$${(parseInt(budget)).toFixed(2)}`);
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
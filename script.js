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
    event.stopPropagation();
    if (monthlyIncome.val() && userLocation.val()) {
        $("#col-1").addClass("hidden");
        $("#col-2").removeClass("hidden");

        budget = monthlyIncome.val();
        locations = userLocation.val();
        budgetTarget.html(budget);
    }
});

$("#form-2-submit").click(function (event) {
    event.preventDefault();
    event.stopPropagation();

    if ($("#expense").val() && $("#cost").val()) {
        let expenseName = $("#expense").val();
        let expenseCost = $("#cost").val();
        let expenseList = $("#listOfExpenses");

        let listItem = $("<li>");
        listItem.html(`${expenseName}: ${expenseCost}`);
        expenseList.append(listItem);
        console.log(listItem);

        //Clear inputs
        $("#expense").val('');
        $("#cost").val('');
    }
});
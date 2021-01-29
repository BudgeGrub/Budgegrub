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

        //Sheree work here
        // create button
        //Add html to button
        //Append button to page
        //give click function to button
        //When clicked remove hidden class from col-1
        //Give hidden class col-2
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
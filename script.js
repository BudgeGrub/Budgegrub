let firstName = $('#firstName');
let lastName = $('#lastName');
let monthlyIncome = $('#monthlyIncome');
let userLocation = $('#userLocation');
let expense = $('#expense');
let cost = $('#cost');
let categories = $('#categories');
let budgetTarget = $('#budget');

let budget;
let locations;

$('#form-1-submit').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (monthlyIncome.val() && userLocation.val()) {
        $('#col-1').addClass('hidden');
        $('#col-2').removeClass('hidden');
        budget = monthlyIncome.val();
        locations = userLocation.val();
        budgetTarget.html(budget);
        console.log(budget)
    }
});



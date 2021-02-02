const profileBtn = $("#profileSubmit");
const profileName = $("#profileName");

//Creat obj for storing profiles.
let profiles = {};

getLocalStorage();

profileBtn.on("click", function (event) {
    event.preventDefault();

    if (profileName.val()) {
        liCreate(profileName.val());

        //Add to object for storage reasons.
        profiles[profileName.val()] = "x";

        setLocalStorage();
    }
})

function setLocalStorage() {
    console.log(profiles);
    localStorage.setItem("profiles", JSON.stringify(profiles));
}

function getLocalStorage() {
    let storedObjs = JSON.parse(localStorage.getItem("profiles"));

    if (storedObjs) {
        profiles = storedObjs;

        for (let obj in storedObjs) {
            liCreate(obj);
        }
    }
}

function liCreate(name) {
    let listItem = $("<li>");
    let span = $("<span>");
    let button = $("<button>");

    listItem.html(`${name}`);
    listItem.addClass("float-left");

    button.html("X");
    button.addClass("li-btn float-right");
    span.addClass("list-group-item");

    button.click(liRemoval);

    span.append(listItem);
    span.append(button);
    $("ul").append(span);
}

function liRemoval(event) {
    event.preventDefault();
    $(this).parent().remove();

    console.log($(this).parent().html().split(">")[1].split("<")[0]);

    //Delete the profile for button clicked.
    //Formatted with some text that contains a part like ...>(profile name)<... so this just cleans up the text and grabs the profile name
    delete profiles[`${$(this).parent().html().split(">")[1].split("<")[0]}`]
    setLocalStorage();
}
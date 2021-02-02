const profileBtn = $("#profileSubmit");
const profileName = $("#profileName");

//Creat obj for storing profiles.
let profiles = {};

getLocalStorage();

profileBtn.on("click", function (event) {
    event.preventDefault();

    if (profileName.val()) {
        let listItem = $("<li>");
        listItem.html(`${profileName.val()}`);
        listItem.addClass("list-group-item");

        $("ul").append(listItem);

        //Add to object for storage reasons.
        profiles[profileName.val()] = "x";

        setLocalStorage(profileName.val());
    }
})

function setLocalStorage(k) {
    console.log(profiles);
    localStorage.setItem("profiles", JSON.stringify(profiles));
}

function getLocalStorage() {
    let storedObjs = JSON.parse(localStorage.getItem("profiles"));

    for (let obj in storedObjs) {
        let listItem = $("<li>");
        listItem.html(`${obj}`);
        listItem.addClass("list-group-item");

        $("ul").append(listItem);

        //Add to object for storage reasons.
        profiles[profileName.val()] = "x";
    }
}
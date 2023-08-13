
// Get the objects we need to modify
let updateFeedingEventForm = document.getElementById('updateFeedingEventForm');

// Modify the objects we need
updateFeedingEventForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let feedingEventID = document.getElementById("updateFeedingEventID").value;
    let animalID = document.getElementById("updateAnimalID").value;
    let keeperID = document.getElementById("updateKeeperID").value;
    let foodID = document.getElementById("updateFoodID").value;
    let date = document.getElementById("updateDate").value;
    let time = document.getElementById("updateTime").value;

    if (date == '') {
        date = getPreviousValue(1, feedingEventID)
    };
    if (time == '') {
        time = getPreviousValue(2, feedingEventID)
    };
    if (foodID == ''){
        foodID = getPreviousValue(3, feedingEventID)
    };
    if (animalID == ''){
        animalID = getPreviousValue(4, feedingEventID)
    };
    if (keeperID == ''){
        keeperID = getPreviousValue(5, feedingEventID)
    };

    // Put our data we want to send in a javascript object
    let data = {
        feedingEventID: feedingEventID,
        animalID: animalID,
        keeperID: keeperID,
        foodID: foodID,
        date: date,
        time: time
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-feedingEvent", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, feedingEventID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            console.log(xhttp.status)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, feedingEventID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("feedingEvents-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == feedingEventID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let dateCol = updateRowIndex.getElementsByTagName('td')[1];
            dateCol.innerHTML = parsedData[0].date;

            let timeCol = updateRowIndex.getElementsByTagName('td')[2];
            timeCol.innerHTML = parsedData[0].time;

            let foodCol = updateRowIndex.getElementsByTagName('td')[3];
            foodCol.innerHTML = parsedData[0].foodID;

            let animalCol = updateRowIndex.getElementsByTagName("td")[4];
            animalCol.innerHTML = parsedData[0].animalID;

            let keeperCol = updateRowIndex.getElementsByTagName('td')[5];
            keeperCol.innerHTML = parsedData[0].keeperID;

       }
    }
}

function getPreviousValue(attribute, id){
    /*
    A function to get the previous value of an attribute when submitting the update form
    with an empty value. Pass the attribute as the column number and the associated id.
    */

    let table = document.getElementById("feedingEvents-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == id) {

            // Get the location of the row where we found the matching associated ID
            let rowIndex = table.getElementsByTagName("tr")[i];

            // Get td of the previous value
            let td = rowIndex.getElementsByTagName("td")[attribute];

            // Return the previous value
            return td.textContent;
       }
    }
}
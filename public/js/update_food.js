
// Get the objects we need to modify
let updateFoodForm = document.getElementById('updateFoodForm');

// Modify the objects we need
updateFoodForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let foodID = document.getElementById("updateFoodID").value;
    let foodName = document.getElementById("udpatedFoodName").value;
    let foodGroup = document.getElementById("updatedFoodGroup").value;

    if (foodName == ''){
        foodName = getPreviouseValue(1, foodID);
    };
    if (foodGroup == ''){
        foodGroup = getPreviouseValue(2, foodID);
    };

    // Put our data we want to send in a javascript object
    let data = {
        foodID : foodID,
        foodName: foodName,
        foodGroup: foodGroup
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-food", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, foodID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            console.log(xhttp.status)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, foodID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("food-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == foodID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let foodNameCol = updateRowIndex.getElementsByTagName("td")[1];
            foodNameCol.innerHTML = parsedData[0].foodName;

            let foodGroupCol = updateRowIndex.getElementsByTagName('td')[2];
            foodGroupCol.innerHTML = parsedData[0].foodGroup;
       }
    }
}

function getPreviousValue(attribute, id){
    /*
    A function to get the previous value of an attribute when submitting the update form
    with an empty value. Pass the attribute as the column number and the associated id.
    */

    let table = document.getElementById("food-table");

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

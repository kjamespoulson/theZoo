
// Get the objects we need to modify
let updateFoodForm = document.getElementById('update-foodForm');

// Modify the objects we need
updateFoodForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFoodName = document.getElementById("mySelect");
    let updatedFoodName = document.getElementById("udpated-foodName");
    let updatedFoodGroup = document.getElementById("updated-foodGroup");

    // Get the values from the form fields
    let oldNameValue = inputFoodID.value;
    let newNameValue = updatedFoodGroup.value;
    let foodGroupValue = updatedFoodGroup.value;

    // Put our data we want to send in a javascript object
    let data = {
        foodID : oldNameValue,
        foodName: newNameValue,
        foodGroup: foodGroupValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-food", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, oldNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
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
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

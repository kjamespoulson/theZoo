
// Get the objects we need to modify
let updateAnimalForm = document.getElementById('updateAnimalForm');

// Modify the objects we need
updateAnimalForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    console.log("I am in updateAnimal.js")
    // Get form fields we need to get data from
    let animalID = document.getElementById("animalID").value;
    let species = document.getElementById("updateSpecies").value;
    let animalName = document.getElementById("updateAnimalName").value;
    let diet = document.getElementById("updateDiet").value;
    
    // Put our data we want to send in a javascript object
    let data = {
        animalID: animalID,
        species: species,
        animalName: animalName,
        diet: diet,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateAnimalForm", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, animalID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
            console.log(xhttp.status)
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, animalID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("people-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

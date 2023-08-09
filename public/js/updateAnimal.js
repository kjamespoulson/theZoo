
// Get the objects we need to modify
let updateAnimalForm = document.getElementById('updateAnimalForm');

// Modify the objects we need
updateAnimalForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let animalID = document.getElementById("updateAnimalID").value;
    let species = document.getElementById("updateSpecies").value;
    let animalName = document.getElementById("updateAnimalName").value;
    let diet = document.getElementById("updateDiet").value;

    // If an empty value is passed, we will update the row with the previous data
    if(species == ""){
        species = getPreviousValue(1, animalID)
    };
    if(animalName == ""){
        animalName = getPreviousValue(2, animalID)
    };
    if(diet == ""){
        diet = getPreviousValue(3, animalID)
    };
    
    // Put our data we want to send in a javascript object
    let data = {
        animalID: animalID,
        species: species,
        animalName: animalName,
        diet: diet,
    }
    
    console.log(data)
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-animal", true);
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
    
    let table = document.getElementById("animals-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == animalID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of species value
            let speciesCol = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign species to our value we updated to
            speciesCol.innerHTML = parsedData[0].species; 

            // Get td of animalName value
            let nameCol = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign animalName to our value we updated to
            nameCol.innerHTML = parsedData[0].animalName; 
            
            // Get td of animalName value
            let dietCell = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign animalName to our value we updated to
            dietCell.innerHTML = parsedData[0].diet;
       }
    }
}

function getPreviousValue(attribute, id){
    /*
    A function to get the previous value of an attribute when submitting the update form
    with an empty value. Pass the attribute as the column number and the associated id.
    */
       
    let table = document.getElementById("animals-table");

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
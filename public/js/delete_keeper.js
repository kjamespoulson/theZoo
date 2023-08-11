// Create an event listener for deleteAnimalForm
//let deleteKeeperForm = document.getElementById('deleteKeeperForm');
//deleteKeeperForm.addEventListener("submit", function(e){
//  e.preventDefault();

    // Get the animal id from the deleteAnimalForm and then pass to the deleteAnimal function
//    let keeperID = document.getElementById("deleteKeeper").value;
//    deleteKeeper(keeperID)
//});

function deleteKeeper(keeperID) {
  let data = {
      id: keeperID
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-keeper", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  
  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {

        // Add the new data to the table
        deleteRow(keeperID);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 204) {
        console.log("There was an error with the input.")
        console.log(xhttp.status)
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(keeperID){
  let table = document.getElementById("keepers-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == keeperID) {
      table.deleteRow(i);
      break;
    }
  }
};
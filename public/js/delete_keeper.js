// Create an event listener for deleteAnimalForm
let deleteKeeperForm = document.getElementById('deleteKeeperForm');
deleteKeeperForm.addEventListener("submit", function(e){
  e.preventDefault();

    // Get the animal id from the deleteAnimalForm and then pass to the deleteAnimal function
    let keeperID = document.getElementById("deleteKeeper").value;
    deleteKeeper(keeperID)
});

function deleteKeeper(id) {
  const data = {
      keeperID: id
  };
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "DELETE", "/delete-keeper", false );
  xmlHttp.setRequestHeader("Content-type", "application/json");
  
  // Tell our AJAX request how to resolve
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 204) {

        // Add the new data to the table
        deleteRow(data.keeperID);

    }
    else if (xmlHttp.readyState == 4 && xmlHttp.status != 204) {
        console.log("There was an error with the input.")
        console.log(xmlHttp.status)
    }
  }

  // Send the request and wait for the response
  xmlHttp.send(JSON.stringify(data));
}

function deleteRow(keeperID){
  let table = document.getElementById("animals-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    if (table.rows[i].getAttribute("data-value") == keeperID) {
      table.deleteRow(i);
      console.log(table)
      break;
    }
  }
};
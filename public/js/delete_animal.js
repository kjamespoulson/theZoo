/*
function deleteAnimal(animalID) {
    let link = '/delete-animal-ajax/';
    let data = {
      animalID: animalID
    };
    console.log("sending to server...")
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(animalID);
    }
  });
};
*/
  function deleteAnimal(id) {
    const data = {
        animalID: id
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", "/delete-animal", false );
    xmlHttp.setRequestHeader("Content-type", "application/json");
    
    // Tell our AJAX request how to resolve
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 204) {

          // Add the new data to the table
          deleteRow(data.animalID);

      }
      else if (xmlHttp.readyState == 4 && xmlHttp.status != 204) {
          console.log("There was an error with the input.")
          console.log(xmlHttp.status)
      }
  }

  // Send the request and wait for the response
  xmlHttp.send(JSON.stringify(data));
  console.log("sending request")
}

  function deleteRow(animalID){
    console.log("deleting row")  
    let table = document.getElementById("animals-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      console.log("does this: ",table.rows[i].getAttribute("data-value"))
      console.log("Equal this: ", animalID)
      if (table.rows[i].getAttribute("data-value") == animalID) {
        table.deleteRow(i);
        console.log(table)
        break;
      }
    }
  }
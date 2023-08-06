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
  }
  
  function deleteRow(animalID){
    console.log("deleting row")  
    let table = document.getElementById("animal-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == animalID) {
              table.deleteRow(i);
              break;
         }
      }
  }
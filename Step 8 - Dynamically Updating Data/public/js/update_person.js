
// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-person-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputHomeworld = document.getElementById("input-homeworld-update");
    let inputAge = document.getElementById("input-age-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let homeworldValue = inputHomeworld.value;
    let ageValue = inputAge.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(homeworldValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        homeworld: homeworldValue,
        //age: ageValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-person-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

            inputAge.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    
    let table = document.getElementById("people-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdHomeworld = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            tdHomeworld.innerHTML = parsedData.planets[0].name;
            
            // Get td of age value
            let tdAge = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign age to our value we updated to
            tdAge.innerHTML = parsedData.personUpdated[0].age; 
       }
    }
}



var selectedRow = null
var employeeIDs = []; 
const editForm = document.getElementById("editForm");
const  addFrorm= document.getElementById("addForm");
// var action=document.querySelector("#edit")
// action.onclick=function(){
//     modal.classList.add("active");
// }
 let prebvId;
//function after submit
function onFormSubmit() {
   
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            console.log("added");
        }
        resetForm();
        
    }
}

function readFormData() {
    var formData = {};
    formData["employeeID"] = document.getElementById("employeeID").value;
    formData["employeeName"] = document.getElementById("employeeName").value;
    formData["employeeAge"] = document.getElementById("employeeAge").value;
    formData["employeeGender"] = document.getElementById("employeeGender").value;
    return formData;
}
function readEditData() {
    const formData = {};
    formData["employeeID"] = document.getElementById("ID").value;
    formData["employeeName"] = document.getElementById("Name").value;
    formData["employeeAge"] = document.getElementById("Age").value;
    formData["employeeGenderr"] = document.getElementById("Gender").value;
    return formData;
  }

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    if (employeeIDs.includes(data.employeeID)) {
        var i_message="EmployeeID already used"
          document.getElementById("id-error").innerHTML=i_message;
         return;
      }
      else{
        document.getElementById("id-error").innerHTML = "";
      }
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.employeeID;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.employeeName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.employeeAge;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.employeeGender;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button id="edit" onclick="onEdit(this)">Edit</button>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button  id="delete" style="width: 100px;
    height: 30px;background-color: red;
    color: #FFFFFF;
    
    border-radius: 10px;
    margin:0; font-size:15px"onclick="onDelete(this)">Delete</button>`;
    employeeIDs.push(data.employeeID); 
    console.log(employeeIDs);
    console.log(table);
      
                }

// to close editform
function closeForm() {
        document.getElementById("myForm").style.display = "none";
                  }        

// to reset form
function resetForm() {
    document.getElementById("employeeID").value = "";
    document.getElementById("employeeName").value = "";
    document.getElementById("employeeAge").value = "";
    document.getElementById("employeeGender").value = "";
    selectedRow = null;
    document.getElementById("name-error").innerHTML = "";
    document.getElementById("age-error").innerHTML = ""
}



// to edit record
function onEdit(td) {
    selectedRow = event.target.parentElement.parentElement;
    prebvId = selectedRow.cells[0].innerHTML;
    console.log("prebvId",prebvId);
    document.getElementById("ID").value = Number(selectedRow.cells[0].innerHTML);
    document.getElementById("Name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Age").value = Number(selectedRow.cells[2].innerHTML );
    document.getElementById("Gender").value = selectedRow.cells[3].innerHTML;
    
    document.getElementById("myForm").style.display = "block";
}


  
    

// to update record
function onUpdate() {
   
  event.preventDefault();
  let formData = readEditData();
  if (formData.employeeID !== prebvId && employeeIDs.includes(formData.employeeID)) {
    var id_message = "Employee ID already exists";
    document.getElementById("i-error").innerHTML = id_message;
  } else {
   
    updateRecord(formData);
    closeForm();
    document.getElementById("i-error").innerHTML = "";
    console.log("Updated");
  
    // Remove the previous employee ID from the employeeIDs array
    var index = employeeIDs.indexOf(prebvId);
    console.log("prebvId",prebvId);
    if (index !== -1) {
      employeeIDs.splice(index, 1);
    }
    console.log(employeeIDs);
  }
}
function updateRecord(formData) {
        selectedRow.cells[0].innerHTML = formData.employeeID;
        selectedRow.cells[1].innerHTML = formData.employeeName;
        selectedRow.cells[2].innerHTML = formData.employeeAge;
        selectedRow.cells[3].innerHTML.trim = formData.employeeGender;
        employeeIDs.push(formData.employeeID); 
        console.log(employeeIDs);
        
      }

// to delete record
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

// to validate Add form
function validate() {
    isValid = true;
    var employeeName = document.getElementById('employeeName').value;
    var employeeAge = parseInt(document.getElementById('employeeAge').value);
     isValid = true;
    // Validate employee name
    var Regex = /^[a-zA-Z ]+$/;
    if (Regex.test(employeeName)) {
      isValid = true;
    }
    else{
      var n_message="name format is incorrect"
          document.getElementById("name-error").innerHTML=n_message;
          isValid = false;
    }
   // Validate employee age
   if (employeeAge < 18 || employeeAge > 60) {
    var a_message="candidate is not valid"
          document.getElementById("age-error").innerHTML=a_message;
          isValid = false;
   }
          return isValid;
  }



// To validate Editform
  function editValidate() {
    var employeeName = document.getElementById('Name').value;
    var employeeAge = parseInt(document.getElementById('Age').value);
    isValid = true;
    // Validate employee name
    var Regex = /^[a-zA-Z ]+$/;
    if (Regex.test(employeeName)) {
      isValid = true;
    }
    else{
      var n_message="name format is incorrect"
          document.getElementById("n-error").innerHTML=n_message;
          isValid = false;
    }
   // Validate employee age
   if (employeeAge < 18 || employeeAge > 60) {
    var a_message="candidate is not valid"
          document.getElementById("a-error").innerHTML=a_message;
          isValid = false;
   }
          return isValid;
  }


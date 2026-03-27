const pullDatabase = document.getElementById("DB-Button");



async function pullClicked(event) {
    
    const response = await fetch("/db");
    const responseData = await response.json();

    let idList = document.getElementById("ID");
    let nameList = document.getElementById("Username");
    let passList = document.getElementById("Password");
    let accessList = document.getElementById("AccessLevel");
    let departmentList = document.getElementById("Department");

    while (idList.hasChildNodes()){
        idList.removeChild(idList.firstChild);
    }

    while (nameList.hasChildNodes()){
        nameList.removeChild(nameList.firstChild);
    }

    while (passList.hasChildNodes()){
        passList.removeChild(passList.firstChild);
    }

    while (accessList.hasChildNodes()){
        accessList.removeChild(accessList.firstChild);
    }

    while (departmentList.hasChildNodes()){
        departmentList.removeChild(departmentList.firstChild);
    }

    for (i = 0; i < responseData.length; ++i) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(responseData[i].StaffID));
        idList.appendChild(li)
    } 

    for (i = 0; i < responseData.length; ++i) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(responseData[i].Username));
        nameList.appendChild(li)
    } 

    for (i = 0; i < responseData.length; ++i) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(responseData[i].Password));
        passList.appendChild(li)
    } 

    for (i = 0; i < responseData.length; ++i) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(responseData[i].AccessLevel));
        accessList.appendChild(li)
    } 

    for (i = 0; i < responseData.length; ++i) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(responseData[i].Department));
        departmentList.appendChild(li)
    } 

}


pullDatabase.addEventListener('click', pullClicked)
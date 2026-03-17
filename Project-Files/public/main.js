const pushDatabase = document.getElementById("Input-Button");

async function pushClicked(event) {
    const nameParam = document.getElementById("Name-Input").value;
    const ageParam = document.getElementById("Age-Input").value;
    const miscParam = document.getElementById("Misc-Input").value;

    let data = {
        name: nameParam,
        age: ageParam,
        misc: miscParam
    };

    const response = await fetch("/example", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

}

pushDatabase.addEventListener('click', pushClicked)
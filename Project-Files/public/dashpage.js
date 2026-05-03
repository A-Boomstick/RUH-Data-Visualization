

async function Loaded(event) {

    

    const response = await fetch("/tasks");
    const responseData = await response.json();
    let ns = 0;
    let d = 0;
    let m = 0;
    let e = 0;


    for (let i = 0; i < responseData.length; i++) {
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let bar = document.createElement("div");


        if (responseData[i].CompletionStatus == "Not Started") {
            ns++;
            let div = document.getElementsByClassName("bar-group")[0];
            bar.className = "bar not-started";
            div.appendChild(bar);
            
            
            bar.appendChild(p1);
            bar.appendChild(p2);
            bar.appendChild(p3);
            bar.appendChild(p4);

            p1.innerText = responseData[i].TaskName;
            p2.innerText = responseData[i].SetDate;
            p3.innerText = responseData[i].DueDate;
            p4.innerText = responseData[i].Description;
        } else if (responseData[i].CompletionStatus == "Developing") {
            d++;
            let div = document.getElementsByClassName("bar-group")[1];
            bar.className = "bar developing";
            div.appendChild(bar);
            
            
            bar.appendChild(p1);
            bar.appendChild(p2);
            bar.appendChild(p3);
            bar.appendChild(p4);

            p1.innerText = responseData[i].TaskName;
            p2.innerText = responseData[i].SetDate;
            p3.innerText = responseData[i].DueDate;
            p4.innerText = responseData[i].Description;
        } else if (responseData[i].CompletionStatus == "Maturing") {
            m++;
            let div = document.getElementsByClassName("bar-group")[2];
            bar.className = "bar maturing";
            div.appendChild(bar);
            
            
            bar.appendChild(p1);
            bar.appendChild(p2);
            bar.appendChild(p3);
            bar.appendChild(p4);

            p1.innerText = responseData[i].TaskName;
            p2.innerText = responseData[i].SetDate;
            p3.innerText = responseData[i].DueDate;
            p4.innerText = responseData[i].Description;
        } else if (responseData[i].CompletionStatus == "Embedded") {
            e++;
            let div = document.getElementsByClassName("bar-group")[3];
            bar.className = "bar embedded";
            div.appendChild(bar);
            
            
            bar.appendChild(p1);
            bar.appendChild(p2);
            bar.appendChild(p3);
            bar.appendChild(p4);

            p1.innerText = responseData[i].TaskName;
            p2.innerText = responseData[i].SetDate;
            p3.innerText = responseData[i].DueDate;
            p4.innerText = responseData[i].Description;
        }
    }

    let nsCount = document.getElementById("ns-count");
    nsCount.innerText = "Tasks: " + ns;

    let dCount = document.getElementById("d-count");
    dCount.innerText = "Tasks: " + d;

    let mCount = document.getElementById("m-count");
    mCount.innerText = "Tasks: " + m;

    let eCount = document.getElementById("e-count");
    eCount.innerText = "Tasks: " + e;


};

window.onload = Loaded();


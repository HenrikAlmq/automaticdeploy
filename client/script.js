const sendMail = async () => {
    const input = document.querySelector("input")
    const mail = {mail: input.value}
    //Gör en fetch mot backend-servern med anrop post, i anropet/headern så specar jag content-type, i bodyn (datan) skickar jag med mailadressen.
     const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
    });

    //Sparar ner responset från servern i variablen data.
    const data = await response.json();
    console.log(data);
    //Om requested gick bra så rensar jag värdet i input.value samt skriver ut ett meddelande till användaren.
    if(data.sucess) {
        input.value = "";
        document.querySelector("p").innerHTML = "Tack för din mailadress!"
    }
};

document.querySelector("button").addEventListener("click", sendMail);

const getMail = async () => {
    const response = await fetch("http://localhost:5000/emails")
    const data = await response.json();

    console.log(data);

    return data;
}
async function printData() {
    const getData = await getMail();
    console.log(getData);
    
    let getUser = document.getElementById('username');
    let getPass = document.getElementById('password');
    let getbtn = document.getElementById('logIn');
    let getOutput = document.getElementById('output');

    getbtn.addEventListener("click", function() {
        debugger;
        if (getUser.value === "admin" && getPass.value === "1234") {
            for (i = 0; i < getData.length; i++) {
                let createText = document.createElement('p');
                createText.innerHTML = `Mailadress: ${getData[i].mail}`;
                getOutput.appendChild(createText);
            }
        }

    })

    
}

printData();



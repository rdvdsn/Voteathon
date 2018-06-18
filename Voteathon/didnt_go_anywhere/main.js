var accountContainer = document.getElementById("accounts-info");
var btn = document.getElementById("btn");
var textbox = document.getElementById("token");
var username = document.getElementById("username");
var team = document.getElementById("team");
var category = document.getElementById("category");
var fs = require('fs');


// on change event listener

btn.addEventListener("click", callme);

function callme() {
    // loadtext();
    fs.writeFile('test1.txt', "Username: " + username + ", Team: " + team +", Category: " + category, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('File was written');
    });

	// var ourRequest = new XMLHttpRequest();
	// ourRequest.open('GET', 'https://bluebank.azure-api.net/api/v0.7/customers/0a07e1fe-9ae8-4d82-85c6-3a305194b6b3/');
	// ourRequest.setRequestHeader('Ocp-Apim-Subscription-Key', '316553f1997e480eafb707297bde4d74')
	// ourRequest.setRequestHeader('Authorization', textbox.value)
	// ourRequest.onload = function() {
	// 	ourData = JSON.parse(ourRequest.responseText);
	// 	console.log(ourData);
	// 	loadText(ourData);
	// };
	// ourRequest.send();
};


// document.getElementById("btn").addEventListener("click", loadText);

function loadText() {
	var htmlString = "";
	// console.log(data[0]);

	// for (i = 0; i < data.length; i++) {
		htmlString += "<p>Username: " + username + ",</br> Team: " + team + ",</br> Category: " + category;
	
	// }


	console.log("button pressed");
	accountContainer.insertAdjacentHTML('beforeend', htmlString);
}

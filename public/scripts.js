// initialize firebase------------------------------------
var firebase = require('firebase'); //module for using firebase

var config = {
    apiKey: "AIzaSyBjS4dUaqPLhggmdF9hrIwQTH4i4QwjpR4",
    authDomain: "my-user-generator.firebaseapp.com",
    databaseURL: "https://my-user-generator.firebaseio.com",
    projectId: "my-user-generator",
    storageBucket: "my-user-generator.appspot.com",
    messagingSenderId: "317975340395"
  };
var app = firebase.initializeApp(config);
var database = firebase.database();
//-------------------------------------------------------

const got = require('got'); //module http requests
var each  = require('foreach'); //module for using forEach
var jsonfile = require('jsonfile') //module for reading/writing json files

//function to capitalize text
function capitalize(text) {
    return (!text || !text.length) ?
    text :
    (text[0].toUpperCase() + text.slice(1));
};

got('https://randomuser.me/api/?results=20&nat=us&inc=name,gender,picture&format=pretty', {json: true}).then(response => {

        var data = response.body;

        //capitalize names and gender
        each(data.results, function(user) {
            if (user.name) {
                for (var name in user.name) {
                    user.name[name] = capitalize(user.name[name]);
                }
            }
            if (user.gender) {
                user.gender = capitalize(user.gender);
            }
        });

        //create json file
        var file = 'public/users.json';

        jsonfile.writeFile(file, data, {spaces: 4, EOL: '\r\n'}, function(err) {
            console.error(err)
        });
        console.log(data);

        //write new data to firebase
        database.ref().set(data);

}).catch(error => {
    console.log(error.response.body);
});


function exit() {
    process.exit();
}
setTimeout(exit, 3500);

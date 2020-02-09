const express = require("express"); 
const bodyParser = require("body-parser"); 
const request = require("request")

const app = express(); 

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.listen(3000, function(req, res) { 
    console.log("Server has started on port: 3000")
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})


app.post("/", function(req, res) {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName
                }

            }
        ]
    }; 

    let jsonData  = JSON.stringify(data);

    const options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/429c9b28ae', 
        method: "POST", 
        headers: {
            "Authorization": "fabian287 66a86c836868c6d2d68d1fe850404a58-us4"
        }, 
        body: jsonData

    }

    
    request(options, function(error, response, body) {
        if(error) {
            console.log(error)
        } else if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        };

    })

})


// API KEY:  66a86c836868c6d2d68d1fe850404a58-us4
// LIST ID: 429c9b28ae

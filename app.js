const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  console.log(`${firstName} ${lastName} and email is ${email}`);
  const url = "https://us6.api.mailchimp.com/3.0/lists/77b9ee2d56";

  const data = {
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

  const jsonData = JSON.stringify(data);
  const options = {
    url: url,
    method: "POST",
    headers: {
      Authorization: "auth 2db8059460e25d1687ccb666f9654c72-us6"
    },
    body: jsonData
  };

  const request = https.request(url, options, (response) => {
    response.on("data", () => {
      console.log(JSON.parse(data));
    });
  });

  // request.end();
});

app.listen(3000, () => {
  console.log("server up and running");
});

// 5e74d4e05267421666a9c983dd1a89cf-us6
// 77b9ee2d56

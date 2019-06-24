const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "f32d7883",
  apiSecret: "EHfIvhEFeS05TGP0"
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/register", (req, res) => {
  nexmo.verify.request(
    {
      number: "919650498659",
      brand: "Nexmo",
      code_length: "4"
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/verify", (req, res) => {
  let pin = req.body.pin;
  let reqId = req.body.reqId;
  console.log(pin);

  nexmo.verify.check(
    {
      request_id: reqId,
      code: pin
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result && result.status === "0") {
          res.send("Verified");
        } else {
          res.send("Invalid code or to many tries");
        }
      }
    }
  );
});

app.listen(4444, () => {
  console.log("Server started on http://localhost:4444");
});

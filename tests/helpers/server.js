const express = require("express");
const bodyParser = require("body-parser");
const emitter = require("./callbacksemitter");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	emitter.emit("hello", "From CallbacksEmitter");
	res.send("Hello Nazarene");
});
// create our webhook endpoint to recive webhooks from Safaricom
app.post("/c2b/validation_url", (req, res) => {
	res.json({
		ResponseCode: 0,
		ResponseDesc: "success",
	});
});
app.post("/c2b/confirmation", (req, res) => {
	emitter.emit("c2bSuccessCallback", req.body);
	res.json({
		ResponseCode: 0,
		ResponseDesc: "success",
	});
});

module.exports = app;

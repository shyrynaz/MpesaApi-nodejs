const path = require("path");
const Mpesa = require("../../src/mpesaInstance");

require("dotenv").config();

const mpesaInstance = new Mpesa({
	consumerKey: process.env.CONSUMER_KEY,
	consumerSecret: process.env.CONSUMER_SECRET,
	shortCode: process.env.SHORTCODE,
	environment: "sandbox",
});

module.exports = mpesaInstance;

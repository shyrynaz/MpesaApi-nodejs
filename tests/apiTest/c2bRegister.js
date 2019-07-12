const mpesaInstance = require("../helpers/instance");
const app = require("../helpers/server");
const callBackUrls = require("../helpers/ngrok.js");
const emitter = require("../helpers/callbacksemitter");
const ngrok = require("ngrok");
async function registerURL() {
	try {
		console.log("setting up callback server");
		await ngrok.disconnect();
		global.NGROK_URL = await callBackUrls(app);

		console.log(`connected to: ${global.NGROK_URL}`);
		let res = await mpesaInstance.c2bRegister(`${NGROK_URL}/c2b/confirmation`, `${NGROK_URL}/c2b/validation_url`);
		console.log(res.data);
	} catch (error) {
		console.log(error);
	}
}

async function simulate() {
	try {
		await registerURL();
		const testMSISDN = 254708374149;
		const res = await mpesaInstance.c2bSimulate(
			testMSISDN,
			100,
			Math.random()
				.toString(35)
				.substr(2, 7)
		);

		console.log(res.data);
	} catch (error) {
		console.log(`error: ${error}`);
	}
	emitter.on("c2bSuccessCallback", function(payload) {
		console.log(payload);
		return payload;
	});
}

simulate();

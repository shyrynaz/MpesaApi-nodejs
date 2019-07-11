const { c2bRegister } = require("./apis/c2bRegisterUrl");
const { c2bSimulate } = require("./apis/c2bSimulate");
const { oAuth } = require("./apis/auth");

const { request } = require("./services");

// Introduce Mpesa Configuration

class Mpesa {
	/**
	 * Introduce Mpesa Configuration
	 * @constructor
	 * @param {Object} [config={}] The Configuration  to use for mPesa
	 */
	constructor(config = {}) {
		if (!config.consumerKey) throw new Error("Consumer Key is Missing");
		if (!config.consumerSecret) throw new Error("Consumer Secret is Missing");
		this.configs = { ...config };
		this.enviroment = config.environment === "production" ? "production" : "sandbox";
		this.request = request.bind(this);
		this.baseURL = `https://${this.enviroment === "production" ? "api" : "sandbox"}.safaricom.co.ke`;
	}
	// register c2b url.
	c2bRegister() {
		return c2bRegister.bind(this)(...arguments);
	}
	//simulate the c2b api
	c2bSimulate() {
		if (this.enviroment === "production") {
			throw new Error("Cannot call C2B simulate in production.");
		}
		return c2bSimulate.bind(this)(...arguments);
	}

	oAuth() {
		const { consumerKey, consumerSecret } = this.configs;
		return oAuth.bind(this)(consumerKey, consumerSecret);
	}
}

module.exports = Mpesa;

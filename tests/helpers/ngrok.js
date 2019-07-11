//creating callback urls
const http = require("http");
const ngrok = require("ngrok");

function callBackUrls(server) {
	if (typeof server === "function") {
		server = http.createServer(server);
	}

	let ngrokURL;

	server.once("close", function() {
		console.log("Closed!!");
		ngrokURL && ngrok.disconnect(ngrokURL);
	});

	let address = server.address();
	if (!address) server.listen(0);
	address = server.address();
	console.log(`server running on port: ${address.port}`);
	return ngrok.connect(address.port).then(function(url) {
		ngrokURL = url;
		return url;
	});
}

module.exports = callBackUrls;

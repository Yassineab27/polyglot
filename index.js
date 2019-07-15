const http = require("http");

const app = require("./src/app");

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening to the port ${port}`));

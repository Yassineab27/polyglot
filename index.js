const http = require("http");

const app = require("./src/app");

const server = http.createServer(app);

const port = 5000;
server.listen(port, () => console.log(`Listening to the port ${port}`));

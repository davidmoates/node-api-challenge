const express = require('express');

const projectRouter = require('./routes/projectRouter');
const actionRouter = require('./routes/actionRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Node API Challenge</h2>`);
});



server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})
server.use(express.json())
server.use("/api/projects", projectRouter, actionRouter)



module.exports = server;

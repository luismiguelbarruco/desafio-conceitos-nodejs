const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  	const { title, url, techs } = request.body;

	const repository = {
		id: uuid(),
	  	title, 
	  	url, 
		techs,
		likes: 0
	};
	  
	repositories.push(repository);

	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
	const { id } = request.params;
  	const { title, url, techs } = request.body;

	const repositoryIndex = repositories.findIndex(r => r.id === id);

	if(repositoryIndex > 0) {
		const repository = { title, url, techs, };
		const { id, likes } = repositories[repositoryIndex];

		repositories[repositoryIndex] = { id, ...repository, likes };

		return response.json(repositories[repositoryIndex]);
	}

	return response.status(400).json(400);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(r => r.id === id);

	if(repositoryIndex > 0) {
		
		repositories.splice(repositoryIndex, 1);

		return response.status(204).send();
	}

	return response.status(400).send();
});

app.post("/repositories/:id/like", (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(r => r.id === id);

	if(repositoryIndex < 0) {
		return response.status(400).send();
	} else {
		repositories[repositoryIndex].likes += 1;
		return response.json(repositories[repositoryIndex])
	}
});

module.exports = app;
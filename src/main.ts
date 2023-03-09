import "./style.css";
import cytoscape from "cytoscape";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
// import prompt.txt
import aiPrompt from "./data/prompt.txt?raw";
import { ApiClient, GraphModelModel } from "./ApiClient";
// import out.json from public folder

console.log("Hello World!");
// empty data for start
const cytoscapeData = {
	nodes: Array<cytoscape.NodeDefinition>(),
	edges: Array<cytoscape.EdgeDefinition>(),
};

const api = new ApiClient({
	baseURL: "http://localhost:8083",
});

const messages: ChatCompletionRequestMessage[] = [
	{
		role: "system",
		content: aiPrompt,
	},
];

// get api key from localstorage
const apiKey =
	localStorage.getItem("apiKey") ?? prompt("Please enter your OpenAI API Key")!;

// save api key to localstorage
localStorage.setItem("apiKey", apiKey);

const configuration = new Configuration({
	apiKey,
});
const openai = new OpenAIApi(configuration);

const aiInput = document.getElementById("aiInput") as HTMLInputElement,
	aiSendButton = document.getElementById("aiSendButton") as HTMLButtonElement;

aiSendButton.addEventListener("click", () => {
	const aiInputValue = aiInput.value;

	messages.push({
		role: "user",
		content: aiInputValue,
	});
	getAiResponse(aiInputValue).then((response) => {
		const r = response.data.choices[0].message?.content;
		console.log(r);
		if (r !== undefined) {
			messages.push({
				role: "assistant",
				content: r,
			});
			onResponseArrived();
		}
	});
});

async function onResponseArrived() {
	const lastAiResponse = messages[messages.length - 1],
		query = lastAiResponse.content;

	console.log("sending", query);

	const graph = await api.meta.controllerRunCypher({
		query,
	});
	if (graph !== undefined) {
		updateCytoscapeData(graph as GraphModelModel);
	}
}

async function getAiResponse(input: string) {
	const model = "gpt-3.5-turbo";
	return openai.createChatCompletion({ model, messages });
}

const app = document.getElementById("app");
const cy = cytoscape({ container: app });

function updateCytoscapeData(graph: GraphModelModel) {
	const nodes = graph.nodes.map((node) => ({
			data: {
				...node,
				label: node.labels[0],
			},
		})),
		edges = graph.edges.map((edge) => ({
			data: {
				...edge,
			},
		}));

	cytoscapeData.nodes = nodes;
	cytoscapeData.edges = edges;

	// console.log("setting cytoscape data", cytoscapeData);

	cy.json({ elements: cytoscapeData });
	console.log(cytoscapeData);

	//force layout
	cy.layout({
		name: "cose",
		animate: true,
		animationDuration: 500,
		animationEasing: undefined,
		fit: true,
		padding: 30,
	}).run();

	// show labels
	cy.on("mouseover", "node", function (event) {
		const node = event.target;
		node.style("label", node.data("properties.name"));
	});

	cy.on("mouseout", "node", function (event) {
		const node = event.target;
		node.style("label", "");
	});

	cy.on("mouseover", "edge", function (event) {
		const edge = event.target;
		edge.style("label", edge.data("type"));
	});

	cy.on("mouseout", "edge", function (event) {
		const edge = event.target;
		edge.style("label", "");
	});
}

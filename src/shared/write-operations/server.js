import express from "express";
import wbE from "wikibase-edit";

// TODO Build a node.js server to use wikibase-edit from

const credentials = {
    username: "Leonie",
    password: "graphIT-apfel1"
}

let generalConfig = {
    instance: 'https://graphit.ur.de',
    wgScriptPath: '/w', //default API endpoint
    //wgScriptPath: 'https://query.graphit.ur.de/proxy/wdqs/bigdata/namespace/wdq/sparql',

    credentials: {
        username: `${credentials.username}`,
        password: `${credentials.password}`,
        // or use OAuth tokens -> recommended for mulit-user set-up
        // -> https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#multi-user-setup 
    },
    anonymous: true,
    summary: 'Test Edit Summary',
    tags: ['Test Tag'],
    //userAgent: 'graphIT (https://graph.graphit.ur.de)',
}

const wbEdit = wbE(generalConfig);

// --------- A Server for handling POST-Requests -------------------

// Init Server
const app = express();
const port = 3000;
app.use(express.json());

// ROUTES

app.post("/api/label", async (req, res) => {
    console.log("POST request for creating a label for item");
    
});


// set server to listen on specified port, log if successful
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});
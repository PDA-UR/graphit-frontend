//parses the data from a Wikibase-query into the Cytoscape-Json format

// --------- ZUM VERSTÄNDNIS -------------
/* Rückgabe von Wikibase Element (aktuell) {
    "item": { "type": "uri", "value": "https://graphit.ur.de/entity/Q28" },
    "class": {"type": "uri", "value": "https://graphit.ur.de/entity/Q10" },
    "dependency": {"type": "uri", "value": "https://graphit.ur.de/entity/Q106" },
    "itemLabel": { "xml:lang": "en", "type": "literal", "value": "Cartesian Coordinates" },
    "classLabel": { "xml:lang": "en", "type": "literal", "value": "Mathematical Foundations" },
    "dependencyLabel": { "xml:lang": "en", "type": "literal", "value": "Points and Vectors" } },*/

// Cytoscape-Object: data: {id: 'itemLabel', label:'itemLabel', ...} 
				//	 data: {id: 'dependencyLabel', source:'itemLabel', target:'dependencyLabel'} 
				// -> source uses id's for target and source
				// -> for now ids are labels -> TODOD: change
				// -> TODO: add classes


export function parseWikiData(data) {
    var d = data.results.bindings; 
    var nodes = [];
    var edges = [];
    for(let i = 0; i < d.length; i++) {
        //TODO: (Only save existing nodes) Check of node is already in nodes-array
        var nodeID = d[i].itemLabel.value;
        var edgeID = d[i].dependencyLabel.value;
        nodes.push({
            "data": {
                "id": nodeID, // change to actual ID
            }
        });
        nodes.push({
            "data": {
                "id": edgeID, // change to actual ID
            }
        })
        // EDGES
        edges.push({
            "data": {
                "id": nodeID + " + " + edgeID, // Bessere ID nehmen
                "source": nodeID,
                "target": edgeID,
            }
        })
    }
    return {nodes, edges};
}


// ------------ NOTE ----------------

// JSON-Data
/* Example result:
elements: [
    { group: "nodes", 
        { data: { id: "n1", parent: "parent" } }
    },
    { group: "parent",
        { data: { id: "parent" } }
    },
    { group: "edges",
        { data: { id: "e1", source: "n1", target: "n2" } }
    },
]
*/

/* ALTERNATIVE
elements: {
    "nodes": [
      { "data": { id: 'a' } },
      { "data": { id: 'b' } }
    ],
    "edges": [
      { "data": { "id": 'ab', "source": 'a', "target": 'b' } }
    ]
  },
*/

//https://github.com/maxlath/wikibase-sdk/blob/main/docs/simplify_claims.md
//https://stackoverflow.com/questions/736590/add-new-attribute-element-to-json-object-using-javascript
//https://stackoverflow.com/questions/2250953/how-do-i-create-javascript-array-json-format-dynamically
// https://query.wikidata.org/#%23Mit%20Paramaribo%20%28Suriname%29%20durch%20Hauptstra%C3%9Fen%20verbundene%20St%C3%A4dte%0A%23defaultView%3AMap%0ASELECT%20DISTINCT%20%3Fconnection%20%3FconnectionLabel%20%3FconnectedWith%20%3FconnectedWithLabel%20%3Fcoor%0AWHERE%0A%7B%0A%20%20VALUES%20%3Fcity%20%7Bwd%3AQ3001%7D%20%23%20wd%3AQ3001%20%3D%20Paramaribo%7D%0A%20%20%3Fconnection%20wdt%3AP2789%2B%20%3Fcity%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20wdt%3AP2789%2B%20%3FconnectedWith%20.%0A%20%20%3FconnectedWith%20wdt%3AP625%20%3Fcoor%20.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22.%20%7D%0A%20%20%7D
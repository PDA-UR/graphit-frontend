// Zuzeit noch .ts wegen Kommentaren
// Besser als json?
export default [
    // NODE
    { selector: "node",
        style: { // Show node with label
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': '100',
            'border-color': "#666",
        }
    },
    // grabbed NODE (https://js.cytoscape.org/#selectors/state)
    { selector: ":grabbed", 
        style: { 
            'background-color': 'red',
        }

    }, // Mappers (https://js.cytoscape.org/#style/mappers)
    { selector: ":selected", 
        style: { 
            'background-color': 'blue',
        }
    },


    //Collapsing all child nodes to one parent
    { selector: '.collapsed-child',
        style: {
            //'opacity': '0',
            'display': 'none'
        }
    },

    //PARENT 
    // -> needs own data-object in json-file: {"data": {"id:" "parentID"}}
    { selector: ":parent",
        style: {
            'label': 'data(id)',
            'text-valign': 'top',
            'text-halign': 'center',
            'background-color': 'data(parentcolor)',
            'shape': 'roundrectangle',
            'border-opacity': '0',
            'compound-sizing-wrt-labels': 'include',
            'background-opacity': '0.7'
        }
    },

    // EDGE
    { selector: 'edge',
        style: {
            'width': 4,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        }
    }, 

    // Highlight class
    { selector: '.highlight-node-out',
        style: {
            'background-color': '#fc6262',
            //light-red
        }
    },
    { selector: '.highlight-node-in',
        style: {
            'background-color': '#5d5dfc',
            //light-blue
        }
    },

    { selector: '.highlight-edge-out',
        style: {
            'line-color': 'red',
            'target-arrow-color': 'red',
            'width': 5,
            'z-compound-depth': 'top',
        }
    }, 
    { selector: '.highlight-edge-in',
        style: {
            'line-color': 'blue',
            'target-arrow-color': 'blue',
        }
    }, 
    
    /*{ selector: '.unhighlight-edge',
        style: {
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
        }
    },  */ 
]
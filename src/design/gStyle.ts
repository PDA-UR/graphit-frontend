// Zuzeit noch .ts wegen Kommentaren
// Besser als json?
export default [
    // NODE
    { selector: "node",
        style: { // Show node with label
            'background-color': '#666',
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': '100',
            'events': 'yes' // Events can occur on element (defaul: yes)
        }
    },
    // grabbed NODE (https://js.cytoscape.org/#selectors/state)
    { selector: ":grabbed", 
        style: { 
            'background-color': 'blue'
        }

    }, // Mappers (https://js.cytoscape.org/#style/mappers)

    //PARENT 
    // -> needs own data-object in json-file: {"data": {"id:" "parentID"}}
    { selector: ":parent",
        style: {
            'label': 'data(id)',
            'text-valign': 'top',
            'text-halign': 'center',
            'background-color': "green"
        }
    },

    // EDGE
    { selector: 'edge',
        style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        }
    }   
]
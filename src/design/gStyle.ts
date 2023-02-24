// Zuzeit noch .ts wegen Kommentaren
// Besser als json?
export default [
    // NODE
    //'.group',
    { selector: "node",
        style: { // Show node with label
            //'background-color': 'inherit', from parent
            //'backgroud-blacken': '-0.5',
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': '100',
            'border-color': "#666",
            //'position': 'parent',
            //'background-opacity': 0.7
        }
    },
    // grabbed NODE (https://js.cytoscape.org/#selectors/state)
    { selector: ":grabbed", 
        style: { 
            'background-color': 'blue',
        }

    }, // Mappers (https://js.cytoscape.org/#style/mappers)
    { selector: ":selected", 
        style: { 
            'background-color': 'blue',
        }

    },

    // Highlight class
    { selector: '.hightlight',
        style: {
            'background-color': 'red',
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
            //'display': 'inline-flex', //??
            // https://developer.mozilla.org/en-US/docs/Web/CSS/display
            // mit anderen Layout testen
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
    { selector: '.highlight-edge',
        style: {
            'line-color': 'red',
            'target-arrow-color': 'red',
        }
    }, 
    { selector: '.unhighlight-edge',
        style: {
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
        }
    },   
]
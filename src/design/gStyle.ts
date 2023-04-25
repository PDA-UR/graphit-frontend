// Zuzeit noch .ts wegen Kommentaren
// Besser als json?

import { EdgeSingular, NodeSingular } from "cytoscape";

// FUNCTIONS

// Farben händisch in json-data spezifizieren
// Select color of parent for child nodes
function getParentColorFromData(node:NodeSingular){
    var parent = node.parent();
    if(parent.data("parentcolor") != null) {
        return parent.data("parentcolor");
    } else {
        //when parent is collapsed, parent is target node
        return node.data("parentcolor");
        //!! Works, but returns warning that node.data is null
    }
} // in parent: 'background-color': 'data(parentcolor)',

//TEST1 -> Farben dynamisch hinzufügen
// Select color according to weight (numOfChilds) of parent
// Only hue changes
function getColorFromWeight(parent:ParentNode){
    var numOfChilds = parent.descendants().size();
    // Normalize number with num of edges
    //TODO: Make color-assign better
    let n = (numOfChilds - 1) / (parent.connectedEdges().size() - 1) * 100;
    let col = 'hsl(' + n + ', 60%, 70%)';
    return col;
} // in parent: 'background-color': getColorFromWeight.bind(this),

//TEST2 -> Farben dynamisch für Child-Nodes
function getParentColor(node:NodeSingular){
    if (node.isChild()){
        return getColorFromWeight(node.parent());
    } else {
        // TODO
        // Wenn kein Parent, da ist kann die Farbe nicht wie oben kalkuliert werden
        // Hier Notlösung -> Farbe ist anders für unterschiedliche collapse-parents
        return 'hsl(' + node.outgoers().size() + ', 60%, 70%)';
    }
}
// Funktioniert nur bei expanded parents -> wenn parent collapsed haben alle die gleiche Farbe

// STYLESHEET
export default [
    // NODE
    { selector: "node",
        style: { // Show node with label
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': '100',
            'border-color': "#666",
            // If color is specified in json-Object
            //'background-color': getParentColorFromData.bind(this),
            'background-color': getParentColor.bind(this),
            'background-blacken': "0.3",
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
            //'background-color': 'data(parentcolor)', //specified in json-object
            'background-color': getColorFromWeight.bind(this),
            'shape': 'roundrectangle',
            'border-opacity': '0',
            'compound-sizing-wrt-labels': 'include',
            'background-opacity': '0.7',
            'background-blacken': "0"
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
    
    // Selector for both edge and child-node -> edge no color
    { selector: ":selected:child", 
        style: { 
            'overlay-color': "#6c757d",
            'overlay-opacity': "0.3",
            'background-color': "red",
            
        }
    },
    // Ausgelagert in beforeCollapse-event
    /*{ selector: ".collapsedNode",
        style:{
            'shape': 'round-rectangle',
            // works -> but size = 0 (collapsed has no kids)
            //'width': sizeFromWeight.bind(this),
            //'height': sizeFromWeight.bind(this),
        }
    },*/

    { selector: 'edge.cy-expand-collapse-collapsed-edge',
        style:
        {
          "text-outline-color": "#ffffff",
          "text-outline-width": "2px",
          'label': (e:NodeSingular) => {
            return '(' + e.data('collapsedEdges').length + ')';
          },
          'width': function (edge:EdgeSingular) {
            const n = edge.data('collapsedEdges').length;
            return (3 + Math.log2(n)) + 'px';
          },
          'line-style': 'dashed',
          //'line-color': setColor4CompoundEdge.bind(this),
          //'target-arrow-color': setColor4CompoundEdge.bind(this),
          //'target-arrow-shape': setTargetArrowShape.bind(this),
          //'source-arrow-shape': setSourceArrowShape.bind(this),
          //'source-arrow-color': setColor4CompoundEdge.bind(this),
          //From expand-collapsed compound demo
        }
      },
    /*{ selector: '.unhighlight-edge',
        style: {
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
        }
    },  */ 

    { selector: '.searched',
        style: {
            'border-color': "red",
            'border-width': 3,
            'border-style': "dashed",
            
        }
    },
];
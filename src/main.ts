import "./style.css";
import cytoscape from "cytoscape";
// import out.json from public folder
import EIMI from "./data/eimi.json";
import gLayout from "./design/gLayout";
import gStyle from "./design/gStyle";

console.log("Hello World!");

const app = document.getElementById("app");

var cy = cytoscape ({
    container: app, 
    elements: EIMI,

    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },

    // STYLESHEET -> ausgelagert in gStyle.ts
    style: gStyle,

    // LAYOUT -> ausgelagert in gLayout.ts
    layout: gLayout,
});

// Event for clicking node
cy.$(':parent').on('tap', function(e) {
    var ele = e.target;
    console.log('tapped ' + ele.id());
});

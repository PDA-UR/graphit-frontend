import "./style.css";
import cytoscape from "cytoscape";
// import out.json from public folder
import EIMI from "./data/eimi.json";

console.log("Hello World!");

const app = document.getElementById("app");
cytoscape({ elements: EIMI, container: app });

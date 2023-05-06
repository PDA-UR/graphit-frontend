import cytoscape from "cytoscape";
import WikibaseClient from "../../shared/WikibaseClient";
import "./style.css";

async function main() {
    const wikibase = new WikibaseClient();

    const query = `PREFIX wdt: <https://graphit.ur.de/prop/direct/>
    
    SELECT 
      ?source ?sourceLabel 
      ?sourceNodeClass ?sourceNodeClassLabel ?sourceNodeImage 
      ?dependency ?dependencyLabel
      ?dependencyNodeClass ?dependencyNodeClassLabel ?dependencyNodeImage 
    WHERE {
      # Retrieve the source node and its dependent node
      ?source wdt:P1 ?dependency.
      
      # Retrieve the class of the source node
      ?source wdt:P2 ?sourceNodeClass.
      
      # Retrieve the image of the source node (if available)
      OPTIONAL { ?source wdt:P9 ?sourceNodeImage. }
      
      # Retrieve the class of the dependent node (if available)
      OPTIONAL { ?dependency wdt:P2 ?dependencyNodeClass. }
      
      # Retrieve the image of the dependent node (if available)
      OPTIONAL { ?dependency wdt:P9 ?dependencyNodeImage. }
      
      # Retrieve labels for all entities in the preferred language (fallback to English)
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    `;
    
    const elements = await wikibase.query(query);
    console.log(elements);

    const cy = cytoscape({
        container: document.getElementById('app'),
        elements: elements,
    });
}


main();


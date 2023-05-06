import { SparqlClient } from "../../shared/SparqlClient";
import "./style.css";

const sparql = new SparqlClient();

const query = `#defaultView:Graph
PREFIX wdt: <https://graphit.ur.de/prop/direct/>
SELECT ?item ?itemLabel ?class ?classLabel ?image ?dependency ?dependencyLabel WHERE {
  ?item wdt:P1 ?dependency.
  ?item wdt:P2 ?class
  OPTIONAL{ ?item wdt:P9 ?image.}
  OPTIONAL{ ?class wdt:P9 ?image.}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

sparql.query(query).then((data) => {
    console.log(data);
});
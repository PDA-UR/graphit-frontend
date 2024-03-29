export const dependentsAndDependenciesQuery = (
	userId = "Q157"
) => `PREFIX wd: <https://graphit.ur.de/entity/>
PREFIX wdt: <https://graphit.ur.de/prop/direct/>
SELECT 
  ?source ?sourceLabel 
  ?sourceNodeClass ?sourceNodeClassLabel ?sourceNodeImage 
  ?dependency ?dependencyLabel
  ?dependencyNodeClass ?dependencyNodeClassLabel ?dependencyNodeImage
  ?sourceCompleted ?dependencyCompleted
  ?sourceInterested ?dependencyInterested
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
  
  # Check if the source node has completed (Property P12)
  BIND(EXISTS { wd:${userId} wdt:P12 ?source } AS ?sourceCompleted)
  
  # Check if the dependent node has completed (Property P12)
  BIND(EXISTS { wd:${userId} wdt:P12 ?dependency } AS ?dependencyCompleted)
  
  # Check if ${userId} is interested in the source node (Property P23)
  BIND(EXISTS { wd:${userId} wdt:P23 ?source } AS ?sourceInterested)
  
  # Check if ${userId} is interested in the dependent node (Property P23)
  BIND(EXISTS { wd:${userId} wdt:P23 ?dependency } AS ?dependencyInterested)
  
  # Retrieve labels for all entities in the preferred language (fallback to English)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}

`;

# virtuo
test final for Virtuo

Il s'agit de créer un serveur sachant stocker dans mongodb et retourner des informations sur un véhicules :
 - ses coordonnées GPS
 - son kilométrage
 - son niveau d'essence

En pièce jointe, tu trouveras :
 - un exemple de données à savoir assimiler (input-x.json).
 - un exemple de données à savoir retourner sur l'url GET /vehicle/:plate/mileage?from=...&to=... (mileage.json)
 - un exemple de données à savoir retourner sur l'url GET /vehicle/:plate/fuel?from=...&to=... (fuel.json)
 - un exemple de données à savoir retourner sur l'url GET /vehicle/:plate/coordinates?from=...&to=... (coordinates.json)

 Le serveur se lance via npm start
 La base se nomme virtuo en local sur le port 27017 et la collection se nomme également virtuo

 Le fichier input.js simule le post d'une donnée correspondant à un des fichiers input-x.json

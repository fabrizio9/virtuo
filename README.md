# virtuo
test final for Virtuo

Il s'agit de cr�er un serveur sachant stocker dans mongodb et retourner des informations sur un v�hicules :
 - ses coordonn�es GPS
 - son kilom�trage
 - son niveau d'essence

En pi�ce jointe, tu trouveras :
 - un exemple de donn�es � savoir assimiler (input-x.json).
 - un exemple de donn�es � savoir retourner sur l'url GET /vehicle/:plate/mileage?from=...&to=... (mileage.json)
 - un exemple de donn�es � savoir retourner sur l'url GET /vehicle/:plate/fuel?from=...&to=... (fuel.json)
 - un exemple de donn�es � savoir retourner sur l'url GET /vehicle/:plate/coordinates?from=...&to=... (coordinates.json)

 Le serveur se lance via npm start
 La base se nomme virtuo en local sur le port 27017 et la collection se nomme �galement virtuo

 Le fichier input.js simule le post d'une donn�e correspondant � un des fichiers input-x.json

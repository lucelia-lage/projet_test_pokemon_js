const prompt = require("prompt-sync")();

//les types d'attaques:

let attaques = [
    {
        attaque: "frappe rapide",
        puissance: -10, //OBS: les valeurs nég pour réduire les PV de l'adversaire
        précision: 1
    }, //1 chance sur 2 de réussir :  1 chance de réussir et une chance d'échouer
    {
        attaque: "soin léger",
        puissance: 15,
        précision: 2
    }, //1 chance sur 3; +15 car il soigne 15 pv
    {
        attaque: "coup puissant",
        puissance: -20,
        précision: 2
    }, //1 chance sur 3
    {
        attaque: "frappe dévastatrice",
        puissance: -30,
        précision: 3
    } //1 chance sur 4
]

//les joueurs:

let joueur = {
    nom: "Guerrier du Feu",
    pv: 100
};
let ordinateur = {
    nom: "Sombre Lutin",
    pv: 100
};

//fonction pour avoir l'effet hasard / aléatoire:

function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

//fonction attaque aléatoire de l'ordi:

function choixAttaqueOrdi() {
    let index = randomize(0, attaques.length - 1) //un index aléatoire entre 0 et 3 : 4 attaques possibles
    return index //nous envoie l'index de l'attaque aléatoire
}

//fonction attaques disponibles pour le joueur: 

function choixAttaque() {
    console.log("Il faut choisir une des attaques suivantes : ");
    for (let i = 0; i < attaques.length; i++) { // pour nous montrer chaque attaque
        let attaque = attaques[i]
        console.log(i + 1 + " " + attaque.attaque + " " + attaque.puissance + "PV" + " , avec une précision de " + attaque.précision);
    }
    let choice = Number(prompt("Il faut choisir une attaque : 1, 2, 3 ou 4"))
    //boucle while pour avoir un choix valide / pas possible boucle for car on ne sait pas combien des fois la personne va entrer un choix invalide:

    while (choice < 1 || choice > 4) {
        console.log("Oups, choix invalide. Merci d'entrer 1, 2, 3 ou 4");
        choice = Number(prompt("Il faut choisir une attaque : 1, 2, 3 ou 4"))
    }
    return choice
}

//fonction affichage des scores:

function score() {
    console.log("Et voici les scores : ");
    console.log(joueur.nom + " : " + joueur.pv + "PV");
    console.log(ordinateur.nom + " : " + ordinateur.pv + "PV");
}

//fonction réalisation de l'attaque:

function attaquer(attaquant, cible, attaque) {

    let proba = attaque.précision
    let reussite = randomize(1, proba) // la précision a été appellée dans la variable proba

    if (reussite === 1) {
        if (attaque.attaque === "soin léger") {
            attaquant.pv += attaque.puissance
            console.log(attaquant.nom + " a gagné " + attaque.puissance + " PV !");

        } else { //pour tous les autres attaques, les attaques qui font perdre des points: 
            cible.pv += attaque.puissance
            console.log(attaquant.nom + " a réussi son attaque ! " + cible.nom + " perd " + (-attaque.puissance) + " PV! ")
        }
    } else {
        console.log(attaquant.nom + " a raté son attaque !");
    }
}

//pour vérifier la victoire:
function victoire() {
    if (joueur.pv <= 0) {
        console.log("Ton adversaire a gagné!");
        return true // fin du jeu! 
    } else if (ordinateur.pv <= 0) {
        console.log("Bravo! La victoire est pour toi!");
        return true // fin du jeu
    }
    return false // pas de victoire : le jeu continue
}

//boucle pour continuer le jeu pendant que joueur/ordi n'ont pas perdu tous leurs PV:

function bataille() {

    console.log("Et la bataille commence!!! ");
    console.log("Tu es " + joueur.nom + " et tu affrontes " + ordinateur.nom);
    console.log("Allez, prépare-toi pour la bataille! ");

    while (joueur.pv > 0 && ordinateur.pv > 0) {
        score();
        console.log("C'est le tour du joueur " + joueur.nom);

        let choice = choixAttaque() - 1; // pour choisir une attaque / index de 1 à 4 : il faut mettre -1 pour cohérence avec l'index du tableau
        let attaqueJoueur = attaques[choice]; // récup l'attaque du joueur
        attaquer(joueur, ordinateur, attaqueJoueur); // joueur attaque l'ordi

        if (victoire()) break; // si victoire : on sort de la boucle

        console.log("C'est le tour de l'adversaire " + ordinateur.nom);
        let attaqueOrdi = choixAttaqueOrdi(); //ordi avec attque aléatoire (regarder randomize là haut)
        attaquer(ordinateur, joueur, attaques[attaqueOrdi]); // ordi attaque joueur

        if (victoire()) break; //deux fois if victoire : un pour vérifier la victoire de l'ordi et continuer pou pas/ 
        // l'autre pour vérifier la victoire du joueur et continuer ou pas
    }
}
bataille()

console.log("C'est fini la bataille! ");
score()


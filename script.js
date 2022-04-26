    let commencer = document.getElementById("commencer");
    let affichage = document.getElementById("affichage");
    let reponse = document.getElementById("reponse");
    let entreeCase = document.getElementById("entree");
    let essaiCase = document.getElementById("essai")
    let pointCase = document.getElementById("point")
    let entree = [];
    let essai = 11;
    let point = 0;
    //les éléments qui disparaissent
    let underscoreC = document.getElementById("underscore")
    let pied1 = document.querySelector("#pied1");
    let pied2 = document.querySelector("#pied2");
    let main1 = document.querySelector("#main1");
    let main2 = document.querySelector("#main2");
    let horizontalBas = document.getElementById("horizontalBas");
    let horizontalHaut = document.getElementById("horizontalHaut");
    let verticalG = document.getElementById("verticalG");
    let verticalP = document.getElementById("verticalP");
    let oblique = document.getElementById("oblique");
    let tete = document.getElementById("tete");
    let abdomen = document.getElementById("abdomen");
    //fin des éléments qui disparaissent
    //liste des #CS
    let cs = ["alolo", "asmaou", "ado", "yacos", "narciss", "alghabid", "rosie", "hama", "khelifa", "papson", "pacoh", "khalessi", "michou", "adam", "hassan", "biao", "fayçal", "rama", "souleymane", "lamine", "ghaicha", "ghaichatou", "atchamado", "dino", "riddy", "oustaze", "doudou", "hanna", "moubarak", "halima", "philosophe", "richouf", "blanc", "latifa", "ismo", "ben", "juge"]
    //fin de la liste des #CS
    let index; /*index aléatoire*/
    let NomVerification;  /*Nom à deviner*/
    let underscore = [];  /*liste de nombre de caractère soulignés*/
    let bonhome = [horizontalBas, verticalG, horizontalHaut, verticalP, oblique, pied1, pied2, abdomen, main1, main2, tete] /*liste des élément qui disparaissent */
    let membre = 0; /*index des membres du bonhomme qui sera pendu*/
    let etat = true; /*verifier s'il reste des Essais*/
    let caractereValide = [];

    commencer.addEventListener("click", () =>{
        window.location.reload()
    })

    active()


    function active() {
        index = Math.floor(Math.random() * 36);
        NomVerification = cs[index]
        for (let i = 0; i < NomVerification.length; i++) {
            underscore.push("_")
            pointCase.innerHTML = `${point}/${NomVerification.length}`;
        }
        pointCase.innerHTML = `${point}/${NomVerification.length}`;
        underscoreC.innerHTML = underscore.join(" ")
        document.addEventListener("keydown", () => {



            if (etat) {


                if (NomVerification.indexOf(`${event.key}`) != -1) {
                    if (countElement(NomVerification, event.key) >= 1 && caractereValide.indexOf(`${event.key}`) == -1) {
                        point += countElement(NomVerification, event.key);
                    }

                    if (caractereValide.indexOf(`${event.key}`) != -1) {
                        point = point;
                        entree = entree;

                    } else {

                        for (let i = 0; i < duplicateIndexes(NomVerification, event.key).length; i++) { /*chercher et mettre les elements dupliqués à leur place*/
                            underscore[duplicateIndexes(NomVerification, event.key)[i]] = event.key
                        }
                        underscoreC.innerHTML = underscore.join(" ");
                        caractereValide.push(event.key)
                        pointCase.innerHTML = `${point}/${NomVerification.length}`;
                        entree.push(event.key);
                        entreeCase.innerHTML = entree
                    }

                    if (point == NomVerification.length) {
                        etat = false;
                        affichage.innerHTML = "Vous avez gagné!"
                        commencer.style.display = 'inline'
                    }
                } else {
                    entree.push(event.key);
                    entreeCase.innerHTML = entree
                    essai--;
                    essaiCase.innerHTML = essai
                    bonhome[membre].style.display = 'block'
                    membre++
                    if (essai == 0) {
                        etat = false
                        reponse.innerHTML = NomVerification
                        affichage.innerHTML = "Vous avez perdu!"
                        commencer.style.display = 'inline'
                    }
                }
            } else {
                point = point
                pointCase.innerHTML = `${point}/${NomVerification.length}`;
                essai = essai;
                essaiCase.innerHTML = essai
                for (let i = membre + 1; i <= membre.length; i++) {
                    bonhome[membre].style.display = 'none'
                }

            }
        })
    }




//fonction quiu compte le nombre d'éléments dans une liste 
    function countElement(arr, el) {
        nbr = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == el) {
                nbr++
            } else {
                nbr = nbr
            }
        }
        return nbr
    }

    //fonction qui retourne la liste des indices d'un élément dupliqué 
    function duplicateIndexes(arr, el) {

        duplicate = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == el) {
                duplicate.push(i)
            }
        }
        return duplicate
    }

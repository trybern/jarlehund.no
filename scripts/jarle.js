/* TODO: Lag json-fil som holder stiene til bildene, samt ekstra data (les: alt-tekst og bildetekst) */
/* TODO: Skriv alt-tekst til alle bilder */
/* TODO: Skriv om til å hente antall (antallBilder), lenke og alt-tekst fra json */

const antallBilder = 18; // Antall bilder av Jarle i bildeMappe
const bildeMappe = 'img/jarle/'; // Mappen hvor bildene er lagret
const bildePrefix = 'jarle_'; // Prefix for bildefilene
const bildeType = '.jpg'; // Filtype for bildene

function genererBildeListe() {
    const bildeListe = [];
    for (let i = 1; i <= antallBilder; i++) {
        bildeListe.push(`${bildeMappe}${bildePrefix}${i}${bildeType}`);
    }
    return bildeListe;
}

const jarleBilder = genererBildeListe();

let forrigeBilde = -1 // For avsjekk i visTilfeldigBilde

function visTilfeldigBilde() {
    /* if (jarleBilder.length === 0) return; */

    let nyttBilde;
    do {
        nyttBilde = Math.floor(Math.random() * jarleBilder.length);
    }
    while ( nyttBilde === forrigeBilde&& jarleBilder.length > 1 );

    const bildeSti = jarleBilder[nyttBilde];
    document.getElementById('jarle-bilde').src = bildeSti;
    forrigeBilde = nyttBilde;
}

// Vis et tilfeldig bilde når siden lastes
visTilfeldigBilde();

// Legg til en event listener på knappen
document.getElementById('nytt-bilde').addEventListener('click', visTilfeldigBilde);
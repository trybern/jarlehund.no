/* TODO: Lag json-fil som holder stiene til bildene, samt ekstra data (les: alt-tekst og bildetekst) */
/* TODO: Skriv alt-tekst til alle bilder */
/* TODO: Skriv om til å hente antall (antallBilder), lenke og alt-tekst fra json */

/* TODO Må få på noe komprimering på et tidspunkt */

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

// Nedtelling
function getNextTargetDate(month, day) {
    const now = new Date();
    let year = now.getFullYear();
    let targetDate = new Date(year, month - 1, day); // måned er 0-indeks
  
    // Har det vært 27. juli, bruk neste år i stedet
    if (now > targetDate) {
      targetDate.setFullYear(year + 1);
    }
  
    return targetDate;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const targetDate = getNextTargetDate(7, 27).getTime();
  
    console.log("Neste bursdag: ", new Date(targetDate).toDateString());
  
    // Tell ned
    const nedtellingInterval = setInterval(function () {
      const currentDate = new Date().getTime();
      const timeDifference = targetDate - currentDate;
  
      // Sjekk om det er bursdagen hans
      if (timeDifference <= 0) {
        clearInterval(nedtellingInterval);
        document.getElementById("nedtelling").innerHTML = `<h2 class="feiring">Gratulerer med dagen, Jarle!</h2>`;
        
        // Recalculate for next year
        const nextTargetDate = getNextTargetDate(6, 1).getTime();
        setTimeout(() => location.reload(), 5000); // Reload page after 5 seconds to start new countdown
      } else {
        // Tell dager, timer, minutter og sekunder
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Angi tid
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
      }
    }, 1);
  });
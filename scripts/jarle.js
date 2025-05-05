/* TODO: Lag json-fil som holder stiene til bildene, samt ekstra data (les: alt-tekst og bildetekst) */
/* TODO: Skriv alt-tekst til alle bilder */
/* TODO: Skriv om til å hente antall (antallBilder), lenke og alt-tekst fra json */

/* TODO Må få på noe komprimering på et tidspunkt */




// Lag album
function genererBildeListe() {
  const antallBilder = 55; // Antall bilder av Jarle i bildeMappe
  const bildeMappe = 'img/jarle/'; // Mappen hvor bildene er lagret
  const bildePrefix = 'jarle_'; // Prefix for bildefilene
  const bildeType = '.jpg'; // Filtype for bildene
  const bildeListe = [];
  for (let i = 1; i <= antallBilder; i++) {
      bildeListe.push(`${bildeMappe}${bildePrefix}${i}${bildeType}`);
  }
  return bildeListe;
}

async function fetchJarleData() {
  const response = await fetch('images.json'); // Fil med alt-tekster
  return await response.json();
}

// Vis et tilfeldig bilde når siden lastes og når knappen trykkes

let forrigeBilde = -1 // For avsjekk i visTilfeldigBilde 

function visTilfeldigBilde() {
  const jarleBilder = genererBildeListe();
  const jarleBilde = document.getElementById('jarle-bilde');

  let nyttBilde;

  while (nyttBilde === forrigeBilde || nyttBilde === undefined) {
    nyttBilde = Math.floor(Math.random() * jarleBilder.length);
  }

  const bildeSti = jarleBilder[nyttBilde];
  jarleBilde.src = bildeSti;
  forrigeBilde = nyttBilde;

  console.log(`Du ser nå på bilde nr. ${nyttBilde + 1} av ${jarleBilder.length}`);
}

visTilfeldigBilde();
document.getElementById('nytt-bilde').addEventListener('click', visTilfeldigBilde);



// Tell ned til bursdagen
function countDown(target, current) {
  const timeDifference = target - current;
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

document.addEventListener('DOMContentLoaded', function () {
  const now = new Date();
  let year = now.getFullYear();
  let targetDate = new Date(year, 7 - 1, 27); // måned er 0-indeks

  console.log("Neste bursdag: ", new Date(targetDate).toDateString());
  // Tell ned
  const nedtellingInterval = setInterval(function () {
    
    const currentDate = new Date();

    // Sjekk om det er bursdagen hans
    if (currentDate.toDateString() === targetDate.toDateString()) {
      clearInterval(nedtellingInterval);
      document.getElementById("nedtelling").innerHTML = `<h2 class="feiring">Gratulerer med dagen, Jarle!</h2>`;
    } else {
      // Legg på et år hvis bursdagen har vært
      if (now >= targetDate) { 
        targetDate.setFullYear(targetDate.getFullYear() + 1)
      }

      // Tell ned
      countDown(targetDate.getTime(), currentDate.getTime())
    }
  }, 1000);
});
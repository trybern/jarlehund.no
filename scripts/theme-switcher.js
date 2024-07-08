const themeToggle = document.querySelector("#theme-toggle");
const bodyElement = document.querySelector("body");

let currentTheme = bodyElement.getAttribute("data-theme");

// Sjekk tidligere besøk og sett theme
const browserTheme = localStorage.getItem("fargeprofil");

if (browserTheme) {
    setTheme(browserTheme)
}

// TODO: Skrive om til å bruke localStorage?
function setTheme(theme) {
    bodyElement.setAttribute("data-theme", theme);
    currentTheme = theme;
    saveTheme(theme);
    return currentTheme;
}

function renderTheme(theme) {
    if (currentTheme == "dark") {
        setTheme("dark")

    } else if (currentTheme == "light") {
        setTheme("light")
    }
}

// Lysbryter for å skifte tema
themeToggle.addEventListener("click", switchTheme);

function switchTheme() {

    if (currentTheme === "dark") {
        setTheme("light")

    } else {
        setTheme("dark")
    }

    renderTheme()

    console.log("Theme switched to " + currentTheme);

}

// Sett foretrukket mode i nettleseren
function saveTheme(theme) {
    localStorage.setItem("fargeprofil", theme)
}
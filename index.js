//Beginscore 0 en je doel om te bereiken in 1000 punten
let score = 0; 
const targetScore = 1000;

//Array met foto's
const imageSources = [
    "images/2h.png", "images/3h.png", "images/4.png", "images/5.png",
    "images/6h.png", "images/7h.png", "images/8h.png", "images/9h.png",
    "images/ah.png", "images/jh.png", "images/kh.png", "images/qh.png"
];

//Waarde van de kaarten
const characterValues = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
    "7": 7, "8": 8, "9": 9, "Jack": 10,
    "King": 11, "Queen": 12, "Ace": 13
};

//Koppeling afbeeldingen en namen
const imageCharacterMap = {
    "images/2h.png": "2", "images/3h.png": "3", "images/4.png": "4",
    "images/5.png": "5", "images/6h.png": "6", "images/7h.png": "7",
    "images/8h.png": "8", "images/9h.png": "9", "images/ah.png": "Ace",
    "images/jh.png": "Jack", "images/kh.png": "King", "images/qh.png": "Queen"
};

//2 achtergronden 
const backgroundImages = {
    calm: "wallpaper/casino.png",
    moderate: "wallpaper/HigherLower.jpg"
};

//Spelerscores van player en pc
let playerScore = 0;
let pcScore = 0;

//Houden bij of kaarten zijn getrokken
let playerCardDrawn = false;
let pcCardDrawn = false;
let playerChoice = null; // "higher" or "lower" keuze te klikken

// Functie om de kaart van de speler te laden
function loadPlayerCard() {
    const leftIndex = Math.floor(Math.random() * imageSources.length);
    document.getElementById("left-image").src = imageSources[leftIndex];
    const leftCharacter = imageCharacterMap[imageSources[leftIndex]];
    playerScore = characterValues[leftCharacter];
    document.getElementById("player-score").innerText = playerScore;
    playerCardDrawn = true;
    pcCardDrawn = false; // Reset pc kaart
}

//Functie om kaart van pc te laden
function loadPcCard() {
    let rightIndex;
    let rightCharacter;

    do {
        rightIndex = Math.floor(Math.random() * imageSources.length);
        rightCharacter = imageCharacterMap[imageSources[rightIndex]];
    } while (characterValues[rightCharacter] === playerScore); // Blijf herhalen totdat de pc-kaartwaarde verschilt van de speler kaartwaarde

    document.getElementById("right-image").src = imageSources[rightIndex];
    pcScore = characterValues[rightCharacter];
    document.getElementById("pc-score").innerText = pcScore;
    pcCardDrawn = true;
    checkOutcome();
}

// Functie om het resultaat te controleren na het trekken van de pc kaart
function checkOutcome() {
    if (playerChoice === "higher" && playerScore > pcScore) {
        updateScore(100);
    } else if (playerChoice === "lower" && playerScore < pcScore) {
        updateScore(100);
    } else {
        updateScore(-50);
    }
    resetRound();
}

// Update de score en achtergrond
function updateScore(change) { 
    score += change;
    document.getElementById("aura").innerText = score; // Update to 'aura' instead of 'score'
    updateBackground();
    if (score >= targetScore) {
        alert("Congratulations! You won!");
        resetGame();
    } else if (score < 0) {
        alert("You lost! You are going to the Prison!");
        resetGame();
    }
}

// Verander de achtergrond afhankelijk van de score
function updateBackground() {
    if (score < 500) {
        document.body.style.backgroundImage = `url("${backgroundImages.calm}")`;
    } else {
        document.body.style.backgroundImage = `url("${backgroundImages.moderate}")`;
    }
}

// Reset het spel volledig
function resetGame() {
    score = 0;
    document.getElementById("aura").innerText = score; 
    updateBackground();
    resetRound();
}

// Reset de ronde zodat de speler opnieuw kan spelen zonder kaarten te verbergen
function resetRound() {
    playerCardDrawn = false;
    pcCardDrawn = false;
    playerChoice = null;
    // De scores en kaarten blijven zichtbaar tot de volgende ronde
}

// Event listeners voor knoppen
document.getElementById("pullcard").addEventListener("click", function() {
    if (!playerCardDrawn) {
        loadPlayerCard();
    } else {
        alert("Je hebt al een kaart getrokken. Kies 'Higher' of 'Lower' en klik op 'Go'.");
    }
});

document.getElementById("higher-button").addEventListener("click", function() {
    if (!playerCardDrawn) {
        alert("Je moet eerst op 'Pull' klikken om je kaart te trekken!");
        return;
    }
    playerChoice = "higher";
});

document.getElementById("lower-button").addEventListener("click", function() {
    if (!playerCardDrawn) {
        alert("Je moet eerst op 'Pull' klikken om je kaart te trekken!");
        return;
    }
    playerChoice = "lower";
});

document.getElementById("go").addEventListener("click", function() {
    if (!playerCardDrawn || !playerChoice) {
        alert("Je moet eerst een kaart trekken en een keuze maken!");
        return;
    }
    loadPcCard();
});

//Update achtergrond bij start van het spel
updateBackground();
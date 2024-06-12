// Funzione principale
async function run() {
    let data;

    // Caricamento dati JSON
    await fetch("../dettagli/assets/data/data_yolo.json")
        .then(r => r.json())
        .then(json => {
            data = json;
        })
        .catch(error => {
            console.error("Errore nel caricamento del JSON", error);
        });
 
    if (!data) {
        console.error("Nessun dato caricato");
        return;
    }

    // Categorie
    const labels = [ 'macchina', 'moto', 'bus', 'barca', 'cane', 'persona', 'bicchiere da vino', 'bottiglia', 
    'bicchiere', 'ciotola', 'torta', 'tavolo da pranzo', 'sedia', 'letto', 'panchina', 'zaino', 'borsa', 'libro',
    'cellulare', 'portatile', 'tv', 'orologio', 'pianta in vaso',];

    load_containers(labels);

    let categories = {};
    let imageCounts = {};

    // Inizializzazione
    for (let i = 0; i < labels.length; i++) {
        categories[labels[i]] = '';
        imageCounts[labels[i]] = 0;
    }

    // Elaborazione dei dati
    for (let i = 0; i < data.length; i++) {
        const objects = data[i].Objects;
        const fileName = data[i].FileName;
        if (objects && objects.length > 0) {
            for (let j = 0; j < objects.length; j++) {
                const label = objects[j].label;
                if (label && categories[label] !== undefined) {
                    categories[label] += createImageHTML(fileName, j);
                    imageCounts[label]++;
                }
            }
        }
    }

    // Inserimento delle immagini
    for (const label in categories) {
        if (categories.hasOwnProperty(label)) {
            const container = document.getElementById(label);
            if (container) {
                container.innerHTML = categories[label];
            }
        }
    }

    // Aggiornamento conteggi
    for (const label in imageCounts) {
        if (imageCounts.hasOwnProperty(label)) {
            const countElement = document.getElementById('image_count' + label);
            if (countElement) {
                countElement.textContent = imageCounts[label] + " foto";
            }
        }
    }

    handleScroll();
}


// Caricamento immagini
function createImageHTML(fileName, index) {
    const imagePath = "../dettagli/assets/imgs/yolo_crop/" + fileName + "_" + index + ".jpg";
    let output = "<div class='image-container'>";
    output += "<img src='" + imagePath + "' alt='Imm'>";
    output += "</div>";
    return output;
}


// Creazione categorie
function load_containers(labels) {
    let cats = "";
    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        cats += "<div class='main_box" + (i === 0 ? " first-category" : "") + "'>";
        cats += '<div class="info">'
        cats += "<h1>" + label + "</h1>";
        cats += "<p id='image_count" + label + "'>0 foto</p>";
        cats += '</div>'
        cats += '<div class="box" id="' + label + '">';
        cats += '</div>';
        cats += "</div>";
    }
    
    document.getElementById("main").innerHTML += cats;
}


// Gestore scroll
function handleScroll() {
    const categories = document.querySelectorAll('.info');
    const windowHeight = window.innerHeight - 200;

    categories.forEach(category => {
        const rect = category.getBoundingClientRect();
        const topOfCategory = rect.top;

        if (topOfCategory >= 0 && topOfCategory <= windowHeight) {
            category.querySelector('h1').style.color = 'black';
            category.querySelector('p').style.color = 'black';
        } else {
            category.querySelector('h1').style.color = '';
            category.querySelector('p').style.color = '';
        }
    });
}

window.addEventListener('scroll', handleScroll);


// Bottone scroll
function scrollToTitle() {
    let mainElement = document.getElementById("main");
    let yOffset = -80;
    let y = mainElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });
}


// Caricamento della finestra
window.onload = function() {
    document.getElementById('dettagli').classList.add('active');
    run();
};
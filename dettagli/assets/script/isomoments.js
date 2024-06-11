async function run() {
    let data;

    await fetch("../dettagli/assets/data/data_yolo.json")
        .then(r => r.json())
        .then(json => {
            data = json;
        })

    // Categorie
    const labels = ['person', 'car', 'motorcycle', 'bus', 'truck', 'boat', 'traffic light', 'stop sign', 
        'bench', 'dog', 'backpack', 'handbag', 'sports ball', 'kite', 'bottle', 
        'wine glass', 'cup', 'bowl', 'cake', 'chair', 'couch', 'potted plant', 
        'bed', 'dining table', 'tv', 'laptop', 'cell phone', 'sink', 'book', 'clock'];

    load_containers(labels);


    let categories = {};
    let imageCounts = {};

    for (let i = 0; i < labels.length; i++) {
        categories[labels[i]] = '';
        imageCounts[labels[i]] = 0;
    }


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


    for (const label in categories) {
        if (categories.hasOwnProperty(label)) {
            const container = document.getElementById(label);
            if (container) {
                container.innerHTML = categories[label];
            }
        }
    }


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

 // Usa l'indice come contatore locale
function createImageHTML(fileName, index) {
    const imagePath = "../dettagli/assets/imgs/yolo_crop/" + fileName + "_" + index + ".jpg";
    let output = "<div class='image-container'>";
    output += "<img src='" + imagePath + "' alt='Imm'>";
    output += "</div>";
    return output;
}

function load_containers(labels) {
    let cats = "";
    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        cats += "<div class='main_box'>";
        cats += '<div class="info">'
        cats += "<h1>" + label + "</h1>";
        cats += "<p id='image_count" + label + "'>0 foto</p>";
        cats += '</div>'
        cats += '<div class="box" id="' + label + '">';
        cats += '</div>';
        cats += "</div>";
    }
    // Aggiungi il contenuto al DOM
    document.getElementById("main").innerHTML += cats;
}

// Funzione per gestire lo scroll
function handleScroll() {
    const categories = document.querySelectorAll('.main_box');
    const windowHeight = window.innerHeight;

    categories.forEach(category => {
        const rect = category.getBoundingClientRect();
        const middleOfCategory = rect.top + rect.height / 1;

        if (middleOfCategory > 0 && middleOfCategory < windowHeight) {
            category.querySelector('h1').style.color = 'black';
        } else {
            category.querySelector('h1').style.color = '';
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

// Bottone attivo
window.onload = function() {
    document.getElementById('dettagli').classList.add('active');
    run();
};
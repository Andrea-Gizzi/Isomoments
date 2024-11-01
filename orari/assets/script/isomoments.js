// Filtro ISO
function convertISOtoOpacity(iso) {
    const minISO = 40;
    const maxISO = 1600;

    const clampedISO = Math.min(Math.max(iso, minISO), maxISO);
    const normalizedISO = (clampedISO - minISO) / (maxISO - minISO);

    const minOpacity = 0.04;
    const maxOpacity = 1;

    const opacity = minOpacity + (normalizedISO * (maxOpacity - minOpacity));
    return opacity;
}


// Funzione principale
async function run() {
    let data;

    // Caricamento dati JSON
    await fetch("../assets/data/data_exif.json")
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

    // Ordinamento dati
    data.sort((elementoA, elementoB) => {
        const oraA = parseInt(elementoA.EXIF.Ora.H, 10);
        const oraB = parseInt(elementoB.EXIF.Ora.H, 10);
        const minutiA = parseInt(elementoA.EXIF.Ora.M, 10);
        const minutiB = parseInt(elementoB.EXIF.Ora.M, 10);
        const secondiA = parseInt(elementoA.EXIF.Ora.S, 10);
        const secondiB = parseInt(elementoB.EXIF.Ora.S, 10);

        if (oraA !== oraB) {
            return oraA - oraB;
        } else if (minutiA !== minutiB) {
            return minutiA - minutiB;
        } else {
            return secondiA - secondiB;
        }
    });

    //Creazione categorie
    let cats = "";
    let categorie = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7];
    for (let i = 0; i < categorie.length; i++) {
        let mia_ora = categorie[i].toString().padStart(2, '0') + ':00'
        let imageCount = 0;

        for (let n = 0; n < data.length; n++) {
            if (parseInt(data[n].EXIF.Ora.H, 10) === categorie[i]) {
                imageCount++;
            }
        }

        cats += "<div class='main_box" + (i === 0 ? " first-category" : "") + "'>";
        cats += '<div class="info">'
        cats += "<h1>" + mia_ora + "</h1>";
        cats += "<p id='image_count" + categorie[i] + "'>" + imageCount + " foto</p>";
        cats += '</div>'
        cats += '<div class="box">'
        cats += "<div class='H' id='" + categorie[i] + "'></div>";
        cats += '</div>'
        cats += "</div>";
    }

    const main = document.getElementById('main');
    main.innerHTML += cats;

    // Caricamento immagini
    for (let i = 0; i < data.length; i++) {
        let output = "";
        let exif = data[i].EXIF;
        const ora = parseInt(exif.Ora.H, 10);
        const container = document.getElementById(ora);

        const imagePath = "./assets/imgs/img_256/" + data[i].FileName + ".jpg";

        output += "<div class='image-container'>";
        output += "<img src='" + imagePath + "' alt='Imm' style='filter: grayscale(100%); opacity: " + convertISOtoOpacity(exif.ISO) + ";' class='image'>";
        output += "</div>";

        container.innerHTML += output;
    }
    
    handleScroll();

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
    document.getElementById('orari').classList.add('active');
    run();
};
// Filtro iso
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



async function run() {
    let data;

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



    // Ordinamento dei dati per ora, e poi per data
    data.sort((elementoA, elementoB) => {
        const oraA = parseInt(elementoA.EXIF.Ora.H, 10);
        const oraB = parseInt(elementoB.EXIF.Ora.H, 10);
        const dataA = new Date(elementoA.EXIF.CreateDate);
        const dataB = new Date(elementoB.EXIF.CreateDate);

        if (oraA !== oraB) {
            return oraA - oraB;
        } else {
            return dataA - dataB;
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

        cats += "<div class='main_box'>";
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


    // METADATI
    for (let i = 0; i < data.length; i++) {
        let output = "";
        let exif = data[i].EXIF;
        const ora = parseInt(exif.Ora.H, 10);
        const container = document.getElementById(ora);

        const imagePath = "./assets/imgs/img_256/" + data[i].FileName + ".JPG";

        output += "<div class='image-container'>";
        output += "<img src='" + imagePath + "' alt='Imm' style='filter: grayscale(100%); opacity: " + convertISOtoOpacity(exif.ISO) + ";' class='image'>";
        output += "</div>";

        container.innerHTML += output;
    }
    
    handleScroll();

}


// Gestore scroll
function handleScroll() {
    const categories = document.querySelectorAll('.main_box');
    const windowHeight = window.innerHeight;

    categories.forEach(category => {
        const rect = category.getBoundingClientRect();
        const middleOfCategory = rect.top + rect.height / 1.6;

        if (middleOfCategory >= 0 && middleOfCategory <= windowHeight) {
            if (middleOfCategory === rect.top + rect.height / 1.6) {
                category.querySelector('h1').style.color = 'black';
                category.querySelector('p').style.color = 'black';
            }
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



// Bottone attivo
window.onload = function() {
    document.getElementById('orari').classList.add('active');
    run();
};
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

        const adjustedOraA = oraA < 8 ? oraA + 24 : oraA;
        const adjustedOraB = oraB < 8 ? oraB + 24 : oraB;

        return adjustedOraA - adjustedOraB;
    });

    const main = document.getElementById('main');
    let output = "";


    for (let i = 0; i < data.length; i++) {
        const exif = data[i].EXIF;
        const ora = parseInt(exif.Ora.H, 10);

        const imagePath = "./assets/imgs/img_120/" + data[i].FileName + ".JPG";

        output += "<img src='" + imagePath + "' alt='Imm' style='filter: grayscale(100%); opacity: " + convertISOtoOpacity(exif.ISO) + ";' class='image'>";
    }

    main.innerHTML = output;
}



// Bottone attivo
window.onload = function() {
    document.getElementById('galleria').classList.add('active');
    
    run();
};
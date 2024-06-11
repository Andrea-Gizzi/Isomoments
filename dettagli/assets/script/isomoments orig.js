async function run() {
    let data;

    await fetch("../dettagli/assets/data/data_yolo.json")
        .then(r => r.json())
        .then(json => {
            data = json;
        })
    //     .catch(error => {
    //         console.error("Errore nel caricamento del JSON", error);
    //     });

    // if (!data) {
    //     console.error("Nessun dato caricato");
    //     return;
    // }



    const labelsSet = new Set();
    for (let i = 0; i < data.length; i++) {
        const objects = data[i].Objects;
        if (objects && objects.length > 0 && objects[0].label) {
            labelsSet.add(objects[0].label);
        }
    }

    const labels = [...labelsSet];

    let categories = {};
    for (let i = 0; i < labels.length; i++) {
        categories[labels[i]] = [];
    }


    for (let i = 0; i < data.length; i++) {
        const objects = data[i].Objects;
        if (objects && objects.length > 0) {
            const label = objects[0].label;
            if (label) {
                categories[label].push(data[i]);
            }
        }
    }
    // console.log(categories)


    function imageExists(image_url){

        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();

        result = '';
        if (http.status != 404){
            result = true
        }
        else {
            result =  false
        }
        return result
        
    }

    

    let cats = "";
    for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        cats += "<div class='main_box'>";
        cats += "<h1>" + label + "</h1>";
        cats += '<div class="box">';
        cats += "<div class='H' id='" + label + "'>";
        
        for (let j = 0; j < categories[label].length; j++) {
            mio_array = categories[label]
            console.log(mio_array)

            // for (let a = 0; a < mio_array.length; a++) {
            //     let fileName = mio_array[a].FileName;
            //     console.log(fileName)

            //     let conta_persone = mio_array[a].Objects.length - 1
            //     // console.log(mio_array, conta_persone)

            //     const imagePath = "../dettagli/assets/imgs/yolo_crop/" + fileName + "_" + conta_persone + ".jpg";
            //     cats += "<div class='image-container'>";
            //     cats += "<img src='" + imagePath + "' alt='Imm'>";
            //     cats += "</div>";
            // }
        }
        

        cats += '</div>';
        cats += "</div>";
        cats += "</div>";
        
    }

    document.getElementById("main").innerHTML += cats;
    handleScroll();
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

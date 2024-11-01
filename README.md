SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 2: XL

# ISOMOMENTS
Autore: Gizzi Andrea  
[ISOMOMENTS](https://andrea-gizzi.github.io/Isomoments/)

## Introduzione e tema
La consegna consisteva nella progettazione di un sistema di interfaccia web interattiva che permetta di visualizzare ed esplorare 1000 foto (o più) tra quelli presenti nell'archivio fotografico del proprio smartphone.

Nel mio caso, ho sviluppato un archivio interattivo contenente tutte le fotografie presenti nella galleria del mio smartphone. Le immagini sono organizzate in base alle fasce orarie di cattura e analizzate utilizzando i dati ISO per rivelare i pattern di scatto preferiti durante la giornata. L'obiettivo principale dell'interfaccia è fornire una rappresentazione visiva e analitica delle mie abitudini fotografiche quotidiane, unendo estetica e dati per una comprensione più profonda del mio uso personale della fotografia.

## Riferimenti progettuali
Nel progetto, non mi sono basato su un modello specifico come riferimento progettuale; piuttosto, ho riflettuto su come inserire i contenuti per soddisfare il mio obiettivo in modo chiaro e facilmente comprensibile. L'aspetto principale è stato selezionare un approccio visivo che valorizzasse ogni singola foto e che rappresentasse la mia giornata, invitando l'utente a esplorarla. L'interfaccia è stata progettata per essere funzionale, caratteristica e interattiva, offrendo un'esperienza coinvolgente.


## Design dell’interfaccia e modalià di interazione
Il design dell'interfaccia è semplice e intuitivo. Ogni scelta è stata orientata a migliorare l'interazione dell'utente, facilitando la scoperta del contenuto attraverso una buona ergonomia e un chiaro orientamento.  L'interfaccia mantiene una struttura uniforme su tutte le pagine:

- Header: situato nella parte superiore, include bottoni intuitivi per la navigazione e per il ritorno alla pagina principale del corso.
- Footer: posizionato nella parte inferiore, contiene informazioni sul corso, il nome dell'interfaccia e la sitografia.
  
L'interfaccia offre diverse modalità di interazione a seconda della pagina selezionata:

- Galleria: raccoglie tutte le fotografie presenti nell'archivio, presentandole in una galleria con scorrimento verticale e il titolo dell'interfaccia.
- Orari: utilizza un layout suddiviso in categorie per evidenziare le immagini scattate in diverse fasce orarie.
- Dettagli: mostra i dettagli delle fotografie seguendo il layout della pagina Orari, con categorie riferite a tipi di elementi.
  
Questa struttura uniforme e le modalità di interazione differenziate rendono l'interfaccia accattivante e accessibile, promuovendo una navigazione chiara e informativa per gli utenti. Un filtro applicato sopra le immagini aiuta l'utente a scoprire le immagini e rappresenta visivamente gli ISO durante la mia giornata, creando una sfumatura che va dal mattino alla sera. I dettagli non utilizzano questo filtro poiché la loro funzione è mostrare gli elementi senza una collocazione temporale.


## Tecnologia usata
La peculiarità dell'interfaccia è l'invito forte all'utente di esplorare tutte le immagini, nascoste grazie a un filtro basato sulla scala di grigi e sull'opacità che varia in base agli ISO di ogni immagine. Questo crea un'estetica invitante e rafforza i momenti della giornata, dal mattino alla sera, rendendo così l'interfaccia unica e identificativa.


```JavaScript
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

//...

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
```

## Target e contesto d’uso
L'interfaccia è stata ideata originariamente come analisi personale delle mie foto, ma si è evoluta fino a diventare una rappresentazione della mia giornata e della mia personalità. È particolarmente adatta per amici, parenti e persone curiose sulla gestione dell'archivio e sul mio modo di vivere. Il contesto d'uso principale è la condivisione in ambito privato e sociale, dove può servire come mezzo per raccontare e condividere esperienze visive in modo interattivo e coinvolgente. Inoltre, può essere utilizzata come strumento per esplorare la distribuzione temporale delle mie attività fotografiche.

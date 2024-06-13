SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 2: XL

# ISOMOMENTS
Autore: Gizzi Andrea  
[ISOMOMENTS](https://andrea-gizzi.github.io/Isomoments/)

## Introduzione e tema
La consegna consisteva nella progettazione di un sistema di interfaccia web interattiva che permetta di visualizzare ed esplorare 1000 foto (o più) tra quelli presenti nell'archivio fotografico del proprio smartphone.

Nel mio caso, è stato realizzato un archivio interattivo contenente tutte le fotografie presenti nella galleria del mio smartphone. Le immagini sono organizzate in base alle fasce orarie di cattura e analizzate utilizzando i dati ISO per rivelare i pattern di scatto preferiti durante la giornata. L'obiettivo principale dell'interfaccia è fornire una rappresentazione visiva e analitica delle mie abitudini fotografiche quotidiane, unendo estetica e dati per una comprensione più profonda del mio uso personale della fotografia.

## Riferimenti progettuali
Nel progetto, non mi sono basato su un modello specifico come riferimento progettuale; piuttosto, ho dedicato tempo a riflettere su come inserire i diversi contenuti in modo che soddisfacessero il mio obiettivo, risultando chiaro e facilmente comprensibile. L'aspetto principale è stato selezionare un approccio visivo che valorizzasse ogni singola foto e che rappresentasse la mia giornata, invitando l'utente a scoprirla. L'interfaccia doveva essere funzionale, caratteristica e interattiva, offrendo un'esperienza coinvolgente.


## Design dell’interfraccia e modalià di interazione
Il design dell'interfaccia è semplice e intuitivo. Ogni scelta è stata fatta per aumentare l'interazione dell'utente, permettendogli di scoprire il contenuto attraverso una buona ergonomia e un senso di orientamento chiaro. L'interfaccia mantiene una struttura uniforme su tutte le pagine:

- Header: situato nella parte superiore, include bottoni intuitivi per la navigazione e per il ritorno alla pagina principale del corso.
- Footer: collocato nella parte inferiore, contiene informazioni sul corso, il nome dell'interfaccia e tutta la sitografia.
L'interfaccia supporta diverse modalità di interazione a seconda della pagina selezionata:

- Galleria: raccoglie tutte le fotografie presenti nell'archivio, presentandole in una galleria con scorrimento verticale e il titolo dell'interfaccia.
- Orari: utilizza un layout suddiviso in categorie per evidenziare le immagini scattate in diverse fasce orarie.
- Dettagli: mostra i dettagli delle fotografie, seguendo il layout della pagina Orari, con categorie riferite a tipi di elementi.
  
Questa struttura uniforme e le modalità di interazione differenziate rendono l'interfaccia accattivante e accessibile, promuovendo una navigazione chiara e informativa per gli utenti. Un filtro applicato sopra le immagini aiuta l'utente a scoprire le immagini e rappresenta visivamente gli ISO durante la mia giornata, creando una sfumatura che va dal mattino alla sera. I dettagli non utilizzano questo filtro poiché la loro funzione è mostrare gli elementi senza una collocazione temporale.


## Tecnologia usata
Nunc consequat interdum varius sit amet mattis vulputate. Vehicula ipsum a arcu cursus vitae congue. Odio ut sem nulla pharetra. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Quisque egestas diam in arcu cursus. Eget nulla facilisi etiam dignissim diam. Aenean sed adipiscing diam donec adipiscing tristique. Porttitor massa id neque aliquam. Sem viverra aliquet eget sit amet tellus cras. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Lacus sed turpis tincidunt id aliquet risus feugiat.


```JavaScript
const image = new Image();
image.onload = () => {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(
		gl.TEXTURE_2D,
		level,
		internalFormat,
		srcFormat,
		srcType,
		image
	);
	if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
		gl.generateMipmap(gl.TEXTURE_2D);
	} else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
};
image.src = url;
```

## Target e contesto d’uso
Sed enim ut sem viverra aliquet eget sit. Iaculis at erat pellentesque adipiscing commodo. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Ipsum faucibus vitae aliquet nec ullamcorper sit. Tempus quam pellentesque nec nam aliquam sem et tortor. Turpis egestas sed tempus urna et pharetra pharetra massa. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel.

[<img src="doc/munari.jpg" width="300" alt="Supplemento al dizionario italiano">]()

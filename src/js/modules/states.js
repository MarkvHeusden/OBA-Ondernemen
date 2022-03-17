// UI States
export function showState(state, productData) {
    const detailsEl = document.querySelector('.details');
    let markup;

    switch (state) {
        case 'scanning':
            markup = `
            <h1>Richt je camera op een barcode...</h1>
            <img src="img/barcode.png" alt="barcode placeholder" />
            `
            detailsEl.classList.remove('open', 'result')
            break

        case 'loading':
            markup = `
            <h1>Product info ophalen...</h1>
            <img src="img/spinner.gif" />
            `
            detailsEl.classList.remove('open')
            break
        
        case 'product':
            markup = `
            <h1>${productData.name}</h1>
            <img src="${productData.img}" alt="${productData.name}" />
            <h2>Voedingswaarden (100g)</h2>
            <ul class="nutriments">
            `
            Object.values(productData.nutriments).forEach(nutri => {
                markup += `<li><span>${Math.round(nutri.value * 10) / 10} ${nutri.unit}</span>${nutri.name}</li>`
            })
            markup += `</ul>
            <h2>Ingrediënten</h2>
            <p>${productData.ingredients ? productData.ingredients : 'Geen informatie over ingrediënten gevonden.'}</p>
            `
            detailsEl.addEventListener('click', toggleDetails);
            detailsEl.classList.add('result', 'open')
            break

        case 'no-info':
            markup = `
            <div class="failed warning">
                <img src="img/warn.svg" alt="warning" />
                <h1>Geen product info gevonden</h1>
            </div>
            <p>Er zijn geen gegevens beschikbaar voor dit product. Probeer een ander product.</p>
            `
            detailsEl.classList.remove('result', 'open')
            detailsEl.removeEventListener('click', toggleDetails);
            break

        case 'no-detector':
            markup = `
            <div class="failed error">
                <img src="img/error.svg" alt="error" />
                <h1>Scanner niet beschikbaar</h1>
            </div>
            <p>Scanner niet beschikbaar. Update je device & browser of probeer het op een ander apparaat.</p>
            `
            detailsEl.classList.remove('result', 'open')
            break

        default:
            markup = `
            <div class="failed warning">
                <img src="img/warn.svg" alt="warning" />
                <h1>Onbekende fout opgetreden</h1>
            </div>
            <p>Er is een onbekende fout opgetreden. Check je verbinding en probeer het opnieuw.</p>
            `
            detailsEl.classList.remove('result', 'open')
            detailsEl.removeEventListener('click', toggleDetails);
            break
    }

    detailsEl.innerHTML = markup;
}

function toggleDetails() {
    this.classList.toggle('open');
}
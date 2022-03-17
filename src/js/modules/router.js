import { getCamera } from './barcodeDetector.js';
import { showState } from './states.js'
import { getProductData } from './getData.js';
import { Routie } from './vendor/routie.js';

export function handleRoutes() { 
    routie({
        'scanning': () => {
            getCamera()
            showState('scanning')
        },
        'product/:barcode': barcode => {
            showState('loading')
            getProductData(barcode)
            .then(productData => showState('product', productData))
            .catch(status => showState(status))
        }
    })
};
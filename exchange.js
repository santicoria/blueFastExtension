

document.addEventListener('DOMContentLoaded', function() {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const amount = document.getElementById('amount');
    const amountPesos = document.getElementById('amountPesos');
    const currency1 = document.getElementById('currency1');
    const currency2 = document.getElementById('currency2');
    const convertDolares = document.getElementById('convertDolares');
    const convertPesos = document.getElementById('convertPesos');
    const result = document.getElementById('result');
    const resultPesos = document.getElementById('resultPesos');

    const apiUrl="https://dolarapi.com/v1/dolares/"

    convertDolares.addEventListener('click', () => {
        const amountTotal = amount.value; //Dolares
        const currencyTotal = currency2.value; // Tipo dolar
        const url = apiUrl + currencyTotal;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const rate = data.venta;
            const resultPrice = amountTotal * rate;
            result.innerHTML = `${numberWithCommas(amountTotal)} USD ${currencyTotal} = ${numberWithCommas(resultPrice.toFixed(2))} ARS`;
        })
        .catch(error => {
            console.error('Request failed: ', error);
            result.innerHTML = 'Ocurrio un error. Por favor, intente de nuevo.'
        })
    })

    convertPesos.addEventListener('click', () => {
        const amountTotalPesos = amountPesos.value; // Pesos
        console.log('Total: ', amountTotalPesos)
        const currencyTotal = currency1.value; // Tipo dolar
        const url = apiUrl + currencyTotal;
        console.log('URL: ', url)

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const rate = data.venta;
            const resultPrice = amountTotalPesos / rate;
            resultPesos.innerHTML = `${numberWithCommas(amountTotalPesos)} ARS = ${numberWithCommas(resultPrice.toFixed(2))} USD ${currencyTotal}`;
        })
        .catch(error => {
            console.error('Request failed: ', error);
            resultPesos.innerHTML = 'Ocurrio un error. Por favor, intente de nuevo.'
        })
    })

})
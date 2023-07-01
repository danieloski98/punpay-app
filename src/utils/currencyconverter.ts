import "intl";

import "intl/locale-data/jsonp/en";


export function currencyFormat(num: number) {
    //const newnum = Intl.NumberFormat('en', { style: 'currency', currency: coin,  maximumFractionDigits: numberofPlaces }).format(num);
    //return newnum;
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 }
 console.log(currencyFormat(2665)); // $2,665.00
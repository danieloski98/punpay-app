export function currencyFormat(num: number) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
 console.log(currencyFormat(2665)); // $2,665.00
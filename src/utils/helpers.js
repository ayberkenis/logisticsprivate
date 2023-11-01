

function userFriendlyDate(date) {
    date = new Date(date);
    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}


function kdvCalculation(amount, kdvRate) {
    return (amount * kdvRate) / 100;
}

function secondsToTimeFormat(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds - hour * 3600) / 60);
    const second = seconds - hour * 3600 - minute * 60;
    // check if hour is zero and if it is dont return 0 saat
    const hourStatement = hour === 0 ? '' : `${hour} saat`;
    return `${hourStatement} ${minute} dakika ${second} saniye`;
}

function arventoDateTimetoHuman(inputDate) {
    
const year = inputDate.slice(0, 4);
const month = inputDate.slice(4, 6);
const day = inputDate.slice(6, 8);
const hour = inputDate.slice(8, 10);
const minute = inputDate.slice(10, 12);
const second = inputDate.slice(12, 14);

const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
return formattedDate;
}

export { userFriendlyDate, kdvCalculation, secondsToTimeFormat, arventoDateTimetoHuman };
"use client"
import moment from "moment";

export const getNumbers = (v) => {
    if (!v || !v.trim()) {
        return undefined;
    }
    let numb = v.match(/\d/g);
    if(numb) {
        return numb.join("");
    } else return ''

};

export function fakeApiCallSuccess(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout || 1000);
    });
}
export function capitalize(text) {
    if (text) {
        return text
            .toLowerCase()
            .split(' ') // Divide o texto em palavras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
            .join(' '); // Junta as palavras de volta
    }
    return "";
}

export const formattedDate = (date) => {
    const isValid = moment(date, 'YYYY-MM-DD', true).isValid()

    if (isValid) {
        return moment(date).format('DD/MM/YYYY');
    }

    return date
}

export const getFromDate = (date, isDelivery = false) => {
    const now = moment();
    const fromApi = moment(date, 'YYYY-MM-DD', true).isValid();
    const target = moment(date, fromApi ? 'YYYY-MM-DD' : 'DD/MM/YYYY').endOf('months');
    const diff = target.diff(now);
    const isPast = diff < 0;
    const duration = moment.duration(Math.abs(diff));
    const months = Math.floor(duration.asMonths());
    const adjustedDays = Math.floor(duration.asDays() % 30);
    const hours = duration.hours();
    const pluralize = (count, singular, plural) =>
        count === 1 ? singular : plural;
    let status;

    if (isPast) {
        if (months > 0) {
            status = isDelivery
                ? `Entregada há ${months} ${pluralize(months, 'mês', 'meses')}`
                : `Encerrada há ${months} ${pluralize(months, 'mês', 'meses')}`;
        } else if (adjustedDays > 0) {
            status = isDelivery
                ? `Entregada há ${adjustedDays} ${pluralize(adjustedDays, 'dia', 'dias')}`
                : `Encerrada há ${adjustedDays} ${pluralize(adjustedDays, 'dia', 'dias')}`;
        } else {
            status = isDelivery
                ? `Entregada há ${hours} ${pluralize(hours, 'hora', 'horas')}`
                : `Encerrada há ${hours} ${pluralize(hours, 'hora', 'horas')}`;
        }
    } else {
        if (months > 0) {
            status = isDelivery
                ? `Entrega em ${months} ${pluralize(months, 'mês', 'meses')}`
                : `Encerra em ${months} ${pluralize(months, 'mês', 'meses')}`;
        } else if (adjustedDays > 0) {
            status = isDelivery
                ? `Entrega em ${adjustedDays} ${pluralize(adjustedDays, 'dia', 'dias')}`
                : `Encerra em ${adjustedDays} ${pluralize(adjustedDays, 'dia', 'dias')}`;
        } else {
            status = isDelivery
                ? `Entrega em ${hours} ${pluralize(hours, 'hora', 'horas')}`
                : `Encerra em ${hours} ${pluralize(hours, 'hora', 'horas')}`;
        }
    }
    return status;
}

export const getOnlyBase64 = (e) => {
    return e.split(',').pop()
}

export const getMessagingTokenService = (cb) => {
    try {
        if(window.firebase.messaging?.isSupported()) {
            window.firebase.messaging().getToken().then((token) => {
                cb(token)
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                return null
            });
        } else {
            return null
        }
    } catch (e) {
        return null
    }
}
export const getPhoneNumbersWithoutCodeCountry = (item) => {
    if(!item){
        return false
    }
    let aux = item.toString().replace(/\D/ig, '');
    let auxFinal = '';
    if(aux.substring(0,3) === '+55') {
        auxFinal = aux.slice(3, aux.length);
        return auxFinal;
    } else if(aux.substring(0,2) === '55') {
        auxFinal = aux.slice(2, aux.length);
        return auxFinal;
    } else return aux;
}

export const maskPhone = (value) => {
    if(!value) return '';
    let a = value.replace(/[^0-9]/g, '');

    switch (a.length) {
        case 0:
            a = '';
            break;
        case 1:
            a = '(' + a.charAt(0);
            break;
        case 2:
            a = '(' + a.charAt(0) + a.charAt(1);
            break;
        case 3:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2);
            break;
        case 4:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3);
            break;
        case 5:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4);
            break;
        case 6:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5);
            break;
        case 7:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6);
            break;
        case 8:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7);
            break;
        case 9:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7) + a.charAt(8);
            break;
        case 10:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5)  + '-' + a.charAt(6) + a.charAt(7) + a.charAt(8) + a.charAt(9);
            break;
        case 11:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7) + a.charAt(8) + a.charAt(9) + a.charAt(10);
            break;
        default:
            a = '(' + a.charAt(0) + a.charAt(1) + ') ' + a.charAt(2) + a.charAt(3) + a.charAt(4) + a.charAt(5) + a.charAt(6)  + '-' + a.charAt(7) + a.charAt(8) + a.charAt(9) + a.charAt(10);
            break;
    }
    return a;
};

export const getActiveKey = (items, path, id) => {
    const keysToActivate = new Set();

    const activateKeysByPath = (items, path) => {
        items.forEach((item, index) => {

            if (path?.endsWith(item.path)) { //CARAIO CHUTEI q essa funcao existia kopadkopadskadopskrvwop
                let auxIndex = id ? `${id}.${index}` : `${index}`
                keysToActivate.add(auxIndex);
                if (item.children.length > 0) {
                    activateKeysByPath(item.children, path, id);
                }
            }
        });
    };
    activateKeysByPath(items,path);

    return keysToActivate;
}

export const getActiveBreadCrumb = (items, path) => {
    const keysToActivate = [];
    let master = '';
    let masterDescription = '';
    let masterPath = '';
    let childrenCrumb = '';
    let childrenDescription = '';
    const activateKeysByPath = (items, path) => {
        items.forEach(item => {
            if (path?.startsWith(item.path)) {
                keysToActivate.push(item);
                if (item.children.length > 0) {
                    activateKeysByPath(item.children, path);
                }
            }
        });
    };

    activateKeysByPath(items,path);
    if(keysToActivate.length > 0) {
        master = keysToActivate[0].name;
        masterDescription = keysToActivate[0].description;
        masterPath = keysToActivate[0].path;
        if(keysToActivate.length > 1) {
            childrenCrumb = keysToActivate[1].name;
            childrenDescription = keysToActivate[1].description;
        }
    }



    return {master, masterPath, masterDescription, childrenDescription, childrenCrumb};
}


export const maskHour = (value) => {
    let a = value.replace(/[^0-9]/g, '');

    switch (a.length) {
        case 0:
            a = '';
            break;
        case 1:
            if (Number(a) >= 3) {
                a = '0' + a.charAt(0);
            } else {
                a = a.charAt(0);
            }
            break;
        case 2:
            if (Number(a.charAt(0)) === 2 && a.charAt(1) > 3) {
                a = a.charAt(0);
            } else {
                a = a.charAt(0) + a.charAt(1);
            }
            break;
        case 3:
            if (a.charAt(2) < 6) {
                a = a.charAt(0) + a.charAt(1) + ':' + a.charAt(2);
            } else {
                a = a.charAt(0) + a.charAt(1);
            }
            break;
        case 4:
            a = a.charAt(0) + a.charAt(1) + ':' + a.charAt(2) + a.charAt(3);
            break;
        default:
            a = a.charAt(0) + a.charAt(1) + ':' + a.charAt(2) + a.charAt(3);
            break;
    }
    return a;
}

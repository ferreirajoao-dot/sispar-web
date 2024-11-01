export class Masks {
    static realCurrency = (price: number) => {
        if (price) {
            return price.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        }
    };


    static onlyDigits = (item: string) => {
        if (item) return item.replace(/\D/g, '');
    };

    static formatCpfOrCnpj(value:string) {
        if (value) {
            value = value.replace(/\D/g, '');

            if (value.length === 11) {
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else if (value.length === 14) {
                return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            } else {
                throw new Error('O valor deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)');
            }
        }

    }

    static removeCountryCode = (item: string, formatNumber: boolean = true) => {
        if(!item){
            return false
        }
        let aux = item.toString().replace(/\D/ig, '');
        let auxFinal = '';
        if(aux.substring(0,3) === '+55') {
            auxFinal = aux.slice(3, aux.length);
            if (formatNumber) {
                return this.formatPhoneNumber(auxFinal)
            }

            return auxFinal;
        } else if(aux.substring(0,2) === '55') {
            auxFinal = aux.slice(2, aux.length);

            if (formatNumber) {
                return this.formatPhoneNumber(auxFinal)
            }

            return auxFinal;
        } else return aux;
    }

    static formatPhoneNumber(value: string) {
        // Remove todos os caracteres que não são dígitos
        value = value.replace(/\D/g, '');

        // Adiciona parênteses para os primeiros dois dígitos
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        }

        // Adiciona o hífen após o quinto dígito (sem contar os parênteses)
        if (value.length > 9) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }

        return value;
    }

    static testDynamicPhoneNumber (val: string) {
        if (val.trim() === '') {
            return "";
        }
        let number = Masks.onlyDigits(val);
        return number && (number.toString().length === 10 || number.toString().length === 11)
    }
}

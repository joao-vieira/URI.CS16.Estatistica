class NumberHelper {

    constructor() {
		throw new Error('A classe NumberHelper não deve ser instanciada!');
    }


    static geraNumeroInteiroAleatoriamente(min = 5, max = 500) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
    }
    

    static geraNumerosInteirosEntreDoisValores(min, max, quantidade) {

        let listaNumeros = [];
        for (let index = 0; index < quantidade; index++) {
            const numero = NumberHelper.geraNumeroInteiroAleatoriamente(min, max);
            listaNumeros.push(numero);
        }

        return listaNumeros;
    }


    static arredondamentoABNT5891(numeroParaArredondar, casasDecimaisDesejadas) {

        // Pega todos os valores antes e após o ponto
        let digitosAntesDoPonto                 = numeroParaArredondar.toString().split('.')[0];
        let digitosAposPonto                    = numeroParaArredondar.toString().split('.')[1];
        let posicaoUltimoValorMantido           = casasDecimaisDesejadas - 1;
        let posicaoValorSeguinteAoUltimoMantido = casasDecimaisDesejadas;

        // Se não existirem números após o ponto (inteiro), apenas incremento '.0' tantas vezes quanto a quantia de casas decimais desejadas, para que a visualização fique padronizada
        if( !digitosAposPonto ) {
            // Quando o valor 'Amodal' é recebido, apenas retorno a palavra novamente
            if( numeroParaArredondar.toString().match(/[a-z]/i) ) return numeroParaArredondar;

            let zerosADireita = '.0';
            for(let i=1; i<casasDecimaisDesejadas; i++) zerosADireita += '0';
            return digitosAntesDoPonto + zerosADireita;
        }

        // Se o número enviado já possui o número de casas decimais desejadas, apenas retorno ele mesmo
        if( digitosAposPonto && digitosAposPonto.length == casasDecimaisDesejadas ) return numeroParaArredondar;

        // Esse são os dois principais valores do arredondamento: o último valor mantido e o valor seguinte após o último mantido
        // Ex.: 77.543 (1 casa) => valor que será 'mantido' = 5 e o seguinte após o último mantido = 4
        let ultimoValorMantido = digitosAposPonto[posicaoUltimoValorMantido];
        let valorSeguinteAoUltimoMantido = digitosAposPonto[posicaoValorSeguinteAoUltimoMantido];
        let digitosAposOPontoAntesDoUltimoMantido = digitosAposPonto.substr(0, posicaoUltimoValorMantido);

        if( parseInt(valorSeguinteAoUltimoMantido) > 5 ) {
            
            return NumberHelper.arredondaValorAcima(digitosAntesDoPonto, digitosAposOPontoAntesDoUltimoMantido,  ultimoValorMantido);
        } else if( parseInt(valorSeguinteAoUltimoMantido) < 5 ) {
            
            return NumberHelper.arredondaValorAbaixo(digitosAntesDoPonto, digitosAposOPontoAntesDoUltimoMantido, ultimoValorMantido);
        } else {

            if( ultimoValorMantido % 2 ) { // Ímpar
                
                return NumberHelper.arredondaValorAcima(digitosAntesDoPonto, digitosAposOPontoAntesDoUltimoMantido,  ultimoValorMantido);
            } else { // Par
                
                let valoresAposOCinco = digitosAposPonto.substr(posicaoValorSeguinteAoUltimoMantido + 1);
                if( valoresAposOCinco ) {
                    
                    return NumberHelper.arredondaValorAcima(digitosAntesDoPonto, digitosAposOPontoAntesDoUltimoMantido,  ultimoValorMantido);
                } else {

                    return NumberHelper.arredondaValorAbaixo(digitosAntesDoPonto, digitosAposOPontoAntesDoUltimoMantido, ultimoValorMantido);
                }
            }
        }
    }


    static arredondaValorAcima(_digitosAntesDoPonto, _digitosAposOPontoAntesDoUltimoMantido, _ultimoValorMantido) {

        let valorArredondado = parseInt(_ultimoValorMantido) + 1;
        return _digitosAntesDoPonto + '.' + _digitosAposOPontoAntesDoUltimoMantido + valorArredondado;
    }


    static arredondaValorAbaixo(_digitosAntesDoPonto, _digitosAposOPontoAntesDoUltimoMantido, _ultimoValorMantido) {

        return _digitosAntesDoPonto + '.' + _digitosAposOPontoAntesDoUltimoMantido + _ultimoValorMantido;
    }



}



















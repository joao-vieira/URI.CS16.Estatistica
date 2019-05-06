class EstatisticaDescritiva {

    constructor() {
        this._mediaAritmetica   = 0.0;
        this._mediaGeometrica   = 0.0;
        this._moda              = 0.0;
        this._mediana           = 0.0;
        this._varianciaPop      = 0.0;
        this._desvPadraoPop     = 0.0;
        this._varianciaAmostra  = 0.0;
        this._desvPadraoAmostra = 0.0;
        this._coeficienteVariac = 0.0;

        this._medidas = this._atualizarMedidasEstatisticas();
    }


    get medidas() {
        return [].concat(this._medidas);
    }


    _atualizarMedidasEstatisticas() {

        return [
            {simbolo: 'x̅',  descricao: 'Média Aritmética',                  valor: NumberHelper.arredondamentoABNT5891(this._mediaAritmetica, 1),          italico: false},
            {simbolo: 'G',  descricao: 'Média Geométrica',                  valor: NumberHelper.arredondamentoABNT5891(this._mediaGeometrica, 1),          italico: true},
            {simbolo: 'Mo', descricao: 'Moda',                              valor: NumberHelper.arredondamentoABNT5891(this._moda, 1),                     italico: true},
            {simbolo: 'x̃',  descricao: 'Mediana',                           valor: NumberHelper.arredondamentoABNT5891(this._mediana, 1),                  italico: false},
            {simbolo: 'σ²', descricao: 'Variância Populacional',            valor: NumberHelper.arredondamentoABNT5891(this._varianciaPop, 1),             italico: false},
            {simbolo: 'σ',  descricao: 'Desvio Padrão Populacional',        valor: NumberHelper.arredondamentoABNT5891(this._desvPadraoPop, 1),            italico: false},
            {simbolo: 's²', descricao: 'Variância Amostral',                valor: NumberHelper.arredondamentoABNT5891(this._varianciaAmostra, 1),         italico: false},
            {simbolo: 's',  descricao: 'Desvio Padrão Amostral',            valor: NumberHelper.arredondamentoABNT5891(this._desvPadraoAmostra, 1),        italico: false},
            {simbolo: 'CV', descricao: 'Coeficiente de Variação Amostral',  valor: NumberHelper.arredondamentoABNT5891(this._coeficienteVariac, 1) + ' %', italico: false}
        ];
    }


    _calcMediaAritmetica(listaElementos) {
        let totalElementos = listaElementos.elementos.reduce((total, x) => total + x, 0.0);
        return totalElementos / listaElementos.quantidade;
    }


    _calcMediaGeometrica(listaElementos) {
        let produtoElementos = listaElementos.elementos.reduce((total, x) => total * x, 1.0);
        let power            = 1 / listaElementos.quantidade;
        return Math.pow(produtoElementos, power);
    }


    _encontraMediana(listaElementos) {
        if(listaElementos.quantidade % 2)
            return listaElementos.elementos[Math.floor(listaElementos.quantidade / 2.0)];

        let somaValoresMedianos = listaElementos.elementos[listaElementos.quantidade / 2 - 1] + listaElementos.elementos[listaElementos.quantidade / 2];
        return somaValoresMedianos / 2.0;
    }


    // See: https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
    _encontraModa(listaElementos) {
        var numbers = listaElementos.elementos;
        var modes = [], count = [], i, number, maxIndex = 0;
 
        for (i = 0; i < numbers.length; i += 1) {
            number = numbers[i];
            count[number] = (count[number] || 0) + 1;
            if (count[number] > maxIndex) {
                maxIndex = count[number];
            }
        }
    
        for (i in count)
            if (count.hasOwnProperty(i)) {
                if (count[i] === maxIndex) {
                    modes.push(Number(i));
                }
            }

        return (modes.length == listaElementos.quantidade) ? 'Amodal' : modes.join(';');
    }


    _calcSomatorioD(listaElementos, media) {
        return listaElementos.elementos.reduce((total, x) => total + ( Math.pow((x - media), 2)), 0.0);
    }


    _calcVariancia(somatorioD, n) {
        return somatorioD / n;
    }


    _calcDesvioPadrao(variancia) {
        return Math.sqrt(variancia);
    }


    _calcCoeficienteVariabilidade(desvioPadraoAmostral, media) {
        return (100 * desvioPadraoAmostral) / media;
    }
    
    
    calcularMedidasEstatisticas(listaElementos) {
        this._mediaAritmetica = this._calcMediaAritmetica(listaElementos);
        this._mediaGeometrica = this._calcMediaGeometrica(listaElementos);
        this._mediana         = this._encontraMediana(listaElementos);
        this._moda            = this._encontraModa(listaElementos);

        let somatorioElementosD = this._calcSomatorioD(listaElementos, this._mediaAritmetica);
        this._varianciaPop      = this._calcVariancia(somatorioElementosD, listaElementos.quantidade);
        this._desvPadraoPop     = this._calcDesvioPadrao(this._varianciaPop);
        this._varianciaAmostra  = this._calcVariancia(somatorioElementosD, listaElementos.quantidade - 1);
        this._desvPadraoAmostra = this._calcDesvioPadrao(this._varianciaAmostra);
        this._coeficienteVariac = this._calcCoeficienteVariabilidade(this._desvPadraoAmostra, this._mediaAritmetica);

        this._medidas = this._atualizarMedidasEstatisticas();
    }

}
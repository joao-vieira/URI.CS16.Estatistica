class DistribuicaoFrequencia {

    constructor() {
        this._R = 0.0;
        this._K = 0.0;
        this._h = 0.0;
        this._somatorioFi = 0.0;
    }


    get R() {
        return this._R;
    }


    get K() {
        return this._K;
    }


    get h() {
        return this._h;
    }


    get somatorioFi() {
        return this._somatorioFi;
    }


    _calcularR(min, max) {
        return max - min;
    }


    _calcularK(n) {
        // TODO: fazer o arredondamento ABNT 5891 aqui!
        return 1 + 3.22 * Math.log10(n);
    }


    _calcularH() {
        return (Math.floor(this._R / this._K)) + 1;
    }


    // Calcula os valores de R, K e h
    calcularValoresBase(min, max, n) {
        this._R = this._calcularR(min, max);
        this._K = this._calcularK(n);
        this._H = this._calcularH();
    }


    calcularIntervalos(elementos, min, max) {
        let intervalos = [];
        let inicio = min;
        let quantidadeElm = elementos.length;
        let fi = 0;
        let fac = 0;

        for (let i = 0; i < this._K; i++) {
            for(let j = 0; j < quantidadeElm; j++ ) {
                if( elementos[j] >= inicio  &&  elementos[j] < (inicio + this._H) ) fi++;
            }

            intervalos[i] = {
                start: inicio,
                end: inicio + this._H,
                fi: fi,
                xi: NumberHelper.arredondamentoABNT5891(inicio + this._H + inicio, 1) / 2.0,
                fac: fac + fi
            };

            inicio += this._H;
            fac += fi;
            fi = 0;
            if(inicio > max) break;
        }
        
        this._somatorioFi = fac;
        return intervalos;
    }


    calcularMediaGeometricaPonderada(intervalos) {
        console.log(intervalos);
    }

}












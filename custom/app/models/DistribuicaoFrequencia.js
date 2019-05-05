class DistribuicaoFrequencia {

    constructor() {
        this._R = 0.0;
        this._K = 0.0;
        this._h = 0.0;
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

}
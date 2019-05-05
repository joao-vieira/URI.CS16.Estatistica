class ListaElementos {

    constructor() {
        this._elementos = [];
    }


	get elementos() {
		return [].concat(this._elementos);
	}


    get maiorElemento() {
		return Math.max(...this._elementos);
    }
    

    get menorElemento() {
        return Math.min(...this._elementos);
    }


    get quantidade() {
        return [].concat(this._elementos).length;
    }


    set elementos(array) {
		this._elementos = array;
    }


	limpa() {
		this._elementos = [];
    }
    

	ordenaCrescentemente() {
		this._elementos.sort((a, b) => a - b);
	}

}
class DashboardController {

    constructor() {
        this._quantidadeElementos = $("#input-qtd-elementos");
        this._textAreaElementos   = $("#textarea-elementos");
        this._sliderIntervalo     = $("#values_slider").slider({tooltip: 'always'});

        this._txtNumerosGerados   = $("#qtd-numeros-gerados");
        this._txtMenorValor       = $("#menor-valor");
        this._txtMaiorValor       = $("#maior-valor");
        this._tbodyMedidas        = $("#tbody-medidas-descritivas");

        this._txtSomatorioFi                = $("#somatorio-fi");
        this._tbodyFrequencias              = $("#tbody-distribuicao-frequencias");
        this._txtMediaAritmeticaPonderada   = $("#media-aritmetica-ponderada");
        this._txtMediaGeometricaPonderada   = $("#media-geometrica-ponderada");

        this._listaElementos      = new ListaElementos();
        this._distribuicaoFreq    = new DistribuicaoFrequencia();
        this._medidasDescritivas  = new EstatisticaDescritiva();
        this._atualizarTabelaEstatisticaDescritiva();
    }


    _atualizarTabelaEstatisticaDescritiva() {
        let corpoTabela = this._medidasDescritivas.medidas.map(medida => `
            <tr>
                <td><span class="font-weight-bold">${ (medida.italico) ? '<i>' : '' } ${ medida.simbolo } ${ (medida.italico) ? '</i>' : '' } </span></td>
                <td>${medida.descricao}</td>
                <td>${medida.valor}</td>
            </tr>
        `);
        
        this._tbodyMedidas.empty();
        this._tbodyMedidas.append(corpoTabela);
    }


    _atualizarTabelaDistribuicaoFrequencias() {
        this._distribuicaoFreq.calcularValoresBase(this._listaElementos.menorElemento, this._listaElementos.maiorElemento, this._listaElementos.quantidade);
        let intervalos = this._distribuicaoFreq.calcularIntervalos(this._listaElementos.elementos, this._listaElementos.menorElemento, this._listaElementos.maiorElemento);
        console.log(intervalos);
        let corpoTabela = intervalos.map(intervalo => `
            <tr>
                <td class="text-center"> ${intervalo.start} <span class="font-weight-bold">|-</span> ${intervalo.end}  </td>
                <td class="text-center"> ${intervalo.fi}  </td>
                <td class="text-center"> ${NumberHelper.arredondamentoABNT5891(intervalo.end + intervalo.start, 1) / 2.0}  </td>
                <td class="text-center"> ${intervalo.fac}  </td>
                <td class="text-center"> ${NumberHelper.arredondamentoABNT5891((intervalo.fi / this._distribuicaoFreq.somatorioFi) * 100.0, 1)} </td>
            </tr>
        `);
        
        let somaXiVezesFi = intervalos.reduce((total, elm) => total + (elm.fi * elm.xi), 0.0);
        let mediaAritPonderada = somaXiVezesFi / this._distribuicaoFreq.somatorioFi;

        let somaXInaFI = intervalos.reduce((total, elm) => total * Math.pow(elm.xi, elm.fi), 1.0);
        let mediaGeomPonderada = Math.pow(somaXInaFI, 1/this._distribuicaoFreq.somatorioFi);

        this._txtSomatorioFi.text(this._distribuicaoFreq.somatorioFi);
        this._txtMediaAritmeticaPonderada.text( NumberHelper.arredondamentoABNT5891(mediaAritPonderada, 1) );
        this._txtMediaGeometricaPonderada.text( NumberHelper.arredondamentoABNT5891(mediaGeomPonderada, 1) );

        this._tbodyFrequencias.empty();
        this._tbodyFrequencias.append(corpoTabela);
    }


    _criarLinhasTabelaDF() {
        
    }


    gerarValores(evt) {
        evt.preventDefault();

        if( this._quantidadeElementos.val() < 5 || this._quantidadeElementos.val() > 80 ) {
            toastr.warning('Por favor, selecione uma quantidade de elementos entre 5 e 80 números!');
            return;
        }

        this._listaElementos.elementos = NumberHelper.geraNumerosInteirosEntreDoisValores(this._sliderIntervalo.slider('getValue')[0], this._sliderIntervalo.slider('getValue')[1], this._quantidadeElementos.val());
        this._listaElementos.ordenaCrescentemente();

        this._textAreaElementos.val(this._listaElementos.elementos.join('   '));
        toastr.success(`${this._listaElementos.quantidade} elementos gerados com sucesso!`);
    }

    
    calcularModulos() {
        if( !this._textAreaElementos.val()) {
            toastr.error('É necessário gerar ou digitar os valores antes de realizar o cálculo!');
            return;
        }

        if( !this._textAreaElementos.val().match(/^[0-9\s]*$/) ) {
            toastr.error('Digite apenas valores inteiros separados por espaço para utilizar a função Calcular!');
            return;
        }

        let arrElementosDigitados = this._textAreaElementos.val().split(' ').filter(n => Number.isInteger(parseInt(n)));
        this._listaElementos.elementos = arrElementosDigitados.map(n => parseInt(n));
        this._listaElementos.ordenaCrescentemente();

        this._txtNumerosGerados.text(this._listaElementos.quantidade);
        this._txtMenorValor.text(this._listaElementos.menorElemento);
        this._txtMaiorValor.text(this._listaElementos.maiorElemento);

        this._textAreaElementos.val(this._listaElementos.elementos.join('   '));
        toastr.success(`Operações calculadas com sucesso!`);
        
        this._medidasDescritivas.calcularMedidasEstatisticas(this._listaElementos);
        this._atualizarTabelaEstatisticaDescritiva();
        this._atualizarTabelaDistribuicaoFrequencias();
    }

    
}
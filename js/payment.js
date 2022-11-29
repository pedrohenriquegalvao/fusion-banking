let buttonStep1 = document.getElementById('btn-cont1');
let buttonStep2 = document.getElementById('btn-cont2');
let buttonFinish = document.getElementById('btn-finish');
let containerPasso1 = document.getElementsByClassName('container-passo1');

let hoje = () => {
    let hoje = new Date();
    let dia = hoje.getDate();
    let mes = hoje.getMonth() + 1;
    let ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

class Boleto {
    constructor(codigoBarras, valor, nome, data) {
        this._codigoBarras = codigoBarras;
        this._valor = valor;
        this._nome = nome;
        this._data = data;
    }
    
    get codigoBarras() {
        return this._codigoBarras;
    }

    get valor() {
        return this._valor;
    }

    get nome() { 
        return this._nome;
    }

    get data() {
        return this._data;
    }
}

let valorBoleto = Math.floor(Math.random() * (400 - 70 + 1) + 70);

buttonStep1.addEventListener('click', (evento) => {
    evento.preventDefault();
    resetStyles();
    const codigo1 = document.getElementById('codigo1').value;
    const codigo2 = document.getElementById('codigo2').value;
    const codigo3 = document.getElementById('codigo3').value;
    const codigo4 = document.getElementById('codigo4').value;
 
    const nomeBoleto = document.getElementById('nome-pagamento').value;

    if(!/^[0-9]+$/.test(codigo1) || !/^[0-9]+$/.test(codigo2) || !/^[0-9]+$/.test(codigo3) || !/^[0-9]+$/.test(codigo4)) {
        document.getElementById('span-codigo-barras').style.display = "block";
    }
    if (nomeBoleto === ""){
        document.getElementById('span-nome-boleto').style.display = "block";
    } 
    else {
        let codigoBarras = codigo1 + " " + codigo2 + " " + codigo3 + " " + codigo4;
        let valor = valorBoleto;
        let nome = nomeBoleto;

        let boleto = new Boleto(codigoBarras, valor, nome, hoje());
        
        
        document.getElementById('valor-boleto').innerHTML = `R$${valor}`
        

        // Colocando os valores na tabela do passo 2
        document.getElementById('codigo-barras').innerHTML = boleto.codigoBarras;
        document.getElementById('data').innerHTML = boleto.data;
        document.getElementById('valor').innerHTML = `R$${boleto.valor},00`;
        document.getElementById('identificacao').innerHTML = boleto.nome;
        


        /*
        LÓGICA DISPLAY BLOCK PASSO 2
        */



    }
});

buttonStep2.addEventListener("click", (evento) => {
    evento.preventDefault();
    console.log("botaopasso2");

    /*
        LÓGICA DISPLAY BLOCK PASSO 3
    */
})

buttonFinish.addEventListener("click", (evento) => {
    evento.preventDefault();
    const senha = document.getElementById('senha-transacao').value;
    if (!/^[0-9]{4}$/.test(senha)) { // Exatamente 4 caracteres numéricos
        console.log("laje")

        /*
        LÓGICA span de alerta senha invalida
        */

    } else {

        /*
        LÓGICA com assync e await para voltar para home
        */

    }
});


function resetStyles() {
    document.getElementById('span-codigo-barras').style.display = "none";
    document.getElementById('span-nome-boleto').style.display = "none";
}
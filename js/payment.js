let buttonStep1 = document.getElementById('btn-cont1');
let buttonStep2 = document.getElementById('btn-cont2');
let buttonFinish = document.getElementById('btn-finish');

let divStep1 = document.getElementById('div-step-1');
let divStep2 = document.getElementById('div-step-2');
let divStep3 = document.getElementById('div-step-3');



const paginaEAcessivel = file =>
  fetch(file, {method: 'HEAD', cache: 'no-store'})
  .then(response => ({200: true, 404: false})[response.status])
  .catch(exception => undefined);



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

    let isFormOk = true;

    if(!/^[0-9]{5,}$/.test(codigo1) || !/^[0-9]{5,}$/.test(codigo2) || !/^[0-9]{5,}$/.test(codigo3) || !/^[0-9]{5,}$/.test(codigo4)) {
        document.getElementById('span-codigo-barras').style.display = "block";
        isFormOk = false;
    }
    if (nomeBoleto === ""){
        document.getElementById('span-nome-boleto').style.display = "block";
        isFormOk = false;
    } 
    
    if(isFormOk) {
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
        
        // Liberando passo 2 do pagamento
        divStep2.style.display = "block";
        
        // Liberando passo 2 da barra de progresso
        document.getElementById('wrapper-round-1').classList.remove("wrapper-round-active");
        document.getElementById('wrapper-round-1').style.display = "flex";
        document.getElementById('wrapper-round-2').classList.add("wrapper-round-active");

    }
    
    
});

buttonStep2.addEventListener("click", (evento) => {
    evento.preventDefault();

    // Liberando passo 3 do pagamento
    divStep3.style.display = "block";

    // Liberando passo 3 da barra de progresso
    document.getElementById('wrapper-round-2').classList.remove("wrapper-round-active");
    document.getElementById('wrapper-round-2').style.display = "flex";
    document.getElementById('wrapper-round-3').classList.add("wrapper-round-active");
})

function verificaSenha(senha, tempo) {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            if(!/^[0-9]{4}$/.test(senha)) {
                reject('A senha deve possuir exatamente 4 caracteres numéricos.');
                return;
            } else {
                resolve('Senha válida');
            }
        }, tempo)
    });
}

function verificarAcessoHome(tempo) {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{  
            if(!paginaEAcessivel("/pages/homepage.html")) {
                reject('Não foi possível acessar a página principal.');
                return;
            } else {
                resolve('Acessando home page.')
            }
        }, tempo)
    });
}

async function executaVerificacaoSenha(senha, tempo) {
    try {
        const fase1 = await verificaSenha(senha, tempo);
        document.getElementById('span-senha-transacao').style.display = "block";
        document.getElementById('span-senha-transacao').style.color = "green";
        document.getElementById('span-senha-transacao').innerHTML = fase1;
        await verificarAcessoHome(1000);
        document.querySelector(".payment-approved").style.display = "block";
        document.querySelector("body").style.overflowY = "hidden";
        setTimeout(() => {
            window.location.href = "/pages/homepage.html";
        }, 2500)
        
    } catch(e) {
        document.getElementById('span-senha-transacao').style.display = "block";
        document.getElementById('span-senha-transacao').style.color = "red";
        document.getElementById('span-senha-transacao').innerHTML = e;
    }
}




buttonFinish.addEventListener("click", (evento) => {
    evento.preventDefault();
    resetStyles();
    const senha = document.getElementById('senha-transacao').value;

    document.getElementById('span-senha-transacao').style.display = "block";
    document.getElementById('span-senha-transacao').style.color = "#000";
    document.getElementById('span-senha-transacao').innerHTML = "Verificando senha...";

    executaVerificacaoSenha(senha, 3000);
});


function resetStyles() {
    document.getElementById('span-codigo-barras').style.display = "none";
    document.getElementById('span-nome-boleto').style.display = "none";
    document.getElementById('span-senha-transacao').style.display = "none";
}
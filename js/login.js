let tabOptions = document.querySelector(".tab-options")
let tabFisica = document.getElementById("fisica");
let tabJuridica = document.getElementById("juridica");

// Form e seus filhos
let formLogin = document.querySelector('#form-login');
let pInputCpf = document.getElementById("cpf");
let pInputEmail = document.getElementById("email");
let pInputFone = document.getElementById("fone");
let pInputSenha = document.getElementById("senha");
let buttonLogin = document.getElementById("button-login");

let isJuridicaSelected = false;

tabFisica.addEventListener("click", () => {
    resetStyles();
    formLogin.reset();
    tabFisica.classList.add("selected");
    tabJuridica.classList.remove("selected");
    formLogin.insertBefore(pInputEmail, pInputSenha);
    formLogin.insertBefore(pInputFone, pInputSenha);
    pInputCpf.firstElementChild.placeholder = "CPF (123.456.789-01)";
    isJuridicaSelected = false
});

tabJuridica.addEventListener("click", () => {
    resetStyles();
    formLogin.reset();
    tabJuridica.classList.add("selected");
    tabFisica.classList.remove("selected");
    formLogin.removeChild(pInputEmail);
    formLogin.removeChild(pInputFone);
    pInputCpf.firstElementChild.placeholder = "CNPJ (44.444.444/0001-44)";
    isJuridicaSelected = true;
});


formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    resetStyles();
    let cpfValue = pInputCpf.firstElementChild.value;
    const regexCPF = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/; // XXX.XXX.XXX-XX
    const regexCNPJ = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/; // XX.XXX.XXX/0001-XX

    const emailValue = pInputEmail.firstElementChild.value;
    const regexEmail = /^[a-z0-9]+\@{1}[a-z]+\.com$/; // teste123@teste.com

    const foneValue = pInputFone.firstElementChild.value;
    const regexFone = /^\([1-9]{2}\)9[1-9][0-9]{3}\-[0-9]{4}$/; // (XX)9XXXX-XXXX

    const senhaValue = pInputSenha.firstElementChild.value;
    const regexSenha = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/; // Ao menos 1 numero; Ao menos 1 letra; Pelo menos 5 caracteres no total.

    let spanCpfCnpj = document.getElementById("span-cpf");

    let isFormOk = true;

    if (isJuridicaSelected) {
        let cnpjValue = cpfValue;
        if (!regexCNPJ.test(cnpjValue)) {
            spanCpfCnpj.innerText = "CNPJ inválido, por favor siga o padrão 44.444.444/0001-44";
            spanCpfCnpj.style.display = "block";
            isFormOk = false;
        } 
    } else if(!isJuridicaSelected) {
        if (!regexCPF.test(cpfValue)) {
            spanCpfCnpj.innerText = "CPF inválido, por favor siga o padrão 123.456.789-01";
            spanCpfCnpj.style.display = "block";
            isFormOk = false;
        }
        if (!regexEmail.test(emailValue)) {
            document.getElementById("span-email").style.display = "block";
            isFormOk = false;
        }
        if (!regexFone.test(foneValue)) {
            document.getElementById("span-fone").style.display = "block";
            isFormOk = false;
        }
    } 
    if (!regexSenha.test(senhaValue)) {
        document.getElementById("span-senha").style.display = "block";
        isFormOk = false;
    } 

    if (isFormOk) {
        window.location.href = '/pages/homepage.html';
    }
    
    
});

function resetStyles() {
    if(!isJuridicaSelected) {
        document.getElementById("span-email").style.display = "none";
        document.getElementById("span-fone").style.display = "none";
    }
    document.getElementById("span-cpf").style.display = "none";
    document.getElementById("span-senha").style.display = "none";
}

function resetInputValues() {
    pInputCpf.firstElementChild.value = "";
    pInputEmail.firstElementChild.value = "";
}
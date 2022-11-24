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
    tabFisica.classList.add("selected");
    tabJuridica.classList.remove("selected");
    formLogin.insertBefore(pInputEmail, pInputSenha);
    formLogin.insertBefore(pInputFone, pInputSenha);
    pInputCpf.firstChild.placeholder = "CPF (123.456.789-01)";
    isJuridicaSelected = false
});

tabJuridica.addEventListener("click", () => {
    tabJuridica.classList.add("selected");
    tabFisica.classList.remove("selected");
    pInputCpf.style.backgroundColor = "red";
    formLogin.removeChild(pInputEmail);
    formLogin.removeChild(pInputFone);
    pInputCpf.firstChild.placeholder = "CNPJ (44.444.444/0001-44)";
    isJuridicaSelected = true;
});


formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const cpfValue = pInputCpf.firstChild.value;
    const regexCPF = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/; // XXX.XXX.XXX-XX
    const regexCNPJ = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/; // XX.XXX.XXX/0001-XX

    const emailValue = pInputEmail.firstChild.value;
    const regexEmail = /^[a-z]+\@{1}[a-z]+\.com$/; // a@a.com

    const foneValue = pInputFone.firstChild.value;
    const regexFone = /^\([1-9]{2}\)9[1-9][0-9]{3}\-[0-9]{4}$/; // (XX)9XXXX-XXXX

    const senhaValue = pInputSenha.firstChild.value;
    const regexSenha = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/; // Ao menos 1 numero; Ao menos 1 letra; Pelo menos 5 caracteres no total.

    let isFormOk = true;

    if (isJuridicaSelected) {
        let cnpjValue = cpfValue;
        if (!regexCNPJ.test(cnpjValue)) {
            alert("CNPJ invalido")
            isFormOk = false;
        }
    } else if(!isJuridicaSelected) {
        if (!regexCPF.test(cpfValue)) {
            window.alert("CPF INVALIDO")
            isFormOk = false;
        }
        if (!regexEmail.test(emailValue)) {
            window.alert("EMAIL INVALIDO")
            isFormOk = false;
        }
        if (!regexFone.test(foneValue)) {
            window.alert("FONE INVALIDO")
            isFormOk = false;
        }
    } 
    if (!regexSenha.test(senhaValue)) {
        window.alert("SENHA INVALIDA")
        isFormOk = false;
    } 

    if (isFormOk) {
        window.location.href = '/pages/homepage.html';
    }
    
    
});
function verificaTeste(nomeTeste,executar){
    try {
        executar();
        console.log("Teste passou: " + nomeTeste);
    } catch (e) {
        console.log("Teste falhou: " + nomeTeste);
    }
}

function assert(isTrue){
    if(!isTrue){
        throw new Error();
    }
}

function validaCodigo(codigo) {
    return(/^[0-9]{5,}$/.test(codigo));
}

buttonStep1.onclick = () => {
    const codigo1 = document.getElementById("codigo1").value;
    const codigo2 = document.getElementById("codigo2").value;
    const codigo3 = document.getElementById("codigo3").value;
    const codigo4 = document.getElementById("codigo4").value;
    
    // Testa o primeiro campo do código de barras
    verificaTeste('Validação código de barras 1', () => {
        assert(validaCodigo(codigo1));
    });

    // Testa o segundo campo do código de barras
    verificaTeste('Validação código de barras 2', () => {
        assert(validaCodigo(codigo2));
    });

    // Testa o terceiro campo do código de barras
    verificaTeste('Validação código de barras 3', () => {
        assert(validaCodigo(codigo3));
    });

    // Testa o quarto campo do código de barras
    verificaTeste('Validação código de barras 4', () => {
        assert(validaCodigo(codigo4));
    });

};
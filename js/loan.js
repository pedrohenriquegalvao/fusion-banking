let valorEmprestimo = document.getElementById('valor-emprestimo');
let selectParcelas = document.getElementById('parcelas');
let valorParcelas = document.getElementById('valor-parcelas');

let formEmprestimo = document.getElementById('form-emprestimo');

function calculaParcelas() {
    for (option of selectParcelas) {
        if(option.selected) {
            valorParcelas.innerHTML = `${(valorEmprestimo.value/option.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
        }
    }
}

valorEmprestimo.addEventListener("input", calculaParcelas);
selectParcelas.addEventListener("input", calculaParcelas);

formEmprestimo.addEventListener("submit", (evento) => {
    evento.preventDefault();
    window.location.href = "/pages/homepage.html"
});

let eyeIcon = document.getElementById("icon");
let balance = document.getElementById("balance");

let isBalanceVisible = true;

function toggleBalanceVisibility() {
    isBalanceVisible = !isBalanceVisible;
    if(isBalanceVisible) {
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
        balance.style.background = "none";
    } else {
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
        balance.style.backgroundColor = "#051960";
    }
}

eyeIcon.addEventListener("click", () => {
    toggleBalanceVisibility();
});

let cards = document.getElementsByClassName("card-atalho");

cards[1].addEventListener("click", () => {
    window.location.href = "/pages/loan.html"
});

cards[2].addEventListener("click", () => {
    window.location.href = "/pages/payment.html"
});
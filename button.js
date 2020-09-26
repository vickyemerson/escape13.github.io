let button = document.getElementById("button");
let buttonText = document.getElementById("button-text");

let state = 0;

button.onclick = () => {
    if (state === 0) {
        buttonText.innerHTML = "Я";
        state = 1;
    } else if (state ===  1) {
        buttonText.innerHTML = "Жду";
        state = 2;
    } else if (state === 2) {
        buttonText.innerHTML = "Чуда";
        state = 0;
    }
}
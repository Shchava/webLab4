const image = document.getElementById("image");

const widthInput = document.getElementById("width");


widthInput.addEventListener("input", () => {
    image.setAttribute("width", widthInput.value);
});

const heightInput = document.getElementById("height");

heightInput.addEventListener("input", () => {
    image.setAttribute("height", heightInput.value);
});

const borderThicknessInput = document.getElementById("borderThickness");

borderThicknessInput.addEventListener("input", () => {
    image.style.borderWidth = borderThicknessInput.value+ "px";
});

const borderColorInput = document.getElementById("borderColor");

borderColorInput.addEventListener("input", () => {
    image.style.borderColor = borderColorInput.value;
});

const altInput = document.getElementById("altText");

altInput.addEventListener("input", () => {
    image.setAttribute("alt", altInput.value);
});




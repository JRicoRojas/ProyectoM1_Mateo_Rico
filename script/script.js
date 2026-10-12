const headerBtn = document.getElementById("test");
const colors = document.querySelectorAll('.color');
const palette = [];
let firstArray = [256, 256, 256];
let befColor = document.querySelector('.color');
let newColor = befColor.cloneNode(true);


console.log(newColor);

function randomArray(array) {
    array.forEach((_, i) => {
        array[i] = Math.floor(Math.random() * 256);
    });
}

function randomPalette() {
    palette.length = 0;
    colors.forEach((color) => {
        randomArray(firstArray);
        let arrayRgb = [firstArray[0],firstArray[1],firstArray[2]]
        palette.push (arrayRgb);
        color.style.backgroundColor = `rgb(${firstArray[0]}, ${firstArray[1]}, ${firstArray[2]})`;
    });
}

headerBtn.addEventListener('click', function(){
    const background1 = window.getComputedStyle(colors[0]).backgroundColor;
    randomPalette();
    console.log(background1);
    console.log (arrayRgb);
});





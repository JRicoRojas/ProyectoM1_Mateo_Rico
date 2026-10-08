const headerBtn = document.getElementById("test");
const colors = document.querySelectorAll('.color');
let firstArray = [256, 256, 256];


function randomArray(array) {
    array.forEach((_, i) => {
        array[i] = Math.floor(Math.random() * 256);
    });
}

function randomPallette() {
    colors.forEach((color) => {
        randomArray(firstArray);
        color.style.backgroundColor = `rgb(${firstArray[0]}, ${firstArray[1]}, ${firstArray[2]})`;
    });
}

headerBtn.addEventListener('click', function(){
    const test = window.getComputedStyle(colors[0]).backgroundColor;
    randomPallette();
    console.log(test)
});




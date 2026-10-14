const headerBtn = document.getElementById("start");
const favoritesList = document.getElementById("favorites-list");
const palette = [];
const dropDown = document.getElementById("dropdown");
const hero = document.querySelector('.hero');
const befColor = document.querySelector('.color');
const headerHrt = document.getElementById("favorites")
let colors = document.querySelectorAll('.color');
let firstArray = [255, 255, 255];
let favorites = [];

function refreshLists() {
    colors = document.querySelectorAll('.color');
}

function paintCard(card, i) {
    randomArray(firstArray);
    const arrayRgb = [firstArray[0], firstArray[1], firstArray[2]];
    palette[i] = arrayRgb;

    card.style.backgroundColor = `rgb(${arrayRgb[0]}, ${arrayRgb[1]}, ${arrayRgb[2]})`;
    card.style.color = lumus(...arrayRgb);
    card.querySelector('.hex').textContent = rgbToHex(...arrayRgb);

    const [h, s, l] = rgbToHsl(...arrayRgb);
    card.querySelector('h2').textContent = `hsl(${h}, ${s}%, ${l}%)`;
}

function randomPalette() {
    refreshLists();
    colors.forEach((card, i) => {
        if (card.classList.contains('locked')) return;
        paintCard(card, i);
    });
}

dropDown.addEventListener('change', function () {
    const addNumber = Number(dropDown.value);
    const oldLength = colors.length;
    const dif = addNumber - oldLength;

    if (dif > 0) {
        for (let index = 0; index < dif; index++) {
            const newColor = befColor.cloneNode(true);
            newColor.classList.remove('locked');
            newColor.querySelector('.lock').setAttribute('aria-pressed', 'false')
            newColor.classList.add("entrando");
            hero.append(newColor);
        }
        refreshLists();
        for (let i = oldLength; i < colors.length; i++) {
            paintCard(colors[i], i);
        }
    } else if (dif < 0) {
        for (let index = 0; index < Math.abs(dif); index++) {
            colors[colors.length - 1 - index].classList.add("saliendo");
        }
        setTimeout(function () {
            document.querySelectorAll('.saliendo').forEach((card) => card.remove());
            refreshLists();
            palette.length = colors.length;
        }, 400);
    }
});

function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 750);
}

function randomArray(array) {
    array.forEach((_, i) => {
        array[i] = Math.floor(Math.random() * 256);
    });
}

function rgbToHex(r, g, b) {
    const toHex = c => c.toString(16).toUpperCase().padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const l = (max + min) / 2;

    if (d === 0) {
        return [0, 0, Math.round(l * 100)];
    }

    let s;
    if (l <= 0.5) {
        s = d / (max + min);
    } else {
        s = d / (2 - max - min);
    }

    let h;
    if (max === r) {
        h = ((g - b) / d) % 6;
    } else if (max === g) {
        h = (b - r) / d + 2;
    } else {
        h = (r - g) / d + 4;
    }

    h = (Math.round(h * 60) + 360) % 360;
    return [h, Math.round(s * 100), Math.round(l * 100)];
}

function lumus(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const lum = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    return lum < 0.5 ? "white" : "black";
}

headerBtn.addEventListener('click', function () {
    randomPalette();
    mostrarToast();
});

hero.addEventListener('click', function (event) {
    const lockBtn = event.target.closest('.lock');
    if (!lockBtn) return;
    const cardL = lockBtn.closest('.color');
    cardL.classList.toggle('locked');
    lockBtn.setAttribute('aria-pressed', cardL.classList.contains('locked'));
    
});

hero.addEventListener('click', function (event) {
    const heartBtn = event.target.closest('.heart');
    if (!heartBtn) return;
    const hex = cardH.querySelector('.hex').textContent;
    favoritesList.style.visibility ="visible";
    favoritesList.textContent = hex;
    const cardH = heartBtn.closest('.color');
    if (favorites.length < 6){
        if (favorites.includes(hex)){
            console.log("Ya esta");
        }else{
            favorites.push(hex);
            console.log(favorites);
        }
    }else{
        favorites.shift();
        favorites.push(hex);
    }
    console.log(favorites.length);
});

headerHrt.addEventListener('click',function(){
    navigator.clipboard.writeText(favorites);
});



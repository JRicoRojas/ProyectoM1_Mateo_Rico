const headerBtn = document.getElementById("test");
let randomArray = [256, 256, 256];

function randomChange (array){
    let c1 = Math.floor(Math.random() * 256);
    let c2 = Math.floor(Math.random() * 256);
    let c3 = Math.floor(Math.random() * 256);
    array [0] = c1;
    array [1] = c2;
    array [2] = c3;
};

headerBtn.addEventListener('click', function(){
    console.log("Generate")
    randomChange(randomArray);
    console.log(randomArray);
});


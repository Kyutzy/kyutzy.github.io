function mudaCor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    console.log(`rgb(${r}, ${g}, ${b})`)
}
function inicia(){
    setInterval(mudaCor, 500);
}

window.addEventListener("scroll", callbackScroll);
const firstBlock = document.getElementById("1");
const secondBlock = document.getElementById("2");
const thirdBlock = document.getElementById("3");
const fourthBlock = document.getElementById("4");
const fifthBlock = document.getElementById("5");
const sixthBlock = document.getElementById("6");
const seventhBlock = document.getElementById("7");


function callbackScroll(e) {
  const scrollAmount = window.scrollY;
  const section = document.getElementById("corquemuda");
  console.log({ scrollAmount });
  if (scrollAmount >= seventhBlock.offsetTop) {
    section.style.backgroundColor = "#347289";
    document.getElementById("texto_principal").innerHTML="Olha só, estudei aqui, no cmc, por 7 longos anos da minha vida"
  } else if (scrollAmount >= sixthBlock.offsetTop) {
    section.style.backgroundColor = "#347800";
    document.getElementById("texto_principal").innerHTML="E bota longos nisso"
  } else if (scrollAmount >= fifthBlock.offsetTop) {
    section.style.backgroundColor = "#347289";
    document.getElementById("texto_principal").innerHTML="Olha só, estudei aqui, no cmc, por 7 longos anos da minha vida"
  }
  
   else if (true) {
    section.style.backgroundColor = "#656565";
  } else {
    section.style.backgroundColor = "#fff";
  }
}

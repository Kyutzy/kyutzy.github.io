window.addEventListener("scroll", callbackScroll);
const firstBlock = document.getElementById("inicio");
const secondBlock = document.getElementById("fenix");
const thirdBlock = document.getElementById("CNA");
const fourthBlock = document.getElementById("viagem");
const fifthBlock = document.getElementById("corona");
const sixthBlock = document.getElementById("puc");
const seventhBlock = document.getElementById("fim");


function callbackScroll(e) {
  const scrollAmount = window.scrollY;
  const section = document.getElementById("corquemuda");
  console.log({ scrollAmount });
  if (scrollAmount >= seventhBlock.offsetTop) {
    section.style.backgroundColor = "#FEFEFE";
    document.getElementById("texto_principal").innerHTML="Chegamos ao final dessa pequena viagem dos últimos anos da minha vida! Agora você me conhece um pouco mais, espero honestamente que tenha gostado!"
    document.getElementById("foto_al").src = "/imagens/minha_foto.png"
    section.style.border = "4px solid #92232d"
  } else if (scrollAmount > sixthBlock.offsetTop) {
    section.style.backgroundColor = "#963f4c";
    document.getElementById("texto_principal").innerHTML="No ano de 2020 ainda, resolvi fazer o vestibular 4.0 da PUC em que por algum milagre consegui sucesso, agora acordo todos os dias às 7:45 da manhã para assistir as aulas!"
    document.getElementById("foto_al").src = "/imagens/Eu_Hoje.png"
    section.style.border = "4px solid #8c5d64"
  } else if (scrollAmount > fifthBlock.offsetTop) {
    section.style.backgroundColor = "#bfb6fa";
    document.getElementById("texto_principal").innerHTML="Então dois anos após minha viagem, em 2020, iniciei meu curso técnico na cd6, simultaneamente com meu terceiro ano do ensino médio, ambos no estilo EAD síncrono, por conta da pandemia do coronavirus, mas o que importa é que consegui me formar no ensino médio e conseguir uma base de aprendizado em informática pra faculdade!"
    document.getElementById("foto_al").src = "/imagens/Cesar_Frio.png"
    section.style.border = "4px solid #7460f7"
  } else if (scrollAmount > fourthBlock.offsetTop) {
    section.style.backgroundColor = "#cbf2ed";
    document.getElementById("texto_principal").innerHTML="Graças ao Curso do CNA e ao Preparatório pro KET do CMC, consegui minha primeira experiência internacional, passei dois dias em paris e duas semanas em Londres, especialmente estudando inglês, morando na casa de uma nativa, uma experiência muito enriquecedora que gostaria de repetir"
    document.getElementById("foto_al").src = "/imagens/minha_foto_3.png"
    section.style.border = "4px solid #b8f5ec"
  } else if (scrollAmount > thirdBlock.offsetTop) {
    section.style.backgroundColor = "#dba0ab";
    document.getElementById("texto_principal").innerHTML="Enquanto ainda no CMC, fiz simultaneamente o curso de inglês no CNA, por 4 anos, conseguindo ao final do mesmo, um certificado FCE com grade B, atestando um nível de inglês intermediário, de acordo com a Common European Framework of Reference  "
    document.getElementById("foto_al").src = "/imagens/outra_foto.png"
    section.style.border = "4px solid #ed193f"} 
  else if (scrollAmount > secondBlock.offsetTop) {
    section.style.backgroundColor = "#dac5c6";
    document.getElementById("texto_principal").innerHTML="Olha só, o Colégio Militar de Curitiba (CMC) vou até colocar o uniforme, estudei aqui, por 7 longos anos da minha vida, e bota longos nisso, tá maluco, de janeiro de 2014 a dezembro de 2020"
    document.getElementById("foto_al").src = "/imagens/cmc.jpg"
    section.style.border = "4px solid #92232d"
  } else if (scrollAmount > firstBlock.offsetTop) {
    section.style.backgroundColor = "#347289";
    document.getElementById("texto_principal").innerHTML="Bom eu ia contar tudo desde o início, desde 08/07/2002, quando eu nasci em uma manhã fria... Mas não é muito interessante, então vamos pular pra educação, mas pra parte importante, quando as coisas começaram a fazer sentido!"
  }
  
   else if (true) {
    section.style.backgroundColor = "#8ff2db";
    document.getElementById("texto_principal").innerHTML="Olá, sou eu, o Cesar, estou no primeiro período do Bacharelado em Ciência da Computação (BCC) da PUCPR você deve estar se perguntando, como chegamos até aqui, e eu te conto, vamos só scrollar a página!!"
    document.getElementById("foto_al").src = "/imagens/minha_foto.png"
    section.style.border = "4px solid #aee6ae"
  } else {
    section.style.backgroundColor = "#fff";
  }
}

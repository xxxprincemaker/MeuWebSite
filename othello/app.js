(function teste() {
  console.log("teste");
})();

const CoresPecas = { Vazia: 0, Branca: 1, Preta: 2 };

const matrixCanvas = Array(8)
  .fill()
  .map(() => Array(8).fill(CoresPecas.Vazia));

function criarTabuleiro() {
  matrixCanvas[3][3] = CoresPecas.Branca;
  matrixCanvas[3][4] = CoresPecas.Preta;
  matrixCanvas[4][4] = CoresPecas.Branca;
  matrixCanvas[4][3] = CoresPecas.Preta;
}

criarTabuleiro();
/*
(function criarLinhasHorizontais() {
  let otheloCanvas = document.getElementById("othelloCanvas");
  let ctx = otheloCanvas.getContext("2d");
  for (let i = 1; i <= 8; i++) {
    ctx.moveTo(0, 100 * i);
    ctx.lineTo(800, 100 * i);
    ctx.strokeStyle = "#8A2BE2";
    ctx.stroke();
  }
})();

(function criarLinhasVerticais() {
  let otheloCanvas = document.getElementById("othelloCanvas");
  let ctx = otheloCanvas.getContext("2d");
  ctx.moveTo(0, 0);
  for (let i = 1; i <= 8; i++) {
    ctx.moveTo(100 * i, 0);
    ctx.lineTo(100 * i, 800);
    ctx.strokeStyle = "#8A2BE2";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((50)*i, 50, 40, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
})();
*/

const canvas = document.getElementById("canvasOthello");
(function desenharTabuleiro() {
    for(let i = 1; i <= 8; i++){
        let divLinha = document.createElement('div');
        divLinha.id = 'linha[' + i + ']';
        divLinha.style.display = 'flex';
        divLinha.style.flexWrap = 'wrap';
        divLinha.height = '85px';
        divLinha.width = '680px';
        for(let j = 1; j <= 8; j++){
            let div = document.createElement('div');
            div.id = 'bloco[' + i + ',' + j+']';
            div.style.width = '85px';
            div.style.height = '85px';
            div.style.border = '1px solid #8A2BE2';
            div.style.alignItems = "stretch";
            divLinha.appendChild(div);
        }
        canvas.appendChild(divLinha);
    }
})();

console.log(matrixCanvas);

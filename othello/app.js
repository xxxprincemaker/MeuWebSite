let jogador = 1;

(function teste() {
  console.log("teste");
})();

const CoresPecas = { Vazia: 0, Branca: 1, Preta: 2 };

const matrixCanvas = Array(8)
  .fill()
  .map(() => Array(8).fill(CoresPecas.Vazia));

(function criarTabuleiro() {
  matrixCanvas[3][3] = CoresPecas.Branca;
  matrixCanvas[3][4] = CoresPecas.Preta;
  matrixCanvas[4][4] = CoresPecas.Branca;
  matrixCanvas[4][3] = CoresPecas.Preta;
})();


const canvas = document.getElementById("canvasOthello");
(function desenharTabuleiro() {
    for(let i = 1; i <= 8; i++){
        let divLinha = document.createElement('div');
        divLinha.id = 'coluna[' + i + ']';
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

            let botaoCirculo = document.createElement('div');
            botaoCirculo.id = 'circulo[' + i + ',' + j+']';
            botaoCirculo.style.width = '70px';
            botaoCirculo.style.height = '70px';
            botaoCirculo.style.borderRadius = '50%';
            botaoCirculo.style.alignContent="center";
            botaoCirculo.style.marginTop = '6px';
            botaoCirculo.style.marginLeft = '6px';

            if(matrixCanvas[i-1][j-1] == CoresPecas.Vazia){
                botaoCirculo.style.display = 'none';
                botaoCirculo.style.border = '1px solid #8A2BE2';
            } else if (matrixCanvas[i-1][j-1] == CoresPecas.Preta){
                botaoCirculo.style.border = '1px solid #8A2BE2';
                botaoCirculo.style.backgroundColor = '#8A2BE2';
            } else {
                botaoCirculo.style.backgroundColor = 'white';
            }
            div.appendChild(botaoCirculo);

            divLinha.appendChild(div);
        }
        canvas.appendChild(divLinha);
    }
})();


(function desenharPeca(){

    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++){
        let element = document.getElementById('bloco['+i+','+j+']');
        element.addEventListener('click', function(){
            if(jogador == 1){
                    matrixCanvas[i-1][j-1] = CoresPecas.Branca;
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    jogador = 2;
            }
            else {
                    matrixCanvas[i-1][j-1] = CoresPecas.Preta;
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = '#8A2BE2';
                    jogador = 1;
                }
            });
        }
    }
    console.log(element);
})();

console.log(matrixCanvas);

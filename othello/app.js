let jogador = 2;
let validacaoFinal = 0;

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
    for(let i = 0; i < 8; i++){
        let divLinha = document.createElement('div');
        divLinha.id = 'linha[' + i + ']';
        divLinha.style.display = 'flex';
        divLinha.style.flexWrap = 'wrap';
        divLinha.style.flexDirection = 'row';
        divLinha.height = '85px';
        divLinha.width = '680px';
        for(let j = 0; j < 8; j++){
            let div = document.createElement('div');
            div.id = 'bloco[' + i + ',' + j+']';
            div.style.width = '85px';
            div.style.height = '85px';
            div.style.border = '1px solid #8A2BE2';
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';

            let botaoCirculo = document.createElement('div');
            botaoCirculo.id = 'circulo[' + i + ',' + j+']';
            botaoCirculo.style.width = '70px';
            botaoCirculo.style.height = '70px';
            botaoCirculo.style.borderRadius = '50%';


            if(matrixCanvas[i][j] == CoresPecas.Vazia){
                botaoCirculo.style.display = 'none';
            } else if (matrixCanvas[i][j] == CoresPecas.Preta){
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

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            let element = document.getElementById('bloco['+i+','+j+']');
            element.addEventListener('click', function(movimentoValido){
                movimentoValido(i,j);
                if(validacaoFinal == 0){
                    if(jogador == 1 && matrixCanvas[i][j] == CoresPecas.Vazia){
                        matrixCanvas[i][j] = CoresPecas.Branca;
                        document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'white';
                        document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                        document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                        jogador = 2;
                    }
                    else if(jogador == 2 && matrixCanvas[i][j] == CoresPecas.Vazia) {
                        matrixCanvas[i][j] = CoresPecas.Preta;
                        document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                        document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+i+','+j+']').style.backgroundColor = '#8A2BE2';
                        jogador = 1;
                    }
                }
            });
        }
    }
})();

console.log(matrixCanvas);

let jogador = 1;
let validacaoFinal = 0;
let pecasBrancas = 0;
let pecasPretas = 0;
let vencedor;
let temMovimento = 0;

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
    contaPecas();
    mostrarMovimentosValidos();
})();


(function desenharPeca(){

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            let element = document.getElementById('bloco['+i+','+j+']');
            element.addEventListener('click', function(){
                movimentoValido(i,j);
                if(validacaoFinal == 1){
                    if(jogador == 1){
                        matrixCanvas[i][j] = CoresPecas.Branca;
                        document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'white';
                        document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                        document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                        jogador = 2;
                        contaPecas();
                        declararVencedor();
                        limparTabuleiro();
                        mostrarMovimentosValidos();
                    }
                    else if(jogador == 2) {
                        matrixCanvas[i][j] = CoresPecas.Preta;
                        document.getElementById('circulo['+i+','+j+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                        jogador = 1;
                        contaPecas();
                        declararVencedor();
                        limparTabuleiro();
                        mostrarMovimentosValidos();
                    }
                }
            });
        }
    }
})();

function declararVencedor(){
    if ((pecasBrancas + pecasPretas) == 64){
        if (pecasBrancas > pecasPretas || pecasPretas == 0){
            vencedor = 1;
        } else if (pecasBrancas < pecasPretas || pecasBrancas == 0){
            vencedor = 2;
        }
    }
}

function contaPecas(){
    let tempPecasBrancas = 0;
    let tempPecasPretas = 0;
    for (let x = 0; x <= 7; x++){
        for (let y = 0; y <= 7; y++){
            if (matrixCanvas[x][y] == CoresPecas.Branca ){
                tempPecasBrancas += 1;
            } else if (matrixCanvas[x][y] == CoresPecas.Preta ){
                tempPecasPretas += 1;
            } 
        }    
    }
    pecasBrancas = tempPecasBrancas;
    pecasPretas = tempPecasPretas;
}

function limparTabuleiro(){
    for (let i = 0; i <= 7; i++){
        for (let j = 0; j <= 7; j++){
            if (matrixCanvas[i][j] == CoresPecas.Vazia){            
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = 'none';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
            }
        }    
    }
}

function mostrarMovimentosValidos(){
    temMovimento = 0;
    for (let i = 0; i <= 7; i++){
        for (let j = 0; j <= 7; j++){
            if (matrixCanvas[i][j] == CoresPecas.Vazia){
                checarPossibilidadeNorte(i,j);
                checarPossibilidadeSul(i,j);
                checarPossibilidadeLeste(i,j);
                checarPossibilidadeOeste(i,j);
                checarPossibilidadeNordeste(i,j);
                checarPossibilidadeSudeste(i,j);
                checarPossibilidadeSudoeste(i,j);
                checarPossibilidadeNoroeste(i,j);        
            }
        }    
    }

    if (temMovimento == 0){
        if (jogador == 1){
            jogador = 2;
            mostrarMovimentosValidos();
        } else {
            jogador = 1;
            mostrarMovimentosValidos();
        }
    }
}

function checarPossibilidadeNorte(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i-1, y = j; x >= 0; x--){
        if (validacaoInicial == 0){
            if(x < 0 || matrixCanvas[x][y] == CoresPecas.Vazia){
                x = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                x = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    x = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = -1;
                }
            }
        }
    }  
};

function checarPossibilidadeSul(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i+1, y = j; x <= 7; x++){
        if (validacaoInicial == 0){
            if(x > 7 || matrixCanvas[x][y] == CoresPecas.Vazia){
                x = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                x = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    x = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = 8;
                }
            }
        }
    }
};

function checarPossibilidadeLeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i, y = j+1; y <= 7; y++){
        if (validacaoInicial == 0){
            if(y > 7 || matrixCanvas[x][y] == CoresPecas.Vazia){
                y = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                y = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                y = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';

                    temMovimento = 1;
                    y = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    y = 8;
                }
            }
        }
    }
};

function checarPossibilidadeOeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i, y = j-1; y >= 0; y--){
        if (validacaoInicial == 0){
            if(y < 0 || matrixCanvas[x][y] == CoresPecas.Vazia){
                y = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                y = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                y = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    y = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    y = -1;
                }
            }
        }
    }
};

function checarPossibilidadeNordeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i-1, y = j+1; x >= 0 && y <= 7; x--, y++){
        if (validacaoInicial == 0){
            if(x < 0 || y > 7 || matrixCanvas[x][y] == CoresPecas.Vazia){
                x = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                x = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    x = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = -1;
                }
            }
        }
    }
};

function checarPossibilidadeSudeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i+1, y = j+1; x <= 7 && y <= 7; x++, y++){
        if (validacaoInicial == 0){
            if(x > 7 || y > 7 || matrixCanvas[x][y] == CoresPecas.Vazia){
                x = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                x = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    x = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = 8;
                }
            }
        }
    }
};

function checarPossibilidadeSudoeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i+1, y = j-1; x <= 7 && y >= 0; x++, y--){
        if (validacaoInicial == 0){
            if(x > 7 || y < 0 || matrixCanvas[x][y] == CoresPecas.Vazia){
                x = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                x = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    x = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = 8;
                }
            }
        }
    }
};

function checarPossibilidadeNoroeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i-1, y = j-1; x >= 0 && y >= 0; x--, y--){
        if (validacaoInicial == 0){
            if(x < 0 || y < 0 || matrixCanvas[x][y] == CoresPecas.Vazia){
                x = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                document.getElementById('circulo['+i+','+j+']').style.border = '1px solid white';
                document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                
                temMovimento = 1;
                x = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    document.getElementById('circulo['+i+','+j+']').style.backgroundColor = 'none';
                    document.getElementById('circulo['+i+','+j+']').style.border = '1px solid #8A2BE2';
                    document.getElementById('circulo['+i+','+j+']').style.display = 'flex';
                    
                    temMovimento = 1;
                    x = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = -1;
                }
            }
        }
    }    
};

function movimentoValido(i,j){
    validacaoFinal = 0;
    checarDirecaoNorte(i,j);
    checarDirecaoSul(i,j);
    checarDirecaoLeste(i,j);
    checarDirecaoOeste(i,j);
    checarDirecaoNordeste(i,j);
    checarDirecaoSudeste(i,j);
    checarDirecaoSudoeste(i,j);
    checarDirecaoNoroeste(i,j);
};

function checarDirecaoNorte(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i-1, y = j; x >= 0; x--){
        if (validacaoInicial == 0){
            if(x < 0 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                x = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let a = 0;
                for (a = x+1; a < i; a++){
                    matrixCanvas[a][y] = CoresPecas.Branca;
                    document.getElementById('circulo['+a+','+y+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+a+','+y+']').style.border = '1px solid white';
                    document.getElementById('circulo['+a+','+y+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                x = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let a = 0;
                    for (a = x+1; a < i; a++){
                        matrixCanvas[a][y] = CoresPecas.Preta;
                        document.getElementById('circulo['+a+','+y+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+a+','+y+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+a+','+y+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    x = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = -1;
                }
            }
        }
    }
};

function checarDirecaoSul(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i+1, y = j; x <= 7; x++){
        if (validacaoInicial == 0){
            if(x > 7 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                x = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let a = 0;
                for (a = x-1; a > i; a--){
                    matrixCanvas[a][y] = CoresPecas.Branca;
                    document.getElementById('circulo['+a+','+y+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+a+','+y+']').style.border = '1px solid white';
                    document.getElementById('circulo['+a+','+y+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                x = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let a = 0;
                    for (a = x-1; a > i; a--){
                        matrixCanvas[a][y] = CoresPecas.Preta;
                        document.getElementById('circulo['+a+','+y+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+a+','+y+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+a+','+y+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    x = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = 8;
                }
            }
        }
    }
};

function checarDirecaoLeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i, y = j+1; y <= 7; y++){
        if (validacaoInicial == 0){
            if(y > 7 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                y = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                y = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let b = 0;
                for (b = y-1; b > j; b--){
                    matrixCanvas[x][b] = CoresPecas.Branca;
                    document.getElementById('circulo['+x+','+b+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+x+','+b+']').style.border = '1px solid white';
                    document.getElementById('circulo['+x+','+b+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                y = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let b = 0;
                    for (b = y-1; b > j; b--){
                        matrixCanvas[x][b] = CoresPecas.Preta;
                        document.getElementById('circulo['+x+','+b+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+x+','+b+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+x+','+b+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    y = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    y = 8;
                }
            }
        }
    }
};

function checarDirecaoOeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i, y = j-1; y >= 0; y--){
        if (validacaoInicial == 0){
            if(y < 0 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                y = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                y = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let b = 0;
                for (b = y+1; b < j; b++){
                    matrixCanvas[x][b] = CoresPecas.Branca;
                    document.getElementById('circulo['+x+','+b+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+x+','+b+']').style.border = '1px solid white';
                    document.getElementById('circulo['+x+','+b+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                y = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let b = 0;
                    for (b = y+1; b < j; b++){
                        matrixCanvas[x][b] = CoresPecas.Preta;
                        document.getElementById('circulo['+x+','+b+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+x+','+b+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+x+','+b+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    y = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    y = -1;
                }
            }
        }
    }
};

function checarDirecaoNordeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i-1, y = j+1; x >= 0 && y <= 7; x--, y++){
        if (validacaoInicial == 0){
            if(x < 0 || y > 7 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                x = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let a = 0
                let b = 0;
                for (a= x+1, b = y-1; a < i && b > j; a++, b--){
                    matrixCanvas[a][b] = CoresPecas.Branca;
                    document.getElementById('circulo['+a+','+b+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+a+','+b+']').style.border = '1px solid white';
                    document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                x = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let a = 0
                    let b = 0;
                    for (a= x+1, b = y-1; a < i && b > j; a++, b--){
                        matrixCanvas[a][b] = CoresPecas.Preta;
                        document.getElementById('circulo['+a+','+b+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    x = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = -1;
                }
            }
        }
    }
};

function checarDirecaoSudeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i+1, y = j+1; x <= 7 && y <= 7; x++, y++){
        if (validacaoInicial == 0){
            if(x > 7 || y > 7 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                x = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let a = 0
                let b = 0;
                for (a = x-1, b = y-1; a > i && b > j; a--, b--){
                    matrixCanvas[a][b] = CoresPecas.Branca;
                    document.getElementById('circulo['+a+','+b+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+a+','+b+']').style.border = '1px solid white';
                    document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                x = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let a = 0
                    let b = 0;
                    for (a = x-1, b = y-1; a > i && b > j; a--, b--){
                        matrixCanvas[a][b] = CoresPecas.Preta;
                        document.getElementById('circulo['+a+','+b+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    x = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = 8;
                }
            }
        }
    }
};

function checarDirecaoSudoeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i+1, y = j-1; x <= 7 && y >= 0; x++, y--){
        if (validacaoInicial == 0){
            if(x > 7 || y < 0 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                x = 8;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = 8;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let a = 0
                let b = 0;
                for (a= x-1, b = y+1; a > i && b < j; a--, b++){
                    matrixCanvas[a][b] = CoresPecas.Branca;
                    document.getElementById('circulo['+a+','+b+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+a+','+b+']').style.border = '1px solid white';
                    document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                x = 8;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let a = 0
                    let b = 0;
                    for (a= x-1, b = y+1; a > i && b < j; a--, b++){
                        matrixCanvas[a][b] = CoresPecas.Preta;
                        document.getElementById('circulo['+a+','+b+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    x = 8;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = 8;
                }
            }
        }
    }
};

function checarDirecaoNoroeste(i,j){
    let validacaoInicial = 0;
    let x = 0;
    let y = 0;

    for(x = i-1, y = j-1; x >= 0 && y >= 0; x--, y--){
        if (validacaoInicial == 0){
            if(x < 0 || y < 0 || matrixCanvas[x][y] == CoresPecas.Vazia || matrixCanvas[i][j] != CoresPecas.Vazia){
                x = -1;
            } else if (jogador == 1 && (matrixCanvas[x][y] == CoresPecas.Branca) ||
                       jogador == 2 && (matrixCanvas[x][y] == CoresPecas.Preta)){
                x = -1;
            } else {
                validacaoInicial = 1;
            }
        } else {
            if(jogador == 1 && matrixCanvas[x][y] == CoresPecas.Branca){
                let a = 0
                let b = 0;
                for (a= x+1, b = y+1; a < i && b < j; a++, b++){
                    matrixCanvas[a][b] = CoresPecas.Branca;
                    document.getElementById('circulo['+a+','+b+']').style.backgroundColor = 'white';
                    document.getElementById('circulo['+a+','+b+']').style.border = '1px solid white';
                    document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                }
                validacaoFinal = 1;
                x = -1;
            } else {
                if(jogador == 2 && matrixCanvas[x][y] == CoresPecas.Preta){
                    let a = 0
                    let b = 0;
                    for (a= x+1, b = y+1; a < i && b < j; a++, b++){
                        matrixCanvas[a][b] = CoresPecas.Preta;
                        document.getElementById('circulo['+a+','+b+']').style.backgroundColor = '#8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.border = '1px solid #8A2BE2';
                        document.getElementById('circulo['+a+','+b+']').style.display = 'flex';
                    }
                    validacaoFinal = 1;
                    x = -1;
                } else if (matrixCanvas[x][y] == CoresPecas.Vazia){
                    x = -1;
                }
            }
        }
    }
};

console.log(matrixCanvas);

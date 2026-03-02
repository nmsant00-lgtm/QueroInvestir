// ========== VERSÃO COM ENTRADA MANUAL DE DADOS ==========

// Navegação
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando aplicação...');
    
    // Navegação do menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navegarPara(targetId);
        });
    });
    
    // Navegação dos cards da home
    document.querySelectorAll('.hero-cards .card').forEach(card => {
        card.addEventListener('click', () => {
            const targetSection = card.dataset.nav;
            if (targetSection) {
                navegarPara(targetSection);
            }
        });
    });
    
    // Renderizar conteúdo
    renderizarAtivos();
    renderizarQuestionario();
    renderizarIndicadores();
    renderizarCorretoras();
    renderizarGlossario();
    
    // Tabs de simulação
    document.querySelectorAll('.sim-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const simType = this.dataset.sim;
            
            document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.sim-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`sim-${simType}`).classList.add('active');
        });
    });
    
    console.log('✅ Aplicação inicializada!');
});

// Atualizar campos de avaliação baseado no tipo de ativo
function atualizarCamposAvaliacao() {
    const tipo = document.getElementById('tipo-ativo-sim').value;
    const container = document.getElementById('campos-avaliacao');
    
    if (!tipo) {
        container.innerHTML = '';
        return;
    }
    
    const indicadores = indicadoresPorTipo[tipo];
    
    container.innerHTML = `
        <div style="background: #f8fafc; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
            <h4 style="margin-top: 0;">Insira os Indicadores:</h4>
            ${indicadores.map((ind, index) => `
                <div class="form-group">
                    <label>${ind.nome}:</label>
                    <input type="text" id="indicador-${index}" placeholder="${ind.ideal}">
                    <small style="color: var(--text-light); display: block; margin-top: 0.25rem;">
                        ${ind.descricao}
                    </small>
                </div>
            `).join('')}
        </div>
    `;
}

// Avaliar ativo com dados manuais
function avaliarAtivo() {
    const tipo = document.getElementById('tipo-ativo-sim').value;
    const nome = document.getElementById('nome-ativo').value.trim();
    
    if (!tipo || !nome) {
        alert('Por favor, preencha o tipo de ativo e o nome/ticker.');
        return;
    }
    
    const indicadores = indicadoresPorTipo[tipo];
    const valores = {};
    let camposPreenchidos = 0;
    
    indicadores.forEach((ind, index) => {
        const valor = document.getElementById(`indicador-${index}`).value.trim();
        if (valor) {
            valores[ind.nome] = valor;
            camposPreenchidos++;
        }
    });
    
    if (camposPreenchidos === 0) {
        alert('Por favor, preencha pelo menos um indicador.');
        return;
    }
    
    mostrarResultadoAvaliacao(nome, tipo, valores, indicadores);
}

// Mostrar resultado da avaliação
function mostrarResultadoAvaliacao(nome, tipo, valores, indicadores) {
    const container = document.getElementById('resultado-simulacao');
    
    // Calcular score baseado na qualidade dos indicadores vs valores ideais
    const score = calcularScorePropensao(valores, indicadores, tipo);
    
    // Determinar recomendação baseada no score
    let recomendacao, corRecomendacao, iconeRecomendacao;
    if (score < 50) {
        recomendacao = 'VENDER';
        corRecomendacao = 'var(--danger)';
        iconeRecomendacao = '📉';
    } else if (score <= 80) {
        recomendacao = 'MANTER';
        corRecomendacao = 'var(--warning)';
        iconeRecomendacao = '⏸️';
    } else {
        recomendacao = 'COMPRAR';
        corRecomendacao = 'var(--success)';
        iconeRecomendacao = '📈';
    }
    
    const tipoNomes = {
        'acoes': 'Ação',
        'etf': 'ETF',
        'reit': 'REIT',
        'commodities': 'Commodity',
        'criptomoedas': 'Criptomoeda'
    };
    
    const percentagemPreenchida = (Object.keys(valores).length / indicadores.length) * 100;
    
    container.innerHTML = `
        <div class="resultado-simulacao">
            <h3>Resultado da Avaliação: ${nome}</h3>
            <p style="color: var(--text-light); margin-top: 0.5rem;">
                Tipo: ${tipoNomes[tipo]} | ${Object.keys(valores).length} de ${indicadores.length} indicadores preenchidos
            </p>
            
            <div class="score-container">
                <div class="score-value">${score}</div>
                <div class="score-label">Score de Propensão</div>
                <div style="margin-top: 1.5rem; padding: 1rem; background: ${corRecomendacao}22; border-radius: 8px; border: 2px solid ${corRecomendacao};">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${iconeRecomendacao}</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: ${corRecomendacao}; margin-bottom: 0.5rem;">
                        ${recomendacao}
                    </div>
                    <p style="margin: 0; color: var(--text-light); font-size: 0.9rem;">
                        ${score < 50 ? 'Indicadores abaixo da média de mercado' : 
                          score <= 80 ? 'Indicadores dentro da média de mercado' : 
                          'Indicadores acima da média de mercado'}
                    </p>
                </div>
            </div>
            
            <div style="background: #f8fafc; padding: 1rem; border-radius: 6px; margin: 1.5rem 0;">
                <h4 style="margin-top: 0; color: var(--primary);">📊 Interpretação do Score</h4>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem; line-height: 1.8;">
                    <li><strong style="color: var(--danger);">0-50:</strong> Indicadores fracos → Considere VENDER</li>
                    <li><strong style="color: var(--warning);">51-80:</strong> Indicadores médios → MANTER posição</li>
                    <li><strong style="color: var(--success);">81-100:</strong> Indicadores fortes → Oportunidade de COMPRA</li>
                </ul>
            </div>
            
            <h4>Análise Detalhada de Indicadores:</h4>
            <div class="indicadores-comparacao">
                ${indicadores.map(ind => {
                    const valorAtual = valores[ind.nome];
                    const preenchido = valorAtual ? true : false;
                    const avaliacao = preenchido ? avaliarIndicador(valorAtual, ind.ideal, ind.nome) : null;
                    
                    return `
                    <div class="indicador-comparacao-card" style="${!preenchido ? 'opacity: 0.5;' : ''}">
                        <div class="indicador-header">
                            <strong>${preenchido ? avaliacao.icone : '○'} ${ind.nome}</strong>
                            <p class="indicador-descricao">${ind.descricao}</p>
                        </div>
                        <div class="indicador-valores">
                            <div class="valor-item">
                                <span class="valor-label">Valor Inserido</span>
                                <span class="valor-atual" style="${preenchido ? 'color: ' + avaliacao.cor : ''}">${valorAtual || 'Não informado'}</span>
                            </div>
                            <div class="valor-separador">vs</div>
                            <div class="valor-item">
                                <span class="valor-label">Valor Ideal</span>
                                <span class="valor-ideal">${ind.ideal}</span>
                            </div>
                        </div>
                        ${preenchido ? `
                            <div style="margin-top: 0.5rem; padding: 0.5rem; background: ${avaliacao.cor}22; border-radius: 4px; text-align: center;">
                                <small style="color: ${avaliacao.cor}; font-weight: 500;">${avaliacao.texto}</small>
                            </div>
                        ` : ''}
                    </div>
                `;
                }).join('')}
            </div>
            
            ${percentagemPreenchida < 100 ? `
                <div style="background: #fef2f2; padding: 1rem; border-radius: 6px; margin: 1.5rem 0; border-left: 4px solid var(--danger);">
                    <p style="margin: 0; color: var(--danger);">
                        <strong>⚠️ Atenção:</strong> Apenas ${Math.round(percentagemPreenchida)}% dos indicadores foram preenchidos. 
                        Para uma avaliação mais precisa, preencha todos os indicadores disponíveis.
                    </p>
                </div>
            ` : ''}
            
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn-primary" onclick="exportarResultadoAvaliacao('${nome}', ${score})">
                    📥 Exportar Resultado
                </button>
                <button class="btn-secondary" onclick="novaAvaliacao()">
                    Nova Avaliação
                </button>
            </div>
        </div>
    `;
    
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });
}

// Calcular score de propensão baseado na qualidade dos indicadores
function calcularScorePropensao(valores, indicadores, tipo) {
    let pontuacaoTotal = 0;
    let indicadoresAvaliados = 0;
    
    indicadores.forEach(ind => {
        const valor = valores[ind.nome];
        if (valor) {
            const avaliacao = avaliarIndicador(valor, ind.ideal, ind.nome);
            pontuacaoTotal += avaliacao.pontos;
            indicadoresAvaliados++;
        }
    });
    
    if (indicadoresAvaliados === 0) return 50; // Neutro se nenhum indicador
    
    // Média ponderada
    const scoreBase = pontuacaoTotal / indicadoresAvaliados;
    
    // Penalizar se poucos indicadores foram preenchidos
    const percentagemPreenchida = indicadoresAvaliados / indicadores.length;
    const penalizacao = percentagemPreenchida < 0.6 ? 0.8 : 1.0; // 20% de penalização se < 60% preenchido
    
    return Math.round(scoreBase * penalizacao);
}

// Avaliar um indicador individual comparando com o ideal
function avaliarIndicador(valorAtual, valorIdeal, nomeIndicador) {
    // Extrair números do valor atual
    const numeroAtual = extrairNumero(valorAtual);
    
    // Lógica de avaliação baseada no tipo de indicador
    let pontos = 50; // Neutro por padrão
    let texto = 'Dentro da média';
    let cor = 'var(--warning)';
    let icone = '⚠️';
    
    // P/E Ratio - ideal: 10-20
    if (nomeIndicador.includes('P/E Ratio')) {
        if (numeroAtual >= 10 && numeroAtual <= 20) {
            pontos = 90; texto = 'Excelente - valorização justa'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual < 10) {
            pontos = 70; texto = 'Bom - potencialmente subvalorizado'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual <= 30) {
            pontos = 50; texto = 'Aceitável - ligeiramente caro'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 30; texto = 'Fraco - muito caro'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // ROE - ideal: > 15%
    else if (nomeIndicador.includes('ROE')) {
        if (numeroAtual >= 20) {
            pontos = 95; texto = 'Excelente rentabilidade'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual >= 15) {
            pontos = 80; texto = 'Boa rentabilidade'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual >= 10) {
            pontos = 60; texto = 'Rentabilidade moderada'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 35; texto = 'Rentabilidade fraca'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // Dividend Yield - ideal: 2-6%
    else if (nomeIndicador.includes('Dividend Yield')) {
        if (numeroAtual >= 2 && numeroAtual <= 6) {
            pontos = 90; texto = 'Excelente rendimento'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual > 6 && numeroAtual <= 10) {
            pontos = 75; texto = 'Bom rendimento'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual >= 1 && numeroAtual < 2) {
            pontos = 60; texto = 'Rendimento moderado'; cor = 'var(--warning)'; icone = '⚠️';
        } else if (numeroAtual === 0) {
            pontos = 50; texto = 'Sem dividendos'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 40; texto = 'Rendimento muito baixo ou suspeito'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // Debt to Equity - ideal: < 1.0
    else if (nomeIndicador.includes('Debt to Equity')) {
        if (numeroAtual < 0.5) {
            pontos = 95; texto = 'Excelente - baixo endividamento'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual <= 1.0) {
            pontos = 80; texto = 'Bom - endividamento controlado'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual <= 2.0) {
            pontos = 50; texto = 'Moderado - atenção ao endividamento'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 25; texto = 'Alto risco - muito endividado'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // EPS Growth - ideal: > 10%
    else if (nomeIndicador.includes('EPS Growth')) {
        if (numeroAtual >= 15) {
            pontos = 95; texto = 'Excelente crescimento'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual >= 10) {
            pontos = 80; texto = 'Bom crescimento'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual >= 5) {
            pontos = 60; texto = 'Crescimento moderado'; cor = 'var(--warning)'; icone = '⚠️';
        } else if (numeroAtual >= 0) {
            pontos = 40; texto = 'Crescimento fraco'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 20; texto = 'Decrescimento - alerta'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // Expense Ratio - ideal: < 0.5%
    else if (nomeIndicador.includes('Expense Ratio')) {
        if (numeroAtual < 0.2) {
            pontos = 95; texto = 'Excelente - custos muito baixos'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual <= 0.5) {
            pontos = 85; texto = 'Bom - custos baixos'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual <= 1.0) {
            pontos = 60; texto = 'Aceitável - custos moderados'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 35; texto = 'Caro - custos elevados'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // Tracking Error - ideal: < 1%
    else if (nomeIndicador.includes('Tracking Error')) {
        if (numeroAtual < 0.5) {
            pontos = 95; texto = 'Excelente - replica bem o índice'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual <= 1.0) {
            pontos = 80; texto = 'Bom - tracking adequado'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual <= 2.0) {
            pontos = 55; texto = 'Moderado - algum desvio'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 30; texto = 'Fraco - desvio significativo'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // Volatilidade - ideal: 15-25% (moderada) ou 30-60% para cripto
    else if (nomeIndicador.includes('Volatilidade')) {
        const isCripto = nomeIndicador.includes('cripto') || numeroAtual > 25;
        if (isCripto) {
            // Lógica para criptomoedas
            if (numeroAtual >= 30 && numeroAtual <= 60) {
                pontos = 80; texto = 'Volatilidade normal para cripto'; cor = 'var(--success)'; icone = '✓';
            } else if (numeroAtual < 30) {
                pontos = 85; texto = 'Baixa volatilidade - mais estável'; cor = 'var(--success)'; icone = '✅';
            } else {
                pontos = 50; texto = 'Alta volatilidade - maior risco'; cor = 'var(--warning)'; icone = '⚠️';
            }
        } else {
            // Lógica para ativos tradicionais
            if (numeroAtual >= 15 && numeroAtual <= 25) {
                pontos = 85; texto = 'Volatilidade moderada - ideal'; cor = 'var(--success)'; icone = '✓';
            } else if (numeroAtual < 15) {
                pontos = 90; texto = 'Baixa volatilidade - mais estável'; cor = 'var(--success)'; icone = '✅';
            } else if (numeroAtual <= 35) {
                pontos = 60; texto = 'Volatilidade elevada'; cor = 'var(--warning)'; icone = '⚠️';
            } else {
                pontos = 35; texto = 'Volatilidade muito alta - risco'; cor = 'var(--danger)'; icone = '❌';
            }
        }
    }
    
    // Market Cap - ideal: > $10B (large cap)
    else if (nomeIndicador.includes('Market Cap')) {
        if (numeroAtual >= 10) {
            pontos = 90; texto = 'Large cap - mais estável'; cor = 'var(--success)'; icone = '✅';
        } else if (numeroAtual >= 2) {
            pontos = 75; texto = 'Mid cap - bom equilíbrio'; cor = 'var(--success)'; icone = '✓';
        } else if (numeroAtual >= 0.3) {
            pontos = 55; texto = 'Small cap - maior risco'; cor = 'var(--warning)'; icone = '⚠️';
        } else {
            pontos = 35; texto = 'Micro cap - alto risco'; cor = 'var(--danger)'; icone = '❌';
        }
    }
    
    // Para outros indicadores, usar lógica genérica
    else {
        // Tentar comparar numericamente se possível
        if (!isNaN(numeroAtual)) {
            if (numeroAtual > 0) {
                pontos = 70; texto = 'Valor positivo'; cor = 'var(--success)'; icone = '✓';
            } else {
                pontos = 40; texto = 'Valor baixo ou negativo'; cor = 'var(--warning)'; icone = '⚠️';
            }
        } else {
            pontos = 60; texto = 'Valor informado'; cor = 'var(--text-light)'; icone = 'ℹ️';
        }
    }
    
    return { pontos, texto, cor, icone };
}

// Extrair número de uma string (ex: "15%", "$100M", "1.5")
function extrairNumero(valor) {
    if (typeof valor === 'number') return valor;
    
    const str = String(valor).toUpperCase();
    
    // Remover símbolos comuns
    let numero = str.replace(/[€$£¥,]/g, '').trim();
    
    // Converter B, M, K para números
    if (numero.includes('B')) {
        return parseFloat(numero.replace('B', '')) * 1000;
    } else if (numero.includes('M')) {
        return parseFloat(numero.replace('M', ''));
    } else if (numero.includes('K')) {
        return parseFloat(numero.replace('K', '')) / 1000;
    }
    
    // Remover % e converter
    numero = numero.replace('%', '');
    
    return parseFloat(numero) || 0;
}

function exportarResultadoAvaliacao(nome, score) {
    const resultado = document.getElementById('resultado-simulacao').innerText;
    const blob = new Blob([resultado], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avaliacao_${nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function novaAvaliacao() {
    document.getElementById('tipo-ativo-sim').value = '';
    document.getElementById('nome-ativo').value = '';
    document.getElementById('campos-avaliacao').innerHTML = '';
    document.getElementById('resultado-simulacao').classList.add('hidden');
}

function navegarPara(targetId) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`a[href="#${targetId}"]`)?.classList.add('active');
    
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(targetId)?.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar tipos de ativos
function renderizarAtivos() {
    const container = document.getElementById('ativos-container');
    container.innerHTML = tiposAtivos.map(ativo => `
        <div class="ativo-card">
            <h3><span>${ativo.icon}</span> ${ativo.nome}</h3>
            <div class="pros-cons">
                <div class="pros">
                    <h4>Vantagens</h4>
                    <ul>
                        ${ativo.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="contras">
                    <h4>Desvantagens</h4>
                    <ul>
                        ${ativo.contras.map(contra => `<li>${contra}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar questionário
let respostasUsuario = [];

function renderizarQuestionario() {
    const container = document.getElementById('questionario-container');
    container.innerHTML = questionario.map((questao, index) => `
        <div class="questao">
            <h4>${index + 1}. ${questao.pergunta}</h4>
            <div class="opcoes" data-questao="${index}">
                ${questao.opcoes.map((opcao, opcaoIndex) => `
                    <div class="opcao" data-pontos="${opcao.pontos}" data-opcao="${opcaoIndex}">
                        ${opcao.texto}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    container.innerHTML += '<button id="btn-calcular-perfil" class="btn-primary" style="margin-top: 1rem;">Calcular Perfil</button>';
    
    document.querySelectorAll('.opcao').forEach(opcao => {
        opcao.addEventListener('click', function() {
            const questaoIndex = this.parentElement.dataset.questao;
            const pontos = parseInt(this.dataset.pontos);
            
            this.parentElement.querySelectorAll('.opcao').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            respostasUsuario[questaoIndex] = pontos;
        });
    });
    
    document.getElementById('btn-calcular-perfil').addEventListener('click', calcularPerfil);
}

function calcularPerfil() {
    if (respostasUsuario.length < questionario.length) {
        alert('Por favor, responda a todas as questões.');
        return;
    }
    
    const totalPontos = respostasUsuario.reduce((sum, pontos) => sum + pontos, 0);
    const maxPontos = questionario.length * 5;
    const percentagem = (totalPontos / maxPontos) * 100;
    
    let perfilTipo;
    if (percentagem <= 40) {
        perfilTipo = 'conservador';
    } else if (percentagem <= 70) {
        perfilTipo = 'moderado';
    } else {
        perfilTipo = 'arrojado';
    }
    
    const perfil = perfis[perfilTipo];
    mostrarResultadoPerfil(perfil);
}

function mostrarResultadoPerfil(perfil) {
    const container = document.getElementById('resultado-perfil');
    container.innerHTML = `
        <div class="perfil-resultado">
            <h3>Seu Perfil de Investidor</h3>
            <span class="perfil-badge ${perfil.classe}">${perfil.nome}</span>
            <p>${perfil.descricao}</p>
            
            <div class="alocacao">
                <h4>Alocação Recomendada:</h4>
                ${perfil.alocacao.map(item => `
                    <div class="alocacao-item">
                        <div>
                            <strong>${item.tipo}</strong>
                            <div class="alocacao-bar" style="width: ${item.percentagem}%"></div>
                        </div>
                        <span>${item.percentagem}%</span>
                    </div>
                `).join('')}
            </div>
            
            <button class="btn-secondary" onclick="reiniciarQuestionario()">Refazer Teste</button>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });
}

function reiniciarQuestionario() {
    respostasUsuario = [];
    document.getElementById('resultado-perfil').classList.add('hidden');
    document.querySelectorAll('.opcao').forEach(o => o.classList.remove('selected'));
}

// Renderizar indicadores
function renderizarIndicadores() {
    const container = document.getElementById('indicadores-container');
    const tipos = [
        { key: 'acoes', nome: 'Ações', icon: '📈' },
        { key: 'etf', nome: 'ETF', icon: '📊' },
        { key: 'reit', nome: 'REIT', icon: '🏢' },
        { key: 'commodities', nome: 'Commodities', icon: '🥇' },
        { key: 'criptomoedas', nome: 'Criptomoedas', icon: '₿' }
    ];
    
    container.innerHTML = tipos.map(tipo => `
        <div class="indicador-tipo">
            <h3><span>${tipo.icon}</span> ${tipo.nome}</h3>
            <div class="indicador-lista">
                ${indicadoresPorTipo[tipo.key].map((ind, index) => `
                    <div class="indicador-item">
                        <strong>${index + 1}. ${ind.nome}</strong>
                        <p>${ind.descricao}</p>
                        <p><em>Valor ideal: ${ind.ideal}</em></p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Simulações financeiras
function calcularJuros() {
    const capital = parseFloat(document.getElementById('juros-capital').value);
    const taxa = parseFloat(document.getElementById('juros-taxa').value) / 100;
    const periodo = parseInt(document.getElementById('juros-periodo').value);
    const mensal = parseFloat(document.getElementById('juros-mensal').value);
    
    const montanteSimples = capital * (1 + taxa * periodo) + (mensal * 12 * periodo);
    const jurosSimples = montanteSimples - capital - (mensal * 12 * periodo);
    
    const taxaMensal = Math.pow(1 + taxa, 1/12) - 1;
    const meses = periodo * 12;
    let montanteComposto = capital * Math.pow(1 + taxa, periodo);
    
    if (mensal > 0) {
        const fvContribuicoes = mensal * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
        montanteComposto += fvContribuicoes;
    }
    
    const totalInvestido = capital + (mensal * 12 * periodo);
    const jurosCompostos = montanteComposto - totalInvestido;
    const diferenca = montanteComposto - montanteSimples;
    
    const container = document.getElementById('resultado-juros');
    container.innerHTML = `
        <div class="resultado-comparacao">
            <div class="resultado-box">
                <h4>Juro Simples</h4>
                <div class="resultado-valor">€${montanteSimples.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</div>
                <p style="color: var(--text-light);">Juros: €${jurosSimples.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</p>
            </div>
            <div class="resultado-box resultado-destaque">
                <h4>Juro Composto</h4>
                <div class="resultado-valor">€${montanteComposto.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</div>
                <p style="color: rgba(255,255,255,0.9);">Juros: €${jurosCompostos.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</p>
            </div>
        </div>
        
        <div class="resultado-info">
            <div class="resultado-info-item">
                <span class="resultado-info-label">Total Investido</span>
                <span class="resultado-info-valor">€${totalInvestido.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Diferença (Composto vs Simples)</span>
                <span class="resultado-info-valor" style="color: var(--success);">+€${diferenca.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Retorno Total</span>
                <span class="resultado-info-valor">${((montanteComposto / totalInvestido - 1) * 100).toFixed(2)}%</span>
            </div>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calcularRendimento() {
    const mensal = parseFloat(document.getElementById('rend-mensal').value);
    const periodo = parseInt(document.getElementById('rend-periodo').value);
    const taxaAnual = parseFloat(document.getElementById('rend-taxa').value) / 100;
    const dividendos = parseFloat(document.getElementById('rend-dividendos').value) / 100;
    
    const taxaMensal = Math.pow(1 + taxaAnual, 1/12) - 1;
    const meses = periodo * 12;
    const totalInvestido = mensal * meses;
    
    let valorFinal = mensal * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
    const dividendosTotal = valorFinal * dividendos * periodo * 0.5;
    valorFinal += dividendosTotal;
    
    const ganhos = valorFinal - totalInvestido;
    const retornoPercentual = (ganhos / totalInvestido) * 100;
    
    const container = document.getElementById('resultado-rendimento');
    container.innerHTML = `
        <div class="resultado-box resultado-destaque" style="max-width: 600px; margin: 0 auto;">
            <h4>Valor Final Estimado</h4>
            <div class="resultado-valor">€${valorFinal.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</div>
            <p style="color: rgba(255,255,255,0.9);">Após ${periodo} anos de investimento</p>
        </div>
        
        <div class="resultado-info">
            <div class="resultado-info-item">
                <span class="resultado-info-label">Total Investido</span>
                <span class="resultado-info-valor">€${totalInvestido.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Ganhos de Capital</span>
                <span class="resultado-info-valor" style="color: var(--success);">€${ganhos.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Dividendos Acumulados</span>
                <span class="resultado-info-valor">€${dividendosTotal.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Retorno Total</span>
                <span class="resultado-info-valor">${retornoPercentual.toFixed(2)}%</span>
            </div>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calcularRegra4() {
    const idadeAtual = parseInt(document.getElementById('regra4-idade-atual').value);
    const idadeObjetivo = parseInt(document.getElementById('regra4-idade-objetivo').value);
    const rendaMensal = parseFloat(document.getElementById('regra4-mensal').value);
    const capitalAtual = parseFloat(document.getElementById('regra4-capital-atual').value);
    const inflacao = parseFloat(document.getElementById('regra4-inflacao').value) / 100;
    
    if (idadeObjetivo <= idadeAtual) {
        alert('A idade objetivo deve ser maior que a idade atual.');
        return;
    }
    
    const anosAteObjetivo = idadeObjetivo - idadeAtual;
    const rendaMensalAjustada = rendaMensal * Math.pow(1 + inflacao, anosAteObjetivo);
    const rendaAnualAjustada = rendaMensalAjustada * 12;
    const capitalNecessario = rendaAnualAjustada / 0.04;
    const capitalFaltante = Math.max(0, capitalNecessario - capitalAtual);
    
    const rendimentoVUUA = 0.10;
    const taxaMensalVUUA = Math.pow(1 + rendimentoVUUA, 1/12) - 1;
    const mesesAteObjetivo = anosAteObjetivo * 12;
    
    const valorFuturoCapitalAtual = capitalAtual * Math.pow(1 + rendimentoVUUA, anosAteObjetivo);
    const capitalFaltanteAjustado = capitalNecessario - valorFuturoCapitalAtual;
    
    let investimentoMensalVUUA = 0;
    if (capitalFaltanteAjustado > 0) {
        investimentoMensalVUUA = capitalFaltanteAjustado / (((Math.pow(1 + taxaMensalVUUA, mesesAteObjetivo) - 1) / taxaMensalVUUA));
    }
    
    const totalInvestidoVUUA = investimentoMensalVUUA * mesesAteObjetivo + capitalAtual;
    
    const container = document.getElementById('resultado-regra4');
    container.innerHTML = `
        <div class="resultado-box resultado-destaque" style="max-width: 600px; margin: 0 auto;">
            <h4>Capital Necessário aos ${idadeObjetivo} anos</h4>
            <div class="resultado-valor">€${capitalNecessario.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</div>
            <p style="color: rgba(255,255,255,0.9);">Para renda de €${rendaMensalAjustada.toLocaleString('pt-PT', {maximumFractionDigits: 0})}/mês</p>
        </div>
        
        <div class="resultado-info">
            <div class="resultado-info-item">
                <span class="resultado-info-label">Investimento Mensal Necessário</span>
                <span class="resultado-info-valor" style="color: var(--success); font-size: 1.2rem;">
                    €${investimentoMensalVUUA.toLocaleString('pt-PT', {maximumFractionDigits: 0})}/mês
                </span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Total a Investir (${anosAteObjetivo} anos)</span>
                <span class="resultado-info-valor">€${totalInvestidoVUUA.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Ganhos Estimados</span>
                <span class="resultado-info-valor" style="color: var(--success);">
                    €${(capitalNecessario - totalInvestidoVUUA).toLocaleString('pt-PT', {maximumFractionDigits: 0})}
                </span>
            </div>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Renderizar glossário
function renderizarGlossario() {
    const container = document.getElementById('glossario-container');
    const termos = [...glossario].sort((a, b) => a.termo.localeCompare(b.termo));
    
    container.innerHTML = termos.map(item => `
        <div class="glossario-termo">
            <div class="glossario-termo-header">
                <h3 class="glossario-termo-nome">${item.termo}</h3>
                <span class="glossario-categoria-badge">${item.categoria}</span>
            </div>
            <p class="glossario-definicao">${item.definicao}</p>
        </div>
    `).join('');
}

function filtrarGlossario() {
    const busca = document.getElementById('glossario-busca').value.toLowerCase();
    const container = document.getElementById('glossario-container');
    
    const termosFiltrados = glossario.filter(item => 
        item.termo.toLowerCase().includes(busca) ||
        item.definicao.toLowerCase().includes(busca)
    ).sort((a, b) => a.termo.localeCompare(b.termo));
    
    if (termosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="glossario-vazio">
                <span class="icon">🔍</span>
                <p>Nenhum termo encontrado para "${busca}"</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = termosFiltrados.map(item => `
        <div class="glossario-termo">
            <div class="glossario-termo-header">
                <h3 class="glossario-termo-nome">${item.termo}</h3>
                <span class="glossario-categoria-badge">${item.categoria}</span>
            </div>
            <p class="glossario-definicao">${item.definicao}</p>
        </div>
    `).join('');
}

// Renderizar corretoras
function renderizarCorretoras() {
    const container = document.getElementById('corretoras-container');
    
    container.innerHTML = corretoras.map(corretora => `
        <div class="corretora-card">
            <div class="corretora-header">
                <h3 class="corretora-nome">${corretora.nome}</h3>
                <div class="corretora-badges">
                    <div class="corretora-avaliacao">
                        <span class="estrelas">⭐</span>
                        <span>${corretora.avaliacao.toFixed(1)}/5</span>
                    </div>
                    ${corretora.temApp ? '<span class="corretora-app">📱 App Móvel</span>' : ''}
                </div>
            </div>
            
            <div class="corretora-pontos">
                <div class="ponto-positivo">
                    <strong>✓ Ponto Positivo</strong>
                    <p>${corretora.pontoPositivo}</p>
                </div>
                <div class="ponto-negativo">
                    <strong>✗ Ponto Negativo</strong>
                    <p>${corretora.pontoNegativo}</p>
                </div>
            </div>
            
            <a href="${corretora.link}" target="_blank" rel="noopener noreferrer" class="corretora-link">
                Visitar Website →
            </a>
        </div>
    `).join('');
}

console.log('✅ app-sem-api.js carregado - Versão sem APIs');

// Navegação
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        navegarPara(targetId);
    });
});

// Navegação dos cards da home
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hero-cards .card').forEach(card => {
        card.addEventListener('click', () => {
            const targetSection = card.dataset.nav;
            if (targetSection) {
                navegarPara(targetSection);
            }
        });
    });
});

function navegarPara(targetId) {
    // Atualizar links ativos
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`a[href="#${targetId}"]`)?.classList.add('active');
    
    // Mostrar seção correspondente
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(targetId)?.classList.add('active');
    
    // Scroll para o topo
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
    
    // Adicionar botão de calcular
    container.innerHTML += '<button id="btn-calcular-perfil" class="btn-primary" style="margin-top: 1rem;">Calcular Perfil</button>';
    
    // Event listeners para opções
    document.querySelectorAll('.opcao').forEach(opcao => {
        opcao.addEventListener('click', function() {
            const questaoIndex = this.parentElement.dataset.questao;
            const pontos = parseInt(this.dataset.pontos);
            
            // Remover seleção anterior
            this.parentElement.querySelectorAll('.opcao').forEach(o => o.classList.remove('selected'));
            
            // Adicionar seleção atual
            this.classList.add('selected');
            
            // Guardar resposta
            respostasUsuario[questaoIndex] = pontos;
        });
    });
    
    // Event listener para calcular perfil
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

// Simulação
document.getElementById('btn-simular').addEventListener('click', simularInvestimento);

async function simularInvestimento() {
    const tipoAtivo = document.getElementById('tipo-ativo-sim').value;
    const sigla = document.getElementById('sigla-ativo').value.toUpperCase().trim();
    
    if (!tipoAtivo || !sigla) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Mostrar loading
    const container = document.getElementById('resultado-simulacao');
    container.innerHTML = '<div style="text-align: center; padding: 2rem;"><p>🔄 Buscando dados de múltiplas fontes para <strong>' + sigla + '</strong>...</p><p style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.5rem;">Combinando Alpha Vantage, Financial Modeling Prep, Twelve Data e outras APIs...</p></div>';
    container.classList.remove('hidden');
    
    try {
        let dadosReais, tipoDetectado;
        
        // Se for crypto, usar CoinGecko API
        if (tipoAtivo === 'criptomoedas') {
            dadosReais = await multiAPI.buscarDadosCryptoCompletos(sigla);
            tipoDetectado = 'criptomoedas';
        } else {
            // Buscar dados de múltiplas fontes e combinar
            console.log('🔍 Buscando dados de múltiplas APIs...');
            
            // 1. Alpha Vantage (base)
            const dadosAlpha = await yahooFinance.buscarDadosAtivo(sigla);
            tipoDetectado = yahooFinance.determinarTipoAtivo(dadosAlpha);
            
            // 2. Tentar enriquecer com Financial Modeling Prep
            let dadosFMP = null;
            if (multiAPI.isConfigurada('fmp')) {
                try {
                    console.log('📊 Buscando dados adicionais do FMP...');
                    const [rating, dividendos, balanco] = await Promise.all([
                        multiAPI.buscarRating(sigla),
                        multiAPI.buscarCalendarioDividendos(sigla),
                        multiAPI.buscarBalanco(sigla)
                    ]);
                    
                    dadosFMP = { rating, dividendos, balanco };
                    console.log('✅ Dados FMP obtidos:', dadosFMP);
                } catch (error) {
                    console.warn('⚠️ Erro ao buscar dados FMP:', error);
                }
            }
            
            // 3. Tentar buscar indicadores técnicos do Twelve Data
            let indicadoresTecnicos = null;
            if (multiAPI.isConfigurada('twelvedata')) {
                try {
                    console.log('📈 Buscando indicadores técnicos...');
                    indicadoresTecnicos = await multiAPI.buscarIndicadoresTecnicos(sigla);
                    console.log('✅ Indicadores técnicos obtidos:', indicadoresTecnicos);
                } catch (error) {
                    console.warn('⚠️ Erro ao buscar indicadores técnicos:', error);
                }
            }
            
            // 4. Combinar todos os dados
            dadosReais = {
                ...dadosAlpha,
                fmp: dadosFMP,
                indicadoresTecnicos: indicadoresTecnicos,
                fontesUsadas: ['Alpha Vantage']
            };
            
            if (dadosFMP) dadosReais.fontesUsadas.push('Financial Modeling Prep');
            if (indicadoresTecnicos) dadosReais.fontesUsadas.push('Twelve Data');
            
            console.log('✅ Dados combinados de', dadosReais.fontesUsadas.length, 'fontes');
            
            // Verificar se o tipo corresponde
            if (tipoAtivo !== tipoDetectado && tipoAtivo !== 'acoes') {
                const confirmar = confirm(`O ticker ${sigla} parece ser um ${tipoDetectado}, mas você selecionou ${tipoAtivo}. Continuar mesmo assim?`);
                if (!confirmar) {
                    container.classList.add('hidden');
                    return;
                }
            }
        }
        
        mostrarResultadoSimulacao(dadosReais, tipoAtivo, sigla);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        
        // Fallback para dados simulados
        const confirmar = confirm(`Não foi possível buscar dados reais para ${sigla}. Deseja ver uma simulação com dados estimados?`);
        if (confirmar) {
            const dadosSimulados = gerarDadosSimulados(tipoAtivo, sigla);
            mostrarResultadoSimulacao(dadosSimulados, tipoAtivo, sigla, true);
        } else {
            container.classList.add('hidden');
        }
    }
}

function gerarDadosSimulados(tipo, sigla) {
    // Gerar dados aleatórios para demonstração
    const dados = {};
    const indicadores = indicadoresPorTipo[tipo];
    
    indicadores.forEach(ind => {
        let valor;
        switch(ind.nome) {
            case 'P/E Ratio (Price to Earnings)':
                valor = (Math.random() * 30 + 5).toFixed(2);
                break;
            case 'ROE (Return on Equity)':
                valor = (Math.random() * 30 + 5).toFixed(2) + '%';
                break;
            case 'Dividend Yield':
                valor = (Math.random() * 6 + 1).toFixed(2) + '%';
                break;
            case 'Debt to Equity':
                valor = (Math.random() * 2).toFixed(2);
                break;
            case 'EPS Growth':
                valor = (Math.random() * 20 + 5).toFixed(2) + '%';
                break;
            case 'Expense Ratio':
                valor = (Math.random() * 1).toFixed(3) + '%';
                break;
            case 'Tracking Error':
                valor = (Math.random() * 2).toFixed(2) + '%';
                break;
            case 'Volume de Negociação':
                valor = Math.floor(Math.random() * 1000000 + 50000).toLocaleString();
                break;
            case 'AUM (Assets Under Management)':
                valor = '$' + Math.floor(Math.random() * 5000 + 100) + 'M';
                break;
            case 'FFO (Funds From Operations)':
                valor = '$' + (Math.random() * 3 + 1.5).toFixed(2) + '/ação';
                break;
            case 'Occupancy Rate':
                valor = (Math.random() * 10 + 85).toFixed(1) + '%';
                break;
            case 'Price to FFO':
                valor = (Math.random() * 10 + 8).toFixed(2);
                break;
            case 'Tendência de Preço (Score)':
                valor = Math.floor(Math.random() * 40 + 40); // Score entre 40-80
                break;
            case 'Rácio Oferta/Procura':
                valor = (Math.random() * 0.5 + 0.85).toFixed(2); // Valores entre 0.85-1.35
                break;
            case 'Correlação com Inflação':
                valor = (Math.random() * 0.4 + 0.6).toFixed(2);
                break;
            case 'Volatilidade (30 dias)':
                valor = (Math.random() * 20 + 10).toFixed(1) + '%';
                break;
            // Crypto indicators
            case 'Market Cap (Capitalização)':
                valor = '$' + (Math.random() * 500 + 10).toFixed(1) + 'B';
                break;
            case 'Volume 24h / Market Cap':
                valor = (Math.random() * 15 + 3).toFixed(2) + '%';
                break;
            case 'Distância do ATH (All-Time High)':
                valor = (Math.random() * 60 + 20).toFixed(1) + '%';
                break;
            case 'Rendimento Anual (CAGR 1 ano)':
                valor = (Math.random() * 200 - 50).toFixed(1) + '%';
                break;
            default:
                valor = (Math.random() * 100).toFixed(2);
        }
        dados[ind.nome] = valor;
    });
    
    return dados;
}

function mostrarResultadoSimulacao(dados, tipo, sigla, isSimulado = false) {
    const indicadores = indicadoresPorTipo[tipo];
    
    // Mapear dados reais para indicadores
    const valoresIndicadores = {};
    
    if (!isSimulado && (dados.ticker || dados.fonte === 'coingecko')) {
        // Dados reais
        if (tipo === 'criptomoedas') {
            // Dados de crypto (CoinGecko)
            indicadores.forEach(ind => {
                switch(ind.nome) {
                    case 'Market Cap (Capitalização)':
                        valoresIndicadores[ind.nome] = multiAPI.formatarMoeda(dados.marketCap, 'USD');
                        break;
                    case 'Volume 24h / Market Cap':
                        const ratio = (dados.volume24h / dados.marketCap) * 100;
                        valoresIndicadores[ind.nome] = multiAPI.formatarNumero(ratio, 2) + '%';
                        break;
                    case 'Volatilidade (30 dias)':
                        valoresIndicadores[ind.nome] = dados.historico ? multiAPI.formatarNumero(dados.historico.volatilidade, 1) + '%' : 'N/D';
                        break;
                    case 'Distância do ATH (All-Time High)':
                        const distanciaATH = ((dados.ath - dados.preco) / dados.ath) * 100;
                        valoresIndicadores[ind.nome] = multiAPI.formatarNumero(distanciaATH, 1) + '%';
                        break;
                    case 'Rendimento Anual (CAGR 1 ano)':
                        valoresIndicadores[ind.nome] = dados.variacao1y ? multiAPI.formatarNumero(dados.variacao1y, 1) + '%' : 'N/D';
                        break;
                    default:
                        valoresIndicadores[ind.nome] = 'N/D';
                }
            });
        } else {
            // Dados de ações/ETF/REIT/Commodities (Alpha Vantage)
            indicadores.forEach(ind => {
                switch(ind.nome) {
                    case 'P/E Ratio (Price to Earnings)':
                        valoresIndicadores[ind.nome] = dados.peRatio ? yahooFinance.formatarNumero(dados.peRatio) : 'N/D';
                        break;
                    case 'ROE (Return on Equity)':
                        valoresIndicadores[ind.nome] = dados.roe ? yahooFinance.formatarNumero(dados.roe) + '%' : 'N/D';
                        break;
                    case 'Dividend Yield':
                        valoresIndicadores[ind.nome] = yahooFinance.formatarNumero(dados.dividendYield) + '%';
                        break;
                    case 'Debt to Equity':
                        valoresIndicadores[ind.nome] = dados.debtToEquity ? yahooFinance.formatarNumero(dados.debtToEquity) : 'N/D';
                        break;
                    case 'EPS Growth':
                        valoresIndicadores[ind.nome] = dados.profitMargins ? yahooFinance.formatarNumero(dados.profitMargins) + '%' : 'N/D';
                        break;
                    case 'Expense Ratio':
                        valoresIndicadores[ind.nome] = dados.expenseRatio ? yahooFinance.formatarNumero(dados.expenseRatio, 3) + '%' : 'N/D';
                        break;
                    case 'Tracking Error':
                        valoresIndicadores[ind.nome] = 'N/D'; // Yahoo não fornece
                        break;
                    case 'Volume de Negociação':
                        valoresIndicadores[ind.nome] = dados.avgVolume ? dados.avgVolume.toLocaleString('pt-PT') : (dados.volume ? dados.volume.toLocaleString('pt-PT') : 'N/D');
                        break;
                    case 'AUM (Assets Under Management)':
                        valoresIndicadores[ind.nome] = dados.marketCap ? yahooFinance.formatarMoeda(dados.marketCap, dados.moeda) : 'N/D';
                        break;
                    case 'FFO (Funds From Operations)':
                        valoresIndicadores[ind.nome] = 'N/D'; // Yahoo não fornece FFO
                        break;
                    case 'Occupancy Rate':
                        valoresIndicadores[ind.nome] = 'N/D'; // Yahoo não fornece
                        break;
                    case 'Price to FFO':
                        valoresIndicadores[ind.nome] = 'N/D'; // Yahoo não fornece
                        break;
                    case 'Tendência de Preço (Score)':
                        // Calcular baseado em 52 week high/low
                        if (dados.fiftyTwoWeekHigh && dados.fiftyTwoWeekLow && dados.preco) {
                            const range = dados.fiftyTwoWeekHigh - dados.fiftyTwoWeekLow;
                            const posicao = dados.preco - dados.fiftyTwoWeekLow;
                            const score = Math.round((posicao / range) * 100);
                            valoresIndicadores[ind.nome] = score;
                        } else {
                            valoresIndicadores[ind.nome] = 'N/D';
                        }
                        break;
                    case 'Rácio Oferta/Procura':
                        valoresIndicadores[ind.nome] = 'N/D'; // Não disponível
                        break;
                    case 'Correlação com Inflação':
                        valoresIndicadores[ind.nome] = 'N/D'; // Não disponível
                        break;
                    case 'Volatilidade (30 dias)':
                        valoresIndicadores[ind.nome] = dados.beta ? yahooFinance.formatarNumero(dados.beta * 15) + '%' : 'N/D';
                        break;
                    default:
                        valoresIndicadores[ind.nome] = 'N/D';
                }
            });
        }
    } else {
        // Dados simulados (fallback)
        indicadores.forEach(ind => {
            valoresIndicadores[ind.nome] = dados[ind.nome] || 'N/D';
        });
    }
    
    // Calcular score baseado em dados disponíveis
    let score;
    if (!isSimulado && dados.ticker) {
        // Score baseado em dados reais (ações/ETF/REIT)
        let pontos = 50; // Base
        
        if (dados.peRatio && dados.peRatio < 25) pontos += 10;
        if (dados.dividendYield > 2) pontos += 10;
        if (dados.roe && dados.roe > 15) pontos += 10;
        if (dados.beta && dados.beta < 1.2) pontos += 10;
        if (dados.debtToEquity && dados.debtToEquity < 1) pontos += 10;
        
        score = Math.min(100, pontos);
    } else if (!isSimulado && dados.fonte === 'coingecko') {
        // Score baseado em dados reais (crypto)
        let pontos = 50; // Base
        
        if (dados.marketCap > 10e9) pontos += 15; // Large cap
        if (dados.rank && dados.rank <= 10) pontos += 10; // Top 10
        if (dados.variacao1y && dados.variacao1y > 0) pontos += 10; // Positivo no ano
        const distanciaATH = ((dados.ath - dados.preco) / dados.ath) * 100;
        if (distanciaATH > 30 && distanciaATH < 70) pontos += 10; // Boa oportunidade
        if (dados.volume24h / dados.marketCap > 0.05 && dados.volume24h / dados.marketCap < 0.15) pontos += 5; // Boa liquidez
        
        score = Math.min(100, pontos);
    } else {
        score = Math.floor(Math.random() * 30 + 60);
    }
    
    const avisoSimulado = isSimulado ? '<p style="color: var(--warning); margin-top: 1rem;"><strong>⚠️ Aviso:</strong> Dados simulados - não foi possível obter dados reais.</p>' : '';
    const nomeAtivo = (!isSimulado && dados.nome) ? `${sigla} - ${dados.nome}` : sigla;
    const precoAtual = (!isSimulado && dados.preco) ? `<p style="margin-top: 0.5rem; color: var(--text-light);">Preço atual: ${tipo === 'criptomoedas' ? multiAPI.formatarMoeda(dados.preco, dados.moeda) : yahooFinance.formatarMoeda(dados.preco, dados.moeda)}</p>` : '';
    const rankCrypto = (!isSimulado && dados.rank && tipo === 'criptomoedas') ? `<p style="margin-top: 0.25rem; color: var(--text-light);">Rank: #${dados.rank} por market cap</p>` : '';
    
    // Informações adicionais de múltiplas fontes
    let infoAdicional = '';
    if (!isSimulado && dados.fontesUsadas && dados.fontesUsadas.length > 1) {
        infoAdicional = `
            <div style="margin-top: 1rem; padding: 0.75rem; background: #f0fdf4; border-radius: 6px; border-left: 3px solid var(--success);">
                <p style="margin: 0; font-size: 0.9rem; color: var(--success);">
                    <strong>✨ Dados enriquecidos!</strong> Informações combinadas de ${dados.fontesUsadas.length} fontes: ${dados.fontesUsadas.join(', ')}
                </p>
            </div>
        `;
    }
    
    // Rating de analistas (se disponível)
    let ratingSection = '';
    if (!isSimulado && dados.fmp && dados.fmp.rating) {
        const rating = dados.fmp.rating;
        ratingSection = `
            <div style="margin-top: 1.5rem; padding: 1rem; background: #eff6ff; border-radius: 6px;">
                <h4 style="margin-bottom: 0.75rem; color: var(--primary);">📊 Rating de Analistas</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-light);">Recomendação</span>
                        <p style="margin: 0.25rem 0 0 0; font-weight: bold; color: var(--primary);">${rating.rating || 'N/D'}</p>
                    </div>
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-light);">Score</span>
                        <p style="margin: 0.25rem 0 0 0; font-weight: bold;">${rating.ratingScore || 'N/D'}/5</p>
                    </div>
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-light);">Recomendação Detalhada</span>
                        <p style="margin: 0.25rem 0 0 0; font-weight: bold;">${rating.ratingRecommendation || 'N/D'}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Indicadores técnicos (se disponíveis)
    let indicadoresSection = '';
    if (!isSimulado && dados.indicadoresTecnicos) {
        const ind = dados.indicadoresTecnicos;
        indicadoresSection = `
            <div style="margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-radius: 6px;">
                <h4 style="margin-bottom: 0.75rem; color: var(--warning);">📈 Indicadores Técnicos</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
                    ${ind.rsi ? `
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-light);">RSI (14)</span>
                        <p style="margin: 0.25rem 0 0 0; font-weight: bold;">${parseFloat(ind.rsi).toFixed(2)}</p>
                        <span style="font-size: 0.75rem; color: var(--text-light);">${ind.rsi < 30 ? 'Sobrevendido' : ind.rsi > 70 ? 'Sobrecomprado' : 'Neutro'}</span>
                    </div>
                    ` : ''}
                    ${ind.macd ? `
                    <div>
                        <span style="font-size: 0.85rem; color: var(--text-light);">MACD</span>
                        <p style="margin: 0.25rem 0 0 0; font-weight: bold;">${parseFloat(ind.macd.macd).toFixed(4)}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Próximos dividendos (se disponíveis)
    let dividendosSection = '';
    if (!isSimulado && dados.fmp && dados.fmp.dividendos && dados.fmp.dividendos.length > 0) {
        const proximos = dados.fmp.dividendos.slice(0, 3);
        dividendosSection = `
            <div style="margin-top: 1.5rem; padding: 1rem; background: #f0fdf4; border-radius: 6px;">
                <h4 style="margin-bottom: 0.75rem; color: var(--success);">💰 Histórico de Dividendos</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${proximos.map(div => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: white; border-radius: 4px;">
                            <span style="font-size: 0.9rem;">${div.date}</span>
                            <span style="font-weight: bold; color: var(--success);">$${div.dividend}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    const container = document.getElementById('resultado-simulacao');
    container.innerHTML = `
        <div class="resultado-simulacao">
            <h3>Resultado da Avaliação: ${nomeAtivo}</h3>
            ${precoAtual}
            ${rankCrypto}
            ${avisoSimulado}
            ${infoAdicional}
            
            <div class="score-container">
                <div class="score-value">${score}</div>
                <div class="score-label">Score de Propensão</div>
                <p style="margin-top: 1rem; color: var(--text-light);">
                    ${score >= 80 ? 'Excelente oportunidade' : 
                      score >= 60 ? 'Boa oportunidade' : 
                      'Requer análise adicional'}
                </p>
            </div>
            
            ${ratingSection}
            ${indicadoresSection}
            ${dividendosSection}
            
            <h4 style="margin-top: 2rem;">Análise de Indicadores:</h4>
            <div class="indicadores-comparacao">
                ${indicadores.map(ind => `
                    <div class="indicador-comparacao-card">
                        <div class="indicador-header">
                            <strong>${ind.nome}</strong>
                            <p class="indicador-descricao">${ind.descricao}</p>
                        </div>
                        <div class="indicador-valores">
                            <div class="valor-item">
                                <span class="valor-label">Valor Atual</span>
                                <span class="valor-atual">${valoresIndicadores[ind.nome]}</span>
                            </div>
                            <div class="valor-separador">vs</div>
                            <div class="valor-item">
                                <span class="valor-label">Valor Ideal</span>
                                <span class="valor-ideal">${ind.ideal}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn-primary" onclick="exportarResultado('${sigla}', ${score})">
                    📥 Exportar Resultado
                </button>
                <button class="btn-secondary" onclick="novaSimulacao()">
                    Nova Avaliação
                </button>
            </div>
            
            ${!isSimulado ? `<div class="sim-explicacao" style="margin-top: 1.5rem;"><p><strong>ℹ️ Fontes:</strong> ${dados.fontesUsadas ? dados.fontesUsadas.join(', ') : (tipo === 'criptomoedas' ? 'CoinGecko' : 'Alpha Vantage')}</p></div>` : ''}
        </div>
    `;
    
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });
}

function exportarResultado(sigla, score) {
    const resultado = document.getElementById('resultado-simulacao').innerText;
    const blob = new Blob([resultado], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investsmart_${sigla}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function novaSimulacao() {
    document.getElementById('tipo-ativo-sim').value = '';
    document.getElementById('sigla-ativo').value = '';
    document.getElementById('resultado-simulacao').classList.add('hidden');
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderizarAtivos();
    renderizarQuestionario();
    renderizarIndicadores();
    renderizarCorretoras();
    renderizarGlossario();
    renderizarAnuncios();
});


// Renderizar anúncios
function renderizarAnuncios() {
    const container = document.getElementById('anuncios-container');
    
    if (anuncios.length === 0) {
        container.innerHTML = `
            <div class="anuncio-vazio">
                <span class="icon">📭</span>
                <p>Não há anúncios no momento.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = anuncios.map(anuncio => `
        <div class="anuncio-card">
            <span class="anuncio-tipo ${anuncio.tipo}">${
                anuncio.tipo === 'importante' ? '⚠️ Importante' :
                anuncio.tipo === 'aviso' ? '⚡ Aviso' :
                'ℹ️ Informação'
            }</span>
            <div class="anuncio-header">
                <h3 class="anuncio-titulo">${anuncio.titulo}</h3>
                <span class="anuncio-data">${formatarData(anuncio.data)}</span>
            </div>
            <div class="anuncio-conteudo">
                <p>${anuncio.conteudo}</p>
            </div>
        </div>
    `).join('');
    
    // Verificar status de todas as APIs
    verificarStatusApis();
}

function formatarData(dataStr) {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-PT', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Salvar API keys (múltiplas APIs)
function salvarApiKey(apiName) {
    const input = document.getElementById(`api-key-${apiName}`);
    const apiKey = input.value.trim();
    const statusSpan = document.getElementById(`status-${apiName}`);
    
    if (!apiKey) {
        statusSpan.innerHTML = '<span style="color: var(--danger);">❌ Insira uma key válida</span>';
        return;
    }
    
    if (apiKey === 'demo') {
        statusSpan.innerHTML = '<span style="color: var(--warning);">⚠️ "demo" é apenas para testes</span>';
        return;
    }
    
    // Salvar API key
    if (apiName === 'alphavantage') {
        yahooFinance.configurarApiKey(apiKey);
    } else {
        multiAPI.configurarKey(apiName, apiKey);
    }
    
    statusSpan.innerHTML = '<span style="color: var(--success);">✅ Configurada</span>';
    input.value = '';
    
    console.log(`✅ API ${apiName} configurada com sucesso!`);
}

// Verificar status de todas as APIs
function verificarStatusApis() {
    const apis = ['alphavantage', 'fmp', 'twelvedata', 'polygon'];
    
    apis.forEach(api => {
        const statusSpan = document.getElementById(`status-${api}`);
        if (!statusSpan) return;
        
        let isConfigurada = false;
        
        if (api === 'alphavantage') {
            isConfigurada = yahooFinance.isConfigurada();
        } else {
            isConfigurada = multiAPI.isConfigurada(api);
        }
        
        if (isConfigurada) {
            statusSpan.innerHTML = '<span style="color: var(--success);">✅ Configurada</span>';
        } else {
            statusSpan.innerHTML = '<span style="color: var(--text-light);">⚪ Não configurada</span>';
        }
    });
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


// Tabs de Simulação
document.querySelectorAll('.sim-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const simType = this.dataset.sim;
        
        // Atualizar tabs
        document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Mostrar conteúdo correspondente
        document.querySelectorAll('.sim-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`sim-${simType}`).classList.add('active');
    });
});

// Simulação 1: Juros Compostos
function calcularJuros() {
    const capital = parseFloat(document.getElementById('juros-capital').value);
    const taxa = parseFloat(document.getElementById('juros-taxa').value) / 100;
    const periodo = parseInt(document.getElementById('juros-periodo').value);
    const mensal = parseFloat(document.getElementById('juros-mensal').value);
    
    // Juro Simples
    const montanteSimples = capital * (1 + taxa * periodo) + (mensal * 12 * periodo);
    const jurosSimples = montanteSimples - capital - (mensal * 12 * periodo);
    
    // Juro Composto (com contribuições mensais)
    const taxaMensal = Math.pow(1 + taxa, 1/12) - 1;
    const meses = periodo * 12;
    let montanteComposto = capital * Math.pow(1 + taxa, periodo);
    
    // Adicionar contribuições mensais com juro composto
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

// Simulação 2: Rendimento de Ativo
function toggleTickerRendimento() {
    const checkbox = document.getElementById('rend-usar-ticker');
    const tickerGroup = document.getElementById('rend-ticker-group');
    const taxaInput = document.getElementById('rend-taxa');
    const dividendosInput = document.getElementById('rend-dividendos');
    
    if (checkbox.checked) {
        tickerGroup.classList.remove('hidden');
        taxaInput.disabled = true;
        dividendosInput.disabled = true;
        taxaInput.style.backgroundColor = '#f1f5f9';
        dividendosInput.style.backgroundColor = '#f1f5f9';
        taxaInput.style.cursor = 'not-allowed';
        dividendosInput.style.cursor = 'not-allowed';
    } else {
        tickerGroup.classList.add('hidden');
        taxaInput.disabled = false;
        dividendosInput.disabled = false;
        taxaInput.style.backgroundColor = '';
        dividendosInput.style.backgroundColor = '';
        taxaInput.style.cursor = '';
        dividendosInput.style.cursor = '';
        document.getElementById('rend-ticker').value = '';
        
        // Remover mensagem se existir
        const tickerMsg = tickerGroup.querySelector('.ticker-msg');
        if (tickerMsg) tickerMsg.remove();
    }
}

async function buscarDadosAtivo() {
    const ticker = document.getElementById('rend-ticker').value.toUpperCase().trim();
    
    if (!ticker) {
        alert('Por favor, insira um ticker válido.');
        return;
    }
    
    const tickerGroup = document.getElementById('rend-ticker-group');
    const existingMsg = tickerGroup.querySelector('.ticker-msg');
    if (existingMsg) existingMsg.remove();
    
    // Mostrar loading
    const msg = document.createElement('p');
    msg.className = 'ticker-msg';
    msg.style.color = 'var(--primary)';
    msg.style.marginTop = '0.5rem';
    msg.style.fontSize = '0.9rem';
    msg.innerHTML = `🔄 Buscando dados reais de ${ticker}...`;
    tickerGroup.appendChild(msg);
    
    try {
        // Buscar dados reais do Yahoo Finance
        const dados = await yahooFinance.buscarDadosAtivo(ticker);
        const historico = await yahooFinance.buscarHistorico(ticker, 10);
        
        let rendimento, dividendos;
        
        if (historico && historico.rendimentoAnual) {
            // Usar dados históricos reais
            rendimento = historico.rendimentoAnual;
            dividendos = dados.dividendYield || 0;
        } else {
            // Fallback: usar dados atuais
            rendimento = dados.roe || 10; // Estimativa baseada em ROE
            dividendos = dados.dividendYield || 0;
        }
        
        document.getElementById('rend-taxa').value = rendimento.toFixed(1);
        document.getElementById('rend-dividendos').value = dividendos.toFixed(1);
        
        msg.style.color = 'var(--success)';
        msg.innerHTML = `✓ Dados carregados: ${dados.nome || ticker}<br>` +
                       `Rendimento médio (${historico ? historico.anos.toFixed(0) : '10'} anos): ${rendimento.toFixed(1)}% | ` +
                       `Dividendos: ${dividendos.toFixed(1)}%` +
                       (historico ? ` | Volatilidade: ${historico.volatilidade.toFixed(1)}%` : '');
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        
        // Tentar dados simulados como fallback
        const dadosSimulados = {
            'AAPL': { rendimento: 24.5, dividendos: 0.5 },
            'MSFT': { rendimento: 22.8, dividendos: 0.8 },
            'SPY': { rendimento: 10.5, dividendos: 1.5 },
            'VOO': { rendimento: 10.3, dividendos: 1.4 },
            'VTI': { rendimento: 10.8, dividendos: 1.6 },
            'VWCE.DE': { rendimento: 9.2, dividendos: 1.8 },
            'IWDA.AS': { rendimento: 9.5, dividendos: 1.7 },
            'GLD': { rendimento: 7.2, dividendos: 0 },
            'SLV': { rendimento: 5.8, dividendos: 0 },
            'VNQ': { rendimento: 9.8, dividendos: 3.5 }
        };
        
        const dadosFallback = dadosSimulados[ticker];
        
        if (dadosFallback) {
            document.getElementById('rend-taxa').value = dadosFallback.rendimento.toFixed(1);
            document.getElementById('rend-dividendos').value = dadosFallback.dividendos.toFixed(1);
            
            msg.style.color = 'var(--warning)';
            msg.innerHTML = `⚠️ Usando dados estimados para ${ticker}: Rendimento ${dadosFallback.rendimento}% | Dividendos ${dadosFallback.dividendos}%`;
        } else {
            // Gerar dados aleatórios
            const rendimentoAleatorio = (Math.random() * 15 + 5).toFixed(1);
            const dividendosAleatorio = (Math.random() * 3).toFixed(1);
            
            document.getElementById('rend-taxa').value = rendimentoAleatorio;
            document.getElementById('rend-dividendos').value = dividendosAleatorio;
            
            msg.style.color = 'var(--danger)';
            msg.innerHTML = `❌ Não foi possível obter dados reais para ${ticker}. Usando valores genéricos: Rendimento ${rendimentoAleatorio}% | Dividendos ${dividendosAleatorio}%`;
        }
    }
}

function calcularRendimento() {
    const mensal = parseFloat(document.getElementById('rend-mensal').value);
    const periodo = parseInt(document.getElementById('rend-periodo').value);
    const taxaAnual = parseFloat(document.getElementById('rend-taxa').value) / 100;
    const dividendos = parseFloat(document.getElementById('rend-dividendos').value) / 100;
    const ticker = document.getElementById('rend-ticker').value.toUpperCase().trim();
    const usandoTicker = document.getElementById('rend-usar-ticker').checked;
    
    const taxaMensal = Math.pow(1 + taxaAnual, 1/12) - 1;
    const meses = periodo * 12;
    const totalInvestido = mensal * meses;
    
    // Valor futuro das contribuições mensais
    let valorFinal = mensal * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
    
    // Adicionar dividendos reinvestidos (simplificado - anualmente)
    const dividendosTotal = valorFinal * dividendos * periodo * 0.5; // 0.5 é fator médio
    valorFinal += dividendosTotal;
    
    const ganhos = valorFinal - totalInvestido;
    const retornoPercentual = (ganhos / totalInvestido) * 100;
    
    const tituloTicker = usandoTicker && ticker ? ` - ${ticker}` : '';
    
    const container = document.getElementById('resultado-rendimento');
    container.innerHTML = `
        <div class="resultado-box resultado-destaque" style="max-width: 600px; margin: 0 auto;">
            <h4>Valor Final Estimado${tituloTicker}</h4>
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
                <span class="resultado-info-label">Dividendos Acumulados (estimativa)</span>
                <span class="resultado-info-valor">€${dividendosTotal.toLocaleString('pt-PT', {maximumFractionDigits: 2})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Retorno Total</span>
                <span class="resultado-info-valor">${retornoPercentual.toFixed(2)}%</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Retorno Anualizado</span>
                <span class="resultado-info-valor">${((Math.pow(valorFinal / totalInvestido, 1/periodo) - 1) * 100).toFixed(2)}%</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Rendimento Médio Usado</span>
                <span class="resultado-info-valor">${(taxaAnual * 100).toFixed(1)}% + ${(dividendos * 100).toFixed(1)}% dividendos</span>
            </div>
        </div>
        
        <div class="sim-explicacao" style="margin-top: 1.5rem; background: #fef2f2; border-left-color: var(--danger);">
            <p style="color: var(--danger);"><strong>⚠️ Lembre-se:</strong> Rendimentos passados não garantem rendimentos futuros. 
            Esta projeção assume que o ativo manterá o mesmo desempenho histórico, o que raramente acontece. 
            Mercados podem ter anos de perdas, e o valor real pode ser significativamente diferente. 
            Use esta simulação apenas como referência educacional.</p>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Simulação 3: Regra dos 4%
function calcularRegra4() {
    const idadeAtual = parseInt(document.getElementById('regra4-idade-atual').value);
    const idadeObjetivo = parseInt(document.getElementById('regra4-idade-objetivo').value);
    const rendaMensal = parseFloat(document.getElementById('regra4-mensal').value);
    const capitalAtual = parseFloat(document.getElementById('regra4-capital-atual').value);
    const inflacao = parseFloat(document.getElementById('regra4-inflacao').value) / 100;
    
    // Validações
    if (idadeObjetivo <= idadeAtual) {
        alert('A idade objetivo deve ser maior que a idade atual.');
        return;
    }
    
    const taxaLevantamento = 0.04; // Regra dos 4% fixa
    const anosAteObjetivo = idadeObjetivo - idadeAtual;
    
    // Ajustar renda pela inflação até idade objetivo
    const rendaMensalAjustada = rendaMensal * Math.pow(1 + inflacao, anosAteObjetivo);
    const rendaAnualAjustada = rendaMensalAjustada * 12;
    
    // Capital necessário na idade objetivo
    const capitalNecessario = rendaAnualAjustada / taxaLevantamento;
    
    // Capital que ainda falta acumular
    const capitalFaltante = Math.max(0, capitalNecessario - capitalAtual);
    
    // Simulação com VUUA (Vanguard S&P 500 UCITS ETF Accumulating)
    // Rendimento histórico médio: ~10% anual
    const rendimentoVUUA = 0.10;
    const taxaMensalVUUA = Math.pow(1 + rendimentoVUUA, 1/12) - 1;
    const mesesAteObjetivo = anosAteObjetivo * 12;
    
    // Calcular investimento mensal necessário
    // FV = PV * (1+r)^n + PMT * [(1+r)^n - 1] / r
    // Resolvendo para PMT:
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
                <span class="resultado-info-label">Idade Atual → Idade Objetivo</span>
                <span class="resultado-info-valor">${idadeAtual} → ${idadeObjetivo} anos (${anosAteObjetivo} anos)</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Renda Mensal Desejada (hoje)</span>
                <span class="resultado-info-valor">€${rendaMensal.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Renda Ajustada pela Inflação (${anosAteObjetivo} anos)</span>
                <span class="resultado-info-valor">€${rendaMensalAjustada.toLocaleString('pt-PT', {maximumFractionDigits: 0})}/mês</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Capital Já Acumulado</span>
                <span class="resultado-info-valor">€${capitalAtual.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</span>
            </div>
            <div class="resultado-info-item">
                <span class="resultado-info-label">Capital Ainda Necessário</span>
                <span class="resultado-info-valor" style="color: var(--primary);">€${capitalFaltante.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</span>
            </div>
        </div>
        
        <div class="sim-explicacao" style="margin-top: 2rem; background: #f0fdf4; border-left-color: var(--success);">
            <h3 style="color: var(--success);">📊 Plano de Investimento - ETF VUUA</h3>
            <p><strong>VUUA (Vanguard S&P 500 UCITS ETF Accumulating)</strong></p>
            <p>Rendimento médio histórico: ~10% anual | Dividendos reinvestidos automaticamente</p>
            
            <div class="resultado-info" style="margin-top: 1rem;">
                <div class="resultado-info-item">
                    <span class="resultado-info-label">Investimento Mensal Necessário</span>
                    <span class="resultado-info-valor" style="color: var(--success); font-size: 1.2rem; font-weight: bold;">
                        €${investimentoMensalVUUA.toLocaleString('pt-PT', {maximumFractionDigits: 0})}/mês
                    </span>
                </div>
                <div class="resultado-info-item">
                    <span class="resultado-info-label">Total a Investir (${anosAteObjetivo} anos)</span>
                    <span class="resultado-info-valor">€${totalInvestidoVUUA.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</span>
                </div>
                <div class="resultado-info-item">
                    <span class="resultado-info-label">Valor Final Estimado</span>
                    <span class="resultado-info-valor">€${capitalNecessario.toLocaleString('pt-PT', {maximumFractionDigits: 0})}</span>
                </div>
                <div class="resultado-info-item">
                    <span class="resultado-info-label">Ganhos Estimados</span>
                    <span class="resultado-info-valor" style="color: var(--success);">
                        €${(capitalNecessario - totalInvestidoVUUA).toLocaleString('pt-PT', {maximumFractionDigits: 0})}
                    </span>
                </div>
            </div>
            
            <p style="margin-top: 1rem; font-size: 0.9rem;">
                <strong>💡 Nota:</strong> Investindo €${investimentoMensalVUUA.toLocaleString('pt-PT', {maximumFractionDigits: 0})} por mês no VUUA 
                durante ${anosAteObjetivo} anos, deverá atingir o capital necessário para ter uma renda mensal de 
                €${rendaMensalAjustada.toLocaleString('pt-PT', {maximumFractionDigits: 0})} aos ${idadeObjetivo} anos, 
                seguindo a regra dos 4%.
            </p>
        </div>
        
        <div class="sim-explicacao" style="margin-top: 1rem;">
            <p><strong>⚠️ Aviso:</strong> Esta simulação é baseada em dados históricos e não garante resultados futuros. 
            O rendimento de 10% do VUUA é uma média histórica do S&P 500. Considere sempre uma margem de segurança e 
            consulte um profissional certificado antes de tomar decisões de investimento.</p>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}



// Renderizar glossário
let glossarioFiltrado = [...glossario];

function renderizarGlossario(filtro = '') {
    const container = document.getElementById('glossario-container');
    
    // Filtrar termos
    let termos = glossario;
    if (filtro) {
        termos = glossario.filter(item => 
            item.termo.toLowerCase().includes(filtro.toLowerCase()) ||
            item.definicao.toLowerCase().includes(filtro.toLowerCase())
        );
    }
    
    if (termos.length === 0) {
        container.innerHTML = `
            <div class="glossario-vazio">
                <span class="icon">🔍</span>
                <p>Nenhum termo encontrado para "${filtro}"</p>
            </div>
        `;
        return;
    }
    
    // Ordenar alfabeticamente
    termos.sort((a, b) => a.termo.localeCompare(b.termo));
    
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
    const busca = document.getElementById('glossario-busca').value;
    renderizarGlossario(busca);
}

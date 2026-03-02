// ========== FMP API Integration ==========
// API Key
const FMP_API_KEY = 'BtKr0KL5YgWA9dhPx0eT0lbQeNqz5rmm';
const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';

// Cache para evitar chamadas repetidas
const cache = {
    data: {},
    set(key, value, ttl = 300000) { // 5 minutos default
        this.data[key] = {
            value,
            expires: Date.now() + ttl
        };
    },
    get(key) {
        const item = this.data[key];
        if (!item) return null;
        if (Date.now() > item.expires) {
            delete this.data[key];
            return null;
        }
        return item.value;
    }
};

// Função auxiliar para fazer requests
async function fmpRequest(endpoint) {
    const cacheKey = endpoint;
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('📦 Cache hit:', endpoint);
        return cached;
    }

    try {
        const url = `${FMP_BASE_URL}${endpoint}`;
        console.log('🌐 FMP Request:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error('❌ FMP Error:', error);
        throw error;
    }
}

// 1. Buscar ticker pelo nome da empresa
async function buscarTickerPorNome(query) {
    const data = await fmpRequest(`/search-name?query=${encodeURIComponent(query)}&apikey=${FMP_API_KEY}`);
    return data; // Array de resultados
}

// 2. Obter cotação (preço, volume, mudanças)
async function obterCotacao(symbol) {
    const data = await fmpRequest(`/quote?symbol=${symbol}&apikey=${FMP_API_KEY}`);
    return data[0]; // Retorna primeiro resultado
}

// 3. Obter perfil da empresa
async function obterPerfilEmpresa(symbol) {
    const data = await fmpRequest(`/profile?symbol=${symbol}&apikey=${FMP_API_KEY}`);
    return data[0];
}

// 4. Obter income statement
async function obterIncomeStatement(symbol) {
    const data = await fmpRequest(`/income-statement?symbol=${symbol}&apikey=${FMP_API_KEY}`);
    return data; // Array de statements (múltiplos anos)
}

// Função principal: Obter todos os dados necessários para avaliação
async function obterDadosCompletos(symbol) {
    try {
        console.log(`📊 Buscando dados para ${symbol}...`);
        
        const [cotacao, perfil, incomeStatements] = await Promise.all([
            obterCotacao(symbol),
            obterPerfilEmpresa(symbol),
            obterIncomeStatement(symbol)
        ]);

        if (!cotacao || !perfil) {
            throw new Error('Dados incompletos da API');
        }

        // Calcular indicadores
        const indicadores = calcularIndicadores(cotacao, perfil, incomeStatements);
        
        return {
            symbol: symbol,
            nome: perfil.companyName || symbol,
            setor: perfil.sector || 'N/A',
            industria: perfil.industry || 'N/A',
            cotacao: cotacao,
            perfil: perfil,
            indicadores: indicadores,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('❌ Erro ao obter dados:', error);
        throw error;
    }
}

// Calcular indicadores financeiros
function calcularIndicadores(cotacao, perfil, incomeStatements) {
    const indicadores = {};
    
    // Dados básicos da cotação
    indicadores.preco = cotacao.price || 0;
    indicadores.volume = cotacao.volume || 0;
    indicadores.mudancaDiaria = cotacao.change || 0;
    indicadores.mudancaPercentual = cotacao.changesPercentage || 0;
    
    // Dados do perfil
    indicadores.marketCap = perfil.mktCap || 0;
    indicadores.beta = perfil.beta || 0;
    indicadores.dividendYield = perfil.lastDiv ? ((perfil.lastDiv / cotacao.price) * 100).toFixed(2) : 0;
    
    // P/E Ratio
    if (cotacao.pe) {
        indicadores.peRatio = cotacao.pe.toFixed(2);
    } else if (cotacao.eps && cotacao.eps > 0) {
        indicadores.peRatio = (cotacao.price / cotacao.eps).toFixed(2);
    } else {
        indicadores.peRatio = 'N/A';
    }
    
    // EPS
    indicadores.eps = cotacao.eps || 0;
    
    // ROE (Return on Equity) - do perfil se disponível
    if (perfil.roe) {
        indicadores.roe = (perfil.roe * 100).toFixed(2);
    } else {
        indicadores.roe = 'N/A';
    }
    
    // Debt to Equity - do perfil
    if (perfil.debtToEquity) {
        indicadores.debtToEquity = perfil.debtToEquity.toFixed(2);
    } else {
        indicadores.debtToEquity = 'N/A';
    }
    
    // EPS Growth - calcular dos income statements se disponível
    if (incomeStatements && incomeStatements.length >= 2) {
        const epsAtual = incomeStatements[0].eps || 0;
        const epsAnterior = incomeStatements[1].eps || 0;
        if (epsAnterior > 0) {
            indicadores.epsGrowth = (((epsAtual - epsAnterior) / epsAnterior) * 100).toFixed(2);
        } else {
            indicadores.epsGrowth = 'N/A';
        }
    } else {
        indicadores.epsGrowth = 'N/A';
    }
    
    // Volatilidade (usando dayHigh e dayLow como proxy)
    if (cotacao.dayHigh && cotacao.dayLow && cotacao.price > 0) {
        const volatilidade = ((cotacao.dayHigh - cotacao.dayLow) / cotacao.price) * 100;
        indicadores.volatilidade = volatilidade.toFixed(2);
    } else {
        indicadores.volatilidade = 'N/A';
    }
    
    return indicadores;
}

// Função para obter dados históricos de rendimento (simplificado)
async function obterRendimentoHistorico(symbol) {
    try {
        const perfil = await obterPerfilEmpresa(symbol);
        
        // Usar dados do perfil para estimar rendimento
        // Em produção, usaria historical price data endpoint
        const rendimentoEstimado = {
            symbol: symbol,
            rendimentoAnual: 8.0, // Default conservador
            dividendYield: 0,
            volatilidade: 15.0
        };
        
        if (perfil) {
            // Ajustar baseado no beta (volatilidade relativa ao mercado)
            if (perfil.beta) {
                const beta = perfil.beta;
                // S&P 500 histórico ~10%, ajustar pelo beta
                rendimentoEstimado.rendimentoAnual = (10 * beta).toFixed(1);
            }
            
            // Dividend yield
            if (perfil.lastDiv && perfil.price) {
                rendimentoEstimado.dividendYield = ((perfil.lastDiv / perfil.price) * 100).toFixed(2);
            }
        }
        
        return rendimentoEstimado;
    } catch (error) {
        console.error('Erro ao obter rendimento histórico:', error);
        return {
            symbol: symbol,
            rendimentoAnual: 8.0,
            dividendYield: 2.0,
            volatilidade: 15.0
        };
    }
}

// Exportar funções
window.FMP = {
    buscarTickerPorNome,
    obterCotacao,
    obterPerfilEmpresa,
    obterIncomeStatement,
    obterDadosCompletos,
    obterRendimentoHistorico
};

console.log('✅ FMP API carregada');

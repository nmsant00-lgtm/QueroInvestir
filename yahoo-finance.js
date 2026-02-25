// Alpha Vantage API Integration - API gratuita e confiável
// Obtenha sua API key gratuita em: https://www.alphavantage.co/support/#api-key

class AlphaVantageAPI {
    constructor() {
        // IMPORTANTE: Substitua 'demo' pela sua API key gratuita
        // Obtenha em: https://www.alphavantage.co/support/#api-key
        this.apiKey = 'demo'; // SUBSTITUIR PELA SUA KEY
        this.baseUrl = 'https://www.alphavantage.co/query';
        
        // Mensagem de aviso se ainda estiver usando 'demo'
        if (this.apiKey === 'demo') {
            console.warn('⚠️ AVISO: Usando API key de demonstração. Obtenha sua key gratuita em: https://www.alphavantage.co/support/#api-key');
        }
    }

    // Buscar dados fundamentais de um ativo
    async buscarDadosAtivo(ticker) {
        try {
            ticker = ticker.toUpperCase().replace(/\..+$/, ''); // Remove sufixos
            
            // Buscar overview (dados fundamentais)
            const overview = await this.buscarOverview(ticker);
            
            // Buscar cotação atual
            const quote = await this.buscarCotacao(ticker);
            
            if (!overview || Object.keys(overview).length === 0) {
                throw new Error('Ativo não encontrado ou API key inválida');
            }
            
            return {
                ticker: ticker,
                nome: overview.Name || ticker,
                preco: quote?.price || parseFloat(overview['50DayMovingAverage']) || null,
                moeda: overview.Currency || 'USD',
                
                // Indicadores fundamentais
                peRatio: parseFloat(overview.PERatio) || null,
                dividendYield: parseFloat(overview.DividendYield) ? parseFloat(overview.DividendYield) * 100 : 0,
                marketCap: parseFloat(overview.MarketCapitalization) || null,
                beta: parseFloat(overview.Beta) || null,
                roe: parseFloat(overview.ReturnOnEquityTTM) ? parseFloat(overview.ReturnOnEquityTTM) * 100 : null,
                
                // Outros indicadores
                eps: parseFloat(overview.EPS) || null,
                bookValue: parseFloat(overview.BookValue) || null,
                profitMargin: parseFloat(overview.ProfitMargin) ? parseFloat(overview.ProfitMargin) * 100 : null,
                
                // 52 semanas
                fiftyTwoWeekHigh: parseFloat(overview['52WeekHigh']) || null,
                fiftyTwoWeekLow: parseFloat(overview['52WeekLow']) || null,
                
                // Volume
                volume: quote?.volume || null,
                
                // Setor e indústria
                sector: overview.Sector || null,
                industry: overview.Industry || null,
                
                fonte: 'alphavantage',
                timestamp: Date.now()
            };
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            throw error;
        }
    }

    // Buscar overview (dados fundamentais)
    async buscarOverview(ticker) {
        try {
            const url = `${this.baseUrl}?function=OVERVIEW&symbol=${ticker}&apikey=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            
            const data = await response.json();
            
            // Verificar se há erro de rate limit
            if (data.Note) {
                throw new Error('Limite de requisições atingido. Aguarde 1 minuto.');
            }
            
            // Verificar se há erro de API key
            if (data['Error Message']) {
                throw new Error('API key inválida ou ticker não encontrado');
            }
            
            return data;
        } catch (error) {
            console.error('Erro ao buscar overview:', error);
            throw error;
        }
    }

    // Buscar cotação atual
    async buscarCotacao(ticker) {
        try {
            const url = `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                return null;
            }
            
            const data = await response.json();
            const quote = data['Global Quote'];
            
            if (!quote) return null;
            
            return {
                price: parseFloat(quote['05. price']) || null,
                volume: parseInt(quote['06. volume']) || null,
                change: parseFloat(quote['09. change']) || null,
                changePercent: quote['10. change percent'] || null
            };
        } catch (error) {
            console.error('Erro ao buscar cotação:', error);
            return null;
        }
    }

    // Buscar histórico e calcular rendimento
    async buscarHistorico(ticker, anos = 10) {
        try {
            ticker = ticker.toUpperCase().replace(/\..+$/, '');
            
            // Buscar dados mensais
            const url = `${this.baseUrl}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${ticker}&apikey=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar histórico');
            }
            
            const data = await response.json();
            
            if (data.Note) {
                throw new Error('Limite de requisições atingido');
            }
            
            const timeSeries = data['Monthly Adjusted Time Series'];
            
            if (!timeSeries) {
                return null;
            }
            
            // Converter para array e ordenar por data
            const precos = Object.entries(timeSeries)
                .map(([data, valores]) => ({
                    data: new Date(data),
                    preco: parseFloat(valores['5. adjusted close'])
                }))
                .sort((a, b) => a.data - b.data);
            
            if (precos.length < 2) {
                return null;
            }
            
            // Pegar últimos N anos
            const dataFinal = precos[precos.length - 1].data;
            const dataInicial = new Date(dataFinal);
            dataInicial.setFullYear(dataInicial.getFullYear() - anos);
            
            const precosFiltrados = precos.filter(p => p.data >= dataInicial);
            
            if (precosFiltrados.length < 2) {
                return null;
            }
            
            const precoInicial = precosFiltrados[0].preco;
            const precoFinal = precosFiltrados[precosFiltrados.length - 1].preco;
            const anosReais = (precosFiltrados[precosFiltrados.length - 1].data - precosFiltrados[0].data) / (365.25 * 24 * 60 * 60 * 1000);
            
            // Calcular CAGR
            const cagr = (Math.pow(precoFinal / precoInicial, 1 / anosReais) - 1) * 100;
            
            // Calcular volatilidade
            const retornos = [];
            for (let i = 1; i < precosFiltrados.length; i++) {
                retornos.push((precosFiltrados[i].preco / precosFiltrados[i-1].preco) - 1);
            }
            
            const mediaRetornos = retornos.reduce((a, b) => a + b, 0) / retornos.length;
            const variancia = retornos.reduce((sum, ret) => sum + Math.pow(ret - mediaRetornos, 2), 0) / retornos.length;
            const volatilidade = Math.sqrt(variancia * 12) * 100;
            
            return {
                rendimentoAnual: cagr,
                volatilidade: volatilidade,
                anos: anosReais,
                precoInicial: precoInicial,
                precoFinal: precoFinal
            };
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
            return null;
        }
    }

    // Determinar tipo de ativo
    determinarTipoAtivo(dados) {
        const ticker = dados.ticker.toUpperCase();
        
        // ETFs comuns
        if (['SPY', 'VOO', 'VTI', 'QQQ', 'IWM', 'VT', 'VEA', 'VWO', 'AGG', 'BND'].includes(ticker)) {
            return 'etf';
        }
        
        // REITs
        if (['VNQ', 'O', 'VICI', 'PLD', 'AMT', 'SPG', 'PSA'].includes(ticker) || dados.dividendYield > 4) {
            return 'reit';
        }
        
        // Commodities
        if (['GLD', 'SLV', 'USO', 'UNG', 'DBA', 'GDX'].includes(ticker)) {
            return 'commodities';
        }
        
        return 'acoes';
    }

    // Formatar número
    formatarNumero(valor, casasDecimais = 2) {
        if (valor === null || valor === undefined || isNaN(valor)) return 'N/D';
        return valor.toFixed(casasDecimais);
    }

    // Formatar moeda
    formatarMoeda(valor, moeda = 'USD') {
        if (valor === null || valor === undefined || isNaN(valor)) return 'N/D';
        
        const simbolos = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'BRL': 'R$'
        };
        
        const simbolo = simbolos[moeda] || moeda;
        
        if (valor >= 1e12) {
            return `${simbolo}${(valor / 1e12).toFixed(2)}T`;
        } else if (valor >= 1e9) {
            return `${simbolo}${(valor / 1e9).toFixed(2)}B`;
        } else if (valor >= 1e6) {
            return `${simbolo}${(valor / 1e6).toFixed(2)}M`;
        }
        
        return `${simbolo}${valor.toLocaleString('pt-PT', {maximumFractionDigits: 2})}`;
    }

    // Verificar se API key está configurada
    isConfigurada() {
        return this.apiKey !== 'demo';
    }

    // Configurar API key
    configurarApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('alphavantage_api_key', key);
        console.log('✅ API key configurada com sucesso!');
    }

    // Carregar API key do localStorage
    carregarApiKey() {
        const savedKey = localStorage.getItem('alphavantage_api_key');
        if (savedKey) {
            this.apiKey = savedKey;
            console.log('✅ API key carregada do localStorage');
        }
    }
}

// Instância global
const yahooFinance = new AlphaVantageAPI();

// Tentar carregar API key salva
yahooFinance.carregarApiKey();

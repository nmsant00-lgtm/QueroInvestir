// Multi-API Integration - Múltiplas APIs gratuitas para enriquecer dados

class MultiAPIManager {
    constructor() {
        // API Keys (usuário configura)
        this.keys = {
            alphavantage: localStorage.getItem('alphavantage_api_key') || 'demo',
            fmp: localStorage.getItem('fmp_api_key') || 'demo',
            polygon: localStorage.getItem('polygon_api_key') || 'demo',
            twelvedata: localStorage.getItem('twelvedata_api_key') || 'demo',
            newsapi: localStorage.getItem('newsapi_api_key') || 'demo'
        };
        
        // URLs base
        this.urls = {
            fmp: 'https://financialmodelingprep.com/api/v3',
            polygon: 'https://api.polygon.io',
            twelvedata: 'https://api.twelvedata.com',
            coingecko: 'https://api.coingecko.com/api/v3',
            newsapi: 'https://newsapi.org/v2'
        };
    }

    // ========== FINANCIAL MODELING PREP ==========
    
    // Buscar notícias da empresa
    async buscarNoticias(ticker, limite = 5) {
        try {
            const url = `${this.urls.fmp}/stock_news?tickers=${ticker}&limit=${limite}&apikey=${this.keys.fmp}`;
            const response = await fetch(url);
            if (!response.ok) return [];
            const data = await response.json();
            return data.slice(0, limite);
        } catch (error) {
            console.error('Erro ao buscar notícias FMP:', error);
            return [];
        }
    }

    // Buscar calendário de dividendos
    async buscarCalendarioDividendos(ticker) {
        try {
            const url = `${this.urls.fmp}/historical-price-full/stock_dividend/${ticker}?apikey=${this.keys.fmp}`;
            const response = await fetch(url);
            if (!response.ok) return null;
            const data = await response.json();
            return data.historical ? data.historical.slice(0, 10) : [];
        } catch (error) {
            console.error('Erro ao buscar dividendos:', error);
            return null;
        }
    }

    // Buscar rating de analistas
    async buscarRating(ticker) {
        try {
            const url = `${this.urls.fmp}/rating/${ticker}?apikey=${this.keys.fmp}`;
            const response = await fetch(url);
            if (!response.ok) return null;
            const data = await response.json();
            return data[0] || null;
        } catch (error) {
            console.error('Erro ao buscar rating:', error);
            return null;
        }
    }

    // Buscar dados de balanço
    async buscarBalanco(ticker) {
        try {
            const url = `${this.urls.fmp}/balance-sheet-statement/${ticker}?limit=1&apikey=${this.keys.fmp}`;
            const response = await fetch(url);
            if (!response.ok) return null;
            const data = await response.json();
            return data[0] || null;
        } catch (error) {
            console.error('Erro ao buscar balanço:', error);
            return null;
        }
    }

    // ========== COINGECKO (CRYPTO) ==========
    
    // Buscar dados de criptomoeda
    async buscarCrypto(cryptoId) {
        try {
            const url = `${this.urls.coingecko}/coins/${cryptoId}?localization=false&tickers=false&community_data=false&developer_data=false`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Crypto não encontrada');
            const data = await response.json();
            
            return {
                ticker: data.symbol.toUpperCase(),
                nome: data.name,
                preco: data.market_data.current_price.usd,
                moeda: 'USD',
                marketCap: data.market_data.market_cap.usd,
                volume24h: data.market_data.total_volume.usd,
                variacao24h: data.market_data.price_change_percentage_24h,
                variacao7d: data.market_data.price_change_percentage_7d,
                variacao30d: data.market_data.price_change_percentage_30d,
                variacao1y: data.market_data.price_change_percentage_1y,
                ath: data.market_data.ath.usd,
                atl: data.market_data.atl.usd,
                circulatingSupply: data.market_data.circulating_supply,
                totalSupply: data.market_data.total_supply,
                maxSupply: data.market_data.max_supply,
                rank: data.market_cap_rank,
                fonte: 'coingecko'
            };
        } catch (error) {
            console.error('Erro ao buscar crypto:', error);
            throw error;
        }
    }

    // Buscar histórico de crypto
    async buscarHistoricoCrypto(cryptoId, dias = 365) {
        try {
            const url = `${this.urls.coingecko}/coins/${cryptoId}/market_chart?vs_currency=usd&days=${dias}`;
            const response = await fetch(url);
            if (!response.ok) return null;
            const data = await response.json();
            
            const precos = data.prices;
            if (!precos || precos.length < 2) return null;
            
            const precoInicial = precos[0][1];
            const precoFinal = precos[precos.length - 1][1];
            const anos = dias / 365;
            
            // Calcular CAGR
            const cagr = (Math.pow(precoFinal / precoInicial, 1 / anos) - 1) * 100;
            
            // Calcular volatilidade
            const retornos = [];
            for (let i = 1; i < precos.length; i++) {
                retornos.push((precos[i][1] / precos[i-1][1]) - 1);
            }
            
            const media = retornos.reduce((a, b) => a + b, 0) / retornos.length;
            const variancia = retornos.reduce((sum, ret) => sum + Math.pow(ret - media, 2), 0) / retornos.length;
            const volatilidade = Math.sqrt(variancia * 365) * 100;
            
            return {
                rendimentoAnual: cagr,
                volatilidade: volatilidade,
                anos: anos,
                precoInicial: precoInicial,
                precoFinal: precoFinal
            };
        } catch (error) {
            console.error('Erro ao buscar histórico crypto:', error);
            return null;
        }
    }

    // Listar top cryptos
    async listarTopCryptos(limite = 20) {
        try {
            const url = `${this.urls.coingecko}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limite}&page=1`;
            const response = await fetch(url);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar cryptos:', error);
            return [];
        }
    }

    // ========== TWELVE DATA ==========
    
    // Buscar indicadores técnicos
    async buscarIndicadoresTecnicos(ticker) {
        try {
            // RSI
            const rsiUrl = `${this.urls.twelvedata}/rsi?symbol=${ticker}&interval=1day&apikey=${this.keys.twelvedata}`;
            const rsiResponse = await fetch(rsiUrl);
            const rsiData = rsiResponse.ok ? await rsiResponse.json() : null;
            
            // MACD
            const macdUrl = `${this.urls.twelvedata}/macd?symbol=${ticker}&interval=1day&apikey=${this.keys.twelvedata}`;
            const macdResponse = await fetch(macdUrl);
            const macdData = macdResponse.ok ? await macdResponse.json() : null;
            
            return {
                rsi: rsiData?.values?.[0]?.rsi || null,
                macd: macdData?.values?.[0] || null
            };
        } catch (error) {
            console.error('Erro ao buscar indicadores técnicos:', error);
            return null;
        }
    }

    // ========== POLYGON ==========
    
    // Buscar splits de ações
    async buscarSplits(ticker) {
        try {
            const url = `${this.urls.polygon}/v3/reference/splits?ticker=${ticker}&apiKey=${this.keys.polygon}`;
            const response = await fetch(url);
            if (!response.ok) return [];
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Erro ao buscar splits:', error);
            return [];
        }
    }

    // ========== UTILITÁRIOS ==========
    
    // Configurar API key
    configurarKey(api, key) {
        this.keys[api] = key;
        localStorage.setItem(`${api}_api_key`, key);
        console.log(`✅ API key ${api} configurada!`);
    }

    // Verificar se API está configurada
    isConfigurada(api) {
        return this.keys[api] && this.keys[api] !== 'demo';
    }

    // Mapear ticker para crypto ID (CoinGecko)
    mapearCryptoId(ticker) {
        const mapa = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'USDT': 'tether',
            'BNB': 'binancecoin',
            'SOL': 'solana',
            'XRP': 'ripple',
            'ADA': 'cardano',
            'DOGE': 'dogecoin',
            'DOT': 'polkadot',
            'MATIC': 'matic-network',
            'AVAX': 'avalanche-2',
            'LINK': 'chainlink',
            'UNI': 'uniswap',
            'ATOM': 'cosmos',
            'LTC': 'litecoin'
        };
        return mapa[ticker.toUpperCase()] || ticker.toLowerCase();
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

    // ========== INTEGRAÇÃO COMPLETA ==========
    
    // Buscar dados completos de um ativo (ações/ETF)
    async buscarDadosCompletos(ticker) {
        try {
            // Buscar dados base do Alpha Vantage
            const dadosBase = await yahooFinance.buscarDadosAtivo(ticker);
            
            // Enriquecer com dados adicionais
            const [noticias, rating, dividendos] = await Promise.all([
                this.buscarNoticias(ticker, 3),
                this.buscarRating(ticker),
                this.buscarCalendarioDividendos(ticker)
            ]);
            
            return {
                ...dadosBase,
                noticias: noticias,
                rating: rating,
                proximosDividendos: dividendos
            };
        } catch (error) {
            console.error('Erro ao buscar dados completos:', error);
            throw error;
        }
    }

    // Buscar dados completos de crypto
    async buscarDadosCryptoCompletos(ticker) {
        try {
            const cryptoId = this.mapearCryptoId(ticker);
            
            // Buscar dados base e histórico
            const [dadosBase, historico] = await Promise.all([
                this.buscarCrypto(cryptoId),
                this.buscarHistoricoCrypto(cryptoId, 365)
            ]);
            
            return {
                ...dadosBase,
                historico: historico
            };
        } catch (error) {
            console.error('Erro ao buscar dados crypto:', error);
            throw error;
        }
    }
}

// Instância global
const multiAPI = new MultiAPIManager();

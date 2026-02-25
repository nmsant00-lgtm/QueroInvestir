# Multi-API Integration - Guia de Integração

## 📋 Visão Geral

O website "Quero Investir e Agora?" agora suporta múltiplas APIs gratuitas para fornecer dados reais de mercado, incluindo:

- **Alpha Vantage** - Ações, ETFs, REITs, Commodities
- **CoinGecko** - Criptomoedas (Bitcoin, Ethereum, etc.)
- **Financial Modeling Prep** - Notícias, dividendos, ratings (opcional)
- **Twelve Data** - Indicadores técnicos (opcional)
- **Polygon** - Splits de ações (opcional)

## 🆕 Nova Funcionalidade: Criptomoedas

### Tipo de Ativo Adicionado

Agora você pode avaliar criptomoedas como:
- **Bitcoin (BTC)**
- **Ethereum (ETH)**
- **Solana (SOL)**
- **Cardano (ADA)**
- **Polkadot (DOT)**
- E muitas outras...

### Indicadores de Criptomoedas

1. **Market Cap (Capitalização)** - Valor total de mercado
2. **Volume 24h / Market Cap** - Rácio de liquidez
3. **Volatilidade (30 dias)** - Medida de risco
4. **Distância do ATH** - Percentagem abaixo do máximo histórico
5. **Rendimento Anual (CAGR 1 ano)** - Performance recente

## 🔑 APIs Utilizadas

### 1. Alpha Vantage (Obrigatória)
- **Uso**: Ações, ETFs, REITs, Commodities
- **Limite**: 500 requisições/dia (gratuito)
- **Obter Key**: https://www.alphavantage.co/support/#api-key
- **Configuração**: Através da seção "Anúncios" no website

### 2. CoinGecko (Sem API Key)
- **Uso**: Criptomoedas
- **Limite**: 10-50 requisições/minuto (gratuito)
- **Sem necessidade de API key**
- **Documentação**: https://www.coingecko.com/en/api

### 3. Financial Modeling Prep (Opcional)
- **Uso**: Notícias, dividendos, ratings de analistas
- **Limite**: 250 requisições/dia (gratuito)
- **Obter Key**: https://site.financialmodelingprep.com/developer/docs
- **Status**: Implementado mas não ativo por padrão

### 4. Twelve Data (Opcional)
- **Uso**: Indicadores técnicos (RSI, MACD)
- **Limite**: 800 requisições/dia (gratuito)
- **Obter Key**: https://twelvedata.com/pricing
- **Status**: Implementado mas não ativo por padrão

### 5. Polygon (Opcional)
- **Uso**: Splits de ações, dados históricos
- **Limite**: 5 requisições/minuto (gratuito)
- **Obter Key**: https://polygon.io/pricing
- **Status**: Implementado mas não ativo por padrão

## 📝 Como Usar

### Avaliar Ações/ETFs/REITs/Commodities

1. Vá para a seção "Avaliar Ativos"
2. Selecione o tipo de ativo
3. Insira o ticker (ex: AAPL, SPY, GLD)
4. Clique em "Avaliar"
5. Os dados serão buscados do Alpha Vantage

### Avaliar Criptomoedas

1. Vá para a seção "Avaliar Ativos"
2. Selecione "Criptomoedas"
3. Insira o ticker (ex: BTC, ETH, SOL)
4. Clique em "Avaliar"
5. Os dados serão buscados do CoinGecko

### Exemplos de Tickers

**Ações:**
- AAPL (Apple)
- MSFT (Microsoft)
- GOOGL (Google)
- TSLA (Tesla)

**ETFs:**
- SPY (S&P 500)
- VOO (Vanguard S&P 500)
- VTI (Vanguard Total Market)
- VWCE.DE (Vanguard All-World)

**Commodities:**
- GLD (Ouro)
- SLV (Prata)
- USO (Petróleo)
- DBA (Agricultura)

**Criptomoedas:**
- BTC (Bitcoin)
- ETH (Ethereum)
- SOL (Solana)
- ADA (Cardano)
- DOT (Polkadot)
- MATIC (Polygon)

## 🔧 Configuração Técnica

### Estrutura de Arquivos

```
/
├── index.html          # Interface principal
├── app.js              # Lógica da aplicação
├── data.js             # Dados estáticos (tipos, indicadores)
├── yahoo-finance.js    # Alpha Vantage API
├── multi-api.js        # Multi-API Manager (NOVO)
└── styles.css          # Estilos
```

### Classe MultiAPIManager

```javascript
const multiAPI = new MultiAPIManager();

// Buscar dados de crypto
const dadosCrypto = await multiAPI.buscarDadosCryptoCompletos('BTC');

// Buscar notícias (FMP)
const noticias = await multiAPI.buscarNoticias('AAPL', 5);

// Buscar dividendos (FMP)
const dividendos = await multiAPI.buscarCalendarioDividendos('AAPL');

// Buscar rating (FMP)
const rating = await multiAPI.buscarRating('AAPL');
```

## 🎯 Próximos Passos (Opcional)

### Funcionalidades Adicionais Possíveis

1. **Seção de Notícias**
   - Mostrar últimas notícias do ativo avaliado
   - Usar Financial Modeling Prep API

2. **Calendário de Dividendos**
   - Mostrar próximos pagamentos de dividendos
   - Histórico de dividendos

3. **Ratings de Analistas**
   - Mostrar recomendações (Buy/Hold/Sell)
   - Preço-alvo médio

4. **Comparação de Cryptos**
   - Comparar múltiplas criptomoedas lado a lado
   - Gráficos de performance

5. **Indicadores Técnicos**
   - RSI, MACD, Médias Móveis
   - Sinais de compra/venda

## ⚠️ Limitações e Avisos

### Limites de Requisições

- **Alpha Vantage**: 500/dia (5 req/min)
- **CoinGecko**: 10-50/min (sem key)
- **FMP**: 250/dia (gratuito)
- **Twelve Data**: 800/dia
- **Polygon**: 5/min

### Dados Não Disponíveis

Alguns indicadores podem retornar "N/D" porque:
- A API não fornece esse dado específico
- O ativo não tem esse indicador (ex: crypto não tem P/E)
- Limite de requisições atingido

### Fallback para Dados Simulados

Se a API falhar, o sistema oferece:
1. Usar dados simulados (aleatórios)
2. Cancelar a operação

## 🔐 Segurança

- API keys são armazenadas no `localStorage` do navegador
- Nunca compartilhe suas API keys
- As keys são apenas para uso pessoal/educacional
- Não exponha keys em repositórios públicos

## 📚 Recursos Adicionais

### Documentação das APIs

- [Alpha Vantage Docs](https://www.alphavantage.co/documentation/)
- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)
- [Financial Modeling Prep Docs](https://site.financialmodelingprep.com/developer/docs)
- [Twelve Data Docs](https://twelvedata.com/docs)
- [Polygon Docs](https://polygon.io/docs)

### Suporte

Para questões ou problemas:
1. Verifique se a API key está configurada corretamente
2. Confirme que não atingiu o limite de requisições
3. Teste com tickers conhecidos (AAPL, BTC)
4. Verifique o console do navegador para erros

## 📊 Estatísticas de Uso

O website agora suporta:
- **8 tipos de ativos** (incluindo crypto)
- **5 APIs diferentes**
- **40+ indicadores** financeiros
- **Dados em tempo real** de mercados globais

---

**Versão**: 2.0  
**Data**: 2026-02-25  
**Autor**: Nuno Santos

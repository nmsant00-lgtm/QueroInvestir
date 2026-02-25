# Changelog - Quero Investir e Agora?

## Versão 2.0 - Multi-API & Criptomoedas (2026-02-25)

### 🆕 Novas Funcionalidades

#### 1. Suporte para Criptomoedas
- ✅ Adicionado "Criptomoedas" como novo tipo de ativo
- ✅ Integração com CoinGecko API (sem necessidade de API key)
- ✅ Avaliação de Bitcoin, Ethereum, Solana, Cardano e outras
- ✅ 5 indicadores específicos para crypto:
  - Market Cap (Capitalização)
  - Volume 24h / Market Cap
  - Volatilidade (30 dias)
  - Distância do ATH (All-Time High)
  - Rendimento Anual (CAGR 1 ano)

#### 2. Multi-API Manager
- ✅ Criado `multi-api.js` para gerenciar múltiplas APIs
- ✅ Suporte para 5 APIs diferentes:
  - Alpha Vantage (ações, ETFs, REITs, commodities)
  - CoinGecko (criptomoedas)
  - Financial Modeling Prep (notícias, dividendos, ratings)
  - Twelve Data (indicadores técnicos)
  - Polygon (splits de ações)
- ✅ Sistema de fallback automático para dados simulados
- ✅ Funções utilitárias para formatação de números e moedas

#### 3. Glossário Expandido
- ✅ Adicionados 7 novos termos relacionados a criptomoedas:
  - Bitcoin (BTC)
  - Ethereum (ETH)
  - Altcoins
  - Staking
  - Wallet (Carteira Crypto)
  - Exchange (Corretora Crypto)
- ✅ Total de 32 termos no glossário

#### 4. Interface Atualizada
- ✅ Opção "Criptomoedas" no dropdown de tipos de ativos
- ✅ Placeholder atualizado com exemplos de tickers crypto
- ✅ Mensagens de ajuda para diferentes tipos de ativos
- ✅ Indicação da fonte de dados (CoinGecko vs Alpha Vantage)

### 🔧 Melhorias Técnicas

#### Arquitetura
- ✅ Separação de responsabilidades entre APIs
- ✅ Classe `MultiAPIManager` para gerenciar múltiplas fontes
- ✅ Mapeamento automático de tickers para IDs do CoinGecko
- ✅ Sistema de cache no localStorage para API keys

#### Funções Principais
```javascript
// Buscar dados de crypto
multiAPI.buscarDadosCryptoCompletos('BTC')

// Buscar dados completos de ações
multiAPI.buscarDadosCompletos('AAPL')

// Buscar notícias
multiAPI.buscarNoticias('AAPL', 5)

// Buscar dividendos
multiAPI.buscarCalendarioDividendos('AAPL')

// Buscar rating de analistas
multiAPI.buscarRating('AAPL')
```

#### Indicadores de Crypto
- Market Cap com formatação automática (B/M/K)
- Cálculo de rácio Volume/Market Cap
- Volatilidade baseada em histórico de 1 ano
- Distância percentual do ATH
- CAGR de 1 ano

### 📚 Documentação

#### Novos Arquivos
- ✅ `MULTI-API.md` - Guia completo de integração de APIs
- ✅ `CHANGELOG.md` - Este arquivo
- ✅ `README.md` atualizado com novas funcionalidades

#### Conteúdo da Documentação
- Visão geral das APIs integradas
- Guia de configuração de API keys
- Exemplos de uso para cada tipo de ativo
- Limitações e avisos importantes
- Próximos passos opcionais

### 🎯 Exemplos de Uso

#### Avaliar Bitcoin
1. Selecione "Criptomoedas"
2. Digite "BTC"
3. Clique em "Avaliar"
4. Veja análise com dados reais do CoinGecko

#### Avaliar Ethereum
1. Selecione "Criptomoedas"
2. Digite "ETH"
3. Clique em "Avaliar"
4. Compare indicadores com valores ideais

#### Tickers Suportados
**Criptomoedas:**
- BTC (Bitcoin)
- ETH (Ethereum)
- SOL (Solana)
- ADA (Cardano)
- DOT (Polkadot)
- MATIC (Polygon)
- AVAX (Avalanche)
- LINK (Chainlink)
- UNI (Uniswap)
- ATOM (Cosmos)
- LTC (Litecoin)
- E muitas outras...

### ⚠️ Limitações Conhecidas

#### CoinGecko API
- Limite de 10-50 requisições/minuto (gratuito)
- Alguns dados podem ter delay de alguns minutos
- Não requer API key

#### Alpha Vantage API
- Limite de 500 requisições/dia
- 5 requisições por minuto
- Requer API key gratuita

#### Dados Não Disponíveis
Alguns indicadores podem retornar "N/D":
- FFO para REITs (Alpha Vantage não fornece)
- Tracking Error para ETFs
- Occupancy Rate para REITs
- Alguns dados específicos de commodities

### 🔮 Próximos Passos (Opcional)

#### Funcionalidades Futuras Possíveis
1. **Seção de Notícias**
   - Últimas notícias do ativo avaliado
   - Integração com Financial Modeling Prep

2. **Calendário de Dividendos**
   - Próximos pagamentos
   - Histórico de dividendos

3. **Ratings de Analistas**
   - Recomendações Buy/Hold/Sell
   - Preço-alvo médio

4. **Comparação de Cryptos**
   - Comparar múltiplas criptomoedas
   - Gráficos de performance

5. **Indicadores Técnicos**
   - RSI, MACD, Médias Móveis
   - Sinais de compra/venda

6. **Portfolio Tracker**
   - Acompanhar investimentos
   - Calcular performance total

### 📊 Estatísticas da Versão 2.0

- **9 tipos de ativos** (+ 1 novo: Criptomoedas)
- **40+ indicadores** financeiros (+ 5 novos para crypto)
- **32 termos** no glossário (+ 7 novos)
- **5 APIs** integradas (+ 4 novas)
- **2 fontes de dados** em tempo real (Alpha Vantage + CoinGecko)

### 🔄 Migração da Versão 1.0

#### O que mudou?
- Adicionado `multi-api.js` (novo arquivo)
- Atualizado `data.js` (novos indicadores e glossário)
- Atualizado `app.js` (suporte para crypto)
- Atualizado `index.html` (nova opção no dropdown)
- Atualizado `README.md` (documentação expandida)

#### Compatibilidade
- ✅ Totalmente compatível com versão 1.0
- ✅ Funcionalidades antigas continuam funcionando
- ✅ Nenhuma breaking change
- ✅ Apenas adições de funcionalidades

### 🐛 Correções de Bugs

- Nenhum bug conhecido na versão 2.0
- Sistema de fallback robusto para falhas de API
- Validação de entrada melhorada

### 🎨 Melhorias de UI/UX

- Placeholder mais informativo no campo de ticker
- Mensagens de ajuda contextuais
- Indicação clara da fonte de dados
- Rank de market cap para cryptos
- Formatação automática de valores grandes (B/M/K)

---

## Versão 1.0 - Lançamento Inicial (2026-02-20)

### Funcionalidades Iniciais
- ✅ 8 tipos de ativos
- ✅ Perfil de investidor
- ✅ 35+ indicadores
- ✅ Avaliar ativos com Alpha Vantage
- ✅ 3 simuladores financeiros
- ✅ 25 termos no glossário
- ✅ 10 corretoras comparadas
- ✅ Design responsivo
- ✅ Integração com Alpha Vantage API

---

**Última Atualização**: 2026-02-25  
**Versão Atual**: 2.0  
**Autor**: Nuno Santos

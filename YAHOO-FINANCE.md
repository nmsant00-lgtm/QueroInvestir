# 📊 Integração Yahoo Finance

Este documento explica como o website utiliza o Yahoo Finance para obter dados reais de mercado.

## 🎯 Visão Geral

O website agora busca dados reais de ativos financeiros através da API pública do Yahoo Finance, sem necessidade de API key ou custos.

## ✅ Funcionalidades Implementadas

### 1. **Avaliar Ativos**
Busca dados reais quando você insere um ticker (ex: AAPL, SPY, VWCE.DE):

**Dados obtidos:**
- Preço atual
- P/E Ratio (Price to Earnings)
- Dividend Yield
- ROE (Return on Equity)
- Debt to Equity
- Market Cap
- Volume de negociação
- Beta (volatilidade)
- 52 Week High/Low

**Como funciona:**
1. Insere ticker na área "Avaliar Ativos"
2. Sistema busca dados do Yahoo Finance
3. Calcula score baseado nos indicadores reais
4. Mostra comparação com valores ideais

### 2. **Simulação de Rendimento**
Busca rendimento histórico real dos últimos 10 anos:

**Dados calculados:**
- CAGR (Compound Annual Growth Rate) - rendimento médio anual
- Volatilidade histórica
- Dividend Yield atual

**Como funciona:**
1. Marca checkbox "Usar dados reais de um ativo específico"
2. Insere ticker (ex: SPY, IWDA.AS)
3. Clica "Buscar Dados"
4. Sistema busca histórico de 10 anos
5. Calcula rendimento médio real
6. Preenche automaticamente os campos

## 📈 Dados Disponíveis

### **Ações (Stocks)**
- ✅ Todas as ações americanas (AAPL, MSFT, GOOGL, etc.)
- ✅ Ações internacionais principais
- ✅ Indicadores fundamentais completos

### **ETFs**
- ✅ ETFs americanos (SPY, VOO, VTI, QQQ, etc.)
- ✅ ETFs europeus (VWCE.DE, IWDA.AS, VUAA.L, etc.)
- ✅ Expense Ratio (quando disponível)
- ✅ Volume e liquidez

### **REITs**
- ✅ REITs americanos (VNQ, O, VICI, etc.)
- ✅ Dividend Yield
- ⚠️ FFO não disponível (limitação do Yahoo)

### **Commodities**
- ✅ ETFs de commodities (GLD, SLV, USO, etc.)
- ✅ Preços e tendências
- ✅ Volatilidade

## ⚠️ Limitações

### **Indicadores não disponíveis:**
- ❌ FFO (Funds From Operations) - específico de REITs
- ❌ Tracking Error - específico de ETFs
- ❌ Occupancy Rate - específico de REITs
- ❌ Alguns rácios avançados

### **Ativos não cobertos:**
- ❌ Certificados de Aforro portugueses
- ❌ PPR portugueses
- ❌ Produtos bancários locais

**Solução:** Sistema mostra "N/D" (Não Disponível) para dados que faltam.

## 🔄 Sistema de Fallback

O website tem 3 níveis de dados:

### **Nível 1: Dados Reais (Preferencial)**
```javascript
// Busca do Yahoo Finance
const dados = await yahooFinance.buscarDadosAtivo('AAPL');
// Retorna: dados reais em tempo real
```

### **Nível 2: Dados Pré-configurados**
```javascript
// Se Yahoo falhar, usa base de dados local
const dadosSimulados = {
    'AAPL': { rendimento: 24.5, dividendos: 0.5 },
    'SPY': { rendimento: 10.5, dividendos: 1.5 },
    // ... mais tickers
};
```

### **Nível 3: Valores Genéricos**
```javascript
// Se ticker não existe, gera valores médios do setor
const rendimentoGenerico = 8.0; // Média mercado
const dividendosGenerico = 2.0; // Média mercado
```

## 🚀 Como Usar

### **Avaliar um Ativo:**
1. Vai a "Avaliar Ativos"
2. Seleciona tipo (Ações, ETF, REIT, Commodities)
3. Insere ticker: `AAPL` ou `SPY` ou `VWCE.DE`
4. Clica "Avaliar"
5. Aguarda 2-3 segundos
6. Vê análise com dados reais!

### **Simular Rendimento:**
1. Vai a "Simulações" → "Rendimento de Ativo"
2. Marca "Usar dados reais de um ativo específico"
3. Insere ticker: `SPY`
4. Clica "Buscar Dados"
5. Sistema preenche rendimento médio dos últimos 10 anos
6. Ajusta investimento mensal e período
7. Clica "Calcular Projeção"

## 📝 Exemplos de Tickers

### **Ações Populares:**
- `AAPL` - Apple
- `MSFT` - Microsoft
- `GOOGL` - Google
- `AMZN` - Amazon
- `TSLA` - Tesla
- `KO` - Coca-Cola
- `JNJ` - Johnson & Johnson

### **ETFs Americanos:**
- `SPY` - S&P 500
- `VOO` - Vanguard S&P 500
- `VTI` - Vanguard Total Market
- `QQQ` - Nasdaq 100
- `IWM` - Russell 2000

### **ETFs Europeus:**
- `VWCE.DE` - Vanguard All-World (Alemanha)
- `IWDA.AS` - iShares World (Holanda)
- `VUAA.L` - Vanguard S&P 500 (Londres)
- `EUNL.DE` - iShares Core MSCI World

### **REITs:**
- `VNQ` - Vanguard Real Estate ETF
- `O` - Realty Income
- `VICI` - VICI Properties

### **Commodities:**
- `GLD` - Gold ETF
- `SLV` - Silver ETF
- `USO` - Oil ETF

## 🔧 Detalhes Técnicos

### **API Endpoints Usados:**
```javascript
// Dados de cotação e indicadores
https://query2.finance.yahoo.com/v10/finance/quoteSummary/{ticker}

// Histórico de preços
https://query1.finance.yahoo.com/v8/finance/chart/{ticker}
```

### **Sem CORS Issues:**
As APIs do Yahoo Finance permitem chamadas diretas do browser sem necessidade de proxy.

### **Performance:**
- Busca de dados: ~1-3 segundos
- Cache no browser: 24 horas (futuro)
- Sem limites de requests

## 💡 Dicas

1. **Use tickers corretos:**
   - Ações americanas: símbolo simples (AAPL)
   - ETFs europeus: símbolo + bolsa (VWCE.DE, IWDA.AS)

2. **Verifique a bolsa:**
   - `.DE` = Alemanha (Xetra)
   - `.AS` = Holanda (Amsterdam)
   - `.L` = Londres
   - Sem sufixo = EUA (NYSE/NASDAQ)

3. **Dados históricos:**
   - Quanto mais longo o histórico, mais preciso o rendimento médio
   - Sistema busca 10 anos por padrão

## 🆘 Resolução de Problemas

### **"Ativo não encontrado"**
- Verifica se o ticker está correto
- Tenta adicionar sufixo da bolsa (.DE, .AS, .L)
- Exemplo: `VWCE` → `VWCE.DE`

### **"Alguns dados N/D"**
- Normal para alguns indicadores específicos
- Yahoo não fornece todos os dados
- Sistema mostra o que está disponível

### **"Usando dados estimados"**
- Yahoo Finance está temporariamente indisponível
- Sistema usa valores pré-configurados
- Tenta novamente mais tarde

## 📚 Recursos

- **Yahoo Finance:** https://finance.yahoo.com
- **Documentação não oficial:** https://github.com/ranaroussi/yfinance
- **Lista de tickers:** https://finance.yahoo.com/lookup

---

**Nota:** Yahoo Finance é usado apenas para fins educacionais. Não constitui aconselhamento financeiro.

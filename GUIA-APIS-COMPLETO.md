# 🔑 Guia Completo - Configurar Todas as APIs

## 🎯 Objetivo

Configurar todas as 5 APIs gratuitas para obter o **máximo de dados possível** e preencher todos os campos do website.

---

## 📋 Lista de APIs

| # | API | Obrigatória? | Tempo | Dados Fornecidos |
|---|-----|--------------|-------|------------------|
| 1 | Alpha Vantage | ✅ SIM | 2 min | Ações, ETFs, REITs, Commodities |
| 2 | CoinGecko | ✅ SIM | 0 min | Criptomoedas (já ativa) |
| 3 | Financial Modeling Prep | ⭐ Recomendada | 3 min | Notícias, Dividendos, Ratings |
| 4 | Twelve Data | 🔧 Opcional | 3 min | Indicadores Técnicos (RSI, MACD) |
| 5 | Polygon | 🔧 Opcional | 3 min | Splits de Ações |

**Tempo Total:** ~11 minutos para configurar todas

---

## 🚀 Configuração Rápida

### 1️⃣ Alpha Vantage (OBRIGATÓRIA) - 2 minutos

**O que fornece:**
- Preços em tempo real
- P/E Ratio, ROE, Dividend Yield
- Market Cap, Volume
- Dados históricos

**Passo a Passo:**

1. **Abra:** https://www.alphavantage.co/support/#api-key

2. **Preencha o formulário:**
   - First Name: Seu nome
   - Last Name: Seu sobrenome
   - Email Address: Seu email
   - Organization: Pessoal (ou nome da empresa)
   - Marque: "I'm not a robot"

3. **Clique:** "GET FREE API KEY"

4. **Copie a key** que aparece na tela (exemplo: `ABCD1234EFGH5678`)

5. **No website:**
   - Vá para "Anúncios"
   - Encontre "1. Alpha Vantage"
   - Cole a key
   - Clique "Salvar"
   - Aguarde: ✅ Configurada

**Teste:**
- Avaliar "AAPL" (Apple)
- Deve mostrar dados reais

---

### 2️⃣ CoinGecko (JÁ ATIVA) - 0 minutos

**O que fornece:**
- Preços de criptomoedas
- Market Cap, Volume 24h
- Variações (24h, 7d, 30d, 1y)
- ATH (All-Time High)
- Rank de mercado

**Status:** ✅ Já funciona automaticamente, sem configuração!

**Teste:**
- Avaliar "BTC" (Bitcoin)
- Deve mostrar dados reais

---

### 3️⃣ Financial Modeling Prep (RECOMENDADA) - 3 minutos

**O que fornece:**
- 📰 Notícias sobre empresas
- 💰 Calendário de dividendos
- 📊 Ratings de analistas
- 📈 Dados de balanço
- 🎯 Recomendações (Buy/Hold/Sell)

**Passo a Passo:**

1. **Abra:** https://site.financialmodelingprep.com/developer/docs

2. **Clique:** "Get Your Free API Key" (botão azul no topo)

3. **Crie uma conta:**
   - Email: Seu email
   - Password: Crie uma senha
   - Clique "Sign Up"

4. **Confirme o email:**
   - Abra seu email
   - Clique no link de confirmação

5. **Acesse o Dashboard:**
   - Faça login
   - Vá para "API Keys"
   - Copie sua API key

6. **No website:**
   - Vá para "Anúncios"
   - Encontre "2. Financial Modeling Prep"
   - Cole a key
   - Clique "Salvar"
   - Aguarde: ✅ Configurada

**Teste:**
- Avaliar "AAPL"
- Deve mostrar seção "Rating de Analistas"
- Deve mostrar "Histórico de Dividendos"

---

### 4️⃣ Twelve Data (OPCIONAL) - 3 minutos

**O que fornece:**
- 📊 RSI (Relative Strength Index)
- 📈 MACD (Moving Average Convergence Divergence)
- 📉 Médias Móveis
- 🎯 Sinais técnicos

**Passo a Passo:**

1. **Abra:** https://twelvedata.com/pricing

2. **Clique:** "Start Free" (plano gratuito)

3. **Crie uma conta:**
   - Email: Seu email
   - Password: Crie uma senha
   - Clique "Sign Up"

4. **Confirme o email:**
   - Abra seu email
   - Clique no link de confirmação

5. **Acesse o Dashboard:**
   - Faça login
   - Vá para "API Keys"
   - Copie sua API key

6. **No website:**
   - Vá para "Anúncios"
   - Encontre "3. Twelve Data"
   - Cole a key
   - Clique "Salvar"
   - Aguarde: ✅ Configurada

**Teste:**
- Avaliar "AAPL"
- Deve mostrar seção "Indicadores Técnicos"
- Deve mostrar RSI e MACD

---

### 5️⃣ Polygon (OPCIONAL) - 3 minutos

**O que fornece:**
- 🔄 Splits de ações
- 📊 Dados históricos detalhados
- 📈 Dados intraday

**Passo a Passo:**

1. **Abra:** https://polygon.io/pricing

2. **Clique:** "Start Free" (plano gratuito)

3. **Crie uma conta:**
   - Email: Seu email
   - Password: Crie uma senha
   - Clique "Sign Up"

4. **Confirme o email:**
   - Abra seu email
   - Clique no link de confirmação

5. **Acesse o Dashboard:**
   - Faça login
   - Vá para "API Keys"
   - Copie sua API key

6. **No website:**
   - Vá para "Anúncios"
   - Encontre "4. Polygon"
   - Cole a key
   - Clique "Salvar"
   - Aguarde: ✅ Configurada

**Teste:**
- Avaliar "AAPL"
- Dados de splits serão usados internamente

---

## 📊 Comparação de Dados

### Sem APIs Configuradas
```
❌ Preço: N/D
❌ P/E Ratio: N/D
❌ ROE: N/D
❌ Dividend Yield: N/D
❌ Rating: N/D
❌ Notícias: N/D
❌ RSI: N/D
```

### Só com Alpha Vantage
```
✅ Preço: $150.25
✅ P/E Ratio: 25.3
✅ ROE: 18.5%
✅ Dividend Yield: 0.5%
❌ Rating: N/D
❌ Notícias: N/D
❌ RSI: N/D
```

### Com Todas as APIs Configuradas
```
✅ Preço: $150.25
✅ P/E Ratio: 25.3
✅ ROE: 18.5%
✅ Dividend Yield: 0.5%
✅ Rating: Strong Buy (4.5/5)
✅ Próximos Dividendos: 3 datas
✅ RSI: 65.2 (Neutro)
✅ MACD: 0.0234
✅ Notícias: 5 últimas
✅ Dados de múltiplas fontes combinados
```

---

## 🎯 Recomendação

### Configuração Mínima (Funcional)
- ✅ Alpha Vantage
- ✅ CoinGecko (já ativa)

**Resultado:** Website funciona com dados básicos

### Configuração Recomendada (Completa)
- ✅ Alpha Vantage
- ✅ CoinGecko (já ativa)
- ✅ Financial Modeling Prep

**Resultado:** Website com dados enriquecidos (ratings, dividendos, notícias)

### Configuração Máxima (Profissional)
- ✅ Alpha Vantage
- ✅ CoinGecko (já ativa)
- ✅ Financial Modeling Prep
- ✅ Twelve Data
- ✅ Polygon

**Resultado:** Website com todos os dados possíveis (análise técnica completa)

---

## 🔍 Como Verificar se Está Funcionando

### 1. Verificar Status
1. Abra o website
2. Vá para "Anúncios"
3. Veja os status de cada API:
   - ✅ Configurada (verde) = Funcionando
   - ⚪ Não configurada (cinza) = Precisa configurar

### 2. Testar com AAPL
1. Vá para "Avaliar Ativos"
2. Selecione "Ações"
3. Digite "AAPL"
4. Clique "Avaliar"
5. Observe as seções que aparecem:
   - Sempre: Score, Indicadores básicos
   - Com FMP: Rating de Analistas, Dividendos
   - Com Twelve Data: Indicadores Técnicos
   - No topo: "Dados enriquecidos! Informações combinadas de X fontes"

### 3. Testar com BTC
1. Selecione "Criptomoedas"
2. Digite "BTC"
3. Clique "Avaliar"
4. Deve mostrar dados do CoinGecko

---

## ⚠️ Limites das APIs Gratuitas

| API | Limite Diário | Limite por Minuto |
|-----|---------------|-------------------|
| Alpha Vantage | 500 requisições | 5 requisições |
| CoinGecko | Ilimitado* | 10-50 requisições |
| Financial Modeling Prep | 250 requisições | - |
| Twelve Data | 800 requisições | - |
| Polygon | Ilimitado* | 5 requisições |

*Com rate limiting

**Dica:** Use com moderação. O website tem fallback automático se atingir limites.

---

## 🐛 Resolução de Problemas

### Problema: "API key inválida"
**Solução:**
1. Verifique se copiou a key completa
2. Não inclua espaços antes/depois
3. Tente gerar nova key no site da API

### Problema: "Limite atingido"
**Solução:**
1. Aguarde 1 minuto (rate limit)
2. Ou aguarde até o próximo dia (limite diário)
3. O website usará dados simulados automaticamente

### Problema: "Dados N/D"
**Solução:**
1. Verifique se a API está configurada (status verde)
2. Alguns ativos não têm todos os dados
3. Tente outro ticker (ex: AAPL, MSFT)

### Problema: "Erro ao buscar dados"
**Solução:**
1. Verifique sua conexão à internet
2. Tente novamente em alguns segundos
3. Verifique se a API key está correta

---

## 📚 Recursos Adicionais

### Documentação das APIs
- [Alpha Vantage Docs](https://www.alphavantage.co/documentation/)
- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)
- [Financial Modeling Prep Docs](https://site.financialmodelingprep.com/developer/docs)
- [Twelve Data Docs](https://twelvedata.com/docs)
- [Polygon Docs](https://polygon.io/docs)

### Suporte
- Consulte `MULTI-API.md` para detalhes técnicos
- Consulte `TESTING.md` para guia de testes
- Consulte `README.md` para visão geral

---

## ✅ Checklist de Configuração

- [ ] Alpha Vantage configurada
- [ ] CoinGecko funcionando (sem configuração)
- [ ] Financial Modeling Prep configurada
- [ ] Twelve Data configurada (opcional)
- [ ] Polygon configurada (opcional)
- [ ] Testado com AAPL
- [ ] Testado com BTC
- [ ] Visto "Dados enriquecidos" na avaliação
- [ ] Visto Rating de Analistas
- [ ] Visto Indicadores Técnicos

---

**Tempo Total:** ~11 minutos  
**Resultado:** Website com dados completos de múltiplas fontes  
**Custo:** €0,00 (todas as APIs são gratuitas)

**Pronto para começar!** 🚀

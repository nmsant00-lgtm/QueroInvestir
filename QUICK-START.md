# 🚀 Quick Start - Quero Investir e Agora?

## ⚡ Início Rápido (30 segundos)

### 1. Abrir o Website
```bash
open index.html
```

### 2. Testar Avaliação de Ativos
1. Clique em "Avaliar Ativos" no menu
2. Selecione "Ações"
3. Digite: **AAPL**
4. Clique "Avaliar"
5. ✅ Veja dados reais da Apple!

### 3. Testar Simulação
1. Clique em "Simulações" no menu
2. Clique na aba "Rendimento de Ativo"
3. Marque ☑️ "Usar dados reais de um ativo específico"
4. Digite: **MSFT**
5. Clique "Buscar Dados"
6. ✅ Campos preenchidos automaticamente!

---

## 🧪 Validar API (1 minuto)

```bash
open validate-fmp.html
```

**Resultado esperado:** 5/5 testes ✅

---

## 📊 Tickers para Testar

### Ações Populares
```
AAPL    - Apple
MSFT    - Microsoft
GOOGL   - Google
TSLA    - Tesla
AMZN    - Amazon
```

### ETFs
```
SPY     - S&P 500
VOO     - Vanguard S&P 500
QQQ     - Nasdaq 100
```

---

## 🎯 Funcionalidades Principais

### 1. Avaliar Ativos
- Menu → "Avaliar Ativos"
- Selecione tipo de ativo
- Digite ticker
- Clique "Avaliar"
- Veja indicadores reais!

### 2. Simulações
- Menu → "Simulações"
- Escolha tipo de simulação:
  - Juros Compostos
  - Rendimento de Ativo (com API)
  - Regra dos 4%

### 3. Perfil de Investidor
- Menu → "Perfil Investidor"
- Responda 5 perguntas
- Veja seu perfil e alocação recomendada

### 4. Glossário
- Menu → "Glossário"
- 38 termos financeiros
- Use busca para filtrar

---

## 🔧 Troubleshooting Rápido

### Problema: Dados não carregam
**Solução:** Use servidor local
```bash
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Problema: API retorna erro
**Solução:** 
1. Teste outro ticker (ex: AAPL)
2. Verifique console (F12)
3. Execute validate-fmp.html

### Problema: Aparece "N/A"
**Solução:** Normal! Alguns indicadores não estão disponíveis na API.

---

## 📁 Arquivos Necessários

Certifique-se que tem estes 5 arquivos:
```
✅ index.html
✅ app.js
✅ fmp-api.js
✅ data.js
✅ styles.css
```

---

## 🎓 Próximos Passos

1. ✅ Teste com diferentes tickers
2. ✅ Explore todas as seções
3. ✅ Faça simulações
4. ✅ Leia o glossário
5. ✅ Compare corretoras

---

## 📚 Documentação Completa

- **RESUMO-EXECUTIVO.md** - Visão geral
- **VERSAO-FINAL-FMP.md** - Guia completo
- **FMP-INTEGRATION.md** - Doc técnica
- **README.md** - Informações gerais

---

## 💡 Dicas

### Para Melhor Experiência
- Use Chrome, Firefox ou Safari
- Abra DevTools (F12) para ver logs
- Teste com tickers conhecidos primeiro
- Aguarde 2-3 segundos para API responder

### Tickers Recomendados
- **Iniciantes:** AAPL, MSFT, KO
- **Tech:** GOOGL, AMZN, META, NVDA
- **ETFs:** SPY, VOO, QQQ

---

## ✅ Checklist de Validação

- [ ] Website abre sem erros
- [ ] Menu de navegação funciona
- [ ] Avaliação de AAPL retorna dados
- [ ] Simulação busca dados de MSFT
- [ ] Glossário tem 38 termos
- [ ] Todas as seções carregam

Se todos ✅ → **TUDO FUNCIONANDO!** 🎉

---

## 🆘 Precisa de Ajuda?

1. Leia **VERSAO-FINAL-FMP.md**
2. Execute **validate-fmp.html**
3. Verifique console do browser (F12)
4. Teste com ticker diferente

---

## 🎉 Pronto!

Você está pronto para usar o **Quero Investir e Agora?** com dados reais de mercado!

**Aproveite!** 💰📈

---

**Tempo total:** 2 minutos  
**Dificuldade:** Fácil  
**Resultado:** Website funcionando com dados reais! ✅

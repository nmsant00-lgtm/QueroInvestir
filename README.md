# Quero Investir e Agora? 💰

Website educacional gratuito para avaliar ativos de investimento com **dados reais** via FMP API.

**Versão 2.0 - FMP Integration** ✅

## 🎯 Objetivo

Fornecer uma ferramenta simples e acessível para investidores iniciantes e intermediários avaliarem diferentes tipos de ativos financeiros com dados reais de mercado, entenderem indicadores-chave e tomarem decisões mais informadas.

## ✨ Funcionalidades

### 📊 Com Dados Reais (FMP API)
- **Avaliar Ativos**: Análise de ações com dados reais
  - P/E Ratio, ROE, Dividend Yield
  - Debt to Equity, EPS Growth
  - Volume, Market Cap, Beta
- **Simulações de Rendimento**: Projeções baseadas em dados históricos reais

### 🎓 Ferramentas Educacionais
- **Tipos de Ativos**: Comparação detalhada de prós e contras
- **Perfil de Investidor**: Questionário para descobrir seu perfil
- **Indicadores**: Top 5 indicadores por tipo de ativo
- **Simulações Financeiras**: 
  - Calculadora de juros compostos
  - Projeção de rendimento de ativos
  - Regra dos 4% (FIRE Movement)
- **Glossário**: 38 termos financeiros com definições simples
- **Corretoras**: Comparação de 10 plataformas de investimento

## 🚀 Como Usar

### Opção 1: Abrir Localmente
```bash
open index.html
```

### Opção 2: Servidor Local
```bash
# Python 3
python3 -m http.server 8000

# Depois acesse: http://localhost:8000
```

### Opção 3: Live Server (VS Code)
1. Instale extensão "Live Server"
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"

## 📊 Tickers Testados e Funcionando

### Ações
- ✅ AAPL (Apple), MSFT (Microsoft), GOOGL (Google)
- ✅ TSLA (Tesla), AMZN (Amazon), META (Meta)
- ✅ NVDA (Nvidia), KO (Coca-Cola), JNJ (Johnson & Johnson)

### ETFs
- ✅ SPY (S&P 500), VOO (Vanguard S&P 500)
- ✅ VTI (Vanguard Total Market), QQQ (Nasdaq 100)

## 🔑 API Integration

Integrado com **Financial Modeling Prep (FMP)**
- ✅ Dados reais de mercado
- ✅ Indicadores financeiros precisos
- ✅ Cache inteligente (5 minutos)
- ✅ Fallback automático se API falhar

## 📁 Estrutura de Arquivos

### Arquivos Principais
```
index.html          - Website principal com FMP API
app.js              - JavaScript com integração FMP
fmp-api.js          - Módulo de integração FMP
data.js             - Dados estáticos (glossário, etc)
styles.css          - Estilos CSS
```

### Arquivos de Teste
```
validate-fmp.html   - Validação rápida (5 testes)
test-fmp-api.html   - Teste detalhado da API
```

### Versão Alternativa
```
index-sem-api.html  - Versão com dados simulados
app-sem-api.js      - JavaScript sem API
```

### Documentação
```
VERSAO-FINAL-FMP.md - Guia completo da versão final
FMP-INTEGRATION.md  - Documentação técnica da API
README.md           - Este arquivo
```

## 🧪 Validação

Execute `validate-fmp.html` para testar a integração da API:
```bash
open validate-fmp.html
```

Todos os 5 testes devem passar ✅

## 💻 Tecnologias

- HTML5
- CSS3 (design responsivo)
- JavaScript Vanilla (ES6+)
- FMP API (Financial Modeling Prep)

## 📚 Documentação Completa

- **VERSAO-FINAL-FMP.md** - Guia completo com:
  - Instruções de uso
  - Tickers testados
  - Troubleshooting
  - Checklist de deploy
  
- **FMP-INTEGRATION.md** - Documentação técnica:
  - Endpoints utilizados
  - Estrutura do código
  - Limitações conhecidas
  - Próximos passos

## 🎯 Status do Projeto

- ✅ Design e UX completos
- ✅ Integração FMP API funcionando
- ✅ Dados reais de mercado
- ✅ Fallback automático
- ✅ Cache inteligente
- ✅ Testes de validação
- ✅ Documentação completa
- ✅ Pronto para produção

## 📝 Nota Importante

Esta é uma ferramenta educacional. Não constitui aconselhamento financeiro. Consulte sempre um profissional certificado antes de tomar decisões de investimento.

**Rendimentos passados não garantem rendimentos futuros.**

## 👤 Autor

**Nuno Santos** - 2026

## 📄 Licença

Ferramenta educacional gratuita.

---

## 🚀 Quick Start

```bash
# 1. Clone ou baixe o projeto
# 2. Abra index.html no navegador
# 3. Teste com ticker AAPL
# 4. Explore todas as funcionalidades!
```

**Aproveite!** 🎉

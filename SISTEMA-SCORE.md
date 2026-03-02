# 📊 Sistema de Score de Propensão

## 🎯 Objetivo

Avaliar a qualidade dos indicadores de um ativo comparando com médias de mercado e fornecer uma recomendação clara de ação: **VENDER**, **MANTER** ou **COMPRAR**.

---

## 📈 Escala de Score

| Score | Recomendação | Significado | Ação |
|-------|--------------|-------------|------|
| **0-50** | 🔴 **VENDER** | Indicadores abaixo da média | Considere vender ou evitar |
| **51-80** | 🟡 **MANTER** | Indicadores dentro da média | Mantenha a posição atual |
| **81-100** | 🟢 **COMPRAR** | Indicadores acima da média | Oportunidade de compra |

---

## 🧮 Como o Score é Calculado

### 1. Avaliação Individual de Cada Indicador

Cada indicador recebe uma pontuação de 0-100 baseada em:
- Comparação com valores ideais de mercado
- Faixas de qualidade (excelente, bom, moderado, fraco)
- Contexto específico do tipo de ativo

### 2. Média Ponderada

```
Score Final = (Soma das Pontuações) / (Número de Indicadores Preenchidos)
```

### 3. Penalização por Incompletude

Se menos de 60% dos indicadores foram preenchidos:
```
Score Final = Score Base × 0.8 (penalização de 20%)
```

---

## 📊 Critérios por Indicador

### Ações

#### P/E Ratio (Price to Earnings)
- **Ideal:** 10-20
- **Excelente (90 pts):** 10-20 → Valorização justa
- **Bom (70 pts):** < 10 → Potencialmente subvalorizado
- **Aceitável (50 pts):** 20-30 → Ligeiramente caro
- **Fraco (30 pts):** > 30 → Muito caro

#### ROE (Return on Equity)
- **Ideal:** > 15%
- **Excelente (95 pts):** ≥ 20% → Excelente rentabilidade
- **Bom (80 pts):** 15-19% → Boa rentabilidade
- **Moderado (60 pts):** 10-14% → Rentabilidade moderada
- **Fraco (35 pts):** < 10% → Rentabilidade fraca

#### Dividend Yield
- **Ideal:** 2-6%
- **Excelente (90 pts):** 2-6% → Excelente rendimento
- **Bom (75 pts):** 6-10% → Bom rendimento
- **Moderado (60 pts):** 1-2% → Rendimento moderado
- **Neutro (50 pts):** 0% → Sem dividendos
- **Fraco (40 pts):** < 1% ou > 10% → Suspeito

#### Debt to Equity
- **Ideal:** < 1.0
- **Excelente (95 pts):** < 0.5 → Baixo endividamento
- **Bom (80 pts):** 0.5-1.0 → Endividamento controlado
- **Moderado (50 pts):** 1.0-2.0 → Atenção ao endividamento
- **Fraco (25 pts):** > 2.0 → Alto risco

#### EPS Growth
- **Ideal:** > 10%
- **Excelente (95 pts):** ≥ 15% → Excelente crescimento
- **Bom (80 pts):** 10-14% → Bom crescimento
- **Moderado (60 pts):** 5-9% → Crescimento moderado
- **Fraco (40 pts):** 0-4% → Crescimento fraco
- **Alerta (20 pts):** < 0% → Decrescimento

---

### ETFs

#### Expense Ratio
- **Ideal:** < 0.5%
- **Excelente (95 pts):** < 0.2% → Custos muito baixos
- **Bom (85 pts):** 0.2-0.5% → Custos baixos
- **Aceitável (60 pts):** 0.5-1.0% → Custos moderados
- **Caro (35 pts):** > 1.0% → Custos elevados

#### Tracking Error
- **Ideal:** < 1%
- **Excelente (95 pts):** < 0.5% → Replica bem o índice
- **Bom (80 pts):** 0.5-1.0% → Tracking adequado
- **Moderado (55 pts):** 1.0-2.0% → Algum desvio
- **Fraco (30 pts):** > 2.0% → Desvio significativo

---

### Volatilidade

#### Ativos Tradicionais
- **Ideal:** 15-25% (moderada)
- **Excelente (90 pts):** < 15% → Baixa volatilidade
- **Bom (85 pts):** 15-25% → Volatilidade moderada
- **Moderado (60 pts):** 25-35% → Volatilidade elevada
- **Fraco (35 pts):** > 35% → Muito alta

#### Criptomoedas
- **Ideal:** 30-60% (normal para cripto)
- **Excelente (85 pts):** < 30% → Baixa para cripto
- **Bom (80 pts):** 30-60% → Normal para cripto
- **Moderado (50 pts):** > 60% → Alta volatilidade

---

### Market Cap

- **Ideal:** > $10B (large cap)
- **Excelente (90 pts):** ≥ $10B → Large cap, mais estável
- **Bom (75 pts):** $2-10B → Mid cap, bom equilíbrio
- **Moderado (55 pts):** $300M-2B → Small cap, maior risco
- **Fraco (35 pts):** < $300M → Micro cap, alto risco

---

## 🎨 Visualização do Resultado

### Score Display
```
┌─────────────────────────┐
│         85              │  ← Score numérico
│  Score de Propensão     │
│                         │
│    ┌─────────────┐      │
│    │  📈 COMPRAR │      │  ← Recomendação
│    └─────────────┘      │
│                         │
│ Indicadores acima da    │  ← Explicação
│ média de mercado        │
└─────────────────────────┘
```

### Indicadores Individuais
```
✅ P/E Ratio: 15.5
   Excelente - valorização justa
   [Verde]

⚠️ Debt to Equity: 1.8
   Moderado - atenção ao endividamento
   [Amarelo]

❌ EPS Growth: -2%
   Decrescimento - alerta
   [Vermelho]
```

---

## 📋 Interpretação Prática

### Score 0-50 (VENDER) 🔴
**Significado:**
- Maioria dos indicadores está abaixo da média
- Ativo apresenta sinais de fraqueza
- Risco elevado de desvalorização

**Ação Recomendada:**
- Se possui: Considere vender
- Se não possui: Evite comprar
- Aguarde melhoria dos indicadores

**Exemplo:**
- P/E Ratio: 45 (muito caro)
- ROE: 5% (rentabilidade fraca)
- Debt to Equity: 3.5 (muito endividado)
- EPS Growth: -5% (decrescimento)

### Score 51-80 (MANTER) 🟡
**Significado:**
- Indicadores dentro da média de mercado
- Ativo estável, sem grandes destaques
- Risco moderado

**Ação Recomendada:**
- Se possui: Mantenha a posição
- Se não possui: Aguarde melhor oportunidade
- Monitore evolução dos indicadores

**Exemplo:**
- P/E Ratio: 22 (ligeiramente caro)
- ROE: 12% (moderado)
- Debt to Equity: 1.2 (controlado)
- EPS Growth: 8% (moderado)

### Score 81-100 (COMPRAR) 🟢
**Significado:**
- Maioria dos indicadores acima da média
- Ativo com fundamentos sólidos
- Boa oportunidade de investimento

**Ação Recomendada:**
- Se possui: Mantenha ou aumente posição
- Se não possui: Considere comprar
- Ativo com bom potencial

**Exemplo:**
- P/E Ratio: 14 (valorização justa)
- ROE: 22% (excelente)
- Debt to Equity: 0.4 (baixo)
- EPS Growth: 18% (excelente)

---

## ⚠️ Avisos Importantes

### 1. Completude dos Dados
- Score mais preciso com todos os indicadores preenchidos
- Mínimo recomendado: 60% dos indicadores
- Penalização de 20% se < 60% preenchido

### 2. Contexto de Mercado
- Score é relativo às médias de mercado
- Considere o setor e indústria
- Analise tendências macroeconômicas

### 3. Não é Aconselhamento Financeiro
- Ferramenta educacional
- Consulte profissional certificado
- Faça sua própria análise

### 4. Dados Históricos
- Baseado em dados do momento
- Performance passada ≠ futura
- Mercados são imprevisíveis

---

## 🔄 Exemplos Práticos

### Exemplo 1: Ação de Qualidade (Score: 88)
```
Apple Inc. (AAPL)
─────────────────
P/E Ratio: 16.5        ✅ 90 pts (excelente)
ROE: 24%               ✅ 95 pts (excelente)
Dividend Yield: 0.5%   ⚠️ 60 pts (moderado)
Debt to Equity: 0.8    ✅ 80 pts (bom)
EPS Growth: 12%        ✅ 80 pts (bom)
─────────────────
Score: 88 → COMPRAR 🟢
```

### Exemplo 2: Ação Problemática (Score: 35)
```
Empresa XYZ
─────────────────
P/E Ratio: 52          ❌ 30 pts (muito caro)
ROE: 4%                ❌ 35 pts (fraco)
Dividend Yield: 0%     ⚠️ 50 pts (sem dividendos)
Debt to Equity: 4.2    ❌ 25 pts (alto risco)
EPS Growth: -8%        ❌ 20 pts (decrescimento)
─────────────────
Score: 35 → VENDER 🔴
```

### Exemplo 3: ETF Médio (Score: 72)
```
ETF S&P 500
─────────────────
Expense Ratio: 0.45%   ✅ 85 pts (bom)
Tracking Error: 0.8%   ✅ 80 pts (bom)
Volume: 150k/dia       ✅ 70 pts (bom)
Dividend Yield: 1.5%   ⚠️ 60 pts (moderado)
AUM: $8B               ✅ 75 pts (bom)
─────────────────
Score: 72 → MANTER 🟡
```

---

## 🎓 Dicas de Uso

### 1. Preencha Todos os Indicadores
- Quanto mais dados, mais preciso o score
- Use Yahoo Finance para obter informações
- Verifique múltiplas fontes

### 2. Compare Múltiplos Ativos
- Avalie vários ativos do mesmo setor
- Compare scores relativos
- Identifique melhores oportunidades

### 3. Monitore Regularmente
- Reavalie periodicamente (trimestral)
- Acompanhe mudanças nos indicadores
- Ajuste estratégia conforme necessário

### 4. Considere Seu Perfil
- Conservador: Prefira scores > 80
- Moderado: Aceite scores 60-80
- Arrojado: Pode considerar < 60 (com cautela)

---

## 📊 Estatísticas de Referência

### Distribuição Típica de Scores
- **0-50:** ~20% dos ativos (evitar)
- **51-80:** ~60% dos ativos (maioria)
- **81-100:** ~20% dos ativos (oportunidades)

### Precisão do Sistema
- Com 100% indicadores: Alta precisão
- Com 60-99% indicadores: Boa precisão
- Com < 60% indicadores: Precisão reduzida

---

## ✅ Conclusão

O Sistema de Score de Propensão oferece uma análise objetiva e clara para auxiliar na tomada de decisão de investimento, baseada em indicadores fundamentais comparados com médias de mercado.

**Lembre-se:** Esta é uma ferramenta educacional. Sempre faça sua própria análise e consulte profissionais certificados antes de investir.

---

**Versão:** 3.0  
**Última Atualização:** 2 de Março de 2026  
**Desenvolvido por:** Nuno Santos

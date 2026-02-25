# Quero Investir e Agora? by Nuno Santos

Website educacional gratuito para avaliar ativos de investimento de forma inteligente.

## 🎯 Funcionalidades

### 1. Tipos de Ativos
Conheça os prós e contras de **9 tipos de investimento**:
- Ações
- Obrigações
- PPR (Plano Poupança Reforma)
- Certificados de Aforro
- ETF (Exchange Traded Funds)
- Bens Imobiliários
- REITs (Real Estate Investment Trusts)
- Commodities (Ouro, Prata, Petróleo, etc.)
- **Criptomoedas (Bitcoin, Ethereum, etc.)** ⭐ NOVO

### 2. Perfil de Investidor
Questionário interativo que identifica seu perfil:
- Conservador
- Moderado
- Arrojado

Receba recomendações de alocação personalizadas baseadas no seu perfil.

### 3. Indicadores
Top 5 indicadores para avaliar cada tipo de ativo:
- **Ações**: P/E Ratio, ROE, Dividend Yield, Debt to Equity, EPS Growth
- **ETF**: Expense Ratio, Tracking Error, Volume, Dividend Yield, AUM
- **REIT**: FFO, Dividend Yield, Occupancy Rate, Debt to Equity, Price to FFO
- **Commodities**: Tendência de Preço, Rácio Oferta/Procura, Correlação com Inflação, Volatilidade, Volume
- **Criptomoedas**: Market Cap, Volume/Market Cap, Volatilidade, Distância do ATH, CAGR 1 ano ⭐ NOVO

### 4. Avaliar Ativos
Avalie ativos específicos com **dados reais de mercado**:
- Insira o ticker (ex: AAPL, SPY, GLD, BTC, ETH)
- Veja análise completa de indicadores
- Compare valores atuais vs valores ideais
- Receba score de propensão para investir

**APIs Integradas:**
- Alpha Vantage (Ações, ETFs, REITs, Commodities)
- CoinGecko (Criptomoedas) ⭐ NOVO

### 5. Simulações Financeiras
Três calculadoras poderosas:

#### 5.1 Juros Compostos
- Compare juro simples vs juro composto
- Inclua contribuições mensais
- Veja o "efeito bola de neve" do seu dinheiro

#### 5.2 Rendimento de Ativo
- Projete o valor futuro dos seus investimentos
- Use dados reais de ativos (busca automática por ticker)
- Considere dividendos reinvestidos
- Calcule retorno anualizado

#### 5.3 Regra dos 4% (FIRE)
- Calcule o capital necessário para independência financeira
- Planeje sua reforma antecipada
- Receba plano de investimento mensal (ETF VUUA)
- Ajuste pela inflação

### 6. Glossário
**32 termos financeiros** explicados de forma simples:
- Conceitos básicos (Ações, ETF, Dividendos)
- Estratégias (DCA, FIRE, Diversificação)
- Ferramentas (Corretoras, Ticker, Portfolio)
- Psicologia (FOMO, Bear/Bull Market)
- **Criptomoedas (Bitcoin, Ethereum, Staking, Wallet)** ⭐ NOVO

### 7. Corretoras
Comparação de 10 plataformas de investimento:
- DEGIRO, Interactive Brokers, Revolut, Freedom24
- Trading 212, XTB, eToro, Saxo Bank
- Banco Invest, ActivoBank

Cada uma com:
- Avaliação (0-5 estrelas)
- Ponto mais positivo
- Ponto mais negativo
- Disponibilidade de app móvel
- Link direto

### 8. Anúncios
- Novidades e atualizações da plataforma
- Configuração de API keys
- Avisos importantes

## 🚀 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **JavaScript (Vanilla)** - Lógica e interatividade
- **APIs Externas**:
  - Alpha Vantage (dados de mercado)
  - CoinGecko (criptomoedas)
  - Financial Modeling Prep (opcional)
  - Twelve Data (opcional)
  - Polygon (opcional)

## 📱 Responsividade

Website totalmente responsivo para:
- 📱 Smartphones (320px - 480px)
- 📱 Tablets (481px - 768px)
- 💻 Desktop (769px+)

## 🔑 Configuração de API Keys

### Alpha Vantage (Obrigatória)
1. Acesse: https://www.alphavantage.co/support/#api-key
2. Preencha o formulário simples
3. Copie a API key recebida por email
4. Cole na seção "Anúncios" do website
5. Clique em "Salvar API Key"

**Limite**: 500 requisições/dia (gratuito)

### CoinGecko (Sem API Key)
- Não requer configuração
- Funciona automaticamente
- Limite: 10-50 requisições/minuto

## 📊 Como Usar

### Avaliar um Ativo

1. Vá para "Avaliar Ativos"
2. Selecione o tipo (Ações, ETF, REIT, Commodities, Criptomoedas)
3. Insira o ticker:
   - Ações: AAPL, MSFT, GOOGL
   - ETFs: SPY, VOO, VWCE.DE
   - Commodities: GLD, SLV
   - Crypto: BTC, ETH, SOL
4. Clique em "Avaliar"
5. Veja análise completa com dados reais

### Fazer uma Simulação

1. Vá para "Simulações"
2. Escolha o tipo:
   - Juros Compostos
   - Rendimento de Ativo
   - Regra dos 4%
3. Preencha os campos
4. Clique em "Calcular"
5. Exporte o resultado se desejar

## 🌐 Deploy

Veja o guia completo em [DEPLOY.md](DEPLOY.md)

Opções gratuitas:
- GitHub Pages (recomendado)
- Netlify
- Vercel
- Cloudflare Pages

## ⚠️ Avisos Importantes

1. **Não é aconselhamento financeiro**: Este website é apenas educacional
2. **Rendimentos passados ≠ Rendimentos futuros**: Dados históricos não garantem resultados
3. **Consulte profissionais**: Sempre consulte um consultor certificado antes de investir
4. **Dados em tempo real**: Sujeitos a limites de API e disponibilidade
5. **Uso pessoal**: API keys gratuitas são para uso pessoal/educacional

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── app.js                  # Lógica da aplicação
├── data.js                 # Dados estáticos
├── yahoo-finance.js        # Alpha Vantage API
├── multi-api.js            # Multi-API Manager ⭐ NOVO
├── README.md               # Este arquivo
├── DEPLOY.md               # Guia de deployment
├── MULTI-API.md            # Guia de APIs ⭐ NOVO
├── YAHOO-FINANCE.md        # Documentação Alpha Vantage
└── design-thinking/        # Documentação do processo
    ├── 01-empatia/
    ├── 02-definicao/
    ├── 03-ideacao/
    ├── 04-epicos-user-stories/
    ├── 05-requisitos/
    └── 06-resumo-executivo.md
```

## 🎨 Design Thinking

Este projeto foi desenvolvido seguindo a metodologia Design Thinking:
1. **Empatia**: Entrevistas sintéticas com investidores
2. **Definição**: POV e HMW statements
3. **Ideação**: Brainstorming de soluções
4. **Prototipagem**: Mockup e validação
5. **Implementação**: Website funcional

Veja a documentação completa em `design-thinking/`

## 📈 Estatísticas

- **9 tipos de ativos** (incluindo crypto)
- **40+ indicadores** financeiros
- **32 termos** no glossário
- **10 corretoras** comparadas
- **3 simuladores** financeiros
- **5 APIs** integradas
- **100% gratuito** e open-source

## 🔄 Atualizações Recentes

### Versão 2.0 (2026-02-25)
- ✅ Adicionado suporte para Criptomoedas
- ✅ Integração com CoinGecko API
- ✅ Multi-API Manager implementado
- ✅ 5 novos indicadores para crypto
- ✅ 7 novos termos no glossário
- ✅ Documentação expandida

### Versão 1.0 (2026-02-20)
- ✅ Integração com Alpha Vantage
- ✅ Dados reais de mercado
- ✅ 8 tipos de ativos
- ✅ 3 simuladores financeiros
- ✅ Design responsivo

## 🤝 Contribuições

Este é um projeto educacional pessoal. Sugestões são bem-vindas!

## 📄 Licença

Uso livre para fins educacionais e pessoais.

## 👤 Autor

**Nuno Santos**  
Website: Quero Investir e Agora?  
Versão: 2.0  
Data: 2026-02-25

---

**Nota**: Este website não constitui aconselhamento financeiro. Sempre faça sua própria pesquisa e consulte profissionais certificados antes de tomar decisões de investimento.

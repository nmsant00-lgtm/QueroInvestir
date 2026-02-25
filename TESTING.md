# Guia de Testes - Quero Investir e Agora?

## 🧪 Como Testar o Website

### Pré-requisitos
1. Navegador moderno (Chrome, Firefox, Safari, Edge)
2. API key do Alpha Vantage (gratuita)
3. Conexão à internet

### Configuração Inicial

#### 1. Obter API Key do Alpha Vantage
1. Acesse: https://www.alphavantage.co/support/#api-key
2. Preencha o formulário com seu email
3. Copie a API key recebida por email
4. Guarde a key para usar no website

#### 2. Abrir o Website
1. Abra o arquivo `index.html` no navegador
2. Ou acesse o website hospedado (se já fez deploy)

#### 3. Configurar API Key
1. Vá para a seção "Anúncios"
2. Cole sua API key no campo
3. Clique em "Salvar API Key"
4. Aguarde confirmação de sucesso

## 📋 Checklist de Testes

### ✅ Teste 1: Navegação
- [ ] Clicar em cada item do menu
- [ ] Verificar que todas as seções aparecem
- [ ] Testar navegação pelos cards da home
- [ ] Verificar scroll suave entre seções

### ✅ Teste 2: Tipos de Ativos
- [ ] Verificar que 9 tipos aparecem
- [ ] Confirmar que "Criptomoedas" está presente
- [ ] Ler prós e contras de cada tipo
- [ ] Verificar ícones e formatação

### ✅ Teste 3: Perfil de Investidor
- [ ] Responder todas as 5 questões
- [ ] Clicar em "Calcular Perfil"
- [ ] Verificar resultado (Conservador/Moderado/Arrojado)
- [ ] Conferir alocação recomendada
- [ ] Testar botão "Refazer Teste"

### ✅ Teste 4: Indicadores
- [ ] Verificar 5 tipos de ativos listados
- [ ] Confirmar que "Criptomoedas" está presente
- [ ] Ler indicadores de cada tipo
- [ ] Verificar valores ideais

### ✅ Teste 5: Avaliar Ativos - Ações

#### Teste com AAPL (Apple)
1. Selecione "Ações"
2. Digite "AAPL"
3. Clique em "Avaliar"
4. Aguarde busca de dados
5. Verificar:
   - [ ] Nome da empresa aparece
   - [ ] Preço atual é exibido
   - [ ] Score de propensão (0-100)
   - [ ] 5 indicadores com valores
   - [ ] Comparação com valores ideais
   - [ ] Fonte: Alpha Vantage

#### Teste com MSFT (Microsoft)
1. Selecione "Ações"
2. Digite "MSFT"
3. Clique em "Avaliar"
4. Verificar dados reais

### ✅ Teste 6: Avaliar Ativos - ETFs

#### Teste com SPY (S&P 500)
1. Selecione "ETF"
2. Digite "SPY"
3. Clique em "Avaliar"
4. Verificar:
   - [ ] Dados do ETF
   - [ ] Indicadores específicos de ETF
   - [ ] Volume de negociação
   - [ ] Market cap

#### Teste com VWCE.DE (Vanguard All-World)
1. Selecione "ETF"
2. Digite "VWCE.DE"
3. Clique em "Avaliar"
4. Verificar dados europeus

### ✅ Teste 7: Avaliar Ativos - Commodities

#### Teste com GLD (Ouro)
1. Selecione "Commodities"
2. Digite "GLD"
3. Clique em "Avaliar"
4. Verificar:
   - [ ] Tendência de preço
   - [ ] Volatilidade
   - [ ] Volume

#### Teste com SLV (Prata)
1. Selecione "Commodities"
2. Digite "SLV"
3. Clique em "Avaliar"
4. Verificar dados

### ✅ Teste 8: Avaliar Ativos - Criptomoedas ⭐ NOVO

#### Teste com BTC (Bitcoin)
1. Selecione "Criptomoedas"
2. Digite "BTC"
3. Clique em "Avaliar"
4. Verificar:
   - [ ] Nome: Bitcoin
   - [ ] Preço atual em USD
   - [ ] Rank de market cap (#1)
   - [ ] Market Cap em bilhões
   - [ ] Volume 24h / Market Cap
   - [ ] Volatilidade 30 dias
   - [ ] Distância do ATH
   - [ ] CAGR 1 ano
   - [ ] Fonte: CoinGecko

#### Teste com ETH (Ethereum)
1. Selecione "Criptomoedas"
2. Digite "ETH"
3. Clique em "Avaliar"
4. Verificar:
   - [ ] Nome: Ethereum
   - [ ] Rank #2
   - [ ] Todos os indicadores

#### Teste com SOL (Solana)
1. Selecione "Criptomoedas"
2. Digite "SOL"
3. Clique em "Avaliar"
4. Verificar dados

#### Teste com ADA (Cardano)
1. Selecione "Criptomoedas"
2. Digite "ADA"
3. Clique em "Avaliar"
4. Verificar dados

### ✅ Teste 9: Simulações - Juros Compostos
1. Ir para "Simulações"
2. Clicar na tab "Juros Compostos"
3. Preencher:
   - Capital Inicial: €10.000
   - Taxa: 7%
   - Período: 10 anos
   - Mensal: €100
4. Clicar em "Calcular"
5. Verificar:
   - [ ] Resultado juro simples
   - [ ] Resultado juro composto
   - [ ] Diferença entre os dois
   - [ ] Total investido
   - [ ] Retorno percentual

### ✅ Teste 10: Simulações - Rendimento de Ativo

#### Teste Manual
1. Clicar na tab "Rendimento de Ativo"
2. NÃO marcar checkbox de ticker
3. Preencher:
   - Mensal: €200
   - Período: 20 anos
   - Taxa: 8%
   - Dividendos: 2%
4. Clicar em "Calcular Projeção"
5. Verificar resultado

#### Teste com Ticker (AAPL)
1. Marcar checkbox "Usar dados reais"
2. Digite "AAPL"
3. Clicar em "Buscar Dados"
4. Aguardar preenchimento automático
5. Verificar:
   - [ ] Taxa preenchida automaticamente
   - [ ] Dividendos preenchidos
   - [ ] Mensagem de sucesso
6. Clicar em "Calcular Projeção"
7. Verificar resultado com ticker

### ✅ Teste 11: Simulações - Regra dos 4%
1. Clicar na tab "Regra dos 4%"
2. Preencher:
   - Idade Atual: 30
   - Idade Objetivo: 55
   - Renda Mensal: €2.000
   - Capital Atual: €0
   - Inflação: 2%
3. Clicar em "Calcular"
4. Verificar:
   - [ ] Capital necessário
   - [ ] Renda ajustada pela inflação
   - [ ] Plano de investimento VUUA
   - [ ] Investimento mensal necessário
   - [ ] Total a investir
   - [ ] Ganhos estimados

### ✅ Teste 12: Glossário
1. Ir para "Glossário"
2. Verificar 32 termos listados
3. Testar busca:
   - Digite "Bitcoin"
   - Verificar filtro funciona
   - Digite "DCA"
   - Verificar resultado
4. Limpar busca
5. Verificar categorias:
   - [ ] Ativos
   - [ ] Conceitos
   - [ ] Estratégias
   - [ ] Ferramentas
   - [ ] Psicologia

### ✅ Teste 13: Corretoras
1. Ir para "Corretoras"
2. Verificar 10 corretoras listadas
3. Confirmar presença de:
   - [ ] Revolut
   - [ ] Freedom24
   - [ ] DEGIRO
   - [ ] Interactive Brokers
4. Verificar cada card tem:
   - [ ] Nome
   - [ ] Avaliação (estrelas)
   - [ ] Ponto positivo
   - [ ] Ponto negativo
   - [ ] Badge de app móvel
   - [ ] Link funcional

### ✅ Teste 14: Anúncios
1. Ir para "Anúncios"
2. Verificar anúncios aparecem
3. Testar configuração de API key
4. Verificar status da API key

### ✅ Teste 15: Responsividade

#### Mobile (320px - 480px)
1. Abrir DevTools (F12)
2. Ativar modo responsivo
3. Selecionar iPhone SE ou similar
4. Testar:
   - [ ] Menu funciona
   - [ ] Cards são empilhados
   - [ ] Formulários são legíveis
   - [ ] Botões são clicáveis
   - [ ] Texto não transborda

#### Tablet (481px - 768px)
1. Selecionar iPad ou similar
2. Testar navegação
3. Verificar layout

#### Desktop (769px+)
1. Testar em tela grande
2. Verificar layout completo

### ✅ Teste 16: Exportar Resultados
1. Fazer uma avaliação de ativo
2. Clicar em "Exportar Resultado"
3. Verificar:
   - [ ] Download inicia
   - [ ] Arquivo .txt é criado
   - [ ] Conteúdo está correto

### ✅ Teste 17: Fallback para Dados Simulados
1. Desconectar internet (ou usar ticker inválido)
2. Tentar avaliar "XYZABC123"
3. Verificar:
   - [ ] Mensagem de erro aparece
   - [ ] Opção de usar dados simulados
   - [ ] Aviso de dados não reais

## 🐛 Testes de Erro

### Teste de Limites de API
1. Fazer 10+ requisições rápidas
2. Verificar mensagem de limite atingido
3. Aguardar 1 minuto
4. Tentar novamente

### Teste sem API Key
1. Limpar localStorage
2. Tentar avaliar ativo
3. Verificar mensagem de API key necessária

### Teste com Ticker Inválido
1. Digite "INVALIDTICKER123"
2. Clicar em "Avaliar"
3. Verificar tratamento de erro

## 📊 Testes de Performance

### Tempo de Carregamento
- [ ] Página carrega em < 3 segundos
- [ ] Imagens/ícones aparecem rapidamente
- [ ] Sem erros no console

### Tempo de Resposta da API
- [ ] Alpha Vantage responde em < 5 segundos
- [ ] CoinGecko responde em < 3 segundos
- [ ] Loading indicator aparece

## ✅ Checklist Final

### Funcionalidades Principais
- [ ] Todos os 9 tipos de ativos funcionam
- [ ] Criptomoedas funcionam corretamente
- [ ] Perfil de investidor funciona
- [ ] Indicadores aparecem corretamente
- [ ] Avaliação de ativos funciona
- [ ] 3 simuladores funcionam
- [ ] Glossário funciona
- [ ] Corretoras aparecem
- [ ] Anúncios funcionam

### Integrações
- [ ] Alpha Vantage funciona
- [ ] CoinGecko funciona
- [ ] API keys são salvas
- [ ] Fallback funciona

### UI/UX
- [ ] Design responsivo
- [ ] Navegação intuitiva
- [ ] Mensagens claras
- [ ] Sem erros visuais

### Documentação
- [ ] README atualizado
- [ ] MULTI-API.md criado
- [ ] CHANGELOG.md criado
- [ ] TESTING.md criado

## 🎯 Testes Recomendados por Prioridade

### Prioridade Alta (Obrigatório)
1. ✅ Avaliar BTC (Bitcoin)
2. ✅ Avaliar ETH (Ethereum)
3. ✅ Avaliar AAPL (Apple)
4. ✅ Simulação de Juros Compostos
5. ✅ Perfil de Investidor

### Prioridade Média (Recomendado)
1. ✅ Avaliar SPY (ETF)
2. ✅ Avaliar GLD (Commodity)
3. ✅ Simulação Regra dos 4%
4. ✅ Glossário e busca
5. ✅ Responsividade mobile

### Prioridade Baixa (Opcional)
1. ✅ Todas as corretoras
2. ✅ Todos os termos do glossário
3. ✅ Exportar resultados
4. ✅ Testes de erro

## 📝 Relatório de Bugs

Se encontrar bugs, documente:
1. **O que fez**: Passos para reproduzir
2. **O que esperava**: Comportamento esperado
3. **O que aconteceu**: Comportamento real
4. **Navegador**: Chrome, Firefox, etc.
5. **Screenshot**: Se possível

## ✅ Conclusão

Após completar todos os testes:
- [ ] Website funciona corretamente
- [ ] Todas as APIs estão integradas
- [ ] Criptomoedas funcionam
- [ ] Documentação está completa
- [ ] Pronto para deploy

---

**Última Atualização**: 2026-02-25  
**Versão**: 2.0  
**Autor**: Nuno Santos

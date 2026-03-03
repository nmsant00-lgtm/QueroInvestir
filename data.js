// Dados dos tipos de ativos
const tiposAtivos = [
    {
        nome: "Ações",
        icon: "📈",
        pros: [
            "Potencial de retorno elevado a longo prazo",
            "Liquidez elevada (fácil compra/venda)",
            "Possibilidade de receber dividendos",
            "Proteção contra inflação",
            "Diversificação através de diferentes setores"
        ],
        contras: [
            "Volatilidade elevada no curto prazo",
            "Risco de perda de capital",
            "Requer conhecimento e análise",
            "Custos de transação",
            "Impacto emocional nas decisões"
        ]
    },
    {
        nome: "Obrigações",
        icon: "📜",
        pros: [
            "Rendimento previsível e regular",
            "Menor volatilidade que ações",
            "Preservação de capital",
            "Diversificação de carteira",
            "Prioridade em caso de falência"
        ],
        contras: [
            "Retorno geralmente inferior às ações",
            "Risco de taxa de juro",
            "Risco de crédito do emissor",
            "Menor liquidez em alguns casos",
            "Erosão do valor pela inflação"
        ]
    },
    {
        nome: "PPR (Plano Poupança Reforma)",
        icon: "🏦",
        pros: [
            "Benefícios fiscais significativos",
            "Poupança para reforma",
            "Gestão profissional",
            "Diversificação automática",
            "Disciplina de poupança"
        ],
        contras: [
            "Penalizações por resgates antecipados",
            "Comissões de gestão",
            "Menor liquidez",
            "Rentabilidade não garantida",
            "Complexidade de produtos"
        ]
    },
    {
        nome: "Certificados de Aforro",
        icon: "🏛️",
        pros: [
            "Garantia do Estado Português",
            "Sem risco de perda de capital",
            "Taxa de juro indexada à Euribor",
            "Liquidez após 3 meses",
            "Sem comissões"
        ],
        contras: [
            "Rentabilidade limitada",
            "Limite máximo de investimento",
            "Penalização nos primeiros anos",
            "Não protege totalmente da inflação",
            "Menor potencial de crescimento"
        ]
    },
    {
        nome: "ETF (Exchange Traded Funds)",
        icon: "📊",
        pros: [
            "Diversificação instantânea",
            "Custos reduzidos",
            "Liquidez elevada",
            "Transparência",
            "Acesso a mercados globais"
        ],
        contras: [
            "Tracking error possível",
            "Custos de transação",
            "Não supera o mercado",
            "Risco de mercado",
            "Complexidade de alguns produtos"
        ]
    },
    {
        nome: "Bens Imobiliários",
        icon: "🏠",
        pros: [
            "Ativo tangível",
            "Rendimento através de arrendamento",
            "Valorização a longo prazo",
            "Proteção contra inflação",
            "Alavancagem através de crédito"
        ],
        contras: [
            "Baixa liquidez",
            "Custos de manutenção elevados",
            "Investimento inicial elevado",
            "Risco de vacância",
            "Impostos e burocacia"
        ]
    },
    {
        nome: "REITs (Real Estate Investment Trusts)",
        icon: "🏢",
        pros: [
            "Exposição ao imobiliário com baixo capital",
            "Liquidez elevada",
            "Dividendos regulares",
            "Diversificação geográfica e setorial",
            "Gestão profissional"
        ],
        contras: [
            "Volatilidade de mercado",
            "Sensibilidade a taxas de juro",
            "Tributação de dividendos",
            "Menor controlo sobre ativos",
            "Custos de gestão"
        ]
    },
    {
        nome: "Commodities (Ouro, Prata, Petróleo, etc.)",
        icon: "🥇",
        pros: [
            "Proteção contra inflação e desvalorização monetária",
            "Diversificação - baixa correlação com ações e obrigações",
            "Hedge em crises económicas e geopolíticas",
            "Liquidez elevada através de ETFs e futuros",
            "Acesso fácil sem necessidade de armazenamento físico"
        ],
        contras: [
            "Não gera rendimento passivo (dividendos ou juros)",
            "Alta volatilidade de preços no curto prazo",
            "Custos de gestão em ETFs e spreads em futuros",
            "Exposição a fatores geopolíticos e climáticos",
            "Tracking error em ETFs vs commodity física"
        ]
    },
    {
        nome: "Criptomoedas (Bitcoin, Ethereum, etc.)",
        icon: "₿",
        pros: [
            "Alto potencial de valorização",
            "Descentralização e independência de governos",
            "Liquidez 24/7 - mercado nunca fecha",
            "Facilidade de transferência global",
            "Tecnologia blockchain inovadora"
        ],
        contras: [
            "Volatilidade extremamente elevada",
            "Risco regulatório e legal",
            "Segurança - risco de hacks e perda de chaves",
            "Não gera rendimento passivo (exceto staking)",
            "Mercado ainda imaturo e especulativo"
        ]
    }
];

// Questionário para perfil de investidor
const questionario = [
    {
        pergunta: "Qual é o seu horizonte temporal de investimento?",
        opcoes: [
            { texto: "Menos de 1 ano", pontos: 1 },
            { texto: "1 a 3 anos", pontos: 2 },
            { texto: "3 a 5 anos", pontos: 3 },
            { texto: "5 a 10 anos", pontos: 4 },
            { texto: "Mais de 10 anos", pontos: 5 }
        ]
    },
    {
        pergunta: "Como reagiria se o seu investimento perdesse 20% do valor num mês?",
        opcoes: [
            { texto: "Venderia imediatamente", pontos: 1 },
            { texto: "Ficaria muito preocupado e consideraria vender", pontos: 2 },
            { texto: "Aguardaria para ver a evolução", pontos: 3 },
            { texto: "Manteria o investimento", pontos: 4 },
            { texto: "Aproveitaria para investir mais", pontos: 5 }
        ]
    },
    {
        pergunta: "Qual é o seu objetivo principal de investimento?",
        opcoes: [
            { texto: "Preservar capital", pontos: 1 },
            { texto: "Rendimento regular", pontos: 2 },
            { texto: "Crescimento moderado", pontos: 3 },
            { texto: "Crescimento significativo", pontos: 4 },
            { texto: "Máximo crescimento possível", pontos: 5 }
        ]
    },
    {
        pergunta: "Qual a sua experiência com investimentos?",
        opcoes: [
            { texto: "Nenhuma experiência", pontos: 1 },
            { texto: "Conhecimento básico", pontos: 2 },
            { texto: "Experiência moderada", pontos: 3 },
            { texto: "Experiência significativa", pontos: 4 },
            { texto: "Investidor experiente", pontos: 5 }
        ]
    },
    {
        pergunta: "Que percentagem do seu património está disponível para investir?",
        opcoes: [
            { texto: "Menos de 10%", pontos: 1 },
            { texto: "10% a 25%", pontos: 2 },
            { texto: "25% a 50%", pontos: 3 },
            { texto: "50% a 75%", pontos: 4 },
            { texto: "Mais de 75%", pontos: 5 }
        ]
    }
];

// Perfis de investidor
const perfis = {
    conservador: {
        nome: "Conservador",
        descricao: "Prioriza a segurança e preservação do capital. Aceita retornos mais baixos em troca de menor risco.",
        alocacao: [
            { tipo: "Certificados de Aforro", percentagem: 40 },
            { tipo: "Obrigações", percentagem: 30 },
            { tipo: "PPR", percentagem: 20 },
            { tipo: "ETF Obrigações", percentagem: 10 }
        ],
        classe: "perfil-conservador"
    },
    moderado: {
        nome: "Moderado",
        descricao: "Busca equilíbrio entre segurança e crescimento. Aceita alguma volatilidade para obter melhores retornos.",
        alocacao: [
            { tipo: "ETF Diversificados", percentagem: 30 },
            { tipo: "Ações", percentagem: 20 },
            { tipo: "Obrigações", percentagem: 20 },
            { tipo: "REITs", percentagem: 15 },
            { tipo: "PPR", percentagem: 10 },
            { tipo: "Commodities", percentagem: 5 }
        ],
        classe: "perfil-moderado"
    },
    arrojado: {
        nome: "Arrojado",
        descricao: "Foca no crescimento máximo do capital. Aceita alta volatilidade e risco em busca de retornos elevados.",
        alocacao: [
            { tipo: "Ações", percentagem: 45 },
            { tipo: "ETF Ações", percentagem: 25 },
            { tipo: "REITs", percentagem: 15 },
            { tipo: "Commodities", percentagem: 10 },
            { tipo: "Obrigações", percentagem: 5 }
        ],
        classe: "perfil-arrojado"
    }
};

// Indicadores por tipo de ativo
const indicadoresPorTipo = {
    acoes: [
        {
            nome: "P/E Ratio (Price to Earnings)",
            descricao: "Relação entre preço da ação e lucro por ação. Valores mais baixos podem indicar subvalorização.",
            ideal: "10-20 (varia por setor)"
        },
        {
            nome: "ROE (Return on Equity)",
            descricao: "Retorno sobre o património líquido. Mede a eficiência da empresa em gerar lucros.",
            ideal: "> 15%"
        },
        {
            nome: "Dividend Yield",
            descricao: "Percentagem de dividendos em relação ao preço da ação.",
            ideal: "2-6%"
        },
        {
            nome: "Debt to Equity",
            descricao: "Relação entre dívida e capital próprio. Indica o nível de endividamento.",
            ideal: "< 1.0"
        },
        {
            nome: "EPS Growth",
            descricao: "Crescimento do lucro por ação. Indica a trajetória de crescimento da empresa.",
            ideal: "> 10% anual"
        }
    ],
    etf: [
        {
            nome: "Expense Ratio",
            descricao: "Custos anuais de gestão do ETF. Impacta diretamente o retorno líquido.",
            ideal: "< 0.5%"
        },
        {
            nome: "Tracking Error",
            descricao: "Diferença entre o desempenho do ETF e o índice que replica.",
            ideal: "< 1%"
        },
        {
            nome: "Volume de Negociação",
            descricao: "Liquidez do ETF. Volumes maiores facilitam compra/venda.",
            ideal: "> 100k/dia"
        },
        {
            nome: "Dividend Yield",
            descricao: "Rendimento de dividendos distribuídos pelo ETF.",
            ideal: "1-4%"
        },
        {
            nome: "AUM (Assets Under Management)",
            descricao: "Total de ativos geridos. ETFs maiores tendem a ser mais estáveis.",
            ideal: "> $100M"
        }
    ],
    reit: [
        {
            nome: "FFO (Funds From Operations)",
            descricao: "Medida de cash flow operacional. Mais relevante que lucro líquido para REITs.",
            ideal: "$2.50 - $4.00/ação"
        },
        {
            nome: "Dividend Yield",
            descricao: "Rendimento de dividendos. REITs são obrigados a distribuir 90% dos lucros.",
            ideal: "4-8%"
        },
        {
            nome: "Occupancy Rate",
            descricao: "Taxa de ocupação dos imóveis. Indica a qualidade da gestão.",
            ideal: "> 90%"
        },
        {
            nome: "Debt to Equity",
            descricao: "Nível de endividamento do REIT.",
            ideal: "< 1.5"
        },
        {
            nome: "Price to FFO",
            descricao: "Relação entre preço e FFO. Similar ao P/E para ações.",
            ideal: "10-15"
        }
    ],
    commodities: [
        {
            nome: "Tendência de Preço (Score)",
            descricao: "Score de momentum e tendência (0-100). Valores acima de 60 indicam tendência de alta forte.",
            ideal: "60 - 80"
        },
        {
            nome: "Rácio Oferta/Procura",
            descricao: "Equilíbrio entre produção e consumo global. Valores >1.0 indicam procura superior à oferta.",
            ideal: "1.05 - 1.20"
        },
        {
            nome: "Correlação com Inflação",
            descricao: "Grau de proteção contra inflação. Ouro e prata historicamente protegem contra desvalorização.",
            ideal: "Correlação positiva > 0.7"
        },
        {
            nome: "Volatilidade (30 dias)",
            descricao: "Medida de flutuação de preços. Importante para gestão de risco e dimensionamento de posição.",
            ideal: "15-25% (moderada)"
        },
        {
            nome: "Volume de Negociação",
            descricao: "Liquidez do ETF ou contrato futuro. Volumes elevados facilitam entrada/saída sem impacto no preço.",
            ideal: "> 500k/dia"
        }
    ],
    criptomoedas: [
        {
            nome: "Market Cap",
            descricao: "Capitalização de mercado total. Criptos com market cap maior tendem a ser mais estáveis.",
            ideal: "> $10B (large cap)"
        },
        {
            nome: "Volume 24h",
            descricao: "Volume de negociação nas últimas 24 horas. Indica liquidez e interesse do mercado.",
            ideal: "> $1B/dia"
        },
        {
            nome: "Volatilidade (30 dias)",
            descricao: "Flutuação de preço. Criptos são naturalmente voláteis, mas valores extremos indicam maior risco.",
            ideal: "30-60% (moderada para cripto)"
        },
        {
            nome: "Dominância de Mercado",
            descricao: "Percentagem do market cap total de criptos. Bitcoin tem ~40-50% de dominância.",
            ideal: "> 5% (relevância)"
        },
        {
            nome: "Rendimento Anual (1 ano)",
            descricao: "Performance dos últimos 12 meses. Criptos podem ter variações extremas.",
            ideal: "Positivo (mas varia muito)"
        }
    ]
};


// Corretoras
const corretoras = [
    {
        tipo: "importante",
        titulo: "Bem-vindo ao Quero Investir e Agora?",
        data: "2026-02-25",
        conteudo: "Esta é uma ferramenta educacional gratuita criada por Nuno Santos para ajudar na avaliação de ativos de investimento. Os dados apresentados nas simulações são exemplificativos. Consulte sempre um profissional certificado antes de tomar decisões de investimento."
    },
    {
        tipo: "info",
        titulo: "Funcionalidade de Simulação Disponível",
        data: "2026-02-20",
        conteudo: "Já pode simular investimentos em Ações, ETFs, REITs e Commodities. Experimente inserir siglas como AAPL, SPY, GLD ou SLV para ver a análise de indicadores."
    },
    {
        tipo: "aviso",
        titulo: "Dados em Modo Demonstração",
        data: "2026-02-15",
        conteudo: "Atualmente, os valores apresentados nas simulações são gerados aleatoriamente para fins de demonstração. Em breve, integraremos APIs de dados reais de mercado."
    }
];

// Fundo de Emergência - Melhores Opções (Atualizado 2026)
const fundoEmergencia = [
    {
        nome: "Revolut",
        tipo: "Fintech",
        avaliacao: 4.5,
        pontoPositivo: "Juros até 2.25% (Ultra), acesso instantâneo, app premiada, contas multi-moeda",
        pontoNegativo: "Proteção FGD limitada (banco lituano), não é banco português tradicional",
        link: "https://www.revolut.com/pt-PT/",
        juros: "1.5% a 2.25% (conforme plano)",
        liquidez: "Imediata"
    },
    {
        nome: "ActivoBank",
        tipo: "Banco Digital",
        avaliacao: 4.7,
        pontoPositivo: "Sem comissões de manutenção, proteção FGD até €100k, app premiada, 100% digital",
        pontoNegativo: "Sem balcões físicos, juros baixos em conta à ordem",
        link: "https://www.activobank.pt/",
        juros: "Variável (baixo)",
        liquidez: "Imediata"
    },
    {
        nome: "Certificados de Aforro Série F (IGCP)",
        tipo: "Estado Português",
        avaliacao: 4.9,
        pontoPositivo: "Garantia total do Estado, taxa 2.031% (fev 2026), sem risco, proteção ilimitada",
        pontoNegativo: "Liquidez só após 3 meses, limite €250k por pessoa",
        link: "https://www.igcp.pt/",
        juros: "2.031% (indexado Euribor)",
        liquidez: "Após 3 meses"
    },
    {
        nome: "Moey!",
        tipo: "Fintech",
        avaliacao: 4.4,
        pontoPositivo: "100% digital, sem comissões, proteção FGD (Crédito Agrícola), interface simples",
        pontoNegativo: "Funcionalidades limitadas, juros muito baixos",
        link: "https://www.moey.pt/",
        juros: "Muito baixo (~0%)",
        liquidez: "Imediata"
    },
    {
        nome: "Trade Republic",
        tipo: "Corretora/Banco",
        avaliacao: 4.6,
        pontoPositivo: "Juros competitivos na conta, proteção até €100k, acesso a investimentos",
        pontoNegativo: "Focado em investimentos, liquidez 1-2 dias, não é banco tradicional",
        link: "https://traderepublic.com/pt-pt",
        juros: "Competitivo (variável)",
        liquidez: "1-2 dias úteis"
    },
    {
        nome: "Millennium BCP",
        tipo: "Banco Tradicional",
        avaliacao: 4.3,
        pontoPositivo: "Maior banco privado português, rede extensa, proteção FGD, serviços completos",
        pontoNegativo: "Comissões mensais €5-7, juros baixos em conta à ordem",
        link: "https://www.millenniumbcp.pt/",
        juros: "Baixo (conta) / Variável (depósitos)",
        liquidez: "Imediata"
    },
    {
        nome: "Certificados do Tesouro Poupança Mais (IGCP)",
        tipo: "Estado Português",
        avaliacao: 4.8,
        pontoPositivo: "Garantia do Estado, juros crescentes até 10 anos, resgate antecipado possível",
        pontoNegativo: "Penalização se resgatar antes de 1 ano, limite €1M",
        link: "https://www.igcp.pt/",
        juros: "Crescente (até 10 anos)",
        liquidez: "Após 1 ano (com penalização)"
    },
    {
        nome: "Santander Totta",
        tipo: "Banco Tradicional",
        avaliacao: 4.2,
        pontoPositivo: "Rede internacional, suporte em inglês, proteção FGD, ideal para expats",
        pontoNegativo: "Comissões elevadas, juros baixos, menos competitivo que digitais",
        link: "https://www.santander.pt/",
        juros: "Baixo (conta) / Variável (depósitos)",
        liquidez: "Imediata"
    },
    {
        nome: "Novobanco",
        tipo: "Banco Tradicional",
        avaliacao: 4.1,
        pontoPositivo: "Taxas competitivas em depósitos a prazo, proteção FGD, rede de balcões",
        pontoNegativo: "Requisitos mais rigorosos, comissões mensais, menos digital",
        link: "https://www.novobanco.pt/",
        juros: "Competitivo (depósitos a prazo)",
        liquidez: "Variável (conforme produto)"
    },
    {
        nome: "Caixa Geral de Depósitos (CGD)",
        tipo: "Banco Estatal",
        avaliacao: 4.0,
        pontoPositivo: "Maior banco português, rede mais extensa, proteção FGD, presença internacional",
        pontoNegativo: "Comissões elevadas (€5-8/mês), juros baixos, menos inovador",
        link: "https://www.cgd.pt/",
        juros: "Muito baixo (conta à ordem)",
        liquidez: "Imediata"
    }
];

// Podcasts de Finanças e Investimentos
const podcasts = [
    {
        nome: "MoneyFlix",
        autor: "Vários",
        descricao: "Discussões sobre finanças pessoais, investimentos e economia. Abordagem descontraída e informativa com convidados especialistas.",
        link: "https://open.spotify.com/show/5ddvskQXgUHHLb0GsC2Uef?si=YkE_xfnUTY6xSmgBw31Xnw",
        plataforma: "Spotify",
        frequencia: "Semanal",
        duracao: "45-90 min"
    },
    {
        nome: "PouparInvestirLucrar",
        autor: "Vários",
        descricao: "Podcast português sobre poupança, investimentos e literacia financeira. Conteúdo prático e acessível para todos os níveis.",
        link: "https://open.spotify.com/show/0GDIEIQ9i7nG0XkNKIf7dV?si=V2IZx8R2T8uCc2fgCVCQyQ",
        plataforma: "Spotify",
        frequencia: "Semanal",
        duracao: "30-60 min"
    },
    {
        nome: "Fire Talks Portugal",
        autor: "Comunidade FIRE PT",
        descricao: "Movimento FIRE (Financial Independence, Retire Early) em Portugal. Estratégias para independência financeira e reforma antecipada.",
        link: "https://open.spotify.com/show/7p19Xg48SmFDRJGPHWU3dy?si=lzz2U49kS5CIa6cvuyhsIw",
        plataforma: "Spotify",
        frequencia: "Quinzenal",
        duracao: "60-90 min"
    }
];

// Anúncios e Mensagens
const anuncios = [
    {
        nome: "DEGIRO",
        avaliacao: 4.5,
        pontoPositivo: "Comissões muito baixas e acesso a mercados europeus e americanos",
        pontoNegativo: "Interface pode ser complexa para iniciantes",
        temApp: true,
        link: "https://www.degiro.pt"
    },
    {
        nome: "Interactive Brokers",
        avaliacao: 4.7,
        pontoPositivo: "Plataforma profissional com acesso a mercados globais e ferramentas avançadas",
        pontoNegativo: "Requer conhecimento técnico e depósito mínimo",
        temApp: true,
        link: "https://www.interactivebrokers.com"
    },
    {
        nome: "Revolut",
        avaliacao: 4.2,
        pontoPositivo: "Interface simples e intuitiva, ideal para iniciantes",
        pontoNegativo: "Seleção limitada de ativos e custos de câmbio",
        temApp: true,
        link: "https://www.revolut.com"
    },
    {
        nome: "Freedom24",
        avaliacao: 4.0,
        pontoPositivo: "Acesso a IPOs e mercados americanos com boas condições",
        pontoNegativo: "Menos conhecido na Europa, suporte pode ser limitado",
        temApp: true,
        link: "https://www.freedom24.com"
    },
    {
        nome: "Trading 212",
        avaliacao: 4.3,
        pontoPositivo: "Zero comissões em ações e ETFs, interface amigável",
        pontoNegativo: "Lista de espera para novos clientes em alguns países",
        temApp: true,
        link: "https://www.trading212.com"
    },
    {
        nome: "XTB",
        avaliacao: 4.4,
        pontoPositivo: "Plataforma educacional excelente e suporte em português",
        pontoNegativo: "Custos de inatividade após 12 meses sem operações",
        temApp: true,
        link: "https://www.xtb.com/pt"
    },
    {
        nome: "eToro",
        avaliacao: 4.1,
        pontoPositivo: "Copy trading e rede social de investidores",
        pontoNegativo: "Spreads mais elevados e taxas de levantamento",
        temApp: true,
        link: "https://www.etoro.com"
    },
    {
        nome: "Saxo Bank",
        avaliacao: 4.6,
        pontoPositivo: "Banco regulado com ampla gama de produtos e investigação de qualidade",
        pontoNegativo: "Comissões mais elevadas, orientado para investidores experientes",
        temApp: true,
        link: "https://www.home.saxo/pt-pt"
    },
    {
        nome: "Banco Invest",
        avaliacao: 3.8,
        pontoPositivo: "Banco português regulado, segurança e confiança local",
        pontoNegativo: "Comissões elevadas comparadas com corretoras online",
        temApp: true,
        link: "https://www.bancoinvest.pt"
    },
    {
        nome: "ActivoBank",
        avaliacao: 3.9,
        pontoPositivo: "Integração bancária completa e acesso a mercados nacionais",
        pontoNegativo: "Custos superiores e menos mercados internacionais",
        temApp: true,
        link: "https://www.activobank.pt"
    }
];



// Glossário
const glossario = [
    {
        termo: "Ações",
        definicao: "Pequenas partes de uma empresa que pode comprar. Quando compra ações, torna-se sócio dessa empresa e pode ganhar dinheiro se ela crescer ou receber dividendos.",
        categoria: "Ativos"
    },
    {
        termo: "Obrigações",
        definicao: "É como emprestar dinheiro a uma empresa ou governo. Em troca, recebe juros regulares e o seu dinheiro de volta no final do prazo. Mais seguro que ações, mas com menor potencial de ganho.",
        categoria: "Ativos"
    },
    {
        termo: "ETF",
        definicao: "Exchange Traded Fund - um 'cabaz' de investimentos que compra de uma só vez. Em vez de comprar ações de uma empresa, compra um ETF que tem ações de centenas de empresas. Diversificação instantânea e baixo custo.",
        categoria: "Ativos"
    },
    {
        termo: "REIT",
        definicao: "Real Estate Investment Trust - permite investir em imóveis sem ter que comprar casas ou escritórios. Compra ações de empresas que gerem propriedades e recebe rendimentos regulares.",
        categoria: "Ativos"
    },
    {
        termo: "Commodities",
        definicao: "Matérias-primas como ouro, prata, petróleo ou trigo. Pode investir nelas através de ETFs sem ter que armazenar fisicamente. Útil para proteger contra inflação.",
        categoria: "Ativos"
    },
    {
        termo: "Certificados de Aforro",
        definicao: "Produto de poupança garantido pelo Estado Português. Muito seguro, mas com rendimento limitado. Pode resgatar após 3 meses sem perder dinheiro.",
        categoria: "Ativos"
    },
    {
        termo: "PPR",
        definicao: "Plano Poupança Reforma - produto para poupar para a reforma com benefícios fiscais. Pode deduzir parte do que investe nos impostos, mas tem penalizações se levantar antes da reforma.",
        categoria: "Ativos"
    },
    {
        termo: "Dividendos",
        definicao: "Parte dos lucros que as empresas distribuem aos acionistas. É como receber um 'salário' por ser dono de ações. Algumas empresas pagam dividendos todos os trimestres.",
        categoria: "Conceitos"
    },
    {
        termo: "Juro Simples",
        definicao: "Juros calculados apenas sobre o valor inicial. Se investir €1.000 a 5% ao ano, ganha €50 todos os anos, sempre o mesmo valor.",
        categoria: "Conceitos"
    },
    {
        termo: "Juro Composto",
        definicao: "O 'efeito bola de neve' dos investimentos. Os juros que ganha também geram juros. Com o tempo, faz uma diferença enorme. Einstein chamou-lhe 'a oitava maravilha do mundo'.",
        categoria: "Conceitos"
    },
    {
        termo: "Inflação",
        definicao: "O aumento dos preços ao longo do tempo. Se a inflação é 2%, o que hoje custa €100 custará €102 no próximo ano. Os seus investimentos precisam render mais que a inflação para ganhar poder de compra.",
        categoria: "Conceitos"
    },
    {
        termo: "Diversificação",
        definicao: "Não colocar todos os ovos no mesmo cesto. Espalhar o dinheiro por diferentes investimentos para reduzir risco. Se um corre mal, os outros podem compensar.",
        categoria: "Estratégias"
    },
    {
        termo: "DCA",
        definicao: "Dollar Cost Averaging - investir a mesma quantia regularmente (ex: €200/mês), independentemente do preço. Compra mais quando está barato e menos quando está caro. Reduz o risco de investir tudo no pior momento.",
        categoria: "Estratégias"
    },
    {
        termo: "FIRE",
        definicao: "Financial Independence, Retire Early - movimento de pessoas que poupam agressivamente (50-70% do salário) para se reformarem cedo, muitas vezes aos 40-50 anos. Baseado na regra dos 4%.",
        categoria: "Estratégias"
    },
    {
        termo: "Regra dos 4%",
        definicao: "Pode levantar 4% do seu capital investido por ano sem ficar sem dinheiro. Exemplo: com €500.000 investidos, pode gastar €20.000/ano (€1.667/mês) indefinidamente.",
        categoria: "Estratégias"
    },
    {
        termo: "Corretoras",
        definicao: "Empresas que permitem comprar e vender investimentos (ações, ETFs, etc.). São a 'ponte' entre si e os mercados financeiros. Exemplos: DEGIRO, Interactive Brokers, Revolut.",
        categoria: "Ferramentas"
    },
    {
        termo: "Ticker",
        definicao: "Código único que identifica um ativo. Como uma 'matrícula' para investimentos. Exemplos: AAPL (Apple), SPY (S&P 500 ETF), VWCE.DE (ETF mundial).",
        categoria: "Ferramentas"
    },
    {
        termo: "Portfolio",
        definicao: "O conjunto de todos os seus investimentos. Como uma 'carteira' que contém ações, ETFs, obrigações, etc. Um portfolio diversificado tem vários tipos de ativos.",
        categoria: "Conceitos"
    },
    {
        termo: "Volatilidade",
        definicao: "Quanto o preço de um investimento sobe e desce. Alta volatilidade = montanha-russa de preços. Baixa volatilidade = preços mais estáveis. Ações são mais voláteis que obrigações.",
        categoria: "Conceitos"
    },
    {
        termo: "FOMO",
        definicao: "Fear Of Missing Out - medo de perder uma oportunidade. Leva as pessoas a investir por impulso quando veem outros a ganhar dinheiro. Geralmente resulta em más decisões.",
        categoria: "Psicologia"
    },
    {
        termo: "Bear Market",
        definicao: "Mercado em baixa - quando os preços caem 20% ou mais. O 'urso' ataca para baixo. Momento de medo, mas também de oportunidade para quem investe a longo prazo.",
        categoria: "Conceitos"
    },
    {
        termo: "Bull Market",
        definicao: "Mercado em alta - quando os preços sobem consistentemente. O 'touro' ataca para cima. Momento de otimismo, mas cuidado com a euforia excessiva.",
        categoria: "Conceitos"
    },
    {
        termo: "Rendimento",
        definicao: "O ganho que obtém de um investimento, geralmente expresso em percentagem anual. Inclui valorização do preço + dividendos. Exemplo: investiu €1.000, agora vale €1.100 = 10% de rendimento.",
        categoria: "Conceitos"
    },
    {
        termo: "Liquidez",
        definicao: "Facilidade de converter um investimento em dinheiro. Ações e ETFs têm alta liquidez (vende em segundos). Imóveis têm baixa liquidez (pode demorar meses a vender).",
        categoria: "Conceitos"
    },
    {
        termo: "Horizonte Temporal",
        definicao: "Quanto tempo planeia manter o investimento. Curto prazo (< 3 anos), médio prazo (3-10 anos), longo prazo (> 10 anos). Quanto maior o horizonte, mais risco pode assumir.",
        categoria: "Conceitos"
    },
    {
        termo: "P/E Ratio",
        definicao: "Price to Earnings - compara o preço da ação com o lucro que a empresa gera. P/E de 20 significa que paga 20 anos de lucros pelo preço atual. Valores baixos podem indicar que a ação está barata.",
        categoria: "Indicadores"
    },
    {
        termo: "ROE",
        definicao: "Return on Equity - mede quão bem a empresa usa o dinheiro dos acionistas para gerar lucro. ROE de 15% significa que para cada €100 de capital, a empresa gera €15 de lucro. Quanto maior, melhor.",
        categoria: "Indicadores"
    },
    {
        termo: "Debt to Equity",
        definicao: "Compara a dívida da empresa com o capital próprio. Valor de 0.5 significa que a empresa tem €50 de dívida para cada €100 de capital. Valores baixos indicam menor risco financeiro.",
        categoria: "Indicadores"
    },
    {
        termo: "EPS Growth",
        definicao: "Earnings Per Share Growth - crescimento do lucro por ação. Se uma empresa cresce 15% ao ano, está a aumentar os lucros consistentemente. Indica empresas em expansão.",
        categoria: "Indicadores"
    },
    {
        termo: "Expense Ratio",
        definicao: "Custos anuais de um ETF, expressos em percentagem. Um expense ratio de 0.20% significa que paga €2 por ano por cada €1.000 investidos. Quanto mais baixo, melhor para o seu retorno.",
        categoria: "Indicadores"
    },
    {
        termo: "Tracking Error",
        definicao: "Diferença entre o desempenho de um ETF e o índice que deveria copiar. Um tracking error de 0.5% significa que o ETF desvia meio ponto percentual do índice. Valores baixos são melhores.",
        categoria: "Indicadores"
    },
    {
        termo: "AUM",
        definicao: "Assets Under Management - total de dinheiro gerido por um ETF ou fundo. Um ETF com €5 mil milhões de AUM é grande e estável. ETFs pequenos (< €100M) podem ter problemas de liquidez.",
        categoria: "Indicadores"
    },
    {
        termo: "FFO",
        definicao: "Funds From Operations - medida de cash flow para REITs. Mais importante que o lucro líquido porque REITs depreciam imóveis. FFO alto indica que o REIT gera bom dinheiro das propriedades.",
        categoria: "Indicadores"
    },
    {
        termo: "Occupancy Rate",
        definicao: "Taxa de ocupação dos imóveis de um REIT. 95% significa que 95% dos espaços estão alugados. Taxas altas (> 90%) indicam boa gestão e procura forte.",
        categoria: "Indicadores"
    },
    {
        termo: "Price to FFO",
        definicao: "Para REITs, é como o P/E para ações. Compara o preço com o FFO. Valores entre 10-15 são considerados razoáveis. Ajuda a identificar se um REIT está caro ou barato.",
        categoria: "Indicadores"
    },
    {
        termo: "Beta",
        definicao: "Mede a volatilidade de uma ação comparada com o mercado. Beta de 1.0 = move-se igual ao mercado. Beta de 1.5 = 50% mais volátil. Beta de 0.5 = metade da volatilidade do mercado.",
        categoria: "Indicadores"
    },
    {
        termo: "Market Cap",
        definicao: "Capitalização de mercado - valor total de todas as ações de uma empresa. Calculado multiplicando preço da ação pelo número de ações. Empresas grandes (> €10B) são geralmente mais estáveis.",
        categoria: "Indicadores"
    },
    {
        termo: "Dividend Yield",
        definicao: "Rendimento de dividendos em percentagem. Se uma ação custa €100 e paga €4 de dividendos por ano, o yield é 4%. Yields de 2-6% são comuns em ações sólidas.",
        categoria: "Indicadores"
    }
];

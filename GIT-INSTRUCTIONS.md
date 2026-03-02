# 📦 Instruções para Git

## 🚀 Como Fazer Upload para o GitHub

### Passo 1: Inicializar Repositório Local
```bash
cd quero-investir-agora
git init
```

### Passo 2: Adicionar Arquivos
```bash
git add .
```

### Passo 3: Fazer Commit
```bash
git commit -m "Initial commit - Quero Investir e Agora v2.0 com FMP API"
```

### Passo 4: Criar Repositório no GitHub
1. Acesse https://github.com/new
2. Nome do repositório: `quero-investir-agora`
3. Descrição: `Website educacional para avaliar ativos de investimento com dados reais via FMP API`
4. Público ou Privado (sua escolha)
5. **NÃO** marque "Initialize with README" (já temos um)
6. Clique "Create repository"

### Passo 5: Conectar ao GitHub
```bash
# Substitua SEU-USUARIO pelo seu username do GitHub
git remote add origin https://github.com/SEU-USUARIO/quero-investir-agora.git
git branch -M main
git push -u origin main
```

---

## 🔄 Atualizações Futuras

### Fazer Mudanças
```bash
# Edite os arquivos que precisar
# Depois:

git add .
git commit -m "Descrição das mudanças"
git push
```

---

## 🌐 Deploy no GitHub Pages

### Ativar GitHub Pages
1. Vá para o repositório no GitHub
2. Clique em "Settings"
3. No menu lateral, clique em "Pages"
4. Em "Source", selecione "main" branch
5. Clique "Save"
6. Aguarde 1-2 minutos
7. Seu site estará em: `https://SEU-USUARIO.github.io/quero-investir-agora/`

---

## 📋 Estrutura do Repositório

```
quero-investir-agora/
├── index.html              # Website principal
├── app.js                  # JavaScript com FMP
├── fmp-api.js              # Módulo FMP API
├── data.js                 # Dados estáticos
├── styles.css              # Estilos CSS
├── validate-fmp.html       # Validação da API
├── test-fmp-api.html       # Testes detalhados
├── README.md               # Documentação principal
├── QUICK-START.md          # Início rápido
├── VERSAO-FINAL-FMP.md     # Guia completo
├── FMP-INTEGRATION.md      # Doc técnica
├── .gitignore              # Arquivos ignorados
├── LICENSE                 # Licença MIT
└── GIT-INSTRUCTIONS.md     # Este arquivo
```

---

## ⚠️ IMPORTANTE: API Key

### Opção 1: Manter API Key no Código (Mais Simples)
- A API key está em `fmp-api.js`
- Funciona direto no GitHub Pages
- **Atenção:** API key ficará pública
- Recomendado apenas para projetos educacionais

### Opção 2: Remover API Key (Mais Seguro)
1. Edite `fmp-api.js`
2. Substitua a API key por:
```javascript
const FMP_API_KEY = prompt('Digite sua FMP API Key:');
```
3. Usuários precisarão inserir a própria key

### Opção 3: Backend (Mais Profissional)
- Crie um backend (Node.js, Python, etc.)
- Guarde a API key no servidor
- Frontend faz requests para seu backend
- Backend faz requests para FMP

---

## 🏷️ Tags e Releases

### Criar uma Release
```bash
git tag -a v2.0 -m "Versão 2.0 - FMP Integration"
git push origin v2.0
```

No GitHub:
1. Vá em "Releases"
2. Clique "Create a new release"
3. Selecione a tag v2.0
4. Título: "v2.0 - FMP Integration"
5. Descrição: Copie do VERSAO-FINAL-FMP.md
6. Clique "Publish release"

---

## 📝 Boas Práticas

### Commits
- Use mensagens descritivas
- Exemplos:
  - `feat: adicionar novo indicador`
  - `fix: corrigir cálculo de P/E ratio`
  - `docs: atualizar README`
  - `style: melhorar responsividade mobile`

### Branches
```bash
# Criar branch para nova feature
git checkout -b feature/novo-indicador

# Fazer mudanças e commit
git add .
git commit -m "feat: adicionar indicador XYZ"

# Voltar para main e fazer merge
git checkout main
git merge feature/novo-indicador
git push
```

---

## 🔒 Segurança

### Antes de Fazer Push
- [ ] Verificar se não há senhas no código
- [ ] Verificar se API key está OK para ser pública
- [ ] Verificar se .gitignore está correto
- [ ] Testar localmente antes de push

### Depois do Push
- [ ] Verificar se site funciona no GitHub Pages
- [ ] Testar com diferentes navegadores
- [ ] Validar API com validate-fmp.html

---

## 📊 Estatísticas do Repositório

### Adicionar Badges ao README
```markdown
![GitHub](https://img.shields.io/github/license/SEU-USUARIO/quero-investir-agora)
![GitHub stars](https://img.shields.io/github/stars/SEU-USUARIO/quero-investir-agora)
![GitHub forks](https://img.shields.io/github/forks/SEU-USUARIO/quero-investir-agora)
```

---

## 🎯 Checklist Final

Antes de fazer push:
- [ ] Todos os arquivos estão na pasta
- [ ] .gitignore configurado
- [ ] README.md atualizado
- [ ] LICENSE incluído
- [ ] Testado localmente
- [ ] API key verificada
- [ ] Sem arquivos desnecessários

---

## 🆘 Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/quero-investir-agora.git
```

### Erro: "failed to push"
```bash
git pull origin main --rebase
git push
```

### Erro: "Permission denied"
```bash
# Configure suas credenciais
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 🌟 Próximos Passos

1. ✅ Fazer upload para GitHub
2. ✅ Ativar GitHub Pages
3. ✅ Testar site online
4. ✅ Compartilhar URL
5. ✅ Receber feedback
6. ✅ Fazer melhorias

---

## 📞 Suporte

- GitHub Docs: https://docs.github.com
- GitHub Pages: https://pages.github.com
- Git Tutorial: https://git-scm.com/docs/gittutorial

---

**Boa sorte com seu projeto!** 🚀

**Desenvolvido por:** Nuno Santos  
**Versão:** 2.0 - FMP Integration  
**Data:** Março 2026

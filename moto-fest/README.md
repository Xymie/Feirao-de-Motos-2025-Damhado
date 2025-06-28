# 🏍️ Feirão de Motos 2024

Site de divulgação para o maior evento de motos da região, desenvolvido com HTML, CSS e JavaScript puro.

## ✨ Características

### 🎯 Bloco Principal
- **Informações do Evento**: Data, horário, local, ingressos e destaques
- **Formulário de Inscrição**: Captura de leads com validação completa
- **Design Responsivo**: Adaptável para desktop, tablet e mobile

### 🎠 Bloco Secundário
- **Carrossel de Patrocinadores**: Exibição automática e interativa dos patrocinadores
- **Navegação Intuitiva**: Botões, dots e suporte a touch/swipe
- **Animações Suaves**: Transições elegantes entre slides

## 🚀 Funcionalidades

### Formulário de Inscrição
- ✅ Validação em tempo real
- ✅ Máscara de telefone automática
- ✅ Feedback visual de erros
- ✅ Estados de loading e sucesso
- ✅ Campos obrigatórios e opcionais

### Carrossel de Patrocinadores
- ✅ Autoplay a cada 5 segundos
- ✅ Navegação por botões
- ✅ Indicadores de posição (dots)
- ✅ Suporte a touch/swipe (mobile)
- ✅ Navegação por teclado (setas)
- ✅ Responsivo (1-3 itens por view)

### Animações e Efeitos
- ✅ Animações de entrada (fadeInUp)
- ✅ Efeito parallax no header
- ✅ Hover effects nos elementos
- ✅ Smooth scroll
- ✅ Intersection Observer para animações

## 📁 Estrutura do Projeto

```
Lucao/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Documentação
```

## 🎨 Design System

### Cores
- **Primária**: `#667eea` (Azul)
- **Secundária**: `#764ba2` (Roxo)
- **Acento**: `#ffd700` (Dourado)
- **Escura**: `#2c3e50` (Azul escuro)
- **Clara**: `#f8f9fa` (Cinza claro)

### Tipografia
- **Família**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Hierarquia**: Títulos grandes e legíveis
- **Responsiva**: Tamanhos adaptáveis

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **Desktop**: > 768px (3 patrocinadores por view)
- **Tablet**: 481px - 768px (2 patrocinadores por view)
- **Mobile**: ≤ 480px (1 patrocinador por view)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, Gradientes, Animações
- **JavaScript ES6+**: Classes, Async/Await, Intersection Observer
- **Font Awesome**: Ícones
- **Placeholder.com**: Imagens temporárias

## 🚀 Como Usar

1. **Clone ou baixe** os arquivos do projeto
2. **Abra** o arquivo `index.html` em um navegador
3. **Personalize** as informações do evento no HTML
4. **Substitua** as imagens placeholder pelos logos reais dos patrocinadores
5. **Configure** o backend para receber os dados do formulário

## 📝 Personalização

### Alterar Informações do Evento
Edite o arquivo `index.html` nas seções:
- Data e horário
- Local do evento
- Preços dos ingressos
- Lista de atrações

### Adicionar/Remover Patrocinadores
No arquivo `index.html`, na seção do carrossel:
```html
<div class="sponsor-item">
    <img src="caminho/para/logo.png" alt="Nome do Patrocinador">
    <h3>Nome do Patrocinador</h3>
    <p>Categoria do Patrocínio</p>
</div>
```

### Configurar Formulário
Para integrar com um backend, modifique a função `handleSubmit` no `script.js`:
```javascript
// Substitua a simulação por uma chamada real
const response = await fetch('/api/inscricao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## 🎯 Próximas Melhorias

- [ ] Contador regressivo visível
- [ ] Galeria de fotos do evento
- [ ] Mapa interativo do local
- [ ] Integração com redes sociais
- [ ] Sistema de notificações push
- [ ] PWA (Progressive Web App)

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato:
- **E-mail**: contato@feiraodemotos.com
- **Telefone**: (11) 99999-9999

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para o Feirão de Motos 2024** 
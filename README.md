# 🌐 GM Tecnologia | TI Estratégica, Desenvolvimento de Soluções & Infraestrutura

<p align="center">
  <img src="assets/favicon.svg" alt="GM Tecnologia Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>Consultoria Corporativa em TI, Desenvolvimento de Soluções Sob Medida & Infraestrutura</strong><br>
  Soluções flexíveis e dimensionadas para Pequenas, Médias e Grandes Empresas — integrando tecnologias proprietárias e Open Source.
</p>

<p align="center">
  <a href="https://gustavoms0.github.io/GmTecnologia/">
    <img src="https://img.shields.io/badge/Status-Online-success?style=flat-square" alt="Status" />
  </a>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Lucide_Icons-Sky-0EA5E9?style=flat-square" alt="Lucide Icons" />
</p>

---

## 📌 Sobre a GM Tecnologia

A **GM Tecnologia** é uma parceira estratégica para empresas de todos os portes (pequenos negócios a grandes corporações) que buscam modernização, segurança e soluções sob medida com independência de fornecedores:

- 💻 **Desenvolvimento de Soluções & Sistemas Sob Medida**: Softwares personalizados, painéis administrativos, sistemas de gestão e microsserviços proprietários ou open source.
- 🌐 **Presença Web, Domínios & Publicação de Aplicações**: Criação de sites e landing pages responsivas, gestão avançada de DNS, certificados SSL e deploy contínuo.
- ✉️ **Comunicação Corporativa & E-mail Empresarial**: Servidores de e-mail corporativo (Exchange, nuvem ou open source), migração segura e autenticação SPF/DKIM/DMARC.
- 🔌 **Infraestrutura de Redes & Conectividade**: Diagnóstico, reestruturação física e lógica (LAN/VLAN), roteamento e redes Wi-Fi empresariais de alta densidade.
- 🛡️ **Segurança da Informação & Firewalls**: Proteção perimetral avançada, VPNs seguras para filiais e trabalho remoto, e controle rigoroso de acessos.
- 📊 **Monitoramento Proativo & Observabilidade (24/7)**: Plataformas em tempo real com alertas preventivos antes de qualquer incidente operacional.
- ⚡ **Automação de Processos & Integração de Sistemas**: Scripts inteligentes e integração via APIs para eliminar tarefas manuais e otimizar rotinas.
- 💾 **Continuidade de Negócios & Proteção de Dados (Backup/DR)**: Rotinas de backup imutável local e em nuvem e planos testados de Disaster Recovery.
- 🛠️ **Consultoria & Suporte Técnico Corporativo**: Atendimento consultivo e suporte proativo para computadores, servidores e equipes.

---

## ⚡ Otimizações Implementadas no Projeto

- **📱 Menu Mobile Responsivo**: Drawer com transições suaves; ao abrir, o foco vai para o menu, `Tab` fica restrito a ele, `Esc` fecha e o foco retorna ao botão (`aria-expanded`).
- **🧭 ScrollSpy Inteligente**: Identificação automática da seção visível na tela e destaque em tempo real no menu superior.
- **📋 Copiar E-mail com Feedback Visual**: Botão de cópia rápida com notificação flutuante (*toast*) anunciada a leitores de tela, indicando sucesso ou falha da cópia.
- **💬 Atendimento Flutuante (WhatsApp)**: Botão de ação rápida integrado com mensagem direta personalizada.
- **🔍 SEO & Open Graph**: Meta description, URL canônica, imagem Open Graph/Twitter (`assets/og-image.png`), dados estruturados `LocalBusiness` (JSON-LD), `robots.txt` e `sitemap.xml`.
- **🚀 Performance**: CSS do Tailwind pré-compilado e minificado (sem o Play CDN), ícones Lucide com versão fixa servidos localmente e fonte *Plus Jakarta Sans* via `<link>` com `preconnect`.
- **♿ Cuidados de Acessibilidade**: HTML semântico, rótulos ARIA nos controles, foco visível e respeito à preferência `prefers-reduced-motion` (desativa rolagem suave, animações do acordeão e o pulso do botão do WhatsApp). O site não passou por auditoria formal de acessibilidade (WCAG).
- **🧹 Limpeza e Padronização do Repositório**: Remoção de arquivos legados desnecessários, inclusão de `.gitignore` e estruturação modular (`style.css` e `main.js`).

---

## 📁 Estrutura de Arquivos

```bash
GmTecnologia/
├── assets/
│   ├── css/
│   │   └── tailwind.css    # CSS do Tailwind gerado (minificado) — não editar manualmente
│   ├── js/
│   │   └── lucide.min.js   # Ícones Lucide v0.577.0 (UMD, hospedado localmente)
│   ├── favicon.svg         # Favicon vetorial exclusivo da GM Tecnologia
│   └── og-image.png        # Imagem de compartilhamento (Open Graph / Twitter, 1200x630)
├── index.html              # Estrutura principal da landing page e SEO
├── style.css               # Estilos customizados, animações, scrollbar e print
├── main.js                 # Comportamento interativo, menu mobile, scrollspy e toast
├── tailwind.config.js      # Configuração do Tailwind CSS (cores e fonte da marca)
├── robots.txt / sitemap.xml
├── LICENSE                 # Licença MIT
├── .gitignore              # Ignora arquivos de sistema e temporários
└── README.md               # Documentação técnica do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em tecnologias web puras e leves (HTML5, Tailwind CSS, JavaScript), basta:

1. Clonar o repositório:
   ```bash
   git clone https://github.com/GustavoMS0/GmTecnologia.git
   ```
2. Entrar na pasta do projeto:
   ```bash
   cd GmTecnologia
   ```
3. Abrir o arquivo `index.html` em qualquer navegador ou utilizar a extensão **Live Server** no VS Code.

### 🎨 Recompilar o CSS do Tailwind

O arquivo `assets/css/tailwind.css` é gerado pelo Tailwind CSS v3 a partir das classes usadas em `index.html` e `main.js`. Sempre que adicionar ou alterar classes utilitárias, gere-o novamente:

```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -o assets/css/tailwind.css --minify
```

> Sem Node.js, é possível usar o [executável standalone do Tailwind CSS v3.4.17](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17) com os mesmos parâmetros.

---

## 📬 Contato & Redes

- 📱 **WhatsApp**: [+55 (11) 96904-0579](https://api.whatsapp.com/send?phone=+5511969040579)
- ✉️ **E-mail**: [gustavo.suportetec@gmail.com](mailto:gustavo.suportetec@gmail.com)
- 💼 **LinkedIn**: [/gustavotecnologia](https://linkedin.com/in/gustavotecnologia)
- 🐙 **GitHub**: [@GustavoMS0](https://github.com/GustavoMS0)

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo [`LICENSE`](LICENSE).

---

<p align="center">
  Desenvolvido por <strong>GM Tecnologia</strong> • Osasco - SP
</p>

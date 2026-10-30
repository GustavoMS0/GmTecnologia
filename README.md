# GM Tecnologia

Site da GM Tecnologia, consultoria de infraestrutura de TI de Gustavo Martins (Osasco, SP): GLPI, monitoramento com Zabbix e Grafana, redes e firewalls FortiGate, Microsoft 365, Active Directory, backup e automação.

Publicado em <https://gustavoms0.github.io/GmTecnologia/>.

## Identidade visual

A identidade parte de um mapa de rede: um núcleo âmbar ligado a outros nós. O mesmo desenho está na marca, no favicon e na abertura do site.

| Uso | Cor |
|---|---|
| Fundo escuro | `#0F1C2B` (segundo tom `#16283C`) |
| Fundo claro | `#F2F4F6` (segundo tom `#E6EBF0`) |
| Texto no claro / secundário | `#1A2633` / `#4A5868` |
| Texto no escuro / secundário | `#EEF2F5` / `#B9C6D3` |
| Destaque | `#F2A93B`, usado em fundos, linhas e texto sobre o escuro. Sobre o claro, o texto em âmbar usa `#8F4E05` |

Os títulos usam Archivo e o texto usa IBM Plex Sans, as duas do Google Fonts. Todas as combinações de texto e fundo passam de 4,5:1 (WCAG AA). A página tem um único movimento, o mapa da abertura se montando, que não roda com `prefers-reduced-motion`.

## Estrutura

```
├── index.html          Página única
├── style.css           Todo o CSS (variáveis da identidade em :root)
├── main.js             Menu móvel, destaque do menu, voltar ao topo, copiar e-mail e perguntas
├── assets/
│   ├── favicon.svg     Marca
│   ├── og-image.png    Imagem de compartilhamento (1200 x 630)
│   └── js/lucide.min.js  Ícones Lucide v0.577.0, servidos localmente
├── robots.txt
└── sitemap.xml
```

Não há etapa de build: o site é HTML, CSS e JavaScript puros. Para ver localmente, abra o `index.html` no navegador ou rode `python -m http.server` na pasta.

## Licença

Veja [LICENSE](LICENSE).

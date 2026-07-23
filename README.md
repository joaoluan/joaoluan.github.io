# Portfólio — João Moura

Portfólio profissional estático com foco em recrutadores e lideranças técnicas. A narrativa conecta experiência em operações de restaurantes à construção de produtos digitais, com o MyFoodLink como case principal.

## O que o site apresenta

- posicionamento Full Stack / Backend Júnior;
- case sanitizado do ecossistema SaaS multi-tenant MyFoodLink;
- projetos públicos selecionados, sem lista excessiva de repositórios;
- trajetória profissional anterior e competências transferíveis;
- currículo textual e compatível com ATS em português e inglês;
- conteúdo principal em HTML, disponível mesmo sem JavaScript;
- metadados SEO, Open Graph, sitemap e favicon.

Nenhum segredo, endereço interno, credencial, dado de restaurante ou informação de cliente é publicado.

## Estrutura

```text
.
├── index.html
├── pesquisa.html
├── curriculo.html
├── resume.html
├── curriculo-joao-moura-pt.pdf
├── resume_en.pdf
├── assets/
│   ├── styles.css
│   ├── site.js
│   └── resume.css
├── favicon.svg
├── og-image.svg
├── og-image.png
├── robots.txt
└── sitemap.xml
```

## Rodar localmente

```bash
python3 -m http.server 4173
```

Acesse `http://127.0.0.1:4173/`.

## Atualizar os PDFs

Com o servidor local ativo e Google Chrome instalado:

```bash
google-chrome --headless --no-sandbox \
  --print-to-pdf=curriculo-joao-moura-pt.pdf \
  http://127.0.0.1:4173/curriculo.html

google-chrome --headless --no-sandbox \
  --print-to-pdf=resume_en.pdf \
  http://127.0.0.1:4173/resume.html
```

Antes de publicar, confira visualmente as duas páginas e confirme que cada PDF permanece em uma página A4.

# Calendário 2026 - Segundas-Feiras (Light & Dark)

Projeto contendo o cronograma das segundas-feiras de 2026 nos formatos **Light** e **Dark**, otimizado para visualização web e exportação para PDF em formato A4.

## 📁 Estrutura de Pastas

```
calendario_2026/
├── assets/
│   ├── elements/         # Logos em formato SVG (Light & Dark)
│   │   ├── logo.svg
│   │   └── logo_light.svg
│   ├── fonts/            # Fontes personalizadas (Lemon Milk)
│   │   ├── LEMONMILK-Bold.otf
│   │   ├── LEMONMILK-Medium.otf
│   │   └── LEMONMILK-Regular.otf
│   └── pdf/              # PDFs gerados para impressão A4
│       ├── calendario_2026_light.pdf
│       └── calendario_2026_dark.pdf
├── app.js                # Base de dados das datas/temáticas e renderização dinâmica
├── generate_pdfs.js      # Script Node.js para geração automatizada dos PDFs
├── index.html            # Estrutura HTML do calendário em páginas A4 (Light & Dark)
├── package.json          # Configurações do projeto e scripts automatizados
├── styles.css            # Estilos CSS, temas (Light/Dark) e formatação de impressão
└── README.md             # Documentação do projeto
```

## 🚀 Como Executar

### 1. Visualizar o Calendário
Abra o arquivo `index.html` diretamente no seu navegador de preferência.

### 2. Regerar os Arquivos PDF
Para gerar novamente os PDFs nos temas Light e Dark:

```bash
node generate_pdfs.js
```
*(Requer o Google Chrome instalado no caminho padrão do Windows).*

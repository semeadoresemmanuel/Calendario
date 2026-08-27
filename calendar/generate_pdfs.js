import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_SCHEDULE = [
  { date: '2026-02-02', type: 'normal', tematica: 'De Volta para o Futuro: Análise do Passado, Ajustes no Presente e Projeções para o Futuro - Parte I', modalidade: 'Abertura' },
  { date: '2026-02-09', type: 'normal', tematica: 'De Volta para o Futuro: Análise do Passado, Ajustes no Presente e Projeções para o Futuro - Parte II', modalidade: 'Abertura' },
  { date: '2026-02-16', type: 'facultativo', tematica: 'Segunda-Feira de Carnaval', modalidade: 'Ponto Facultativo' },
  { date: '2026-02-23', type: 'normal', tematica: 'Parte II, Capítulo IV (Da Pluralidade das Existências) - Parecenças Físicas e Morais', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-03-02', type: 'normal', tematica: 'Servos para o Trabalho na Edificação do Material e do Intelecto-Moral', modalidade: 'Reforma Íntima' },
  { date: '2026-03-09', type: 'normal', tematica: 'As Guerras Atuais e a Transição Planetária', modalidade: 'Especial' },
  { date: '2026-03-16', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-03-23', type: 'normal', tematica: 'Parte II, Capítulo IV (Da Pluralidade das Existências) - Ideias Inatas', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-03-30', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-04-06', type: 'normal', tematica: 'Parte II, Capítulo V (Considerações sobre a Pluralidade das Existências)', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-04-13', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-04-20', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-04-27', type: 'normal', tematica: 'Planejamento Reencarnatório e Familiar', modalidade: 'Especial' },
  { date: '2026-05-04', type: 'normal', tematica: 'A Jornada de Dentro: Conhecer, Transformar e Crescer', modalidade: 'Reforma Íntima' },
  { date: '2026-05-11', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-05-18', type: 'normal', tematica: 'Espiritismo e Inteligência Artificial', modalidade: 'Especial' },
  { date: '2026-05-25', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - Espíritos Errantes', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-06-01', type: 'normal', tematica: 'Levantamento de Ações e Necessidades do Centro Espírita Emmanuel', modalidade: 'Reforma Íntima' },
  { date: '2026-06-08', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - Mundos Transitórios', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-06-15', type: 'normal', tematica: 'Qualidade de Vida nos Tempos Atuais', modalidade: 'Reforma Íntima' },
  { date: '2026-06-22', type: 'normal', tematica: 'Excessos e Desequilíbrios do Estilo de Vida', modalidade: 'Especial' },
  { date: '2026-06-29', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-07-06', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-07-13', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - Percepções, Sensações e Sofrimentos dos Espíritos', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-07-20', type: 'normal', tematica: 'A Definir', modalidade: 'Reforma Íntima' },
  { date: '2026-07-27', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-08-03', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-08-10', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - Ensaio Teórico da Sensação nos Espíritos', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-08-17', type: 'normal', tematica: 'Prioridades e Decisões', modalidade: 'Reforma Íntima' },
  { date: '2026-08-24', type: 'normal', tematica: 'A Definir', modalidade: 'Especial' },
  { date: '2026-08-31', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-09-07', type: 'feriado', tematica: 'Dia da Independência do Brasil', modalidade: 'Feriado' },
  { date: '2026-09-14', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-09-21', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - Escolha das Provas', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-09-28', type: 'normal', tematica: 'A Definir', modalidade: 'Reforma Íntima' },
  { date: '2026-10-05', type: 'normal', tematica: 'A Definir', modalidade: 'Especial' },
  { date: '2026-10-12', type: 'feriado', tematica: 'Dia das Crianças | Nossa Senhora Aparecida', modalidade: 'Feriado' },
  { date: '2026-10-19', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-10-26', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - As Relações no Além-Túmulo', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-11-02', type: 'feriado', tematica: 'Finados', modalidade: 'Feriado' },
  { date: '2026-11-09', type: 'normal', tematica: 'A Definir', modalidade: 'Especial' },
  { date: '2026-11-16', type: 'normal', tematica: 'Atividades no Centro', modalidade: 'Obra Básica - O Evangelho Segundo o Espiritismo' },
  { date: '2026-11-23', type: 'normal', tematica: 'Parte II, Capítulo VI (Da Vida Espírita) - Relações de Simpatia e de Antipatia entre os Espíritos', modalidade: 'Obra Básica - O Livro dos Espíritos' },
  { date: '2026-11-30', type: 'normal', tematica: 'Cerimônia do Oscar Semeadores 2026', modalidade: 'Encerramento' }
];

function formatPdfModalidade(modalidade) {
  if (!modalidade) return '';
  let mod = modalidade.trim();
  const modLower = mod.toLowerCase();
  if (mod === 'Reforma Intima') return 'Reforma Íntima';
  if (modLower.includes('evangelho segundo o espiritismo') || mod === 'Prática') {
    return 'Obra Básica - ESE';
  }
  if (modLower.includes('livro dos espíritos') || modLower.includes('livro dos espiritos')) {
    return 'Obra Básica - LDE';
  }
  return mod;
}

// Dynamic Chrome Executable Path Resolution
function getChromePath() {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return 'chrome'; // fallback to PATH
}

async function fetchFirestoreEvents() {
  const formattedBase = BASE_SCHEDULE.map(item => ({
    ...item,
    modalidade: formatPdfModalidade(item.modalidade)
  }));

  try {
    const res = await fetch('https://firestore.googleapis.com/v1/projects/cronograma-433c0/databases/(default)/documents/items');
    if (!res.ok) return formattedBase;
    const data = await res.json();
    if (!data.documents) return formattedBase;
    
    const itemsMap = new Map();
    data.documents.forEach(doc => {
      const fields = doc.fields || {};
      const type = fields.type?.stringValue || 'event';
      const title = fields.title?.stringValue || '';
      const modalidade = fields.modalidade?.stringValue || '';
      const dateStr = fields.date?.stringValue || '';
      const date = dateStr ? dateStr.split('T')[0] : '';
      
      if (date && type !== 'task') {
        let itemType = 'normal';
        if (modalidade === 'Feriado' || title.toLowerCase().includes('feriado')) {
          itemType = 'feriado';
        } else if (modalidade === 'Ponto Facultativo' || title.toLowerCase().includes('facultativo')) {
          itemType = 'facultativo';
        }

        itemsMap.set(date, {
          date,
          type: itemType,
          tematica: title,
          modalidade: formatPdfModalidade(modalidade)
        });
      }
    });

    // Merge base schedule with Firestore overrides
    const merged = formattedBase.map(base => {
      const custom = itemsMap.get(base.date);
      if (custom) return custom;
      return base;
    });

    // Add any extra custom dates
    const baseDates = new Set(formattedBase.map(b => b.date));
    itemsMap.forEach((val, key) => {
      if (!baseDates.has(key)) {
        merged.push(val);
      }
    });

    merged.sort((a, b) => a.date.localeCompare(b.date));
    return merged;
  } catch (e) {
    console.log('Using local base schedule (Firestore offline or unconfigured).');
    return formattedBase;
  }
}

async function main() {
  const chromePath = getChromePath();
  const htmlPath = path.join(__dirname, 'index.html');
  const appJsPath = path.join(__dirname, 'app.js');
  const lightTempPath = path.join(__dirname, 'light_temp.html');
  const darkTempPath = path.join(__dirname, 'dark_temp.html');
  const pdfDir = path.join(__dirname, 'assets', 'pdf');
  const pdfLightPath = path.join(pdfDir, 'Calendário 2026 (Light Mode).pdf');
  const pdfDarkPath = path.join(pdfDir, 'Calendário 2026 (Dark Mode).pdf');

  // Ensure output folders exist
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Update app.js with latest merged events
  const liveEvents = await fetchFirestoreEvents();
  if (liveEvents && fs.existsSync(appJsPath)) {
    const updatedAppJsContent = `// 2026 Mondays Database synced dynamically from Firestore\nconst MONDAYS_DATA = Object.freeze(${JSON.stringify(liveEvents, null, 2)});\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  renderCalendar('calendar-body-light');\n  renderCalendar('calendar-body-dark');\n});\n\nfunction renderCalendar(tbodyId) {\n  const tbody = document.getElementById(tbodyId);\n  if (!tbody) return;\n  const fragment = document.createDocumentFragment();\n  MONDAYS_DATA.forEach(row => {\n    const tr = document.createElement('tr');\n    if (row.type === 'feriado') tr.className = 'row-feriado';\n    else if (row.type === 'facultativo') tr.className = 'row-facultativo';\n    const [, month, day] = row.date.split('-');\n    const formattedDate = \`\${day}/\${month}\`;\n    tr.innerHTML = \`\n      <td><div class="date-cell"><span class="date-text">\${escapeHtml(formattedDate)}</span></div></td>\n      <td><div class="cell-text tematica-cell">\${escapeHtml(row.tematica) || '&nbsp;'}</div></td>\n      <td><div class="cell-text modalidade-cell">\${escapeHtml(row.modalidade) || '&nbsp;'}</div></td>\n    \`;\n    fragment.appendChild(tr);\n  });\n  tbody.replaceChildren(fragment);\n}\n\nfunction escapeHtml(text) {\n  if (!text) return '';\n  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');\n}\n`;
    fs.writeFileSync(appJsPath, updatedAppJsContent, 'utf8');
    console.log(`app.js updated with ${liveEvents.length} events starting on ${liveEvents[0].date}.`);
  }

  const originalHtml = fs.readFileSync(htmlPath, 'utf8');

  // Helper to remove a block of HTML using regex
  function removeContainer(html, containerClass) {
    const regex = new RegExp(`<div class="a4-container ${containerClass}">[\\s\\S]*?<\\/footer>\\s*<\\/div>`, 'g');
    return html.replace(regex, '<!-- Container removed -->');
  }

  // Generate Light HTML (remove dark version)
  const lightHtml = removeContainer(originalHtml, 'dark-version');
  fs.writeFileSync(lightTempPath, lightHtml, 'utf8');

  // Generate Dark HTML (remove light version)
  const darkHtml = removeContainer(originalHtml, 'light-version');
  fs.writeFileSync(darkTempPath, darkHtml, 'utf8');

  console.log('Temporary HTML files created.');

  try {
    // Convert Light to PDF
    console.log('Generating Light PDF...');
    const lightUrl = pathToFileURL(lightTempPath).href;
    execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfLightPath}" "${lightUrl}"`);
    fs.copyFileSync(pdfLightPath, path.join(publicDir, 'calendario_2026_light.pdf'));
    console.log('Light PDF generated and copied to public/ successfully.');

    // Convert Dark to PDF
    console.log('Generating Dark PDF...');
    const darkUrl = pathToFileURL(darkTempPath).href;
    execSync(`"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfDarkPath}" "${darkUrl}"`);
    fs.copyFileSync(pdfDarkPath, path.join(publicDir, 'calendario_2026_dark.pdf'));
    console.log('Dark PDF generated and copied to public/ successfully.');
  } catch (err) {
    console.error('Error generating PDFs:', err.message);
  } finally {
    // Clean up temporary files
    if (fs.existsSync(lightTempPath)) fs.unlinkSync(lightTempPath);
    if (fs.existsSync(darkTempPath)) fs.unlinkSync(darkTempPath);
    console.log('Temporary files cleaned up.');
  }
}

main();

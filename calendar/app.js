// 2026 Mondays Database synced dynamically from Firestore
const MONDAYS_DATA = Object.freeze([
  {
    "date": "2026-02-02",
    "type": "normal",
    "tematica": "De Volta para o Futuro: Análise do Passado, Ajustes no Presente e Projeções para o Futuro - Parte I",
    "modalidade": "Abertura"
  },
  {
    "date": "2026-02-09",
    "type": "normal",
    "tematica": "De Volta para o Futuro: Análise do Passado, Ajustes no Presente e Projeções para o Futuro - Parte II",
    "modalidade": "Abertura"
  },
  {
    "date": "2026-02-16",
    "type": "facultativo",
    "tematica": "Segunda-Feira de Carnaval",
    "modalidade": "Ponto Facultativo"
  },
  {
    "date": "2026-02-23",
    "type": "normal",
    "tematica": "Parte II, Capítulo IV (Da Pluralidade das Existências) - Parecenças Físicas e Morais",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-03-02",
    "type": "normal",
    "tematica": "Servos para o Trabalho na Edificação do Material e do Intelecto-Moral",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-03-09",
    "type": "normal",
    "tematica": " As Guerras Atuais e a Transição Planetária ",
    "modalidade": "Especial"
  },
  {
    "date": "2026-03-16",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-03-23",
    "type": "normal",
    "tematica": "Parte II, Capítulo IV (Da Pluralidade das Existências) - Ideias Inatas",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-03-30",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-04-06",
    "type": "normal",
    "tematica": "Parte II, Capítulo V (Considerações sobre a Pluralidade das Existências)",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-04-13",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-04-20",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-04-27",
    "type": "normal",
    "tematica": "Planejamento Reencarnatório e Familiar",
    "modalidade": "Especial"
  },
  {
    "date": "2026-05-04",
    "type": "normal",
    "tematica": "A Jornada de Dentro: Conhecer, Transformar e Crescer",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-05-11",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-05-18",
    "type": "normal",
    "tematica": "Espiritismo e Inteligência Artificial",
    "modalidade": "Especial"
  },
  {
    "date": "2026-05-25",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - Espíritos Errantes",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-06-01",
    "type": "normal",
    "tematica": "Levantamento de Ações e Necessidades do Centro Espírita Emmanuel ",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-06-08",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - Mundos Transitórios",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-06-15",
    "type": "normal",
    "tematica": "Qualidade de Vida nos Tempos Atuais",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-06-22",
    "type": "normal",
    "tematica": "Excessos e Desequilíbrios do Estilo de Vida",
    "modalidade": "Especial"
  },
  {
    "date": "2026-06-29",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-07-06",
    "type": "normal",
    "tematica": "Atividades do Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-07-13",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - Percepções, Sensações e Sofrimentos dos Espíritos",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-07-20",
    "type": "normal",
    "tematica": "Consumo, Redes Sociais e Vícios",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-07-27",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-08-03",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-08-10",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - Ensaio Teórico da Sensação nos Espíritos",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-08-17",
    "type": "normal",
    "tematica": "Prioridades e Decisões",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-08-24",
    "type": "normal",
    "tematica": "A Definir",
    "modalidade": "Especial"
  },
  {
    "date": "2026-08-31",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-09-07",
    "type": "feriado",
    "tematica": "Dia da Independência do Brasil",
    "modalidade": "Feriado"
  },
  {
    "date": "2026-09-14",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-09-21",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - Escolha das Provas",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-09-28",
    "type": "normal",
    "tematica": "A Definir",
    "modalidade": "Reforma Íntima"
  },
  {
    "date": "2026-10-05",
    "type": "normal",
    "tematica": "A Definir",
    "modalidade": "Especial"
  },
  {
    "date": "2026-10-12",
    "type": "feriado",
    "tematica": "Dia das Crianças | Nossa Senhora Aparecida",
    "modalidade": "Feriado"
  },
  {
    "date": "2026-10-19",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-10-26",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - As Relações no Além-Túmulo ",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-11-02",
    "type": "feriado",
    "tematica": "Finados",
    "modalidade": "Feriado"
  },
  {
    "date": "2026-11-09",
    "type": "normal",
    "tematica": "A Definir",
    "modalidade": "Especial"
  },
  {
    "date": "2026-11-16",
    "type": "normal",
    "tematica": "Atividades no Centro",
    "modalidade": "Obra Básica - ESE"
  },
  {
    "date": "2026-11-23",
    "type": "normal",
    "tematica": "Parte II, Capítulo VI (Da Vida Espírita) - Relações de Simpatia e de Antipatia entre os Espíritos",
    "modalidade": "Obra Básica - LDE"
  },
  {
    "date": "2026-11-30",
    "type": "normal",
    "tematica": "Oscar Semeadores 2026",
    "modalidade": "Encerramento"
  }
]);

document.addEventListener('DOMContentLoaded', () => {
  renderCalendar('calendar-body-light');
  renderCalendar('calendar-body-dark');
});

function renderCalendar(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const fragment = document.createDocumentFragment();
  MONDAYS_DATA.forEach(row => {
    const tr = document.createElement('tr');
    if (row.type === 'feriado') tr.className = 'row-feriado';
    else if (row.type === 'facultativo') tr.className = 'row-facultativo';
    const [, month, day] = row.date.split('-');
    const formattedDate = `${day}/${month}`;
    tr.innerHTML = `
      <td><div class="date-cell"><span class="date-text">${escapeHtml(formattedDate)}</span></div></td>
      <td><div class="cell-text tematica-cell">${escapeHtml(row.tematica) || '&nbsp;'}</div></td>
      <td><div class="cell-text modalidade-cell">${escapeHtml(row.modalidade) || '&nbsp;'}</div></td>
    `;
    fragment.appendChild(tr);
  });
  tbody.replaceChildren(fragment);
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

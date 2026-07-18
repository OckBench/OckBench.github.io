/* OckBench — client-side behavior (vanilla JS, no dependencies). */
(function () {
  'use strict';

  // ── Configuration ───────────────────────────────────────────────────
  // Adding a model: regenerate both CSVs (see README "Updating the Data"),
  // then optionally: add its CSV name to SELECTED_MODELS below (default view),
  // DISPLAY_NAMES (pretty name), LOGO_MAP (new org logo), EFFORT_SERIES
  // (scatter effort ladders), and .chart-pt.f-<family> in ock.css (new family).
  var SELECTED_MODELS = new Set([
    'gpt-5.5-medium', 'gpt-5.5-high', 'gpt-5.4-medium',
    'opus-4.8-xhigh', 'opus-4.8-medium', 'opus-4.7-xhigh',
    'opus-4.6', 'gemini-3.1-pro-preview', 'deepseek-v4-pro-high',
    'deepseek-v4-flash-high', 'glm-5.2-max', 'kimi-k2.6',
    'qwen3.5-397b-a17b', 'minimax-m2.7', 'mimo-v2.5-pro-thinking', 'glm-5.1',
    'sonnet-4.6', 'gemma-4-31b-it', 'qwen3.6-27b', 'gemini-2.5-pro',
  ]);

  // Display name overrides (CSV name → display name)
  var DISPLAY_NAMES = {
    'gpt-5.5': 'GPT-5.5 (none)',
    'gpt-5.5-low': 'GPT-5.5 (low)',
    'gpt-5.5-medium': 'GPT-5.5 (medium)',
    'gpt-5.5-high': 'GPT-5.5 (high)',
    'gpt-5.5-xhigh': 'GPT-5.5 (xhigh)',
    'gpt-5.4': 'GPT-5.4 (none)',
    'gpt-5.4-low': 'GPT-5.4 (low)',
    'gpt-5.4-medium': 'GPT-5.4 (medium)',
    'gpt-5.4-high': 'GPT-5.4 (high)',
    'opus-4.7-xhigh': 'Claude Opus 4.7 (xhigh)',
    'opus-4.8-low': 'Claude Opus 4.8 (low)',
    'opus-4.8-medium': 'Claude Opus 4.8 (medium)',
    'opus-4.8-high': 'Claude Opus 4.8 (high)',
    'opus-4.8-xhigh': 'Claude Opus 4.8 (xhigh)',
    'opus-4.8-max': 'Claude Opus 4.8 (max)',
    'opus-4.6': 'Claude Opus 4.6',
    'opus-4.5': 'Claude Opus 4.5',
    'sonnet-4.6': 'Claude Sonnet 4.6',
    'sonnet-4.5': 'Claude Sonnet 4.5',
    'gemini-3.1-pro-preview': 'Gemini 3.1 Pro',
    'gemini-3.1-flash-lite': 'Gemini 3.1 Flash-Lite',
    'gemini-3-flash-preview': 'Gemini 3 Flash',
    'gemini-2.5-pro': 'Gemini 2.5 Pro',
    'gemini-2.5-flash': 'Gemini 2.5 Flash',
    'deepseek-v4-flash-none': 'DeepSeek-V4-Flash (none)',
    'deepseek-v4-flash-high': 'DeepSeek-V4-Flash (high)',
    'deepseek-v4-flash-max': 'DeepSeek-V4-Flash (max)',
    'deepseek-v4-pro-none': 'DeepSeek-V4-Pro (none)',
    'deepseek-v4-pro-high': 'DeepSeek-V4-Pro (high)',
    'deepseek-v4-pro-max': 'DeepSeek-V4-Pro (max)',
    'kimi-k2.6': 'Kimi-K2.6',
    'kimi-k2.5': 'Kimi-K2.5',
    'minimax-m2.7': 'MiniMax-M2.7',
    'minimax-m2.5': 'MiniMax-M2.5',
    'glm-5.1': 'GLM-5.1',
    'glm-5': 'GLM-5',
    'glm-5.2-off': 'GLM-5.2 (off)',
    'glm-5.2-high': 'GLM-5.2 (high)',
    'glm-5.2-max': 'GLM-5.2 (max)',
    'mimo-v2.5-pro-thinking': 'MiMo-V2.5-Pro',
    'mimo-v2.5-thinking': 'MiMo-V2.5',
    'qwen-235b': 'Qwen-235B',
    'qwen3.5-397b-a17b': 'Qwen3.5-397B-A17B',
    'qwen3.5-122b-a10b': 'Qwen3.5-122B-A10B',
    'qwen3.5-35b-a3b': 'Qwen3.5-35B-A3B',
    'qwen3.5-9b': 'Qwen3.5-9B',
    'qwen3.6-27b': 'Qwen3.6-27B',
    'qwen3.6-35b-a3b': 'Qwen3.6-35B-A3B',
    'gemma-4-31b-it': 'Gemma-4-31B-IT',
  };

  var LOGO_MAP = {
    'Gemini': 'gemini-color.svg',
    'Google': 'gemini-color.svg',
    'OpenAI': 'openai.svg',
    'DeepSeek': 'deepseek_logo.svg',
    'Kimi': 'kimi.svg',
    'Qwen': 'qwen-color.svg',
    'Alibaba': 'qwen-color.svg',
    'NVIDIA': 'nvidia-color.svg',
    'AceReason': 'nvidia-color.svg',
    'Grok': 'grok.svg',
    'MiniMax': 'minimax-color.svg',
    'MiMo': 'xiaomi.svg',
    'Claude': 'claude_logo.svg',
    'Gemma': 'gemma.svg',
    'Z.ai': 'zai.svg',
    'GLM': 'zai.svg',
  };

  var CSV_URL = 'static/data/top200_model_performance.csv';
  var HEAT_CSV_URL = 'static/data/per_domain_performance.csv';
  var LOGO_DIR = 'static/images/logos/';
  var FILTER_ALL = 'all';
  var DOMAINS = ['Math', 'Coding', 'Science'];

  // Effort ladders for the scatter chart: same-model variants, low → high effort.
  var EFFORT_SERIES = [
    ['gpt-5.4', 'gpt-5.4-low', 'gpt-5.4-medium', 'gpt-5.4-high'],
    ['gpt-5.5', 'gpt-5.5-low', 'gpt-5.5-medium', 'gpt-5.5-high', 'gpt-5.5-xhigh'],
    ['opus-4.8-low', 'opus-4.8-medium', 'opus-4.8-high', 'opus-4.8-xhigh', 'opus-4.8-max'],
    ['deepseek-v4-pro-none', 'deepseek-v4-pro-high', 'deepseek-v4-pro-max'],
    ['deepseek-v4-flash-none', 'deepseek-v4-flash-high', 'deepseek-v4-flash-max'],
    ['glm-5.2-off', 'glm-5.2-high', 'glm-5.2-max'],
  ];

  // ── Pure helpers (no DOM; also exercised by the node smoke test) ────

  function parseCSV(text) {
    var lines = String(text).replace(/\r/g, '').trim().split('\n');
    return lines.slice(1).filter(function (line) {
      return line.trim() !== '';
    }).map(function (line) {
      var cols = line.split(',');
      return {
        model: cols[0],
        category: cols[1],
        license: cols[2],
        accuracy: parseFloat(cols[3]),
        avgTokens: parseInt(cols[4], 10),
        correct: parseInt(cols[5], 10),
        total: parseInt(cols[6], 10),
        ockScore: parseFloat(cols[7]),
        selected: SELECTED_MODELS.has(cols[0]),
      };
    });
  }

  function parseDomainCSV(text) {
    var lines = String(text).replace(/\r/g, '').trim().split('\n');
    var byModel = {};
    lines.slice(1).forEach(function (line) {
      if (line.trim() === '') return;
      var cols = line.split(',');
      if (DOMAINS.indexOf(cols[1]) === -1) return;
      if (!byModel[cols[0]]) byModel[cols[0]] = {};
      byModel[cols[0]][cols[1]] = {
        accuracy: parseFloat(cols[2]),
        avgTokens: parseFloat(cols[3]),
        correct: parseInt(cols[4], 10),
        total: parseInt(cols[5], 10),
      };
    });
    return byModel;
  }

  function filterEntries(entries, showAll, licenseFilter) {
    return entries.filter(function (entry) {
      if (!showAll && !entry.selected) return false;
      if (licenseFilter !== FILTER_ALL && entry.license !== licenseFilter) return false;
      return true;
    });
  }

  function sortEntries(entries, key, dir) {
    var sign = dir === 'asc' ? 1 : -1;
    return entries.slice().sort(function (a, b) {
      var diff = (a[key] || 0) - (b[key] || 0);
      if (diff !== 0) return sign * diff;
      return a.ockScore > b.ockScore ? -1 : a.ockScore < b.ockScore ? 1 : 0;
    });
  }

  function displayName(entry) {
    return DISPLAY_NAMES[entry.model] || entry.model;
  }

  // Pareto-optimal set: maximize accuracy while minimizing tokens.
  // Returns the frontier entries sorted by ascending tokens (left to right).
  function paretoFrontier(entries) {
    var sorted = entries.slice().sort(function (a, b) {
      return (a.avgTokens - b.avgTokens) || (b.accuracy - a.accuracy);
    });
    var best = -Infinity;
    var frontier = [];
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].accuracy > best) {
        frontier.push(sorted[i]);
        best = sorted[i].accuracy;
      }
    }
    return frontier;
  }

  function logoFile(entry) {
    return LOGO_MAP[entry.category] || null;
  }

  // Export pure helpers for the node smoke test (harmless in the browser).
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      SELECTED_MODELS: SELECTED_MODELS,
      DISPLAY_NAMES: DISPLAY_NAMES,
      LOGO_MAP: LOGO_MAP,
      EFFORT_SERIES: EFFORT_SERIES,
      parseCSV: parseCSV,
      parseDomainCSV: parseDomainCSV,
      filterEntries: filterEntries,
      sortEntries: sortEntries,
      displayName: displayName,
      logoFile: logoFile,
      paretoFrontier: paretoFrontier,
    };
  }

  if (typeof document === 'undefined') return;

  // ── Leaderboard ─────────────────────────────────────────────────────

  var state = {
    entries: [],
    showAll: false,
    licenseFilter: FILTER_ALL,
    sortKey: 'ockScore',
    sortDir: 'desc',
  };

  function buildCell(className, text) {
    var td = document.createElement('td');
    td.className = className;
    if (text !== undefined) td.textContent = text;
    return td;
  }

  function buildRow(entry, rank) {
    var tr = document.createElement('tr');
    tr.setAttribute('data-selected', entry.selected ? 'true' : 'false');
    tr.setAttribute('data-license', entry.license);
    tr.setAttribute('data-model', entry.model);

    tr.appendChild(buildCell('col-rank', String(rank)));

    var modelCell = buildCell('col-model');
    var file = logoFile(entry);
    if (file) {
      var img = document.createElement('img');
      img.className = 'model-logo';
      img.src = LOGO_DIR + file;
      img.alt = '';
      img.width = 16;
      img.height = 16;
      img.loading = 'lazy';
      modelCell.appendChild(img);
    }
    var name = document.createElement('span');
    name.className = 'model-name';
    name.textContent = displayName(entry);
    modelCell.appendChild(name);
    tr.appendChild(modelCell);

    var licenseCell = buildCell('col-license');
    var badge = document.createElement('span');
    badge.className = entry.license === 'Open-Source'
      ? 'badge badge-open'
      : 'badge badge-commercial';
    badge.textContent = entry.license;
    licenseCell.appendChild(badge);
    tr.appendChild(licenseCell);

    var tokensCell = buildCell('col-num', entry.avgTokens.toLocaleString('en-US'));
    tokensCell.setAttribute('data-value', String(entry.avgTokens));
    tr.appendChild(tokensCell);

    var accCell = buildCell('col-num', entry.accuracy.toFixed(1));
    accCell.setAttribute('data-value', String(entry.accuracy));
    tr.appendChild(accCell);

    var scoreCell = buildCell('col-num col-score', entry.ockScore.toFixed(2));
    scoreCell.setAttribute('data-value', String(entry.ockScore));
    tr.appendChild(scoreCell);

    return tr;
  }

  function renderNotice(tbody, message) {
    var tr = document.createElement('tr');
    var td = buildCell('lb-notice', message);
    td.setAttribute('colspan', '6');
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  function render() {
    var tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    var visible = sortEntries(
      filterEntries(state.entries, state.showAll, state.licenseFilter),
      state.sortKey,
      state.sortDir
    );
    tbody.textContent = '';
    visible.forEach(function (entry, i) {
      tbody.appendChild(buildRow(entry, i + 1));
    });
    renderChart(visible);
    renderHeatmap(visible);
  }

  function updateToggleButton() {
    var btn = document.getElementById('toggle-models-btn');
    if (!btn) return;
    btn.textContent = state.showAll
      ? 'Show selected'
      : 'Show all ' + state.entries.length + ' settings';
  }

  function updateSortHeaders() {
    var heads = document.querySelectorAll('th[data-sort]');
    for (var i = 0; i < heads.length; i++) {
      var th = heads[i];
      var active = th.getAttribute('data-sort') === state.sortKey;
      th.classList.remove('sort-asc', 'sort-desc');
      if (active) {
        th.classList.add(state.sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
        th.setAttribute('aria-sort', state.sortDir === 'asc' ? 'ascending' : 'descending');
      } else {
        th.removeAttribute('aria-sort');
      }
    }
  }

  function initSorting() {
    var heads = document.querySelectorAll('th[data-sort]');
    for (var i = 0; i < heads.length; i++) {
      (function (th) {
        th.addEventListener('click', function () {
          var key = th.getAttribute('data-sort');
          if (state.sortKey === key) {
            state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
          } else {
            state.sortKey = key;
            state.sortDir = 'desc';
          }
          updateSortHeaders();
          render();
        });
      })(heads[i]);
    }
    updateSortHeaders();
  }

  function initToggle() {
    var btn = document.getElementById('toggle-models-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      state.showAll = !state.showAll;
      updateToggleButton();
      render();
    });
  }

  function updateLicenseFilterUI() {
    var group = document.getElementById('license-filter');
    if (!group) return;
    var buttons = group.querySelectorAll('button[data-filter]');
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute('data-filter') === state.licenseFilter;
      buttons[i].classList.toggle('is-active', active);
      buttons[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function initLicenseFilter() {
    var group = document.getElementById('license-filter');
    if (!group) return;
    var buttons = group.querySelectorAll('button[data-filter]');
    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          state.licenseFilter = btn.getAttribute('data-filter') || FILTER_ALL;
          updateLicenseFilterUI();
          render();
        });
      })(buttons[i]);
    }
  }

  // Shareable state: ?all=1 shows every setting, ?license=Commercial|Open-Source
  // preselects the license filter. No params = the usual defaults.
  function initURLState() {
    var params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (err) {
      return;
    }
    if (params.get('all') === '1') state.showAll = true;
    var license = params.get('license');
    if (license === 'Commercial' || license === 'Open-Source') {
      state.licenseFilter = license;
    }
  }

  function setModelCounts(n) {
    var els = document.querySelectorAll('.model-count');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = String(n);
    }
  }

  function loadLeaderboard() {
    var tbody = document.getElementById('leaderboard-body');
    fetch(CSV_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        state.entries = parseCSV(text);
        setModelCounts(state.entries.length);
        updateToggleButton();
        render();
      })
      .catch(function () {
        if (tbody) {
          tbody.textContent = '';
          renderNotice(tbody, 'Leaderboard data unavailable');
        }
        renderChart([]);
      });
  }

  // ── Scatter chart (Figure 2) ─────────────────────────────────
  // Reads the same `state` as the table: render() hands it the currently
  // visible entries on every state change. Point colors live in ock.css
  // (f-<family> classes) so the palette stays with the other design tokens.

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var CW = 680;
  var CH = 440;
  var CM = { t: 16, r: 18, b: 48, l: 48 };
  var X_TICKS = [[1000, '1k'], [10000, '10k'], [100000, '100k']];
  var X_DOM = [240, 160000];
  var Y_TICKS = [20, 40, 60, 80];
  var Y_DOM = [15, 95];

  var chartWrap = null;
  var chartSvg = null;
  var chartTip = null;
  var hotModel = null;

  function xPos(tokens) {
    var lo = Math.log10(X_DOM[0]);
    var hi = Math.log10(X_DOM[1]);
    return CM.l + (Math.log10(tokens) - lo) / (hi - lo) * (CW - CM.l - CM.r);
  }

  function yPos(accuracy) {
    return CM.t + (1 - (accuracy - Y_DOM[0]) / (Y_DOM[1] - Y_DOM[0])) * (CH - CM.t - CM.b);
  }

  function svgEl(tag, attrs, text) {
    var el = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) el.setAttribute(k, attrs[k]);
    }
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function setHot(model) {
    if (model === hotModel) return;
    var tbody = document.getElementById('leaderboard-body');
    if (hotModel) {
      if (chartSvg) {
        var prevPt = chartSvg.querySelector('.chart-pt.is-hot');
        if (prevPt) prevPt.classList.remove('is-hot');
      }
      if (tbody) {
        var prevRow = tbody.querySelector('tr.is-hot');
        if (prevRow) prevRow.classList.remove('is-hot');
      }
      if (heatBody) {
        var prevHeat = heatBody.querySelector('tr.is-hot');
        if (prevHeat) prevHeat.classList.remove('is-hot');
      }
    }
    hotModel = model;
    if (!model) return;
    if (chartSvg) {
      var pt = chartSvg.querySelector('.chart-pt[data-model="' + model + '"]');
      if (pt) pt.classList.add('is-hot');
    }
    if (tbody) {
      var row = tbody.querySelector('tr[data-model="' + model + '"]');
      if (row) row.classList.add('is-hot');
    }
    if (heatBody) {
      var heatRow = heatBody.querySelector('tr[data-model="' + model + '"]');
      if (heatRow) heatRow.classList.add('is-hot');
    }
  }

  function hideTooltip() {
    if (chartTip) chartTip.hidden = true;
  }

  function showTooltip(pt, entry) {
    if (!chartTip || !chartWrap) return;
    chartTip.textContent = '';
    var name = document.createElement('p');
    name.className = 'tip-name';
    name.textContent = displayName(entry);
    chartTip.appendChild(name);
    var meta = document.createElement('p');
    meta.className = 'tip-meta';
    meta.textContent = entry.category + ' · ' + entry.license;
    chartTip.appendChild(meta);
    var stats = document.createElement('p');
    stats.className = 'tip-stats';
    stats.textContent = 'ACC ' + entry.accuracy.toFixed(1) + '% · TOKENS ' +
      entry.avgTokens.toLocaleString('en-US');
    chartTip.appendChild(stats);
    var score = document.createElement('p');
    score.className = 'tip-stats';
    score.textContent = 'OCKSCORE ' + entry.ockScore.toFixed(2);
    chartTip.appendChild(score);

    chartTip.hidden = false;
    var wrapRect = chartWrap.getBoundingClientRect();
    var rect = pt.getBoundingClientRect();
    var tw = chartTip.offsetWidth;
    var th = chartTip.offsetHeight;
    var left = rect.left - wrapRect.left + rect.width / 2 - tw / 2;
    var top = rect.top - wrapRect.top - th - 10;
    if (left < 6) left = 6;
    if (left + tw > wrapRect.width - 6) left = wrapRect.width - tw - 6;
    if (top < 6) top = rect.top - wrapRect.top + rect.height + 10;
    if (top + th > wrapRect.height - 6) top = Math.max(6, wrapRect.height - th - 6);
    chartTip.style.left = left + 'px';
    chartTip.style.top = top + 'px';
  }

  function onPointEnter(g, pt, entry) {
    setHot(entry.model);
    g.parentNode.appendChild(g); // raise above its neighbors
    showTooltip(pt, entry);
  }

  function onPointLeave() {
    setHot(null);
    hideTooltip();
  }

  function renderChart(entries) {
    if (!chartSvg) return;
    while (chartSvg.firstChild) chartSvg.removeChild(chartSvg.firstChild);
    hotModel = null;
    hideTooltip();
    if (!entries || entries.length === 0) {
      chartSvg.appendChild(svgEl('text', {
        'class': 'chart-note',
        x: CW / 2,
        y: CH / 2,
        'text-anchor': 'middle',
      }, 'Leaderboard data unavailable'));
      return;
    }

    var i;
    var x;
    var y;

    // Gridlines, axes, tick labels, axis titles
    for (i = 0; i < Y_TICKS.length; i++) {
      y = yPos(Y_TICKS[i]);
      chartSvg.appendChild(svgEl('line', { 'class': 'chart-grid', x1: CM.l, y1: y, x2: CW - CM.r, y2: y }));
      chartSvg.appendChild(svgEl('text', { 'class': 'chart-tick', x: CM.l - 8, y: y + 3.5, 'text-anchor': 'end' }, String(Y_TICKS[i])));
    }
    for (i = 0; i < X_TICKS.length; i++) {
      x = xPos(X_TICKS[i][0]);
      chartSvg.appendChild(svgEl('line', { 'class': 'chart-grid', x1: x, y1: CM.t, x2: x, y2: CH - CM.b }));
      chartSvg.appendChild(svgEl('text', { 'class': 'chart-tick', x: x, y: CH - CM.b + 17, 'text-anchor': 'middle' }, X_TICKS[i][1]));
    }
    chartSvg.appendChild(svgEl('line', { 'class': 'chart-axis', x1: CM.l, y1: CM.t, x2: CM.l, y2: CH - CM.b }));
    chartSvg.appendChild(svgEl('line', { 'class': 'chart-axis', x1: CM.l, y1: CH - CM.b, x2: CW - CM.r, y2: CH - CM.b }));
    chartSvg.appendChild(svgEl('text', {
      'class': 'chart-axis-title',
      x: CM.l + (CW - CM.l - CM.r) / 2,
      y: CH - 10,
      'text-anchor': 'middle',
    }, 'AVG OUTPUT TOKENS · LOG SCALE'));
    chartSvg.appendChild(svgEl('text', {
      'class': 'chart-axis-title',
      'text-anchor': 'middle',
      transform: 'translate(15 ' + (CM.t + (CH - CM.t - CM.b) / 2) + ') rotate(-90)',
    }, 'ACCURACY (%)'));

    // Effort ladders: connect consecutive variants of one model
    var byModel = {};
    entries.forEach(function (entry) { byModel[entry.model] = entry; });
    for (i = 0; i < EFFORT_SERIES.length; i++) {
      var series = EFFORT_SERIES[i];
      for (var j = 0; j < series.length - 1; j++) {
        var a = byModel[series[j]];
        var b = byModel[series[j + 1]];
        if (a && b) {
          chartSvg.appendChild(svgEl('line', {
            'class': 'chart-ladder',
            x1: xPos(a.avgTokens), y1: yPos(a.accuracy),
            x2: xPos(b.avgTokens), y2: yPos(b.accuracy),
          }));
        }
      }
    }

    // Pareto frontier (maximize accuracy, minimize tokens)
    var frontier = paretoFrontier(entries);
    if (frontier.length > 1) {
      var d = frontier.map(function (entry, idx) {
        return (idx === 0 ? 'M' : 'L') +
          xPos(entry.avgTokens).toFixed(1) + ' ' + yPos(entry.accuracy).toFixed(1);
      }).join(' ');
      chartSvg.appendChild(svgEl('path', { 'class': 'chart-pareto', d: d }));
    }

    // Points: filled = commercial, hollow = open-source. Each point sits in
    // a <g> with an invisible hit circle so small marks stay easy to hover.
    entries.forEach(function (entry) {
      var hollow = entry.license === 'Open-Source';
      var cx = xPos(entry.avgTokens).toFixed(1);
      var cy = yPos(entry.accuracy).toFixed(1);
      var g = svgEl('g', {});
      g.appendChild(svgEl('circle', { 'class': 'chart-hit', cx: cx, cy: cy, r: 10, fill: 'transparent' }));
      var pt = svgEl('circle', {
        'class': 'chart-pt f-' + entry.category.toLowerCase() + (hollow ? ' is-open' : ''),
        'data-model': entry.model,
        cx: cx,
        cy: cy,
        r: 4.5,
      });
      g.appendChild(pt);
      g.addEventListener('mouseenter', function () { onPointEnter(g, pt, entry); });
      g.addEventListener('mouseleave', onPointLeave);
      chartSvg.appendChild(g);
    });

    // Legend note for the frontier, top-right where the plot is empty
    var lx = CW - CM.r;
    chartSvg.appendChild(svgEl('line', { 'class': 'chart-pareto', x1: lx - 124, y1: CM.t + 9, x2: lx - 98, y2: CM.t + 9 }));
    chartSvg.appendChild(svgEl('text', { 'class': 'chart-legend-note', x: lx - 90, y: CM.t + 12.5 }, 'PARETO FRONTIER'));
  }

  function initChart() {
    chartWrap = document.querySelector('.chart-wrap');
    chartSvg = document.getElementById('chart-scatter');
    chartTip = document.getElementById('chart-tip');
    if (chartSvg) {
      chartSvg.setAttribute('viewBox', '0 0 ' + CW + ' ' + CH);
      chartSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
    // Cross-highlight: delegate on the persistent tbody (rows are rebuilt
    // by render(), so per-row listeners would not survive).
    var tbody = document.getElementById('leaderboard-body');
    if (tbody) {
      tbody.addEventListener('mouseover', function (event) {
        var target = event.target;
        var tr = target && target.closest ? target.closest('tr[data-model]') : null;
        if (tr) setHot(tr.getAttribute('data-model'));
      });
      tbody.addEventListener('mouseout', function (event) {
        if (!event.relatedTarget || !tbody.contains(event.relatedTarget)) setHot(null);
      });
    }
  }

  // ── Per-domain heatmap (Figure 3) ──────────────────────────
  // Same pipeline as the scatter: render() hands over the currently
  // visible entries, so the grid always mirrors Table 1's rows and
  // order. The only figure-local state is the metric toggle.

  var HEAT_PAPER = [246, 243, 236];   // --paper
  var HEAT_ACCENT = [122, 46, 42];    // --accent
  var HEAT_INK = [33, 29, 17];        // --ink
  var HEAT_DEPTH_LO = 0.06;           // keep both ends off the pure pigments
  var HEAT_DEPTH_HI = 0.90;

  var heatFigure = null;
  var heatBody = null;
  var heatStage = null;
  var heatTip = null;
  var heatStrip = null;
  var heatLegendMin = null;
  var heatLegendMax = null;

  var heat = {
    loaded: false,
    byModel: {},
    metric: 'accuracy',
    accMin: 0, accMax: 0,
    tokMin: 0, tokMax: 0,
  };

  function mixRgb(base, target, t) {
    return [
      Math.round(base[0] + (target[0] - base[0]) * t),
      Math.round(base[1] + (target[1] - base[1]) * t),
      Math.round(base[2] + (target[2] - base[2]) * t),
    ];
  }

  function luminance(rgb) {
    function lin(c) {
      c /= 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  }

  // Normalize a cell value to a shading depth: linear over the global
  // accuracy range, log over the global token range.
  function heatDepth(value) {
    var t;
    if (heat.metric === 'accuracy') {
      t = heat.accMax > heat.accMin ? (value - heat.accMin) / (heat.accMax - heat.accMin) : 0;
    } else {
      var lo = Math.log(heat.tokMin);
      var hi = Math.log(heat.tokMax);
      t = hi > lo ? (Math.log(value) - lo) / (hi - lo) : 0;
    }
    t = Math.max(0, Math.min(1, t));
    return HEAT_DEPTH_LO + t * (HEAT_DEPTH_HI - HEAT_DEPTH_LO);
  }

  function cellColors(value) {
    var target = heat.metric === 'accuracy' ? HEAT_ACCENT : HEAT_INK;
    var bg = mixRgb(HEAT_PAPER, target, heatDepth(value));
    // Switch to paper text once the fill is dark enough that ink would strain.
    var fg = luminance(bg) > 0.19 ? '#211d17' : '#f6f3ec';
    return { bg: 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')', fg: fg };
  }

  function heatText(d) {
    return heat.metric === 'accuracy'
      ? d.accuracy.toFixed(1)
      : d.avgTokens.toLocaleString('en-US');
  }

  function updateHeatLegend() {
    if (!heatStrip) return;
    var isAcc = heat.metric === 'accuracy';
    heatStrip.classList.toggle('is-accuracy', isAcc);
    heatStrip.classList.toggle('is-tokens', !isAcc);
    if (heatLegendMin) {
      heatLegendMin.textContent = isAcc ? heat.accMin.toFixed(1) : heat.tokMin.toLocaleString('en-US');
    }
    if (heatLegendMax) {
      heatLegendMax.textContent = isAcc ? heat.accMax.toFixed(1) : heat.tokMax.toLocaleString('en-US');
    }
  }

  function hideHeatTip() {
    if (heatTip) heatTip.hidden = true;
  }

  function showHeatTip(td, model) {
    if (!heatTip || !heatStage) return;
    var domain = td.getAttribute('data-domain');
    var d = heat.byModel[model] && heat.byModel[model][domain];
    if (!d) return;
    heatTip.textContent = '';
    var name = document.createElement('p');
    name.className = 'tip-name';
    name.textContent = displayName({ model: model });
    heatTip.appendChild(name);
    var meta = document.createElement('p');
    meta.className = 'tip-meta';
    meta.textContent = domain;
    heatTip.appendChild(meta);
    var stats = document.createElement('p');
    stats.className = 'tip-stats';
    stats.textContent = 'ACC ' + d.accuracy.toFixed(1) + '% · TOKENS ' +
      d.avgTokens.toLocaleString('en-US');
    heatTip.appendChild(stats);
    var frac = document.createElement('p');
    frac.className = 'tip-stats';
    frac.textContent = 'CORRECT ' + d.correct + '/' + d.total;
    heatTip.appendChild(frac);

    heatTip.hidden = false;
    var stageRect = heatStage.getBoundingClientRect();
    var rect = td.getBoundingClientRect();
    var tw = heatTip.offsetWidth;
    var th = heatTip.offsetHeight;
    var left = rect.left - stageRect.left + rect.width / 2 - tw / 2;
    var top = rect.top - stageRect.top - th - 8;
    if (left < 6) left = 6;
    if (left + tw > stageRect.width - 6) left = stageRect.width - tw - 6;
    if (top < 6) top = rect.top - stageRect.top + rect.height + 8;
    heatTip.style.left = left + 'px';
    heatTip.style.top = top + 'px';
  }

  function renderHeatmap(visible) {
    if (!heatBody || !heat.loaded) return;
    hideHeatTip();
    heatBody.textContent = '';
    visible.forEach(function (entry) {
      var tr = document.createElement('tr');
      tr.setAttribute('data-model', entry.model);
      tr.appendChild(buildCell('col-model', displayName(entry)));
      var rec = heat.byModel[entry.model];
      DOMAINS.forEach(function (domain) {
        var d = rec && rec[domain];
        var td = buildCell('heat-cell', d ? heatText(d) : '\u2014');
        if (d) {
          td.setAttribute('data-domain', domain);
          var colors = cellColors(heat.metric === 'accuracy' ? d.accuracy : d.avgTokens);
          td.style.backgroundColor = colors.bg;
          td.style.color = colors.fg;
        } else {
          td.classList.add('is-empty');
        }
        tr.appendChild(td);
      });
      heatBody.appendChild(tr);
    });
    updateHeatLegend();
  }

  function updateHeatMetricUI() {
    var group = document.getElementById('heat-metric');
    if (!group) return;
    var buttons = group.querySelectorAll('button[data-metric]');
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute('data-metric') === heat.metric;
      buttons[i].classList.toggle('is-active', active);
      buttons[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function initHeatmap() {
    heatFigure = document.getElementById('heat-figure');
    heatBody = document.getElementById('heatmap-body');
    heatStage = document.querySelector('.heat-stage');
    heatTip = document.getElementById('heat-tip');
    heatStrip = document.getElementById('heat-strip');
    heatLegendMin = document.getElementById('heat-legend-min');
    heatLegendMax = document.getElementById('heat-legend-max');
    if (!heatFigure || !heatBody) return;

    var group = document.getElementById('heat-metric');
    if (group) {
      var buttons = group.querySelectorAll('button[data-metric]');
      for (var i = 0; i < buttons.length; i++) {
        (function (btn) {
          btn.addEventListener('click', function () {
            heat.metric = btn.getAttribute('data-metric') || 'accuracy';
            updateHeatMetricUI();
            render();
          });
        })(buttons[i]);
      }
      updateHeatMetricUI();
    }

    // Cross-highlight + tooltip: delegate on the persistent tbody (rows
    // are rebuilt by render(), so per-row listeners would not survive).
    heatBody.addEventListener('mouseover', function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      var tr = target.closest('tr[data-model]');
      if (tr) setHot(tr.getAttribute('data-model'));
      var td = target.closest('td[data-domain]');
      if (td && tr) {
        showHeatTip(td, tr.getAttribute('data-model'));
      } else {
        hideHeatTip();
      }
    });
    heatBody.addEventListener('mouseout', function (event) {
      if (!event.relatedTarget || !heatBody.contains(event.relatedTarget)) {
        setHot(null);
        hideHeatTip();
      }
    });
  }

  function loadHeatmap() {
    if (!heatFigure) return;
    fetch(HEAT_CSV_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        heat.byModel = parseDomainCSV(text);
        var acc = [];
        var tok = [];
        Object.keys(heat.byModel).forEach(function (model) {
          DOMAINS.forEach(function (domain) {
            var d = heat.byModel[model][domain];
            if (!d || !isFinite(d.accuracy) || !isFinite(d.avgTokens) || d.avgTokens <= 0) return;
            acc.push(d.accuracy);
            tok.push(d.avgTokens);
          });
        });
        if (!acc.length || !tok.length) throw new Error('no usable rows');
        heat.accMin = Math.min.apply(null, acc);
        heat.accMax = Math.max.apply(null, acc);
        heat.tokMin = Math.min.apply(null, tok);
        heat.tokMax = Math.max.apply(null, tok);
        heat.loaded = true;
        render();
      })
      .catch(function () {
        // No per-domain data: remove the figure quietly, leave the page.
        if (heatFigure && heatFigure.parentNode) heatFigure.parentNode.removeChild(heatFigure);
        heatFigure = null;
        heatBody = null;
        heatTip = null;
      });
  }

  // ── BibTeX copy ─────────────────────────────────────────────────────

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (err) {
        reject(err);
      }
      document.body.removeChild(ta);
    });
  }

  function initBibtexCopy() {
    var btn = document.getElementById('copy-bibtex-btn');
    var code = document.getElementById('bibtex-code');
    if (!btn || !code) return;
    btn.addEventListener('click', function () {
      copyText(code.textContent).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () {
          btn.textContent = original;
        }, 2000);
      }).catch(function () { /* clipboard unavailable — leave the page quiet */ });
    });
  }

  // ── Boot ────────────────────────────────────────────────────────────

  function init() {
    initURLState();
    initSorting();
    initToggle();
    initLicenseFilter();
    updateLicenseFilterUI();
    initBibtexCopy();
    initChart();
    initHeatmap();
    loadLeaderboard();
    loadHeatmap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

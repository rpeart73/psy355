/* PSY355 Companion: the course source library. Vanilla JS, no build step, no framework.
   Organized by WEEK (the course arc): learning, mindset, resilience, and wellbeing
   readings for PSY355. A companion to Blackboard: no accounts, no grading,
   no student-to-student interaction.
   Saved + compare live on the student's own device (localStorage). */
(function () {
  'use strict';
  var D = window.PSY355;
  var MC = window.PSY355_MC || {};
  if (!D) { document.getElementById('app').textContent = 'Course data did not load.'; return; }
  var HAS_EYE = !!(D.course && D.course.frame);

  var SKEY = 'psy355corpus.v2';
  var VKEY = SKEY + '.view.v1';
  var HKEY = SKEY + '.hardResetNext';
  function load() { try { var o = JSON.parse(localStorage.getItem(SKEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function persist() { try { localStorage.setItem(SKEY, JSON.stringify({ saved: state.saved, cmpNotes: state.cmpNotes, rcNotes: state.rcNotes, sgNotes: state.sgNotes, sgTick: state.sgTick, ecoChallenge: state.ecoChallenge, ecoNotes: state.ecoNotes, wkCheck: state.wkCheck, wkReflect: state.wkReflect, actResult: state.actResult, mcSel: state.mcSel, mcConf: state.mcConf, kcShort: state.kcShort, kcShortRate: state.kcShortRate, kcHist: state.kcHist, mediaNotes: state.mediaNotes, careerReflect: state.careerReflect, rl: state.rl })); } catch (e) {} }
  function loadView() { try { var o = JSON.parse(sessionStorage.getItem(VKEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function clearView() { try { sessionStorage.removeItem(VKEY); sessionStorage.removeItem(HKEY); } catch (e) {} }
  function shouldResumeView(v) {
    var hard = false;
    try { hard = sessionStorage.getItem(HKEY) === '1'; sessionStorage.removeItem(HKEY); } catch (e) {}
    if (hard) { clearView(); return false; }
    return !!(v && v.screen);
  }
  function cleanScreen(s) {
    return ['journey', 'site', 'library', 'station', 'detail', 'pathways', 'videos', 'readings', 'compare', 'reading', 'glossary', 'cards', 'assignments', 'career', 'activity', 'ecology'].indexOf(s) >= 0 ? s : 'journey';
  }
  function cleanWeek(w) {
    w = Number(w);
    return (isFinite(w) && w >= 1 && w <= 20) ? w : null;
  }
  function cleanWeekPart(part) {
    part = String(part || '');
    return ['ov', 'pre', 'learn', 'out', 'gq', 'lens', 'con', 'term', 'read', 'watch', 'case', 'do', 'reflect', 'sg', 'kc', 'notes', 'how', 'catch'].indexOf(part) >= 0 ? part : null;
  }
  function initialRoute() {
    try {
      var p = new URLSearchParams(location.search || '');
      var w = cleanWeek(p.get('week') || p.get('w'));
      if (w) return { screen: 'station', week: w, part: cleanWeekPart(p.get('part')) };
    } catch (e) {}
    return null;
  }
  var saved0 = load();
  var view0 = loadView();
  var route0 = initialRoute();
  var resumeView0 = shouldResumeView(view0);
  var routePart0 = route0 && route0.part;

  var state = {
    screen: route0 ? route0.screen : (resumeView0 ? cleanScreen(view0.screen) : 'journey'),
    prevView: (resumeView0 && view0.prevView && typeof view0.prevView === 'object') ? view0.prevView : null,
    navOpen: false,
    readerLensOpen: false,
    readerLensX: 84,
    readerLensY: 86,
    journeyWeek: route0 ? route0.week : (resumeView0 ? cleanWeek(view0.journeyWeek) : null),
    stationWeek: route0 ? route0.week : (resumeView0 ? cleanWeek(view0.stationWeek) : null),
    sgNotes: (saved0.sgNotes || {}),
    sgTick: (saved0.sgTick || {}),
    wkCheck: (saved0.wkCheck && typeof saved0.wkCheck === 'object') ? saved0.wkCheck : {},
    wkReflect: (saved0.wkReflect && typeof saved0.wkReflect === 'object') ? saved0.wkReflect : {},
    act: (resumeView0 && view0.act && typeof view0.act === 'object') ? view0.act : {},
    actResult: (saved0.actResult && typeof saved0.actResult === 'object') ? saved0.actResult : {},
    layout: 'byweek',
    search: '',
    activeTypes: [],
    activeWeek: null,
    sort: 'week',
    detailId: null,
    compareIds: [],
    saved: Array.isArray(saved0.saved) ? saved0.saved : [],
    introOpen: true,
    savedView: false,
    showSynthesis: false,
    lens: 'thematic',
    cmpNotes: (saved0.cmpNotes && typeof saved0.cmpNotes === 'object') ? saved0.cmpNotes : {},
    showModel: false,
    exampleOpen: false,
    rcReading: null,
    rcNotes: (saved0.rcNotes && typeof saved0.rcNotes === 'object') ? saved0.rcNotes : {},
    ecoChallenge: saved0.ecoChallenge || '',
    ecoNotes: (saved0.ecoNotes && typeof saved0.ecoNotes === 'object') ? saved0.ecoNotes : {},
    ecoLayer: 'you',
    revealed: {},
    mcSel: (saved0.mcSel && typeof saved0.mcSel === 'object') ? saved0.mcSel : {},
    mcConf: (saved0.mcConf && typeof saved0.mcConf === 'object') ? saved0.mcConf : {},
    kcReveal: {},
    kcShort: (saved0.kcShort && typeof saved0.kcShort === 'object') ? saved0.kcShort : {},
    kcShortShown: {},
    kcShortRate: (saved0.kcShortRate && typeof saved0.kcShortRate === 'object') ? saved0.kcShortRate : {},
    kcHist: (saved0.kcHist && typeof saved0.kcHist === 'object') ? saved0.kcHist : {},
    careerField: resumeView0 ? (view0.careerField || '') : '',
    careerReflect: (saved0.careerReflect && typeof saved0.careerReflect === 'object') ? saved0.careerReflect : {},
    mediaNotes: (saved0.mediaNotes && typeof saved0.mediaNotes === 'object') ? saved0.mediaNotes : {},
    libScroll: 0,
    toast: null,
    cardWeek: resumeView0 ? cleanWeek(view0.cardWeek) : null,
    glossWeek: resumeView0 ? (view0.glossWeek || 'all') : 'all',
    glossSearch: resumeView0 ? (view0.glossSearch || '') : '',
    videoWeek: resumeView0 ? (view0.videoWeek || 'all') : 'all',
    mediaKind: resumeView0 ? (view0.mediaKind || 'all') : 'all',
  };
  if (resumeView0) {
    state.activityReturn = cleanWeek(view0.activityReturn);
    state.detailId = view0.detailId || null;
    state.activeTypes = Array.isArray(view0.activeTypes) ? view0.activeTypes : [];
    state.activeWeek = cleanWeek(view0.activeWeek);
    state.search = view0.search || '';
    state.savedView = !!view0.savedView;
    state.rcReading = view0.rcReading || null;
    state.lens = view0.lens || state.lens || 'thematic';
    state.compareIds = Array.isArray(view0.compareIds) ? view0.compareIds : [];
    state.showSynthesis = !!view0.showSynthesis;
    state.galWeek = cleanWeek(view0.galWeek);
    state.galTopic = view0.galTopic || null;
    state.ecoLayer = view0.ecoLayer || state.ecoLayer || 'you';
  }
  function saveView() {
    try {
      sessionStorage.setItem(VKEY, JSON.stringify({
        screen: state.screen,
        prevView: state.prevView || null,
        journeyWeek: state.journeyWeek,
        stationWeek: state.stationWeek,
        activityReturn: state.activityReturn,
        detailId: state.detailId,
        cardWeek: state.cardWeek,
        careerField: state.careerField,
        activeTypes: state.activeTypes || [],
        activeWeek: state.activeWeek,
        search: state.search || '',
        savedView: !!state.savedView,
        rcReading: state.rcReading,
        lens: state.lens || 'thematic',
        compareIds: state.compareIds || [],
        showSynthesis: !!state.showSynthesis,
        galWeek: state.galWeek,
        galTopic: state.galTopic,
        glossWeek: state.glossWeek || 'all',
        glossSearch: state.glossSearch || '',
        ecoLayer: state.ecoLayer || 'you',
        act: state.act || {},
        videoWeek: state.videoWeek || 'all',
        mediaKind: state.mediaKind || 'all'
      }));
    } catch (e) {}
  }
  window.addEventListener('pagehide', saveView);
  window.addEventListener('beforeunload', saveView);
  window.addEventListener('keydown', function (e) {
    var k = String(e.key || '').toLowerCase();
    if (((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'r') || (e.ctrlKey && k === 'f5')) {
      try { sessionStorage.setItem(HKEY, '1'); sessionStorage.removeItem(VKEY); } catch (err) {}
    }
  }, true);
  var refocusSearch = false, focusTarget = null, toastTimer = null;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function typeMeta(t) { return D.types[t] || D.types.Article; }
  function rec(id) { for (var i = 0; i < D.records.length; i++) if (D.records[i].id === id) return D.records[i]; return null; }
  var OPENSTAX_CH = {
    'soc-intro': 'https://openstax.org/books/introduction-sociology-3e/pages/1-introduction',
    'soc-research': 'https://openstax.org/books/introduction-sociology-3e/pages/2-introduction',
    'soc-socialization': 'https://openstax.org/books/introduction-sociology-3e/pages/5-introduction',
    'soc-stratification': 'https://openstax.org/books/introduction-sociology-3e/pages/9-introduction',
    'soc-family': 'https://openstax.org/books/introduction-sociology-3e/pages/14-introduction',
    'anth-culture': 'https://openstax.org/books/introduction-anthropology/pages/3-introduction',
    'psy-intro': 'https://openstax.org/books/psychology-2e/pages/1-introduction',
    'psy-social': 'https://openstax.org/books/psychology-2e/pages/12-introduction'
  };
  // Only free, openly accessible readings get a public link. Copyrighted or
  // library readings (access 'verified' or 'library') are reached through
  // Blackboard or the Seneca Library, never linked or hosted here (copyright).
  function readUrl(r) {
    return r.pdfUrl || r.url || (r.doi ? 'https://doi.org/' + r.doi : null);
  }
  function sourceUrl(r) {
    var primary = readUrl(r);
    var source = r.sourceUrl || r.landingUrl || r.recordUrl || ((r.pdfUrl && r.url) ? r.url : null) || (r.doi ? 'https://doi.org/' + r.doi : null);
    return (source && source !== primary) ? source : null;
  }
  function sourceLabel(r) {
    if (r.sourceLabel) return r.sourceLabel;
    return r.doi ? 'Source page / DOI' : 'Source page';
  }
  function sourceButton(r) {
    if (!sourceUrl(r)) return '';
    return '<button onclick="SOC.source(\'' + r.id + '\')" style="width:100%;margin:8px 0 9px;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:#fff;border:1px solid #DEE3EA;color:#1552D8;border-radius:9px;padding:9px 11px;font-size:.8125rem;font-weight:600;cursor:pointer">' + esc(sourceLabel(r)) + '<span style="display:flex">' + ic('external', 14) + '</span></button>';
  }
  function isPdfReading(r) {
    var u = readUrl(r) || '';
    return !!r.pdfUrl || /\.pdf($|[?#])/i.test(u) || /\/article\/download\/|\/servlets\/purl\/|arxiv\.org\/pdf|EIMJ20241604_09|\/jonus\/index\.php\/jonus\/article\/download\//.test(u);
  }
  function readLabel(r) {
    if (r.fulltext === false) return 'Find it in the Seneca Library';
    return isPdfReading(r) ? 'Open the PDF' : 'Open the reading';
  }
  function accessNote(r) {
    if (r.access === 'openstax') return 'Free and open on OpenStax. Opens in a new tab.';
    if (r.access === 'open' || r.access === 'openaccess') return 'Open access. Opens in a new tab.';
    if (r.access === 'library') return 'A licensed reading. Read it through the Seneca Library, and in this week\'s Readings folder on Blackboard.';
    return 'Posted in this week\'s Readings folder on Blackboard.';
  }
  function eyeLabel(r) { return r.eye === 'indigenous' ? 'Indigenous-scholar reading' : 'Western reading'; }
  function weekTitle(n) { return (D.weeks && D.weeks[n]) ? D.weeks[n] : ''; }
  function weeksWithReadings() { var set = {}; D.records.forEach(function (r) { set[r.week] = (set[r.week] || 0) + 1; }); return Object.keys(set).map(Number).sort(function (a, b) { return a - b; }); }
  function weeksWithContent() { var set = {}; D.records.forEach(function (r) { set[r.week] = 1; }); (D.glossary || []).forEach(function (g) { if (g.week != null) set[g.week] = 1; }); return Object.keys(set).map(Number).sort(function (a, b) { return a - b; }); }
  function templatedSynthesis(recs) {
    function who(r) { return r.authors.indexOf('OpenStax') >= 0 ? 'OpenStax' : r.authors; }
    function lower(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
    function trim(s) { return s.replace(/\.\s*$/, ''); }
    var west = recs.filter(function (r) { return r.eye === 'western'; });
    var ind = recs.filter(function (r) { return r.eye === 'indigenous'; });
    var both = west.length && ind.length;
    var named = recs.map(function (r) { return r.title + ' by ' + who(r); });
    var lead = recs.length === 2
      ? 'This compares ' + named[0] + ' and ' + named[1] + '.'
      : 'This compares ' + named.slice(0, -1).join(', ') + ', and ' + named[named.length - 1] + '.';
    var ideas = recs.map(function (r, i) {
      var ord = recs.length === 2 ? (i === 0 ? 'The first' : 'The second') : ('The ' + (['first', 'second', 'third'][i] || 'next'));
      return ord + ' says that ' + lower(trim(r.coreIdea)) + '.';
    }).join(' ');
    var rel = !HAS_EYE
      ? 'Read them together for how the same ideas and approaches play out across different topics.'
      : (both
      ? 'These include a Western reading and an Indigenous one. The course asks you to read them together rather than choose between them.'
      : (ind.length
        ? 'Both are by Indigenous scholars. Read them for how Indigenous knowledge applies to different topics.'
        : 'Both are Western readings. Read them for how the same approach applies to different topics.'));
    var close = 'Reading them together shows what you would miss from ' + (recs.length === 2 ? 'either one' : 'any one') + ' alone.';
    return [lead + ' ' + ideas + ' ' + rel + ' ' + close];
  }
  function pairText(a, b) {
    var k = [a.id, b.id].sort().join('|');
    return (D.syntheses && D.syntheses[k]) ? D.syntheses[k] : templatedSynthesis([a, b])[0];
  }
  function surnameOf(r) {
    var first = String(r.authors).replace(/\s*\([^)]*\)/g, '').split(',')[0].split(' and ')[0].split('&')[0].trim();
    var parts = first.split(' ');
    return parts.length > 3 ? first : parts[parts.length - 1];
  }
  function tripleLead(recs) {
    var names = recs.map(surnameOf);
    var listed = recs.map(function (r) { return r.title + ' (' + surnameOf(r) + ', Week ' + r.week + ')'; });
    return 'Holding three at once: ' + listed[0] + '; ' + listed[1] + '; and ' + listed[2] + '. A three-way comparison is really three relationships, so each pairing is taken in turn below: ' + names[0] + ' with ' + names[1] + ', then ' + names[0] + ' with ' + names[2] + ', then ' + names[1] + ' with ' + names[2] + '. Notice what each pairing sharpens, and what only appears when all three are on the table.';
  }
  function buildSynthesis(recs) {
    if (recs.length <= 2) {
      if (recs.length === 2) return { paras: [pairText(recs[0], recs[1])] };
      return { paras: templatedSynthesis(recs) };
    }
    var paras = [tripleLead(recs)];
    for (var i = 0; i < recs.length; i++) for (var j = i + 1; j < recs.length; j++) paras.push(pairText(recs[i], recs[j]));
    return { paras: paras };
  }

  var ICON = {
    book: ['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z', 'M4 18.5A2.5 2.5 0 0 1 6.5 16H20'],
    file: ['M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z', 'M14 3v5h5'],
    clipboard: ['M9 4.5h6v3H9z', 'M9 6H6v15h12V6h-3'],
    search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M20 20l-4-4'],
    x: ['M6 6l12 12', 'M18 6L6 18'],
    check: ['M4 12.5l5 5 11-11'],
    bookmark: ['M6 3h12v18l-6-4-6 4z'],
    grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
    columns: ['M4 4h7v16H4z', 'M13 4h7v16h-7z'],
    sparkle: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'],
    chevron: ['M9 6l6 6-6 6'],
    external: ['M14 4h6v6', 'M20 4l-9 9', 'M19 14v5H5V5h5'],
    plus: ['M12 5v14', 'M5 12h14'],
    clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
    globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20', 'M12 2a15 15 0 0 0 0 20'],
    gauge: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 12l4-3'],
    calendar: ['M5 5h14v15H5z', 'M5 9h14', 'M9 3v4', 'M15 3v4'],
    type: ['M4 7V5h16v2', 'M9 19h6', 'M12 5v14'],
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
    unlock: ['M7 11V8a5 5 0 0 1 9.9-1', 'M5 11h14v10H5z'],
    play: ['M7 5l11 7-11 7z'],
    gallery: ['M3 5h18v14H3z', 'M3 16l5-5 4 4 3-3 6 6', 'M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2'],
  };
  function ic(name, size, w) {
    var paths = ICON[name] || ICON.file, s = size || 20;
    var out = '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    for (var i = 0; i < paths.length; i++) out += '<path d="' + paths[i] + '"></path>';
    return out + '</svg>';
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function announce(msg) {
    var lr = document.getElementById('soc-live');
    if (lr) { lr.textContent = ''; setTimeout(function () { lr.textContent = msg; }, 30); }
  }
  function readerLensButton() {
    var on = !!state.rlPanelOpen;
    return '<button type="button" class="reader-lens-btn' + (on ? ' on' : '') + '" onclick="SOC.rlPanel()" aria-pressed="' + (on ? 'true' : 'false') + '" aria-expanded="' + (on ? 'true' : 'false') + '" aria-label="Reading Lens: open reading supports" title="Reading Lens: text size, spacing, font, tint, ruler, magnifier, read aloud">' + ic('search', 17, 2) + '<span class="reader-lens-label">Reading Lens</span></button>';
  }
  function readerLensOverlay() {
    if (!state.readerLensOpen) return '';
    return '<section id="reader-lens-dock" class="rl-dock" role="region" aria-label="Reading magnifier">'
      + '<div class="rl-dock-head"><strong>' + ic('search', 15, 2) + ' Magnifier</strong>'
      + '<span class="rl-dock-hint">Shows the text under your pointer in large print. Keyboard: Tab to any item and it appears here. Escape turns it off.</span>'
      + '<button type="button" class="rl-btn rl-close" onclick="SOC.toggleReaderLens()" aria-label="Turn magnifier off">' + ic('x', 15, 2) + '</button></div>'
      + '<div id="reader-lens-copy" class="rl-dock-copy" aria-hidden="true">Move your pointer over any text, or Tab through the page.</div>'
      + '</section>';
  }
  var rlDockRaf = 0;
  function readerLensTextAt(x, y) {
    var dock = document.getElementById('reader-lens-dock');
    var stack = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [document.elementFromPoint(x, y)];
    var allowed = /^(p|li|h1|h2|h3|h4|h5|h6|blockquote|td|th|figcaption|label|button|a|summary|small|strong|b)$/;
    for (var i = 0; i < stack.length; i++) {
      var node = stack[i];
      if (dock && dock.contains(node)) continue;
      while (node && node !== document.body) {
        if (dock && dock.contains(node)) break;
        var tag = String(node.tagName || '').toLowerCase();
        if (allowed.test(tag)) {
          var text = (node.textContent || '').replace(/\\s+/g, ' ').trim();
          if (text) return text.length > 700 ? text.slice(0, 697) + '...' : text;
        }
        node = node.parentElement;
      }
    }
    return '';
  }
  function rlDockShow(text) {
    var out = document.getElementById('reader-lens-copy');
    if (out && text) out.textContent = text;
  }
  function rlDockPointer(e) {
    if (rlDockRaf) return;
    var x = e.clientX, y = e.clientY;
    rlDockRaf = requestAnimationFrame(function () {
      rlDockRaf = 0;
      rlDockShow(readerLensTextAt(x, y));
    });
  }
  function rlDockFocus(e) {
    var dock = document.getElementById('reader-lens-dock');
    if (!e.target || (dock && dock.contains(e.target))) return;
    var text = (e.target.textContent || e.target.getAttribute && e.target.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim();
    if (text) rlDockShow(text.length > 700 ? text.slice(0, 697) + '...' : text);
  }
  function rlDockKey(e) {
    if (e.key === 'Escape' && state.readerLensOpen) { SOC.toggleReaderLens(); }
  }
  function rlDockWire(on) {
    if (on) {
      document.addEventListener('pointermove', rlDockPointer, true);
      document.addEventListener('focusin', rlDockFocus, true);
      document.addEventListener('keydown', rlDockKey, true);
    } else {
      document.removeEventListener('pointermove', rlDockPointer, true);
      document.removeEventListener('focusin', rlDockFocus, true);
      document.removeEventListener('keydown', rlDockKey, true);
    }
  }

  /* ---------- Reading Supports (Reading Lens v2) ---------- */
  function rlState() {
    if (!state.rl || typeof state.rl !== 'object') state.rl = {};
    var r = state.rl;
    if ([100, 115, 130, 150, 175].indexOf(r.zoom) < 0) r.zoom = 100;
    if (['none', 'cream', 'blue', 'grey'].indexOf(r.tint) < 0) r.tint = 'none';
    r.space = !!r.space; r.font = !!r.font; r.ruler = !!r.ruler;
    if ([85, 100, 115].indexOf(r.rate) < 0) r.rate = 100;
    return r;
  }
  var rlRulerY = 220, rlRulerRaf = 0, rlSpeaking = false, rlSpeakIdx = -1, rlSpeakBlocks = [];
  function rlRefocus() { setTimeout(function () { var p = document.getElementById('rl-panel'); if (p) p.focus(); }, 0); }
  function rlApply() {
    var r = rlState(), root = document.documentElement;
    ['rl-z115', 'rl-z130', 'rl-z150', 'rl-z175'].forEach(function (c) { root.classList.remove(c); });
    if (r.zoom !== 100) root.classList.add('rl-z' + r.zoom);
    root.classList.toggle('rl-space', r.space);
    root.classList.toggle('rl-font', r.font);
    var tint = document.getElementById('rl-tint');
    if (r.tint !== 'none') {
      if (!tint) { tint = document.createElement('div'); tint.id = 'rl-tint'; document.body.appendChild(tint); }
      tint.style.background = r.tint === 'cream' ? 'rgba(255,236,190,.34)' : r.tint === 'blue' ? 'rgba(199,222,255,.34)' : 'rgba(214,219,227,.4)';
    } else if (tint) { tint.remove(); }
    rlRulerApply();
  }
  function rlRulerParts() {
    return { top: document.getElementById('rl-ruler-top'), band: document.getElementById('rl-ruler-band'), bot: document.getElementById('rl-ruler-bot') };
  }
  function rlRulerApply() {
    var r = rlState(), p = rlRulerParts();
    if (r.ruler) {
      if (!p.top) {
        ['rl-ruler-top', 'rl-ruler-band', 'rl-ruler-bot'].forEach(function (id) {
          var d = document.createElement('div'); d.id = id; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d);
        });
        document.addEventListener('pointermove', rlRulerFollow, true);
        document.addEventListener('keydown', rlRulerKeys, true);
      }
      rlRulerPosition();
    } else if (p.top) {
      p.top.remove(); p.band.remove(); p.bot.remove();
      document.removeEventListener('pointermove', rlRulerFollow, true);
      document.removeEventListener('keydown', rlRulerKeys, true);
    }
  }
  function rlRulerPosition() {
    var p = rlRulerParts();
    if (!p.top) return;
    var fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    var half = Math.round(fs * 1.6);
    var y = Math.max(70, Math.min(window.innerHeight - 40, rlRulerY));
    p.top.style.cssText = 'position:fixed;left:0;right:0;top:0;height:' + Math.max(0, y - half) + 'px;pointer-events:none;z-index:61;background:rgba(27,42,74,.32)';
    p.band.style.cssText = 'position:fixed;left:0;right:0;top:' + (y - half) + 'px;height:' + (half * 2) + 'px;pointer-events:none;z-index:62;border-top:2px solid rgba(218,41,28,.7);border-bottom:2px solid rgba(218,41,28,.7)';
    p.bot.style.cssText = 'position:fixed;left:0;right:0;top:' + (y + half) + 'px;bottom:0;pointer-events:none;z-index:61;background:rgba(27,42,74,.32)';
  }
  function rlRulerFollow(e) {
    rlRulerY = e.clientY;
    if (!rlRulerRaf) rlRulerRaf = requestAnimationFrame(function () { rlRulerRaf = 0; rlRulerPosition(); });
  }
  function rlRulerKeys(e) {
    if (!e.altKey || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    e.preventDefault();
    rlRulerY += (e.key === 'ArrowDown' ? 34 : -34);
    rlRulerPosition();
  }
  function rlSpeakStop() {
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    rlSpeaking = false; rlSpeakIdx = -1;
    var cur = document.querySelector('.rl-reading-now');
    if (cur) cur.classList.remove('rl-reading-now');
    var b = document.getElementById('rl-speak-btn');
    if (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = 'Read this page aloud'; }
  }
  function rlSpeakNext() {
    if (!rlSpeaking) return;
    rlSpeakIdx++;
    var prev = document.querySelector('.rl-reading-now');
    if (prev) prev.classList.remove('rl-reading-now');
    if (rlSpeakIdx >= rlSpeakBlocks.length) { rlSpeakStop(); announce('Finished reading the page aloud.'); return; }
    var el = rlSpeakBlocks[rlSpeakIdx];
    if (!el || !el.isConnected) { rlSpeakNext(); return; }
    el.classList.add('rl-reading-now');
    var reduced = false;
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    try { el.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); } catch (e) {}
    var u = new SpeechSynthesisUtterance(el.textContent.replace(/\s+/g, ' ').trim().slice(0, 2000));
    u.rate = rlState().rate / 100;
    u.onend = function () { setTimeout(rlSpeakNext, 120); };
    u.onerror = function () { rlSpeakStop(); };
    try { window.speechSynthesis.speak(u); } catch (e) { rlSpeakStop(); }
  }
  function rlSpeakToggle() {
    if (!('speechSynthesis' in window)) { announce('Read aloud is not available in this browser.'); return; }
    if (rlSpeaking) { rlSpeakStop(); announce('Stopped reading aloud.'); return; }
    var main = document.getElementById('soc-main');
    if (!main) return;
    rlSpeakBlocks = Array.prototype.slice.call(main.querySelectorAll('h1, h2, h3, h4, p, li'))
      .filter(function (el) { return el.offsetParent !== null && el.textContent.replace(/\s+/g, ' ').trim().length > 2; });
    if (!rlSpeakBlocks.length) { announce('Nothing to read on this page.'); return; }
    rlSpeaking = true; rlSpeakIdx = -1;
    var b = document.getElementById('rl-speak-btn');
    if (b) { b.setAttribute('aria-pressed', 'true'); b.textContent = 'Stop reading aloud'; }
    announce('Reading the page aloud from the top.');
    rlSpeakNext();
  }
  function rlBtn(id, label, pressed, handler, extra) {
    return '<button type="button" id="' + (id || '') + '" class="rl-btn" aria-pressed="' + (pressed ? 'true' : 'false') + '" onclick="' + handler + '"' + (extra || '') + '>' + label + '</button>';
  }
  function rlPanelOverlay() {
    if (!state.rlPanelOpen) return '';
    var r = rlState();
    var zoomBtns = [100, 115, 130, 150, 175].map(function (z) {
      return rlBtn('', z === 100 ? 'Default' : z + '%', r.zoom === z, "SOC.rlZoom(" + z + ")");
    }).join('');
    var tintBtns = [['none', 'None'], ['cream', 'Cream'], ['blue', 'Blue'], ['grey', 'Grey']].map(function (t) {
      return rlBtn('', t[1], r.tint === t[0], "SOC.rlTint('" + t[0] + "')");
    }).join('');
    var speech = ('speechSynthesis' in window)
      ? '<div class="rl-row"><b>Listen</b>' + rlBtn('rl-speak-btn', rlSpeaking ? 'Stop reading aloud' : 'Read this page aloud', rlSpeaking, 'SOC.rlSpeak()')
        + [85, 100, 115].map(function (v) { return rlBtn('', v === 85 ? 'Slower' : v === 100 ? 'Normal speed' : 'Faster', r.rate === v, 'SOC.rlRate(' + v + ')'); }).join('') + '</div>'
      : '';
    return '<section id="rl-panel" class="rl-panel" role="dialog" aria-label="Reading Lens: reading supports" tabindex="-1" onkeydown="SOC.rlPanelKey(event)">'
      + '<div class="rl-head"><strong>Reading Lens</strong><button type="button" class="rl-btn rl-close" onclick="SOC.rlPanel()" aria-label="Close Reading Lens panel">' + ic('x', 16, 2) + '</button></div>'
      + '<p class="rl-sub">Reading supports for this site. Your choices apply everywhere here and save only in this browser.</p>'
      + '<div class="rl-row"><b>Text size</b>' + zoomBtns + '</div>'
      + '<div class="rl-row"><b>Comfortable spacing</b>' + rlBtn('', r.space ? 'On' : 'Off', r.space, 'SOC.rlSpace()') + '</div>'
      + '<div class="rl-row"><b>High-legibility font</b>' + rlBtn('', r.font ? 'On' : 'Off', r.font, 'SOC.rlFont()') + '</div>'
      + '<div class="rl-row"><b>Page tint</b>' + tintBtns + '</div>'
      + '<div class="rl-row"><b>Reading ruler</b>' + rlBtn('', r.ruler ? 'On' : 'Off', r.ruler, 'SOC.rlRuler()') + '<span class="rl-hint">Follows your pointer. Keyboard: Alt plus Up or Down arrow.</span></div>'
      + '<div class="rl-row"><b>Magnifier</b>' + rlBtn('', state.readerLensOpen ? 'On' : 'Off', !!state.readerLensOpen, 'SOC.toggleReaderLens()') + '<span class="rl-hint">A movable lens that repeats the text under it in large print.</span></div>'
      + speech
      + '<p class="rl-hint" style="margin:10px 0 0">Escape closes this panel. If any part of the site is still hard to use, use Blackboard and contact the instructor so access can be supported.</p>'
      + '</section>';
  }

  /* ---------- filtering + sorting ---------- */
  function filtered() {
    var q = state.search.trim().toLowerCase();
    var base = state.savedView ? D.records.filter(function (r) { return state.saved.indexOf(r.id) >= 0; }) : D.records;
    var list = base.filter(function (r) {
      if (state.activeTypes.length && state.activeTypes.indexOf(r.type) < 0) return false;
      if (state.activeWeek != null && r.week !== state.activeWeek) return false;
      if (q) {
        var hay = (r.title + ' ' + r.authors + ' ' + r.abstract + ' ' + r.coreIdea + ' ' + r.type + ' Week ' + r.week + ' ' + weekTitle(r.week)).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    var by = state.sort;
    list.sort(function (a, b) {
      return by === 'year' ? b.year - a.year : by === 'title' ? a.title.localeCompare(b.title) : by === 'type' ? (a.type.localeCompare(b.type) || a.week - b.week) : (a.week - b.week || (a.eye === b.eye ? 0 : a.eye === 'western' ? -1 : 1));
    });
    return list;
  }

  /* ---------- style builders ---------- */
  function saveBtnStyle(on) { return 'display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid ' + (on ? '#f0d89a' : '#DEE3EA') + ';background:' + (on ? '#FCEFD2' : '#fff') + ';color:' + (on ? '#B7791F' : '#6B7280') + ';flex:none'; }
  function cmpBtnStyle(on) { return 'display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid ' + (on ? '#bcd0f2' : '#DEE3EA') + ';background:' + (on ? '#E7EEFB' : '#fff') + ';color:' + (on ? '#1552D8' : '#6B7280') + ';flex:none'; }
  function chipStyle(active, accent) { return 'display:inline-flex;align-items:center;gap:6px;border:1px solid ' + (active ? accent : '#DEE3EA') + ';background:' + (active ? accent + '22' : '#fff') + ';color:' + (active ? '#15171C' : '#474C57') + ';font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';padding:6px 11px;border-radius:999px'; }
  function segStyle(active) { return 'border:none;border-radius:7px;padding:6px 12px;font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#fff' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';box-shadow:' + (active ? '0 1px 2px rgba(21,23,28,.12)' : 'none') + ';display:flex;align-items:center;gap:6px'; }
  function eyePill(r) {
    if (!HAS_EYE) return '';
    var ind = r.eye === 'indigenous';
    return '<span title="' + esc(eyeLabel(r)) + '" style="display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:.625rem;font-weight:600;letter-spacing:.04em;color:' + (ind ? '#1f4d38' : '#3a47a8') + ';background:' + (ind ? '#E4F0E9' : '#E7E9FB') + ';padding:3px 8px;border-radius:999px">' + (ind ? 'INDIGENOUS' : 'WESTERN') + '</span>';
  }
  function weekTag(r) { return '<span class="mono" style="font-size:.6875rem;color:#6B7280;background:#EEF1F5;padding:3px 8px;border-radius:6px">Week ' + r.week + '</span>'; }

  /* ---------- cards ---------- */
  function tileCard(r) {
    var tm = typeMeta(r.type), savedOn = state.saved.indexOf(r.id) >= 0, inC = state.compareIds.indexOf(r.id) >= 0;
    return '<div class="card" style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column">'
      + '<button onclick="SOC.open(\'' + r.id + '\')" style="text-align:left;background:none;border:none;padding:0;display:flex;flex-direction:column;flex:1">'
      + '<div style="height:5px;background:' + tm.color + ';width:100%"></div>'
      + '<div style="padding:16px 17px 12px;flex:1;display:flex;flex-direction:column">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:11px;flex-wrap:wrap">'
      + '<span style="display:inline-flex;align-items:center;gap:6px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.6875rem;font-weight:600;letter-spacing:.03em;padding:4px 9px;border-radius:999px">' + ic(tm.icon, 13) + esc(r.type) + '</span>'
      + eyePill(r)
      + '<span class="mono" style="font-size:.75rem;color:#6B7280;margin-left:auto">' + esc(String(r.year)) + '</span></div>'
      + '<h3 style="font-size:1.125rem;line-height:1.28;font-weight:600;margin:0 0 4px;color:#15171C">' + esc(r.title) + '</h3>'
      + '<div style="font-size:.8125rem;color:#474C57;margin-bottom:11px">' + esc(r.authors) + '</div>'
      + '<p style="font-size:.875rem;line-height:1.5;color:#474C57;margin:0 0 13px">' + esc(r.abstract) + '</p>'
      + '<div style="margin-top:auto">' + weekTag(r) + '</div>'
      + '</div></button>'
      + '<div style="display:flex;align-items:center;gap:8px;padding:11px 17px;border-top:1px solid #EEF1F5;background:#FBFCFD">'
      + '<span class="mono" style="font-size:.75rem;color:#6B7280">' + esc(r.len) + '</span>'
      + '<button onclick="SOC.compare(\'' + r.id + '\')" aria-label="' + (inC ? 'In compare' : 'Add to compare') + '" title="' + (inC ? 'In compare' : 'Add to compare') + '" style="' + cmpBtnStyle(inC) + ';margin-left:auto">' + ic('columns', 15) + '</button>'
      + '</div></div>';
  }
  function indexRow(r) {
    var tm = typeMeta(r.type), savedOn = state.saved.indexOf(r.id) >= 0, inC = state.compareIds.indexOf(r.id) >= 0;
    return '<div class="idxrow" style="display:flex;align-items:center;gap:14px;padding:13px 18px;border-bottom:1px solid #EEF1F5">'
      + '<span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9px;background:' + tm.soft + ';color:' + tm.color + ';flex:none">' + ic(tm.icon, 18) + '</span>'
      + '<button onclick="SOC.open(\'' + r.id + '\')" style="flex:1;min-width:0;text-align:left;background:none;border:none;padding:0">'
      + '<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span style="font-size:1rem;font-weight:600;color:#15171C">' + esc(r.title) + '</span><span style="font-size:.8125rem;color:#474C57">' + esc(r.authors) + ' · ' + esc(String(r.year)) + '</span></div>'
      + '<div style="font-size:.8125rem;color:#6B7280;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(r.abstract) + '</div></button>'
      + eyePill(r)
      + '<span class="mono" style="font-size:.75rem;color:#6B7280;flex:none;width:64px;text-align:right">Week ' + r.week + '</span>'
      + '<button onclick="SOC.compare(\'' + r.id + '\')" aria-label="' + (inC ? 'In compare' : 'Add to compare') + '" style="' + cmpBtnStyle(inC) + '">' + ic('columns', 15) + '</button>'
      + '</div>';
  }

  /* ---------- chrome ---------- */
  function header() {
    return '<header style="position:sticky;top:0;z-index:40;height:62px;background:#fff;border-bottom:2px solid var(--red);display:flex;align-items:center;padding:0 22px;gap:14px;flex:none">'
      + '<button class="soc-mobile-menu" onclick="SOC.toggleNav()" aria-label="' + (state.navOpen ? 'Close course navigation' : 'Open course navigation') + '" aria-expanded="' + (state.navOpen ? 'true' : 'false') + '" style="align-items:center;justify-content:center;width:38px;height:38px;border:1px solid #DEE3EA;border-radius:10px;background:#fff;color:#474C57;flex:none">' + ic(state.navOpen ? 'x' : 'list', 18) + '</button>'
      + '<div class="soc-head-brand" style="display:flex;align-items:center;gap:10px;flex:none;min-width:0"><img src="./seneca-logo.png" alt="Seneca Polytechnic" style="height:34px;width:auto;display:block"><span class="soc-head-title" style="font-weight:600;font-size:1.0625rem;color:var(--ink);letter-spacing:0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">PSY355 Companion</span></div>'
      + readerLensButton()
      + (D.course.mode ? '<span class="mono soc-head-mode" style="font-size:.75rem;font-weight:600;color:#474C57;background:#EFF1F4;padding:5px 10px;border-radius:6px;flex:none">' + esc(D.course.mode).toUpperCase() + '</span>' : '')
      + '<span class="mono soc-head-term" style="font-size:.75rem;font-weight:600;color:var(--red);background:#F6E3E1;padding:5px 10px;border-radius:6px;flex:none">FALL 2026</span>'
      + '</header>';
  }
  function sidebar() {
    var s = state;
    var navDefs = [['journey', 'Home', 'gauge'], ['site', 'How This Site Works', 'file'], ['pathways', 'Course Pathways', 'map'], ['readings', 'Readings Library', 'gallery'], ['compare', 'Compare Readings', 'columns'], ['reading', 'Reading Practice', 'book'], ['videos', 'Videos and Podcasts', 'play'], ['glossary', 'Glossary', 'book'], ['cards', 'Concept Flashcards', 'clipboard'], ['assignments', 'Starting Your Assignment', 'clipboard'], ['career', 'Career Choices', 'globe']];
    if (D.course && D.course.code === 'PSY355') navDefs.push(['ecology', 'Resilience Ecology', 'layers']);
    var btns = navDefs.map(function (d) {
      var key = d[0], active = (key === 'journey' && (s.screen === 'journey' || s.screen === 'library' || s.screen === 'station' || s.screen === 'detail')) || s.screen === key;
      var badge = '';
      if (key === 'compare' && s.compareIds.length) badge = '<span class="mono" style="font-size:.6875rem;font-weight:600;color:#1552D8;background:#E7EEFB;padding:1px 7px;border-radius:999px">' + s.compareIds.length + '</span>';
      var click = "SOC.go('" + key + "')";
      return '<button onclick="' + click + '" aria-current="' + (active ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#EEF1F5' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';text-align:left">'
        + '<span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (active ? 'var(--red)' : '#6B7280') + '">' + ic(d[2], 19) + '</span><span style="flex:1;text-align:left">' + d[1] + '</span>' + badge + '</button>';
    });
    var walk = '<a href="./walkthroughs/" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:11px;width:100%;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:500;color:#474C57;text-decoration:none"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:#6B7280">' + ic('layers', 19) + '</span><span style="flex:1">Weekly Walkthroughs</span><span style="color:#6B7280">↗</span></a>';
    var guide = '<div style="border-radius:10px;padding:10px 12px;color:#474C57"><div style="display:flex;align-items:flex-start;gap:11px;font-size:.9375rem;font-weight:500;line-height:1.25"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:#6B7280">' + ic('file', 19) + '</span><span style="flex:1;min-width:0">Course Website Instructions</span></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 0 33px"><a href="./guide/" target="_blank" rel="noopener" style="font-size:.75rem;font-weight:600;color:#1B2A4A;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:999px;padding:4px 9px;text-decoration:none">Online guide <span aria-hidden="true">&#8599;</span></a></div></div>';
    var nav = btns[0] + btns[1] + guide + btns[2] + walk + btns.slice(3).join('');
    var counts = {}; D.records.forEach(function (r) { counts[r.week] = (counts[r.week] || 0) + 1; });
    var navWeeks = [];
    for (var nw = 1; nw <= 14; nw++) navWeeks.push(nw);
    var weekNav = navWeeks.map(function (w) {
      var active = s.screen === 'station' && s.stationWeek === w;
      return '<button onclick="SOC.station(' + w + ')" style="display:flex;align-items:center;gap:9px;width:100%;border:none;border-radius:9px;padding:7px 12px;font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#E6EAF1' : 'transparent') + ';color:' + (active ? '#1B2A4A' : '#474C57') + ';text-align:left">'
        + '<span class="mono" style="font-size:.6875rem;color:' + (active ? '#1B2A4A' : '#6B7280') + ';flex:none;width:18px">' + w + '</span>'
        + '<span style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(weekTitle(w)) + '</span>'
        + '<span class="mono" style="font-size:.6875rem;color:#6B7280">' + (counts[w] || 0) + '</span></button>';
    }).join('');
    return '<nav class="soc-sidebar' + (state.navOpen ? ' soc-sidebar-open' : '') + '" aria-label="Primary" style="width:240px;flex:none;border-right:1px solid #DEE3EA;background:#fff;padding:18px 14px;display:flex;flex-direction:column;gap:4px;position:sticky;top:62px;align-self:flex-start;height:calc(100vh - 62px);overflow:auto">'
      + nav
      + '<div style="margin-top:14px;padding-top:14px;border-top:1px solid #EEF1F5"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#6B7280;padding:0 12px 8px">WEEKS</div>' + weekNav + '</div>'
      + '<div style="margin-top:auto;padding:13px 12px;border-radius:12px;background:#EEF1F5"><div class="mono" style="font-size:.75rem;color:#474C57;margin-bottom:4px">PSY355</div><div style="font-size:.8125rem;color:#15171C;line-height:1.45">A living collection, week by week. A companion to Blackboard.</div></div>'
      + '</nav>';
  }

  /* ---------- library ---------- */
  function library() {
    var s = section_state();
    return s;
  }
  function section_state() {
    var s = state, list = filtered();
    var typeCounts = {}; D.records.forEach(function (r) { typeCounts[r.type] = (typeCounts[r.type] || 0) + 1; });
    var html = '<div class="rise">' + (s.introOpen ? '' : '<h1 class="vh">PSY355 source library, by week</h1>');

    if (s.introOpen) {
      var stats = [['Readings', D.records.length], ['Weeks', weeksWithReadings().length], ['Formats', Object.keys(typeCounts).length]];
      html += '<section style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid var(--red);border-radius:14px;padding:28px 30px;margin-bottom:22px;position:relative;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
        + '<div style="display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap;justify-content:space-between">'
        + '<div style="flex:1;min-width:280px"><div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);margin-bottom:10px;font-weight:600">THE COURSE CORPUS</div>'
        + '<h1 style="font-size:2.125rem;line-height:1.14;font-weight:600;margin:0 0 10px;color:var(--ink)">Every reading, week by week.</h1>'
        + '<p style="font-size:1rem;line-height:1.6;color:#474C57;margin:0;">These are the readings behind PSY355, in course order. Search them, hold two against each other, and follow the course as it moves.</p></div>'
        + '<div style="display:flex;gap:10px;flex:none">' + stats.map(function (st) { return '<div style="background:#EEF1F5;border:1px solid #DEE3EA;border-radius:12px;padding:12px 16px;text-align:center;min-width:78px"><div class="mono" style="font-size:1.75rem;font-weight:600;line-height:1;color:var(--red)">' + st[1] + '</div><div style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.06em;color:#474C57;margin-top:5px">' + st[0] + '</div></div>'; }).join('') + '</div></div>'
        + '<button onclick="SOC.dismissIntro()" aria-label="Dismiss" style="position:absolute;top:14px;right:14px;background:#EEF1F5;border:none;border-radius:8px;width:30px;height:30px;color:#474C57;display:flex;align-items:center;justify-content:center">' + ic('x', 16) + '</button></section>';
    }

    var layoutDefs = [['byweek', 'By week', 'layers'], ['tiles', 'Tiles', 'grid'], ['index', 'Index', 'list']];
    var layoutChips = layoutDefs.map(function (d) { return '<button onclick="SOC.layout(\'' + d[0] + '\')" title="' + d[1] + '" aria-label="' + d[1] + '" aria-pressed="' + (s.layout === d[0]) + '" style="' + segStyle(s.layout === d[0]) + '">' + ic(d[2], 15) + '<span>' + d[1] + '</span></button>'; }).join('');
    var filtersActive = s.activeTypes.length || s.activeWeek != null || s.search.trim().length || s.savedView;
    var n = list.length;
    var resultLabel = s.savedView ? ('Saved shelf · ' + n + (n === 1 ? ' reading' : ' readings')) : (s.activeWeek != null ? ('Week ' + s.activeWeek + ' · ' + n + (n === 1 ? ' reading' : ' readings')) : (n === D.records.length ? 'All ' + n + ' readings' : n + ' of ' + D.records.length));
    var weekStrip = '<div class="soc-weekstrip" style="gap:8px;overflow-x:auto;margin-bottom:16px;padding-bottom:4px" aria-label="Filter by week">' + weeksWithReadings().map(function (w) { var aw = s.activeWeek === w; return '<button onclick="SOC.week(' + w + ')" aria-pressed="' + aw + '" style="flex:none;border:1px solid ' + (aw ? '#1B2A4A' : '#DEE3EA') + ';background:' + (aw ? '#E6EAF1' : '#fff') + ';color:' + (aw ? '#1B2A4A' : '#474C57') + ';font-size:.8125rem;font-weight:' + (aw ? '600' : '500') + ';padding:8px 12px;border-radius:999px;white-space:nowrap"><span class="mono" style="opacity:.7">W' + w + '</span> ' + esc(weekTitle(w)) + '</button>'; }).join('') + '</div>';

    html += '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:16px 18px;margin-bottom:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div style="display:flex;align-items:center;gap:10px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:10px;padding:11px 14px">'
      + '<span style="display:flex;color:#6B7280;flex:none">' + ic('search', 18) + '</span>'
      + '<input id="soc-search" value="' + esc(s.search) + '" oninput="SOC.search(this.value)" placeholder="Search by title, author, idea, or week..." aria-label="Search readings" style="flex:1;border:none;background:none;outline:none;font-size:1rem;color:#15171C;min-width:0" />'
      + (s.search ? '<button onclick="SOC.clearSearch()" aria-label="Clear search" style="background:none;border:none;color:#6B7280;display:flex;padding:2px">' + ic('x', 16) + '</button>' : '')
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid #EEF1F5">'
      + '<span style="font-size:.8125rem;color:#474C57">' + resultLabel + '</span>'
      + (filtersActive ? '<button onclick="SOC.clearFilters()" style="background:none;border:none;color:var(--red);font-size:.8125rem;font-weight:600;padding:2px 4px">Clear</button>' : '')
      + '<div style="margin-left:auto;display:flex;gap:4px;background:#EEF1F5;border-radius:9px;padding:4px" role="group" aria-label="Layout">' + layoutChips + '</div>'
      + '</div></section>';
    html += weekStrip;

    if (n === 0) {
      html += '<div style="text-align:center;padding:70px 20px;color:#474C57"><div style="display:inline-flex;color:#C9D1DC;margin-bottom:14px">' + ic('search', 44, 1.4) + '</div><div style="font-size:1.125rem;font-weight:600;color:#15171C;margin-bottom:6px">No readings match that yet.</div><p style="margin:0 0 16px;font-size:.9375rem">Try a broader term or clear a filter.</p><button onclick="SOC.clearFilters()" style="background:#1B2A4A;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-size:.9375rem;font-weight:600">Reset filters</button></div>';
    } else if (s.layout === 'tiles') {
      html += '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(296px,1fr));gap:16px">' + list.map(tileCard).join('') + '</div>';
    } else if (s.layout === 'index') {
      html += '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04)">' + list.map(indexRow).join('') + '</div>';
    } else {
      // by week
      var weeks = {};
      list.forEach(function (r) { (weeks[r.week] = weeks[r.week] || []).push(r); });
      var order = Object.keys(weeks).map(Number).sort(function (a, b) { return a - b; });
      html += '<div style="display:flex;flex-direction:column;gap:26px">' + order.map(function (w) {
        var cards = weeks[w].map(tileCard).join('');
        return '<section><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px">'
          + '<span style="display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:26px;padding:0 8px;border-radius:8px;background:#1B2A4A;color:#fff;font-family:var(--mono);font-size:.8125rem;font-weight:600;flex:none">' + w + '</span>'
          + '<h2 style="font-size:1.1875rem;font-weight:600;margin:0;color:#15171C">' + esc(weekTitle(w)) + '</h2>'
          + '<span class="mono" style="font-size:.75rem;color:#6B7280">' + weeks[w].length + (weeks[w].length === 1 ? ' reading' : ' readings') + '</span>'
          + '<div style="flex:1;height:1px;background:#EEF1F5"></div></div>'
          + '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(296px,1fr));gap:16px">' + cards + '</div></section>';
      }).join('') + '</div>';
    }
    return html + '</div>';
  }

  /* ---------- library of readings (immersive gallery) ---------- */
  function topicLabel(k) {
    var M = { twoeyed: 'Two-Eyed Seeing', facial: 'Facial Recognition', bias: 'Algorithmic Bias', policing: 'Policing', surveillance: 'Surveillance', policy: 'Law and Policy', resistance: 'Resistance and Design Justice', intersectionality: 'Intersectionality', reconciliation: 'Reconciliation', sociology: 'Sociology', anthropology: 'Anthropology', psychology: 'Psychology', family: 'Family and Kinship', stratification: 'Stratification', socialization: 'Socialization', culture: 'Culture', learning: 'Learning', memory: 'Memory and Recall', motivation: 'Motivation', 'self-efficacy': 'Self-Efficacy', cognition: 'Cognition', development: 'Development', behaviour: 'Behaviour', behavior: 'Behaviour', identity: 'Identity', education: 'Education', conditioning: 'Conditioning', emotion: 'Emotion' };
    return M[k] || (String(k).charAt(0).toUpperCase() + String(k).slice(1));
  }
  function rgTopics() {
    var seen = {}, out = [];
    D.records.forEach(function (r) { (r.themes || []).forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push(t); } }); });
    return out.sort(function (a, b) { return topicLabel(a).localeCompare(topicLabel(b)); });
  }
  function rgList() {
    var w = state.galWeek, t = state.galTopic;
    return D.records.filter(function (r) {
      if (w != null && r.week !== w) return false;
      if (t && (r.themes || []).indexOf(t) < 0) return false;
      return true;
    }).sort(function (a, b) { return (a.week - b.week) || a.title.localeCompare(b.title); });
  }
  function rgAccessBadge(r) {
    var full = r.fulltext !== false;
    var fg = full ? '#1f7a4d' : '#8a5a13', bg = full ? '#E4F0E9' : '#FCEFD2';
    return '<span style="display:inline-flex;align-items:center;gap:5px;font-size:.6875rem;font-weight:600;letter-spacing:.03em;color:' + fg + ';background:' + bg + ';padding:4px 9px;border-radius:999px">' + ic(full ? 'unlock' : 'book', 12) + (full ? 'Read online' : 'Seneca Library') + '</span>';
  }
  function rgVideoCover(r) {
    var v = r.video;
    return '<div class="rgvideo" style="position:relative;width:100%;aspect-ratio:16/9;background:#15171C;overflow:hidden">'
      + '<button onclick="SOC.playVideo(this,\'' + v.yt + '\')" aria-label="Play a talk by ' + esc(v.scholar || r.authors) + '" style="position:absolute;inset:0;width:100%;height:100%;border:none;padding:0;cursor:pointer;background:none">'
      + '<img src="https://i.ytimg.com/vi/' + v.yt + '/maxresdefault.jpg" onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/' + v.yt + '/hqdefault.jpg\'" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" />'
      + '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:999px;background:rgba(218,41,28,.94);color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.45)">' + ic('play', 24) + '</span></span>'
      + '<span style="position:absolute;left:0;right:0;bottom:0;padding:22px 13px 10px;background:linear-gradient(transparent,rgba(0,0,0,.9));color:#fff;text-align:left">'
      + '<span class="mono" style="display:block;font-size:.6rem;letter-spacing:.08em;color:#f3b0a8;font-weight:600;margin-bottom:2px">WATCH</span>'
      + '<span style="display:block;font-size:.8125rem;font-weight:700;line-height:1.2">' + esc(v.scholar || r.authors) + '</span>'
      + (v.title ? '<span style="display:block;font-size:.7rem;color:rgba(255,255,255,.8);line-height:1.3;margin-top:2px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">' + esc(v.title) + '</span>' : '')
      + '</span>'
      + '</button></div>';
  }
  function rgCard(r) {
    var tm = typeMeta(r.type);
    var topics = (r.themes || []).slice(0, 3).map(function (t) {
      var on = state.galTopic === t;
      return '<button onclick="SOC.galTopic(\'' + t + '\')" style="border:1px solid ' + (on ? '#DA291C' : '#DEE3EA') + ';background:' + (on ? '#F6E3E1' : '#F7F8FA') + ';color:' + (on ? '#DA291C' : '#474C57') + ';font-size:.6875rem;font-weight:600;padding:3px 9px;border-radius:999px;cursor:pointer">' + esc(topicLabel(t)) + '</button>';
    }).join('');
    return '<div class="rgcard" style="background:#fff;border:1px solid #DEE3EA;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(21,23,28,.06);display:flex;flex-direction:column">'
      + (r.video ? rgVideoCover(r) : '<div style="height:6px;background:' + tm.color + '"></div>')
      + '<div style="padding:16px 17px 15px;flex:1;display:flex;flex-direction:column">'
      + '<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:10px">'
      + '<span style="display:inline-flex;align-items:center;gap:5px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.6875rem;font-weight:600;padding:4px 9px;border-radius:999px">' + ic(tm.icon, 12) + esc(r.type) + '</span>'
      + rgAccessBadge(r)
      + '<span class="mono" style="font-size:.75rem;color:#6B7280;margin-left:auto">' + esc(String(r.year)) + '</span>'
      + '</div>'
      + '<h3 style="font-size:1.0625rem;line-height:1.3;font-weight:600;margin:0 0 4px;color:#15171C">' + esc(r.title) + '</h3>'
      + '<div style="font-size:.8125rem;color:#474C57;margin-bottom:9px">' + esc(r.authors) + '</div>'
      + '<p style="font-size:.84rem;line-height:1.5;color:#5a616e;margin:0 0 12px">' + esc(r.coreIdea || r.abstract) + '</p>'
      + (topics ? '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:13px">' + topics + '</div>' : '')
      + (r.assigned ? '<div style="display:flex;align-items:flex-start;gap:7px;background:#FBF3F2;border:1px solid #F1D5D2;border-radius:9px;padding:8px 11px;margin:0 0 12px"><span style="display:flex;color:var(--red);flex:none;margin-top:1px">' + ic('book', 13) + '</span><span style="font-size:.78rem;line-height:1.4;color:#15171C"><span style="font-weight:700">Read:</span> ' + esc(r.assigned) + '</span></div>' : '')
      + '<div style="margin-top:auto;display:flex;align-items:center;gap:9px">'
      + '<button onclick="SOC.read(\'' + r.id + '\')" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:var(--red);color:#fff;border:none;border-radius:10px;padding:11px;font-size:.875rem;font-weight:600;cursor:pointer">' + readLabel(r) + '<span style="display:flex">' + ic('external', 15) + '</span></button>'
      + '<button onclick="SOC.open(\'' + r.id + '\')" title="Details" aria-label="Open details" style="display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:10px;border:1px solid #DEE3EA;background:#fff;color:#474C57;cursor:pointer;flex:none">' + ic('chevron', 18) + '</button>'
      + '</div>'
      + sourceButton(r)
      + '<div style="margin-top:10px;display:flex;align-items:center;gap:7px">' + weekTag(r) + ((D.course && D.course.frame) ? eyePill(r) : '') + '</div>'
      + '</div></div>';
  }
  function readingsGallery() {
    var s = state, list = rgList();
    var nFull = D.records.filter(function (r) { return r.fulltext !== false; }).length;
    var nVid = D.records.filter(function (r) { return !!r.video; }).length;
    var weeks = weeksWithReadings(), topics = rgTopics();
    var stats = [['Readings', D.records.length], ['Read online', nFull]];
    if (nVid) stats.push(['Scholar talks', nVid]);
    var hero = '<section style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid var(--red);border-radius:14px;padding:26px 30px;margin-bottom:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div style="display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap;justify-content:space-between">'
      + '<div style="flex:1;min-width:280px">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:10px">LIBRARY OF READINGS</div>'
      + '<h1 style="font-size:2.125rem;line-height:1.14;font-weight:600;margin:0 0 10px;color:var(--ink)">Open every source online.</h1>'
      + '<p style="font-size:1rem;line-height:1.6;color:#474C57;margin:0;">Click any reading to open the full text in a new tab, watch the scholars speak, and filter the collection by week or by topic.</p></div>'
      + '<div style="display:flex;gap:10px;flex:none">'
      + stats.map(function (st) { return '<div style="background:#EEF1F5;border:1px solid #DEE3EA;border-radius:12px;padding:12px 16px;text-align:center;min-width:82px"><div class="mono" style="font-size:1.75rem;font-weight:600;line-height:1;color:var(--red)">' + st[1] + '</div><div style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.06em;color:#474C57;margin-top:5px">' + st[0] + '</div></div>'; }).join('')
      + '</div></div></section>';
    function pill(active, label, onclick, accent) {
      accent = accent || '#DA291C';
      return '<button onclick="' + onclick + '" aria-pressed="' + active + '" style="flex:none;border:1px solid ' + (active ? accent : '#DEE3EA') + ';background:' + (active ? accent : '#fff') + ';color:' + (active ? '#fff' : '#474C57') + ';font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';padding:7px 13px;border-radius:999px;white-space:nowrap;cursor:pointer">' + label + '</button>';
    }
    var weekRail = '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">'
      + pill(s.galWeek == null, 'All weeks', 'SOC.galWeek(null)')
      + weeks.map(function (w) { return pill(s.galWeek === w, '<span class="mono" style="opacity:.7">W' + w + '</span> ' + esc(weekTitle(w)), 'SOC.galWeek(' + w + ')'); }).join('')
      + '</div>';
    var topicRail = '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">'
      + pill(s.galTopic == null, 'All topics', 'SOC.galTopic(null)', '#15171C')
      + topics.map(function (t) { return pill(s.galTopic === t, esc(topicLabel(t)), 'SOC.galTopic(\'' + t + '\')', '#15171C'); }).join('')
      + '</div>';
    var anyFilter = (s.galWeek != null) || s.galTopic;
    var filterBar = '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:14px 16px;margin-bottom:16px;box-shadow:0 1px 2px rgba(21,23,28,.04);position:sticky;top:0;z-index:5">'
      + '<div style="display:flex;align-items:center;gap:7px;margin-bottom:7px"><span style="display:flex;color:#6B7280">' + ic('calendar', 15) + '</span><span style="font-size:.7rem;font-weight:600;letter-spacing:.05em;color:#6B7280;text-transform:uppercase">Filter by week</span></div>'
      + weekRail
      + '<div style="display:flex;align-items:center;gap:7px;margin:13px 0 7px"><span style="display:flex;color:#6B7280">' + ic('sparkle', 15) + '</span><span style="font-size:.7rem;font-weight:600;letter-spacing:.05em;color:#6B7280;text-transform:uppercase">Filter by topic</span></div>'
      + topicRail
      + '<div style="display:flex;align-items:center;gap:11px;margin-top:13px;padding-top:12px;border-top:1px solid #EEF1F5"><span style="font-size:.8125rem;font-weight:500;color:#474C57">' + list.length + ' of ' + D.records.length + ' readings</span>' + (anyFilter ? '<button onclick="SOC.galClear()" style="background:none;border:none;color:var(--red);font-size:.8125rem;font-weight:600;cursor:pointer">Clear filters</button>' : '') + '</div>'
      + '</section>';
    var grid = list.length
      ? '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">' + list.map(rgCard).join('') + '</div>'
      : '<div style="text-align:center;padding:60px 20px;color:#474C57"><div style="font-size:1.0625rem;font-weight:600;color:#15171C;margin-bottom:10px">No readings match those filters.</div><button onclick="SOC.galClear()" style="background:var(--red);color:#fff;border:none;border-radius:9px;padding:10px 18px;font-size:.9375rem;font-weight:600;cursor:pointer">Clear filters</button></div>';
    return '<div class="rise">' + hero + filterBar + grid + '</div>';
  }

  /* ---------- detail ---------- */
  function detail() {
    var r = rec(state.detailId); if (!r) return library();
    var tm = typeMeta(r.type), savedOn = state.saved.indexOf(r.id) >= 0, inC = state.compareIds.indexOf(r.id) >= 0;
    var related = (r.related || []).map(function (id) {
      var rr = rec(id); if (!rr) return ''; var rtm = typeMeta(rr.type);
      var conn = rr.week === r.week ? 'Also in Week ' + rr.week : (HAS_EYE ? eyeLabel(rr) : ('Week ' + rr.week));
      return '<button onclick="SOC.open(\'' + id + '\')" class="relrow" style="display:flex;align-items:center;gap:13px;text-align:left;background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:13px 15px"><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:' + rtm.soft + ';color:' + rtm.color + ';flex:none">' + ic(rtm.icon, 16) + '</span><span style="flex:1;min-width:0"><span style="display:block;font-size:.9375rem;font-weight:600;color:#15171C">' + esc(rr.title) + '</span><span style="display:block;font-size:.8125rem;color:#474C57">' + esc(rr.authors) + ' · ' + esc(conn) + '</span></span><span style="display:flex;color:#C9D1DC;flex:none">' + ic('chevron', 18) + '</span></button>';
    }).join('');
    var facts = [
      [ic('calendar', 16), 'Used in', 'Week ' + r.week + ': ' + esc(weekTitle(r.week))],
      [ic('type', 16), 'Format', esc(r.type)],
      [ic('clock', 16), 'Length', esc(r.len)],
      [ic('gauge', 16), 'Level', esc(D.levels[r.diff] || '')],
      [ic('unlock', 16), 'Access', esc((D.accessLabels && D.accessLabels[r.access]) || '')],
      [ic('globe', 16), 'Origin', esc(r.origin)]].map(function (f) { return '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #EEF1F5"><span style="display:flex;color:#6B7280;flex:none">' + f[0] + '</span><span style="font-size:.8125rem;color:#474C57;flex:none;width:84px">' + f[1] + '</span><span style="font-size:.875rem;font-weight:500;color:#15171C;text-align:right;flex:1">' + f[2] + '</span></div>'; }).join('');
    var hasLink = !!readUrl(r);

    return '<div class="rise"><button onclick="SOC.back()" style="background:none;border:none;color:#474C57;font-size:.875rem;font-weight:500;padding:0 0 16px;display:inline-flex;align-items:center;gap:6px">&larr; Back to the library</button>'
      + '<div class="soc-detailgrid" style="display:grid;grid-template-columns:1fr 312px;gap:26px;align-items:start"><div>'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:13px;flex-wrap:wrap"><span style="display:inline-flex;align-items:center;gap:7px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.8125rem;font-weight:600;padding:5px 12px;border-radius:999px">' + ic(tm.icon, 15) + esc(r.type) + '</span>' + eyePill(r) + '<button onclick="SOC.week(' + r.week + ')" class="mono" style="font-size:.8125rem;color:#1B2A4A;background:#E6EAF1;border:none;padding:4px 10px;border-radius:999px">Week ' + r.week + '</button><span class="mono" style="font-size:.8125rem;color:#474C57">' + esc(String(r.year)) + ' · ' + esc(r.origin) + '</span></div>'
      + '<h1 style="font-size:2.125rem;line-height:1.15;font-weight:600;margin:0 0 8px">' + esc(r.title) + '</h1>'
      + '<div style="font-size:1.0625rem;color:#474C57;margin-bottom:24px">' + esc(r.authors) + '</div>'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.04em;color:#6B7280;margin-bottom:9px">ABSTRACT</div><p style="font-size:1.0625rem;line-height:1.62;color:#15171C;margin:0 0 26px;">' + esc(r.abstract) + '</p>'
      + '<div style="background:' + tm.soft + ';border-radius:14px;padding:20px 22px;margin-bottom:26px;border:1px solid ' + tm.color + '33"><div style="display:flex;align-items:center;gap:9px;margin-bottom:9px"><span style="display:flex;color:' + tm.color + '">' + ic('sparkle', 17) + '</span><span style="font-size:.8125rem;font-weight:600;color:' + tm.color + ';letter-spacing:.02em">THE CORE IDEA</span></div><p style="font-size:1.1875rem;line-height:1.5;font-weight:500;color:#15171C;margin:0">' + esc(r.coreIdea) + '</p></div>'
      + (related ? '<div class="mono" style="font-size:.75rem;letter-spacing:.04em;color:#6B7280;margin-bottom:12px">READ ALONGSIDE</div><div style="display:flex;flex-direction:column;gap:10px">' + related + '</div>' : '')
      + '</div>'
      + '<aside class="soc-rail" style="position:sticky;top:84px;display:flex;flex-direction:column;gap:14px">'
      + '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + (readUrl(r) ? '<button onclick="SOC.read(\'' + r.id + '\')" aria-label="' + esc(readLabel(r)) + ' in a new tab" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:9px;padding:13px;font-size:1rem;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:9px">' + readLabel(r) + '<span style="display:flex">' + ic('external', 16) + '</span></button>' : '<div style="width:100%;background:#F7F8FA;border:1px solid #DEE3EA;color:#474C57;border-radius:9px;padding:13px;font-size:.9rem;font-weight:600;text-align:center;margin-bottom:9px">Posted in this week\'s Readings folder on Blackboard</div>')
      + '<div style="font-size:.75rem;line-height:1.4;color:#6B7280;margin:-2px 0 9px;text-align:center">' + esc(accessNote(r)) + '</div>'
      + sourceButton(r)
      + '<button onclick="SOC.compare(\'' + r.id + '\')" style="width:100%;display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:9px;padding:11px;font-size:.9375rem;font-weight:600;border:1px solid ' + (inC ? '#bcd0f2' : '#DEE3EA') + ';background:' + (inC ? '#E7EEFB' : '#fff') + ';color:' + (inC ? '#1552D8' : '#15171C') + '">' + ic('columns', 16) + (inC ? 'In tray' : 'Compare') + '</button>'
      + '</div>'
      + '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:6px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">' + facts + '</div>'
      + '</aside></div></div>';
  }

  /* ---------- compare ---------- */
  function comparePickList() {
    var list = D.records.slice().sort(function (a, b) { return a.week - b.week || (a.eye === b.eye ? 0 : a.eye === 'western' ? -1 : 1); });
    return list.map(function (r) {
      var tm = typeMeta(r.type), sel = state.compareIds.indexOf(r.id) >= 0;
      return '<button onclick="SOC.compare(\'' + r.id + '\')" class="mapsrc" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:' + (sel ? '#E7EEFB' : 'none') + ';border:none;border-bottom:1px solid #EEF1F5;padding:10px 12px">'
        + '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:' + tm.soft + ';color:' + tm.color + ';flex:none">' + ic(tm.icon, 14) + '</span>'
        + '<span style="flex:1;min-width:0"><span style="display:block;font-size:.8125rem;font-weight:600;color:#15171C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(r.title) + '</span><span style="display:block;font-size:.6875rem;color:#6B7280">Week ' + r.week + (HAS_EYE ? ' · ' + (r.eye === 'indigenous' ? 'Indigenous' : 'Western') : '') + '</span></span>'
        + (sel ? '<span style="display:flex;color:#1552D8;flex:none">' + ic('check', 16, 2.2) + '</span>' : '<span style="display:flex;color:#6b7280;flex:none">' + ic('plus', 16) + '</span>') + '</button>';
    }).join('');
  }
  var LENSES = {
    thematic: { label: 'Thematic', hint: 'shared themes or topics, and how each text handles them differently', diff: 'How does each reading treat the shared topic? What does each one emphasize, include, or leave out?' },
    stylistic: { label: 'Stylistic', hint: 'tone, structure, and how each text is written', diff: 'How do their tone, structure, and word choices differ? Who does each one seem written for?' },
    contextual: { label: 'Contextual', hint: 'the history, culture, and who is speaking', diff: 'How do the authors background, time, or community shape what each one says?' },
    theoretical: { label: 'Theoretical', hint: 'a critical lens, for example power or whose knowledge counts', diff: 'Read both through one lens, for example power or whose knowledge counts. What does that lens show in each?' }
  };
  var CMP_EXAMPLE = [
    ['The subject', 'Two newspapers report the same event: a 1.5% city property tax increase.'],
    ['Article A, the Community Gazette', 'A human-interest lens. Empathetic, a little critical. Leads with retirees on fixed incomes and asks whether the council tried other cuts first.'],
    ['Article B, the Metro Financial Daily', 'An economic lens. Objective and forward-looking. Focuses on the transit and roads the revenue funds, and the long-run savings.'],
    ['Similarities', 'Both agree on the core fact, a 1.5% increase, and both treat it as controversial.'],
    ['Differences', 'The Gazette uses a local, emotional frame. The Financial Daily uses a structural, analytical one.'],
    ['The insight', 'A city makeup and its politics shape how the same policy gets framed in the press. The framing is the story behind the story.']
  ];
  function comparativeStudio(recs) {
    var lens = LENSES[state.lens] || LENSES.thematic;
    function zone(n, title, prompt, key, ph) {
      var v = esc((state.cmpNotes && state.cmpNotes[key]) || '');
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px">'
        + '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:5px"><span style="display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;background:#15171C;color:#fff;border-radius:50%;font-size:.8rem;font-weight:700;flex:none">' + n + '</span><h3 style="margin:0;font-size:1.0625rem">' + title + '</h3></div>'
        + '<p style="margin:0 0 8px;font-size:.875rem;color:#474C57">' + prompt + '</p>'
        + '<textarea oninput="SOC.cmpNote(\'' + key + '\',this.value)" placeholder="' + ph + '" style="width:100%;min-height:68px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + v + '</textarea></div>';
    }
    var chips = Object.keys(LENSES).map(function (k) {
      var on = state.lens === k;
      return '<button onclick="SOC.setLens(\'' + k + '\')" style="border:1px solid ' + (on ? '#15171C' : '#DEE3EA') + ';background:' + (on ? '#15171C' : '#fff') + ';color:' + (on ? '#fff' : '#15171C') + ';border-radius:999px;padding:7px 15px;font-size:.85rem;font-weight:600">' + LENSES[k].label + '</button>';
    }).join(' ');
    var ex = state.exampleOpen
      ? '<div style="background:#15171C;color:#fff;border-radius:13px;padding:16px 18px;margin-bottom:15px"><div style="display:flex;align-items:center;margin-bottom:10px"><span class="mono" style="font-size:.72rem;letter-spacing:.05em;color:#fff">A WORKED EXAMPLE</span><button onclick="SOC.toggleExample()" style="margin-left:auto;background:rgba(255,255,255,.14);border:none;border-radius:7px;color:#fff;padding:4px 10px;font-size:.78rem;font-weight:600">Hide</button></div>'
        + CMP_EXAMPLE.map(function (r) { return '<div style="margin-bottom:8px"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#9aa3b2">' + esc(r[0]).toUpperCase() + '</div><div style="font-size:.875rem;line-height:1.5;color:rgba(255,255,255,.93)">' + esc(r[1]) + '</div></div>'; }).join('') + '</div>'
      : '<button onclick="SOC.toggleExample()" style="background:none;border:1px solid #DEE3EA;border-radius:9px;padding:9px 14px;font-size:.875rem;font-weight:600;color:#15171C;margin-bottom:15px">See a worked example</button>';
    var model = state.showModel
      ? '<div style="background:#15171C;color:#fff;border-radius:14px;padding:18px 20px;margin-top:12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="display:flex;color:#fff">' + ic('sparkle', 16) + '</span><span class="mono" style="font-size:.72rem;letter-spacing:.04em;color:#fff">A MODEL COMPARISON</span><button onclick="SOC.hideModel()" aria-label="Hide" style="margin-left:auto;background:rgba(255,255,255,.14);border:none;border-radius:7px;color:#fff;width:26px;height:26px">' + ic('x', 14) + '</button></div>'
        + buildSynthesis(recs).paras.map(function (p) { return '<p style="font-size:.95rem;line-height:1.6;margin:0 0 10px;color:rgba(255,255,255,.94)">' + esc(p) + '</p>'; }).join('')
        + '<p style="font-size:.82rem;margin:6px 0 0;color:#9aa3b2">One way to read it. Compare it with yours, do not copy it.</p></div>'
      : '<button onclick="SOC.revealModel()" style="background:none;border:1px solid #15171C;color:#15171C;border-radius:9px;padding:10px 16px;font-size:.9rem;font-weight:600">Reveal a model comparison</button>';
    return '<div style="margin-bottom:18px">'
      + '<h2 style="font-size:1.25rem;margin:0 0 4px">Compare them</h2>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 14px;">Comparative reading goes past what each text says on its own. Read the two together and look for what they share, how they differ, and why those differences matter.</p>'
      + ex
      + '<div style="font-size:.8125rem;font-weight:600;color:#15171C;margin-bottom:7px">Read them through a lens</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:6px">' + chips + '</div>'
      + '<p style="font-size:.82rem;color:#6B7280;margin:0 0 16px">' + esc(lens.label) + ': ' + esc(lens.hint) + '.</p>'
      + zone('1', 'Similarities', 'What do these readings share? Where do they agree, in facts, topic, or the same idea?', 'sim', 'They both...')
      + zone('2', 'Differences', esc(lens.diff), 'diff', 'The first... while the second...')
      + zone('3', 'Why the differences matter', 'Finish the thought: these differences matter because...', 'ins', 'These differences matter because...')
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:4px"><button onclick="SOC.saveComparison()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:10px 18px;font-size:.9rem;font-weight:600">Save my comparison</button>' + (state.showModel ? '' : model) + '</div>'
      + (state.showModel ? model : '')
      + '</div>';
  }
  var RC_QUESTIONS = {
    thematic: ['What is the main idea or argument of this reading? Put it in one sentence.', 'What evidence or examples does the author use to support it?', 'What is the author really saying about the larger topic or theme?', 'How does this reading change or add to how you understand the topic?'],
    stylistic: ['What is the author tone (for example plain, urgent, careful, personal)?', 'How is the reading organized, and how does that shape its argument?', 'Which words, images, or moments stood out, and what effect did they have?', 'Who does the writing seem to be for?'],
    contextual: ['Who wrote this, and from what background or position?', 'How might the time, place, or community shape what the author says?', 'Whose perspective is centred here, and whose is missing?', 'What would someone need to know about the context to read this fairly?'],
    theoretical: ['Read this through one lens, for example power, or whose knowledge counts. What does that lens reveal?', 'Who benefits from the way this is framed, and who is left out?', 'What does the author assume that a critical reader should question?', 'What would change if you read it through a different lens?']
  };
  var RC_GUIDANCE = {
    thematic: [
      ['States the single main idea in one clear sentence, in your own words.', 'Names the central claim the author argues, not just the topics covered.', 'Is specific enough that a reader could tell which reading it came from.'],
      ['Points to specific evidence the author uses (a study, example, case, or text), not just that evidence exists.', 'Shows HOW that evidence supports the claim, not only that it is there.', 'Separates the author\'s strongest support from a minor or passing example.'],
      ['Moves past the surface topic to the deeper claim the author makes about it.', 'Names what the author wants you to think or do differently.', 'Connects the reading to the wider course theme it speaks to.'],
      ['Names something specific that shifted, was added to, or was challenged in your thinking.', 'Explains why that change matters, not just that it happened.', 'Is honest about what still feels unclear or unresolved.']
    ],
    stylistic: [
      ['Names the tone in a word or two (for example plain, urgent, careful, personal).', 'Points to a specific line or moment where you felt that tone.', 'Says what the tone does to you as a reader (draws you in, warns, reassures).'],
      ['Describes the structure (for example story then analysis, problem then solution, a list of cases).', 'Links that structure to how the argument builds or lands.', 'Notes one place where the order of the ideas matters.'],
      ['Picks one specific word, image, phrase, or moment, not a general impression.', 'Describes the effect it had on you as a reader.', 'Says why the author might have chosen it.'],
      ['Names the likely audience (students, scholars, the public, a community).', 'Points to what in the writing signals who it is for (vocabulary, references, assumptions).', 'Considers who is not addressed.']
    ],
    contextual: [
      ['Identifies the author and the position or background they write from.', 'Notes how that position might shape what they notice or value.', 'Stays within what the reading or its context actually tells you, without guessing.'],
      ['Ties the time, place, or community to a specific choice the author makes.', 'Shows how the same idea might read differently in another context.', 'Treats context as shaping the argument, not just decorating it.'],
      ['Names whose perspective is centred in the reading.', 'Names a perspective that is absent or mentioned only in passing.', 'Gives a reason that absence matters for the argument.'],
      ['Names the specific background a fair reader needs, not just that context matters.', 'Separates what the reading assumes you know from what it explains.', 'Considers how a reader without that background might misread it.']
    ],
    theoretical: [
      ['Picks one clear lens (for example power, gender, colonialism, whose knowledge counts).', 'Says what that lens makes visible in this specific reading.', 'Uses the lens to read the text, not just to label it.'],
      ['Names who benefits from the way the reading frames the issue.', 'Names who is disadvantaged, ignored, or carries the cost.', 'Ties the benefit or harm to a specific part of the text.'],
      ['Identifies an assumption the author treats as given.', 'Explains why a critical reader should question it.', 'Considers what changes if that assumption does not hold.'],
      ['Names a second, different lens.', 'Shows how the reading would look different through it.', 'Says what each lens catches that the other misses.']
    ]
  };
  function rcChips() {
    return Object.keys(LENSES).map(function (k) {
      var on = state.lens === k;
      return '<button onclick="SOC.setLens(\'' + k + '\')" style="border:1px solid ' + (on ? '#15171C' : '#DEE3EA') + ';background:' + (on ? '#15171C' : '#fff') + ';color:' + (on ? '#fff' : '#15171C') + ';border-radius:999px;padding:7px 15px;font-size:.85rem;font-weight:600">' + LENSES[k].label + '</button>';
    }).join(' ');
  }
  function numList(arr) { if (!arr.length) return ''; if (arr.length === 1) return 'question ' + arr[0]; if (arr.length === 2) return 'questions ' + arr[0] + ' and ' + arr[1]; return 'questions ' + arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1]; }
  function listJoin(arr) { if (!arr.length) return ''; if (arr.length === 1) return arr[0]; if (arr.length === 2) return arr[0] + ' and ' + arr[1]; return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1]; }
  var RC_SKILLS = { argument: 'the main argument', concepts: 'the key concepts', context: 'the context and who is speaking', significance: 'why the reading matters' };
  var RC_SKILL_ORDER = ['argument', 'concepts', 'context', 'significance'];
  function rcSkillProfile(rid, items) {
    var stat = {};
    items.forEach(function (m, mi) { var sk = m.skill; if (!sk) return; var sel = state.mcSel[rid + '|mc|' + mi]; if (sel === undefined || sel === null) return; if (!stat[sk]) stat[sk] = { right: 0, total: 0, whys: [] }; stat[sk].total++; if (sel === m.answer) stat[sk].right++; else if (m.why) stat[sk].whys.push(m.why); });
    var strengths = [], opps = [];
    RC_SKILL_ORDER.forEach(function (sk) { var s = stat[sk]; if (!s) return; if (s.right === s.total) strengths.push(RC_SKILLS[sk]); else opps.push({ key: sk, label: RC_SKILLS[sk], whys: s.whys }); });
    return { strengths: strengths, opps: opps, has: (strengths.length + opps.length) > 0 };
  }
  function lcFirst(s) { s = String(s == null ? '' : s); return s.charAt(0).toLowerCase() + s.slice(1); }
  function ucFirst(s) { s = String(s == null ? '' : s); return s.charAt(0).toUpperCase() + s.slice(1); }
  function rcBand(correct, total) {
    if (correct === total) return { label: 'Strong grasp', color: '#2c6b3f', bg: '#E9EFE7', icon: 'check', msg: 'You have a strong hold on this reading across every kind of question. The read-out below shows what came through.' };
    var pct = correct / total;
    if (pct >= 0.6) return { label: 'On your way', color: '#1552D8', bg: '#E7EEFB', icon: 'book', msg: 'You have the core of this reading. The read-out below shows where you are strong and where to look again.' };
    if (pct >= 0.4) return { label: 'Building', color: '#8F5E0F', bg: '#F3ECE0', icon: 'book', msg: 'You are part way into this reading. The read-out below shows what is landing and what to firm up.' };
    return { label: 'Worth another read', color: '#b23121', bg: '#FBE9E7', icon: 'book', msg: 'This reading has not fully landed yet. The read-out below shows exactly where to focus your next pass.' };
  }
  function readingComp() {
    var practiceNote = '<div style="display:flex;align-items:flex-start;gap:9px;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:10px;padding:11px 14px;margin:0 0 16px;font-size:.85rem;line-height:1.5;color:#474C57"><span style="display:flex;color:#6B7280;flex:none;margin-top:1px">' + ic('book', 16) + '</span><span>This is a private space for practice and self-study. Nothing here is graded, recorded, or counted toward a mark. It is here to help you check your own understanding and see where to focus.</span></div>';
    var r = state.rcReading ? rec(state.rcReading) : null;
    if (!r) {
      var picks = D.records.map(function (rd) {
        var tm = typeMeta(rd.type);
        return '<button onclick="SOC.rcPick(\'' + rd.id + '\')" style="display:flex;align-items:center;gap:11px;width:100%;text-align:left;background:#fff;border:1px solid #DEE3EA;border-radius:10px;padding:12px 14px;margin-bottom:8px;color:#15171C"><span style="width:9px;height:9px;border-radius:50%;background:' + tm.color + ';flex:none"></span><span style="flex:1;min-width:0"><span style="display:block;font-weight:600;font-size:.95rem">' + esc(rd.title) + '</span><span style="font-size:.8125rem;color:#474C57">Week ' + rd.week + ' · ' + esc(rd.authors) + '</span></span><span style="color:#6B7280">' + ic('book', 16) + '</span></button>';
      }).join('');
      return '<div class="rise"><h1 style="font-size:1.75rem;margin:0 0 6px">Build Your Reading Comprehension</h1><p class="lede" style="margin:0 0 18px">Pick one reading. You will work through questions that build your understanding of it. Switch the lens to change the kind of questions you answer. Your answers save to your notes.</p>' + practiceNote + picks + '</div>';
    }
    var lens = LENSES[state.lens] || LENSES.thematic;
    var qs = RC_QUESTIONS[state.lens] || RC_QUESTIONS.thematic;
    var guide = RC_GUIDANCE[state.lens] || RC_GUIDANCE.thematic;
    var zones = qs.map(function (q, i) {
      var key = r.id + '|' + state.lens + '|' + i;
      var v = esc((state.rcNotes && state.rcNotes[key]) || '');
      var coreIdea = (i === 0 && r.coreIdea) ? esc(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + '.' : '';
      var crit = guide[i] || [];
      var rev = state.revealed[key]
        ? '<div style="margin-top:10px;background:#15171C;color:#fff;border-radius:10px;padding:13px 16px"><div class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#9aa3b2;margin-bottom:8px">A STRONG RESPONSE COVERS</div><ul style="margin:0;padding-left:17px;font-size:.875rem;line-height:1.55;color:rgba(255,255,255,.93)">' + crit.map(function (c) { return '<li style="margin-bottom:5px">' + esc(c) + '</li>'; }).join('') + '</ul>' + (coreIdea ? '<div style="margin-top:11px;padding-top:10px;border-top:1px solid rgba(255,255,255,.16);font-size:.85rem;line-height:1.5;color:rgba(255,255,255,.9)"><span style="color:#F2A900;font-weight:600">From this reading: </span>the central idea is ' + coreIdea + '</div>' : '') + '<div style="margin-top:11px;font-size:.78rem;color:#9aa3b2">Compare your answer against this. There is no single right wording.</div><button onclick="SOC.rcReveal(\'' + key + '\')" style="margin-top:9px;background:rgba(255,255,255,.14);border:none;color:#fff;border-radius:7px;padding:5px 11px;font-size:.78rem;font-weight:600">Hide</button></div>'
        : '<button onclick="SOC.rcReveal(\'' + key + '\')" style="margin-top:10px;background:none;border:1px solid #DEE3EA;border-radius:8px;padding:7px 13px;font-size:.82rem;font-weight:600;color:#15171C">Reveal a strong response</button>';
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px"><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:7px"><span style="display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;background:#15171C;color:#fff;border-radius:50%;font-size:.8rem;font-weight:700;flex:none">' + (i + 1) + '</span><p style="margin:0;font-size:.95rem;color:#15171C">' + esc(q) + '</p></div><textarea oninput="SOC.rcNote(\'' + key + '\',this.value)" placeholder="Your answer" style="width:100%;min-height:68px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + v + '</textarea>' + rev + '</div>';
    }).join('');
    var mcItems = MC[r.id] || [];
    var mcHtml = '';
    if (mcItems.length) {
      var answered = 0, correct = 0, missed = [];
      var rows = mcItems.map(function (m, mi) {
        var mkey = r.id + '|mc|' + mi;
        var sel = state.mcSel[mkey];
        var done = (sel !== undefined && sel !== null);
        if (done) { answered++; if (sel === m.answer) correct++; else missed.push(mi + 1); }
        var opts = (m.options || []).map(function (o, oi) {
          var isSel = (sel === oi), isCor = (oi === m.answer);
          var bg = '#fff', bd = '#DEE3EA', col = '#15171C';
          if (done && isCor) { bg = '#E9EFE7'; bd = '#50694C'; col = '#2c3b29'; }
          else if (done && isSel) { bg = '#F6E3E1'; bd = '#DA291C'; col = '#8f1b12'; }
          var mark = (done && isCor) ? ' &#10003;' : ((done && isSel) ? ' &#10007;' : '');
          return '<button onclick="SOC.mcPick(\'' + mkey + '\',' + oi + ')" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.9rem;font-weight:500">' + esc(o) + mark + '</button>';
        }).join('');
        var ok = (sel === m.answer);
        var why = done ? '<div style="margin:9px 0 0;padding:10px 13px;border-radius:9px;background:' + (ok ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (ok ? '#9CC4A8' : '#E5A9A2') + '"><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.9rem;color:' + (ok ? '#2c6b3f' : '#b23121') + '">' + (ok ? ic('check', 15, 2.4) + 'Correct' : ic('x', 15, 2.4) + 'Not quite') + '</span><div style="margin-top:4px;font-size:.85rem;line-height:1.5;color:#474C57">' + esc(m.why || '') + '</div></div>' : '';
        return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600;color:#15171C">' + (mi + 1) + '. ' + esc(m.q) + '</p>' + opts + why + '</div>';
      }).join('');
      var total = mcItems.length, pct = Math.round(100 * correct / total);
      var score = '<div style="margin:2px 0 16px;max-width:460px">'
        + '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:6px"><span style="font-size:.9rem;font-weight:700;color:#15171C">' + (answered ? 'You got ' + correct + ' of ' + total : 'Answer to fill the meter') + '</span><span style="font-size:.78rem;color:#6B7280">' + answered + ' of ' + total + ' answered</span></div>'
        + '<div style="height:11px;background:#EEF1F5;border-radius:999px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#50694C,#74a878);border-radius:999px;transition:width .35s ease"></div></div>'
        + (answered ? '' : '<p style="font-size:.8rem;color:#6B7280;margin:8px 0 0">Pick an answer to check it right away. You can change your choice.</p>') + '</div>';
      var band = (answered === total && total) ? rcBand(correct, total) : null;
      var pctLabel = band ? Math.round(100 * correct / total) + '%' : '';
      var diagLine = '';
      if (band) {
        var prof = rcSkillProfile(r.id, mcItems);
        if (prof.has) {
          if (prof.strengths.length) { var coreBit = (prof.strengths.indexOf(RC_SKILLS.argument) >= 0 && r.coreIdea) ? ' You have the central point, that ' + lcFirst(esc(String(r.coreIdea).replace(/\s*\.?\s*$/, ''))) + '.' : ''; diagLine += '<div style="margin-top:12px"><span class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#2c6b3f">YOUR STRENGTHS</span><div style="font-size:.9rem;line-height:1.5;color:#15171C;margin-top:3px">Your answers show you read ' + listJoin(prof.strengths) + ' well.' + coreBit + '</div></div>'; }
          if (prof.opps.length) { var oppRows = prof.opps.map(function (o) { return '<div style="margin-top:7px"><span style="font-weight:600;color:#15171C">' + ucFirst(o.label) + '.</span> <span style="color:#474C57">' + (o.whys.length ? esc(o.whys.join(' ')) : 'Go back to this in the reading and read for it directly.') + '</span></div>'; }).join(''); diagLine += '<div style="margin-top:12px"><span class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#8F5E0F">AREAS OF OPPORTUNITY</span><div style="font-size:.875rem;line-height:1.5;color:#15171C;margin-top:1px">' + oppRows + '</div></div>'; }
          else diagLine += '<div style="margin-top:10px;font-size:.85rem;color:#2c6b3f">No gaps stood out. You handled the argument, the concepts, the context, and the significance, all of it.</div>';
        } else {
          diagLine = (missed.length) ? '<p style="margin:7px 0 0;font-size:.9rem;line-height:1.5;color:#15171C"><span style="font-weight:600">Look again at ' + numList(missed) + '.</span> Those are the ideas to firm up before you move on.</p>' : '<p style="margin:7px 0 0;font-size:.9rem;color:#15171C"><span style="font-weight:600">You answered every question correctly.</span> Nothing to revisit here.</p>';
        }
      }
      var bandHtml = band ? '<div style="margin:18px 0 4px;background:' + band.bg + ';border:1.5px solid ' + band.color + ';border-radius:13px;padding:17px 19px">'
        + '<div class="mono" style="font-size:.68rem;letter-spacing:.06em;color:' + band.color + ';margin-bottom:7px">WHERE YOU ARE IN THIS READING</div>'
        + '<div style="display:flex;align-items:center;gap:11px;flex-wrap:wrap"><span style="display:flex;color:' + band.color + '">' + ic(band.icon, 24, 2.2) + '</span><span style="font-size:1.35rem;font-weight:700;color:' + band.color + '">' + band.label + '</span><span style="margin-left:auto;text-align:right"><span style="display:block;font-size:1.05rem;font-weight:700;color:' + band.color + '">' + correct + ' of ' + total + '</span><span style="font-size:.72rem;color:#474C57">correct (' + pctLabel + ')</span></span></div>'
        + '<div style="height:8px;background:#fff;border-radius:999px;overflow:hidden;margin:11px 0 2px"><div style="height:100%;width:' + Math.round(100 * correct / total) + '%;background:' + band.color + ';border-radius:999px"></div></div>'
        + '<p style="margin:11px 0 0;font-size:.92rem;line-height:1.55;color:#15171C">' + band.msg + '</p>'
        + diagLine
        + '<div style="margin-top:14px;display:flex;gap:9px;flex-wrap:wrap"><button onclick="SOC.read(\'' + r.id + '\')" style="background:' + band.color + ';border:none;color:#fff;border-radius:9px;padding:8px 15px;font-size:.875rem;font-weight:600">' + readLabel(r) + ' &#8599;</button><button onclick="SOC.mcReset(\'' + r.id + '\')" style="background:#fff;border:1px solid ' + band.color + ';color:' + band.color + ';border-radius:9px;padding:8px 15px;font-size:.875rem;font-weight:600">Try these questions again</button></div></div>' : '';
      mcHtml = '<div style="margin:24px 0 4px"><h2 style="font-size:1.15rem;margin:0 0 3px">Check your understanding</h2><p style="font-size:.85rem;color:#6B7280;margin:0 0 12px">Quick questions on this reading, with the answer right away.</p>' + score + rows + bandHtml + '</div>';
    }
    return '<div class="rise"><div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:4px"><h1 style="font-size:1.5rem;margin:0">Build Your Reading Comprehension</h1><button onclick="SOC.rcClear()" style="margin-left:auto;background:none;border:none;color:var(--red);font-size:.875rem;font-weight:600">Choose a different reading</button></div>'
      + practiceNote
      + '<div style="background:#15171C;color:#fff;border-radius:12px;padding:15px 18px;margin:8px 0 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#9aa3b2;margin-bottom:3px">YOUR READING</div><div style="font-size:1.0625rem;font-weight:600">' + esc(r.title) + '</div><div style="font-size:.875rem;color:rgba(255,255,255,.85)">Week ' + r.week + ' · ' + esc(r.authors) + ' · ' + esc(r.year) + '</div><button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:10px;background:rgba(255,255,255,.14);border:none;color:#fff;border-radius:7px;padding:7px 13px;font-size:.85rem;font-weight:600">' + readLabel(r) + ' ↗</button></div>'
      + '<div style="font-size:.8125rem;font-weight:600;color:#15171C;margin-bottom:7px">Choose a lens (this changes the questions)</div><div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:6px">' + rcChips() + '</div><p style="font-size:.82rem;color:#6B7280;margin:0 0 16px">' + esc(lens.label) + ': ' + esc(lens.hint) + '.</p>'
      + zones
      + mcHtml
      + '<button onclick="SOC.saveReadingNotes()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:10px 18px;font-size:.9rem;font-weight:600;margin-top:8px">Save my notes</button></div>';
  }
  function compare() {
    var recs = state.compareIds.map(rec).filter(Boolean);
    var html = '<div class="rise"><div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;flex-wrap:wrap"><h1 style="font-size:1.75rem;font-weight:600;margin:0">Hold them side by side</h1><span style="font-size:.9375rem;color:#474C57">' + (recs.length ? recs.length + ' of 3 selected' : 'choose 2 or 3') + '</span>'
      + (recs.length ? '<button onclick="SOC.clearCompare()" style="margin-left:auto;background:none;border:none;color:var(--red);font-size:.875rem;font-weight:600">Clear all</button>' : '') + '</div>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 22px;">Choose readings from the list on the right, up to three, and they appear side by side here. Holding two readings together shows how they connect on the same topic.</p>';

    var left;
    if (recs.length >= 1) {
      var cols = recs.map(function (r) {
        var tm = typeMeta(r.type);
        var rows = [['WEEK', 'Week ' + r.week + ': ' + weekTitle(r.week)], ['YEAR', String(r.year)], ['ORIGIN', r.origin], ['LENGTH', r.len], ['LEVEL', D.levels[r.diff] || ''], ['THE CORE IDEA', r.coreIdea]]
          .map(function (row) { return '<div style="padding:11px 17px;border-top:1px solid #EEF1F5"><div class="mono" style="font-size:.625rem;letter-spacing:.05em;color:#6B7280;margin-bottom:4px">' + row[0] + '</div><div style="font-size:.875rem;line-height:1.45;color:#15171C">' + esc(row[1]) + '</div></div>'; }).join('');
        return '<div style="flex:none;width:280px;background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column"><div style="height:5px;background:' + tm.color + '"></div><div style="padding:16px 17px 14px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:11px"><span style="display:inline-flex;align-items:center;gap:6px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.6875rem;font-weight:600;padding:4px 9px;border-radius:999px">' + ic(tm.icon, 13) + esc(r.type) + '</span><button onclick="SOC.compare(\'' + r.id + '\')" class="removebtn" aria-label="Remove" style="margin-left:auto;background:none;border:none;color:#6b7280;display:flex;padding:6px">' + ic('x', 16) + '</button></div><button onclick="SOC.open(\'' + r.id + '\')" style="text-align:left;background:none;border:none;padding:0;display:block;margin-bottom:4px"><h3 style="font-size:1.0625rem;line-height:1.3;font-weight:600;margin:0;color:#15171C">' + esc(r.title) + '</h3></button><div style="font-size:.8125rem;color:#474C57">' + esc(r.authors) + '</div></div>' + rows + '</div>';
      }).join('');
      var hint = recs.length < 2 ? '<p style="font-size:.875rem;color:#6B7280;margin:0 0 12px">Pick one more reading on the right to compare it against this one.</p>' : '';
      var synthBlock = '';
      if (recs.length >= 2) {
        if (state.showSynthesis) {
          var syn = buildSynthesis(recs);
          synthBlock = '<div style="background:#15171C;color:#fff;border-radius:14px;padding:20px 22px;margin-bottom:18px">'
            + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:12px"><span style="display:flex;color:#fff">' + ic('sparkle', 17) + '</span><span class="mono" style="font-size:.75rem;letter-spacing:.04em;color:#fff">HOW THESE CONNECT</span><button onclick="SOC.hideSynthesis()" aria-label="Hide" style="margin-left:auto;background:rgba(255,255,255,.12);border:none;border-radius:7px;color:#fff;width:26px;height:26px;display:flex;align-items:center;justify-content:center">' + ic('x', 15) + '</button></div>'
            + syn.paras.map(function (p) { return '<p style="font-size:1rem;line-height:1.6;margin:0 0 12px;color:rgba(255,255,255,.92)">' + esc(p) + '</p>'; }).join('')
            + '</div>';
        } else {
          synthBlock = '<button onclick="SOC.synthesize()" style="display:inline-flex;align-items:center;gap:8px;border:none;border-radius:9px;padding:12px 22px;font-size:1rem;font-weight:600;color:#fff;background:#15171C;margin-bottom:18px">' + ic('sparkle', 16) + 'Synthesize their relationship</button>';
        }
      }
      left = hint + synthBlock + '<div class="hshelf" style="display:flex;gap:16px;align-items:stretch;overflow-x:auto;padding-bottom:10px">' + cols + '</div>';
    } else {
      left = '<div style="background:#fff;border:1px dashed #DEE3EA;border-radius:14px;padding:48px 26px;text-align:center;color:#474C57"><div style="display:inline-flex;color:#C9D1DC;margin-bottom:12px">' + ic('columns', 40, 1.4) + '</div><div style="font-size:1.0625rem;font-weight:600;color:#15171C;margin-bottom:6px">Nothing selected yet.</div><p style="font-size:.9375rem;margin:0">Choose two or three readings from the list on the right.</p></div>';
    }

    var right = '<aside class="soc-rail" style="position:sticky;top:84px">'
      + '<div class="soc-pickbox" style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column;max-height:calc(100vh - 110px)">'
      + '<div style="padding:13px 14px;border-bottom:1px solid #EEF1F5;flex:none"><div style="font-size:.9375rem;font-weight:600;color:#15171C">Readings</div><div style="font-size:.75rem;color:#6B7280;margin-top:2px">' + recs.length + ' of 3 selected. Tap to add or remove.</div></div>'
      + '<div class="scrollarea" style="overflow:auto">' + comparePickList() + '</div>'
      + '</div></aside>';

    html += '<div class="soc-detailgrid" style="display:grid;grid-template-columns:1fr 300px;gap:26px;align-items:start"><div>' + left + '</div>' + right + '</div>';
    return html + '</div>';
  }

  /* ---------- glossary & thinkers + self-check (course concepts) ---------- */
  function conceptsForWeek(w) { return (D.glossary || []).filter(function (g) { return g.week === w; }); }
  function thinkersForWeek(w) { return D.records.filter(function (r) { return r.week === w && r.authors.indexOf('OpenStax') < 0; }); }

  function glossaryByWeek(sel) {
    var weeks = (sel === 'all' || sel == null) ? weeksWithContent() : [parseInt(sel, 10)];
    return weeks.map(function (w) {
      var cons = conceptsForWeek(w).map(function (g) {
        return '<div style="margin:12px 0"><div style="font-size:.9375rem;font-weight:600;color:#15171C">' + esc(g.term) + '</div><div style="font-size:.875rem;line-height:1.55;color:#474C57;margin-top:3px">' + esc(g.def) + '</div>' + (g.cite ? '<div style="font-size:.75rem;color:#6B7280;border-left:3px solid #DEE3EA;padding-left:10px;margin-top:7px">' + esc(g.cite) + '</div>' : '') + '</div>';
      }).join('');
      var thinks = thinkersForWeek(w);
      var tk = thinks.length ? '<div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#6B7280;margin:14px 0 5px">SCHOLARS THIS WEEK</div>' + thinks.map(function (r) {
        return '<div style="margin:5px 0;font-size:.8125rem;color:#15171C;line-height:1.5">' + eyePill(r) + ' <button onclick="SOC.open(\'' + r.id + '\')" style="background:none;border:none;padding:0;color:#1552D8;font-weight:600;cursor:pointer">' + esc(r.authors) + '</button>. ' + esc(r.coreIdea) + '</div>';
      }).join('') : '';
      return '<div style="border:1px solid #DEE3EA;border-radius:12px;padding:10px 16px 15px;margin-bottom:14px;background:#fff"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#1B2A4A;margin:6px 0 2px">WEEK ' + w + ' &middot; ' + esc(weekTitle(w)) + '</div>' + (cons || '<p style="color:#6B7280;font-size:.875rem">No concepts listed.</p>') + tk + '</div>';
    }).join('');
  }
  function glossarySearchHTML(q) {
    q = (q || '').toLowerCase().trim(); if (!q) return '';
    var hits = (D.glossary || []).filter(function (g) { return (g.term + ' ' + g.def).toLowerCase().indexOf(q) >= 0; });
    if (!hits.length) return '<p style="color:#6B7280;font-size:.875rem">No matches. Try another word.</p>';
    return '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">' + hits.map(function (g) {
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div style="font-size:.9375rem;font-weight:600;color:#15171C">' + esc(g.term) + '</div><div style="font-size:.8125rem;line-height:1.55;color:#474C57;margin:4px 0 8px">' + esc(g.def) + '</div>' + (g.cite ? '<div style="font-size:.7rem;color:#6B7280;margin-bottom:8px">' + esc(g.cite) + '</div>' : '') + '<button onclick="SOC.glossWeekGo(' + g.week + ')" class="mono" style="font-size:.6875rem;color:#1B2A4A;background:#E6EAF1;border:none;padding:3px 8px;border-radius:6px;cursor:pointer">Week ' + g.week + '</button></div>';
    }).join('') + '</div>';
  }
  function glossaryScreen() {
    var sel = state.glossWeek;
    var weekOpts = '<option value="all"' + (sel === 'all' ? ' selected' : '') + '>All weeks</option>' + weeksWithContent().map(function (w) { return '<option value="' + w + '"' + (String(w) === String(sel) ? ' selected' : '') + '>Week ' + w + ': ' + esc(weekTitle(w)) + '</option>'; }).join('');
    return '<div class="rise">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:#6B7280;margin-bottom:8px">REFERENCE</div>'
      + '<h1 style="font-size:1.75rem;font-weight:600;margin:0 0 8px">Glossary and Thinkers</h1>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 18px;">The course concepts in plain words, week by week, and the scholars behind the readings.</p>'
      + '<label for="soc-gsearch" style="font-size:.8125rem;font-weight:600;color:#474C57;display:block;margin-bottom:6px">Search every concept</label>'
      + '<input id="soc-gsearch" oninput="SOC.glossSearch(this.value)" value="' + esc(state.glossSearch) + '" placeholder="Type a concept, for example: ways of knowing" autocomplete="off" style="width:100%;max-width:460px;padding:10px 13px;border:1px solid #DEE3EA;border-radius:9px;background:#fff;font-size:.9375rem;color:#15171C" />'
      + '<div id="soc-gsearchout" style="margin-top:12px">' + glossarySearchHTML(state.glossSearch) + '</div>'
      + '<label for="soc-gweek" style="font-size:.8125rem;font-weight:600;color:#474C57;display:block;margin:18px 0 6px">Or browse by week</label>'
      + '<select id="soc-gweek" onchange="SOC.glossWeek(this.value)" style="max-width:440px;padding:9px 12px;border:1px solid #DEE3EA;border-radius:9px;background:#fff;font-size:.9375rem;color:#15171C">' + weekOpts + '</select>'
      + '<div id="soc-gout" style="margin-top:16px">' + glossaryByWeek(sel) + '</div>'
      + '</div>';
  }

  function card(g) {
    return '<button class="flip" onclick="SOC.flip(this)" aria-label="Self-check: ' + esc(g.term) + '. Activate to reveal the definition.">'
      + '<span class="flip-inner">'
      + '<span class="flip-face flip-front">'
      + '<span style="display:flex;align-items:center;gap:8px;margin-bottom:11px"><span class="mono" style="font-size:.6875rem;color:#6B7280;margin-left:auto">WEEK ' + g.week + '</span></span>'
      + '<span class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#1B2A4A;margin-bottom:6px">RECALL</span>'
      + '<span style="font-size:1.0625rem;font-weight:600;line-height:1.3;color:#15171C">' + esc(g.term) + '</span>'
      + '<span style="margin-top:auto;padding-top:14px;font-size:.8125rem;color:#1552D8;font-weight:600">Reveal the definition &rarr;</span>'
      + '</span>'
      + '<span class="flip-face flip-back">'
      + '<span class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#F2A900;margin-bottom:8px">DEFINITION</span>'
      + '<span style="font-size:.9rem;line-height:1.5;font-weight:500">' + esc(g.def) + '</span>'
      + '<span style="margin-top:auto;padding-top:10px;font-size:.7rem;color:rgba(255,255,255,.62)">' + (g.cite ? esc(g.cite) : 'Week ' + g.week + ' &middot; ' + esc(weekTitle(g.week))) + '</span>'
      + '</span>'
      + '</span></button>';
  }
  function courseCode() { return (D.course && D.course.code) || ''; }
  function courseTitle() { return (D.course && (D.course.name || D.course.title)) || courseCode() || 'this course'; }
  function siteCard(kicker, title, text) {
    return '<article style="border:1px solid #DEE3EA;border-radius:12px;background:#fff;padding:15px 16px"><div class="mono" style="font-size:.64rem;letter-spacing:.07em;color:var(--red);font-weight:700;margin-bottom:6px">' + esc(kicker) + '</div><h3 style="font-size:1rem;line-height:1.25;margin:0 0 6px;color:var(--ink)">' + esc(title) + '</h3><p style="font-size:.88rem;line-height:1.55;color:var(--ink-dim);margin:0">' + esc(text) + '</p></article>';
  }
  function institutionalNoticeHtml() {
    var code = courseCode() || 'this course';
    return '<section class="node" aria-label="Companion website and Blackboard relationship" style="border-left:4px solid var(--red);border-radius:0 14px 14px 0;margin-bottom:18px">'
      + '<div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:8px">COMPANION WEBSITE</div>'
      + '<h2 class="wk-sec" style="margin-bottom:10px">What this site is for</h2>'
      + '<p style="font-size:1rem;line-height:1.62;color:var(--ink);margin:0 0 10px">This instructor-created companion website supports weekly learning in ' + esc(code) + '. Students use this site for weekly learning pathways, readings, key concepts, walkthroughs, and study supports. Blackboard remains the official Seneca course platform for announcements, assignment submission, grades, discussions, course records, and required administrative functions.</p>'
      + '<p style="font-size:.92rem;line-height:1.55;color:var(--ink-dim);margin:0">Use this site to learn and prepare. Use Blackboard for official instructions, submissions, grades, announcements, discussions, and course records.</p>'
      + '</section>';
  }
  function howToUseSiteHtml() {
    var steps = [
      'Start with the current week\'s learning pathway.',
      'Review the guiding questions and key concepts.',
      'Open the assigned readings and media.',
      'Use the walkthroughs and self-checks to prepare for class and assessments.',
      'Use Blackboard for official announcements, assignment submission, discussions, grades, and course records.'
    ];
    return '<section class="node" aria-labelledby="how-site-title"><h2 id="how-site-title" class="wk-sec">How to Use This Site</h2><ol style="display:grid;gap:9px;margin:0;padding-left:22px">'
      + steps.map(function (s) { return '<li style="font-size:.96rem;line-height:1.55;color:var(--ink-dim);padding-left:4px">' + esc(s) + '</li>'; }).join('')
      + '</ol></section>';
  }
  function siteInfoPage() {
    var code = courseCode() || 'this course';
    var title = courseTitle();
    var cards = [
      ['BLACKBOARD', 'Where official course work happens', 'Blackboard remains the official Seneca course platform for announcements, assignment submission, discussions, grades, course records, and required administrative functions.'],
      ['PRIVACY', 'What this site does not collect', 'This site does not require an account, does not collect student submissions, does not store grades, and does not request personal student information. Notes and check answers stay in this browser unless you export them.'],
      ['COPYRIGHT', 'How readings and media are used', 'Course readings and media are linked for educational use. Copyright remains with the original creators and publishers. Access readings through the provided links, Seneca library access, or Blackboard where applicable.'],
      ['MEDIA', 'External media', 'Some videos or media players may load from external platforms only when you choose to open or play them. Those platforms may have their own privacy practices.'],
      ['ACCESS', 'Accessibility support', 'This site is designed to support accessible course navigation. The Reading Lens button at the top of every page offers text size, spacing, a high-legibility font, page tints, a reading ruler, a magnifier, and read-aloud. If you experience a barrier, use Blackboard and contact the instructor so access can be supported.'],
      ['STUDY', 'What this site is for', 'Use this companion website for weekly learning pathways, readings, key concepts, walkthroughs, self-checks, glossary materials, and study supports.'],
      ['TECHNICAL', 'How this site is built', 'This is a static website: plain HTML, CSS, and JavaScript served from GitHub Pages, with no server, no database, no accounts, and no third-party trackers or analytics. All fonts and scripts load from this site itself.'],
      ['MAINTENANCE', 'How this site is maintained', 'The instructor maintains this site and updates it alongside Blackboard postings each term. If anything here ever looks out of date, Blackboard is the source of truth, and the instructor can be reached through Blackboard.'],
      ['LIMITS', 'Known limits', 'Saved notes and check answers live only in this browser on this device: clearing browser data removes them, and they do not move between devices. Some week videos may not yet have captions; their full scripts are posted in Blackboard. This site needs JavaScript; everything required for the course also remains available through Blackboard.']
    ];
    return '<div class="rise path-page">'
      + '<section class="path-hero"><div><div class="mono">COMPANION WEBSITE</div><h1>How This Site Works</h1><p>This page explains how the ' + esc(code) + ' companion website supports ' + esc(title) + ', what belongs on Blackboard, and how readings, privacy, accessibility, and media are handled.</p></div><div class="path-compass" aria-label="Companion website and Blackboard relationship"><span>THIS SITE</span><b>weekly learning pathway</b><i></i><span>BLACKBOARD</span><b>official course platform</b></div></section>'
      + institutionalNoticeHtml()
      + howToUseSiteHtml()
      + '<section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:16px 0">' + cards.map(function (c) { return siteCard(c[0], c[1], c[2]); }).join('') + '</section>'
      + '</div>';
  }
  function screenAnnounceText() {
    if (state.screen === 'station') return 'Week ' + state.stationWeek + ': ' + weekTitle(state.stationWeek);
    if (state.screen === 'site') return 'How This Site Works';
    if (state.screen === 'pathways') return 'Course Pathways';
    if (state.screen === 'readings') return 'Readings Library';
    if (state.screen === 'compare') return 'Compare Readings';
    if (state.screen === 'reading') return 'Reading Practice';
    if (state.screen === 'videos') return 'Videos and Podcasts';
    if (state.screen === 'glossary') return 'Glossary';
    if (state.screen === 'cards') return 'Concept Flashcards';
    if (state.screen === 'assignments') return 'Starting Your Assignment';
    if (state.screen === 'career') return 'Career Choices';
    if (state.screen === 'ecology') return 'Resilience Ecology';
    if (state.screen === 'activity') return 'Activity';
    if (state.screen === 'detail') return 'Reading Details';
    return 'Home';
  }
  function siteFooter() {
    var code = courseCode() || 'Course';
    return '<footer role="contentinfo" style="margin:28px 0 0;padding:18px 20px;border:1px solid #DEE3EA;border-top:4px solid var(--red);border-radius:14px;background:#fff;color:var(--ink-dim)">'
      + '<p style="font-size:.9rem;line-height:1.55;margin:0 0 8px"><strong style="color:var(--ink)">' + esc(code) + ' companion website.</strong> Blackboard remains the official course platform for submissions, grades, announcements, discussions, and course records.</p>'
      + '<p style="font-size:.84rem;line-height:1.55;margin:0 0 8px">This site does not require an account, does not collect student submissions, does not store grades, and does not request personal student information. Notes and check answers stay in this browser unless you export them. External media players may be subject to the privacy practices of the host platform.</p>'
      + '<p style="font-size:.84rem;line-height:1.55;margin:0">This site is designed to support accessible course navigation. Students who experience barriers using the site should use Blackboard and contact the instructor so access can be supported.</p>'
      + '</footer>';
  }
  function focusWeek(sel) { var ws = weeksWithReadings(); return sel == null ? (ws[0] || 1) : sel; }
  function recordsForWeek(w) { return D.records.filter(function (r) { return r.week === w; }); }
  function firstWhere(list, fn) { for (var i = 0; i < list.length; i++) if (fn(list[i])) return list[i]; return null; }
  function firstSentence(s) { var t = String(s || '').replace(/\s+/g, ' ').trim(), m = t.match(/^(.{60,220}?[.!?])\s/); return m ? m[1] : t.slice(0, 240); }
  function studioOpenBtn(r) {
    return r ? '<button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:6px;align-self:flex-start;background:none;border:none;color:#1552D8;font-size:.78rem;font-weight:600;padding:0;cursor:pointer">Open the reading &#8599;</button>' : '';
  }
  function studioPanel(kicker, title, body, meta, icon, accent, r) {
    return '<div style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid ' + accent + ';border-radius:12px;padding:15px 16px;display:flex;flex-direction:column;gap:8px;min-height:190px">'
      + '<div class="mono" style="display:flex;align-items:center;gap:7px;font-size:.6875rem;letter-spacing:.05em;color:#6B7280">' + ic(icon || 'clipboard', 14) + esc(kicker) + '</div>'
      + '<h3 style="font-size:1.0625rem;line-height:1.3;margin:0;color:#15171C">' + esc(title) + '</h3>'
      + '<p style="font-size:.875rem;line-height:1.55;color:#474C57;margin:0">' + esc(body) + '</p>'
      + (meta ? '<div style="margin-top:auto;border-left:3px solid #DEE3EA;padding-left:10px;font-size:.75rem;line-height:1.45;color:#6b7280">' + esc(meta) + '</div>' : '')
      + studioOpenBtn(r)
      + '</div>';
  }
  function studioCheck(key, check) {
    var sel = state.mcSel[key], done = (sel !== undefined && sel !== null), ok = done && sel === check.answer;
    var opts = check.options.map(function (o, oi) {
      var isSel = sel === oi, isCor = oi === check.answer, bg = '#fff', bd = '#DEE3EA', col = '#15171C';
      if (done && isCor) { bg = '#E9EFE7'; bd = '#50694C'; col = '#2c3b29'; }
      else if (done && isSel) { bg = '#F6E3E1'; bd = '#DA291C'; col = '#8f1b12'; }
      var mark = (done && isCor) ? ' &#10003;' : ((done && isSel) ? ' &#10007;' : '');
      return '<button onclick="SOC.mcPick(\'' + key + '\',' + oi + ')" aria-pressed="' + (isSel ? 'true' : 'false') + '" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.875rem;font-weight:500;cursor:pointer">' + esc(o) + mark + '</button>';
    }).join('');
    var why = done ? '<div style="margin:8px 0 0;padding:10px 13px;border-radius:9px;background:' + (ok ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (ok ? '#9CC4A8' : '#E5A9A2') + '"><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.875rem;color:' + (ok ? '#2c6b3f' : '#b23121') + '">' + (ok ? ic('check', 14, 2.4) + 'Correct' : ic('x', 14, 2.4) + 'Not quite') + '</span><div style="margin-top:4px;font-size:.84rem;line-height:1.5;color:#474C57">' + esc(check.why) + '</div></div>' : '';
    return '<div role="group" style="background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px;margin-top:14px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:8px">QUICK CHECK</div><p style="margin:0 0 9px;font-size:.9rem;font-weight:600;color:#15171C">' + esc(check.q) + '</p>' + opts + why + '</div>';
  }
  function studioShell(title, intro, inner) {
    return '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:18px 18px 20px;margin:0 0 22px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:6px">SELF-CHECK STUDIO</div>'
      + '<h2 style="font-size:1.3125rem;line-height:1.25;margin:0 0 7px;color:#15171C">' + esc(title) + '</h2>'
      + '<p style="font-size:.9375rem;line-height:1.55;color:#474C57;margin:0 0 15px;">' + esc(intro) + '</p>' + inner + '</section>';
  }
  function socStudio(sel) {
    if (!HAS_EYE) return '';
    var w = focusWeek(sel), recs = recordsForWeek(w);
    var west = firstWhere(recs, function (r) { return r.eye === 'western'; });
    var ind = firstWhere(recs, function (r) { return r.eye === 'indigenous'; });
    if (!ind) return '';
    var panels = (west ? studioPanel('WESTERN EYE', west.authors, west.coreIdea, west.title + ' (' + west.year + ')', 'eye', '#3a47a8', west) : '')
      + studioPanel('INDIGENOUS EYE', ind.authors, ind.coreIdea, ind.title + ' (' + ind.year + ')', 'eye', '#1f4d38', ind);
    var soloNote = west ? '' : '<div style="margin-top:12px;background:#E4F0E9;border:1px solid #c4ddcf;border-radius:11px;padding:12px 15px;font-size:.85rem;line-height:1.55;color:#1f4d38">This week centres Indigenous knowledge; there is no separate Western-eye reading to set beside it. That is itself a Two-Eyed Seeing observation: not every topic carries a Western counterpart, and the Indigenous frame stands on its own here.</div>';
    var prompts = west
      ? ['What does ' + ind.authors + '\'s reading let you see that ' + west.authors + '\'s does not?', 'What would be missed if this week were read with only the Western eye?', 'What responsibility does ' + ind.authors + ' ask you to keep visible?']
      : ['What does ' + ind.authors + '\'s reading let you see about this week\'s topic?', 'What responsibility does ' + ind.authors + ' ask you to keep visible?'];
    var practice = '<div style="margin-top:14px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:7px">TWO-EYED SEEING PRACTICE</div><p style="font-size:.78rem;color:#6b7280;line-height:1.5;margin:0 0 9px">Two-Eyed Seeing (Etuaptmumk) was named by Mi\'kmaw Elder Albert Marshall: seeing with the strengths of Indigenous knowledge in one eye and Western knowledge in the other, both kept whole. It is a practice you bring, not a synthesis the app writes.</p>' + prompts.map(function (p) { return '<div style="display:flex;gap:9px;align-items:flex-start;font-size:.875rem;line-height:1.5;color:#15171C;margin:6px 0"><span style="color:var(--red);font-weight:700">+</span><span>' + esc(p) + '</span></div>'; }).join('') + '</div>';
    var check = west ? studioCheck('SOC122|studio|' + w, {
      q: 'What is most at risk if this week\'s topic is treated as only a Western research-methods question?',
      options: [firstSentence(ind.coreIdea), 'Nothing important; the Western frame already covers it', 'Only the choice of examples or the citation style'],
      answer: 0,
      why: 'What is lost is exactly what ' + ind.authors + ' brings: ' + lcFirst(String(ind.coreIdea).replace(/\s*\.?\s*$/, '')) + '. Two-Eyed Seeing keeps both eyes open so this is not flattened into a footnote.'
    }) : '';
    var woven = '';
    if (west) {
      var wk2 = 'SOC122|weave|' + w, syn = (D.syntheses || {})[[west.id, ind.id].sort().join('|')];
      if (syn) woven = state.revealed[wk2]
        ? '<div style="margin-top:12px;background:#15171C;color:#fff;border-radius:11px;padding:14px 16px"><div class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#9aa3b2;margin-bottom:6px">ONE GROUNDED WEAVE</div><p style="font-size:.86rem;line-height:1.55;color:rgba(255,255,255,.92);margin:0">' + esc(syn) + '</p><p style="font-size:.72rem;color:#9aa3b2;margin:9px 0 0">One way the course readings have been held together, not the answer. Two-Eyed Seeing keeps both eyes distinct (Etuaptmumk), never blended. <button onclick="SOC.rcReveal(\'' + wk2 + '\')" style="background:none;border:none;color:#f3b0a8;font-weight:600;cursor:pointer;padding:0">Hide</button></p></div>'
        : '<button onclick="SOC.rcReveal(\'' + wk2 + '\')" style="margin-top:12px;background:#fff;border:1px solid #DEE3EA;color:#15171C;border-radius:9px;padding:9px 14px;font-size:.84rem;font-weight:600;cursor:pointer">Reflect first, then see one grounded weave &#8595;</button>';
    }
    var save = '<div style="margin-top:14px"><button onclick="SOC.saveStudio()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save my work to the Personal Cartography (.docx)</button></div>';
    return studioShell('Two attributed eyes', 'Read the two source frames as attributed readings, then bring Two-Eyed Seeing yourself. If you want a worked example of the practice, the Compare view can model one weaving; here, the weaving is yours.', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">' + panels + '</div>' + soloNote + practice + check + woven + save);
  }
  function psyStudio(sel) {
    var w = focusWeek(sel), recs = recordsForWeek(w), r = recs[0] || D.records[0], g = conceptsForWeek(w)[0] || (D.glossary || [])[0], items = (r && MC[r.id]) || [];
    if (!r) return '';
    var ev = firstWhere(items, function (m) { return m.skill === 'argument' || m.skill === 'context'; });
    var panels = studioPanel('CLAIM', r.title, r.coreIdea, r.authors + ' (' + r.year + ')', 'book', '#1552D8')
      + studioPanel('EVIDENCE', ev ? ev.q : 'What supports the claim?', ev ? ev.why : firstSentence(r.abstract), 'Ground this in the reading before applying it.', 'search', '#1f7a4d')
      + studioPanel('BOUNDARY', 'What this does not prove', 'Do not turn this idea into a rule for every learner. Check the context, supports, workload, strategy, and evidence before giving advice.', g ? g.term : 'Course concept', 'x', '#B7791F')
      + studioPanel('TRANSFER', 'Academic next step', 'Name one course task, one support, one study strategy, and one sign that the strategy is working.', 'No clinical or diagnostic framing.', 'external', '#7C3AED');
    var check = studioCheck('PSY355|studio|' + w, {
      q: 'Which next step uses this idea responsibly, without turning it into a rule or blaming the student?',
      options: ['Name one course task, one support, and one sign the strategy is working, then check the context before advising.', 'Tell the student they just need more grit or a better attitude.', 'Apply it the same way to every student, whatever their situation.'],
      answer: 0,
      why: 'The responsible step respects the boundary: ' + lcFirst(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + ', but only within its supports and context. Grit-talk blames the learner; one-size-fits-all overstates the reading.'
    });
    var save = '<div style="margin-top:14px"><button onclick="SOC.saveStudio()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save my work to the Resilience Plan (.docx)</button></div>';
    return studioShell('Evidence Transfer Lab', 'Move from definition to responsible application: claim, evidence, boundary, then academic transfer.', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">' + panels + '</div>' + check + save);
  }
  function bfsStudio(sel) {
    var w = focusWeek(sel), recs = recordsForWeek(w), r = recs[0] || D.records[0], g = conceptsForWeek(w)[0] || (D.glossary || [])[0];
    if (!r) return '';
    var response = firstWhere(D.records, function (x) { return (x.themes || []).indexOf('resistance') >= 0 || /Benjamin|Costanza|Tanksley/i.test(x.authors + ' ' + x.title); }) || r;
    var rows = [['System or technology', 'Name the system, platform, model, database, policy, or technical process.'], ['Design, data, or default', 'Locate the design choice, data source, rule, threshold, category, or default setting.'], ['Racialized mechanism', 'Explain how the system sorts, exposes, excludes, predicts, surveils, or ranks people.'], ['Harm and accountability', 'Name the harm and the institutions responsible for changing the structure, not just one bad actor.'], ['Response', 'Ground the repair, refusal, abolitionist tool, or policy response in the course readings.']];
    var chain = rows.map(function (row, i) { return '<div style="display:grid;grid-template-columns:34px minmax(0,1fr);gap:11px;align-items:start;background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:12px 14px"><div class="mono" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:#F6E3E1;color:var(--red);font-weight:700">' + (i + 1) + '</div><div><div style="font-size:.9375rem;font-weight:600;color:#15171C;margin-bottom:3px">' + esc(row[0]) + '</div><div style="font-size:.8125rem;line-height:1.5;color:#474C57">' + esc(row[1]) + '</div></div></div>'; }).join('');
    var anchor = '<div style="margin-top:14px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:7px">SOURCE ANCHORS</div><p style="font-size:.875rem;line-height:1.55;color:#15171C;margin:0 0 8px"><strong>' + esc(r.authors) + ':</strong> ' + esc(r.coreIdea) + '</p><p style="font-size:.875rem;line-height:1.55;color:#15171C;margin:0"><strong>Response reading:</strong> ' + esc(response.coreIdea) + '</p></div>';
    var check = studioCheck('BFS218|studio|' + w, {
      q: 'Which option names the racialized MECHANISM, not only the outcome or someone\'s intent?',
      options: [firstSentence(r.coreIdea), 'Someone built the system to be racist on purpose.', 'The unequal results just happened by chance.'],
      answer: 0,
      why: 'The mechanism sits in the design and data, not in intent or luck: ' + lcFirst(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + '. That is the New Jim Code, harm built into how the system is made.'
    });
    var save = '<div style="margin-top:14px"><button onclick="SOC.saveStudio()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save my work to the Personal Cartography (.docx)</button></div>';
    return studioShell('Accountability Chain Lab', 'Trace techno-racism through mechanism and responsibility. A strong answer names structure, not only intent.', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px">' + chain + '</div>' + anchor + (g ? '<div style="font-size:.75rem;color:#6B7280;margin-top:10px">Concept anchor: ' + esc(g.term) + '</div>' : '') + check + save);
  }
  function selfCheckStudio(sel) {
    var code = courseCode();
    if (code === 'SOC122') return socStudio(sel);
    if (code === 'PSY355') return psyStudio(sel);
    if (code === 'BFS218') return bfsStudio(sel);
    return '';
  }
  function cardsScreen() {
    var weeks = weeksWithContent();
    var sel = state.cardWeek;
    var list = (D.glossary || []).filter(function (g) { return sel == null || g.week === sel; });
    var opts = '<option value="">All weeks</option>' + weeks.map(function (w) { return '<option value="' + w + '"' + (sel === w ? ' selected' : '') + '>Week ' + w + ': ' + esc(weekTitle(w)) + '</option>'; }).join('');
    return '<div class="rise">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:#6B7280;margin-bottom:8px">SELF-CHECK</div>'
      + '<h1 style="font-size:1.75rem;font-weight:600;margin:0 0 8px">Recall the concepts</h1>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 18px;">Read the concept, define it in your own words, then flip the card to check yourself. Each card is one concept. Private study, never a test.</p>'
      + '<label for="soc-cardweek" style="font-size:.8125rem;font-weight:600;color:#474C57;display:block;margin-bottom:6px">Show concepts for</label>'
      + '<select id="soc-cardweek" onchange="SOC.cardWeek(this.value)" style="max-width:360px;padding:9px 12px;border:1px solid #DEE3EA;border-radius:9px;background:#fff;font-size:.9375rem;color:#15171C;margin-bottom:20px">' + opts + '</select>'
      + selfCheckStudio(sel)
      + '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">' + list.map(card).join('') + '</div></div>';
  }

  /* ---------- PSY355 Resilience Ecology (gated to PSY355) ---------- */
  var ECO_LAYERS = [
    { id: 'you', n: 1, label: 'You', short: 'You', r: 44, color: '#DA291C', anchor: 'Cassidy (2015); Yeager and Dweck (2020)', what: 'Academic self-efficacy, the belief that you can do this specific task, predicts resilience and can be built. A growth mindset helps, but it is bounded: belief alone does not overcome every obstacle.', prompt: 'Name one thing you can already do here, or one small win that shows you can grow at this.' },
    { id: 'strategies', n: 2, label: 'Your strategies', short: 'Strategies', r: 80, color: '#1B2A4A', anchor: 'Panadero (2017); Neff (2003)', what: 'Self-regulated learning is a teachable cycle: plan, monitor, adjust. Self-compassion is how you treat yourself when a plan slips.', prompt: 'Name one concrete way you will plan, monitor, or adjust, and one kind thing you will tell yourself if it does not go to plan.' },
    { id: 'people', n: 3, label: 'Your people', short: 'People', r: 116, color: '#1f7a4d', anchor: 'Wrench, Punyanunt-Carter and Thweatt (2020)', what: 'Help-seeking is a skill. Clear, mindful communication is what makes a request actually land.', prompt: 'Name one person you could ask for help, and exactly what you would ask them.' },
    { id: 'course', n: 4, label: 'Your course and institution', short: 'Course', r: 152, color: '#B7791F', anchor: 'Yeager and colleagues (2019)', what: 'Whether a mindset works depends on context. The course and the institution already make supports available: office hours, services, accommodations.', prompt: 'Name one support the course or Seneca offers that you could actually use.' },
    { id: 'context', n: 5, label: 'Your context and culture', short: 'Context', r: 190, color: '#3a47a8', anchor: 'Ungar (2011, 2013); Antony (2022)', what: 'Resilience is a quality of your whole social ecology, and what counts as resilience varies by context and culture. Support has to fit your real situation.', prompt: 'Name one thing in your wider life or community that supports you, or that you need to plan around.' }
  ];
  function ecoById(id) { for (var i = 0; i < ECO_LAYERS.length; i++) if (ECO_LAYERS[i].id === id) return ECO_LAYERS[i]; return ECO_LAYERS[0]; }
  function ecoFilled(id) { return (((state.ecoNotes && state.ecoNotes[id]) || '') + '').trim().length > 0; }
  function ecoCount() { var n = 0; ECO_LAYERS.forEach(function (L) { if (ecoFilled(L.id)) n++; }); return n; }
  function ecoRingsSVG() {
    var c = '', t = '';
    for (var i = ECO_LAYERS.length - 1; i >= 0; i--) {
      var L = ECO_LAYERS[i], on = state.ecoLayer === L.id, filled = ecoFilled(L.id);
      c += '<circle id="psy-ring-' + L.id + '" cx="200" cy="200" r="' + L.r + '" fill="' + (filled ? L.color : '#E8EBF0') + '" stroke="' + (on ? '#15171C' : '#ffffff') + '" stroke-width="' + (on ? 3.5 : 2) + '" tabindex="0" role="button" aria-label="' + esc(L.label) + (filled ? ', filled' : ', empty') + ', layer ' + L.n + ' of 5" onclick="SOC.ecoLayer(\'' + L.id + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();SOC.ecoLayer(\'' + L.id + '\')}" style="cursor:pointer"></circle>';
    }
    for (var j = 0; j < ECO_LAYERS.length; j++) {
      var Lj = ECO_LAYERS[j], y = (j === 0) ? 205 : Math.round(200 - (Lj.r + ECO_LAYERS[j - 1].r) / 2);
      t += '<text x="200" y="' + y + '" text-anchor="middle" font-size="' + (j === 0 ? 13 : 11) + '" font-weight="700" fill="#15171C" stroke="#ffffff" stroke-width="3.2" style="paint-order:stroke;pointer-events:none" font-family="IBM Plex Sans, ui-sans-serif, sans-serif">' + esc(j === 0 ? 'YOU' : Lj.short) + '</text>';
    }
    return '<svg viewBox="0 0 400 400" width="100%" style="max-width:430px;display:block;margin:0 auto" role="group" aria-label="Your resilience ecology, five nested layers from You at the centre out to Context and culture">' + c + t + '</svg>';
  }
  function ecoLayerPanel(id) {
    var L = ecoById(id), val = (state.ecoNotes && state.ecoNotes[id]) || '';
    return '<div style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid ' + L.color + ';border-radius:13px;padding:16px 18px">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:6px">LAYER ' + L.n + ' OF 5</div>'
      + '<h3 style="font-size:1.1875rem;font-weight:600;margin:0 0 4px;color:#15171C">' + esc(L.label) + '</h3>'
      + '<div style="font-size:.72rem;font-weight:600;color:' + L.color + ';margin-bottom:10px">Grounded in ' + esc(L.anchor) + '</div>'
      + '<p style="font-size:.875rem;line-height:1.55;color:#474C57;margin:0 0 12px">' + esc(L.what) + '</p>'
      + '<label style="display:block"><span style="display:block;font-size:.875rem;font-weight:600;color:#15171C;margin-bottom:7px">' + esc(L.prompt) + '</span>'
      + '<textarea oninput="SOC.ecoNote(\'' + L.id + '\',this.value)" placeholder="Your resource for this layer..." style="width:100%;min-height:96px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + esc(val) + '</textarea></label>'
      + '</div>';
  }
  function ecoChips() {
    return '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;justify-content:center">' + ECO_LAYERS.map(function (L) {
      var on = state.ecoLayer === L.id, done = ecoFilled(L.id);
      return '<button onclick="SOC.ecoLayer(\'' + L.id + '\')" aria-pressed="' + on + '" style="display:inline-flex;align-items:center;gap:7px;border:1.5px solid ' + (on ? L.color : '#DEE3EA') + ';background:' + (on ? L.color + '14' : '#fff') + ';color:#15171C;border-radius:999px;padding:7px 13px;font-size:.8125rem;font-weight:600;cursor:pointer">'
        + '<span style="display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;background:' + (done ? L.color : '#E8EBF0') + ';border:1.5px solid ' + (done ? L.color : '#CBD2DB') + ';color:#fff">' + (done ? ic('check', 10, 3) : '') + '</span>' + esc(L.short) + '</button>';
    }).join('') + '</div>';
  }
  function ecologyScreen() {
    var active = state.ecoLayer || 'you';
    var challenge = '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px;margin:0 0 18px"><label style="display:block"><span style="display:block;font-size:.8125rem;font-weight:600;color:#474C57;margin-bottom:7px">Name one academic challenge you are facing this term</span><input value="' + esc(state.ecoChallenge || '') + '" oninput="SOC.ecoChallenge(this.value)" placeholder="for example, staying on top of readings in a heavy course load" style="width:100%;font:inherit;font-size:.95rem;padding:10px 13px;border:1px solid #DEE3EA;border-radius:9px;color:#15171C;background:#F7F8FA"></label></div>';
    var count = '<p style="font-size:.8rem;color:#6b7280;margin:12px 0 0;text-align:center"><span id="psy-ecocount">' + ecoCount() + ' of 5</span> layers filled. Resilience builds as the outer layers fill, not from the centre alone.</p>';
    var save = '<div style="margin-top:18px"><button onclick="SOC.saveResiliencePlan()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:10px 18px;font-size:.875rem;font-weight:600;cursor:pointer">Save my Personal Resilience Plan (.docx)</button></div>';
    var support = '<div style="display:flex;align-items:flex-start;gap:10px;background:#EAF1F0;border:1px solid #BFD8D2;border-radius:12px;padding:13px 16px;margin-top:16px;color:#1f4d38;font-size:.83rem;line-height:1.55"><span style="display:flex;flex:none;margin-top:1px">' + ic('check', 16) + '</span><span>This is a study and mindset planning tool, not therapy or a clinical assessment. If you are struggling with your well-being, Seneca Counselling and Accessible Learning Services are there for exactly that. Asking for help is a skill, not a failure.</span></div>';
    return '<div class="rise">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:8px">RESILIENCE ECOLOGY</div>'
      + '<h1 style="font-size:1.75rem;line-height:1.2;font-weight:600;margin:0 0 8px;color:#15171C">Build your resilience ecology.</h1>'
      + '<p style="font-size:.9375rem;line-height:1.55;color:#474C57;margin:0 0 6px;">Resilience is not grit at the centre. The course evidence says it is an ecology of resources across nested layers, and a process you move through. Pick a real challenge, then fill each layer with one resource you can actually reach.</p>'
      + '<p style="font-size:.85rem;line-height:1.5;color:#6b7280;margin:0 0 16px;">A hard stretch is a stage to move through, not a verdict on who you are (Richardson, 2011).</p>'
      + challenge
      + '<div class="psy-ecogrid">'
      + '<div><div id="psy-ecorings">' + ecoRingsSVG() + '</div><div id="psy-ecochips">' + ecoChips() + '</div>' + count + '</div>'
      + '<aside id="psy-ecopanel">' + ecoLayerPanel(active) + '</aside>'
      + '</div>'
      + save + support
      + '</div>';
  }

  /* ---------- immersive journey shell (cascaded, course-aware) ---------- */
  var JOURNEY_Q = {
    BFS218: {
      1: 'Can a technology sold as neutral still carry old racism forward?',
      2: 'Why does harm show up most clearly at the intersection of systems?',
      5: 'What happens when a system is built to see some faces better than others?',
      6: 'When policing and borders run on algorithms, who is watched, and who gets to decide?',
      8: 'Who owns the data, and who controls the story it tells?',
      10: 'When an algorithm decides who gets help, who gets left behind?',
      11: 'If the tools carry the harm, who gets to redesign them?',
      12: 'Who is accountable when the system causes harm, and does the law keep up?'
    },
    PSY355: {
      1: 'What actually makes someone resilient: their grit, or the resources around them?',
      3: 'Does believing you can grow change your results, and when does it not?',
      4: 'Where does the confidence to keep going actually come from?',
      5: 'Is a hard stretch a verdict on who you are, or a stage you move through?',
      6: 'Why does the same support help one person and not another?',
      7: 'Can adversity itself become a source of growth, and how?',
      8: 'Is being hard on yourself what keeps you going, or what wears you down?',
      9: 'What lets you keep going without breaking, persistence or flexibility?',
      10: 'Can writing about your own experience actually build resilience?',
      11: 'What makes asking for help actually work?',
      2: 'What changes when you plan, monitor, and adjust your own studying on purpose?',
      12: 'What does a workable idea of wellbeing look like when the week is actually hard?',
      13: 'Which of these tools would actually hold you up under pressure, and how do you know?',
      14: 'What from this course still works when nobody is grading you?'
    }
  };
  function journeyQ(w) { var c = (D.course && D.course.code) || ''; return (JOURNEY_Q[c] && JOURNEY_Q[c][w]) || 'What is this week asking you to see?'; }
  function journeyWeeks() { var c = (D.course && D.course.code) || '', s = {}; weeksWithReadings().forEach(function (w) { s[w] = 1; }); if (typeof WEEKPAGE !== 'undefined' && WEEKPAGE[c]) Object.keys(WEEKPAGE[c]).forEach(function (w) { s[+w] = 1; }); return Object.keys(s).map(Number).sort(function (a, b) { return a - b; }); }
  function currentJourneyWeek() { var ws = journeyWeeks(); if (!ws.length) return null; if (state.journeyWeek && ws.indexOf(state.journeyWeek) >= 0) return state.journeyWeek; return ws[0]; }
  function heroArt() {
    return '<svg class="jhero-art" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
      + '<path d="M0,250 C160,210 300,300 460,250 C620,200 720,260 800,230 L800,320 L0,320 Z" fill="#DA291C" fill-opacity=".05"/>'
      + '<path d="M0,285 C180,250 320,320 500,280 C660,245 740,295 800,275 L800,320 L0,320 Z" fill="#1B2A4A" fill-opacity=".04"/>'
      + '<g stroke="#DA291C" stroke-opacity=".10" fill="none" stroke-width="1.4"><path d="M360,150 C480,110 600,180 760,130 C800,116 810,120 830,112"/><path d="M360,185 C480,150 600,215 760,165 C800,150 810,156 830,148"/></g>'
      + '<g fill="#DA291C" fill-opacity=".16"><circle cx="690" cy="70" r="2.6"/><circle cx="742" cy="118" r="1.8"/><circle cx="636" cy="52" r="1.6"/></g>'
      + '</svg>';
  }
  function journeyIntro() { return 'Follow one question through the whole course, week by week. Each week sets up what to read, why it matters, and one thing to do with it. Start at the top, or pick up where you left off.'; }
  function journeyHome() {
    var ws = journeyWeeks(), cur = currentJourneyWeek(), started = !!state.journeyWeek;
    var title = (D.course && (D.course.name || D.course.code)) || 'Your course';
    var ctaLabel = started ? ('Resume Week ' + cur) : ('Start Week ' + (ws[0] || 1));
    var hero = '<section class="jhero jfade" style="margin-bottom:26px">' + heroArt()
      + '<div style="position:relative;">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.08em;color:var(--red);font-weight:600;margin-bottom:12px">SENECA POLYTECHNIC &middot; FALL 2026</div>'
      + '<h1 class="jhero-title" style="font-size:2.5rem;line-height:1.1;font-weight:600;margin:0 0 14px;letter-spacing:0">' + esc(title) + '</h1>'
      + '<p style="font-size:1.0625rem;line-height:1.6;color:var(--ink-dim);margin:0 0 24px;">' + esc(journeyIntro()) + '</p>'
      + '<button class="jhero-cta" onclick="SOC.station(' + (cur || (ws[0] || 1)) + ')">' + ctaLabel + ic('chevron', 18, 2.4) + '</button>'
      + (started ? '' : '<div style="margin-top:14px;font-size:.8125rem;color:var(--ink-faint)">' + ws.length + ' weeks in this course</div>')
      + '</div></section>';
    var spineHead = '<div style="display:flex;align-items:baseline;gap:12px;margin:0 0 16px;flex-wrap:wrap"><h2 style="font-size:1.375rem;font-weight:600;margin:0;color:var(--ink)">Your journey</h2><span style="font-size:.875rem;color:var(--ink-faint)">' + ws.length + ' weeks, in course order</span></div>';
    return '<div class="rise">' + hero + institutionalNoticeHtml() + howToUseSiteHtml() + lensHomeIntro() + spineHead + journeyStations(cur) + '</div>';
  }
  function journeyStations(cur) {
    var ws = journeyWeeks();
    var studyDivider = '<div style="display:flex;align-items:center;gap:12px;padding:11px 16px;border:1px dashed var(--border);border-radius:12px;background:#FAFBFC"><span class="mono" style="font-size:.66rem;font-weight:700;letter-spacing:.06em;color:var(--red)">STUDY WEEK</span><span style="font-size:.86rem;color:var(--ink-dim)">' + STUDY_WEEK_DATE + ' &middot; Seneca open, no classes, no new work</span></div>';
    var out = '', studyIn = false;
    var studyMarker = function () { var m = (ws.indexOf(7) < 0) ? '<div style="display:flex;align-items:center;gap:12px;padding:11px 16px;border:1px dashed var(--border);border-radius:12px;background:#FAFBFC"><span class="mono" style="font-size:.66rem;font-weight:700;letter-spacing:.06em;color:var(--ink-faint)">WEEK 7</span><span style="font-size:.86rem;color:var(--ink-dim)">' + esc(weekDate(7)) + ' &middot; Cumulative review, no new readings</span></div>' : ''; return m + studyDivider; };
    ws.forEach(function (w) {
      if (!studyIn && w >= 8) { out += studyMarker(); studyIn = true; }
      var recs = recordsForWeek(w), n = recs.length, isCur = (w === cur);
      var note = (w === OVERVIEW_WEEK) ? 'Course overview' : (WORK_WEEKS.indexOf(w) >= 0 ? 'Focus on your work, no new material' : (n + (n === 1 ? ' reading' : ' readings')));
      out += '<button class="jstation' + (isCur ? ' cur' : '') + '" onclick="SOC.station(' + w + ')">'
        + '<div style="display:flex;align-items:flex-start;gap:16px">'
        + '<span class="jdot" style="display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;flex:none;border-radius:12px;background:' + (isCur ? 'var(--red)' : '#1B2A4A') + ';color:#fff;font-family:var(--mono);font-size:1.0625rem;font-weight:600">' + w + '</span>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:3px">' + (isCur ? '<span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.06em;color:#B02318;background:#F6E3E1;padding:2px 8px;border-radius:999px">YOU ARE HERE</span>' : '') + lensCardBadge(w) + '<span class="mono" style="font-size:.66rem;color:var(--ink-faint);letter-spacing:.03em">' + esc(weekDate(w)) + '</span></div>'
        + '<h3 style="font-size:1.0625rem;font-weight:600;margin:0 0 2px;color:var(--ink)">' + esc(weekTitle(w)) + '</h3>'
        + '<p style="font-size:.9375rem;line-height:1.5;color:var(--ink-dim);margin:0 0 8px">' + esc(journeyQ(w)) + '</p>' + lensCardLine(w)
        + '<div style="display:flex;align-items:center;gap:7px;font-size:.75rem;color:var(--ink-faint)"><span style="display:inline-flex;color:#6B7280">' + ic('book', 13) + '</span>' + esc(note) + '<span style="margin:0 4px">&middot;</span><span style="color:var(--red);font-weight:600">Open &rarr;</span></div>'
        + '</div></div></button>';
      if (w === 7) { out += studyDivider; studyIn = true; }
    });
    return '<div style="display:flex;flex-direction:column;gap:12px">' + out + '</div>';
  }
  function stationFraming(w, recs) {
    if (recs.length > 1) return 'This week brings ' + recs.length + ' readings together. Read them as parts of one argument, not as separate facts.';
    if (recs.length === 1) return 'This week turns on one reading. Read it closely, then do something with it.';
    return '';
  }
  function stationReading(r, kicker) {
    var u = readUrl(r), accent = '#3a47a8';
    var look = r.assigned ? ('<div style="margin-top:10px;background:#F7F8FA;border-left:3px solid ' + accent + ';padding:8px 12px;border-radius:0 8px 8px 0;font-size:.8125rem;line-height:1.5;color:var(--ink-dim)"><span style="font-weight:600;color:var(--ink)">Read:</span> ' + esc(r.assigned) + '</div>') : '';
    return '<div style="border:1px solid var(--border);border-top:4px solid ' + accent + ';background:#fff;border-radius:13px;padding:17px 19px">'
      + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:7px"><span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.04em;color:' + accent + '">' + esc(kicker) + '</span></div>'
      + '<h3 style="font-size:1.1875rem;line-height:1.3;font-weight:600;margin:0 0 3px;color:var(--ink)">' + esc(r.title) + '</h3>'
      + '<div style="font-size:.8125rem;color:var(--ink-dim);margin-bottom:9px">' + esc(r.authors) + ' &middot; ' + esc(String(r.year)) + '</div>'
      + '<p style="font-size:.9375rem;line-height:1.55;color:var(--ink-dim);margin:0">' + esc(r.coreIdea) + '</p>'
      + look
      + '<div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">'
      + (u ? '<button onclick="SOC.read(\'' + r.id + '\')" style="display:inline-flex;align-items:center;gap:7px;background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Open the reading' + ic('external', 14, 2.2) + '</button>' : '')
      + '<button onclick="SOC.open(\'' + r.id + '\')" style="background:#fff;border:1px solid var(--border);color:var(--ink);border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Details</button>'
      + '</div></div>';
  }
  function stationDo(w) {
    var tiles = [['See it for yourself', 'Work this week\'s readings in the Self-Check Studio.', 'clipboard', 'SOC.goWeek(\'cards\',' + w + ')']];
    if (D.course && D.course.frame) tiles.push(['Locate it on your map', 'Add this week to your Personal Cartography.', 'globe', 'SOC.go(\'map\')']);
    if (D.course && D.course.code === 'BFS218') tiles.push(['Audit a system', 'Watch a racialized harm appear in the sandbox, then name it.', 'search', 'SOC.go(\'sandbox\')']);
    if (D.course && D.course.code === 'PSY355') tiles.push(['Build your resilience', 'Bring this week into your Resilience Ecology.', 'layers', 'SOC.go(\'ecology\')']);
    tiles.push(['Hold two readings together', 'Compare any two readings, side by side.', 'columns', 'SOC.go(\'compare\')']);
    var th = tiles.map(function (t) {
      return '<button class="jtile" onclick="' + t[3] + '"><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:11px;background:#F6E3E1;color:var(--red)">' + ic(t[2], 19) + '</span><h3 style="font-size:1rem;font-weight:600;margin:4px 0 0;color:var(--ink)">' + t[0] + '</h3><p style="font-size:.84rem;line-height:1.5;color:var(--ink-dim);margin:0">' + t[1] + '</p></button>';
    }).join('');
    return '<div style="margin-top:8px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--ink-faint);margin:0 0 12px">NOW DO SOMETHING WITH IT</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">' + th + '</div></div>';
  }
  var WEEKPAGE = {
    PSY355: {
      1: {"time": "About 60 minutes (read, do, reflect)", "deck": "", "overview": "Welcome to Psychology of Learning. This course is about how you learn, and about three capacities that shape every study session: mindset, the story you tell yourself about ability and effort; self-regulated learning, how you actually manage the conditions of studying; and resilience, how you adapt and recover when an assignment or a topic gets hard. These three fit together because a setback in your studies is rarely just one thing, what you believe about it, how you organize your work around it, and how you recover from it all move together. This first week is lighter on purpose, because before we look closely at any one idea, we want a shared language and a clear sense of why this matters for your own studies.", "purpose": "Week 1 connects psychological theory to practical, everyday learning. It introduces mindset, resilience, and well-being as working capacities for academic challenges, not fixed traits, and it launches a personal learning map you can revise across the term. The aim is to treat learning as a practice you can adjust, not a verdict on your ability.", "outcomes": ["By the end of this week you can explain the course focus in plain language and say why learning is treated as a practice rather than a fixed ability.", "By the end of this week you can distinguish a fixed label about ability from learning as a practice you can build through effort and strategy.", "By the end of this week you can describe resilience as a process of adapting and recovering with support and context, not a trait some students simply have.", "By the end of this week you can begin a personal learning map that names the conditions that help your learning and the conditions that make it harder."], "guiding": ["What changes when you treat learning as a practice rather than a verdict on your ability?", "What does this week show about well-being as a working capacity rather than a fixed mood?", "Where does a mindset or resilience model help, and where does it need the context of your real situation?", "What is one concrete action you could try this week without pretending the barrier is simple?"], "checks": [{"t": "Why learning is treated as a practice you can build, not a fixed verdict on your ability", "look": "the Key Concepts"}, {"t": "What a mindset is, and why it works as a lens you can notice and adjust rather than a label you are stuck with", "look": "the Yeager and Dweck reading"}, {"t": "Why resilience is a process of adapting and recovering with support and context, not a trait some students simply have", "look": "the Ungar reading"}, {"t": "How self-regulated learning lets you manage the conditions of studying instead of judging your ability", "look": "the Panadero reading"}, {"t": "Naming the conditions that help or block your own learning in a two-column learning map", "look": "the activity"}], "concepts": [{"h": "Well-being as a working capacity", "body": "Well-being is a working state that helps you cope, act, recover, and contribute, not a fixed mood or a private feeling. In this course it is treated as a capacity that shifts with conditions: rest, support, workload, and circumstance all move it. Naming it this way matters for your studies, because it reframes a hard week as a set of conditions to manage rather than proof of a flaw in you.", "cite": "Owen, 2023"}, {"h": "Mindset as a lens you can adjust", "body": "A mindset is a belief pattern about ability, effort, challenge, and change. It is not a single thought but a default lens through which you read a setback: as a verdict on fixed capacity, or as information about what to practise next. Because that lens shapes what you do after difficulty, noticing it is one of the most practical moves in the course, and it is also why mindset is never treated as the whole story.", "cite": "Yeager and Dweck, 2020"}, {"h": "Resilience as a process", "body": "Resilience is a process of adapting and recovering through support, practice, and context, not a personality trait some people simply have. Understood as a process, it can be supported and built rather than only admired. For a student, this lowers the pressure to be tough alone and raises a more useful question: what response, what support, and what conditions make adapting to an academic setback possible here.", "cite": "Ungar, 2011"}, {"h": "Self-regulated learning", "body": "Self-regulated learning is how you manage the conditions of your own studying: setting a goal, choosing a strategy, monitoring how it is going, and adjusting. Panadero reviews several models of how this works and shows it is a set of skills students can develop, not a talent you either have or lack. The value for you is that conditions and strategies can be changed where character cannot, which gives you a place to start.", "cite": "Panadero, 2017"}], "terms": [{"term": "Well-being", "def": "a working state that helps you cope, act, recover, and contribute, which shifts with conditions such as rest, support, and workload rather than being a fixed mood.", "cite": "Owen, 2023"}, {"term": "Mindset", "def": "a belief pattern about ability, effort, challenge, and change that works as a lens for reading a setback, a lens you can notice and adjust rather than a label you are stuck with.", "cite": "Yeager and Dweck, 2020"}, {"term": "Resilience", "def": "a process of adapting and recovering through support, practice, and context, not a fixed trait that some students simply have and others lack.", "cite": "Ungar, 2011"}, {"term": "Self-regulated learning", "def": "the skills of managing your own studying by setting goals, choosing strategies, monitoring progress, and adjusting, which can be developed rather than only possessed.", "cite": "Panadero, 2017"}], "readings": [{"apa": "Owen, J. (2023). Psychological resilience: Connecting contemporary psychology to ancient practical philosophy. Theory & Psychology, 33(3), 366-385. https://doi.org/10.1177/09593543231153820", "scope": "Read this on Blackboard or Open access", "id": "owen2023"}, {"apa": "Yeager, D. S., & Dweck, C. S. (2020). What can be learned from growth mindset controversies? American Psychologist, 75(9), 1269-1284.", "scope": "Read this on Blackboard or Open access", "id": "yeager-dweck2020"}, {"apa": "Ungar, M. (2011). The social ecology of resilience: Addressing contextual and cultural ambiguity of a nascent construct. American Journal of Orthopsychiatry, 81(1), 1-17.", "scope": "Read this on Blackboard or Open access", "id": "ungar2011"}, {"apa": "Panadero, E. (2017). A review of self-regulated learning: Six models and four directions for research. Frontiers in Psychology, 8, 422.", "scope": "Read this on Blackboard or Open access", "id": "panadero2017"}], "activity": {"screen": "activity", "archetype": "match", "title": "Read your starting point", "what": "You match everyday academic learning moments to the course idea each one shows, so the three threads of the week become recognizable in your own studying.", "why": "so you can spot mindset, resilience, well-being, and self-regulated learning in real study situations before you map your own.", "data": {"prompt": "Match each everyday learning moment to the idea it shows.", "pairs": [{"item": "After a low grade on a quiz, you tell yourself the topic is just not your strength and stop trying new strategies.", "match": "mindset", "why": "Reading a setback as a verdict on fixed ability is the mindset lens at work, and noticing it is what lets you choose a different reading next time.", "cite": "Yeager and Dweck, 2020"}, {"item": "A group project falls apart the week before the deadline, so you regroup, ask a classmate for help, and rebuild a plan that still works.", "match": "resilience", "why": "Adapting and recovering through support and a new plan, rather than giving up, is resilience as a process you can build.", "cite": "Ungar, 2011"}, {"item": "Before studying, you set a clear goal for the session, choose a strategy, then check partway through whether it is working and adjust.", "match": "learning", "why": "Setting a goal, choosing a strategy, monitoring, and adjusting is self-regulated learning, the skill of managing the conditions of your own studying.", "cite": "Panadero, 2017"}, {"item": "You notice that a heavy work shift and little sleep made a study week feel impossible, so you treat it as conditions to manage rather than proof you cannot do the course.", "match": "well-being", "why": "Treating a hard week as shifting conditions of rest, support, and workload, not a flaw in you, is well-being understood as a working capacity.", "cite": "Owen, 2023"}, {"item": "You draft a two-column list of what helps your learning and what makes it harder, then pick one condition you can actually change this week.", "match": "learning", "why": "Naming changeable conditions instead of judging your ability is the practical heart of self-regulated learning and the personal learning map.", "cite": "Panadero, 2017"}]}}, "youcan": ["You can now explain in plain language why this course treats learning as a practice you build rather than a fixed verdict on ability", "You can now tell the difference between mindset, resilience, and self-regulated learning, and say how the three fit together", "You can now name some of the conditions that help or block your own learning, instead of judging your ability"], "reflectPrompt": "In a sentence or two: what is one learning habit you already have that deserves to be strengthened rather than judged, and what would strengthening it look like this week?"},
      3: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week03", "overview": "This week takes the idea of a growth mindset seriously enough to ask where it actually holds up and where it gets oversold. A growth mindset is the belief that ability can develop through practice, support, and strategy, and there is real evidence behind it. There is also a careful debate about its limits, because belief alone does not remove the barriers a student did not create. The work here is to use the idea precisely, with the evidence and the limits both in view, rather than turning it into a slogan.", "purpose": "This week grounds the growth mindset in evidence while keeping its limits honest. You will see where mindset interventions can help and for whom, and why context decides much of that (Yeager et al., 2019). The aim is to use the concept where it applies, name where it does not, and never use it to blame students for obstacles that belong to the situation (Yeager & Dweck, 2020).", "outcomes": ["Explain a growth mindset in plain language without reducing it to a motivational slogan (Yeager & Dweck, 2020).", "Use evidence to describe where and for whom a growth mindset intervention may help (Yeager et al., 2019).", "Distinguish a fixed-mindset response from a growth-oriented one in a real academic situation (Yeager & Dweck, 2020).", "Name why mindset work must not blame students for barriers they did not create (Yeager & Dweck, 2020)."], "guiding": ["When does a growth mindset help with learning, and when does the phrase become too simple?", "What did the national experiment show about where and for whom a growth mindset improves achievement (Yeager et al., 2019)?", "How is a fixed-mindset response visible in what a student does after a setback, not just in what they believe?", "Where does mindset stop explaining things, and what in the situation has to change instead of the belief?"], "checks": [{"t": "A growth mindset is the belief that ability can develop through practice, support, and strategy, not that belief alone overcomes every obstacle", "look": "the Yeager and Dweck (2020) reading and the Key Concepts"}, {"t": "A fixed mindset shows up in behaviour after a setback: avoiding challenge, hiding mistakes, or giving up early to protect a sense of being smart", "look": "the Key Concepts and the Growth or fixed activity"}, {"t": "Whether a growth mindset improves achievement depends on context: it helped specific students under supportive conditions, not everyone everywhere", "look": "the Yeager et al. (2019) national experiment"}, {"t": "Mindset belief is linked to achievement at scale, but a correlation is not a promise that belief alone fixes a hard situation", "look": "the Claro, Paunesku, and Dweck (2016) reading"}, {"t": "An evidence limit keeps the idea honest: growth mindset must not be used to blame students for barriers they did not create", "look": "the Yeager and Dweck (2020) reading and the activity"}], "concepts": [{"h": "Growth mindset, stated precisely", "body": "A growth mindset is the belief that ability can develop through practice, support, and strategy, rather than being fixed at a set level. Yeager and Dweck (2020) describe it carefully, noting both where it can help and where it has been oversimplified. The useful version for students is precise: it does not promise that belief alone overcomes every obstacle, only that capacity is something that can grow when effort is paired with the right support and methods.", "cite": "Yeager & Dweck, 2020"}, {"h": "Fixed mindset, visible in behaviour", "body": "A fixed mindset is the belief that ability is mostly settled, so that struggle or failure proves a limit in capacity. Its real risk is behavioural: a student holding it may avoid challenge, hide mistakes, or give up early to protect a sense of being smart (Yeager & Dweck, 2020). Naming a fixed mindset is not a way to label a student, but a way to notice when a belief about ability is quietly shaping the choices made after a setback.", "cite": "Yeager & Dweck, 2020"}, {"h": "Context decides where mindset helps", "body": "A growth mindset is one input among many, not a force that works the same way for everyone. In a national experiment, Yeager et al. (2019) found that a brief growth-mindset intervention improved achievement for lower-achieving students and where school environments supported the message, not uniformly across all students. The lesson is that where and for whom mindset helps depends on the surrounding conditions, so the concept cannot be expected to overcome barriers that belong to the situation.", "cite": "Yeager et al., 2019"}, {"h": "The evidence limit keeps the idea honest", "body": "An evidence limit is the boundary where a useful idea stops explaining everything. Claro, Paunesku, and Dweck (2016) found that mindset relates to achievement across a whole national student population, which is real support, yet a correlation is not proof that belief alone fixes a hard situation. Yeager and Dweck (2020) are clear that growth mindset is not a cure for every academic problem and must not be used to blame students for barriers they did not create; holding that limit in view keeps a good idea from becoming a slogan.", "cite": "Yeager & Dweck, 2020"}], "terms": [{"term": "Growth mindset", "def": "the belief that ability can develop through practice, support, and strategy rather than being fixed; a careful claim that capacity can grow when effort is paired with the right methods, not a promise that belief alone overcomes every obstacle.", "cite": "Yeager & Dweck, 2020"}, {"term": "Fixed mindset", "def": "the belief that ability is mostly settled, so that struggle or failure proves a limit in capacity; its risk is behavioural, showing up as avoiding challenge, hiding mistakes, or giving up early.", "cite": "Yeager & Dweck, 2020"}, {"term": "Context", "def": "the set of conditions, including support, resources, and the structures around a student, that shape whether a mindset intervention can help; where and for whom it works depends on the environment, not belief alone.", "cite": "Yeager et al., 2019"}, {"term": "Evidence limit", "def": "the boundary where a useful idea stops explaining everything; growth mindset has real support but is not a cure for every academic problem and must not be used to blame students for barriers they did not create.", "cite": "Yeager & Dweck, 2020"}], "readings": [{"apa": "Yeager, D. S., Hanselman, P., Walton, G. M., Murray, J. S., Crosnoe, R., Muller, C., Tipton, E., ... Dweck, C. S. (2019). A national experiment reveals where a growth mindset improves achievement. Nature, 573(7774), 364-369. https://doi.org/10.1038/s41586-019-1466-y", "scope": "Open access", "id": "yeager2019"}, {"apa": "Yeager, D. S., & Dweck, C. S. (2020). What can be learned from growth mindset controversies? American Psychologist, 75(9), 1269-1284. https://doi.org/10.1037/amp0000794", "scope": "Revisit from Week 3. Open access", "id": "yeager-dweck2020"}, {"apa": "Claro, S., Paunesku, D., & Dweck, C. S. (2016). Growth mindset tempers the effects of poverty on academic achievement. Proceedings of the National Academy of Sciences, 113(31), 8664-8668. https://doi.org/10.1073/pnas.1608207113", "scope": "Open access", "id": "claro2016"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "Growth or fixed: the choice", "what": "You walk a real academic-learning situation step by step, and at each turn you choose a growth-oriented or a fixed-oriented response and see which is more or less helpful for the learning.", "why": "so you can practise telling a growth response from a fixed one in real choices, while keeping the limit in view that belief alone does not remove barriers a student did not create.", "data": {"setup": "A student gets back a midterm in a required course with a much lower grade than expected. They have the same course again next week, an assignment due soon, and a choice to make about how to read this result and what to do next.", "steps": [{"situation": "The student looks at the grade for the first time and has to decide what the low score says about them.", "choices": [{"label": "Read it as proof: I am just not a math person, so this is my ceiling", "outcome": "Treating ability as settled turns one result into a verdict, which is the fixed-mindset move. It tends to push the student toward avoiding the challenge rather than working on it, because the belief itself shapes what they do next.", "harm": true, "cite": "Yeager & Dweck, 2020"}, {"label": "Read it as information: this score tells me what I have not learned yet, not what I cannot learn", "outcome": "Treating the grade as feedback rather than a fixed limit keeps capacity open to growth through practice and strategy. This is the careful version of a growth mindset, which is a claim about what can develop, not a promise that belief fixes everything.", "harm": false, "cite": "Yeager & Dweck, 2020"}]}, {"situation": "The student decides to act, but first has to choose how to understand why a growth mindset might help here and what it can realistically do.", "choices": [{"label": "Just believe harder that I can improve, and assume the belief alone will carry the grade up", "outcome": "This overclaims the idea. The evidence does not say belief by itself raises achievement; it shows mindset helps under the right conditions and for some students, so leaning on belief alone skips the support and strategy the result actually needs.", "harm": true, "cite": "Yeager et al., 2019"}, {"label": "Use the mindset to try a different strategy and seek the support the course offers", "outcome": "This matches the evidence. A growth mindset improved achievement most where the environment supported it and for students who could act on it, so pairing the belief with a new method and real support is where the idea does useful work.", "harm": false, "cite": "Yeager et al., 2019"}, {"label": "Decide the grade is entirely my fault for not believing in myself enough", "outcome": "This crosses the evidence limit into self-blame. Mindset work must not be used to fault a student for barriers they did not create, such as a confusing unit or limited time, so collapsing everything onto belief hides the real conditions that need to change.", "harm": true, "cite": "Yeager & Dweck, 2020"}]}, {"situation": "Before next class the student notices the course itself is part of the picture: the hardest unit was rushed and the help session is at a time they cannot reach. They have to decide how mindset and context fit together.", "choices": [{"label": "Keep the mindset and also name the conditions: ask for the unit again and for help I can actually access", "outcome": "This holds both truths at once. A growth mindset keeps effort pointed at learning, while naming the context honours the finding that environment shapes whether the belief can pay off, so the student changes both the strategy and the conditions.", "harm": false, "cite": "Yeager et al., 2019"}, {"label": "Ignore the conditions and tell myself a strong enough mindset should be able to overcome anything", "outcome": "This turns a careful finding into a slogan. The evidence has a limit: belief does not erase a barrier the student did not create, so refusing to name the rushed unit or the unreachable help session leaves the real obstacle untouched.", "harm": true, "cite": "Yeager & Dweck, 2020"}]}]}}, "youcan": ["You can now explain a growth mindset precisely, with both its evidence and its limits in view", "You can now spot a fixed-mindset response in what a student does after a setback, not just in what they say", "You can now use the concept where context supports it and name where the barrier, not the belief, has to change"], "reflectPrompt": "In a sentence or two: what support would make a growth mindset realistic for you this term, and where would belief alone not be enough?"},
      4: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week04", "overview": "This week is about a particular kind of academic confidence: the belief that you can take the actions a specific task requires. That belief is called self-efficacy, and it is not the same as self-esteem or a general sense of being capable. You will learn where this kind of confidence actually comes from, study the sources that build it, and practise turning a difficult task into a small action you can take. The point is to make the psychology useful for real coursework, not to ask you to disclose anything personal.", "purpose": "Self-efficacy matters for resilience because task-specific confidence shapes how students approach difficulty rather than avoiding it (Cassidy, 2015). This week names the sources that build that confidence, so you can build it on purpose instead of waiting to feel ready. It connects the resilience work from earlier weeks to a concrete, repeatable academic move.", "outcomes": ["Describe self-efficacy as task-specific confidence, distinct from self-esteem and general capability (Cassidy, 2015).", "Name the sources that build academic self-efficacy and explain what each one contributes (Bandura, 1997).", "Explain why a mastery experience is the strongest source of self-efficacy (Bandura, 1997).", "Design one small action that would create a mastery experience on a real academic task (Cassidy, 2015)."], "guiding": ["How does confidence become useful when it is tied to action rather than performance?", "Where does academic self-efficacy actually come from, and which source is strongest?", "When does encouragement from others help, and when does it need real evidence behind it?", "What is the smallest action you could take that would count as proof you can do the next step?"], "checks": [{"t": "Self-efficacy is task-specific confidence, not self-esteem or a general sense of being capable", "look": "the Cassidy (2015) reading and the Key Concepts"}, {"t": "A mastery experience is the strongest source of self-efficacy because it rests on evidence from what you have actually done", "look": "the Key Concepts and the Build your self-efficacy activity"}, {"t": "Vicarious experience builds confidence by watching a comparable peer succeed, which makes the task feel reachable", "look": "the Bandura (1997) source frame in the Key Concepts"}, {"t": "Social persuasion can lift effort, but it is fragile unless real evidence follows it", "look": "the Key Concepts and the activity"}, {"t": "Self-efficacy can be built deliberately by defining the smallest next action that would count as real progress", "look": "the Cassidy (2015) reading and the practice activity"}], "concepts": [{"h": "Academic self-efficacy", "body": "Self-efficacy is the belief that you can take the actions a specific task requires, rather than a general feeling of being capable. Cassidy (2015) connects academic self-efficacy to resilience, showing that task-specific confidence shapes how students approach difficulty. Because it is tied to a particular task, it can be built on purpose: you raise it by collecting evidence that you can do the next concrete step, not by waiting to feel confident in general.", "cite": "Cassidy, 2015"}, {"h": "The four sources of self-efficacy", "body": "Self-efficacy is built from four sources: mastery experiences, vicarious experience, social persuasion, and the physiological and emotional states you read off your own body. They are not equal in strength. Mastery experiences are the most powerful because they rest on what you have actually done, while the others support that evidence or stand in for it when it is not yet available.", "cite": "Bandura, 1997"}, {"h": "Mastery experiences are strongest", "body": "A mastery experience is evidence from actually doing something that builds confidence for the next attempt. It is the strongest source of self-efficacy because it rests on a real result rather than on encouragement alone (Bandura, 1997). The practical move is to make the experience reachable: by defining the smallest next action that would count as real progress, you create proof of capability instead of waiting for confidence to arrive first (Cassidy, 2015).", "cite": "Cassidy, 2015"}, {"h": "When encouragement helps and when it is fragile", "body": "Vicarious experience and social persuasion both build confidence without you having done the task yourself. Watching a comparable peer succeed makes a task feel reachable, and being told you can do it can raise the effort you are willing to put in. Both are real sources, but they are lighter than mastery: persuasion in particular fades fast unless real evidence follows it, so the durable move is to convert encouragement into a small action that produces proof (Bandura, 1997).", "cite": "Bandura, 1997"}], "terms": [{"term": "Self-efficacy", "def": "the belief that you can take the actions a specific task requires; task-specific confidence rather than a general sense of being capable, and a belief that shapes how students approach difficulty.", "cite": "Cassidy, 2015"}, {"term": "Mastery experience", "def": "evidence from actually doing something that builds confidence for the next attempt; the strongest source of self-efficacy because it rests on a real result.", "cite": "Bandura, 1997"}, {"term": "Vicarious experience", "def": "confidence gained by watching a comparable other succeed at a task, which makes the task feel reachable for you too.", "cite": "Bandura, 1997"}, {"term": "Social persuasion", "def": "encouragement or feedback from others that raises the effort you are willing to invest in a task, though it is fragile unless real evidence follows it.", "cite": "Bandura, 1997"}], "readings": [{"apa": "Cassidy, S. (2015). Resilience building in students: The role of academic self-efficacy. Frontiers in Psychology, 6, 1781. https://doi.org/10.3389/fpsyg.2015.01781", "scope": "Open access", "id": "cassidy2015"}, {"apa": "Bandura, A. (1997). Self-efficacy: The exercise of control. W. H. Freeman. (Sources of self-efficacy: mastery experiences, vicarious experience, social persuasion, and physiological and affective states.)", "scope": "Read this on Blackboard", "id": "bandura1997"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Build your self-efficacy", "what": "You assemble the sources of academic self-efficacy one at a time, naming what each contributes, then end on the smallest action that would create real evidence you can do the next step.", "why": "so you can build task-specific confidence on purpose, by knowing which sources are strongest and converting encouragement into proof, rather than waiting to feel ready.", "data": {"goal": "Assemble the four sources of academic self-efficacy into one working picture, so you can see which source carries the most weight and use it to turn a difficult task into a small action that builds genuine academic confidence.", "components": [{"label": "Mastery experience", "role": "gives you evidence from actually doing the task, which is the strongest source of self-efficacy because it rests on a real result rather than on encouragement alone.", "cite": "Bandura, 1997"}, {"label": "Vicarious experience", "role": "lets you borrow confidence by watching a comparable peer succeed, which makes a hard task feel reachable before you have tried it yourself.", "cite": "Bandura, 1997"}, {"label": "Social persuasion", "role": "raises the effort you are willing to put in when others tell you that you can do it, though it stays fragile until real evidence follows.", "cite": "Bandura, 1997"}, {"label": "Physiological and emotional states", "role": "feed you signals from your own body and mood that you read as readiness or strain, which you can reframe rather than treat as proof you cannot do the task.", "cite": "Bandura, 1997"}, {"label": "Task-specific framing", "role": "ties the confidence to one particular task rather than a general mood, so the belief shapes how you actually approach the difficulty.", "cite": "Cassidy, 2015"}, {"label": "The smallest next action", "role": "converts the strongest source into something reachable today, creating a mastery experience by defining the smallest step that would count as real progress.", "cite": "Cassidy, 2015"}]}}, "youcan": ["You can now describe self-efficacy as task-specific confidence, distinct from self-esteem and general capability", "You can now name the sources that build academic self-efficacy and explain what each one contributes", "You can now turn a difficult academic task into one small action that would create a mastery experience"], "reflectPrompt": "What is the smallest piece of evidence you could give yourself this week that you can do the next step on a task you have been avoiding?"},
      5: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week05", "overview": "This week moves resilience away from toughness and toward a pattern of adaptation that can be supported. You will meet resilience as a process rather than a fixed personality trait: a sequence of disruption and reintegration that a student can move through, not a verdict on whether they are a resilient kind of person. Using Richardson (2011) on disruption and reintegration and Ungar (2011) on resources, you will practise mapping an academic setback into stages and asking which responses and supports actually move a person toward recovery. The point is that resilience is a process, so a hard period is a stage to work through with practice and reachable resources, not proof of a permanent flaw.", "purpose": "Week 5 connects psychological theory to practical learning, well-being, and resilience by treating resilience as an adaptive process rather than a personality trait. Building on the individual-coping material from earlier weeks, you now name the stages of disruption and reintegration after an academic setback, and you ask which responses and which resources move a person toward reintegration rather than away from it. The work stays grounded in course sources and uses an everyday academic example so the concepts travel beyond class, and it feeds directly into the resilience-mapping practice for this week.", "outcomes": ["By the end of this week you can explain resilience as an adaptive process of disruption and reintegration rather than a fixed personality trait.", "By the end of this week you can compare an individual model of the resilience process with a resource and context model.", "By the end of this week you can map an academic setback into stages and identify which responses move toward reintegration.", "By the end of this week you can name the resources a person could reach during recovery, without treating difficulty as personal failure."], "guiding": ["What changes when resilience is understood as a process rather than a trait?", "What does this week show about the resilience process, and how does it shift the question from am I a resilient person to what stage am I in and what would move me forward?", "Where does an individual model of disruption and reintegration help, and where does it need resources and context to be honest?", "What is one concrete response a student could try after a setback without pretending the barrier is simple?"], "checks": [{"t": "What it means to treat resilience as a process: a pattern of disruption, response, and reintegration that a person moves through, rather than a fixed trait some people have and others lack", "look": "the Richardson (2011) reading"}, {"t": "What reintegration is, and why naming it makes recovery active: the phase where a person reorganizes after a disruption, in a form that can range from simply coping to genuine growth", "look": "the Richardson (2011) reading"}, {"t": "What a resource is, and why reaching real supports is part of resilience rather than a sign a person could not manage on their own", "look": "the Ungar (2011) reading"}, {"t": "Why capacity can be developed: resilience is built through practice and reachable support, so a low point today is not a permanent ceiling", "look": "the Ungar (2011) reading"}, {"t": "Mapping an academic setback into stages and naming which responses and resources move toward reintegration, without reading the setback as personal failure", "look": "the activity and your resilience map"}], "concepts": [{"h": "Resilience as a process, not a personality", "body": "Resilience is a pattern of disruption, response, and adaptation, rather than a fixed trait that some people possess and others do not. Richardson (2011) describes resilience as movement through disruption toward reintegration, a personal journey made through a series of choices that can lead toward growth. Treating resilience as a process is freeing for students: a hard period becomes a stage to move through with support and practice, not a verdict on whether they are a resilient kind of person.", "cite": "Richardson, 2011"}, {"h": "Reintegration", "body": "Reintegration is the work of rebuilding after difficulty in a situation that has changed. In Richardson's (2011) account it is the phase where a person reorganizes after a disruption, and the form it takes can range from simply coping to genuine growth. For students, naming reintegration makes recovery active rather than passive: it points to the choices and supports that shape how a person comes back together, instead of waiting for things to return to how they were.", "cite": "Richardson, 2011"}, {"h": "Resources, not willpower alone", "body": "A resource is a support, relationship, skill, or condition that makes adaptation possible. Ungar (2011) places resources at the centre of resilience, arguing that recovery depends heavily on whether a person can actually reach the supports their situation requires. The point for students is that resilience is not built from willpower alone: identifying and reaching real resources, from people to services to skills, is part of the work, not a sign that they could not manage on their own.", "cite": "Ungar, 2011"}, {"h": "Capacity that can be developed", "body": "Capacity is something that can be developed through practice and support, rather than a fixed quantity a person either has or lacks. Ungar (2011) frames resilience as depending on reachable supports, which keeps it open to growth and connects it to conditions that can be improved. For students this matters because a capacity that is low today is not a permanent ceiling: with the right supports and repeated practice, what feels out of reach now can become workable later.", "cite": "Ungar, 2011"}], "terms": [{"term": "Resilience process", "def": "a pattern of disruption, response, and adaptation that a person moves through over time, rather than a fixed personality trait that some people have and others lack.", "cite": "Richardson, 2011"}, {"term": "Reintegration", "def": "the phase of rebuilding after a disruption, where a person reorganizes in a situation that has changed, in a form that can range from simply coping to genuine growth.", "cite": "Richardson, 2011"}, {"term": "Resource", "def": "a support, relationship, skill, or condition that makes adaptation possible, and that a person must be able to actually reach for recovery to take hold.", "cite": "Ungar, 2011"}, {"term": "Capacity", "def": "the ability to adapt, understood as something that can be developed through practice and reachable support rather than a fixed quantity a person either has or lacks.", "cite": "Ungar, 2011"}], "readings": [{"apa": "Richardson, G. E. (2011). Applications of the metatheory of resilience and resiliency in rehabilitation and medicine. In The Routledge handbook of resilience (pp. 121-134). Routledge.", "scope": "Library access", "id": "richardson2011"}, {"apa": "Ungar, M. (2011). The social ecology of resilience: Addressing contextual and cultural ambiguity of a nascent construct. American Journal of Orthopsychiatry, 81(1), 1-17.", "scope": "Revisit from Week 6. Library access", "id": "ungar2011"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "From setback to reintegration", "what": "You walk an academic setback step by step, choosing how a student responds at each turn and watching which moves carry them toward reintegration and which keep them stuck in disruption.", "why": "so you practise reading resilience as a process you act inside, not a trait you either have or lack, naming the responses and resources that move recovery forward before you map a setback of your own.", "data": {"setup": "Amara fails the midterm in a required course, well below what she expected, and the disruption knocks her off balance: she stops attending, avoids the course site, and starts to wonder whether she belongs in the program. Resilience here is not a trait she either has or does not have. It is a process she is now inside, a journey from disruption toward reintegration made through a series of choices, and you step into those choices with her, deciding at each turn which response moves toward recovery and which keeps her stuck.", "steps": [{"situation": "The marked midterm comes back. Amara is in the trough of disruption: knocked off balance, embarrassed, and reading the grade as a verdict on whether she is the kind of person who can do this program.", "choices": [{"label": "Decide the failed midterm proves she is not cut out for this and quietly start pulling back", "outcome": "She reads a single setback as a fixed judgement on who she is, which is exactly the trait view Richardson warns against. Treating disruption as a verdict rather than a stage keeps her stuck in the trough instead of moving toward reintegration.", "harm": true, "cite": "Richardson, 2011"}, {"label": "Name the setback as a disruption she is moving through, not a verdict on whether she belongs", "outcome": "She treats the grade as one stage in a process rather than a statement about her character. Richardson describes resilience as movement through disruption toward reintegration, and naming the stage is what lets the next choice be about recovery rather than retreat.", "harm": false, "cite": "Richardson, 2011"}]}, {"situation": "A few days later Amara has to decide how to handle the practical side of the setback: the missed classes, the material she did not understand, and the supports the course makes available.", "choices": [{"label": "Try to fix everything alone through willpower, without contacting the professor or any support", "outcome": "She leans on toughness alone and leaves reachable supports unused. Ungar places resources at the centre of resilience, so recovery built on willpower without support tends to stall, and the unreached help becomes a gap rather than a resource.", "harm": true, "cite": "Ungar, 2011"}, {"label": "Reach for resources: email the professor, book the tutoring centre, and ask a classmate about the missed material", "outcome": "She identifies and reaches the supports her situation actually requires. Ungar argues recovery depends heavily on whether a person can reach real resources, so using them is part of the work of reintegration, not a sign she could not manage on her own.", "harm": false, "cite": "Ungar, 2011"}]}, {"situation": "Midterm behind her, Amara now decides what reintegration will look like for the rest of the term: what she rebuilds and how she reads what she just went through.", "choices": [{"label": "Wait to feel like her old confident self again before re-engaging, treating recovery as a return to how things were", "outcome": "She waits passively for things to go back to normal in a situation that has already changed. Richardson frames reintegration as active reorganizing after disruption, so waiting for the old state to return leaves recovery stalled rather than rebuilt.", "harm": true, "cite": "Richardson, 2011"}, {"label": "Rebuild a workable plan and treat the recovered skills and supports as capacity she can develop further", "outcome": "She reorganizes actively and treats what she rebuilt as capacity that grows with practice and support. This is reintegration in Richardson's sense, and Ungar's view of capacity as developable means a low point this term need not be a permanent ceiling.", "harm": false, "cite": "Richardson, 2011"}]}]}}, "youcan": ["You can now explain resilience as an adaptive process of disruption and reintegration rather than a fixed personality trait", "You can now map an academic setback into stages and name which responses move a person toward reintegration", "You can now identify the resources a student could reach during recovery, and treat capacity as something that grows with practice and support"], "reflectPrompt": "In a sentence or two: think of an academic setback you moved through, and name the stage you were in and the one response or resource that moved you toward reintegration. What becomes visible once you read it as a process rather than proof of a trait?"},
      6: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week06", "overview": "This week the course widens from individual coping to the environments that shape recovery and well-being. You will define social ecology in plain terms, look at how family, school, community, and culture change what resilience looks like, and practise reading a learning case for the supports and barriers around a student rather than only the traits inside one. The point is that resilience is social and ecological, not just personal: who gets called resilient often depends on what their environment makes available, and what context is being ignored when the label is used.", "purpose": "Week 6 connects psychological theory to practical learning, well-being, and resilience by treating resilience as something an environment supports, not only a quality a person has. Building on the individual-coping models from earlier weeks, you now name the layers of a student's social ecology and what each one contributes, so you can spot contextual barriers without blaming the learner and ask whether a support actually fits the person's real world. This work feeds directly into the course's Resilience Ecology feature.", "outcomes": ["By the end of this week you can describe resilience as socially and culturally shaped, not only an individual trait.", "By the end of this week you can name the layers of a student's social ecology and what each layer contributes to resilience.", "By the end of this week you can identify a contextual barrier without blaming the learner.", "By the end of this week you can explain why a support must fit the person's actual environment and culture."], "guiding": ["Who gets called resilient, and what context is being ignored when that label is used?", "What does this week show about social ecology, and how does it shift the question from what is wrong with me to what in my environment helps or blocks adaptation?", "Where does a single definition of coping help, and where does it need cultural and contextual fit?", "What is one concrete support a student could draw on without pretending the barrier is simple?"], "checks": [{"t": "What social ecology means: the network of family, school, community, and culture around a person, and why resilience is best understood within it", "look": "the Ungar (2011) reading"}, {"t": "What a contextual barrier is, and why naming a barrier as contextual protects students from being blamed for obstacles they did not create", "look": "the Ungar (2011) reading"}, {"t": "Why cultural fit matters: what counts as resilience and what kind of help is useful vary across cultures and situations", "look": "the Ungar (2013) reading"}, {"t": "Why drawing on a support system is part of resilience rather than a departure from it, seen through a social ecology lens", "look": "the Lopez and colleagues (2021) reading"}, {"t": "Naming the layers of your own social ecology of resilience, and what each layer contributes", "look": "the activity and the Resilience Ecology feature"}], "concepts": [{"h": "Social ecology", "body": "Social ecology is the network of relationships and systems around a person, including family, school, community, and culture. Ungar (2011) argues that resilience is best understood within this network, because recovery depends on the supports an environment makes available, not on individual toughness alone. For students, the social ecology view shifts the question from what is wrong with me to what in my environment helps or blocks adaptation, which is usually the more honest and useful question.", "cite": "Ungar, 2011"}, {"h": "Contextual barriers, not personal failings", "body": "A contextual barrier is a condition outside the person that blocks growth or recovery, such as a lack of access, an unsupportive system, or an unmet material need. Ungar (2011) stresses that resilience cannot be understood apart from these conditions. Naming a barrier as contextual protects students from being blamed for obstacles they did not create, and it points the response toward changing access and support rather than demanding that a person simply try harder.", "cite": "Ungar, 2011"}, {"h": "Cultural fit", "body": "Cultural fit is the degree to which a model or support respects local meaning and lived context. Ungar (2013) shows that what counts as resilience, and what kind of help is useful, varies across cultures and situations, so a support that ignores context can miss the person or even do harm. For students and helpers, attending to cultural fit means asking whether a strategy makes sense in this person's actual world, rather than assuming one definition of coping fits everyone.", "cite": "Ungar, 2013"}, {"h": "The support system as a resilience layer", "body": "A support system is the set of people, practices, and institutions that help adaptation happen. Lopez and colleagues (2021) describe early adversity through a social ecology lens, showing how the surrounding environment shapes whether a person can recover and grow. The practical lesson for students is that drawing on a support system is part of resilience, not a departure from it: identifying who and what can help, and using them, is a skill rather than a weakness.", "cite": "Lopez et al., 2021"}], "terms": [{"term": "Social ecology", "def": "the network of relationships and systems around a person, including family, school, community, and culture, within which resilience is best understood.", "cite": "Ungar, 2011"}, {"term": "Contextual barrier", "def": "a condition outside the person that blocks growth or recovery, such as a lack of access, an unsupportive system, or an unmet material need.", "cite": "Ungar, 2011"}, {"term": "Cultural fit", "def": "the degree to which a model or support respects local meaning and lived context, since what counts as resilience varies across cultures and situations.", "cite": "Ungar, 2013"}, {"term": "Support system", "def": "the set of people, practices, and institutions that help adaptation happen, which a social ecology lens treats as part of resilience rather than a departure from it.", "cite": "Lopez et al., 2021"}], "readings": [{"apa": "Ungar, M. (2011). The social ecology of resilience: Addressing contextual and cultural ambiguity of a nascent construct. American Journal of Orthopsychiatry, 81(1), 1-17.", "scope": "Revisit from Week 6. Library access", "id": "ungar2011"}, {"apa": "Ungar, M. (2013). Resilience, trauma, context, and culture. Trauma, Violence, & Abuse, 14(3), 255-266.", "scope": "Library access", "id": "ungar2013"}, {"apa": "Lopez, M., Ruiz, M. O., Rovnaghi, C. R., Tam, G. K. Y., Hiscox, J., Gotlib, I. H., Barr, D. A., Carrion, V. G., & Anand, K. J. S. (2021). The social ecology of childhood and early life adversity. Pediatric Research, 89(2), 353-367.", "scope": "Open access", "id": "lopez2021"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Map your social ecology", "what": "You assemble the layers of a student's social ecology of resilience, from personal strategies out to culture and context, and say what each layer contributes.", "why": "so you practise reading resilience as something an environment supports, not only a trait, and feed a worked map into the course's Resilience Ecology feature.", "data": {"goal": "Assemble the layers of a student's social ecology of resilience, from the person outward to relationships, the institution, and the wider culture and context, and name what each layer contributes. Building the map this way shows that resilience depends on supports the environment makes available, not on individual toughness alone, and it points to contextual barriers without blaming the learner.", "components": [{"label": "Personal strategies (the self)", "role": "What the student themselves brings: coping habits, study routines, and the skill of knowing when and how to ask for help. Real, but on its own an incomplete account of resilience.", "cite": "Ungar, 2011"}, {"label": "People and relationships", "role": "Family, friends, peers, and mentors who notice, encourage, and step in. A social ecology lens treats these relationships as part of resilience rather than a fallback, because recovery depends on the supports around a person.", "cite": "Lopez et al., 2021"}, {"label": "The course or institution", "role": "What the program and the institution make available: access, flexibility, advising, and accommodations. When this layer is thin it becomes a contextual barrier, so naming it keeps the focus on access rather than on the learner trying harder.", "cite": "Ungar, 2011"}, {"label": "Culture and context", "role": "The local meanings, values, and lived conditions that decide what counts as resilience and what kind of help is useful. Attending to cultural fit means asking whether a support makes sense in this person's actual world, not assuming one definition of coping fits everyone.", "cite": "Ungar, 2013"}, {"label": "Material conditions", "role": "The concrete resources or unmet needs that sit outside the person, such as time, money, housing, and stable internet. Ungar names these conditions as part of why resilience cannot be read apart from context: a missing material need is a contextual barrier, not a personal failing.", "cite": "Ungar, 2011"}]}}, "youcan": ["You can now describe resilience as socially and culturally shaped rather than only an individual trait", "You can now name the layers of a student's social ecology and say what each one contributes to resilience", "You can now identify a contextual barrier without blaming the learner, and ask whether a support fits the person's actual world"], "reflectPrompt": "In a sentence or two: which layer of your own social ecology has done the most to support you recently, and what becomes visible the moment you map resilience as an environment around you rather than a trait inside you?"},
      7: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week07", "overview": "This week consolidates the first half of the course by naming stress, adversity, and recovery as linked but distinct. Stress is the everyday academic pressure of a busy term: deadlines, workload, and the weight of demands stacking up. Adversity is a sharper setback, such as a failed test or a stalled project, that can disrupt learning. Recovery is the ordinary, gradual work of getting back to effective study, one task at a time. The point of the week is practical and non-personal: you learn to separate the pressure itself from your response to it and from the supports available, so a hard week stays workable. Protective factors, the study habits, skills, and supports that make pressure easier to carry, are the lever you build rather than waiting for the stress to disappear on its own.", "purpose": "Week 7 turns resilience theory into a working tool for academic pressure. Having named mindset, self-regulated learning, self-efficacy, and the social ecology of resilience, you now use those ideas to read a real learning setback: where the pressure comes from, how a response either protects or undermines recovery, and which supports return you to effective study fastest. The aim is to differentiate stress, adversity, and recovery, to analyse a learning pressure with resilience concepts, and to leave with a concrete, ordinary next step rather than a confessional account of how you feel.", "outcomes": ["By the end of this week you can differentiate stress, adversity, and recovery as linked but distinct academic-learning ideas.", "By the end of this week you can use resilience concepts to analyse a real learning pressure, separating the stressor, the response, and the supports.", "By the end of this week you can name a protective factor and one concrete adjustment that moves you back toward effective study.", "By the end of this week you can describe recovery in realistic, ordinary terms, such as a workable week or one task back on track."], "guiding": ["How can a student recognize pressure without letting pressure become the whole story?", "What is the difference between everyday academic stress and a sharper adversity, and why does telling them apart keep the response proportionate?", "Where does a resilience model help you read a setback, and where does it need the context of real supports and barriers?", "What is one concrete protective study habit a student could build without pretending the pressure is simple?"], "checks": [{"t": "What stress means in academic terms: the everyday pressure of heavy demands such as deadlines and workload, and why not all of it is harmful", "look": "the Key Concepts and the Lopez and colleagues (2021) reading"}, {"t": "How adversity differs from ordinary stress: a sharper learning setback located in circumstances, not in personal weakness", "look": "the Lopez and colleagues (2021) reading"}, {"t": "What recovery looks like as an ordinary, gradual return to effective study, not a dramatic full restoration", "look": "the Weight and colleagues (2024) reading"}, {"t": "What a protective factor is and why building study supports beats only trying to remove every stressor", "look": "the Cassidy (2015) reading and the Key Concepts"}, {"t": "Separating the stressor, the response, and the supports on a real learning pressure, and naming one concrete adjustment", "look": "the activity and your midcourse self check"}], "concepts": [{"h": "Stress", "body": "Stress is the pressure a student experiences when academic demands feel heavy: deadlines, workload, and tasks stacking up. It is a normal response, and not all of it is harmful. Some pressure focuses attention and gets work moving, while prolonged or overwhelming pressure wears a person down. The useful skill is to recognize stress without letting it become the whole story, separating the pressure itself from the response to it and the supports available, so a hard week stays workable.", "cite": "Lopez, 2021"}, {"h": "Adversity", "body": "Adversity is a sharper difficulty that can disrupt learning, such as a failed test, a stalled project, or a setback that throws a term off course. Lopez and colleagues (2021) frame adversity within social ecology, locating its weight in circumstances and environments rather than in individual weakness. Distinguishing adversity from the everyday pressure of a busy term keeps the response proportionate and points it toward the supports and adjustments a hard situation calls for, rather than toward self-blame.", "cite": "Lopez, 2021"}, {"h": "Recovery", "body": "Recovery is the process of getting back to effective study after pressure or a setback. Weight and colleagues (2024) study students in demanding settings and show that recovery is ordinary and gradual rather than dramatic. Defining recovery in realistic, everyday terms, a workable week, a resumed routine, one task back on track, keeps it reachable and avoids the trap of treating anything short of full restoration as failure.", "cite": "Weight, 2024"}, {"h": "Protective factor", "body": "A protective factor is a condition that supports adaptation under pressure, such as a study skill, a sense of competence, or reliable access to help. Cassidy (2015) treats academic self-efficacy as one such factor for students facing difficulty. Naming protective factors gives a student something concrete to build: rather than only removing stressors, you strengthen the supports and habits that make pressure easier to carry and recovery more likely.", "cite": "Cassidy, 2015"}], "terms": [{"term": "Stress", "def": "the everyday academic pressure a student feels when demands such as deadlines and workload feel heavy; normal, and not all of it harmful, since some pressure focuses attention while prolonged pressure wears a person down.", "cite": "Lopez, 2021"}, {"term": "Adversity", "def": "a sharper learning setback or difficult circumstance that can disrupt study, located in environments and conditions rather than in individual weakness.", "cite": "Lopez, 2021"}, {"term": "Recovery", "def": "the ordinary, gradual process of getting back to effective study after pressure or a setback, measured in realistic terms such as a workable week or one task back on track.", "cite": "Weight, 2024"}, {"term": "Protective factor", "def": "a study habit, skill, or support that makes academic pressure easier to carry and recovery more likely, such as academic self-efficacy or reliable access to help.", "cite": "Cassidy, 2015"}], "readings": [{"apa": "Lopez, M., Ruiz, M. O., Rovnaghi, C. R., Tam, G. K. Y., Hiscox, J., Gotlib, I. H., Barr, D. A., Carrion, V. G., & Anand, K. J. S. (2021). The social ecology of childhood and early life adversity. Pediatric Research, 89(2), 353-367. https://doi.org/10.1038/s41390-020-01264-x", "scope": "Revisit from Week 6. Read this on Blackboard", "id": "lopez2021"}, {"apa": "Weight, E., Haroldson, J. M., Harry, M., & Rudd, E. (2024). Adversity and resiliency: Athlete experiences within U.S. college sport. Journal of Intercollegiate Sport, 17(3). https://doi.org/10.17161/2fndtf13", "scope": "Read this on Blackboard", "id": "weight2024"}, {"apa": "Cassidy, S. (2015). Resilience building in students: The role of academic self-efficacy. Frontiers in Psychology, 6, 1781. https://doi.org/10.3389/fpsyg.2015.01781", "scope": "Revisit from Week 4. Open access", "id": "cassidy2015"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "Stress, and the road to recovery", "what": "You walk an academic-pressure situation step by step, choosing a protective or an unhelpful response at each turn and watching the effect on recovery and effective study.", "why": "so you practise separating the stressor, the response, and the supports on a real learning pressure before you write your own midcourse adjustment plan.", "data": {"setup": "It is week seven of a busy term. Two deadlines land in the same week, you just got back a midterm well below what you hoped for, and the workload feels stacked up. Nothing here is a crisis: this is ordinary academic stress and one sharper setback. You step into the choices a student faces across the days that follow, and watch which responses move you back toward effective study.", "steps": [{"situation": "The disappointing midterm grade is fresh, and two assignments are due in four days. You have to decide how to read the setback before you do anything else.", "choices": [{"label": "Treat the low grade as proof you are not cut out for this and brace to fail the rest", "outcome": "The setback becomes the whole story. Reading one result as a verdict on fixed ability fuels avoidance and makes recovery slower, because the response, not just the pressure, is now working against you.", "harm": true, "cite": "Lopez, 2021"}, {"label": "Name it as one adversity among the term's ordinary stress, and separate the setback from the workload still ahead", "outcome": "You keep the response proportionate. Locating the weight of a setback in circumstances rather than in personal weakness keeps attention on the next workable step instead of on self-blame.", "harm": false, "cite": "Lopez, 2021"}]}, {"situation": "With the deadlines closing in, you decide how to organise the actual work of the next four days.", "choices": [{"label": "Pull an all-nighter on everything at once and skip meals and sleep to power through", "outcome": "Pushing past every limit in one burst is the pattern recovery research warns against: it spends the supports you need and makes the return to effective study harder, not faster.", "harm": true, "cite": "Weight, 2024"}, {"label": "Aim for an ordinary, gradual return: get one task back on track first, then the next, across a workable week", "outcome": "You make recovery reachable. Treating recovery as a resumed routine and one task at a time, rather than a dramatic full restoration, is exactly how students in demanding settings actually come back.", "harm": false, "cite": "Weight, 2024"}]}, {"situation": "You are not sure you can do all of this alone, and you have to decide what to do about the supports around you.", "choices": [{"label": "Tell no one and try to carry the whole week by willpower so it looks like you managed on your own", "outcome": "Leaning on willpower alone removes the protective factors that make pressure easier to carry, so the same workload lands harder and recovery is left to chance.", "harm": true, "cite": "Cassidy, 2015"}, {"label": "Build a protective factor: email the instructor about the deadline, use a study group, and book a tutoring slot", "outcome": "You strengthen the supports and skills that carry pressure. Building academic self-efficacy through reachable supports gives you something concrete to lean on and makes recovery more likely.", "harm": false, "cite": "Cassidy, 2015"}]}]}}, "youcan": ["You can now differentiate stress, adversity, and recovery as linked but distinct academic ideas.", "You can now use resilience concepts to separate the stressor, the response, and the supports on a real learning pressure.", "You can now name a protective study habit and one concrete adjustment that moves you back toward effective study."], "reflectPrompt": "In a sentence or two: what would recovery look like in a realistic, ordinary form for you this week, and what is one protective study habit you could build to get there?"},
      8: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week08", "overview": "This week is about how you talk to yourself when coursework goes wrong, and what each way of responding does for your learning. Self-compassion is a kind and accurate response to academic difficulty, not an excuse and not a way of letting yourself off the hook. You will learn its parts, see how harsh self-criticism tends to narrow learning instead of fuelling it, and practise rewriting one self-critical line into a useful response. The point is to make the psychology usable on real coursework, not to ask you to disclose anything personal.", "purpose": "Self-compassion matters for resilience because how a student responds to a setback shapes whether attention moves to the next action or stays stuck on the setback (Neff, 2003). This week names self-compassion, separates it from excuse-making, and connects it to the cost of harsh self-criticism that Stephenson and colleagues document (Stephenson, 2018). It gives you a concrete, repeatable move: keep the accurate feedback in a setback and drop the insult layered on top of it.", "outcomes": ["Explain self-compassion as an active learning support, built from self-kindness and common humanity (Neff, 2003).", "Distinguish self-compassion from avoiding responsibility or excusing weak work (Neff, 2003).", "Explain why harsh self-criticism tends to narrow learning rather than motivate it (Stephenson, 2018).", "Rewrite one self-critical statement about a real academic task into a useful response (Neff, 2003)."], "guiding": ["What becomes possible when self-criticism is replaced by a more accurate and humane response?", "Where is the line between self-compassion and excuse-making, and how do you stay on the useful side of it?", "What does the harsh insult layered on top of accurate feedback actually do to your next attempt?", "What is one concrete action you could take without pretending the difficulty was simple?"], "checks": [{"t": "Self-compassion is a kind and accurate response to difficulty that supports learning, not indulgence or excuse-making", "look": "the Neff (2003) reading and the Key Concepts"}, {"t": "Common humanity steadies a setback by treating it as an ordinary part of learning that others meet too, rather than a private flaw", "look": "the Key Concepts and the Self-criticism or self-compassion activity"}, {"t": "Self-acceptance lets you face a hard result honestly without turning it into a fixed verdict about who you are", "look": "the Neff (2003) source frame in the Key Concepts"}, {"t": "Harsh self-criticism is linked to lower self-compassion and tends to constrict learning rather than motivate it", "look": "the Stephenson (2018) reading and the Key Concepts"}, {"t": "A useful response keeps the accurate feedback in a setback and drops the insult layered on top of it", "look": "the Key Concepts and the practice activity"}], "concepts": [{"h": "Self-compassion as a learning tool", "body": "Self-compassion is a kind and accurate response to difficulty that supports learning and recovery, rather than indulgence or excuse-making. Neff (2003) describes it as treating yourself with the same fairness you would offer a friend, while still seeing the situation clearly. For students it is a working tool: it removes the insult from a setback so that attention can move to the next action, which is usually more productive than harsh self-criticism.", "cite": "Neff, 2003"}, {"h": "Common humanity steadies a setback", "body": "Common humanity is the recognition that difficulty is part of shared human experience, not a private flaw that sets you apart. In Neff's (2003) account it is a core element of self-compassion, because seeing struggle as something people generally face reduces the isolation that intensifies it. For students this recognition is steadying: a hard week feels less like proof that you alone are failing and more like an ordinary part of learning that others meet too.", "cite": "Neff, 2003"}, {"h": "Self-acceptance is not resignation", "body": "Self-acceptance is recognizing your current situation without turning it into a final identity. It lets you acknowledge a hard reality, a missed deadline or a weak grade, while keeping the door open to change. Drawing on Neff's (2003) account, self-acceptance is not resignation: it is the steadiness that lets you face the truth of where you are without collapsing it into a fixed verdict about who you are, which is what frees you to act on it.", "cite": "Neff, 2003"}, {"h": "What harsh self-criticism costs learning", "body": "Self-criticism is an inner response that may feel motivating but often narrows learning. Stephenson and colleagues (2018) link harsh self-judgment to irrational beliefs and lower self-compassion, suggesting that severe self-talk tends to constrict rather than support. The practical work is not to silence all self-evaluation but to separate accurate, useful feedback from the insult layered on top of it, keeping the information and dropping the attack.", "cite": "Stephenson, 2018"}], "terms": [{"term": "Self-compassion", "def": "a kind and accurate response to difficulty that supports learning and recovery, treating yourself with the same fairness you would offer a friend while still seeing the situation clearly, rather than indulgence or excuse-making.", "cite": "Neff, 2003"}, {"term": "Common humanity", "def": "the recognition that difficulty is part of shared human experience rather than a private flaw, a core element of self-compassion that reduces the isolation a setback can create.", "cite": "Neff, 2003"}, {"term": "Self-acceptance", "def": "recognizing your current situation honestly without turning it into a final identity, a steadiness that lets you face a hard result without collapsing it into a fixed verdict about who you are.", "cite": "Neff, 2003"}, {"term": "Self-criticism", "def": "an inner response that may feel motivating but is linked to irrational beliefs and lower self-compassion, and tends to constrict learning rather than support it.", "cite": "Stephenson, 2018"}], "readings": [{"apa": "Neff, K. D. (2003). Self-compassion: An alternative conceptualization of a healthy attitude toward oneself. Self and Identity, 2(2), 85-101. https://self-compassion.org/wp-content/uploads/publications/SCtheoryarticle.pdf", "scope": "Open access", "id": "neff2003"}, {"apa": "Stephenson, E., Watson, P. J., Chen, Z. J., & Morris, R. J. (2018). Self-compassion, self-esteem, and irrational beliefs. Current Psychology, 37(4), 809-815. https://self-compassion.org/wp-content/uploads/2018/05/Stephenson2017.pdf", "scope": "Open access", "id": "stephenson2018"}], "activity": {"screen": "activity", "archetype": "toggle", "title": "Self-criticism or self-compassion", "what": "You take one student facing a real academic setback and flip four parts of their self-talk between a self-critical and a self-compassionate version, watching what each does for the next attempt.", "why": "so you see for yourself that the compassionate version keeps the accurate feedback while dropping the insult, and that the critical version mostly narrows learning rather than fuelling it.", "data": {"system": "A student opens a returned assignment, sees a much lower grade than they expected, and has to decide how to talk to themselves about it before they start the next piece of work. Each toggle is one move in that inner response. Flip it on for the self-compassionate version and off for the self-critical version, and watch what each does for the learner.", "toggles": [{"label": "How they name the difficulty", "on": "They name it accurately: this grade is lower than they wanted and the feedback shows specific gaps. Seeing the situation clearly, without the insult, keeps their attention on the actual problem so it can be worked on (Neff, 2003).", "off": "They name it as a verdict: I am just not smart enough for this. The harsh label adds nothing the feedback did not already contain, and it pulls attention off the fixable gaps and onto a fixed conclusion about themselves.", "whoHarmed": "When it tips to self-criticism the learner loses the accurate information inside the setback, because the insult buries the feedback they could have acted on.", "cite": "Neff, 2003"}, {"label": "Whether the setback is shared or private", "on": "They treat the struggle as common humanity: hard weeks and weak grades are an ordinary part of learning that other students meet too. Seeing it as shared reduces the isolation, which steadies them enough to keep working (Neff, 2003).", "off": "They treat it as proof they alone are failing while everyone else is fine. The sense of being singled out intensifies the setback and makes it harder to ask for help or compare notes with peers.", "whoHarmed": "When it tips to self-criticism the learner carries the setback alone, and the isolation makes an ordinary difficulty feel like a private flaw.", "cite": "Neff, 2003"}, {"label": "What the grade says about who they are", "on": "They use self-acceptance: this is where they are right now, not a final verdict on who they are. Acknowledging the hard result honestly, without fixing it as identity, keeps the door open to change and to the next attempt (Neff, 2003).", "off": "They collapse the result into identity: this grade proves I am a bad student. Turning a single outcome into a fixed conclusion leaves nothing to act on, because there is no next step inside a permanent verdict.", "whoHarmed": "When it tips to self-criticism the learner trades a workable situation for a fixed identity, and a fixed identity gives them no room to change anything.", "cite": "Neff, 2003"}, {"label": "Whether harsh self-talk is doing useful work", "on": "They keep the accurate self-evaluation and drop the insult on top of it: the feedback is real, the attack is not. Separating useful information from severe self-judgment leaves the learning intact and frees effort for the next action (Stephenson, 2018).", "off": "They lean on harsh self-judgment as if it were motivation. Stephenson and colleagues link this severe self-talk to irrational beliefs and lower self-compassion, and it tends to constrict learning rather than drive it.", "whoHarmed": "When it tips to self-criticism the learner mistakes the insult for motivation, and the harsh self-talk narrows their thinking instead of fuelling the next attempt.", "cite": "Stephenson, 2018"}]}}, "youcan": ["You can now explain self-compassion as an active learning support, distinct from indulgence or excuse-making", "You can now name why harsh self-criticism tends to narrow learning instead of motivating it", "You can now rewrite one self-critical statement into an accurate, useful response to an academic setback"], "reflectPrompt": "What would you say to another student in your exact situation, and why do you deserve the same accuracy rather than the insult?"},
      9: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week09", "overview": "This week treats flexibility as the partner of perseverance, not its opposite. You will learn to tell the difference between wise persistence and stubbornness: the goal holds steady while the strategy, and the willingness to adjust, stays open. The aim is to make this useful for real coursework. You will study why continuing effort sometimes needs a change of method, practise reading the signal that a strategy should change, and end on a flexible persistence plan. The week is about the psychology of keeping going, not about disclosing anything personal.", "purpose": "Perseverance and psychological flexibility both matter, and the skill is knowing which one a situation calls for. Nas and colleagues (2025) study flexibility alongside perseverance and well-being, treating it as the quality that lets a person keep moving without rigidly pushing past every limit. This week names the hinge between continuing and adjusting, so you can keep effort pointed at a goal that is genuinely worth pursuing while letting the method change when it stops paying off.", "outcomes": ["Explain why perseverance needs flexibility, rather than treating persistence as always continuing (Nas et al., 2025).", "Identify the signal that a strategy should change while the goal stays the same (Panadero, 2017).", "Distinguish wise persistence from stubbornness using the connection to values (Nas et al., 2025).", "Connect a learning goal to a value and one concrete next action (Nas et al., 2025)."], "guiding": ["How do people keep moving without confusing persistence with pushing past every limit?", "What is the difference between changing your method and giving up on your goal?", "When is continuing the wise move, and when is it just stubbornness wearing the costume of grit?", "How does a clear value tell you what is worth continuing and what is worth changing?"], "checks": [{"t": "Psychological flexibility is the partner of perseverance: the goal holds steady while the strategy and the willingness to adjust stay open", "look": "the Nas et al. (2025) reading and the Key Concepts"}, {"t": "Perseverance that supports well-being is selective: it keeps effort on a goal worth pursuing while letting the method change", "look": "the Nas et al. (2025) reading and the Key Concepts"}, {"t": "A strategy shift changes the method without abandoning the goal, and is an intelligent move rather than a retreat", "look": "the Panadero (2017) self-regulated learning frame in the Key Concepts"}, {"t": "Values give persistence its direction, so a clear value tells you what is worth continuing and why", "look": "the Key Concepts and the When to persist, when to shift activity"}, {"t": "Wise persistence and stubbornness differ by whether the goal still matters and the method is still working, not by how hard you push", "look": "the Nas et al. (2025) reading and the practice activity"}], "concepts": [{"h": "Psychological flexibility, the partner of perseverance", "body": "Psychological flexibility is the ability to adapt thoughts, feelings, and actions while staying connected to your values and goals. Nas and colleagues (2025) study it alongside perseverance and well-being, treating it as the quality that lets a person keep moving without rigidly pushing past every limit. For students, flexibility is what separates wise persistence from stubbornness: the goal holds steady while the strategy, and the willingness to adjust, stays open.", "cite": "Nas et al., 2025"}, {"h": "Perseverance that supports well-being", "body": "Perseverance is continuing effort toward something that matters. Nas and colleagues (2025) examine it together with psychological flexibility, suggesting that healthy persistence is paired with the capacity to adapt rather than to grind blindly. The useful version is selective: it keeps effort pointed at a goal that is genuinely worth pursuing, while allowing the method to change, so that persistence supports well-being rather than eroding it. Sometimes the persevering move is to continue, and sometimes it is to change the route.", "cite": "Nas et al., 2025"}, {"h": "A strategy shift is a hinge, not a retreat", "body": "A strategy shift is changing the method without abandoning the goal. It is the practical hinge of flexible persistence: the destination stays fixed while the route is revised when the current approach stops working. Drawing on the self-regulated learning cycle that Panadero (2017) describes, a strategy shift is a normal and intelligent move rather than a retreat, because it keeps effort productive instead of locking a student into a method that is no longer paying off.", "cite": "Panadero, 2017"}, {"h": "Values point persistence in a direction", "body": "Values are the reasons that make a goal meaningful enough to pursue. They give persistence its direction, so that effort is anchored to something you actually care about rather than to pressure or habit. Nas and colleagues (2025) connect flexibility and perseverance to well-being, and values are what keep that connection coherent: when the method has to change, a clear value tells you what is worth continuing and why.", "cite": "Nas et al., 2025"}], "terms": [{"term": "Psychological flexibility", "def": "the ability to adapt thoughts, feelings, and actions while staying connected to your values and goals; the quality that lets a person keep moving without rigidly pushing past every limit.", "cite": "Nas et al., 2025"}, {"term": "Perseverance", "def": "continuing effort toward something that matters; in its useful form it is selective, keeping effort on a goal worth pursuing while allowing the method to change.", "cite": "Nas et al., 2025"}, {"term": "Strategy shift", "def": "changing the method without abandoning the goal; the practical hinge of flexible persistence and an intelligent move rather than a retreat.", "cite": "Panadero, 2017"}, {"term": "Values", "def": "the reasons that make a goal meaningful enough to pursue, which give persistence its direction and tell you what is worth continuing when the method has to change.", "cite": "Nas et al., 2025"}], "readings": [{"apa": "Nas, E., Taytas, M., & Vangolu, M. S. (2025). The role of self-compassion and psychological flexibility in the relationship between perseverance and life satisfaction among academics. BMC Psychology. https://doi.org/10.1186/s40359-025-03757-y", "scope": "Read this on Blackboard", "id": "nas2025"}, {"apa": "Panadero, E. (2017). A review of self-regulated learning: Six models and four directions for research. Frontiers in Psychology, 8, 422. https://doi.org/10.3389/fpsyg.2017.00422", "scope": "Revisit from Week 2. Open access", "id": "panadero2017"}, {"apa": "Stephenson, E., Watson, P. J., Chen, Z. J., & Morris, R. J. (2018). Self-compassion, self-esteem, and irrational beliefs. Current Psychology, 37(4), 809-815. https://doi.org/10.1007/s12144-017-9563-2", "scope": "Revisit from Week 8. Read this on Blackboard", "id": "stephenson2018"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "When to persist, when to shift", "what": "You walk one student's academic goal step by step, deciding at each turn whether to persevere or flexibly shift strategy, guided by the value behind the goal, and watch the effect on their learning.", "why": "so you practise telling wise persistence from stubbornness, since sometimes continuing is the right move and sometimes changing the method is, and a clear value is what tells the two apart.", "data": {"setup": "Priya wants to do well in a statistics course because she values becoming someone who can read and trust evidence in her future field. That value is steady. What keeps changing is whether her current method is working. You step into her choices across one stretch of the term, deciding at each turn whether to keep going or change the route, and watching where each choice leaves her learning.", "steps": [{"situation": "Two weeks in, the material is genuinely hard and Priya's first quiz score is low. Her study method, rereading the textbook the night before, has not really been tested yet. She is tempted to drop the course.", "choices": [{"label": "Drop the course because the early score feels like proof she cannot do statistics", "outcome": "She abandons a goal tied to a value she cares about on the strength of one early result, before her method has had a fair trial. Nas and colleagues frame healthy persistence as keeping effort on a goal that is genuinely worth pursuing, and here the goal still is.", "harm": true, "cite": "Nas et al., 2025"}, {"label": "Persevere with the goal and give the work a fair run before judging the method", "outcome": "She keeps effort pointed at a goal that still matters to her, which is exactly the selective perseverance that supports well-being rather than a reflex to quit at the first hard score.", "harm": false, "cite": "Nas et al., 2025"}]}, {"situation": "A month later Priya has worked hard and stayed with rereading the textbook, but her scores are flat and she is more tired each week. The method, not the goal, is what is failing. She is proud of how hard she is pushing.", "choices": [{"label": "Push harder with the same method, rereading even more, because grit means not changing course", "outcome": "She mistakes stubbornness for perseverance and keeps a method that has stopped paying off. Panadero's self-regulated learning cycle treats monitoring a strategy and changing it as the intelligent move, and refusing to adjust erodes both her results and her well-being.", "harm": true, "cite": "Panadero, 2017"}, {"label": "Shift strategy, keep the goal, and switch to practice problems and a study group", "outcome": "She changes the route while the destination holds steady. A strategy shift is the hinge of flexible persistence, a normal and intelligent move rather than a retreat, and it puts her effort back where it can actually pay off.", "harm": false, "cite": "Panadero, 2017"}]}, {"situation": "Late in the term the new method is working and Priya is close to her goal, but a friend urges her to also chase a perfect score by adding hours she does not have, framing anything less as giving up. She checks the value underneath the goal.", "choices": [{"label": "Stay with the plan that is working, anchored to the value of reading evidence well, not a perfect score", "outcome": "She lets a clear value decide what is worth continuing. Values give persistence its direction, and here the value tells her the working method already serves the goal she actually cares about.", "harm": false, "cite": "Nas et al., 2025"}, {"label": "Abandon the working method to chase a perfect score she never valued, because stopping short feels like quitting", "outcome": "She drops a strategy that is paying off and redefines the goal around pressure rather than her own value. Without a value to anchor it, persistence loses its direction and turns into pushing for its own sake.", "harm": true, "cite": "Nas et al., 2025"}]}]}}, "youcan": ["You can now explain why perseverance needs flexibility, instead of treating persistence as always continuing", "You can now read the signal that a strategy should change while the goal stays the same", "You can now use a value to tell the difference between wise persistence and stubbornness"], "reflectPrompt": "Where might changing the method be the most responsible way to keep going on a goal you genuinely care about?"},
      10: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week10", "overview": "This week is about a learning move you can build into a habit: reflection. Reflection is thinking back on an experience in order to understand it and act differently next time, which is what turns events into learning rather than leaving them as memory alone. You will learn how a reflective journal differs from a diary, how looking back deliberately can build a critical-thinking habit, and how reflection fits a view of learning where you actively construct your own understanding. The work stays academic and practical: you weigh real reflective-practice options for your own coursework and pick the ones you would lean on, without being asked to disclose anything personal.", "purpose": "Reflection matters for learning because structured looking back is what converts experience into a usable conclusion, not just a recollection (Jadmiko et al., 2024). This week names concrete reflective-practice approaches so you can choose them on purpose rather than hoping insight arrives on its own. It connects the resilience work from earlier weeks to a repeatable academic habit you can keep using after the course ends.", "outcomes": ["Explain how reflection turns experience into learning rather than memory alone (Jadmiko et al., 2024).", "Distinguish a reflective journal that links event, meaning, and next action from a diary that only recounts events (Jadmiko et al., 2024).", "Explain how reflective journaling can surface and strengthen a critical-thinking disposition (Kamarulzaman & Ibrahim, 2026).", "Choose reflective-practice approaches for your own coursework and weigh what each one offers and costs (Panadero, 2017)."], "guiding": ["How does reflection turn experience into learning rather than memory alone?", "What makes a reflective journal different from a diary, and why does the structure matter?", "Where does a reflection model help, and where does it need real context to work?", "Which reflective-practice approaches would you actually keep using on real coursework, and why those?"], "checks": [{"t": "Reflection turns experience into learning by moving from event to meaning to next action, so it produces a usable conclusion rather than only a recollection", "look": "the Jadmiko et al. (2024) reading and the Key Concepts"}, {"t": "A reflective journal links what happened to what it shows and what you will try next, which is what makes it different from a diary that only recounts events", "look": "the Jadmiko et al. (2024) reading and the Key Concepts"}, {"t": "Reflective journaling can surface and strengthen a critical-thinking disposition, a standing willingness to question, check, and revise your own thinking", "look": "the Kamarulzaman and Ibrahim (2026) reading"}, {"t": "Constructivism frames reflection as the work of building understanding from experience, which is why reflecting on real coursework matters so much to learning", "look": "the Key Concepts and the Jadmiko et al. (2024) reading"}, {"t": "Reflective practice can be chosen deliberately by weighing what each approach offers and what it costs for your own learning", "look": "the Panadero (2017) reading and the Make reflection a practice activity"}], "concepts": [{"h": "Reflection turns experience into learning", "body": "Reflection is thinking back on an experience in order to understand it and act differently. It is what turns events into learning rather than leaving them as memory alone. Jadmiko et al. (2024) connect reflective practice to resilience, showing that structured looking back helps students make sense of difficulty. The practical shape is a short movement from event to meaning to next action, so that reflection produces a usable conclusion rather than only a recollection.", "cite": "Jadmiko et al., 2024"}, {"h": "A reflective journal is not a diary", "body": "A reflective journal is a structured record that connects experience, meaning, and next steps, distinct from a diary that only recounts events. Jadmiko et al. (2024) use reflective writing to support resilience, treating the journal as a place to process and reframe rather than simply to vent. The structure is what makes it work: by linking what happened to what it shows and what you will try next, the journal converts experience into a plan rather than a record.", "cite": "Jadmiko et al., 2024"}, {"h": "Reflection builds a critical-thinking habit", "body": "A critical-thinking disposition is a standing habit of questioning, checking, and revising your own thinking. Kamarulzaman and Ibrahim (2026) study how reflective journaling can surface and strengthen this disposition in students. It is less a single skill than a willingness to ask whether a conclusion holds, to look for what you might be missing, and to change your mind when the evidence calls for it, which is exactly what regular reflective practice trains.", "cite": "Kamarulzaman & Ibrahim, 2026"}, {"h": "Constructivism: you build understanding", "body": "Constructivism is a view of learning in which students actively build understanding from experience and evidence rather than receiving knowledge passively. Jadmiko et al. (2024) draw on constructivist theory to ground reflective writing, treating reflection as the work of constructing meaning from what you have lived. The implication is encouraging: understanding is something you make through engagement, which is why reflecting on real coursework, and choosing how you reflect, matters so much to learning.", "cite": "Jadmiko et al., 2024"}], "terms": [{"term": "Reflection", "def": "thinking back on an experience in order to understand it and act differently; the move that turns events into learning rather than memory alone, shaped as event to meaning to next action.", "cite": "Jadmiko et al., 2024"}, {"term": "Reflective journal", "def": "a structured record that links experience, meaning, and next steps, distinct from a diary that only recounts events; the structure is what converts experience into a plan.", "cite": "Jadmiko et al., 2024"}, {"term": "Critical-thinking disposition", "def": "a standing habit of questioning, checking, and revising your own thinking, which reflective journaling can surface and strengthen.", "cite": "Kamarulzaman & Ibrahim, 2026"}, {"term": "Constructivism", "def": "a view of learning in which students actively build understanding from experience and evidence rather than receiving knowledge passively, the theory that grounds reflective writing.", "cite": "Jadmiko et al., 2024"}], "readings": [{"apa": "Jadmiko, A. W., Mustika, R., & Bashiruddin, J. (2024). Reflective learning with constructivism theory approaches through reflective writing journal to enhance nursing students' resilience.", "scope": "Open access", "id": "jadmiko2024"}, {"apa": "Kamarulzaman, W., & Ibrahim, H. (2026). Uncovering critical thinking dispositions through reflective journaling: A qualitative study of Malaysian undergraduates.", "scope": "Open access", "id": "kamarulzaman2026"}, {"apa": "Panadero, E. (2017). A review of self-regulated learning: Six models and four directions for research. Frontiers in Psychology, 8, 422. https://doi.org/10.3389/fpsyg.2017.00422", "scope": "Revisit from Week 2. Open access", "id": "panadero2017"}], "activity": {"screen": "activity", "archetype": "lab", "title": "Make reflection a practice", "what": "You take a real learning situation, weigh several reflective-practice approaches against it, and pick the ones you would actually lean on for your own coursework.", "why": "so reflection stops being a vague instruction to think about your learning and becomes a set of concrete approaches you have weighed and chosen, each with what it gives you and what it costs.", "data": {"case": "You sit a midterm you studied hard for and still do worse than you expected. The marks are back, the feeling has faded, and the same kind of assessment is coming again in a few weeks. You decide which reflective-practice approaches you would use to turn this experience into a plan, rather than letting it stay a bad memory.", "levers": [{"label": "Event to meaning to next action", "effect": "Walks the experience through three steps, what happened, what it shows, what you will try next, so the reflection ends in a usable conclusion rather than a recollection.", "tradeoff": "The structure only helps if you are honest at the meaning step; a rushed pass can name a next action that does not actually follow from what the experience showed.", "cite": "Jadmiko et al., 2024"}, {"label": "Keep a reflective journal, not a diary", "effect": "Builds a standing record that links events, meaning, and next steps over time, so you can see patterns across several assessments instead of one isolated result.", "tradeoff": "It takes consistent effort to maintain, and without the linking structure it slides back into a diary that only recounts events and changes nothing.", "cite": "Jadmiko et al., 2024"}, {"label": "Use reflection to question your own thinking", "effect": "Turns the look back into a critical-thinking habit: you ask whether your conclusion about the result holds, what you might be missing, and what would change your mind.", "tradeoff": "Questioning your own thinking is uncomfortable and slow, and it can stall into second-guessing if you never move from questioning to a decision.", "cite": "Kamarulzaman & Ibrahim, 2026"}, {"label": "Treat reflection as building understanding", "effect": "Frames the experience as raw material you actively construct meaning from, so a poor result becomes evidence you work with rather than a verdict you receive.", "tradeoff": "Constructing your own meaning takes more engagement than being told the answer, and it asks you to sit with uncertainty before the understanding arrives.", "cite": "Jadmiko et al., 2024"}, {"label": "Reflect forward by planning the next attempt", "effect": "Uses reflection to set a concrete plan for the next assessment, drawing on a self-regulated-learning cycle where you plan, act, and reflect rather than only looking back.", "tradeoff": "Forethought is only as good as the monitoring that follows it; a plan you never check against the next result is reflection that never closes the loop.", "cite": "Panadero, 2017"}, {"label": "Reflect on how you regulated yourself, not just the content", "effect": "Looks at how you managed your study, attention, and effort, so you learn about your own learning process and not only about the material you missed.", "tradeoff": "It is easy to blur into self-criticism rather than self-regulation, and it needs an honest read of your own process, which is the hardest thing to see clearly.", "cite": "Panadero, 2017"}], "pick": 2}}, "youcan": ["You can now explain how reflection turns experience into learning rather than memory alone", "You can now tell a reflective journal apart from a diary and say why the structure matters", "You can now choose reflective-practice approaches for your own coursework and weigh what each one offers and costs"], "reflectPrompt": "Think of one experience from this term that would make more sense if you reflected on it deliberately. Which reflective-practice approach would you reach for first, and what would you want it to help you see?"},
      11: {"time": "About 90 minutes (read 40, watch 20, do 25, reflect 5)", "deck": "PSY355_Week11", "overview": "This week treats asking for help as a learning skill, not a sign of failure. When independent effort is not enough, the strong move is to reach the right person, name the problem clearly, and ask for the specific help you need. You will study help seeking as a deliberate learning strategy, walk a problem solving sequence you can use on a real academic barrier, and learn what makes a request actually land. Reaching out here means contacting an instructor, a peer, or an academic support service for course support; it is not about disclosing anything personal, and it is not crisis support. The point is to make one clear, well aimed request you could send this week.", "purpose": "Week 11 links resilience to communication, problem solving, and help seeking. It reframes help seeking as a strength-based learning strategy that appears inside self-regulated learning, lays out a problem solving sequence for a realistic barrier, and shows how mindful communication makes a request clear enough to act on. The aim is a single, specific academic support request that names the issue, the step already tried, and the exact help needed.", "outcomes": ["Describe help seeking as a strength-based learning strategy rather than evidence of weakness (Panadero, 2017).", "Use a problem solving sequence to make a stuck academic situation workable one step at a time (Panadero, 2017).", "Explain what mindful communication adds to a request: purpose, audience, and impact (Wrench, Punyanunt-Carter, and Thweatt, 2020).", "Draft a clear academic support request that names the issue, the step already tried, and the specific help needed (Wrench, Punyanunt-Carter, and Thweatt, 2020)."], "guiding": ["How do you ask for help without treating help as failure?", "Where does help seeking fit inside how you already manage your own learning?", "What makes a request land: who you ask, how clearly you name the problem, or both?", "What is one concrete request you could send this week without pretending the barrier is simple?"], "checks": [{"t": "Help seeking is a deliberate learning strategy inside self-regulated learning, not a fallback for those who cannot manage", "look": "the Panadero (2017) reading and the Key Concepts"}, {"t": "A problem solving sequence makes a stuck situation workable by naming the problem, choosing an option, acting, and checking the result", "look": "the Key Concepts and the Build your help-seeking toolkit activity"}, {"t": "Mindful communication attends to purpose, audience, and impact, so a request is shaped for the person who will read it", "look": "the Wrench, Punyanunt-Carter, and Thweatt (2020) reading"}, {"t": "A clear request names the issue, the step already tried, and the specific help needed, which makes it far more likely to land", "look": "the Key Concepts and the activity"}, {"t": "Reaching out means contacting an instructor, a peer, or an academic support service for course support, not crisis support", "look": "the activity and the practice request"}], "concepts": [{"h": "Help seeking as a learning strategy", "body": "Help seeking is a strategy for getting information, support, or feedback when independent effort is not enough. In the self-regulated learning models Panadero (2017) reviews, it appears as a deliberate learning move, not a fallback for students who cannot manage. Reframing it this way matters: asking becomes evidence of learning rather than evidence of weakness, and knowing when and how to ask, and who to ask, is itself a skill worth practising.", "cite": "Panadero, 2017"}, {"h": "A problem solving sequence you can reuse", "body": "Problem solving is a process of naming the problem, choosing among options, acting, and checking the result. Laid out as a sequence, it breaks a stuck academic situation into steps you can take one at a time. The check at the end matters as much as the action: it tells you whether the option you chose actually helped, which turns problem solving into a loop that improves rather than a single guess.", "cite": "Panadero, 2017"}, {"h": "Mindful communication aims the request", "body": "Mindful communication is communication that attends to purpose, audience, and impact. Wrench, Punyanunt-Carter, and Thweatt (2020) ask speakers to notice why they are communicating, with whom, and to what effect. For an academic request this is practical: a message shaped for the person reading it, that names the issue, the step already tried, and the specific help needed, is far more likely to land than a vague or reactive one.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}, {"h": "Empathy on both sides of the request", "body": "Empathy is the effort to understand another person's experience without replacing it with your own. Wrench, Punyanunt-Carter, and Thweatt (2020) treat it as central to mindful relationships, where understanding others supports clearer, more respectful communication. In a request it works two ways: thinking about what the reader needs to help you makes your message easier to act on, and it models the same accurate, non-judgmental attention you would want turned toward yourself.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}], "terms": [{"term": "Help seeking", "def": "a strategy for getting information, support, or feedback when independent effort is not enough; a deliberate learning move inside self-regulated learning, not a sign of weakness.", "cite": "Panadero, 2017"}, {"term": "Problem solving", "def": "a process of naming the problem, choosing among options, acting, and checking the result, which breaks a stuck situation into steps you can take one at a time.", "cite": "Panadero, 2017"}, {"term": "Mindful communication", "def": "communication that attends to purpose, audience, and impact, noticing why you are communicating, with whom, and to what effect, so a message is shaped to land.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}, {"term": "Empathy", "def": "the effort to understand another person's experience without replacing it with your own; central to mindful relationships and to requests that are clear and respectful.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}], "readings": [{"apa": "Panadero, E. (2017). A review of self-regulated learning: Six models and four directions for research. Frontiers in Psychology, 8, 422. https://doi.org/10.3389/fpsyg.2017.00422", "scope": "Revisit from Week 2. Open access", "id": "panadero2017"}, {"apa": "Wrench, J. S., Punyanunt-Carter, N. M., & Thweatt, K. S. (2020). Interpersonal communication: A mindful approach to relationships. Milne Library, SUNY Open Educational Resources. (Ch. 9: Conflict in Relationships; mindful communication; empathy; purpose, audience, and impact.)", "scope": "Open access", "id": "wrench2020"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Build your help-seeking toolkit", "what": "You assemble the parts of an effective academic help-seeking and problem-solving toolkit one at a time, naming what each part contributes, then end on a single clear request you could send this week.", "why": "so you can ask for academic help on purpose, by naming the problem, choosing the right person, and shaping the message to land, rather than treating a request as a sign of failure.", "data": {"goal": "Assemble the parts of an academic help-seeking and problem-solving toolkit into one working picture, so you can turn a stuck academic situation into a clear, well aimed request to an instructor, a peer, or an academic support service, and see help seeking as a learning strategy rather than a sign of weakness.", "components": [{"label": "Name the problem", "role": "starts the problem solving sequence by stating the stuck point plainly, which breaks a vague difficulty into something specific enough to act on one step at a time.", "cite": "Panadero, 2017"}, {"label": "Treat asking as a learning move", "role": "reframes help seeking as a deliberate strategy inside self-regulated learning, so reaching out counts as evidence of learning rather than evidence that you cannot manage.", "cite": "Panadero, 2017"}, {"label": "Reach the right person", "role": "directs the request to the instructor, peer, or academic support service who can actually help with this course problem, so the message goes where it can be acted on.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}, {"label": "Ask a specific question", "role": "names the issue, the step you already tried, and the exact help you need, which gives the reader something concrete to respond to instead of a vague appeal.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}, {"label": "Communicate mindfully", "role": "shapes the message for its purpose, audience, and impact, and uses empathy for the reader, so the request is clear and respectful enough to land.", "cite": "Wrench, Punyanunt-Carter, and Thweatt, 2020"}, {"label": "Check the result", "role": "closes the loop by asking whether the help you got actually moved the problem, which turns a single request into a problem solving cycle you can repeat and improve.", "cite": "Panadero, 2017"}]}}, "youcan": ["You can now describe help seeking as a strength-based learning strategy rather than evidence of weakness", "You can now use a problem solving sequence to make a stuck academic situation workable one step at a time", "You can now draft a clear academic support request that names the issue, the step already tried, and the specific help needed"], "reflectPrompt": "In a sentence or two: what would change for you this term if asking for help counted as evidence of learning rather than evidence of weakness, and what is one request you could send because of it?"},
    
      2: {"time": "About 90 minutes (read, watch, do, reflect)", "deck": "PSY355_Week02", "overview": "This week turns learning into something you can manage rather than a single push of effort. The idea is self-regulated learning: a cycle where you plan a task, monitor and adjust while you work, and reflect afterward on what to change. You will read how this cycle is described across several models, watch the phases laid out in plain language, and then assemble the cycle yourself so you can use it on real coursework. The point is study strategy, not therapy. A strategy is a fit between an approach and a task, not a habit you apply to everything, and monitoring is what turns effort into learning by letting you adjust while the task is still open. The reflection then feeds your next plan, so a weak result becomes information for the next attempt rather than a verdict.", "purpose": "Self-regulated learning matters because it treats learning as a sequence you can steer, which is what lets effort become progress rather than just more of the same (Panadero, 2017). This week gives you plain language for planning, monitoring, and reflecting, so you can read a task and choose an approach that fits it. It connects intention, the wish to do well, to regulation, the action that turns the wish into a plan you can manage.", "outcomes": ["Describe self-regulated learning as a cycle of forethought, performance, and self-reflection rather than a one-time effort (Panadero, 2017).", "Explain why monitoring during a task lets you adjust while the work is still open (Panadero, 2017).", "Identify a study strategy that fits a specific task rather than applying the same habit everywhere (Panadero, 2017).", "Use the self-reflection phase to turn a weak result into a plan for the next attempt (Panadero, 2017)."], "guiding": ["What is the difference between intending to learn and regulating the conditions that make learning happen (Panadero, 2017)?", "Which phase of the cycle do you give the least attention, and what would change if you gave it more (Panadero, 2017)?", "When does effort need feedback and adjustment to become learning rather than just more of the same (Panadero, 2017)?", "Where does the self-regulated learning model help, and where does it still need the context around a real barrier (Panadero, 2017)?"], "checks": [{"t": "Intention is the wish to do well, while regulation is the action that turns the wish into a plan you can monitor and adjust", "look": "the Panadero (2017) reading and the Key Concepts"}, {"t": "Self-regulated learning is a cycle of planning, monitoring, and reflecting, where each phase feeds the next rather than a single push of effort", "look": "the Key Concepts and the Assemble the cycle activity"}, {"t": "A strategy is a fit between an approach and a task, not a habit you apply to everything, so you read the task before choosing the method", "look": "the Panadero (2017) reading and the Key Terms"}, {"t": "Monitoring catches the gap while the task is still open, when the adjustment is still cheap, which is what turns effort into learning", "look": "the Key Concepts and the activity"}, {"t": "The self-reflection phase makes a weak result information for the next plan rather than a final verdict on you", "look": "the Panadero (2017) reading and the Assemble the cycle activity"}], "concepts": [{"h": "Self-regulated learning is a cycle", "body": "Self-regulated learning treats learning as a sequence you can manage rather than a single push of effort. Panadero (2017) reviews six models of this process and finds a common shape across them: a forethought or planning phase, a performance or monitoring phase, and a self-reflection phase. The reflection feeds the next plan, so the phases run as a cycle. The point is not to memorize the phases but to use them to read a situation and choose an action that fits.", "cite": "Panadero, 2017"}, {"h": "Intention is not regulation", "body": "Wanting to learn and managing the actual conditions of learning are two different things. Intention is the wish to do well; regulation is acting on the conditions that make learning happen. The forethought phase is where intention becomes a plan you can monitor, by setting goals and choosing how you will approach the task (Panadero, 2017). Naming that difference is where the week begins, because a wish on its own gives you nothing to adjust.", "cite": "Panadero, 2017"}, {"h": "Monitoring turns effort into learning", "body": "Monitoring is checking how the work is going while it is still going, so you can adjust before the task is over. It sits in the performance phase of the cycle, where effort meets feedback (Panadero, 2017). Effort without feedback only spends more energy on an approach that may not be landing. Monitoring is what lets you catch the gap during the task, when the adjustment is still cheap, rather than only after, when it is expensive.", "cite": "Panadero, 2017"}, {"h": "Where the model helps and where it needs context", "body": "The model is a tool, not a verdict on the student. It helps by giving plain language for planning, monitoring, and reflecting, and by showing that a poor result can be adjusted rather than simply judged (Panadero, 2017). It also has limits: self-regulation describes the learning, but it does not erase the real conditions and barriers around a student. The useful stance holds both at once, naming a concrete action without pretending the barrier is simple.", "cite": "Panadero, 2017"}], "terms": [{"term": "Self-regulated learning", "def": "the cyclical process where a learner plans, monitors, and reflects on their own learning, treating learning as a sequence you can manage rather than a single push of effort.", "cite": "Panadero, 2017"}, {"term": "Forethought phase", "def": "the planning phase of the cycle, where intention becomes a plan: you set goals and choose how you will approach the task before you begin.", "cite": "Panadero, 2017"}, {"term": "Performance phase", "def": "the phase during the task where you carry out the work and monitor it, checking how it is going so you can adjust while the task is still open.", "cite": "Panadero, 2017"}, {"term": "Self-reflection phase", "def": "the phase after the task where you evaluate what worked and what to change, so the result feeds the next plan rather than standing as a final verdict.", "cite": "Panadero, 2017"}], "readings": [{"apa": "Panadero, E. (2017). A review of self-regulated learning: Six models and four directions for research. Frontiers in Psychology, 8, 422. https://doi.org/10.3389/fpsyg.2017.00422", "scope": "Revisit from Week 2. Open access", "id": "panadero2017"}], "youcan": ["You can now describe self-regulated learning as a cycle of planning, monitoring, and reflecting rather than a one-time effort", "You can now use monitoring to catch a gap while a task is still open, when the adjustment is still cheap", "You can now turn a weak result into a plan for the next attempt through the self-reflection phase"], "reflectPrompt": "Think of a recent task you meant to do well. Where did the intention sit, where did the actual regulation begin, and which phase of the cycle would change the most if you gave it more attention next time?", "activity": {"screen": "activity", "archetype": "assemble", "title": "Assemble the self-regulated learning cycle", "what": "You assemble the self-regulated learning cycle one phase at a time, naming what each phase contributes, then end on the reflection that feeds your next plan, so you can see how the cycle holds together rather than as a list of steps to memorize.", "why": "so you can use the cycle to read a real task: plan it, monitor and adjust while you work, and reflect afterward, treating a weak result as information for the next attempt rather than a verdict.", "data": {"goal": "Assemble the self-regulated learning cycle as Panadero synthesizes it across six models, from setting a goal to reflecting on the result. Place each phase in order and name what it contributes, so you can see why monitoring sits in the middle, why reflection feeds the next plan, and how the whole sequence turns a wish to do well into a plan you can manage and adjust on real coursework.", "components": [{"label": "Forethought and goal-setting", "role": "opens the cycle by turning intention into a plan: you set a goal for the task and decide what doing well would look like before you begin, so there is something concrete to steer toward.", "cite": "Panadero, 2017"}, {"label": "Strategic planning", "role": "chooses an approach that fits this particular task rather than a habit you apply to everything, because reading for an argument is a different strategy from drilling a procedure.", "cite": "Panadero, 2017"}, {"label": "Self-monitoring during performance", "role": "checks how the work is going while it is still going, in the performance phase, so you notice a gap during the task when there is still time to act on it.", "cite": "Panadero, 2017"}, {"label": "Adjusting the strategy", "role": "uses what monitoring catches to change the approach mid-task, so effort meets feedback and you are not spending more energy on an approach that is not landing.", "cite": "Panadero, 2017"}, {"label": "Self-reflection and self-evaluation", "role": "looks back after the task at what worked and what to change, treating a weak result as information rather than a final verdict on you.", "cite": "Panadero, 2017"}, {"label": "Feeding the next plan", "role": "closes the loop by carrying the reflection into your next forethought phase, which is what makes self-regulated learning a cycle rather than a one-time effort.", "cite": "Panadero, 2017"}]}}},
      12: {"time": "About 90 minutes (read, watch, do, reflect)", "deck": "PSY355_Week12", "overview": "This week brings the course together into a whole person view of well-being. You will treat well-being as holistic, meaning academic, work, family, and community life seen as connected, so the question moves from how do I finish this task to what does my whole life need to keep going. Using Owen (2023) on resilience and ancient practical philosophy, you will read resilience as something practiced rather than simply possessed, and you will sort what is and is not in your control as a way of choosing where effort actually helps. The point is not a new technique but a steadier stance: living well, the ancient aim, treated as a set of repeatable practices a student can carry across an ordinary term rather than a peak performance held together once under ideal conditions.", "purpose": "Week 12 closes the course by connecting contemporary resilience psychology to ancient practical philosophy, so the well-being practices you have met stop being separate tools and become one whole person stance. Building on the resilience and coping material from earlier weeks, you now read resilience as practiced rather than possessed, and you use the old distinction between what is and is not in your control to decide where effort is well spent. The work stays grounded in Owen (2023) and in an everyday student situation about study and life balance, so the ideas travel beyond class and feed directly into a sustainable, repeatable set of well-being practices you can keep using after the term ends.", "outcomes": ["By the end of this week you can explain holistic well-being as academic, work, family, and community life seen as connected rather than one isolated technique (Owen, 2023).", "By the end of this week you can describe resilience as something practiced rather than simply possessed, in the way ancient practical philosophy treats living well (Owen, 2023).", "By the end of this week you can sort a difficult situation into what is and is not in your control, and direct effort toward what you can actually shape (Owen, 2023).", "By the end of this week you can choose well-being practices because they are sustainable and repeatable across an ordinary term, not because they look impressive once (Owen, 2023)."], "guiding": ["What changes when well-being is read as a whole person stance rather than one more technique (Owen, 2023)?", "What does it mean to treat resilience as practiced rather than possessed, and how does that connect modern psychology to ancient practical philosophy (Owen, 2023)?", "Where does sorting what is and is not in your control help a student spend effort well, and where might it be hard to apply honestly (Owen, 2023)?", "What makes a well-being practice sustainable enough to keep using on a hard week, not only an easy one (Owen, 2023)?"], "checks": [{"t": "What holistic well-being means: academic, work, family, and community life read as connected, so the question becomes what the whole person needs to keep going rather than how to finish a single task", "look": "the Owen (2023) reading"}, {"t": "Why ancient practical philosophy is relevant to modern resilience: it treats living well as a practiced way of life, which lines up with reading resilience as something built through practice rather than simply possessed", "look": "the Owen (2023) reading"}, {"t": "What the distinction between what is and is not in your control offers a student: a way to aim effort at what can actually be shaped, instead of spending it on what cannot be changed", "look": "the Owen (2023) reading"}, {"t": "Why virtue or character matters in practical philosophy: living well is treated as how a person responds and acts over time, not a single outcome or a one time result", "look": "the Owen (2023) reading"}, {"t": "Sorting a study and life situation into what is and is not in your control, and choosing a well-being response that is sustainable enough to repeat across an ordinary term", "look": "the activity and your two practice plan"}], "concepts": [{"h": "Holistic well-being as a whole person view", "body": "Holistic well-being treats academic, work, family, and community life as connected, rather than well-being as one isolated technique or assignment. Owen (2023) connects contemporary resilience psychology to ancient practical philosophy, where the aim is living well across a whole life rather than performing once. For students this shifts the question from how do I finish this task to what does my whole life need to keep going, which makes well-being a stance to maintain rather than a single problem to solve.", "cite": "Owen, 2023"}, {"h": "Resilience as practiced, not simply possessed", "body": "Resilience here is something a person builds through practice, rather than a fixed trait some people own and others lack. Owen (2023) reads contemporary resilience alongside ancient practical philosophy, which treats living well as a practiced way of life rather than an inborn gift. The point for students is freeing: a hard term is a chance to practise a stance, so steadiness under pressure can grow with repetition instead of being a quality a person either has from the start or does not.", "cite": "Owen, 2023"}, {"h": "What is and is not in your control", "body": "A central move in ancient practical philosophy is sorting a situation into what is and is not in your control, then directing effort toward what can actually be shaped. Owen (2023) connects this old distinction to modern resilience, where spending energy on what cannot be changed tends to drain a person while effort aimed at responses and choices tends to help. For students this is practical: it points effort at the parts of a setback they can act on, without pretending the rest is simple.", "cite": "Owen, 2023"}, {"h": "Living well as a sustainable practice", "body": "Living well, the aim ancient practical philosophy describes, is a way of acting maintained over time rather than a single peak result. Owen (2023) connects this to resilience by treating well-being as practised rather than possessed, which raises the question of whether a practice can be repeated. For students this becomes a test of sustainability: a well-being practice is worth keeping only if it can be carried across ordinary academic, work, and family weeks, not held together once under ideal conditions.", "cite": "Owen, 2023"}], "terms": [{"term": "Holistic well-being", "def": "well-being understood as academic, work, family, and community life seen as connected, so the question becomes what the whole person needs to keep going rather than how to complete one isolated task.", "cite": "Owen, 2023"}, {"term": "Practical philosophy", "def": "an ancient approach to living well as a practiced way of life, connected by Owen to contemporary resilience psychology, where well-being is built through practice rather than simply possessed.", "cite": "Owen, 2023"}, {"term": "What is in your control", "def": "the distinction between the responses and choices a person can actually shape and the circumstances they cannot, used to direct effort toward what can be changed rather than what cannot.", "cite": "Owen, 2023"}, {"term": "Sustainable practice", "def": "a well-being practice judged worth keeping because it can be repeated across ordinary academic, work, and family contexts over time, rather than performed once under ideal conditions.", "cite": "Owen, 2023"}], "readings": [{"apa": "Owen, J. (2023). Psychological resilience: Connecting contemporary psychology to ancient practical philosophy. Theory & Psychology, 33(3), 366-385. https://doi.org/10.1177/09593543231153820", "scope": "Revisit from Week 12. Open access", "id": "owen2023"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "A whole person stance under pressure", "what": "You walk a realistic study and life balance situation step by step, choosing how a student responds at each turn and watching which moves treat well-being as a practised whole person stance and which treat it as one impressive technique held together once.", "why": "so you practise reading well-being as something practised rather than possessed, sorting what is and is not in your control, and choosing responses that are sustainable enough to repeat, before you build a two practice plan of your own.", "data": {"setup": "Devon is in the final stretch of a heavy term. Coursework, a part time job, and family responsibilities are all pressing at once, and the way Devon has been coping is to push through on willpower and skip meals, sleep, and contact with friends until each deadline passes. The peak effort holds for a day or two and then collapses. This week is not about diagnosing anything. It is about a whole person view: well-being read as academic, work, family, and community life seen as connected, and a stance practised across an ordinary week rather than a technique held together once. You step into Devon's choices, deciding at each turn which response is more supportive of well-being and which is less.", "steps": [{"situation": "Three deadlines, a work shift, and a family commitment all land in the same week. Devon feels the pressure and has to decide how to read the situation before acting on it.", "choices": [{"label": "Treat the whole week as one undifferentiated wall of stress and brace to push through all of it on willpower", "outcome": "Reading everything as equally urgent and equally controllable leaves Devon with nowhere useful to aim effort. Owen connects resilience to the ancient practice of sorting what is and is not in your control, so collapsing it all into one wall is less supportive of well-being because it spends energy everywhere and steadies nothing.", "harm": false, "cite": "Owen, 2023"}, {"label": "Sort the week into what is and is not in Devon's control: which deadlines can shift, which cannot, and which responses are actually a choice", "outcome": "Sorting the week into what can and cannot be shaped is the move Owen draws from ancient practical philosophy, and it is more supportive of well-being because it points effort at the responses and choices Devon can act on rather than draining it on what is fixed.", "harm": false, "cite": "Owen, 2023"}]}, {"situation": "Partway through the week Devon notices the old pattern returning: skipping meals and sleep, dropping contact with friends, and treating the body and the rest of life as things to sacrifice until the deadlines pass.", "choices": [{"label": "Keep sacrificing sleep, food, and friends, treating well-being as a reward to claim only after the work is finished", "outcome": "Splitting academic effort off from the rest of life runs against the holistic view Owen describes, where academic, work, family, and community life are connected. Postponing all of life until the work is done is less supportive of well-being because the connected parts a student relies on get cut at exactly the moment they help most.", "harm": false, "cite": "Owen, 2023"}, {"label": "Hold a few connected parts of life steady through the week: a basic sleep window, regular meals, and one check in with a friend", "outcome": "Keeping the connected parts of life running treats well-being as holistic in Owen's sense, academic, work, family, and community life seen as one whole. This is more supportive of well-being because it maintains the supports a student draws on, rather than removing them in the hardest week.", "harm": false, "cite": "Owen, 2023"}]}, {"situation": "With the term nearly over, Devon thinks about what to carry forward and decides how to read the way this week went.", "choices": [{"label": "Plan to repeat the same all out push next term, treating one survived crunch as proof the willpower only approach works", "outcome": "Banking on a peak effort that collapses after a day or two treats resilience as a one time performance rather than a practice. Owen reads resilience as practised rather than possessed, so leaning on an unsustainable push is less supportive of well-being because it cannot be repeated across an ordinary term.", "harm": false, "cite": "Owen, 2023"}, {"label": "Choose two practices Devon can actually repeat, one for pressure and one for recovery, because they hold up on a hard week and not only an easy one", "outcome": "Choosing practices because they are sustainable and repeatable treats well-being as a practised way of living well, which is the link Owen draws to ancient practical philosophy. This is more supportive of well-being because the stance can travel across the whole term and beyond it, not just through one crunch.", "harm": false, "cite": "Owen, 2023"}]}]}}, "youcan": ["You can now explain holistic well-being as academic, work, family, and community life seen as connected, and resilience as practised rather than simply possessed (Owen, 2023)", "You can now sort a study and life situation into what is and is not in your control, and aim effort at what you can actually shape (Owen, 2023)", "You can now choose well-being practices because they are sustainable and repeatable across an ordinary term, not because they look impressive once (Owen, 2023)"], "reflectPrompt": "In a sentence or two: name one part of a busy week that is in your control and one that is not, then choose one practice for pressure and one for recovery you could realistically repeat. What becomes easier once you read well-being as a practised whole person stance rather than one technique held together once?"},
      13: {"deck": "", "time": "About 75 minutes (revisit, plan, reflect)", "overview": "This is the course capstone. You will not read anything new. Instead you will gather what you learned across the term into one thing you can keep: a personal resilience plan, written in your own words. The plan has a few dimensions, each one drawn from a different week. You will revisit a growth mindset stance, the role of self-efficacy and confidence, self-compassion when something goes wrong, and the people and supports around you, then tie them together into a plan that is yours. This is a learning and resilience plan for your studies, not a treatment plan, and it does not ask you to disclose anything difficult or private. The point is to leave the course with a clear, usable picture of how you keep going.", "purpose": "Resilience is easier to talk about than to hold onto, and a term is a lot to carry forward at once. This capstone exists so the ideas do not stay scattered across thirteen weeks. By rebuilding them as one personal plan, you decide which moves are actually yours: how you frame a setback (Yeager and Dweck, 2020), how you build the confidence to keep trying (Cassidy, 2015), how you treat yourself when an effort fails (Neff, 2003), and who and what you draw on around you (Ungar, 2011). The aim is one plan you could open again next term, not a perfect document.", "outcomes": ["Integrate ideas from across the course into one personal resilience plan written in your own words (Cassidy, 2015).", "State a growth mindset stance you can take toward a setback in your studies (Yeager and Dweck, 2020).", "Describe how self-efficacy and confidence are built through effort and small wins rather than waited for (Cassidy, 2015).", "Plan a self-compassionate response to a setback that keeps you working rather than stopping (Neff, 2003).", "Identify the people, services, and supports in your own surroundings that make resilience possible (Ungar, 2011)."], "guiding": ["Which ideas from this term do you actually want to keep, and which were not for you (Cassidy, 2015)?", "When something in your studies does not go well, what would a growth mindset stance sound like in your own words (Yeager and Dweck, 2020)?", "How do you build confidence through effort and small wins instead of waiting to feel ready (Cassidy, 2015)?", "Who and what around you do you already draw on, and who could you add (Ungar, 2011)?"], "checks": [{"t": "A personal resilience plan gathers ideas from across the course into one usable picture written in your own words, not a perfect document", "look": "the activity and the Key Concepts"}, {"t": "A growth mindset stance frames a setback as information about a strategy rather than a verdict on your ability", "look": "the Yeager and Dweck (2020) reading, revisited from an earlier week"}, {"t": "Self-efficacy and confidence are built through effort, practice, and small wins, so the plan should name where those come from", "look": "the Cassidy (2015) reading, revisited from an earlier week"}, {"t": "Self-compassion is meeting your own setback with the same kindness you would offer a friend, which keeps you working rather than stopping", "look": "the Neff (2003) reading, revisited from an earlier week"}, {"t": "Resilience depends on the people, services, and supports around you, so a plan names who and what you draw on, not just what you do alone", "look": "the Ungar (2011) reading, revisited from an earlier week"}], "concepts": [{"h": "Your resilience plan, built from the whole course", "body": "A personal resilience plan is a short, usable picture of how you keep going, assembled in your own words from what the term taught. It is not new theory and not a perfect document. It works because you decide which ideas are genuinely yours and write them down where you can find them again. Cassidy (2015) frames resilience as something built in students rather than fixed, and a plan is how you make that building deliberate instead of leaving it to chance.", "cite": "Cassidy, 2015"}, {"h": "A growth mindset stance toward setbacks", "body": "A growth mindset is the belief that ability can develop with effort and good strategies. Yeager and Dweck (2020) review what this idea does and does not promise, and the honest version is modest: a setback is information about a strategy, not a verdict on you. In a resilience plan, a growth mindset stance is one sentence you can say to yourself when something goes wrong, so the next move is to adjust the approach rather than to conclude you cannot do it.", "cite": "Yeager and Dweck, 2020"}, {"h": "Self-efficacy and confidence are built, not waited for", "body": "Self-efficacy is your belief that you can do a specific task, and Cassidy (2015) connects it directly to resilience in students. The useful point for a plan is that confidence is built rather than waited for: it grows through effort, practice, and small wins you can actually point to. So the plan names where your evidence of capability comes from, the past tasks you handled and the next small step you can take, instead of treating confidence as something you either have or lack.", "cite": "Cassidy, 2015"}, {"h": "Self-compassion when an effort fails", "body": "Self-compassion is treating yourself with the kindness, common humanity, and balanced perspective you would offer a friend in the same spot. Neff (2003) describes it as a healthier response to difficulty than harsh self-criticism. In a resilience plan it is the move that keeps you working after a setback: instead of a spiral of self-blame, you acknowledge the difficulty, remember that struggle is shared, and return to the task. It is not letting yourself off the hook; it is staying in the game.", "cite": "Neff, 2003"}, {"h": "The people and supports around you", "body": "Ungar (2011) describes resilience as a social ecology: keeping going is not only an individual trait but depends on the resources, relationships, and services available around a person. For a plan this is concrete. You name the instructors, peers, family, and academic support services you already draw on, and one you could add. Resilience here is partly about navigating to the support that exists, so the plan treats reaching out as part of the strategy rather than a last resort.", "cite": "Ungar, 2011"}], "terms": [{"term": "Personal resilience plan", "def": "a short, usable picture of how you keep going in your studies, assembled in your own words from across the course; a learning and resilience plan, not a treatment plan.", "cite": "Cassidy, 2015"}, {"term": "Growth mindset", "def": "the belief that ability can develop with effort and good strategies, so a setback reads as information about a strategy rather than a verdict on you.", "cite": "Yeager and Dweck, 2020"}, {"term": "Self-efficacy", "def": "your belief that you can do a specific task, built through effort, practice, and small wins rather than waited for; closely tied to resilience in students.", "cite": "Cassidy, 2015"}, {"term": "Self-compassion", "def": "treating yourself with the kindness, common humanity, and balanced perspective you would offer a friend, which keeps you working after a setback instead of stopping.", "cite": "Neff, 2003"}, {"term": "Social ecology of resilience", "def": "the idea that keeping going depends on the resources, relationships, and services around a person, not on individual will alone, so navigating to support is part of resilience.", "cite": "Ungar, 2011"}], "readings": [{"apa": "Cassidy, S. (2015). Resilience building in students: The role of academic self-efficacy. Frontiers in Psychology, 6, 1781. https://doi.org/10.3389/fpsyg.2015.01781", "scope": "Revisit from an earlier week", "id": "cassidy2015"}, {"apa": "Neff, K. D. (2003). Self-compassion: An alternative conceptualization of a healthy attitude toward oneself. Self and Identity, 2(2), 85-101. https://self-compassion.org/wp-content/uploads/publications/SCtheoryarticle.pdf", "scope": "Revisit from an earlier week", "id": "neff2003"}, {"apa": "Ungar, M. (2011). The social ecology of resilience: Addressing contextual and cultural ambiguity of a nascent construct. American Journal of Orthopsychiatry, 81(1), 1-17.", "scope": "Revisit from an earlier week", "id": "ungar2011"}, {"apa": "Yeager, D. S., & Dweck, C. S. (2020). What can be learned from growth mindset controversies? American Psychologist, 75(9), 1269-1284. https://doi.org/10.1037/amp0000794", "scope": "Revisit from an earlier week", "id": "yeager-dweck2020"}], "youcan": ["You can now gather ideas from across the course into one personal resilience plan written in your own words", "You can now name a growth mindset stance, a confidence source, a self-compassionate response, and your supports as parts of one plan", "You can now point to the people, services, and supports around you as part of how you keep going, not just what you do alone"], "reflectPrompt": "In a sentence or two: of everything this course covered, which one move do you most want to carry into next term, and what is the first place you would use it?", "activity": {"screen": "activity", "archetype": "capstone", "title": "Build your Personal Resilience Plan", "what": "You build a personal resilience plan one dimension at a time, deciding for each what it looks like for you, drawing each dimension from a different week of the course.", "why": "so you leave the course with one usable plan in your own words, instead of thirteen weeks of ideas left scattered, and so you can see how the pieces fit together into how you keep going.", "data": {"prompt": "Build your Personal Resilience Plan one dimension at a time. Mark each as you work it through.", "items": [{"label": "Your growth mindset stance", "prompt": "Write one sentence you can say to yourself when something in your studies does not go well, framing the setback as information about a strategy rather than a verdict on your ability. This is the line you reach for first.", "cite": "Yeager and Dweck, 2020"}, {"label": "Where your confidence comes from", "prompt": "Name two or three past tasks you actually handled and one small next step you can take this week. These are your evidence that capability is built through effort and small wins, not waited for.", "cite": "Cassidy, 2015"}, {"label": "Your self-compassionate response", "prompt": "Decide what you will do the next time an effort fails: how you will speak to yourself the way you would to a friend, acknowledge the difficulty, and return to the task instead of spiralling into self-blame.", "cite": "Neff, 2003"}, {"label": "Your people and supports", "prompt": "List the instructors, peers, family, and academic support services you already draw on, and add one support you could reach out to that you have not used yet. Treat reaching out as part of the plan.", "cite": "Ungar, 2011"}, {"label": "Your early-warning signs", "prompt": "Write down the signals that tell you it is time to use this plan: the patterns, in your work or your week, that usually show up before things get harder. Naming them early is what lets you act on supports while they still help.", "cite": "Ungar, 2011"}, {"label": "Your one next step", "prompt": "Pull the plan together into a single first move you will make this week, anchored to a goal you genuinely care about, so the plan starts as something you do rather than something you only wrote.", "cite": "Cassidy, 2015"}], "callout": "Your capstone: a personal resilience plan in your own words, built from the whole course."}}},
      14: {"deck": "", "time": "About 70 minutes (revisit, assemble, reflect)", "overview": "This final week is about transfer: what you take with you when the course ends. You will not read anything new. Instead you revisit three ideas you already met and ask what each one is good for outside this class. A learning process you can run on your own (Panadero, 2017), a view of resilience that depends on the settings and people around you (Ungar, 2011), and a practical-philosophy stance on living well day to day (Owen, 2023). The work is to name the few things that actually travel into your job, your next program, and the rest of your life, and to say how each one shows up there. Closure here means consolidating, not summarizing for a test. The point is to leave with a short, honest list of what you will keep using.", "purpose": "Week 14 closes the course by asking what transfers. It pulls together a transferable learning process, a context-aware view of resilience, and a practical-philosophy stance on well-being, then has you state how each one applies beyond the classroom. The aim is consolidation: a small set of takeaways you can name, defend, and actually carry into work and life, rather than a recap you forget after the term.", "outcomes": ["Name a learning process you can run on your own and explain where it applies outside this course (Panadero, 2017).", "Explain why what helps you cope depends on the settings and people around you, not only on you (Ungar, 2011).", "Describe a practical-philosophy stance on well-being that you can use in everyday life (Owen, 2023).", "Assemble a short list of course takeaways that travel into work and life, with a clear use for each (Panadero, 2017)."], "guiding": ["Which one or two things from this course would you still use a year from now (Panadero, 2017)?", "Where does the same setting that supports you in one place stop supporting you in another (Ungar, 2011)?", "What does living well look like for you on an ordinary day, not just a hard one (Owen, 2023)?", "If you had to hand someone three takeaways from this course, which would you keep and why (Panadero, 2017)?"], "checks": [{"t": "Transfer means using something you learned here in a new setting, which is the test of whether it was worth keeping", "look": "the activity and the Key Concepts"}, {"t": "A self-regulated learning process is portable: you can run plan, monitor, and adjust on any task, not just this course (Panadero, 2017)", "look": "the Panadero (2017) reading revisited and the Key Concepts"}, {"t": "Resilience is shaped by the resources and relationships in a setting, so what supports you can change when the setting changes (Ungar, 2011)", "look": "the Ungar (2011) reading revisited"}, {"t": "A practical-philosophy stance treats well-being as something you practise in ordinary life, not a state you wait to arrive (Owen, 2023)", "look": "the Owen (2023) reading revisited"}, {"t": "Closure is consolidation, not a recap for a test: the goal is a short, honest list of what you will keep using", "look": "the activity and the reflection prompt"}], "concepts": [{"h": "What travels: transfer as the real test", "body": "Transfer is using something learned in one place in a new place. It is the test of whether a course idea was worth keeping: an idea that only works inside this class did not really transfer. Panadero (2017) reviews self-regulated learning as a set of moves you direct yourself, which is exactly the kind of process built to travel. Asking what transfers turns closure from a recap into a decision about what you will actually carry forward.", "cite": "Panadero, 2017"}, {"h": "A portable learning process", "body": "Self-regulated learning is the process of planning a task, monitoring how it is going, and adjusting along the way. Panadero (2017) reviews several models that share this loop. The value at the end of the course is that the loop is portable: you can run it on a work project, a new program, or a personal goal, not only on graded coursework. That makes the process itself, more than any single topic, one of the most transferable things you take with you.", "cite": "Panadero, 2017"}, {"h": "Resilience travels with its context", "body": "Ungar (2011) describes resilience as a social ecology: what helps you cope depends on the resources, relationships, and meanings available in a setting, not only on individual strength. The practical lesson for transfer is that a strategy that worked in one environment may need different supports in another. When you change jobs, programs, or cities, part of staying resilient is reading the new setting and finding the supports it offers, rather than assuming the old ones come with you.", "cite": "Ungar, 2011"}, {"h": "Living well as a daily practice", "body": "Owen (2023) connects contemporary resilience psychology to ancient practical philosophy, where well-being is something you practise rather than a state you wait to reach. The stance that travels is treating living well as ordinary, repeatable action: how you respond to a setback, what you give attention to, how you steady yourself on a normal day. This is non-clinical and everyday. It is a way of carrying the course into life long after the readings and deadlines are gone.", "cite": "Owen, 2023"}], "terms": [{"term": "Transfer", "def": "using knowledge or a skill learned in one situation in a new and different situation; the test of whether a course idea is worth carrying beyond the class.", "cite": "Panadero, 2017"}, {"term": "Self-regulated learning", "def": "a process of directing your own learning by planning a task, monitoring how it is going, and adjusting; portable across courses, work, and personal goals.", "cite": "Panadero, 2017"}, {"term": "Social ecology of resilience", "def": "the view that coping depends on the resources, relationships, and meanings available in a setting, so what supports you can change when the setting changes.", "cite": "Ungar, 2011"}, {"term": "Practical philosophy of well-being", "def": "treating living well as an everyday, repeatable practice rather than a state you wait to arrive at; a non-clinical stance you can use day to day.", "cite": "Owen, 2023"}], "readings": [{"apa": "Panadero, E. (2017). A review of self-regulated learning: Six models and four directions for research. Frontiers in Psychology, 8, 422. https://doi.org/10.3389/fpsyg.2017.00422", "scope": "Revisit from an earlier week", "id": "panadero2017"}, {"apa": "Ungar, M. (2011). The social ecology of resilience: Addressing contextual and cultural ambiguity of a nascent construct. American Journal of Orthopsychiatry, 81(1), 1-17.", "scope": "Revisit from an earlier week", "id": "ungar2011"}, {"apa": "Owen, J. (2023). Psychological resilience: Connecting contemporary psychology to ancient practical philosophy.", "scope": "Revisit from an earlier week", "id": "owen2023"}], "youcan": ["You can now name a learning process you can run on your own and say where it applies outside this course", "You can now explain why what helps you cope depends on the settings and people around you, not only on you", "You can now assemble a short list of course takeaways that travel into work and life, with a clear use for each"], "reflectPrompt": "In a sentence or two: of everything in this course, what are the one or two things you will still be using a year from now, and where in your work or life will you use them?", "activity": {"screen": "activity", "archetype": "assemble", "title": "What travels with you", "what": "You assemble the transferable takeaways of the whole course into one picture, naming for each how it transfers to work or life beyond this class, then end on a short list you would actually keep using.", "why": "so closure becomes a decision about what you carry forward, not a recap you forget after the term: you leave with a small, honest set of takeaways and a clear use for each.", "data": {"goal": "Assemble the things from this course that actually travel with you into one working picture. For each takeaway, name how it transfers into your work, your next program, or your everyday life, so that by the end you have a short, honest list of what you will keep using rather than a recap you forget after the term.", "components": [{"label": "A learning process you can run yourself", "role": "transfers as a portable plan, monitor, and adjust loop you can use on a work project, a new program, or a personal goal, not only on graded coursework.", "cite": "Panadero, 2017"}, {"label": "A context-aware view of resilience", "role": "transfers as a habit of reading each new setting for the resources and relationships it offers, so that when the setting changes you look for new supports instead of assuming the old ones come with you.", "cite": "Ungar, 2011"}, {"label": "A practical-philosophy stance on well-being", "role": "transfers as an everyday, non-clinical practice of living well: how you respond to a setback and steady yourself on an ordinary day, long after the course ends.", "cite": "Owen, 2023"}, {"label": "Asking what actually transfers", "role": "transfers as a filter you can apply to any course or training: keep what works in a new place, and let go of what only worked inside the class.", "cite": "Panadero, 2017"}, {"label": "Naming the supports a setting gives you", "role": "transfers as a practical move when you start a job, program, or city: locate the people, resources, and meanings that help you cope in that specific place.", "cite": "Ungar, 2011"}, {"label": "A short list you will keep using", "role": "transfers as the consolidation itself: a small, defensible set of takeaways with a clear use for each, which is what closure is for.", "cite": "Owen, 2023"}]}}},
    }
  };
  function weekData(w) { var c = (D.course && D.course.code) || ''; return (WEEKPAGE[c] && WEEKPAGE[c][w]) || null; }
  function wkOptBtns(key) {
    var sel = state.wkCheck[key], opts = ['New to me', 'Getting it', 'I can'];
    return opts.map(function (o, i) { var on = sel === i; return '<button onclick="SOC.wkCheck(\'' + key + '\',' + i + ')" aria-pressed="' + on + '" class="wk-opt' + (on ? ' on' : '') + '">' + o + '</button>'; }).join('');
  }
  function wkOpts(key) { return '<div class="wk-opts" id="opts-' + key + '">' + wkOptBtns(key) + '</div>'; }
  // a check is {t: a key idea from the week, look?: where to revisit it}. The student rates their OWN grasp:
  // New to me (0) / Getting it (1) / I can (2). This monitors understanding; there is no right or wrong.
  function checkText(c) { return (typeof c === 'string') ? c : c.t; }
  function checkStat(w, phase, d) {
    var items = d.checks.map(function (c, i) {
      var r = state.wkCheck[phase + '|' + w + '|' + i];
      return { t: checkText(c), look: (typeof c === 'string') ? '' : (c.look || ''), r: (r == null ? null : r) };
    });
    var g = { can: 0, getting: 0, newto: 0 };
    items.forEach(function (x) { if (x.r === 2) g.can++; else if (x.r === 1) g.getting++; else if (x.r === 0) g.newto++; });
    return { items: items, total: d.checks.length, answered: items.filter(function (x) { return x.r != null; }).length, g: g };
  }
  function checkBand(g, n) {
    if (n && g.can === n) return { label: 'You can speak to all of this', color: '#2c6b3f', bg: '#E9EFE7' };
    if (n && g.can >= Math.ceil(n * 0.6)) return { label: 'Most of this is yours', color: '#1552D8', bg: '#E7EEFB' };
    if (n && (g.can + g.getting) >= Math.ceil(n * 0.6)) return { label: 'Coming together', color: '#8F5E0F', bg: '#F3ECE0' };
    return { label: 'Still early, and that is fine', color: '#6b7280', bg: '#F3F4F6' };
  }
  function checkBars(items) {
    return '<div style="display:flex;gap:4px;margin:10px 0" role="img" aria-label="your grasp across the ' + items.length + ' ideas">' + items.map(function (x) {
      var col = x.r === 2 ? '#2c6b3f' : (x.r === 1 ? '#C99A2E' : '#C7CDD6');
      return '<div style="flex:1;height:8px;border-radius:4px;background:' + col + '"></div>';
    }).join('') + '</div>';
  }
  function checkMeter(w, phase, d) {
    var s = checkStat(w, phase, d), L = ['New to me', 'Getting it', 'I can'];
    if (s.answered < s.total) return '<div style="margin-top:12px;font-size:.82rem;color:var(--ink-faint)">Rate all ' + s.total + ' to see where your understanding sits (' + s.answered + ' of ' + s.total + ' done). No grade, just your own read.</div>';
    var b = checkBand(s.g, s.total);
    var head = '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap"><div style="font-size:1.05rem;font-weight:700;color:' + b.color + '">' + b.label + '</div><div style="font-family:var(--mono);font-size:.78rem;color:' + b.color + '">' + (phase === 'pre' ? 'your starting read' : 'where you are now') + '</div></div>';
    if (phase === 'pre') {
      var profile = 'You can already speak to <b>' + s.g.can + ' of ' + s.total + '</b>, getting there on ' + s.g.getting + ', new to ' + s.g.newto + '. You will rate these again at the end, to see how far your understanding moves.';
      return '<div style="margin-top:14px;background:' + b.bg + ';border:1px solid ' + b.color + '40;border-radius:12px;padding:14px 16px">' + head + checkBars(s.items) + '<div style="font-size:.85rem;color:var(--ink-dim)">' + profile + '</div></div>';
    }
    var pre = checkStat(w, 'pre', d), moved = 0;
    var detail = s.items.map(function (x, i) {
      var pr = pre.items[i] ? pre.items[i].r : null, up = (pr != null && x.r != null && x.r > pr); if (up) moved++;
      var arrow = (pr == null) ? '' : (x.r > pr ? ' (moved up)' : (x.r < pr ? ' (moved back)' : ' (steady)'));
      var from = (pr == null ? 'not rated before' : L[pr]);
      var still = (x.r < 2) ? '<div style="font-size:.8rem;color:#8F5E0F;margin-top:2px">Still building. ' + esc(x.look || 'Revisit the readings and the activity for this idea.') + '</div>' : '';
      return '<div style="border-top:1px solid var(--border);padding:9px 0"><div style="font-size:.86rem;font-weight:600;color:var(--ink)">' + esc(x.t) + '</div><div style="font-size:.8rem;color:var(--ink-dim);margin-top:3px">' + from + ' &#8594; ' + L[x.r] + arrow + '</div>' + still + '</div>';
    }).join('');
    var movedLine = (pre.answered === pre.total) ? '<div style="font-size:.86rem;color:var(--ink-dim);margin:2px 0 6px">Your understanding moved forward on <b>' + moved + ' of ' + s.total + '</b> since the start.</div>' : '<div style="font-size:.82rem;color:var(--ink-faint);margin:2px 0 6px">Rate the same ideas under Before you begin to see your movement.</div>';
    return '<div style="margin-top:14px;background:' + b.bg + ';border:1px solid ' + b.color + '40;border-radius:12px;padding:14px 16px">' + head + checkBars(s.items) + movedLine + '<div style="margin-top:4px">' + detail + '</div></div>';
  }
  function refreshWeekChecks(w, d) {
    if (!d) return;
    ['pre', 'post'].forEach(function (ph) {
      d.checks.forEach(function (c, i) {
        var key = ph + '|' + w + '|' + i, el = document.getElementById('opts-' + key);
        if (el) el.innerHTML = wkOptBtns(key);
      });
      var m = document.getElementById('wkmeter-' + ph + '-' + w);
      if (m) m.innerHTML = checkMeter(w, ph, d);
    });
  }
  function wkChecks(w, phase, d) {
    var qs = d.checks.map(function (c, i) { return '<div class="wk-q">' + (i + 1) + '. ' + esc(checkText(c)) + wkOpts(phase + '|' + w + '|' + i) + '</div>'; }).join('');
    var label = phase === 'pre' ? 'Before' : 'Now';
    var reset = '<div class="wk-resetrow"><button onclick="SOC.wkClear(' + w + ',\'' + phase + '\')" class="wk-reset">Reset ' + label + ' ratings</button><span>Click a selected rating again to clear only that idea.</span></div>';
    return qs + reset + '<div id="wkmeter-' + phase + '-' + w + '">' + checkMeter(w, phase, d) + '</div>';
  }
  function sgSection(w) {
    var d = weekData(w);
    if (!d || !d.concepts || !d.concepts.length) return { html: '' };
    state.sgNotes = state.sgNotes || {}; state.sgShow = state.sgShow || {}; state.sgFlip = state.sgFlip || {}; state.sgTick = state.sgTick || {};
    /* 1. spaced-recall warm-up: two terms from earlier weeks */
    var warm = '';
    var priorTerms = [];
    for (var pw = w - 1; pw >= 1 && priorTerms.length < 2; pw--) {
      var pd = weekData(pw);
      if (pd && pd.terms && pd.terms.length) priorTerms.push({ t: pd.terms[(w + pw) % pd.terms.length], wk: pw });
    }
    if (priorTerms.length) {
      warm = '<div style="margin:0 0 18px"><h3 style="font-size:1rem;margin:0 0 8px">Still got these?</h3><p class="wk-hint" style="margin:0 0 10px">Two ideas from earlier weeks. Say the meaning out loud, then flip to check yourself.</p>'
        + priorTerms.map(function (x, xi) {
          var fk = 'sg' + w + '|warm|' + xi;
          var open = state.sgFlip[fk];
          return '<button onclick="SOC.sgFlip(\'' + fk + '\',' + w + ')" aria-expanded="' + !!open + '" style="display:block;width:100%;text-align:left;background:#fff;border:1.5px solid var(--border);border-radius:12px;padding:13px 16px;margin-bottom:8px;cursor:pointer">'
            + '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#6B7280">WEEK ' + x.wk + '</span>'
            + '<div style="font-weight:700;margin-top:2px">' + esc(x.t.term) + '</div>'
            + (open ? '<div style="margin-top:8px;font-size:.9rem;line-height:1.55;color:var(--ink-dim)">' + esc(x.t.def) + ' <span class="wk-cite">(' + esc(x.t.cite) + ')</span></div>' : '<div style="margin-top:6px;font-size:.8rem;color:var(--ink-faint)">Flip to check \u2192</div>')
            + '</button>';
        }).join('') + '</div>';
    }
    /* 2. explain-it-back tiles: one per key concept */
    var tiles = '<div style="margin:0 0 18px"><h3 style="font-size:1rem;margin:0 0 8px">Explain it back</h3><p class="wk-hint" style="margin:0 0 10px">The real test of understanding: explain each idea to a classmate who missed the week, in your own words. Then compare with the reading\'s version. Nothing you type is recorded or graded.</p>'
      + d.concepts.map(function (c, ci) {
        var nk = 'sg' + w + '|c|' + ci;
        var val = state.sgNotes[nk] || '';
        var show = state.sgShow[nk];
        return '<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:10px">'
          + '<div style="font-weight:700;margin-bottom:8px">' + esc(c.h) + '</div>'
          + '<textarea oninput="SOC.sgNote(\'' + nk + '\', this.value)" placeholder="Your explanation, one or two sentences..." style="width:100%;min-height:64px;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:.9rem;resize:vertical">' + esc(val) + '</textarea>'
          + '<button onclick="SOC.sgCompare(\'' + nk + '\',' + w + ')" style="margin-top:8px;border:1px solid var(--border);background:#fff;border-radius:8px;padding:6px 12px;font-size:.82rem;cursor:pointer">' + (show ? 'Hide the reading\'s version' : 'Compare with the reading') + '</button>'
          + (show ? '<div style="margin-top:9px;padding:10px 13px;border-radius:9px;background:#FBF8F3;border:1px solid var(--border);font-size:.875rem;line-height:1.55">' + esc(c.body) + ' <span class="wk-cite">(' + esc(c.cite) + ')</span></div>' : '')
          + '</div>';
      }).join('') + '</div>';
    /* 3. the question ladder: guiding questions as rungs, recall -> connect -> apply */
    var rungNames = ['Recall', 'Connect', 'Apply'];
    var gqs = (d.guiding || []).slice(0, 3);
    var ladder = '';
    if (gqs.length) {
      var rows = '';
      for (var ri = 0; ri < gqs.length; ri++) {
        var rk = 'sg' + w + '|r|' + ri;
        var prevDone = ri === 0 || (state.sgTick[('sg' + w + '|r|' + (ri - 1))] && (state.sgNotes[('sg' + w + '|r|' + (ri - 1))] || '').length >= 20);
        if (!prevDone) { rows += '<div style="border:1.5px dashed var(--border);border-radius:12px;padding:13px 16px;margin-bottom:10px;color:var(--ink-faint);font-size:.88rem">Rung ' + (ri + 1) + ' \u00B7 ' + rungNames[Math.min(ri, 2)] + ' unlocks when you finish the rung above.</div>'; continue; }
        var rv = state.sgNotes[rk] || '';
        var ticked = state.sgTick[rk] && rv.length >= 20;
        rows += '<div style="background:#fff;border:1.5px solid ' + (ticked ? '#50694C' : 'var(--border)') + ';border-radius:12px;padding:14px 16px;margin-bottom:10px">'
          + '<div class="mono" style="font-size:.62rem;letter-spacing:.06em;color:' + (ticked ? '#2c6b3f' : '#6B7280') + '">RUNG ' + (ri + 1) + ' \u00B7 ' + rungNames[Math.min(ri, 2)].toUpperCase() + (ticked ? ' \u2713' : '') + '</div>'
          + '<div style="font-weight:600;margin:5px 0 8px;line-height:1.5">' + esc(gqs[ri]) + '</div>'
          + '<textarea oninput="SOC.sgNote(\'' + rk + '\', this.value)" placeholder="Work it out here..." style="width:100%;min-height:56px;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:.9rem;resize:vertical">' + esc(rv) + '</textarea>'
          + (ticked ? '' : '<button onclick="SOC.sgTickRung(\'' + rk + '\',' + w + ')" style="margin-top:8px;border:1px solid var(--border);background:#fff;border-radius:8px;padding:6px 12px;font-size:.82rem;cursor:pointer">Done, next rung</button>')
          + '</div>';
      }
      var lastRk = 'sg' + w + '|r|' + (gqs.length - 1);
      var ladderDone = state.sgTick[lastRk] && (state.sgNotes[lastRk] || '').length >= 20;
      ladder = '<div><h3 style="font-size:1rem;margin:0 0 8px">The question ladder</h3><p class="wk-hint" style="margin:0 0 10px">This week\'s guiding questions, one rung at a time: remember it, connect it, apply it to your own world. Twenty words or more moves you up.</p>' + rows
        + (ladderDone ? '<div style="background:#E9EFE7;border:1px solid #9CC4A8;border-radius:12px;padding:13px 16px;font-size:.92rem;font-weight:600;color:#2c3b29">You have worked the whole ladder. You are ready for the Knowledge Check below. <a href="#wk-kc" style="color:#2c6b3f">Go to it \u2193</a></div>' : '')
        + '</div>';
    }
    var html = '<section id="wk-sg" class="node"><h2 class="wk-sec">Study Guide <span class="mono" style="font-size:.62rem;letter-spacing:.06em;color:#2c6b3f;background:#E9EFE7;border:1px solid #9CC4A8;border-radius:999px;padding:3px 10px;margin-left:10px;vertical-align:middle">NOT GRADED</span></h2>'
      + '<p class="wk-hint">Your rehearsal space before the Knowledge Check. Nothing here is recorded or graded; it lives only in your browser.</p>'
      + warm + tiles + ladder + '</section>';
    return { html: html };
  }
  function kcHashKey(s) { var h = 0, str = String(s || ''); for (var i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; } return 'q' + (h >>> 0).toString(36); }
  function kcSection(w, reviewOnly) {
    var kcVer = (state.kcVersion && state.kcVersion[w]) || 0;   /* 0 = Set A, 1 = Set B, 2 = Set C */
    var isC = (kcVer === 2);
    var revKey = w + '|' + kcVer;
    var kcTier = kcVer + 1;
    var KB = window.PSY355_KC || {};
    var hist = state.kcHist || {};
    function bank(week) { return KB[week] || []; }
    function isShort(m) { return !!(m && m.type === 'short'); }
    function isMatch(m) { return !!(m && m.kind === 'match'); }
    function isScenario(m) { return !!(m && m.kind === 'scenario'); }
    /* Sets A and B: plain multiple choice, from the readings and the plain-MC bank */
    function mcPool(week) {
      var pool = [];
      recordsForWeek(week).forEach(function (r) { if (MC[r.id]) pool = pool.concat(MC[r.id]); });
      pool = pool.concat(bank(week).filter(function (m) { return !m.kind && !isShort(m); }));
      pool = pool.filter(function (m) { return (m.options || []).length >= 4; });
      pool.sort(function (a, b) { return Math.abs((a.diff || 2) - kcTier) - Math.abs((b.diff || 2) - kcTier); });
      return pool;
    }
    /* Set C: something different, scenario + matching (both auto-scored) */
    function scoredCPool(week) { return bank(week).filter(function (m) { return (isScenario(m) || isMatch(m)) && (m.options || []).length >= 4; }); }
    function shortCPool(week) { return bank(week).filter(isShort); }

    var kcItems = [], kcSeen = {}, shortItems = [];
    if (isC) {
      var cp = scoredCPool(w);
      for (var ci = 0; ci < cp.length && kcItems.length < 15; ci++) { if (!kcSeen[cp[ci].q]) { kcSeen[cp[ci].q] = 1; kcItems.push(cp[ci]); } }
      shortItems = shortCPool(w).slice(0, 3);
    } else {
      var kcOwnPool = mcPool(w);
      /* adaptive review: gather up to two per earlier week, weighting ideas missed before to the front */
      var reviewPool = [];
      for (var pw = w - 1; pw >= 1; pw--) {
        var pool = mcPool(pw).slice();
        pool.sort(function (a, b) { var ha = hist[kcHashKey(a.q)], hb = hist[kcHashKey(b.q)]; var wa = (ha && ha.n && ha.right < ha.n) ? 0 : 1, wb = (hb && hb.n && hb.right < hb.n) ? 0 : 1; return wa - wb; });
        var took = 0, rseen = {};
        for (var pi = 0; pi < pool.length && took < 2; pi++) {
          var cand = pool[pi];
          if (!rseen[cand.q]) { rseen[cand.q] = 1; took++; reviewPool.push({ q: cand.q, options: cand.options, answer: cand.answer, why: cand.why, whyWrong: cand.whyWrong, diff: cand.diff, rw: pw }); }
        }
      }
      var reserve = Math.min(5, reviewPool.length);
      var ownTarget = Math.min(kcOwnPool.length, 15 - reserve);
      for (var oi2 = 0; oi2 < kcOwnPool.length && kcItems.length < ownTarget; oi2++) { var own = kcOwnPool[(oi2 + kcVer * 4) % kcOwnPool.length]; if (!kcSeen[own.q]) { kcSeen[own.q] = 1; kcItems.push(own); } }
      for (var ri = 0; ri < reviewPool.length && kcItems.length < 15; ri++) { if (!kcSeen[reviewPool[ri].q]) { kcSeen[reviewPool[ri].q] = 1; kcItems.push(reviewPool[ri]); } }
    }

    if (!kcItems.length && !shortItems.length) return { html: '', items: [] };

    /* score + calibration pass */
    var kAns = 0, kCor = 0, nT = 0, nC = 0, rT = 0, rC = 0, missWk = {};
    var mastered = 0, fragile = 0, misc = [], edge = 0, confSet = 0;
    kcItems.forEach(function (m, mi) {
      var key = 'wk' + w + '|kc' + kcVer + '|' + mi;
      var sel = state.mcSel[key];
      if (sel !== undefined && sel !== null) {
        kAns++; var right = (sel === m.answer); if (right) kCor++;
        if (m.rw) { rT++; if (right) rC++; else missWk[m.rw] = 1; }
        else { nT++; if (right) nC++; }
        var conf = state.mcConf && state.mcConf[key];
        if (conf) {
          confSet++;
          if (right && conf === 'sure') mastered++;
          else if (right && conf !== 'sure') fragile++;
          else if (!right && conf === 'sure') misc.push({ q: m.q, rw: m.rw, mi: mi });
          else edge++;
        }
      }
    });
    var allAns = kcItems.length ? (kAns === kcItems.length) : false;
    var reveal = allAns && !!(state.kcReveal && state.kcReveal[revKey]);
    /* record outcomes to the on-device history once a set is fully answered */
    if (reveal) {
      state.kcHist = state.kcHist || {};
      kcItems.forEach(function (m, mi) {
        var sel = state.mcSel['wk' + w + '|kc' + kcVer + '|' + mi]; if (sel === undefined || sel === null) return;
        var hk = kcHashKey(m.q), h = state.kcHist[hk] || { n: 0, right: 0 };
        if (!h._seen || h._seen !== (kcVer + 1)) { h.n = (h.n || 0) + 1; if (sel === m.answer) h.right = (h.right || 0) + 1; h._seen = kcVer + 1; state.kcHist[hk] = h; }
      });
      persist();
    }

    var lastGroup = null;
    var kRows = kcItems.map(function (m, mi) {
      var mkey = 'wk' + w + '|kc' + kcVer + '|' + mi;
      var sel = state.mcSel[mkey];
      var done = (sel !== undefined && sel !== null);
      var conf = state.mcConf && state.mcConf[mkey];
      var groupHead = '';
      if (isMatch(m)) { if (m.mgroup !== lastGroup) { lastGroup = m.mgroup; groupHead = '<p style="margin:6px 0 9px;font-size:.92rem;font-weight:600;color:var(--ink)">' + esc(m.mlabel || 'Match each item to the best fit.') + '</p>'; } }
      else { lastGroup = null; }

      /* matching row: compact dropdown, same scoring key as an MC item */
      if (isMatch(m)) {
        var optHtml = '<option value="-1"' + (!done ? ' selected' : '') + '>Choose...</option>' + (m.options || []).map(function (o, oi) { return '<option value="' + oi + '"' + (sel === oi ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('');
        var rowMark = '', bd = 'var(--border)';
        if (reveal) { if (sel === m.answer) { rowMark = '<span style="color:#2c6b3f;font-weight:700;margin-left:8px">✓</span>'; bd = '#50694C'; } else { rowMark = '<span style="color:var(--red);font-weight:600;margin-left:8px;font-size:.85rem">✗ ' + esc(m.options[m.answer] || '') + '</span>'; bd = 'var(--red)'; } }
        var whyM = (reveal && sel !== m.answer && m.why) ? '<div style="margin:7px 0 0;font-size:.83rem;color:var(--ink-dim);line-height:1.5">' + esc(m.why) + '</div>' : '';
        return groupHead + '<div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 15px;margin-bottom:9px"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span style="font-size:.92rem;font-weight:600;flex:1;min-width:130px">' + esc(m.q) + '</span><select onchange="SOC.mcPickSel(\'' + mkey + '\',this.value)" aria-label="Match for ' + esc(m.q) + '" style="font:inherit;font-size:.88rem;padding:7px 10px;border:1.5px solid ' + bd + ';border-radius:8px;background:#fff;color:var(--ink);max-width:100%">' + optHtml + '</select>' + rowMark + '</div>' + whyM + '</div>';
      }

      /* standard / scenario multiple choice */
      var opts = (m.options || []).map(function (o, oi) {
        var isSel = (sel === oi), isCor = (oi === m.answer);
        var bg = '#fff', bd = 'var(--border)', col = 'var(--ink)', mark = '';
        if (reveal && isCor) { bg = '#E9EFE7'; bd = '#50694C'; col = '#2c3b29'; mark = ' ✓'; }
        else if (reveal && isSel && !isCor) { bg = '#F6E3E1'; bd = 'var(--red)'; col = '#8f1b12'; mark = ' ✗'; }
        else if (isSel) { bg = '#FDF0EE'; bd = 'var(--red)'; col = 'var(--ink)'; mark = ' ●'; }
        return '<button onclick="SOC.mcPick(\'' + mkey + '\',' + oi + ')" aria-pressed="' + isSel + '" style="display:block;width:100%;text-align:left;border:1.5px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.9rem;cursor:pointer">' + esc(o) + mark + '</button>';
      }).join('');
      /* confidence prompt appears once answered, before the whole set is revealed */
      var confRow = (done && !reveal) ? '<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:2px 0 2px"><span style="font-size:.78rem;color:var(--ink-faint)">How sure?</span>' + [['sure', 'Sure'], ['mid', 'Think so'], ['guess', 'Guessing']].map(function (c) { var on = conf === c[0]; return '<button onclick="SOC.mcConf(\'' + mkey + '\',\'' + c[0] + '\',' + w + ')" aria-pressed="' + on + '" style="border:1px solid ' + (on ? 'var(--red)' : 'var(--border)') + ';background:' + (on ? '#FDF0EE' : '#fff') + ';color:' + (on ? 'var(--red)' : 'var(--ink-dim)') + ';border-radius:999px;padding:4px 11px;font-size:.76rem;font-weight:' + (on ? '700' : '500') + ';cursor:pointer">' + c[1] + '</button>'; }).join('') + '</div>' : '';
      /* diagnostic on reveal: distractor-specific note for a wrong pick, else the general why */
      var diag = '';
      if (reveal) {
        var wrongNote = (sel !== m.answer && m.whyWrong && m.whyWrong[sel]) ? m.whyWrong[sel] : '';
        var body = wrongNote || m.why;
        if (body) { var okBg = (sel === m.answer); var confTag = (conf === 'sure' && sel !== m.answer) ? '<div style="font-size:.72rem;font-weight:700;letter-spacing:.03em;color:#8f1b12;margin-bottom:5px">A CONFIDENT MISS, WORTH UNLEARNING</div>' : ''; diag = '<div style="margin:9px 0 0;padding:10px 13px;border-radius:9px;background:' + (okBg ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (okBg ? '#9CC4A8' : '#E5B8B0') + ';font-size:.875rem;line-height:1.55">' + confTag + esc(body) + '</div>'; }
      }
      var revTag = m.rw ? '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#6B7280;background:#EEF1F5;border-radius:999px;padding:2px 8px;margin-left:8px;vertical-align:middle">REVIEW · WEEK ' + m.rw + '</span>' : (isScenario(m) ? '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#8a5a1a;background:#FBEFD9;border-radius:999px;padding:2px 8px;margin-left:8px;vertical-align:middle">SCENARIO</span>' : '');
      return groupHead + '<div id="kcq-' + mkey.replace(/[^a-zA-Z0-9]/g, '-') + '" style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600">' + (mi + 1) + '. ' + esc(m.q) + revTag + '</p>' + opts + confRow + diag + '</div>';
    }).join('');

    /* Set C short-answer: write first, then reveal a model to compare against, then self-rate */
    var shortHtml = '';
    if (shortItems.length) {
      var srows = shortItems.map(function (m, si) {
        var skey = 'wk' + w + '|kc' + kcVer + '|short' + si;
        var txt = (state.kcShort && state.kcShort[skey]) || '';
        var shown = state.kcShortShown && state.kcShortShown[skey];
        var rated = state.kcShortRate && state.kcShortRate[skey];
        var model = shown
          ? '<div style="background:#15171C;color:#fff;border-radius:12px;padding:15px 18px;margin-top:11px"><div class="mono" style="font-size:.68rem;letter-spacing:.05em;color:#9aa3b2;margin-bottom:8px">A MODEL ANSWER</div><p style="margin:0;font-size:.92rem;line-height:1.6;color:rgba(255,255,255,.94)">' + esc(m.model || '') + '</p><p style="font-size:.8rem;margin:9px 0 0;color:#9aa3b2">One strong answer. Compare it with yours, do not copy it. How close were you?</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:11px">' + [['got', 'I had this'], ['part', 'Partly there'], ['not', 'Not yet']].map(function (r) { var on = rated === r[0]; return '<button onclick="SOC.kcShortRate(\'' + skey + '\',\'' + r[0] + '\',' + w + ')" aria-pressed="' + on + '" style="border:1px solid ' + (on ? '#fff' : 'rgba(255,255,255,.35)') + ';background:' + (on ? '#fff' : 'transparent') + ';color:' + (on ? '#15171C' : '#fff') + ';border-radius:999px;padding:6px 13px;font-size:.82rem;font-weight:600;cursor:pointer">' + r[1] + '</button>'; }).join('') + '</div></div>'
          : '<button onclick="SOC.kcShortReveal(\'' + skey + '\',' + w + ')" style="margin-top:10px;background:none;border:1px solid #15171C;color:#15171C;border-radius:9px;padding:9px 15px;font-size:.88rem;font-weight:600;cursor:pointer">Reveal a model answer</button>';
        var ratedLine = (shown && rated) ? '<p style="margin:9px 0 0;font-size:.82rem;color:var(--ink-faint)">You rated yourself: ' + (rated === 'got' ? 'I had this.' : rated === 'part' ? 'Partly there.' : 'Not yet, and that is fine, that is what the reading is for.') + '</p>' : '';
        return '<div style="background:#F7F8FA;border:1px solid var(--border);border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600">' + esc(m.q) + '</p><textarea oninput="SOC.kcShortText(\'' + skey + '\',this.value)" aria-label="Your answer" class="wk-ta" placeholder="Write your answer, then reveal a model to compare..." style="min-height:80px">' + esc(txt) + '</textarea>' + model + ratedLine + '</div>';
      }).join('');
      shortHtml = '<div style="margin-top:6px"><h3 style="margin:14px 0 4px;font-size:1.05rem">Reflect and compare</h3><p class="wk-hint" style="margin-bottom:11px">Not scored, nothing recorded. Write your own answer first, then reveal a model answer and rate how close you were. The point is the comparison, not a mark.</p>' + srows + '</div>';
    }

    var setMeta = [['A', 'multiple choice'], ['B', 'more multiple choice'], ['C', 'applied and different']];
    var vers = [0, 1, 2].map(function (v) { var on = (v === kcVer); return '<button onclick="SOC.kcVer(' + w + ',' + v + ')" aria-pressed="' + on + '" style="border:1px solid ' + (on ? 'var(--red)' : 'var(--border)') + ';background:' + (on ? '#FDF0EE' : '#fff') + ';color:' + (on ? 'var(--red)' : 'var(--ink)') + ';font-weight:' + (on ? '700' : '500') + ';border-radius:999px;padding:6px 14px;font-size:.82rem;cursor:pointer">Set ' + setMeta[v][0] + '</button>'; }).join('');
    var setNote = '<p class="wk-hint" style="margin:0 0 12px;font-size:.82rem">Set ' + setMeta[kcVer][0] + ': ' + setMeta[kcVer][1] + '. ' + (isC ? 'Scenarios and matching are scored; the short written reflections at the end are for you to compare against a model.' : 'Fresh multiple choice, ' + (kcVer === 0 ? 'foundational' : 'a step harder') + ', from this week plus a short review of earlier weeks that leans on ideas you have missed before.') + '</p>';
    var retake = kAns ? '<button onclick="SOC.kcClear(' + w + ',' + kcVer + ')" style="border:1px solid var(--border);background:#fff;border-radius:999px;padding:6px 14px;font-size:.82rem;cursor:pointer">Clear and retake this set</button>' : '';
    var progress = (kcItems.length && !allAns) ? '<p class="wk-hint" style="margin:0 0 12px">' + kAns + ' of ' + kcItems.length + ' answered. Mark how sure you were as you go.</p>' : '';
    var revealCta = (allAns && !reveal) ? '<button onclick="SOC.kcShow(' + w + ')" class="wk-cta" style="margin:2px 0 14px">See how I did →</button>' : '';

    var summary = '';
    if (reveal && kcItems.length) {
      var pct = Math.round(100 * kCor / kcItems.length);
      var head, body;
      if (pct >= 93) { head = 'Command'; body = 'You are not just recognising these ideas, you can tell them apart under pressure, which is exactly what the course asks of you.'; }
      else if (pct >= 80) { head = 'Solid'; body = 'You have the spine of this material. The few you missed are explained below; read those once more and you are at full strength.'; }
      else if (pct >= 60) { head = 'Developing'; body = 'A real start. You are recognising the ideas but some are still blurring together. Read the explanations below, then take another set fresh.'; }
      else { head = 'Starting point'; body = 'This tells you where you are starting from, and that is useful information, not a judgment. Work back through this week\'s key concepts and readings, then take another set and watch the difference.'; }
      /* calibration read-out leads with confident misses */
      var calib = '';
      if (confSet) {
        var mlist = misc.map(function (x) { return '<li style="margin:3px 0;font-size:.88rem;line-height:1.5;color:#f3d3ce">' + esc(x.q) + (x.rw ? ' <span style="color:#9aa3b2">(review, Week ' + x.rw + ')</span>' : '') + '</li>'; }).join('');
        calib = '<div style="margin:12px 0 0;padding-top:12px;border-top:1px solid rgba(255,255,255,.16)">'
          + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:#9aa3af;margin-bottom:7px">HOW SURE YOU WERE vs HOW IT WENT</div>'
          + '<div style="display:flex;gap:14px;flex-wrap:wrap;font-size:.85rem">'
          + '<span style="color:#bfe3c8">● Mastered ' + mastered + '</span>'
          + '<span style="color:#e7dca6">● Right but unsure ' + fragile + '</span>'
          + '<span style="color:#f3b1a8">● Confident miss ' + misc.length + '</span>'
          + '<span style="color:#c8cdd6">● Still finding it ' + edge + '</span></div>'
          + (misc.length ? '<p style="margin:10px 0 4px;font-size:.88rem;line-height:1.55;color:#f3d3ce">Start here. You were sure on these and they did not land, a confident wrong belief is the one that costs you later:</p><ul style="margin:0;padding-left:18px">' + mlist + '</ul>' : (mastered ? '<p style="margin:9px 0 0;font-size:.88rem;color:#bfe3c8">No confident misses, what you are sure of, you have right. That is the calibration you want.</p>' : ''))
          + (fragile ? '<p style="margin:9px 0 0;font-size:.85rem;color:#e7dca6">' + fragile + ' you got right but were not sure about. You know more than you trust; name why the answer is right and it becomes solid.</p>' : '')
          + '</div>';
      }
      var split = '';
      if (nT && rT) split = '<p style="margin:8px 0 0;font-size:.9rem;line-height:1.55">On this week\'s new ideas you got ' + nC + ' of ' + nT + '. On review from earlier weeks you got ' + rC + ' of ' + rT + '.' + (rC < rT ? ' Earlier material fades fastest; a short revisit brings it back.' : ' Your earlier weeks are holding, which is the whole point of the review.') + '</p>';
      var revisit = Object.keys(missWk).map(function (n) { return '<button onclick="SOC.station(' + n + ')" style="border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;border-radius:8px;padding:7px 13px;font-size:.85rem;margin:10px 8px 0 0;cursor:pointer">Revisit Week ' + n + ' →</button>'; }).join('');
      var refLine = shortItems.length ? '<p style="margin:8px 0 0;font-size:.88rem;color:#e5e7eb">Then there ' + (shortItems.length === 1 ? 'is 1 short reflection' : 'are ' + shortItems.length + ' short reflections') + ' below to compare against a model, not scored.</p>' : '';
      summary = '<div style="margin:6px 0 14px;background:#15171C;color:#fff;border-radius:12px;padding:17px 20px">'
        + '<div class="mono" style="font-size:.66rem;letter-spacing:.08em;color:#9aa3af">WHERE YOU STAND · ' + kCor + ' OF ' + kcItems.length + '</div>'
        + '<div style="font-size:1.05rem;font-weight:700;margin:6px 0 4px">' + head + '</div>'
        + '<p style="margin:0;font-size:.9rem;line-height:1.6;color:#e5e7eb">' + body + '</p>'
        + (split ? '<div style="color:#e5e7eb">' + split + '</div>' : '')
        + calib + refLine + (revisit ? '<div>' + revisit + '</div>' : '')
        + '</div>';
    }

    var badge = '<span class="mono" style="font-size:.62rem;letter-spacing:.06em;color:#2c6b3f;background:#E9EFE7;border:1px solid #9CC4A8;border-radius:999px;padding:3px 10px;margin-left:10px;vertical-align:middle">NOT GRADED</span>';
    var kc = '<section id="wk-kc" class="node"><h2 class="wk-sec">Knowledge Check ' + badge + '</h2>'
      + '<p class="wk-hint">Nothing here counts toward your grade and nothing is recorded. Three sets: Set A and Set B are multiple choice; Set C brings scenarios, matching, and short written reflections. Answer, say how sure you were, and the check shows you not just what you got right but where a confident answer was actually wrong, the thing most worth fixing.</p>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px">' + vers + retake + '</div>'
      + setNote + progress + revealCta + summary + kRows + shortHtml + '</section>';
    return { html: kc, items: kcItems.concat(shortItems) };
  }

  function weekHero(w, d, opt) {
    d = d || {};
    opt = opt || {};
    var route = opt.route || ['Read', 'See', 'Try', 'Reflect'];
    var routeHtml = route.map(function (x, i) { return '<span><b>' + (i + 1) + '</b>' + esc(x) + '</span>'; }).join('');
    var startPart = opt.startPart || 'pre';
    var startLabel = opt.startLabel || 'Start this week';
    var sub = opt.sub || d.overview || '';
    var q = opt.question === false ? '' : (opt.question || journeyQ(w));
    return '<section id="wk-ov" class="node jhero jfade wk-hero2">'
      + '<div class="wk-hero-main"><div class="mono wk-hero-kicker">WEEK ' + w + ' | ' + esc(weekDate(w)) + ' | ' + esc(opt.label || 'WEEKLY MODULE') + '</div>'
      + '<h1>' + esc(opt.title || weekTitle(w)) + '</h1>'
      + (sub ? '<p>' + esc(sub) + '</p>' : '')
      + (q ? '<div class="wk-hero-question">' + esc(q) + '</div>' : '')
      + '<div class="wk-hero-actions"><button type="button" onclick="SOC.jumpWeek(' + w + ',\'' + startPart + '\')">' + esc(startLabel) + '</button><span>' + ic('clock', 13) + ' ' + esc((d.time || opt.time || 'Work at your own pace')) + '</span></div></div>'
      + '<aside class="wk-hero-route" aria-label="Weekly route"><div class="mono">MODULE ROUTE</div>' + routeHtml + '</aside>'
      + '</section>';
  }

  function weekPage(w, d) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var sec = function (id, title, inner) { return '<section id="wk-' + id + '" class="node"><h2 class="wk-sec">' + esc(title) + '</h2>' + inner + '</section>'; };
    var hero = weekHero(w, d, { startPart: 'pre', startLabel: 'Start this week', label: 'WEEKLY MODULE' });
    var pre = sec('pre', 'Before you begin', '<p class="wk-hint">A quick read on where your understanding sits right now, no grade. Rate each idea, then meet them again at the end to see how far your thinking moves.</p>' + wkChecks(w, 'pre', d));
    var purpose = '<section id="wk-learn" class="node"><h2 class="wk-sec">Purpose</h2><p style="margin:0">' + esc(d.purpose) + '</p></section>';
    var outcomes = sec('out', 'Learning outcomes', '<p style="margin:0 0 8px;font-size:.9rem">By the end of this week, you will be able to:</p>' + d.outcomes.map(function (o) { return '<div class="wk-oc"><span class="b"></span>' + esc(o) + '</div>'; }).join(''));
    var guiding = sec('gq', 'Guiding questions', '<p style="margin:0 0 8px;font-size:.9rem">Hold these in mind as you work:</p>' + d.guiding.map(function (q) { return '<div class="wk-gq"><span class="q">+</span>' + esc(q) + '</div>'; }).join(''));
    var programLens = lensProgramSection(w, d);
    var programCase = lensCaseStudySection(w, d);
    var concepts = sec('con', 'Key concepts', d.concepts.map(function (c) { return '<div class="wk-concept"><h3>' + esc(c.h) + '</h3><p>' + esc(c.body) + ' <span class="wk-cite">(' + esc(c.cite) + ')</span></p></div>'; }).join(''));
    var terms = sec('term', 'Key terms', d.terms.map(function (t) { return '<div class="wk-term"><b>' + esc(t.term) + '</b>: ' + esc(t.def) + ' <span class="wk-cite">(' + esc(t.cite) + ')</span></div>'; }).join(''));
    var readings = sec('read', 'Readings', d.readings.map(function (r) { var resolves = (typeof rec === 'function') && r.id && rec(r.id); var tail = resolves ? '<button onclick="SOC.read(\'' + r.id + '\')" class="wk-scope">' + esc(r.scope || 'Open the reading') + ' &#8599;</button>' : (r.scope ? '<div class="wk-scope" style="background:none;border:none;color:var(--ink-faint);padding:6px 0;cursor:default">' + esc(r.scope) + '</div>' : ''); return '<div class="wk-read"><div class="ref">' + r.apa + '</div>' + tail + '</div>'; }).join(''));
    var watch = d.deck ? '<section id="wk-watch" class="node"><h2 class="wk-sec">Walkthrough</h2><p style="margin:0 0 12px;font-size:.92rem">Watch this week\'s narrated walkthrough.</p><div class="wk-deck"><iframe src="./walkthroughs/' + d.deck + '/index.html?v=5" title="Week ' + w + ' walkthrough" loading="lazy" allowfullscreen></iframe></div><a href="./walkthroughs/' + d.deck + '/index.html?v=5" target="_blank" rel="noopener" class="wk-fs">Open the walkthrough fullscreen &#8599;</a></section>' : '';
    var act = '<section id="wk-do" class="node interactive"><h2 class="wk-sec">The activity: ' + esc(d.activity.title) + '</h2><div class="wk-whatwhy"><b>What this is:</b> ' + esc(d.activity.what) + '<br><br><b>Why you are doing it:</b> ' + esc(d.activity.why) + '</div>' + lensActivityBlock(w, d.activity, false) + '<button onclick="SOC.startActivity(\'' + d.activity.screen + '\',' + w + ')" class="wk-cta">Start the activity' + ic('chevron', 17, 2.4) + '</button><p style="margin:10px 0 0;font-size:.74rem;color:var(--ink-faint)">Every activity works the same way: predict, then do it, then see the result, then name it with the reading.</p></section>';
    var reflect = '<section id="wk-reflect" class="node"><h2 class="wk-sec">Reflection</h2>'
      + '<div class="wk-ocheck"><div class="mono" style="font-size:.78rem;font-weight:700;color:var(--ink-faint);margin-bottom:7px">YOU CAN NOW</div>' + d.youcan.map(function (y) { return '<div class="wk-row"><span class="t">' + ic('check', 14, 2.6) + '</span>' + esc(y) + '</div>'; }).join('') + '</div>'
      + '<h3 style="margin:16px 0 4px">Now, what do you think?</h3><p class="wk-hint" style="margin-bottom:8px">The same ideas from the start. Rate them again to see where your understanding sits now, and how far it moved.</p>' + wkChecks(w, 'post', d)
      + '<h3 style="margin:16px 0 4px">Your reflection</h3><p style="margin:0 0 8px;font-size:.95rem">' + esc(d.reflectPrompt) + '</p>'
      + '<textarea oninput="SOC.wkReflect(' + w + ',this.value)" class="wk-ta" placeholder="Your reflection...">' + esc(state.wkReflect[w] || '') + '</textarea>'
      + '</section>';
    var notes = '<section id="wk-notes" class="node"><h2 class="wk-sec">Generate Your Weekly Notes</h2>'
      + '<div class="wk-savebox" style="margin-top:0"><h3>Your organized Week ' + w + ' record</h3><p style="margin:0 0 4px;font-size:.9rem">This makes one Word file (.docx) on Seneca letterhead. It organizes your private weekly check answers, activity summary, and reflection for review before Blackboard work.</p><ul><li>your before-and-after answers to the five check questions</li><li>a summary of what you did in this week\'s activity</li><li>your answer to the reflection question</li></ul><button onclick="SOC.saveWeek(' + w + ')" class="wk-save">Generate Your Weekly Notes</button></div>'
      + '</section>';
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var sg = sgSection(w).html;
    var kcR = kcSection(w);
    var kc = kcR.html, kcItems = kcR.items;
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Overview'], ['pre', 'Before you begin'], ['learn', 'Purpose'], ['out', 'Learning outcomes'], ['gq', 'Guiding questions']].concat(programLens ? [['lens', 'For your program']] : []).concat([['con', 'Key concepts'], ['term', 'Key terms'], ['read', 'Readings']]).concat(d.deck ? [['watch', 'Walkthrough']] : []).concat(programCase ? [['case', 'Case study']] : []).concat([['do', 'The activity'], ['reflect', 'Reflection']]).concat(sg ? [['sg', 'Study Guide']] : []).concat(kcItems.length ? [['kc', 'Knowledge Check']] : []).concat([['notes', 'Generate notes']]).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' ' + esc(d.time.split('(')[0].trim()) + '</div></div></aside>';
    return '<div class="rise">' + hero + '<div class="wk-grid"><main>' + pre + purpose + outcomes + guiding + programLens + concepts + terms + readings + watch + programCase + act + reflect + sg + kc + notes + navRow + '</main>' + rail + '</div></div>';
  }
  /* ---------- generic week activities: match / scenario / toggle / assemble / lab ---------- */
  function actCard(inner) { return '<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin:0 0 12px">' + inner + '</div>'; }
  function actCite(c) { return c ? '<div style="font-size:.74rem;color:var(--ink-faint);margin-top:6px">(' + esc(c) + ')</div>' : ''; }
  function actBadge(harm) { return harm ? '<span style="display:inline-block;background:#FBE9EA;color:#B11722;font-size:.7rem;font-weight:700;border-radius:999px;padding:2px 9px;margin-left:8px">less helpful for learning</span>' : '<span style="display:inline-block;background:#E7F3EC;color:#1C7A43;font-size:.7rem;font-weight:700;border-radius:999px;padding:2px 9px;margin-left:8px">more helpful for learning</span>'; }
  function actCaseBox(label, txt) { return txt ? '<div style="background:#15171C;color:#fff;border-radius:12px;padding:14px 18px;margin:0 0 16px"><div style="font-size:.7rem;font-weight:700;color:#F2A900;margin-bottom:4px">' + label + '</div><div style="font-size:.98rem;line-height:1.5">' + esc(txt) + '</div></div>' : ''; }
  function actMatch(w, a) {
    var d = a.data || {}, pairs = d.pairs || [], uniq = [], seen = {};
    pairs.forEach(function (p) { if (!seen[p.match]) { seen[p.match] = 1; uniq.push(p.match); } });
    var rows = pairs.map(function (p, i) {
      var key = 'a|' + w + '|m|' + i, sel = state.act[key];
      var btns = uniq.map(function (o, oi) {
        var picked = (sel === oi), correct = (o === p.match), bg = '#fff', bd = 'var(--border)', col = 'var(--ink)';
        if (sel != null) { if (correct) { bg = '#E7F3EC'; bd = '#1C7A43'; col = '#155f34'; } else if (picked) { bg = '#FBE9EA'; bd = '#B11722'; col = '#8f1119'; } }
        return '<button onclick="SOC.actPick(\'' + key + '\',' + oi + ')" aria-pressed="' + picked + '" style="text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:9px;padding:8px 12px;font-size:.86rem;font-weight:600;cursor:pointer;margin:0 6px 6px 0">' + esc(o) + '</button>';
      }).join('');
      var fb = (sel != null) ? '<div style="margin-top:8px;font-size:.86rem;color:var(--ink-dim)">' + (uniq[sel] === p.match ? '<b style="color:#1C7A43">Yes. </b>' : '<b style="color:#B11722">Not quite. </b>') + esc(p.why) + actCite(p.cite) + '</div>' : '';
      return actCard('<div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:5px">EXAMPLE ' + (i + 1) + '</div><div style="font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:10px">' + esc(p.item) + '</div><div style="font-size:.78rem;color:var(--ink-faint);margin-bottom:6px">Which mechanism does this show?</div>' + btns + fb);
    }).join('');
    return '<p style="margin:0 0 14px;color:var(--ink-dim)">' + esc(d.prompt || 'Match each example to the mechanism it shows.') + '</p>' + rows;
  }
  function actScenario(w, a) {
    var d = a.data || {}, steps = d.steps || [];
    var rows = steps.map(function (st, i) {
      var key = 'a|' + w + '|s|' + i, sel = state.act[key];
      var choices = (st.choices || []).map(function (c, ci) {
        var picked = (sel === ci), bd = picked ? (c.harm ? '#B11722' : '#1C7A43') : 'var(--border)', bg = picked ? (c.harm ? '#FBE9EA' : '#E7F3EC') : '#fff';
        return '<button onclick="SOC.actPick(\'' + key + '\',' + ci + ')" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.9rem;font-weight:600;cursor:pointer;margin:0 0 7px">' + esc(c.label) + (picked ? actBadge(c.harm) : '') + '</button>' + (picked ? '<div style="font-size:.86rem;color:var(--ink-dim);margin:0 0 10px;padding:0 2px">' + esc(c.outcome) + actCite(c.cite) + '</div>' : '');
      }).join('');
      return actCard('<div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:6px">DECISION ' + (i + 1) + '</div><div style="font-size:.98rem;font-weight:600;color:var(--ink);margin-bottom:10px">' + esc(st.situation) + '</div>' + choices);
    }).join('');
    return actCaseBox('THE CASE', d.setup) + '<p style="margin:0 0 14px;color:var(--ink-dim)">Make a call at each point, then see where it leads for learning.</p>' + rows;
  }
  function actToggle(w, a) {
    var d = a.data || {}, tgs = d.toggles || [];
    var rows = tgs.map(function (t, i) {
      var key = 'a|' + w + '|t|' + i, on = !!state.act[key];
      var sw = '<button onclick="SOC.actToggle(\'' + key + '\')" aria-pressed="' + on + '" aria-label="' + esc(t.label) + '" style="border:none;border-radius:999px;width:52px;height:28px;background:' + (on ? '#1C7A43' : '#C7CDD6') + ';position:relative;cursor:pointer;flex:0 0 auto"><span style="position:absolute;top:3px;left:' + (on ? '27px' : '3px') + ';width:22px;height:22px;border-radius:50%;background:#fff"></span></button>';
      return actCard('<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">' + sw + '<div style="font-size:.96rem;font-weight:700;color:var(--ink)">' + esc(t.label) + '<span style="font-size:.72rem;font-weight:600;color:var(--ink-faint);margin-left:8px">' + (on ? 'ON' : 'OFF') + '</span></div></div><div style="font-size:.88rem;color:var(--ink-dim)">' + esc(on ? t.on : t.off) + '</div><div style="font-size:.82rem;color:#B11722;margin-top:6px"><b>What it costs:</b> ' + esc(t.whoHarmed) + '</div>' + actCite(t.cite));
    }).join('');
    return actCaseBox('THE SYSTEM', d.system) + '<p style="margin:0 0 14px;color:var(--ink-dim)">Flip each setting and see what changes for the learner. Small defaults shape big outcomes.</p>' + rows;
  }
  function actAssemble(w, a) {
    var d = a.data || {}, comps = d.components || [], key = 'a|' + w + '|asm', added = state.act[key] || [];
    var avail = comps.map(function (c, i) { return added.indexOf(i) >= 0 ? '' : '<button onclick="SOC.actAdd(\'' + key + '\',' + i + ')" style="display:block;width:100%;text-align:left;border:1px dashed var(--border);background:#fff;color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.9rem;font-weight:600;cursor:pointer;margin:0 0 7px">+ ' + esc(c.label) + '</button>'; }).join('');
    var built = added.map(function (idx, n) { var c = comps[idx] || {}; return '<div style="border-left:3px solid var(--red);background:#fff;border:1px solid var(--border);border-radius:9px;padding:10px 13px;margin:0 0 8px"><div style="font-size:.92rem;font-weight:700;color:var(--ink)">' + (n + 1) + '. ' + esc(c.label) + '</div><div style="font-size:.85rem;color:var(--ink-dim);margin-top:3px">' + esc(c.role) + actCite(c.cite) + '</div></div>'; }).join('');
    var done = (added.length >= comps.length && comps.length) ? '<div style="margin-top:14px;background:#E7F3EC;border:1px solid #1C7A43;border-radius:10px;padding:12px 15px;font-size:.9rem;color:#155f34;font-weight:600">You have assembled the whole picture. Seeing the parts together is the point: it is how they work together that matters, not any one piece.</div>' : '';
    return actCaseBox('THE GOAL', d.goal) + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div><div style="font-size:.7rem;font-weight:700;color:var(--ink-faint);margin-bottom:8px">PARTS TO ADD</div>' + (avail || '<div style="font-size:.85rem;color:var(--ink-faint)">All parts added.</div>') + '</div><div><div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:8px">WHAT YOU HAVE BUILT</div>' + (built || '<div style="font-size:.85rem;color:var(--ink-faint)">Nothing yet. Add parts from the left.</div>') + '</div></div>' + done;
  }
  function actLab(w, a) {
    var d = a.data || {}, levers = d.levers || [], pick = d.pick || 2, key = 'a|' + w + '|lab', chosen = state.act[key] || [];
    var rows = levers.map(function (l, i) {
      var sel = chosen.indexOf(i) >= 0;
      var head = '<button onclick="SOC.actLabPick(\'' + key + '\',' + i + ',' + pick + ')" style="display:flex;align-items:center;gap:9px;width:100%;text-align:left;border:1px solid ' + (sel ? 'var(--red)' : 'var(--border)') + ';background:' + (sel ? '#FDECEC' : '#fff') + ';color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.92rem;font-weight:700;cursor:pointer;margin:0 0 ' + (sel ? '0' : '8px') + '"><span style="width:18px;height:18px;border-radius:5px;border:2px solid ' + (sel ? 'var(--red)' : '#C7CDD6') + ';background:' + (sel ? 'var(--red)' : '#fff') + ';flex:0 0 auto"></span>' + esc(l.label) + '</button>';
      var body = sel ? '<div style="border:1px solid var(--red);border-top:none;border-radius:0 0 9px 9px;background:#fff;padding:10px 13px;margin:0 0 8px;font-size:.86rem;color:var(--ink-dim)"><b>What it does:</b> ' + esc(l.effect) + '<br><b>The trade-off:</b> ' + esc(l.tradeoff) + actCite(l.cite) + '</div>' : '';
      return head + body;
    }).join('');
    var note = chosen.length >= pick ? '<div style="margin-top:8px;background:#E7F3EC;border:1px solid #1C7A43;border-radius:10px;padding:12px 15px;font-size:.88rem;color:#155f34;font-weight:600">You picked your ' + pick + '. There is no clean answer here: every option helps in one way and costs in another. That trade-off is the real choice.</div>' : '<div style="margin-top:8px;font-size:.82rem;color:var(--ink-faint)">Choose ' + pick + ' levers (' + chosen.length + ' of ' + pick + ' chosen).</div>';
    return actCaseBox('THE CASE', d['case']) + '<p style="margin:0 0 12px;color:var(--ink-dim)">You are weighing the options. Pick the ' + pick + ' levers you would use, and weigh what each one costs.</p>' + rows + note;
  }
  function actCapstone(w, a) {
    var d = a.data || {}, items = d.items || [];
    var rows = items.map(function (it, i) {
      var key = 'a|' + w + '|cap|' + i, on = !!state.act[key];
      var btn = '<button onclick="SOC.actToggle(\'' + key + '\')" style="display:flex;align-items:center;gap:11px;width:100%;text-align:left;border:1px solid ' + (on ? '#1C7A43' : 'var(--border)') + ';background:' + (on ? '#E7F3EC' : '#fff') + ';border-radius:9px;padding:11px 14px;font-size:.95rem;font-weight:700;color:var(--ink);cursor:pointer;margin:0 0 ' + (on ? '0' : '8px') + '"><span style="width:20px;height:20px;border-radius:50%;border:2px solid ' + (on ? '#1C7A43' : '#C7CDD6') + ';background:' + (on ? '#1C7A43' : '#fff') + ';color:#fff;flex:0 0 auto;display:flex;align-items:center;justify-content:center">' + (on ? ic('check', 12, 3) : '') + '</span>' + esc(it.label) + '</button>';
      var body = on ? '<div style="border:1px solid #1C7A43;border-top:none;border-radius:0 0 9px 9px;background:#fff;padding:10px 14px;margin:0 0 8px;font-size:.88rem;color:var(--ink-dim)">' + esc(it.prompt) + actCite(it.cite) + '</div>' : '';
      return btn + body;
    }).join('');
    var callout = d.callout ? '<div style="margin-top:14px;background:#15171C;color:#fff;border-radius:12px;padding:16px 18px"><div style="font-size:.7rem;font-weight:700;color:#F2A900;margin-bottom:5px">YOUR CAPSTONE</div><div style="font-size:.95rem;line-height:1.5">' + esc(d.callout) + '</div></div>' : '';
    return '<p style="margin:0 0 14px;color:var(--ink-dim)">' + esc(d.prompt || 'Revisit your cartography one dimension at a time. Mark each as you reread it.') + '</p>' + rows + callout;
  }
  function activityScreen() {
    var w = state.activityReturn, d = weekData(w);
    if (!d || !d.activity) return '<div style="padding:30px 0;color:var(--ink-dim)">No activity here. <button onclick="SOC.go(\'journey\')" style="background:none;border:none;color:var(--red);font-weight:600;cursor:pointer">Back to your journey</button></div>';
    var a = d.activity;
    var head = '<section class="jhero" style="margin:0 0 18px;padding:26px 28px"><div class="mono" style="font-size:.7rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">WEEK ' + w + ' ACTIVITY</div><h1 style="font-size:1.7rem;line-height:1.15;font-weight:700;margin:0 0 12px;color:var(--ink)">' + esc(a.title) + '</h1><div class="wk-whatwhy" style="margin:0"><b>What this is:</b> ' + esc(a.what) + '<br><br><b>Why you are doing it:</b> ' + esc(a.why) + '</div></section>' + lensActivityBlock(w, a, true);
    var inner = '';
    switch (a.archetype) { case 'match': inner = actMatch(w, a); break; case 'scenario': inner = actScenario(w, a); break; case 'toggle': inner = actToggle(w, a); break; case 'assemble': inner = actAssemble(w, a); break; case 'lab': inner = actLab(w, a); break; case 'capstone': inner = actCapstone(w, a); break; default: inner = '<p style="color:var(--ink-dim)">This activity is not set up yet.</p>'; }
    var foot = '<div style="margin-top:22px;padding-top:18px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><div style="font-size:.86rem;color:var(--ink-dim)">When you are done, go back to the week to answer the reflection and save your work.</div><button onclick="SOC.station(' + w + ')" class="wk-cta" style="margin:0">Back to Week ' + w + ' ' + ic('chevron', 16, 2.4) + '</button></div>';
    return '<div class="rise" style="margin:0 auto">' + head + inner + foot + '</div>';
  }
  function activitySummary(w, d) {
    var a = d.activity || {};
    var actMap = (state.actResult && typeof state.actResult === 'object') ? state.actResult : (state.act || {});
    if (a.screen === 'sandbox' || a.archetype == null) {
      var audited = Object.keys(state.auditedSystems || {});
      return audited.length ? ('You audited ' + audited.length + ' of 3 systems. Every system you tested failed darker-skinned women the most (up to 34.7 percent), against near-zero error for lighter-skinned men. The disparity was hidden by overall accuracy and only an intersectional cut revealed it.') : '(activity not run yet)';
    }
    var data = a.data || {};
    if (a.archetype === 'match') { var pairs = data.pairs || [], uniq = [], seen = {}, done = 0, correct = 0; pairs.forEach(function (q) { if (!seen[q.match]) { seen[q.match] = 1; uniq.push(q.match); } }); pairs.forEach(function (p, i) { var s = actMap['a|' + w + '|m|' + i]; if (s != null) { done++; if (uniq[s] === p.match) correct++; } }); return done ? ('You matched ' + correct + ' of ' + pairs.length + ' examples to the mechanism each one shows.') : '(activity not started yet)'; }
    if (a.archetype === 'scenario') { var steps = data.steps || [], n = 0; steps.forEach(function (st, i) { if (actMap['a|' + w + '|s|' + i] != null) n++; }); return n ? ('You worked through ' + n + ' of ' + steps.length + ' decision points and saw which design choices lead to harm.') : '(activity not started yet)'; }
    if (a.archetype === 'toggle') { var tgs = data.toggles || [], n2 = 0; tgs.forEach(function (t, i) { if (actMap['a|' + w + '|t|' + i]) n2++; }); return 'You explored the system defaults and saw who each one harms (' + n2 + ' of ' + tgs.length + ' turned on).'; }
    if (a.archetype === 'assemble') { var comps = data.components || [], added = (actMap['a|' + w + '|asm'] || []).length; return added ? ('You assembled ' + added + ' of ' + comps.length + ' parts and saw how they work together as a system.') : '(activity not started yet)'; }
    if (a.archetype === 'lab') { var levers = data.levers || [], ch = actMap['a|' + w + '|lab'] || []; if (!ch.length) return '(activity not started yet)'; var names = ch.map(function (i) { return levers[i] ? levers[i].label : ''; }).filter(Boolean); return 'For the case, you chose: ' + names.join(', ') + '. Each lever buys something and costs something.'; }
    if (a.archetype === 'capstone') { var citems = data.items || [], cn = 0; citems.forEach(function (it, i) { if (actMap['a|' + w + '|cap|' + i]) cn++; }); return cn ? ('You revisited ' + cn + ' of ' + citems.length + ' dimensions of your cartography across the term.') : '(revisit not started yet)'; }
    return '(activity not started yet)';
  }
  var WEEK_DATES = { 1: 'Week of Sept 8', 2: 'Week of Sept 14', 3: 'Week of Sept 21', 4: 'Week of Sept 28', 5: 'Week of Oct 5', 6: 'Week of Oct 13', 7: 'Week of Oct 19', 8: 'Week of Nov 2', 9: 'Week of Nov 9', 10: 'Week of Nov 16', 11: 'Week of Nov 23', 12: 'Week of Nov 30', 13: 'Week of Dec 7', 14: 'Week of Dec 14' };
  var STUDY_WEEK_DATE = 'Oct 26 to 30';
  var WORK_WEEKS = [13, 14];
  function weekDate(w) { return WEEK_DATES[w] || ''; }
  function workWeekPage(w) {
    var d = weekData(w) || {};
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var isFinal = (next == null);
    var hero = weekHero(w, d, {
      label: isFinal ? 'FINAL WEEK' : 'CAPSTONE WEEK',
      route: d.activity ? ['Capstone', 'Reflect', 'Save notes'] : ['Reflect', 'Save notes'],
      startPart: d.activity ? 'do' : 'reflect',
      startLabel: d.activity ? 'Open capstone' : 'Start reflection',
      question: 'No new readings or teaching material this week. This time is yours: focus on your work' + (isFinal ? ' and close out the course. Nothing is due.' : '. Your capstone is due this week.'),
      time: 'No new material'
    });
    var act = d.activity ? '<section id="wk-do" class="node interactive"><h2 class="wk-sec">' + esc(d.activity.title) + '</h2><div class="wk-whatwhy"><b>What this is:</b> ' + esc(d.activity.what) + '<br><br><b>Why you are doing it:</b> ' + esc(d.activity.why) + '</div><button onclick="SOC.startActivity(\'' + d.activity.screen + '\',' + w + ')" class="wk-cta">Open your capstone' + ic('chevron', 17, 2.4) + '</button></section>' : '';
    var reflect = '<section id="wk-reflect" class="node"><h2 class="wk-sec">Your reflection</h2>'
      + (d.reflectPrompt ? '<p style="margin:0 0 8px;font-size:.95rem">' + esc(d.reflectPrompt) + '</p>' : '')
      + '<textarea oninput="SOC.wkReflect(' + w + ',this.value)" class="wk-ta" placeholder="Your reflection...">' + esc(state.wkReflect[w] || '') + '</textarea>'
      + '</section>';
    var notes = '<section id="wk-notes" class="node"><h2 class="wk-sec">Generate Your Weekly Notes</h2>'
      + '<div class="wk-savebox" style="margin-top:0"><h3>Your organized Week ' + w + ' record</h3><p style="margin:0 0 6px;font-size:.9rem">This makes one Word file (.docx) on Seneca letterhead, your organized weekly record.</p><button onclick="SOC.saveWeek(' + w + ')" class="wk-save">Generate Your Weekly Notes</button></div></section>';
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'This week']].concat(d.activity ? [['do', 'Your capstone']] : []).concat([['reflect', 'Reflection'], ['notes', 'Generate notes']]).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' No new material</div></div></aside>';
    return '<div class="rise">' + hero + '<div class="wk-grid"><section>' + act + reflect + notes + navRow + '</section>' + rail + '</div></div>';
  }
  var OVERVIEW_WEEK = 1;
  function overviewPage(w) {
    var d = weekData(w) || {};
    var ws = journeyWeeks(), idx = ws.indexOf(w), next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var cname = (D.course && (D.course.name || D.course.title)) || weekTitle(w);
    var hero = weekHero(w, d, {
      label: 'COURSE OVERVIEW',
      title: cname,
      question: false,
      route: ['Orient', 'Open Week ' + (next != null ? next : 2), 'Use the tools'],
      startPart: 'how',
      startLabel: 'How this course works',
      time: 'Overview, no readings'
    });
    var how = '<section id="wk-how" class="node"><h2 class="wk-sec">How this course works</h2>'
      + '<p style="margin:0 0 10px;font-size:1rem;line-height:1.6">Each teaching week opens a module with its readings, a short interactive activity, and optional practice, a study guide and a knowledge check, that are never graded and never recorded. You work through the week at your own pace. A Study Week (October 26 to 30) falls between Weeks 7 and 8, a break with no new work, and nothing is due in the final week. Blackboard remains the official Seneca course platform for announcements, submissions, discussions, grades, course records, and administrative functions.</p>'
      + '<p style="margin:0;font-size:1rem;line-height:1.6">This week is your orientation. There are no readings and nothing to submit. When you are ready, begin with Week ' + (next != null ? next : 2) + '.</p></section>';
    var beginRow = (next != null) ? '<div style="margin-top:18px"><button onclick="SOC.station(' + next + ')" style="border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 18px;cursor:pointer;text-align:left;min-width:220px"><div class="mono" style="font-size:.66rem;color:var(--red)">BEGIN &rarr;</div><div style="font-size:.95rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button></div>' : '';
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Overview'], ['how', 'How this course works']].map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' Overview, no readings</div></div></aside>';
    return '<div class="rise">' + hero + '<div class="wk-grid"><section>' + how + beginRow + '</section>' + rail + '</div></div>';
  }
  var STUDY_WEEK = 7;
  function studyWeekPage(w) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var priors = ws.filter(function (x) { return x < w; });
    var hero = weekHero(w, { time: 'No classes this week' }, {
      label: 'STUDY WEEK',
      title: 'Study Week',
      sub: 'Seneca is open but there are no classes this week (October 26 to 30). There are no new readings, no new content, and nothing is due. Use the week to rest, catch up on anything still open, and let the first half of the course settle.',
      question: 'Nothing here is graded or required. Everything below is optional, and only for your own review.',
      route: priors.length ? ['Rest', 'Review', 'Optional check'] : ['Rest', 'Optional check'],
      startPart: priors.length ? 'catch' : 'kc',
      startLabel: priors.length ? 'Review earlier weeks' : 'Open optional check'
    });
    var catchup = priors.length ? '<section id="wk-catch" class="node"><h2 class="wk-sec">Catch up and review</h2>'
      + '<p style="margin:0 0 12px;font-size:.95rem;color:var(--ink-dim)">If you want to use the week to consolidate, revisit any earlier week. Nothing new to read, only what you have already met.</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px">' + priors.map(function (n) { return '<button onclick="SOC.station(' + n + ')" style="border:1px solid var(--border);background:#fff;border-radius:9px;padding:9px 13px;font-size:.86rem;font-weight:600;color:var(--ink);cursor:pointer;text-align:left">Week ' + n + ': ' + esc(weekTitle(n)) + '</button>'; }).join('') + '</div></section>' : '';
    var kcR = kcSection(w, true);
    var kc = kcR.html, kcItems = kcR.items;
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Study Week']].concat(priors.length ? [['catch', 'Catch up and review']] : []).concat(kcItems.length ? [['kc', 'Knowledge Check']] : []).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' No classes this week</div></div></aside>';
    return '<div class="rise">' + hero + '<div class="wk-grid"><section>' + catchup + kc + navRow + '</section>' + rail + '</div></div>';
  }
  function weekStation(w) {
    if (w === OVERVIEW_WEEK) return overviewPage(w);
    if (WORK_WEEKS.indexOf(w) >= 0) return workWeekPage(w);
    var d = weekData(w);
    if (d) return weekPage(w, d);
    var ws = journeyWeeks(), idx = ws.indexOf(w), recs = recordsForWeek(w);
    if (idx < 0 || !recs.length) return '<div style="padding:40px 0;color:var(--ink-dim);font-size:1rem">This week has no readings posted yet. <button onclick="SOC.go(\'journey\')" style="background:none;border:none;color:var(--red);font-weight:600;cursor:pointer">Back to your journey</button></div>';
    var hero = weekHero(w, { overview: stationFraming(w, recs), time: 'Work at your own pace' }, { label: 'READING WEEK', route: ['Read', 'Practise', 'Reflect'], startPart: 'do', startLabel: 'Use this week' });
    var framing = '';
    var readBlocks = '<div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px">';
    recs.forEach(function (r, i) { readBlocks += stationReading(r, i === 0 ? 'This week\'s reading' : 'Also this week'); });
    readBlocks += '</div>';
    var prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var navRow = '<div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:190px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:190px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    return '<div class="rise">' + hero + framing + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--ink-faint);margin:0 0 12px">WHAT YOU ARE READING</div>' + readBlocks + stationDo(w) + navRow + '</div>';
  }

  /* ---------- render ---------- */
  /* ---------- Field Lens: persistent, visible, optional program personalization ---------- */
  function lensParse() {
    var raw = state.careerField || '';
    if (!raw || raw === '__explore') return null;
    if (raw.indexOf('::') >= 0) { var p = raw.split('::'); return { area: p[0], program: p[1], label: p[1] }; }
    return { area: raw, program: null, label: 'All of ' + raw };
  }
  function lensProgramOpts(raw, placeholder) {
    var C = window[(D.course && D.course.code) + '_CAREER'] || {};
    var PROG = window.SENECA_PROGRAMS || null;
    var opts = '<option value=""' + (!raw ? ' selected' : '') + '>General stream / no program</option>';
    if (PROG) {
      (C.fields || []).forEach(function (fld) {
        var progs = PROG[fld] || [];
        opts += '<optgroup label="' + esc(fld) + '">';
        opts += '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>All of ' + esc(fld) + '</option>';
        progs.forEach(function (pr) { var v = fld + '::' + pr; opts += '<option value="' + esc(v) + '"' + (raw === v ? ' selected' : '') + '>' + esc(pr) + '</option>'; });
        opts += '</optgroup>';
      });
      opts += '<option value="__explore"' + (raw === '__explore' ? ' selected' : '') + '>Still exploring / undecided</option>';
    } else {
      (C.fields || []).forEach(function (fld) { opts += '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>' + esc(fld) + '</option>'; });
    }
    return opts;
  }
  function lensChip() {
    var C = window[(D.course && D.course.code) + '_CAREER'] || null;
    if (!C) return '';
    var L = lensParse();
    var raw = state.careerField || '';
    var sel = '<select onchange="SOC.careerField(this.value)" aria-label="Choose your program to personalize this course" style="font:inherit;font-size:.82rem;padding:6px 10px;border:1.5px solid var(--border);border-radius:8px;background:#fff;color:var(--ink);max-width:260px">' + lensProgramOpts(raw, L ? 'Change program...' : 'See this course through your program...') + '</select>';
    if (!L) {
      return '<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:16px"><span style="color:var(--red);display:inline-flex">' + ic('globe', 15, 2) + '</span><span style="font-size:.85rem;color:var(--ink-dim);font-weight:500">See this course through your program:</span>' + sel + '</div>';
    }
    return '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px;background:#FDF0EE;border:1px solid var(--red);border-radius:12px;padding:8px 8px 8px 14px"><span style="color:var(--red);display:inline-flex">' + ic('globe', 15, 2) + '</span><span style="font-size:.85rem;color:var(--ink);font-weight:500">Viewing as <b>' + esc(L.label) + '</b></span>' + sel + '<button onclick="SOC.lensOff()" aria-label="Turn off program personalization" style="background:#fff;border:1px solid var(--border);border-radius:8px;color:var(--ink-dim);font-size:.8rem;font-weight:600;cursor:pointer;padding:5px 11px">Turn off</button></div>';
  }
  function lensHomeIntro() {
    var L = lensParse();
    if (!L) return '';
    var C = window[(D.course && D.course.code) + '_CAREER'];
    var f = C && C.byField && C.byField[L.area];
    var line = f && (f.lens || (f.paras && f.paras[0]));
    if (!line) return '';
    return '<section class="jfade" style="background:#15171C;color:#fff;border-radius:16px;padding:20px 24px;margin:0 0 24px">'
      + '<div class="mono" style="font-size:.66rem;letter-spacing:.06em;color:#f3b1a8;font-weight:700;margin-bottom:8px">FOR YOUR FIELD &middot; ' + esc(L.label.toUpperCase()) + '</div>'
      + '<p style="margin:0 0 9px;font-size:1.05rem;line-height:1.55;font-weight:500">' + esc(line) + '</p>'
      + '<p style="margin:0;font-size:.8rem;color:#B9BEC8;line-height:1.5">This is a lens on the course. Every student does the same readings and the same assessments. <button onclick="SOC.go(\'career\')" style="background:none;border:none;color:#f3b1a8;font-weight:600;cursor:pointer;padding:0;font-size:.8rem;text-decoration:underline">See the full write-up for your field</button></p>'
      + '</section>';
  }
  function lensCardBadge(w) {
    var L = lensParse();
    if (!L) return '';
    var C = window[(D.course && D.course.code) + '_CAREER'];
    var f = C && C.byField && C.byField[L.area];
    if (f && f.weeks && f.weeks.indexOf(w) >= 0) return '<span class="mono" style="font-size:.6rem;font-weight:700;letter-spacing:.05em;color:var(--red);background:#F6E3E1;padding:2px 8px;border-radius:999px">KEY FOR YOUR FIELD</span>';
    return '';
  }
  function lensCardLine(w) {
    var L = lensParse();
    if (!L) return '';
    var LENS = window[(D.course && D.course.code) + '_LENS'];
    var hook = LENS && LENS.byArea && LENS.byArea[L.area] && LENS.byArea[L.area][String(w)];
    if (!hook) return '';
    return '<div style="display:flex;gap:8px;margin:0 0 9px;padding:8px 11px;background:#FDF0EE;border-radius:9px">'
      + '<span class="mono" style="color:var(--red);flex:none;font-weight:700;font-size:.62rem;letter-spacing:.04em;padding-top:2px">FOR YOUR FIELD</span>'
      + '<span style="font-size:.82rem;line-height:1.5;color:var(--ink)">' + esc(hook) + '</span></div>';
  }
  function lensPracticeLine(L) {
    if (!L) return '';
    var label = L.program || L.area;
    var byArea = {
      "Aviation": "For {program}, put this beside simulator practice, crew debriefs, checklists, fatigue, and recurrent testing. Ask what helps a person stay calm, learn from error, and recover for the next task.",
      "Business": "For {program}, put this beside targets, client pressure, teamwork, deadlines, performance reviews, and career growth. Ask what builds real motivation without turning effort into burnout.",
      "Creative Arts, Animation and Design": "For {program}, put this beside critique, portfolio revision, client feedback, comparison, rejection, and the long process of improving a craft.",
      "Education, Community and Social Services": "For {program}, put this beside family meetings, client support, placement decisions, crisis work, learning plans, and the environment that helps people cope.",
      "Engineering Technology": "For {program}, put this beside troubleshooting, failed tests, design revisions, site pressure, safety checks, and help-seeking when a problem will not move.",
      "Fashion and Esthetics": "For {program}, put this beside client feedback, technique practice, appearance pressure, comparison, building a book of clients, and staying steady after a hard service.",
      "Health and Wellness": "For {program}, put this beside patient care, shift work, assessment pressure, recovery, reflective practice, and the stress that comes with helping people.",
      "Hospitality and Tourism": "For {program}, put this beside guest complaints, service recovery, busy shifts, emotional labour, team handoffs, and the composure needed when people are watching.",
      "Information Technology": "For {program}, put this beside debugging, support tickets, new tools, broken builds, technical self-doubt, and the discipline of learning one step at a time.",
      "Law, Administration and Public Safety": "For {program}, put this beside case pressure, emergency calls, public service, conflict, ethical judgment, and the supports that keep people grounded.",
      "Liberal Arts and University Transfers": "For {program}, put this beside reading, writing, transfer planning, seminar pressure, research habits, and the confidence to keep learning in a new discipline.",
      "Media and Communications": "For {program}, put this beside deadlines, public feedback, interviews, crisis messaging, creative revision, and staying flexible when the story changes.",
      "Science": "For {program}, put this beside lab practice, failed trials, protocols, data checks, research setbacks, and the persistence needed to turn error into learning."
    };
    var template = byArea[L.area] || "For {program}, connect this week to how people learn, practise, recover, ask for help, and stay motivated in the field you are exploring.";
    return template.replace(/\{program\}/g, label);
  }
  function lensChangeLine() {
    return 'What changes: your program filter changes the expanded week hook, field diagram, case study, activity map, home field panel, key-week badges, and Career Choices write-up. What stays the same: readings, assessments, and outcomes.';
  }
  function lensFieldContext(L) {
    var label = (L && (L.program || L.area)) || 'your field';
    var byArea = {
      "Aviation": { place: 'simulators, checklists, crew debriefs, recurrent tests, fatigue rules, and training records', decision: 'a training choice, recovery habit, help-seeking moment, or response to a mistake', people: 'students, instructors, crew, dispatchers, maintenance teams, and passengers who depend on steady performance', pressure: 'a simulator error, weather change, check ride, crew handoff, or fatigue-heavy shift', setting: 'an aircraft, simulator bay, dispatch desk, maintenance floor, or crew debrief' },
      "Business": { place: 'projects, targets, client files, team meetings, performance reviews, and busy reporting cycles', decision: 'a study plan, team response, recovery habit, or way of building confidence', people: 'students, teammates, clients, supervisors, customers, and staff who depend on reliable work', pressure: 'a missed target, client complaint, hiring decision, cash-flow problem, or team deadline', setting: 'a store, office, client meeting, sales funnel, HR process, or project room' },
      "Creative Arts, Animation and Design": { place: 'portfolios, critiques, revisions, client briefs, studio deadlines, and public feedback', decision: 'a revision choice, feedback response, self-compassion move, or practice routine', people: 'students, instructors, clients, audiences, collaborators, and the creator trying to keep making work', pressure: 'a critique, rejected draft, changing brief, technical failure, or production deadline', setting: 'a studio, editing bay, platform feed, client presentation, or production pipeline' },
      "Education, Community and Social Services": { place: 'classrooms, intake notes, family meetings, placement plans, referrals, and support records', decision: 'a support choice, boundary, help-seeking move, or way of reading resilience as process', people: 'children, families, clients, teachers, frontline workers, and communities around the learner', pressure: 'a difficult placement, crisis call, family meeting, behaviour concern, or referral decision', setting: 'a classroom, agency, intake desk, program meeting, or family support plan' },
      "Engineering Technology": { place: 'labs, drawings, tests, site checks, failed prototypes, troubleshooting logs, and safety reviews', decision: 'a troubleshooting plan, request for help, revision choice, or recovery from a failed test', people: 'students, technicians, supervisors, clients, workers, and people who rely on the finished system', pressure: 'a failed test, changed site condition, deadline, inspection issue, or team handoff', setting: 'a project site, lab bench, shop floor, design review, or testing station' },
      "Fashion and Esthetics": { place: 'salons, studios, client consultations, technique practice, portfolios, product work, and service feedback', decision: 'a practice choice, client response, recovery habit, or way of handling comparison', people: 'students, clients, instructors, models, stylists, and service workers building craft confidence', pressure: 'a difficult client service, critique, trend shift, product mismatch, or event deadline', setting: 'a salon, studio, treatment room, runway, retail floor, or client consultation' },
      "Health and Wellness": { place: 'clinical shifts, assessment tools, care plans, patient records, reflective notes, and recovery routines', decision: 'a self-care boundary, reflective practice, help-seeking move, or response to pressure', people: 'patients, families, practitioners, caregivers, classmates, and the worker who needs to stay well', pressure: 'a high-stress placement, patient concern, difficult assessment, shift handoff, or care decision', setting: 'a clinic, hospital unit, treatment room, wellness program, or patient chart' },
      "Hospitality and Tourism": { place: 'guest encounters, service recovery, event plans, booking desks, ratings, team handoffs, and busy shifts', decision: 'a response to stress, communication choice, recovery habit, or way to stay warm under pressure', people: 'guests, workers, hosts, supervisors, families, travellers, and the team carrying the service moment', pressure: 'a difficult guest, busy service, bad review, changed itinerary, or event problem', setting: 'a hotel, restaurant, event, booking desk, tour route, or guest-service counter' },
      "Information Technology": { place: 'codebases, support tickets, debugging logs, help requests, release cycles, and new technical tools', decision: 'a debugging plan, help-seeking request, learning routine, or response to technical self-doubt', people: 'students, users, clients, admins, teammates, and support staff depending on the system', pressure: 'a broken build, outage, new requirement, security issue, or support escalation', setting: 'a codebase, help desk, database, deployment pipeline, app screen, or security review' },
      "Law, Administration and Public Safety": { place: 'case files, emergency calls, client counters, public service settings, policy work, and conflict situations', decision: 'a help-seeking move, stress response, reflective pause, or way of staying fair and grounded', people: 'clients, residents, officers, staff, callers, witnesses, and workers under public pressure', pressure: 'a tense interaction, urgent file, policy conflict, client appeal, or public safety decision', setting: 'a counter, case file, dispatch desk, hearing room, patrol context, or public office' },
      "Liberal Arts and University Transfers": { place: 'readings, seminars, research files, transfer plans, writing drafts, and study routines', decision: 'a learning strategy, revision plan, help request, or confidence-building step', people: 'students, classmates, instructors, future colleagues, and the learner building a path into another discipline', pressure: 'a difficult reading, seminar debate, research pivot, writing block, or transfer decision', setting: 'a seminar, essay, research file, library search, or future discipline' },
      "Media and Communications": { place: 'story meetings, interviews, campaigns, public feedback, production timelines, and crisis messages', decision: 'a communication choice, recovery habit, revision move, or way of staying flexible under scrutiny', people: 'students, sources, audiences, clients, teammates, and the communicator carrying the message', pressure: 'a fast deadline, public response, client change, source conflict, or platform issue', setting: 'a newsroom, campaign room, social feed, client brief, podcast, or crisis channel' },
      "Science": { place: 'labs, field sites, protocols, sampling plans, failed trials, data checks, and research reports', decision: 'a practice routine, response to failure, help-seeking move, or way of turning error into learning', people: 'students, lab teams, researchers, participants, communities, and people depending on careful evidence', pressure: 'a failed trial, lab error, uncertain result, deadline, or protocol change', setting: 'a lab, field site, dataset, protocol, instrument, or research report' }
    };
    var ctx = byArea[L && L.area] || { place: 'learning tasks, feedback, deadlines, practice, support, and recovery habits in the field', decision: 'a study plan, help-seeking move, practice routine, or recovery choice', people: 'students, clients, coworkers, communities, and the people who depend on steady performance', pressure: 'a hard task, deadline, failed attempt, or team problem', setting: 'a classroom, workplace, client file, project, service, or public decision' };
    ctx.label = label;
    return ctx;
  }
  function lensActivityProfile(w, a, L) {
    var ctx = lensFieldContext(L);
    var code = (D.course && D.course.code) || '';
    var title = a && a.title ? a.title : 'this activity';
    if (code === 'PSY355') {
      return {
        flow: [
          ['Course skill', title],
          ['Field pressure', ctx.pressure],
          ['Recovery move', 'plan, practise, ask, adjust, and try again'],
          ['Who depends on it', ctx.people]
        ],
        use: 'Use the activity as a rehearsal for how you learn under pressure in ' + ctx.label + ': what you try first, what support you use, and how you recover when the first attempt does not work.',
        check: 'The custom question: what would keep your judgment steady in ' + ctx.setting + '?'
      };
    }
    if (code === 'SOC122') {
      return {
        flow: [
          ['Course lens', title],
          ['Field setting', ctx.setting],
          ['People and power', ctx.people],
          ['Respectful action', 'listen, compare perspectives, and let affected communities lead']
        ],
        use: 'Use the activity to translate the course idea into ' + ctx.label + ': who is present, who has power, whose knowledge is trusted, and what respectful action would look like.',
        check: 'The custom question: what would this activity make visible in ' + ctx.setting + '?'
      };
    }
    return {
      flow: [
        ['Course idea', title],
        ['Field system', ctx.place],
        ['Decision point', ctx.decision],
        ['People affected', ctx.people]
      ],
      use: 'Use the activity to test one field decision in ' + ctx.label + ': who benefits, who carries risk, what evidence you would need, and what would make the system more accountable.',
      check: 'The custom question: where could this same pattern appear in ' + ctx.setting + '?'
    };
  }
  function lensActivityBlock(w, a, inScreen) {
    var L = lensParse();
    if (!L || !a) return '';
    var profile = lensActivityProfile(w, a, L);
    var cells = profile.flow.map(function (x, i) {
      return '<div style="border:1px solid var(--border);background:#fff;border-radius:8px;padding:10px 12px;min-height:74px">'
        + '<div class="mono" style="font-size:.6rem;letter-spacing:.05em;color:var(--red);font-weight:700;margin-bottom:5px">STEP ' + (i + 1) + '</div>'
        + '<div style="font-size:.83rem;font-weight:700;color:var(--ink);margin-bottom:4px">' + esc(x[0]) + '</div>'
        + '<div style="font-size:.78rem;line-height:1.35;color:var(--ink-dim)">' + esc(x[1]) + '</div></div>';
    }).join('');
    return '<div style="background:#F7F8FA;border:1px solid var(--border);border-left:3px solid var(--red);border-radius:0 10px 10px 0;padding:14px 16px;margin:' + (inScreen ? '0 0 18px' : '14px 0 16px') + '">'
      + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">ACTIVITY MAP FOR ' + esc((L.program || L.area).toUpperCase()) + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:10px">' + cells + '</div>'
      + '<p style="margin:0 0 6px;font-size:.9rem;line-height:1.5;color:var(--ink)">' + esc(profile.use) + '</p>'
      + '<p style="margin:0;font-size:.78rem;line-height:1.45;color:var(--ink-dim)">' + esc(profile.check) + ' The activity itself stays the same for everyone.</p></div>';
  }
  function lensProgramFocus(L) {
    var p = ((L && L.program) || '').toLowerCase();
    if (/civil|building|construction/.test(p)) return 'For this program, pay special attention to public infrastructure, site drawings, grading, drainage, accessibility, inspection records, and the people who rely on the built environment every day.';
    if (/fire/.test(p)) return 'For this program, pay special attention to life-safety systems, emergency access, alarms, codes, inspection records, and the people who depend on fast, clear decisions.';
    if (/mechanical|manufacturing|mechatronic|tool|cnc/.test(p)) return 'For this program, pay special attention to tolerances, machine settings, maintenance logs, safety guards, production defaults, and the workers affected by every technical choice.';
    if (/electrical|electronics|energy/.test(p)) return 'For this program, pay special attention to circuits, sensors, controls, power access, failure modes, and who is protected or exposed when a system behaves badly.';
    if (/environment|water|chemical|biotech|bio/.test(p)) return 'For this program, pay special attention to samples, lab thresholds, environmental monitoring, compliance records, and communities affected by technical evidence.';
    if (/computer|software|cyber|informatics|data|programming/.test(p)) return 'For this program, pay special attention to data fields, defaults, permissions, logs, testing, release decisions, and users who cannot see or challenge the system.';
    if (/nursing|health|fitness|therapeutic|pharmacy|optician|veterinary/.test(p)) return 'For this program, pay special attention to assessment tools, patient records, devices, care plans, referrals, and who carries the cost when a screen is wrong.';
    if (/early childhood|social service|child|youth|community|mental health|behaviour/.test(p)) return 'For this program, pay special attention to intake forms, family records, risk notes, referrals, placements, and how families are represented in the file.';
    if (/aviation|flight/.test(p)) return 'For this program, pay special attention to checklists, crew handoffs, dispatch records, screening tools, safety margins, and who can challenge a bad flag.';
    if (/account|finance|business|marketing|human resources|supply|project management/.test(p)) return 'For this program, pay special attention to metrics, dashboards, hiring screens, customer data, approvals, and who gets filtered before a person reviews the case.';
    if (/law|paralegal|police|public safety|security|immigration|court/.test(p)) return 'For this program, pay special attention to case notes, policy thresholds, discretion points, risk tools, records, and appeal paths.';
    if (/journalism|media|communication|public relations|broadcast/.test(p)) return 'For this program, pay special attention to story frames, source choices, platform ranking, audience data, moderation, and who controls the public narrative.';
    if (/animation|design|visual|fashion|esthetic|cosmetic|art/.test(p)) return 'For this program, pay special attention to visual defaults, references, body and skin assumptions, client records, platform tools, and who gets represented well.';
    if (/hospitality|tourism|event|culinary/.test(p)) return 'For this program, pay special attention to booking systems, guest profiles, ratings, staffing, service scripts, and who is welcomed or treated as risk.';
    return 'For this program, pay special attention to the tools, records, standards, clients, and decisions that shape everyday work in the field.';
  }
  function lensTopicFocus(d) {
    var c = d && d.concepts && d.concepts[0] ? d.concepts[0] : null;
    var q = d && d.guiding && d.guiding[0] ? d.guiding[0] : '';
    var r = d && d.readings && d.readings[0] ? d.readings[0] : null;
    return {
      concept: c && c.h ? c.h : (d && d.title ? d.title : 'This week\'s concept'),
      explanation: c && c.body ? c.body : (d && d.purpose ? d.purpose : ''),
      cite: c && c.cite ? c.cite : '',
      question: q,
      reading: r && r.apa ? r.apa : ''
    };
  }
  function lensProgramCaseQuestions(code, L, ctx) {
    var p = ((L && L.program) || '').toLowerCase();
    if (/mental health|behaviour|behavior|social service|child|youth|community|early childhood/.test(p)) {
      return [
        'Which intake field, risk note, referral rule, or placement label would shape how this client is first understood?',
        'What family, culture, disability, housing, trauma, or community context might be flattened by that record?',
        'Who can challenge the risk score or placement recommendation before it follows the client into the next service?',
        'How would you document strengths, consent, and client voice so the file does not become only a deficit story?'
      ];
    }
    if (/civil|building|construction/.test(p)) {
      return [
        'Which drawing, site measurement, code requirement, drainage assumption, or access standard would drive the first design choice?',
        'Who uses this space in ways the default spec might not imagine, including disabled users, shift workers, children, elders, or transit riders?',
        'What field evidence would show that the design works for the people most likely to be overlooked?',
        'Where would you build in a review point before the technical choice becomes concrete, steel, traffic flow, or permanent access?'
      ];
    }
    if (/computer|software|cyber|informatics|data|programming/.test(p)) {
      return [
        'Which data field, permission level, model output, log, test case, or default setting would shape the user experience first?',
        'Which users are missing from the test set, support tickets, access review, or release decision?',
        'How would someone discover, contest, or appeal a wrong system decision?',
        'What evidence would prove that the fix works for the user group most likely to be misread?'
      ];
    }
    if (/nursing|health|fitness|therapeutic|pharmacy|optician|veterinary/.test(p)) {
      return [
        'Which screen, device reading, chart note, referral rule, or care-plan default would shape the first response?',
        'Whose pain, risk, communication style, body, or history might the tool read poorly?',
        'What patient, family, or practitioner evidence should sit beside the score before a decision is made?',
        'How would you create a check-back so a wrong first screen does not become the whole care pathway?'
      ];
    }
    if (/law|paralegal|police|public safety|security|immigration|court/.test(p)) {
      return [
        'Which policy threshold, report field, risk flag, discretion point, or file note would shape the first decision?',
        'Who gets treated as credible, risky, compliant, or suspicious before they can explain their own context?',
        'What appeal path, review step, or documentation practice would let a person challenge the decision?',
        'How would you record uncertainty so the file does not make a contested judgment look final?'
      ];
    }
    if (/account|finance|business|marketing|human resources|supply|project management/.test(p)) {
      return [
        'Which metric, dashboard, hiring screen, credit rule, price model, or approval threshold would drive the decision?',
        'Who is filtered out before a person reviews the case, and what proxy variable might be doing that work?',
        'What human explanation, audit trail, or exception process would make the decision answerable?',
        'How would you test whether the rule rewards the same people it was already built around?'
      ];
    }
    if (/aviation|flight/.test(p)) {
      return [
        'Which checklist, screening tool, dispatch note, maintenance log, weather call, or safety margin would shape the decision?',
        'Who is delayed, flagged, rerouted, or silenced by the procedure when the pressure is high?',
        'What crew, passenger, maintenance, or operations evidence would challenge a bad flag?',
        'Where does the handoff need a second look so safety does not become unequal treatment?'
      ];
    }
    if (/animation|design|visual|fashion|esthetic|cosmetic|art/.test(p)) {
      return [
        'Which reference, visual default, shade range, body assumption, image crop, style guide, or platform tool shapes what looks normal?',
        'Who is represented accurately, who is made invisible, and who is treated as an exception to the design?',
        'What client, audience, model, or community feedback would change the creative decision?',
        'How would you document the choice so representation is part of the work, not a late correction?'
      ];
    }
    if (/hospitality|tourism|event|culinary/.test(p)) {
      return [
        'Which booking rule, guest profile, rating, staffing call, service script, or event plan shapes the first response?',
        'Who is welcomed, who is treated as a risk, and who has trouble getting the same level of service?',
        'What worker, guest, or accessibility evidence should change the service decision?',
        'How would you build a recovery step that fixes the harm without blaming the guest or front-line worker?'
      ];
    }
    if (/journalism|media|communication|public relations|broadcast/.test(p)) {
      return [
        'Which headline, source list, edit, platform rule, audience metric, or campaign frame shapes what the public sees first?',
        'Who becomes credible, who becomes a problem, and who is missing from the story or message?',
        'What source, community review, or audience evidence would complicate the first frame?',
        'How would you revise the message so speed does not flatten people into a single story?'
      ];
    }
    if (/science|environment|water|chemical|biotech|bio/.test(p)) {
      return [
        'Which sample, instrument setting, threshold, lab protocol, model assumption, or compliance record shapes the finding?',
        'Whose data fits the method, whose results are treated as noise, and who lives with the consequence?',
        'What field, lab, participant, or community evidence would test the assumption?',
        'How would you report uncertainty so the method does not hide its limits?'
      ];
    }
    return [
      'Which tool, record, standard, client interaction, or professional judgment would shape the first decision in ' + ctx.label + '?',
      'Who is easiest for that process to see, and who becomes an exception, a delay, or a problem to manage?',
      'What evidence from affected people would change the decision before it becomes routine?',
      'How would you make the decision reviewable by someone who was harmed by it?'
    ];
  }
  function lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w) {
    var label = (L && (L.program || L.area)) || 'your program';
    if (code === 'PSY355') {
      return {
        nodes: [
          ['Week topic', topic.concept],
          ['Program pressure', ctx.pressure],
          ['Learning move', 'notice, practise, ask for feedback, and recover'],
          ['Who depends on it', ctx.people],
          ['Activity test', profile.check.replace(/^The custom question: /, '')]
        ],
        intro: 'Imagine this week\'s psychology concept showing up inside ' + ctx.setting + '. The pressure is ' + ctx.pressure + ', and the professional move is not just knowing the concept. It is noticing how stress, feedback, bias, motivation, memory, or recovery can shape what you do next.',
        concept: 'Use it to ask what the person is experiencing, what support would change the path, and how a small recovery move could prevent a bad first attempt from becoming a fixed story about ability.',
        focus: focus,
        questions: lensProgramCaseQuestions(code, L, ctx),
        lensQuestions: ['What pressure triggers the setback?', 'What support or feedback changes the outcome?', 'What recovery move keeps learning possible?', 'What would you try differently next time?']
      };
    }
    if (code === 'SOC122') {
      return {
        nodes: [
          ['Week topic', topic.concept],
          ['Program setting', ctx.setting],
          ['People and power', ctx.people],
          ['Missing voices', 'who is not in the room, record, source, or decision'],
          ['Respectful action', 'listen, compare perspectives, and let affected communities lead']
        ],
        intro: 'Imagine this week\'s sociology concept showing up inside ' + ctx.setting + '. The issue is not only what happened. It is who is present, who is missing, whose knowledge is trusted, and how the setting teaches people what counts as normal.',
        concept: 'Use it to map people, place, power, representation, and responsibility before you decide what respectful action would look like in ' + label + '.',
        focus: focus,
        questions: lensProgramCaseQuestions(code, L, ctx),
        lensQuestions: ['Who is present and who is missing?', 'Whose knowledge is trusted?', 'What power relationship shapes the setting?', 'What would respectful action look like here?']
      };
    }
    return {
      nodes: [
        ['Week topic', topic.concept],
        ['Program setting', ctx.setting],
        ['Field decision', ctx.decision],
        ['Who feels it', ctx.people],
        ['Activity test', profile.check.replace(/^The custom question: /, '')]
      ],
      intro: 'Imagine this week\'s concept showing up inside ' + ctx.setting + '. The decision is not abstract: it is ' + ctx.decision + '. In ' + label + ', that decision sits inside ' + ctx.place + '.',
      concept: 'Use it to ask who the system sees clearly, who it treats as an exception, and what evidence would show the harm before it becomes normal practice.',
      focus: focus,
      questions: lensProgramCaseQuestions(code, L, ctx),
      lensQuestions: ['Who benefits from the default?', 'Who carries the risk if it fails?', 'What data or testimony is missing?', 'What would accountability look like here?']
    };
  }
  function lensProgramSection(w, d) {
    var L = lensParse();
    if (!L || !d) return '';
    var ctx = lensFieldContext(L);
    var topic = lensTopicFocus(d);
    var profile = lensActivityProfile(w, d.activity || {}, L);
    var focus = lensProgramFocus(L);
    var code = (D.course && D.course.code) || '';
    var frame = lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w);
    var nodes = frame.nodes;
    var label = L.program || L.area;
    var diagram = nodes.map(function (n, i) {
      return '<div style="position:relative;border:1px solid var(--border);background:#fff;border-radius:10px;padding:12px 13px;min-height:92px">'
        + '<div class="mono" style="font-size:.6rem;letter-spacing:.05em;color:var(--red);font-weight:700;margin-bottom:6px">' + esc(n[0].toUpperCase()) + '</div>'
        + '<div style="font-size:.86rem;line-height:1.4;color:var(--ink);font-weight:600">' + esc(n[1]) + '</div>'
        + (i < nodes.length - 1 ? '<div aria-hidden="true" style="position:absolute;right:-14px;top:40%;font-size:1.1rem;color:var(--red);font-weight:700;z-index:2">&rarr;</div>' : '')
        + '</div>';
    }).join('');
    return '<section id="wk-lens" class="node"><h2 class="wk-sec">For your program</h2>'
      + '<p style="margin:0 0 12px;font-size:.95rem;line-height:1.55;color:var(--ink-dim)">This section changes with your selected program. It turns the week\'s topic into a field diagram while keeping the same readings, assessment, and outcomes for everyone.</p>'
      + '<div style="background:#FDF0EE;border-left:3px solid var(--red);border-radius:0 10px 10px 0;padding:14px 16px;margin-bottom:14px"><div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">TOPIC-AWARE FIELD DIAGRAM: ' + esc(label.toUpperCase()) + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px">' + diagram + '</div></div>'
      + '</section>';
  }
  function lensCaseStudySection(w, d) {
    var L = lensParse();
    if (!L || !d) return '';
    var ctx = lensFieldContext(L);
    var topic = lensTopicFocus(d);
    var profile = lensActivityProfile(w, d.activity || {}, L);
    var focus = lensProgramFocus(L);
    var code = (D.course && D.course.code) || '';
    var frame = lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w);
    var label = L.program || L.area;
    var qGrid = function (title, questions) {
      return '<div style="margin-top:14px"><div class="mono" style="font-size:.62rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:8px">' + title + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px">'
        + (questions || []).map(function (q) { return '<div style="background:#F7F8FA;border:1px solid var(--border);border-radius:8px;padding:11px 13px;font-size:.86rem;line-height:1.48;color:var(--ink)">' + esc(q) + '</div>'; }).join('')
        + '</div></div>';
    };
    return '<section id="wk-case" class="node"><h2 class="wk-sec">Case study</h2>'
      + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">IN-DEPTH PROGRAM CASE STUDY</div>'
      + '<h3 style="font-size:1.08rem;margin:0 0 8px;color:var(--ink)">' + esc(label + ': a field case for Week ' + w) + '</h3>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)">' + esc(frame.intro) + '</p>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)"><b>' + esc(topic.concept) + '</b>' + (topic.cite ? ' (' + esc(topic.cite) + ')' : '') + ': ' + esc(frame.concept) + '</p>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)">' + esc(frame.focus) + '</p>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)">Work the case in two passes. First, trace the program-specific tool, record, standard, or professional judgment that would shape the decision. Then bring the course concept back in and ask what the case reveals that routine practice might miss.</p>'
      + qGrid('PROGRAM TRACE QUESTIONS', frame.questions)
      + qGrid('COURSE LENS QUESTIONS', frame.lensQuestions)
      + '</section>';
  }
  function lensHookExpansion(w) {
    var L = lensParse();
    var d = weekData(w);
    if (!L || !d) return '';
    var ctx = lensFieldContext(L);
    var topic = lensTopicFocus(d);
    var profile = lensActivityProfile(w, d.activity || {}, L);
    var focus = lensProgramFocus(L);
    var code = (D.course && D.course.code) || '';
    var frame = lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w);
    var label = L.program || L.area;
    var lead = 'Read this week as a field systems check. In ' + label + ', the week matters when ' + ctx.decision + ' becomes a default inside ' + ctx.place + '.';
    if (code === 'PSY355') lead = 'Read this week as a field rehearsal, not a generic psychology unit. In ' + label + ', the week matters when ' + ctx.pressure + ' and the first interpretation of a client, learner, patient, teammate, or system problem starts to shape the response.';
    if (code === 'SOC122') lead = 'Read this week as a field map. In ' + label + ', the week matters when a setting such as ' + ctx.setting + ' hides power relationships, missing voices, or inherited assumptions.';
    var cells = frame.questions.slice(0, 3).map(function (q) {
      return '<div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font-size:.82rem;line-height:1.42;color:var(--ink)">' + esc(q) + '</div>';
    }).join('');
    return '<div style="margin-top:11px;padding-top:11px;border-top:1px solid rgba(177,23,34,.18)">'
      + '<div class="mono" style="font-size:.6rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:6px">READ IT THROUGH ' + esc(label.toUpperCase()) + '</div>'
      + '<p style="margin:0 0 8px;font-size:.9rem;line-height:1.55;color:var(--ink)">' + esc(lead) + '</p>'
      + '<p style="margin:0 0 9px;font-size:.88rem;line-height:1.55;color:var(--ink-dim)">Carry the week\'s concept, ' + esc(topic.concept) + ', into the concrete tools, records, people, and pressures of the program. The goal is to notice where the course idea would change what you ask, document, design, recommend, or challenge.</p>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px">' + cells + '</div>'
      + '</div>';
  }
  function lensHook(w) {
    var L = lensParse();
    if (!L) return '';
    var LENS = window[(D.course && D.course.code) + '_LENS'];
    if (!LENS || !LENS.byArea || !LENS.byArea[L.area]) return '';
    var hook = LENS.byArea[L.area][String(w)];
    if (!hook) return '';
    var practice = lensPracticeLine(L);
    var expanded = lensHookExpansion(w);
    return '<div style="background:#FDF0EE;border-left:3px solid var(--red);border-radius:0 10px 10px 0;padding:12px 16px;margin:0 0 18px">'
      + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:5px">FOR YOUR FIELD &middot; ' + esc(L.label.toUpperCase()) + '</div>'
      + '<p style="margin:0;font-size:.97rem;line-height:1.6;color:var(--ink)">' + esc(hook) + '</p>'
      + (practice ? '<p style="margin:8px 0 0;font-size:.92rem;line-height:1.55;color:var(--ink)">' + esc(practice) + '</p>' : '')
      + expanded
      + '<div style="margin-top:9px;font-size:.76rem;line-height:1.45;color:var(--ink-dim)">' + esc(lensChangeLine()) + '</div>'
      + '</div>';
  }
  function pathwaysPage() {
    var route = function (kind, title, subtitle, steps) {
      return '<section class="path-route path-' + kind + '"><div class="path-route-head"><div class="mono">' + esc(kind === 'async' ? 'ASYNCHRONOUS COURSE USERS' : 'SYNCHRONOUS COURSE USERS') + '</div><h2>' + esc(title) + '</h2><p>' + esc(subtitle) + '</p></div>'
        + '<ol>' + steps.map(function (s, i) { return '<li><span>' + (i + 1) + '</span><div><b>' + esc(s[0]) + '</b><em>' + esc(s[1]) + '</em><p>' + esc(s[2]) + '</p></div></li>'; }).join('') + '</ol></section>';
    };
    var asyncSteps = [
      ['Start', 'Weekly page', 'Work through the module in order.'],
      ['Learn', 'Walkthrough plus readings', 'Use the walkthrough as your class moment, then anchor it in the readings.'],
      ['Practise', 'Activity and checks', 'Use the activity, Reading Practice, flashcards, and Knowledge Check as private rehearsal.'],
      ['Capture', 'Notes as you go', 'Write in the note boxes while your thinking is fresh.'],
      ['Finish', 'Generate notes', 'Download one organized weekly record for review and Blackboard preparation.']
    ];
    var syncSteps = [
      ['Preview', 'Before class', 'Skim the weekly page and bring one question.'],
      ['Discuss', 'Class time', 'Use the walkthrough, activity, and examples as shared discussion tools.'],
      ['Return', 'After class', 'Finish the readings, activity notes, checks, and reflection.'],
      ['Connect', 'Class plus site notes', 'Add classroom takeaways into the site note boxes.'],
      ['Prepare', 'Blackboard work', 'Use the assignment guide, practice tools, and notes before submitting.']
    ];
    return '<div class="rise path-page">'
      + '<section class="path-hero"><div><div class="mono">COURSE PATHWAYS</div><h1>Choose your weekly rhythm</h1><p>The work is the same. The pacing is different. Pick the route that matches how you are taking PSY355, then use it every week.</p></div><div class="path-compass" aria-label="Two pathway options"><span>ASYNC</span><b>self-paced learning room</b><i></i><span>SYNC</span><b>before, during, after class</b></div></section>'
      + '<section class="path-summary"><div><b>Same course</b><span>Same readings, activities, assignments, and expectations.</span></div><div><b>Different rhythm</b><span>Async is self-paced. Sync is class-connected.</span></div><div><b>One weekly record</b><span>Both routes end with Generate Your Weekly Notes.</span></div></section>'
      + '<div class="path-routes">' + route('async', 'Asynchronous route', 'Use the weekly page as the full learning room.', asyncSteps) + route('sync', 'Synchronous route', 'Use the site around class so class time goes deeper.', syncSteps) + '</div>'
      + '<section class="path-close"><h2>Which route should you follow?</h2><p>No live weekly class? Use the asynchronous route. Scheduled class meetings? Use the synchronous route. Unsure? Start with the asynchronous route because it is the complete self-paced path.</p><div class="path-actions"><button type="button" onclick="SOC.station(2)"><b>Enter Week 2 Learning Room</b><small>Start the full module.</small></button><button type="button" onclick="SOC.go(\'videos\')"><b>Scholar Media</b><small>Use media as an on-ramp.</small></button><button type="button" onclick="SOC.careerChoices()"><b>Career Choices</b><small>Connect the course to your path.</small></button><button type="button" onclick="SOC.go(\'assignments\')"><b>Starting Your Assignment</b><small>Plan the graded work.</small></button></div></section>'
      + '</div>';
  }
  function assignmentIntegrityNotice() {
    var rows = [
      ['Instructor contact first', 'If there is an academic-integrity concern, the instructor contacts you and names the specific issue before any formal report is submitted.'],
      ['Your response matters', 'The first step is information gathering. You have a chance to explain your process, disclosure, sources, and assignment choices.'],
      ['Blackboard records', 'Blackboard Activity Log evidence may be reviewed. A Progress report is not enough by itself and needs the Activity Log with it.']
    ];
    return '<section class="path-summary integrity-note" aria-label="Academic integrity process">' + rows.map(function (r) {
      return '<div><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></div>';
    }).join('') + '</section>';
  }
  function assignmentsPage() {
    var items = [
      ['Learning Practice Journal', 'Recurring preparation', 'Use weekly notes as low-stakes raw material for later reflection and planning.'],
      ['Mindset Evidence Check 1', 'Week 5 window', 'Use readings and examples from the mindset weeks to keep the evidence precise.'],
      ['Self-Regulated Learning Case Redesign', 'Week 8 window', 'Choose one real study routine and redesign it with course language and a short implementation log.'],
      ['Mindset Evidence Check 2', 'Week 11 window', 'Use self-compassion, flexibility, and help-seeking without turning the work into a clinical account.'],
      ['Personal Resilience Plan', 'Week 13 capstone', 'Build a forward plan grounded in course evidence and your own learning record.']
    ];
    var steps = items.map(function (x, i) { return '<li><span>' + (i + 1) + '</span><div><b>' + esc(x[0]) + '</b><em>' + esc(x[1]) + '</em><p>' + esc(x[2]) + '</p></div></li>'; }).join('');
    return '<div class="rise path-page"><section class="path-hero"><div><div class="mono">STARTING YOUR ASSIGNMENT</div><h1>Use the site to prepare, then submit in Blackboard</h1><p>This page gives you the standard starting pattern: find the official assignment in Blackboard, use this site to gather concepts and evidence, then write and submit the final work yourself.</p></div><div class="path-compass"><span>SITE</span><b>practice, notes, evidence</b><i></i><span>BLACKBOARD</span><b>official brief, dropbox, grade</b></div></section><section class="path-summary"><div><b>Blackboard is official</b><span>Due dates, dropboxes, rubrics, feedback, and grades stay in Blackboard.</span></div><div><b>Use weekly notes</b><span>Generate notes from the weeks that feed the assignment before drafting.</span></div><div><b>Keep the course lens visible</b><span>Name the concept, the evidence, the limit, and the practical next move.</span></div></section>' + assignmentIntegrityNotice() + '<section class="path-route"><div class="path-route-head"><div class="mono">ASSIGNMENT ROUTE</div><h2>Start from the active PSY355 package</h2><p>Use this as a planning map only. Always check Blackboard for the complete instructions before submitting.</p></div><ol>' + steps + '</ol></section><section class="path-close"><h2>Start with the week that feeds the work</h2><p>Open the relevant weekly room, generate your notes, then come back to this assignment map when you are ready to draft.</p><div class="path-actions"><button type="button" onclick="SOC.station(5)"><b>Week 5</b><small>Mindset evidence.</small></button><button type="button" onclick="SOC.station(8)"><b>Week 8</b><small>SRL case redesign.</small></button><button type="button" onclick="SOC.station(11)"><b>Week 11</b><small>Evidence check 2.</small></button><button type="button" onclick="SOC.station(13)"><b>Week 13</b><small>Capstone planning.</small></button></div></section></div>';
  }
  function scholarMedia() {
    var out = [];
    function add(r, source, kind) {
      if (!source) return;
      var isYouTube = !!source.yt;
      var mediaId = String(source.yt || source.platform || source.kind || kind || 'media').replace(/[^A-Za-z0-9_-]/g, '');
      out.push({ key: r.id + '|' + mediaId, week: r.week, kind: source.kind || kind || (isYouTube ? 'Video' : 'Podcast'), title: source.title || r.title, scholar: source.scholar || r.authors, source: source.channel || source.source || (isYouTube ? 'YouTube' : 'Source site'), platform: source.platform || (isYouTube ? 'youtube' : 'source'), id: source.yt || '', embed: source.embed === false ? false : isYouTube, url: source.url || (isYouTube ? 'https://www.youtube.com/watch?v=' + source.yt : readUrl(r)), synopsis: r.coreIdea || r.abstract || 'Use this media item as an on-ramp into the assigned reading.', watchFor: [r.coreIdea || 'The central claim of the source', 'Where the media helps you enter the reading', 'What still needs evidence from the assigned text'], readNext: 'Then return to Week ' + r.week + ' and read the assigned source for evidence.', fieldPrompt: mediaFieldPrompt(r.week) });
    }
    D.records.forEach(function (r) { add(r, r.video, 'Video'); add(r, r.audio, 'Podcast'); });
    return out.sort(function (a, b) { return (a.week - b.week) || a.scholar.localeCompare(b.scholar); });
  }
  function mediaFieldPrompt(w) {
    var L = lensParse();
    if (!L) return '';
    var ctx = lensFieldContext(L);
    return 'For ' + (L.program || L.area) + ', use this media item to notice one real pressure point in ' + ctx.place + '. Then return to the reading and name the course idea that explains it.';
  }
  function mediaWeekOptions(items) {
    var weeks = [];
    items.forEach(function (v) { if (weeks.indexOf(v.week) < 0) weeks.push(v.week); });
    weeks.sort(function (a, b) { return a - b; });
    return '<div class="vid-tabs" role="group" aria-label="Filter scholar media by week"><button type="button" onclick="SOC.videoWeek(\'all\')" class="' + (state.videoWeek === 'all' ? 'on' : '') + '">All weeks</button>' + weeks.map(function (w) { return '<button type="button" onclick="SOC.videoWeek(' + w + ')" class="' + (String(state.videoWeek) === String(w) ? 'on' : '') + '">Week ' + w + '</button>'; }).join('') + '</div>';
  }
  function mediaKindOptions(items) {
    var kinds = [];
    items.forEach(function (v) { var k = String(v.kind || 'Media'); if (kinds.indexOf(k) < 0) kinds.push(k); });
    return '<div class="vid-tabs vid-kind-tabs" role="group" aria-label="Filter scholar media by type"><button type="button" onclick="SOC.mediaKind(\'all\')" class="' + (state.mediaKind === 'all' ? 'on' : '') + '">All media</button>' + kinds.map(function (k) { return '<button type="button" onclick="SOC.mediaKind(\'' + esc(k) + '\')" class="' + (String(state.mediaKind) === k ? 'on' : '') + '">' + esc(k) + '</button>'; }).join('') + '</div>';
  }
  function videoEmbed(v) {
    if (v.platform === 'youtube' && v.embed) return '<button type="button" class="vid-load" onclick="SOC.playVideo(this,\'' + esc(v.id) + '\')" aria-label="Load video: ' + esc(v.title + ' - ' + v.scholar) + '"><span>' + esc(v.kind || 'Video') + '</span><b>Load official player</b><small>Loads YouTube only after you choose to play it.</small></button>';
    return '<a class="vid-linkout" href="' + esc(v.url) + '" target="_blank" rel="noopener"><span>' + esc(v.kind || 'Media') + '</span><b>Open on source site</b><small>Playback stays with the official source. Nothing is downloaded or rehosted here.</small></a>';
  }
  function videoCard(v) {
    var note = state.mediaNotes && state.mediaNotes[v.key] ? state.mediaNotes[v.key] : '';
    return '<article class="vid-card"><div class="vid-frame">' + videoEmbed(v) + '</div><div class="vid-copy"><div class="mono">WEEK ' + v.week + ' &middot; ' + esc(v.kind || 'Media') + ' &middot; ' + esc(v.source) + '</div><h2>' + esc(v.title) + '</h2><h3>' + esc(v.scholar) + '</h3><p>' + esc(v.synopsis) + '</p><div class="vid-watch"><b>Watch for</b><ul>' + v.watchFor.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div><div class="vid-read"><b>Then read</b><span>' + esc(v.readNext) + '</span></div>' + (v.fieldPrompt ? '<div class="vid-field"><b>Use it in your program</b><span>' + esc(v.fieldPrompt) + '</span></div>' : '') + '<label class="vid-note"><b>Reading Rescue note</b><span>After the media, write one sentence you can prove from the reading.</span><textarea oninput="SOC.mediaNote(\'' + esc(v.key) + '\',this.value)" placeholder="One evidence-backed sentence...">' + esc(note) + '</textarea></label><a href="' + esc(v.url) + '" target="_blank" rel="noopener">Open source page <span aria-hidden="true">&#8599;</span></a></div></article>';
  }
  function videosPage() {
    var items = scholarMedia();
    var filter = state.videoWeek || 'all';
    var kindFilter = state.mediaKind || 'all';
    var shown = items.filter(function (v) { return (filter === 'all' || String(v.week) === String(filter)) && (kindFilter === 'all' || String(v.kind) === String(kindFilter)); });
    var L = lensParse();
    var field = L ? '<section class="vid-field-hero"><div><div class="mono">PROGRAM LENS IS ON</div><h2>' + esc(L.program || L.area) + '</h2><p>Each card now includes a field prompt. Use it to turn the media item into a concrete question about your future work, then return to the reading for evidence.</p></div><button type="button" onclick="SOC.go(\'career\')">Review my field notes</button></section>' : '';
    return '<div class="rise vid-page"><section class="vid-hero"><div class="mono">CURATED SCHOLAR MEDIA</div><h1>Scholar Media Gallery</h1><p>Use these videos and podcasts as on-ramps into the readings, not replacements for them. Each card tells you what the item explains, what to watch or listen for, and which reading move to make next.</p></section><section class="vid-rule"><div><b>Watch or listen, then read</b><span>The media gives you a way in. Your assignments still need concepts and evidence from the readings.</span></div><div><b>Official sources only</b><span>Embeddable videos use official platform players. Podcasts and restricted media link out to the source site.</span></div><div><b>Use the program lens</b><span>If you choose a program, each card adds a field prompt without changing the required work.</span></div></section>' + field + mediaWeekOptions(items) + mediaKindOptions(items) + '<section class="vid-grid" aria-label="Scholar media cards">' + shown.map(videoCard).join('') + '</section>' + (shown.length ? '' : '<p class="vid-empty">No media items are currently curated for that filter.</p>') + '</div>';
  }
  function homeBar() {
    return '<div class="page-return-row" aria-label="Page navigation"><button type="button" onclick="SOC.prev()">&#8592; Return to Previous Screen</button><button type="button" onclick="SOC.go(\'journey\')">Home</button></div>';
  }
  function backBar() {
    return homeBar();
  }
  function mobileJumpItem(label, action, primary) {
    return '<button type="button" class="' + (primary ? 'primary' : '') + '" onclick="' + action + '">' + esc(label) + '</button>';
  }
  function mobileWeekActions(w, d) {
    d = d || {};
    var items = [
      mobileJumpItem('Menu', 'SOC.openNav()', true),
      mobileJumpItem('Home', "SOC.go('journey')", false)
    ];
    if (d.activity) items.push(mobileJumpItem('Activity', "SOC.jumpWeek(" + w + ",'do')", false));
    items.push(mobileJumpItem('Reflect', "SOC.jumpWeek(" + w + ",'reflect')", false));
    items.push(mobileJumpItem('Notes', "SOC.jumpWeek(" + w + ",'notes')", false));
    return '<nav class="soc-mobile-jump" aria-label="Mobile week shortcuts">' + items.join('') + '</nav>';
  }
  function mobileActivityActions(w) {
    var items = [
      mobileJumpItem('Menu', 'SOC.openNav()', true),
      mobileJumpItem('Week ' + w, 'SOC.station(' + w + ')', false),
      mobileJumpItem('Home', "SOC.go('journey')", false),
      mobileJumpItem('Reflect', "SOC.jumpWeek(" + w + ",'reflect')", false),
      mobileJumpItem('Notes', "SOC.jumpWeek(" + w + ",'notes')", false)
    ];
    return '<nav class="soc-mobile-jump" aria-label="Mobile activity shortcuts">' + items.join('') + '</nav>';
  }
  function body() {
    if (state.screen === 'journey' || state.screen === 'library') return journeyHome();
    if (state.screen === 'station') { var _sw = state.stationWeek || currentJourneyWeek(); return homeBar() + mobileWeekActions(_sw, weekData(_sw)) + lensHook(_sw) + weekStation(_sw); }
    if (state.screen === 'detail') return homeBar() + detail();
    if (state.screen === 'pathways') return homeBar() + pathwaysPage();
    if (state.screen === 'site') return homeBar() + siteInfoPage();
    if (state.screen === 'videos') return homeBar() + videosPage();
    if (state.screen === 'readings') return homeBar() + readingsGallery();
    if (state.screen === 'compare') return homeBar() + compare();
    if (state.screen === 'reading') return homeBar() + readingComp();
    if (state.screen === 'glossary') return homeBar() + glossaryScreen();
    if (state.screen === 'cards') return homeBar() + cardsScreen();
    if (state.screen === 'assignments') return homeBar() + assignmentsPage();
    if (state.screen === 'career') return homeBar() + careerScreen();
    if (state.screen === 'activity') { var _aw = state.activityReturn || state.stationWeek || currentJourneyWeek(); return backBar() + mobileActivityActions(_aw) + activityScreen(); }
    if (state.screen === 'ecology' && D.course && D.course.code === 'PSY355') return homeBar() + ecologyScreen();
    return journeyHome();
  }
  function careerScreen() {
    var C = window[(D.course && D.course.code) + '_CAREER'] || null;
    if (!C) return '<div class="rise career-page"><section class="career-empty"><h2>Career Choices is being prepared.</h2><p>This section is not ready yet.</p></section></div>';
    var raw = state.careerField || '', area = raw, program = null;
    if (raw.indexOf('::') >= 0) { var parts = raw.split('::'); area = parts[0]; program = parts[1]; }
    var PROG = window.SENECA_PROGRAMS || null;
    var opts;
    if (PROG) {
      opts = '<option value=""' + (!raw ? ' selected' : '') + '>General stream / no program</option>';
      (C.fields || []).forEach(function (fld) {
        var progs = PROG[fld] || [];
        opts += '<optgroup label="' + esc(fld) + '">';
        opts += '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>All of ' + esc(fld) + '</option>';
        progs.forEach(function (pr) { var v = fld + '::' + pr; opts += '<option value="' + esc(v) + '"' + (raw === v ? ' selected' : '') + '>' + esc(pr) + '</option>'; });
        opts += '</optgroup>';
      });
      opts += '<option value="__explore"' + (raw === '__explore' ? ' selected' : '') + '>Still exploring / undecided</option>';
    } else {
      opts = '<option value=""' + (!raw ? ' selected' : '') + '>General stream / no program</option>'
        + (C.fields || []).map(function (fld) { return '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>' + esc(fld) + '</option>'; }).join('')
        + '<option value="__explore"' + (raw === '__explore' ? ' selected' : '') + '>Still exploring / undecided</option>';
    }
    var selected = raw ? (program || area || 'Selected lens') : 'No program lens selected yet';
    var picker = '<aside class="career-picker"><label for="career-sel">Choose your program lens</label><select id="career-sel" onchange="SOC.careerField(this.value)" aria-label="Select your program or field of study">' + opts + '</select><p>Current lens: <b>' + esc(selected) + '</b>. You can change this any time. The assignments stay the same.</p></aside>';
    var hero = '<section class="career-hero"><div><div class="mono">CAREER CHOICES</div><h1>Read PSY355 through your future work</h1><p>' + esc(C.intro || 'Choose a program lens to connect the course to your field.') + ' The lens does not change the required course. It changes the examples, prompts, and field questions that help the course feel closer to your world.</p></div>' + picker + '</section>';
    var impact = '<section id="career-choices" class="career-impact" aria-label="What the program lens changes"><div><b>Weekly field hooks</b><span>The weekly page points to examples that feel closer to your program or field.</span></div><div><b>Stronger assignment choices</b><span>You get help finding course concepts and examples that fit the assignment prompt.</span></div><div><b>Same grading standard</b><span>Your work is still assessed on the same PSY355 expectations as everyone else.</span></div></section>';
    var wrap = function (inner) { return '<div class="rise career-page">' + hero + impact + inner + '</div>'; };
    var card = function (k, h, inner, tint) {
      return '<div class="career-box"' + (tint ? ' style="background:' + tint + '"' : '') + '><div class="mono">' + esc(k) + '</div><h3 style="font-size:1.05rem;line-height:1.25;font-weight:800;color:var(--ink);margin:0 0 9px">' + esc(h) + '</h3>' + inner + '</div>';
    };
    var list = function (items) { return '<ul>' + (items || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
    if (!raw) return wrap('<section id="career-main" class="career-field"><div class="mono">GENERAL STREAM</div><h2>Start general, or choose a lens now</h2>'
      + card('GENERAL STREAM', 'Use the course without choosing a program', '<p style="margin:0;font-size:1rem;line-height:1.65;color:var(--ink)">Stay with the general stream if you are undecided or if you want the standard PSY355 path. You will still build the same core skills: planning your learning, building confidence through practice, reading stress clearly, recovering after setbacks, and asking for help in useful ways.</p>', '#F7F8FA')
      + card('HOW TO USE IT', 'Keep the question simple', '<p style="margin:0;font-size:.97rem;line-height:1.65;color:var(--ink)">As you move through the weeks, ask: what helps a person keep learning when the work gets hard? You can answer that question in any field, even before you know where you are headed.</p>') + '</section>');
    if (raw === '__explore') return wrap('<section id="career-main" class="career-field"><div class="mono">STILL EXPLORING</div><h2>You do not need a final career plan to use PSY355</h2>'
      + card('STILL EXPLORING', 'You do not need a final career plan to use PSY355', '<p style="margin:0;font-size:1rem;line-height:1.65;color:var(--ink)">Use the course as a way to learn how you work under pressure. Notice what helps you start, keep going, recover, and ask for support. Those habits transfer into any program you choose later.</p>', '#F7F8FA')
      + card('TRY THIS', 'Read each week as a rehearsal', '<p style="margin:0;font-size:.97rem;line-height:1.65;color:var(--ink)">When an activity asks you to practise a skill, imagine a real deadline, test, client, patient, guest, project, or team setting. The point is not to guess your future. It is to learn what keeps your judgment steady.</p>') + '</section>');
    var f = (C.byField || {})[area];
    if (!f) return wrap('<section id="career-main" class="career-empty"><h2>This lens is being prepared</h2><p>The write-up for ' + esc(area) + ' is being prepared.</p></section>');
    var L = { area: area, program: program, label: program || ('All of ' + area) };
    var ctx = lensFieldContext(L);
    var pnote = program && (C.byProgram || {})[program];
    var out = '<section id="career-main" class="career-field"><div class="mono">YOUR SELECTED FIELD</div><h2>' + esc(program || area) + '</h2>';
    out += card('SECTION 1', 'Program context', '<p style="margin:0 0 10px;font-size:1rem;line-height:1.65;color:var(--ink)">' + esc(pnote || ('You are looking at ' + (program || area) + ' through the larger ' + area + ' area. Use this page to connect course skills to the pressure, feedback, practice, and recovery that happen in this field.')) + '</p>'
      + '<div class="career-mini-grid">'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">Where to look</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.place) + '</span></div>'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">Pressure points</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.pressure) + '</span></div>'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">People in the picture</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.people) + '</span></div></div>', '#F7F8FA');
    if (f.lens) out += '<div class="career-lens"><div class="mono">READ THE COURSE THIS WAY</div><p>' + esc(f.lens) + '</p></div>';
    out += card('SECTION 2', 'How PSY355 connects', '<p style="margin:0 0 10px;font-size:.97rem;line-height:1.65;color:var(--ink)">' + esc((f.paras && f.paras[0]) || '') + '</p>' + (f.skills && f.skills.length ? list(f.skills) : ''));
    out += card('SECTION 3', 'How to use this in the course', '<p style="margin:0 0 10px;font-size:.97rem;line-height:1.65;color:var(--ink)">Do not turn this into career advice. Use your program to make the psychology concrete. The course question stays the same: how do people learn, stay motivated, recover from pressure, and keep going when the work is difficult?</p>'
      + list(['Name one real setting from ' + (program || area) + '.', 'Connect it to a PSY355 idea such as self-regulated learning, self-efficacy, stress and recovery, self-compassion, or help-seeking.', 'Explain what a student or worker could do next, in plain language, without pretending the course solves every problem.']));
    if (f.scenario) out += card('FIELD SCENARIO', 'Picture the idea in motion', '<p style="margin:0;font-size:.97rem;line-height:1.65;color:var(--ink)">' + esc(f.scenario) + '</p>', '#FBF4F3');
    if (f.weeks && f.weeks.length) {
      var wl = f.weeks.map(function (w) { return '<button onclick="SOC.station(' + w + ')" style="border:1px solid var(--border);background:#fff;border-radius:8px;padding:7px 13px;font-size:.85rem;font-weight:600;color:var(--ink);margin:0 8px 0 0;cursor:pointer">Week ' + w + ' &#8594;</button>'; }).join('');
      out += card('KEY WEEKS', 'Start with these weeks', (f.weeksWhy ? '<p style="margin:0 0 9px;font-size:.95rem;line-height:1.6;color:var(--ink)">' + esc(f.weeksWhy) + '</p>' : '') + '<div class="career-week-buttons">' + wl + '</div>');
    }
    if (f.roles && f.roles.length) out += card('WHERE THIS SHOWS UP', 'Possible roles and settings', '<p style="margin:0;font-size:.95rem;line-height:1.6;color:var(--ink)">' + f.roles.map(esc).join(' | ') + '</p>');
    var rk = 'career|' + (program || area), rv = esc((state.careerReflect && state.careerReflect[rk]) || '');
    out += '<div class="career-note"><h3 style="margin:10px 0 4px;font-size:1.02rem">What do you want to remember?</h3><p class="wk-hint" style="margin-bottom:8px">A quick note to yourself, saved in this browser on this device. Nothing is submitted, and it will be here when you come back in this browser. Use Generate Your Weekly Notes to keep a permanent copy.</p>'
      + '<textarea oninput="SOC.careerReflect(\'' + rk + '\',this.value)" aria-label="Your reflection" class="wk-ta" placeholder="One place I can already picture this showing up in my field...">' + rv + '</textarea></div></section>';
    return wrap(out);
  }
  function render() {
    if (state.screen !== 'compare' && render._prev !== undefined && render._prev !== state.screen && (state.compareIds.length || state.showSynthesis)) { state.compareIds = []; state.showSynthesis = false; }
    render._prev = state.screen;
    var toast = state.toast ? '<div role="status" style="position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:80;background:#15171C;color:#fff;font-size:.9375rem;font-weight:500;padding:12px 20px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.24);display:flex;align-items:center;gap:10px"><span style="display:flex;color:#F2A900">' + ic('check', 16, 2.2) + '</span>' + esc(state.toast) + '</div>' : '';
    document.getElementById('app').innerHTML =
      '<div style="min-height:100vh;display:flex;flex-direction:column;background:#F7F8FA">' + header()
      + (state.navOpen ? '<button class="soc-mobile-scrim" onclick="SOC.closeNav()" aria-label="Close course navigation"></button>' : '')
      + '<div style="display:flex;flex:1;min-height:0">' + sidebar()
      + '<main id="soc-main" tabindex="-1" class="scrollarea" style="flex:1;min-width:0;overflow:auto;height:calc(100vh - 62px)"><div style="margin:0 auto;padding:30px 30px 110px">' + (['journey','library','station','videos'].indexOf(state.screen) >= 0 ? lensChip() : '') + body() + siteFooter() + '</div></main>'
      + '</div>' + readerLensOverlay() + rlPanelOverlay() + toast + '</div>';
    if (refocusSearch) {
      var el = document.getElementById('soc-search');
      if (el) { el.focus(); var v = el.value; el.setSelectionRange(v.length, v.length); }
      refocusSearch = false;
    }
    if (focusTarget) {
      var ft = document.getElementById(focusTarget);
      if (ft) { if (!ft.hasAttribute('tabindex')) ft.setAttribute('tabindex', '-1'); ft.focus(); }
      focusTarget = null;
    }
    var ann = screenAnnounceText();
    if (ann && render._announced !== ann) {
      render._announced = ann;
      document.title = ann + ' | ' + (courseCode() || 'Course') + ' Companion';
      var lr = document.getElementById('soc-live');
      if (lr) { lr.textContent = ''; setTimeout(function () { lr.textContent = 'Loaded ' + ann; }, 30); }
    }
    saveView();
  }
  function topScroll() { var m = document.getElementById('soc-main'); if (m) m.scrollTop = 0; }
  function renderKeepScroll() {
    var m = document.getElementById('soc-main'), y = m ? m.scrollTop : 0;
    render();
    var m2 = document.getElementById('soc-main');
    if (m2) m2.scrollTop = y;
  }
  function scrollWeekPart(part) {
    if (!part) { topScroll(); return; }
    setTimeout(function () {
      var el = document.getElementById('wk-' + part);
      var m = document.getElementById('soc-main');
      if (el && m) m.scrollTop = Math.max(0, el.offsetTop - 10);
      else if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' });
    }, 20);
  }
  function scrollToId(id) {
    setTimeout(function () {
      var el = document.getElementById(id);
      var m = document.getElementById('soc-main');
      if (el && m) m.scrollTop = Math.max(0, el.offsetTop - 12);
      else if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' });
    }, 20);
  }
  function viewSnapshot() {
    return {
      screen: state.screen,
      journeyWeek: state.journeyWeek,
      stationWeek: state.stationWeek,
      activityReturn: state.activityReturn,
      detailId: state.detailId,
      cardWeek: state.cardWeek,
      activeTypes: (state.activeTypes || []).slice(),
      activeWeek: state.activeWeek,
      search: state.search || '',
      savedView: !!state.savedView,
      rcReading: state.rcReading,
      lens: state.lens || 'thematic',
      compareIds: (state.compareIds || []).slice(),
      showSynthesis: !!state.showSynthesis,
      galWeek: state.galWeek,
      galTopic: state.galTopic,
      glossWeek: state.glossWeek || 'all',
      glossSearch: state.glossSearch || '',
      ecoLayer: state.ecoLayer || 'you',
      act: state.act || {},
      videoWeek: state.videoWeek || 'all',
      mediaKind: state.mediaKind || 'all'
    };
  }
  function sameView(a, b) {
    try { return JSON.stringify(a || {}) === JSON.stringify(b || {}); } catch (e) { return false; }
  }
  function rememberPrevious() {
    var v = viewSnapshot();
    if (!state.prevView || !sameView(v, state.prevView)) state.prevView = v;
  }
  function restoreView(v) {
    v = v || { screen: 'journey' };
    state.screen = cleanScreen(v.screen);
    state.journeyWeek = cleanWeek(v.journeyWeek);
    state.stationWeek = cleanWeek(v.stationWeek);
    state.activityReturn = cleanWeek(v.activityReturn);
    state.detailId = v.detailId || null;
    state.cardWeek = cleanWeek(v.cardWeek);
    state.activeTypes = Array.isArray(v.activeTypes) ? v.activeTypes.slice() : [];
    state.activeWeek = cleanWeek(v.activeWeek);
    state.search = v.search || '';
    state.savedView = !!v.savedView;
    state.rcReading = v.rcReading || null;
    state.lens = v.lens || 'thematic';
    state.compareIds = Array.isArray(v.compareIds) ? v.compareIds.slice() : [];
    state.showSynthesis = !!v.showSynthesis;
    state.galWeek = cleanWeek(v.galWeek);
    state.galTopic = v.galTopic || null;
    state.glossWeek = v.glossWeek || 'all';
    state.glossSearch = v.glossSearch || '';
    state.ecoLayer = v.ecoLayer || 'you';
    state.act = (v.act && typeof v.act === 'object') ? v.act : (state.act || {});
    state.videoWeek = v.videoWeek || 'all';
    state.mediaKind = v.mediaKind || 'all';
    state.navOpen = false;
  }
  function goPrevious() {
    var current = viewSnapshot();
    var prev = state.prevView;
    if (prev && prev.screen && !sameView(prev, current)) {
      restoreView(prev);
      state.prevView = current;
    } else if (state.activityReturn != null) {
      restoreView({ screen: 'station', stationWeek: state.activityReturn, journeyWeek: state.activityReturn });
      state.prevView = current;
    } else {
      restoreView({ screen: 'journey' });
      state.prevView = current;
    }
    persist();
    focusTarget = 'soc-main';
    render();
    topScroll();
  }

  /* ---------- actions ---------- */
  function flash(msg) { clearTimeout(toastTimer); var lr = document.getElementById('soc-live'); if (lr) { lr.textContent = ''; setTimeout(function () { lr.textContent = msg; }, 30); } state.toast = msg; render(); toastTimer = setTimeout(function () { state.toast = null; render(); }, 2200); }
  /* ---- real .docx (OOXML, dependency-free) ---- */
  var DX_FONT = 'IBM Plex Sans';
  var DX_BODY_SIZE = 22;
  function dxEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]; }); }
  function dxRun(text, opt) { opt = opt || {}; var size = opt.size || DX_BODY_SIZE; var rpr = '<w:rPr>'; if (opt.bold) rpr += '<w:b/>'; if (opt.italic) rpr += '<w:i/>'; if (opt.color) rpr += '<w:color w:val="' + opt.color + '"/>'; rpr += '<w:sz w:val="' + size + '"/><w:szCs w:val="' + size + '"/><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '" w:cs="' + DX_FONT + '"/></w:rPr>'; var parts = String(text == null ? '' : text).split('\n'), t = ''; for (var i = 0; i < parts.length; i++) { if (i > 0) t += '<w:br/>'; t += '<w:t xml:space="preserve">' + dxEsc(parts[i]) + '</w:t>'; } return '<w:r>' + rpr + t + '</w:r>'; }
  function dxPara(runsXml, opt) { opt = opt || {}; var ppr = '<w:pPr>'; if (opt.style) ppr += '<w:pStyle w:val="' + opt.style + '"/>'; if (opt.keep) ppr += '<w:keepNext/><w:keepLines/>'; if (opt.align) ppr += '<w:jc w:val="' + opt.align + '"/>'; ppr += '<w:spacing w:before="' + (opt.before || 0) + '" w:after="' + (opt.after || 120) + '" w:line="300" w:lineRule="auto"/>'; if (opt.border) ppr += '<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="6" w:color="DEE3EA"/></w:pBdr>'; ppr += '</w:pPr>'; return '<w:p>' + ppr + runsXml + '</w:p>'; }
  function dxLogoRun(rid, id, cx, cy) { return '<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="' + cx + '" cy="' + cy + '"/><wp:docPr id="' + id + '" name="Seneca logo"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="' + (id + 1) + '" name="seneca-logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="' + rid + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>'; }
  function dxLogoPara(rid) { return dxPara(dxLogoRun(rid, 1, 1760000, 360000), { align: 'left', after: 180 }); }
  function dxTc(inner, opt) { opt = opt || {}; var props = '<w:tcPr>'; if (opt.w) props += '<w:tcW w:w="' + opt.w + '" w:type="dxa"/>'; if (opt.shade) props += '<w:shd w:fill="' + opt.shade + '"/>'; props += '<w:tcMar><w:top w:w="110" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar></w:tcPr>'; return '<w:tc>' + props + inner + '</w:tc>'; }
  function dxCellText(text, opt) { opt = opt || {}; return dxPara(dxRun(text, { bold: opt.bold, color: opt.color || '15171C', size: opt.size || DX_BODY_SIZE }), { after: opt.after == null ? 60 : opt.after }); }
  function dxTable(rows, opt) { opt = opt || {}; var out = '<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="6" w:color="DEE3EA"/><w:left w:val="single" w:sz="6" w:color="DEE3EA"/><w:bottom w:val="single" w:sz="6" w:color="DEE3EA"/><w:right w:val="single" w:sz="6" w:color="DEE3EA"/><w:insideH w:val="single" w:sz="4" w:color="DEE3EA"/><w:insideV w:val="single" w:sz="4" w:color="DEE3EA"/></w:tblBorders></w:tblPr>'; rows.forEach(function (row, ri) { out += '<w:tr><w:trPr><w:cantSplit/>' + (ri === 0 && opt.header ? '<w:tblHeader/>' : '') + '</w:trPr>'; row.forEach(function (cell) { var obj = (cell && typeof cell === 'object') ? cell : { text: cell }; var shade = obj.shade || (ri === 0 && opt.header ? '1B2A4A' : null); var color = obj.color || (ri === 0 && opt.header ? 'FFFFFF' : '15171C'); out += dxTc(dxCellText(obj.text || '', { bold: obj.bold || (ri === 0 && opt.header), color: color }), { shade: shade, w: obj.w || opt.w }); }); out += '</w:tr>'; }); return out + '</w:tbl>'; }
  function dxList(items) { return (items || []).map(function (item) { return dxPara(dxRun(String(item || ''), { color: '15171C' }), { after: 50 }); }).join(''); }
  function dxHeaderXml() { return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' + dxPara(dxLogoRun('rIdLogoHeader', 10, 1320000, 270000), { align: 'right', after: 40 }) + '</w:hdr>'; }
  function dxFooterXml(label) { return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/><w:pBdr><w:top w:val="single" w:sz="4" w:space="6" w:color="DEE3EA"/></w:pBdr></w:pPr>' + dxRun(label + ' | Page ', { color: '474C57', size: 20 }) + '<w:fldSimple w:instr="PAGE"><w:r><w:rPr><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="20"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple>' + dxRun(' of ', { color: '474C57', size: 20 }) + '<w:fldSimple w:instr="NUMPAGES"><w:r><w:rPr><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="20"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>'; }
  function dxDoc(course, title, subLines, sections) { var body = ''; body += dxLogoPara('rIdLogo'); body += dxPara(dxRun('SENECA POLYTECHNIC | ' + course, { bold: true, color: 'DA291C', size: 20 }), { after: 40, keep: true }); body += dxPara(dxRun(title, { bold: true, color: '15171C', size: 32 }), { style: 'Title', after: 60, keep: true }); (subLines || []).forEach(function (line, i) { body += dxPara(dxRun(line, { color: '474C57' }), { after: (i === subLines.length - 1 ? 160 : 40), border: (i === subLines.length - 1) }); }); (sections || []).forEach(function (sec) { body += dxPara(dxRun(sec.h, { bold: true, color: 'DA291C', size: 26 }), { style: 'Heading1', before: 170, after: 60, keep: true }); if (sec.type === 'table') body += dxTable(sec.rows || [], { header: true }); else if (sec.type === 'list') body += dxList(sec.items || []); else if (sec.t !== undefined && sec.t !== null) { var t = (String(sec.t).trim()) ? sec.t : '(not written yet)'; body += dxPara(dxRun(t, { color: '15171C' }), { after: 80 }); } }); return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>' + body + '<w:sectPr><w:headerReference w:type="default" r:id="rIdHeader"/><w:footerReference w:type="default" r:id="rIdFooter"/><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>'; }
  function dxStylesXml() { return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '" w:cs="' + DX_FONT + '"/><w:sz w:val="' + DX_BODY_SIZE + '"/><w:szCs w:val="' + DX_BODY_SIZE + '"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="32"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/></w:pPr><w:rPr><w:b/><w:color w:val="DA291C"/><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="26"/></w:rPr></w:style></w:styles>'; }
  function dxCoreXml(course, title) { var now = new Date().toISOString(); var docTitle = title ? ((course && String(title).indexOf(course) !== 0) ? course + ' ' + title : title) : (course || 'Seneca Document'); return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + dxEsc(docTitle) + '</dc:title><dc:creator>Raymond Peart</dc:creator><cp:lastModifiedBy>Raymond Peart</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified></cp:coreProperties>'; }
  var DX_CT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>';
  var DX_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>';
  var DX_DOC_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/seneca-logo.png"/><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>';
  var DX_HEADER_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogoHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/seneca-logo.png"/></Relationships>';
  var dxCrcT = null;
  function dxCrc(bytes) { if (!dxCrcT) { dxCrcT = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); dxCrcT[n] = c >>> 0; } } var crc = 0xFFFFFFFF; for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ dxCrcT[(crc ^ bytes[i]) & 0xFF]; return (crc ^ 0xFFFFFFFF) >>> 0; }
  function dxCat(arrs) { var len = 0, i; for (i = 0; i < arrs.length; i++) len += arrs[i].length; var out = new Uint8Array(len), off = 0; for (i = 0; i < arrs.length; i++) { out.set(arrs[i], off); off += arrs[i].length; } return out; }
  function dxU16(n) { return new Uint8Array([n & 255, (n >> 8) & 255]); }
  function dxU32(n) { return new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]); }
  function dxZip(files) { var enc = new TextEncoder(); var chunks = [], central = [], offset = 0; files.forEach(function (f) { var nameB = enc.encode(f.name); var data = (f.data instanceof Uint8Array) ? f.data : enc.encode(f.data); var crc = dxCrc(data), size = data.length; var lfh = dxCat([dxU32(0x04034b50), dxU16(20), dxU16(0), dxU16(0), dxU16(0), dxU16(0), dxU32(crc), dxU32(size), dxU32(size), dxU16(nameB.length), dxU16(0), nameB, data]); chunks.push(lfh); central.push(dxCat([dxU32(0x02014b50), dxU16(20), dxU16(20), dxU16(0), dxU16(0), dxU16(0), dxU16(0), dxU32(crc), dxU32(size), dxU32(size), dxU16(nameB.length), dxU16(0), dxU16(0), dxU16(0), dxU16(0), dxU32(0), dxU32(offset), nameB])); offset += lfh.length; }); var centralB = dxCat(central); var eocd = dxCat([dxU32(0x06054b50), dxU16(0), dxU16(0), dxU16(files.length), dxU16(files.length), dxU32(centralB.length), dxU32(offset), dxU16(0)]); return dxCat([dxCat(chunks), centralB, eocd]); }
  function senecaDoc(course, title, subLines, sections, fn) {
    return fetch('./seneca-logo.png').then(function (r) {
      if (!r.ok) throw new Error('Seneca logo could not be loaded.');
      return r.arrayBuffer();
    }).then(function (buf) {
      var logoBytes = new Uint8Array(buf);
      var bytes = dxZip([
        { name: '[Content_Types].xml', data: DX_CT },
        { name: '_rels/.rels', data: DX_RELS },
        { name: 'docProps/core.xml', data: dxCoreXml(course, title) },
        { name: 'word/_rels/document.xml.rels', data: DX_DOC_RELS },
        { name: 'word/_rels/header1.xml.rels', data: DX_HEADER_RELS },
        { name: 'word/media/seneca-logo.png', data: logoBytes },
        { name: 'word/styles.xml', data: dxStylesXml() },
        { name: 'word/header1.xml', data: dxHeaderXml() },
        { name: 'word/footer1.xml', data: dxFooterXml(title) },
        { name: 'word/document.xml', data: dxDoc(course, title, subLines, sections) }
      ]);
      var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fn + '.docx';
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href);
      flash('Saved to your device as a Seneca branded document.');
    }).catch(function () {
      flash('Export stopped: the Seneca logo could not be embedded.');
    });
  }
  window.SOC = {
    openNav: function () { state.navOpen = true; renderKeepScroll(); },
    toggleNav: function () { state.navOpen = !state.navOpen; renderKeepScroll(); },
    closeNav: function () { state.navOpen = false; renderKeepScroll(); },
    toggleReaderLens: function () {
      state.readerLensOpen = !state.readerLensOpen;
      rlDockWire(state.readerLensOpen);
      renderKeepScroll();
      announce(state.readerLensOpen ? 'Magnifier on. Text under your pointer or keyboard focus appears in large print at the bottom of the screen.' : 'Magnifier off.');
    },
    rlPanel: function () { state.rlPanelOpen = !state.rlPanelOpen; renderKeepScroll(); announce(state.rlPanelOpen ? 'Reading Lens panel open.' : 'Reading Lens panel closed.'); if (state.rlPanelOpen) { var p = document.getElementById('rl-panel'); if (p) p.focus(); } else { var b = document.querySelector('.reader-lens-btn'); if (b) b.focus(); } },
    rlPanelKey: function (e) { if (e.key === 'Escape') { e.stopPropagation(); SOC.rlPanel(); } },
    rlZoom: function (v) { rlState().zoom = v; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce('Text size ' + (v === 100 ? 'default.' : v + ' percent.')); },
    rlSpace: function () { var r = rlState(); r.space = !r.space; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(r.space ? 'Comfortable spacing on.' : 'Comfortable spacing off.'); },
    rlFont: function () { var r = rlState(); r.font = !r.font; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(r.font ? 'High-legibility font on.' : 'High-legibility font off.'); },
    rlTint: function (v) { rlState().tint = v; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(v === 'none' ? 'Page tint off.' : v + ' page tint on.'); },
    rlRuler: function () { var r = rlState(); r.ruler = !r.ruler; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(r.ruler ? 'Reading ruler on. Move your pointer, or hold Alt and press the up or down arrows.' : 'Reading ruler off.'); },
    rlSpeak: function () { rlSpeakToggle(); },
    rlRate: function (v) { rlState().rate = v; persist(); renderKeepScroll(); rlRefocus(); announce('Reading speed set.'); },
    closeReaderLens: function () { if (state.readerLensOpen) SOC.toggleReaderLens(); },
    readerLensPointerDown: function () {},
    readerLensKey: function () {},
    prev: goPrevious,
    go: function (s) { var target = cleanScreen(s); if (target !== state.screen) rememberPrevious(); state.navOpen = false; if (target === 'library') { state.savedView = false; } if (target === 'reading') { state.rcReading = null; state.lens = 'thematic'; } if (target === 'readings') { state.galWeek = null; state.galTopic = null; } state.screen = target; focusTarget = 'soc-main'; render(); topScroll(); },
    careerField: function (v) { state.careerField = v; persist(); render(); topScroll(); },
    lensOff: function () { state.careerField = ''; persist(); render(); },
    careerReflect: function (k, v) { state.careerReflect = state.careerReflect || {}; state.careerReflect[k] = v; persist(); },
    mediaNote: function (k, v) { state.mediaNotes = state.mediaNotes || {}; state.mediaNotes[k] = v; persist(); },
    videoWeek: function (w) { state.videoWeek = w || 'all'; render(); topScroll(); },
    mediaKind: function (k) { state.mediaKind = k || 'all'; render(); topScroll(); },
    careerLens: function () { if (state.screen !== 'career') rememberPrevious(); state.screen = 'career'; focusTarget = 'soc-main'; render(); scrollToId('career-sel'); },
    careerChoices: function () { if (state.screen !== 'career') rememberPrevious(); state.screen = 'career'; focusTarget = 'soc-main'; render(); scrollToId('career-choices'); },
    station: function (w) { w = cleanWeek(w) || w; if (state.screen !== 'station' || state.stationWeek !== w) rememberPrevious(); state.navOpen = false; state.stationWeek = w; state.journeyWeek = w; state.activityReturn = null; state.screen = 'station'; persist(); focusTarget = 'soc-main'; render(); topScroll(); },
    jumpWeek: function (w, part) { w = cleanWeek(w) || w; if (state.screen !== 'station' || state.stationWeek !== w) rememberPrevious(); state.navOpen = false; state.stationWeek = w; state.journeyWeek = w; state.activityReturn = null; state.screen = 'station'; persist(); focusTarget = 'soc-main'; render(); scrollWeekPart(part); },
    startActivity: function (s, w) { rememberPrevious(); state.activityReturn = cleanWeek(w) || w; state.screen = cleanScreen(s || 'activity'); focusTarget = 'soc-main'; render(); topScroll(); },
    wkCheck: function (k, o) {
      if (state.wkCheck[k] === o) delete state.wkCheck[k]; else state.wkCheck[k] = o;
      persist();
      var el = document.getElementById('opts-' + k); if (el) el.innerHTML = wkOptBtns(k);
      var parts = k.split('|'), w = +parts[1], d = weekData(w);
      refreshWeekChecks(w, d);
    },
    wkReflect: function (w, v) { state.wkReflect[w] = v; persist(); },
    wkClear: function (w, phase) {
      var d = weekData(w); if (!d) return;
      d.checks.forEach(function (c, i) { delete state.wkCheck[phase + '|' + w + '|' + i]; });
      persist(); refreshWeekChecks(w, d);
    },
    actPick: function (key, idx) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; state.act[key] = idx; state.actResult = state.actResult || {}; state.actResult[key] = idx; persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    actToggle: function (key) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; var val = !state.act[key]; state.act[key] = val; state.actResult = state.actResult || {}; state.actResult[key] = val; persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    actAdd: function (key, idx) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; var arr = state.act[key] || []; if (arr.indexOf(idx) < 0) arr.push(idx); state.act[key] = arr; state.actResult = state.actResult || {}; state.actResult[key] = arr.slice(); persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    actLabPick: function (key, idx, max) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; var arr = state.act[key] || [], p = arr.indexOf(idx); if (p >= 0) arr.splice(p, 1); else { if (arr.length >= max) arr.shift(); arr.push(idx); } state.act[key] = arr; state.actResult = state.actResult || {}; state.actResult[key] = arr.slice(); persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    saveWeek: function (w) {
      var d = weekData(w); if (!d) { flash('Open a week first.'); return; }
      var lab = ['New to me', 'Getting it', 'I can'];
      var rate = function (k) { var s = state.wkCheck[k]; return s == null ? '(not rated)' : lab[s]; };
      var postStat = checkStat(w, 'post', d), moved = 0;
      var checkLines = d.checks.map(function (q, i) {
        var pr = state.wkCheck['pre|' + w + '|' + i], po = state.wkCheck['post|' + w + '|' + i];
        if (pr != null && po != null && po > pr) moved++;
        return (i + 1) + '. ' + checkText(q) + '\n   Before: ' + rate('pre|' + w + '|' + i) + '   After: ' + rate('post|' + w + '|' + i);
      }).join('\n\n');
      var scoreLine = 'Where your understanding sits: after the week you can speak to ' + postStat.g.can + ' of ' + postStat.total + ' of these ideas (getting there on ' + postStat.g.getting + ', new to ' + postStat.g.newto + '), and your read moved forward on ' + moved + ' of ' + postStat.total + ' since the start.';
      var auditText = activitySummary(w, d);
      var sections = [
        { h: 'Week ' + w + ': ' + weekTitle(w), t: d.purpose },
        { h: 'Before and after, your check answers', t: scoreLine + '\n\n' + checkLines },
        { h: 'The activity: ' + d.activity.title, t: auditText },
        { h: 'Your reflection', t: (state.wkReflect[w] || '').trim() || '(not written yet)' }
      ];
      senecaDoc((D.course && D.course.code) || '', weekTitle(w) + ' (Week ' + w + ')', ['Seneca ' + ((D.course && D.course.code) || ''), 'Your week record'], sections, ((D.course && D.course.code) || '') + '_Week' + w + '_my_work');
    },
    goWeek: function (s, w) { if (state.screen !== cleanScreen(s) || state.cardWeek !== w) rememberPrevious(); state.cardWeek = w; state.screen = cleanScreen(s); focusTarget = 'soc-main'; render(); topScroll(); },
    galWeek: function (w) { var m = document.getElementById('soc-main'); var y = m ? m.scrollTop : 0; state.galWeek = (state.galWeek === w) ? null : w; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = y; },
    galTopic: function (t) { var m = document.getElementById('soc-main'); var y = m ? m.scrollTop : 0; state.galTopic = (state.galTopic === t) ? null : t; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = y; },
    galClear: function () { state.galWeek = null; state.galTopic = null; render(); },
    playVideo: function (el, id) { var box = el.closest ? el.closest('.rgvideo, .vid-frame') : el.parentNode; if (box) { box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1" title="Scholar talk" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>'; } },
    back: function () { if (state.screen !== 'library') rememberPrevious(); state.screen = 'library'; focusTarget = 'soc-main'; render(); var m = document.getElementById('soc-main'); if (m) m.scrollTop = state.libScroll || 0; },
    open: function (id) { rememberPrevious(); var m = document.getElementById('soc-main'); if (m) state.libScroll = m.scrollTop; state.screen = 'detail'; state.detailId = id; focusTarget = 'soc-main'; render(); topScroll(); },
    layout: function (l) { state.layout = l; persist(); render(); },
    sort: function (s) { state.sort = s; render(); },
    search: function (v) { state.search = v; refocusSearch = true; render(); },
    clearSearch: function () { state.search = ''; render(); },
    type: function (t) { state.activeTypes = (state.activeTypes.length === 1 && state.activeTypes[0] === t) ? [] : [t]; render(); },
    week: function (w) { if (state.screen !== 'library' || state.activeWeek !== w) rememberPrevious(); state.activeWeek = (state.activeWeek === w) ? null : w; state.savedView = false; state.screen = 'library'; focusTarget = 'soc-main'; render(); topScroll(); },
    clearFilters: function () { state.activeTypes = []; state.activeWeek = null; state.search = ''; state.savedView = false; render(); },
    dismissIntro: function () { state.introOpen = false; persist(); render(); },
    save: function (id) { var a = state.saved, i = a.indexOf(id); var msg; if (i >= 0) { a.splice(i, 1); msg = 'Removed from saved.'; } else { a.push(id); msg = 'Saved to your shelf.'; } persist(); flash(msg); },
    compare: function (id) { var a = state.compareIds, i = a.indexOf(id); if (i >= 0) { a.splice(i, 1); persist(); flash('Removed from compare.'); } else { if (a.length >= 3) { flash('Compare holds three at a time.'); return; } a.push(id); persist(); flash('Added to compare.'); } },
    clearCompare: function () { state.compareIds = []; state.showSynthesis = false; render(); },
    synthesize: function () { state.showSynthesis = true; render(); },
    hideSynthesis: function () { state.showSynthesis = false; render(); },
    setLens: function (l) { state.lens = l; render(); },
    rcPick: function (id) { state.rcReading = id; state.lens = 'thematic'; persist(); render(); topScroll(); },
    rcClear: function () { state.rcReading = null; render(); topScroll(); },
    rcNote: function (k, v) { state.rcNotes[k] = v; persist(); },
    ecoLayer: function (id) { state.ecoLayer = id; var p = document.getElementById('psy-ecopanel'); if (p) p.innerHTML = ecoLayerPanel(id); var r = document.getElementById('psy-ecorings'); if (r) r.innerHTML = ecoRingsSVG(); var c = document.getElementById('psy-ecochips'); if (c) c.innerHTML = ecoChips(); },
    ecoNote: function (id, v) { state.ecoNotes[id] = v; persist(); var L = ecoById(id), done = (v + '').trim().length > 0; var ring = document.getElementById('psy-ring-' + id); if (ring) ring.setAttribute('fill', done ? L.color : '#E8EBF0'); var c = document.getElementById('psy-ecochips'); if (c) c.innerHTML = ecoChips(); var cn = document.getElementById('psy-ecocount'); if (cn) cn.textContent = ecoCount() + ' of 5'; },
    ecoChallenge: function (v) { state.ecoChallenge = v; persist(); },
    saveResiliencePlan: function () {
      var sections = [
        { h: 'My academic challenge', t: (state.ecoChallenge || '').trim() || '(not named yet)' },
        { h: 'How to hold it', t: 'A hard stretch is a stage to move through, not a verdict (Richardson, 2011). Resilience builds across the whole ecology of resources, not from grit alone (Ungar, 2011 and 2013).' }
      ];
      ECO_LAYERS.forEach(function (L) { sections.push({ h: 'Layer ' + L.n + ', ' + L.label + ' (' + L.anchor + ')', t: (((state.ecoNotes && state.ecoNotes[L.id]) || '') + '').trim() }); });
      sections.push({ h: 'A note on support', t: 'This plan is an academic and mindset tool, not a clinical assessment. Seneca Counselling and Accessible Learning Services are available for well-being support; asking for help is a skill.' });
      senecaDoc('PSY355', 'Personal Resilience Plan', ['PSY355 Psychology of Learning: Mindset and Resilience', 'Built from your Resilience Ecology'], sections, 'PSY355_personal_resilience_plan');
    },
    rcReveal: function (k) { var m = document.getElementById('soc-main'); var top = m ? m.scrollTop : 0; state.revealed[k] = !state.revealed[k]; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    sgNote: function (k, v) { state.sgNotes = state.sgNotes || {}; state.sgNotes[k] = v; persist(); },
    sgCompare: function (k, w) { state.sgShow = state.sgShow || {}; state.sgShow[k] = !state.sgShow[k]; var sec = document.getElementById('wk-sg'); if (sec) sec.outerHTML = sgSection(w).html; },
    sgFlip: function (k, w) { state.sgFlip = state.sgFlip || {}; state.sgFlip[k] = !state.sgFlip[k]; var sec = document.getElementById('wk-sg'); if (sec) sec.outerHTML = sgSection(w).html; },
    sgTickRung: function (k, w) { state.sgTick = state.sgTick || {}; state.sgTick[k] = true; persist(); var sec = document.getElementById('wk-sg'); if (sec) sec.outerHTML = sgSection(w).html; },
    mcPick: function (k, i) {
      if (state.mcSel[k] === i) { delete state.mcSel[k]; } else { state.mcSel[k] = i; }
      var kcm = /^wk(\d+)\|kc/.exec(k);
      if (kcm) {
        var sec = document.getElementById('wk-kc');
        if (sec) { sec.outerHTML = kcSection(Number(kcm[1])).html; return; }
      }
      var m = document.getElementById('soc-main'); var top = m ? m.scrollTop : 0; var wy = window.scrollY;
      render();
      var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top;
      window.scrollTo(0, wy);
    },
    kcVer: function (w, v) { state.kcVersion = state.kcVersion || {}; state.kcVersion[w] = v; var sec = document.getElementById('wk-kc'); if (sec) { sec.outerHTML = kcSection(w).html; } },
    kcClear: function (w, v) { var pre = 'wk' + w + '|kc' + v + '|'; [state.mcSel, state.mcConf].forEach(function (map) { if (!map) return; Object.keys(map).forEach(function (k) { if (k.indexOf(pre) === 0) delete map[k]; }); }); if (state.kcReveal) delete state.kcReveal[w + '|' + v]; var sec = document.getElementById('wk-kc'); if (sec) { sec.outerHTML = kcSection(w).html; } },
    mcConf: function (k, c, w) { state.mcConf = state.mcConf || {}; if (state.mcConf[k] === c) delete state.mcConf[k]; else state.mcConf[k] = c; var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    mcPickSel: function (k, v) { v = Number(v); if (isNaN(v) || v < 0) delete state.mcSel[k]; else state.mcSel[k] = v; var kcm = /^wk(\d+)\|kc/.exec(k); if (kcm) { var sec = document.getElementById('wk-kc'); if (sec) { sec.outerHTML = kcSection(Number(kcm[1])).html; return; } } render(); },
    kcShow: function (w) { var v = (state.kcVersion && state.kcVersion[w]) || 0; state.kcReveal = state.kcReveal || {}; state.kcReveal[w + '|' + v] = true; var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    kcShortText: function (k, v) { state.kcShort = state.kcShort || {}; state.kcShort[k] = v; persist(); },
    kcShortReveal: function (k, w) { state.kcShortShown = state.kcShortShown || {}; state.kcShortShown[k] = !state.kcShortShown[k]; var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    kcShortRate: function (k, r, w) { state.kcShortRate = state.kcShortRate || {}; state.kcShortRate[k] = r; persist(); var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    mcReset: function (id) { var m = document.getElementById('soc-main'); var top = m ? m.scrollTop : 0; var keep = {}; Object.keys(state.mcSel).forEach(function (k) { if (k.indexOf(id + '|mc|') !== 0) keep[k] = state.mcSel[k]; }); state.mcSel = keep; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    saveReadingNotes: function () {
      var r = state.rcReading && rec(state.rcReading); if (!r) { flash('Pick a reading first.'); return; }
      var cc = (D.course && D.course.code) || 'Course';
      var L = (LENSES[state.lens] || LENSES.thematic).label, qs = RC_QUESTIONS[state.lens] || RC_QUESTIONS.thematic;
      var sections = qs.map(function (q, i) { return { h: q, t: (state.rcNotes[r.id + '|' + state.lens + '|' + i] || '').trim() }; });
      var mcItems = MC[r.id] || [];
      if (mcItems.length) {
        var ans = 0, cor = 0, miss = [];
        mcItems.forEach(function (m, mi) { var s = state.mcSel[r.id + '|mc|' + mi]; if (s !== undefined && s !== null) { ans++; if (s === m.answer) cor++; else miss.push(mi + 1); } });
        var head = 'Score: ' + cor + ' of ' + mcItems.length + ' correct' + (ans < mcItems.length ? ' (' + ans + ' of ' + mcItems.length + ' answered).' : '.');
        if (ans === mcItems.length) {
          var b = rcBand(cor, mcItems.length); head += '\nWhere you are: ' + b.label + '. ' + b.msg;
          var prof = rcSkillProfile(r.id, mcItems);
          if (prof.has) {
            if (prof.strengths.length) { var cb = (prof.strengths.indexOf(RC_SKILLS.argument) >= 0 && r.coreIdea) ? ' You have the central point, that ' + lcFirst(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + '.' : ''; head += '\nYour strengths: you read ' + listJoin(prof.strengths) + ' well.' + cb; }
            if (prof.opps.length) { head += '\nAreas of opportunity:'; prof.opps.forEach(function (o) { head += '\n  ' + ucFirst(o.label) + '. ' + (o.whys.length ? o.whys.join(' ') : 'Go back to this in the reading and read for it directly.'); }); }
          } else if (miss.length) head += '\nLook again at ' + numList(miss) + '.';
        }
        sections.push({ h: 'Check your understanding', t: head });
        mcItems.forEach(function (m, mi) {
          var sel = state.mcSel[r.id + '|mc|' + mi];
          var done = (sel !== undefined && sel !== null);
          var chosen = done ? (m.options[sel] || '') : '(not answered)';
          var verdict = !done ? 'Not answered.' : (sel === m.answer ? 'Correct.' : 'Not quite.');
          var t = 'Your answer: ' + chosen + '\n' + verdict;
          if (done && sel !== m.answer) t += ' The correct answer is: ' + (m.options[m.answer] || '') + '.';
          if (m.why) t += '\n' + m.why;
          sections.push({ h: (mi + 1) + '. ' + m.q, t: t });
        });
      }
      senecaDoc(cc, 'Build Your Reading Comprehension', ['Reading: ' + r.title + ' by ' + r.authors, 'Lens: ' + L], sections, cc + '_reading_comprehension');
    },
    saveStudio: function () {
      var cc = courseCode(), w = focusWeek(state.cardWeek), recs = recordsForWeek(w), sections = [], sub = [], sel = state.mcSel[cc + '|studio|' + w], checkQ = '';
      if (cc === 'SOC122') {
        var west = firstWhere(recs, function (r) { return r.eye === 'western'; }), ind = firstWhere(recs, function (r) { return r.eye === 'indigenous'; });
        if (!ind) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Two attributed eyes', 'Week ' + w];
        if (west) sections.push({ h: 'Western eye', t: west.authors + ', ' + west.title + ' (' + west.year + ')\n' + west.coreIdea });
        sections.push({ h: 'Indigenous eye', t: ind.authors + ', ' + ind.title + ' (' + ind.year + ')\n' + ind.coreIdea });
        sections.push({ h: 'Two-Eyed Seeing practice', t: 'Two-Eyed Seeing (Etuaptmumk), named by Mi\'kmaw Elder Albert Marshall. The bridge is the practice you bring, not one the app writes.' });
        checkQ = 'What is most at risk if this is treated as only a Western research-methods question?';
      } else if (cc === 'PSY355') {
        var rp = recs[0] || D.records[0]; if (!rp) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Evidence Transfer Lab', 'Week ' + w];
        sections.push({ h: 'Claim', t: rp.authors + ' (' + rp.year + '): ' + rp.coreIdea });
        sections.push({ h: 'Boundary', t: 'What this does not prove: do not turn it into a rule for every learner; check context, supports, workload, strategy, and evidence first.' });
        sections.push({ h: 'Academic transfer', t: 'One course task, one support, one study strategy, and one sign the strategy is working. No clinical framing.' });
        checkQ = 'Which next step applies the idea responsibly, without blaming the student or overstating the reading?';
      } else if (cc === 'BFS218') {
        var rb = recs[0] || D.records[0]; if (!rb) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Accountability Chain Lab', 'Week ' + w];
        sections.push({ h: 'Source anchor', t: rb.authors + ': ' + rb.coreIdea });
        sections.push({ h: 'Accountability chain', t: 'System or technology, then design or data or default, then the racialized mechanism, then harm and the institutions responsible (not one bad actor), then a response grounded in the readings.' });
        checkQ = 'Which option names the racialized mechanism, not only the outcome or intent?';
      } else { flash('Self-Check Studio save is for the course sites.'); return; }
      if (sel !== undefined && sel !== null) sections.push({ h: 'Quick check', t: 'Q: ' + checkQ + '\nYour answer was ' + (sel === 0 ? 'the grounded one. Correct.' : 'not the grounded one. Look again at what the reading actually claims.') });
      senecaDoc(cc || 'Course', 'Self-Check Studio', sub, sections, (cc || 'Course') + '_self_check_studio');
    },
    read: function (id) { var r = rec(id); var u = r && readUrl(r); if (u) { window.open(u, '_blank', 'noopener'); } else { rememberPrevious(); state.screen = 'detail'; state.detailId = id; focusTarget = 'soc-main'; render(); topScroll(); } },
    source: function (id) { var r = rec(id); var u = r && sourceUrl(r); if (u) window.open(u, '_blank', 'noopener'); },
    openSaved: function () { if (state.screen !== 'library') rememberPrevious(); state.screen = 'library'; state.activeTypes = []; state.activeWeek = null; state.search = ''; state.savedView = state.saved.length > 0; flash(state.saved.length ? 'Your saved shelf.' : 'Nothing saved yet. Tap the bookmark on any reading.'); topScroll(); },
    cardWeek: function (v) { state.cardWeek = (v === '' ? null : parseInt(v, 10)); render(); },
    glossWeek: function (v) { state.glossWeek = v; var o = document.getElementById('soc-gout'); if (o) o.innerHTML = glossaryByWeek(v); },
    glossSearch: function (v) { state.glossSearch = v; var o = document.getElementById('soc-gsearchout'); if (o) o.innerHTML = glossarySearchHTML(v); },
    glossWeekGo: function (w) { state.glossWeek = String(w); var sel = document.getElementById('soc-gweek'); if (sel) sel.value = String(w); var o = document.getElementById('soc-gout'); if (o) { o.innerHTML = glossaryByWeek(String(w)); o.scrollIntoView({ behavior: 'smooth', block: 'start' }); } },
    flip: function (el) { var c = el && (el.classList && el.classList.contains('flip') ? el : (el.closest ? el.closest('.flip') : null)); if (c) c.classList.toggle('flipped'); },
  };

  render();
  if (routePart0) scrollWeekPart(routePart0);

  /* Reading Supports boot: apply saved settings, keep them across renders, stop speech on navigation */
  try {
    var rlSaved = load();
    if (rlSaved && rlSaved.rl && typeof rlSaved.rl === 'object') state.rl = rlSaved.rl;
    rlApply();
    var rlMo = new MutationObserver(function () {
      if (rlSpeaking) rlSpeakStop();
      rlApply();
    });
    var rlMain = document.getElementById('soc-main');
    if (rlMain && rlMain.parentElement) rlMo.observe(rlMain.parentElement, { childList: true, subtree: false });
  } catch (e) {}
})();

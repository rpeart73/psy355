/* Course guide interactivity: scroll-spy, lightbox, anatomy walk. No dependencies. */
(function () {
  'use strict';

  /* scroll-spy */
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail a[href^="#"]'));
  var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
  function docTop(el) { return el.getBoundingClientRect().top + window.scrollY; }
  function spy() {
    var y = window.scrollY + 130, current = targets[0];
    targets.forEach(function (t) { if (t && docTop(t) <= y) current = t; });
    links.forEach(function (a) {
      var on = !!(current && a.getAttribute('href') === '#' + current.id);
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* lightbox */
  var lb = document.querySelector('.lightbox'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lb-cap'), lbClose = lb.querySelector('.lb-close');
  var lastFocus = null, priorOverflow = '', backgroundState = [];
  function lockGuideBackground() {
    priorOverflow = document.body.style.overflow;
    backgroundState = [];
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === lb || el.tagName === 'SCRIPT') return;
      backgroundState.push({ el: el, ariaHidden: el.getAttribute('aria-hidden'), inert: ('inert' in el) ? el.inert : false });
      el.setAttribute('aria-hidden', 'true');
      if ('inert' in el) el.inert = true;
    });
    document.body.style.overflow = 'hidden';
  }
  function unlockGuideBackground() {
    backgroundState.forEach(function (state) {
      if (!state.el || !state.el.isConnected) return;
      if (state.ariaHidden === null) state.el.removeAttribute('aria-hidden'); else state.el.setAttribute('aria-hidden', state.ariaHidden);
      if ('inert' in state.el) state.el.inert = state.inert;
    });
    backgroundState = [];
    document.body.style.overflow = priorOverflow;
  }
  document.querySelectorAll('.shot-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = img.alt;
      lastFocus = btn;
      lockGuideBackground();
      lb.hidden = false;
      lbClose.focus();
    });
  });
  function closeLb() {
    if (lb.hidden) return;
    lb.hidden = true;
    unlockGuideBackground();
    var target = lastFocus && lastFocus.isConnected ? lastFocus : document.querySelector('.rail a, .skip');
    lastFocus = null;
    if (target && target.focus) target.focus();
  }
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  function keepLightboxFocus() { if (!lb.hidden && !lb.contains(document.activeElement)) lbClose.focus(); }
  document.addEventListener('focusin', function (e) { if (!lb.hidden && !lb.contains(e.target)) lbClose.focus(); });
  window.addEventListener('blur', function () { setTimeout(keepLightboxFocus, 0); });
  document.querySelectorAll('iframe').forEach(function (frame) { frame.addEventListener('load', function () { setTimeout(keepLightboxFocus, 0); }); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); closeLb(); return; }
    if (e.key !== 'Tab') return;
    var focusable = Array.prototype.filter.call(lb.querySelectorAll('button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])'), function (el) { return !el.hidden && el.offsetParent !== null; });
    if (!focusable.length) { e.preventDefault(); lb.focus(); return; }
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === lb)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* anatomy of a week: walk-through */
  var anatomyH2 = document.getElementById('anatomy-of-a-week');
  if (anatomyH2) {
    var panel = anatomyH2.parentElement && anatomyH2.parentElement.nextElementSibling ? anatomyH2.closest('section') || anatomyH2.parentElement : null;
    /* rows are the numbered flex rows following the heading inside the warm panel */
    var scope = anatomyH2.parentElement;
    var rows = [];
    var walkBtn = document.createElement('button');
    /* find the warm panel: nearest following element that contains 10 numbered badges */
    var el = anatomyH2;
    while (el && rows.length < 10) {
      el = el.nextElementSibling;
      if (!el) break;
      var found = el.querySelectorAll ? el.querySelectorAll('div') : [];
      var candidates = Array.prototype.filter.call(found, function (d) {
        var b = d.firstElementChild;
        return b && /^(10|[1-9])$/.test((b.textContent || '').trim()) && d.children.length >= 2;
      });
      if (candidates.length >= 10) { rows = candidates.slice(0, 10); break; }
    }
    if (rows.length === 10) {
      walkBtn.className = 'anatomy-walk';
      walkBtn.type = 'button';
      walkBtn.setAttribute('aria-label', 'Walk through the ten parts of a week, one at a time');
      walkBtn.textContent = 'Walk me through a week';
      el.insertAdjacentElement('afterend', walkBtn);
      var i = -1;
      walkBtn.addEventListener('click', function () {
        rows.forEach(function (r) { r.classList.remove('row-lit'); });
        i = (i + 1) % 11;
        if (i === 10) { walkBtn.textContent = 'Walk me through a week'; i = -1; return; }
        rows[i].classList.add('row-lit');
        var reduced = false;
        try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
        rows[i].scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
        walkBtn.textContent = i < 9 ? 'Next: part ' + (i + 2) + ' of 10' : 'Done: start over';
      });
      rows.forEach(function (r) {
        r.setAttribute('tabindex', '0');
        r.addEventListener('focus', function () { rows.forEach(function (x) { x.classList.remove('row-lit'); }); r.classList.add('row-lit'); });
        r.addEventListener('blur', function () { r.classList.remove('row-lit'); });
      });
    }
  }
})();

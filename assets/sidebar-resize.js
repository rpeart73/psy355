(function () {
  'use strict';
  var baseWidth = 240;
  var maxWidth = 480;
  var storageKey = 'seneca-sidebar-width:' + new URL('.', document.currentScript.src).pathname;
  var preferredWidth = baseWidth;
  var sidebar = null;
  var handle = null;
  var drag = null;
  try {
    var saved = Number(localStorage.getItem(storageKey));
    if (Number.isFinite(saved) && saved >= baseWidth && saved <= maxWidth) preferredWidth = saved;
  } catch (error) { /* Resizing also works when browser storage is unavailable. */ }

  var style = document.createElement('style');
  style.textContent =
    '.course-sidebar-resizer{display:none}' +
    '@media(min-width:761px){' +
    '.soc-sidebar{width:var(--course-sidebar-width,240px)!important}' +
    '.course-sidebar-resizer{display:block;position:sticky;top:62px;align-self:flex-start;' +
    'flex:0 0 10px;width:10px;margin-right:-10px;height:calc(100vh - 62px);' +
    'z-index:40;cursor:col-resize;touch-action:none;outline:none}' +
    '.course-sidebar-resizer::before{content:"";position:absolute;inset:0 3px;' +
    'background:transparent;transition:background .15s}' +
    '.course-sidebar-resizer::after{content:"";position:absolute;top:42%;left:3px;' +
    'height:44px;width:4px;border-radius:4px;background:#AEB6C2}' +
    '.course-sidebar-resizer:hover::before,.course-sidebar-resizer:focus-visible::before,' +
    '.course-sidebar-dragging .course-sidebar-resizer::before{background:#F6E3E1}' +
    '.course-sidebar-resizer:hover::after,.course-sidebar-resizer:focus-visible::after,' +
    '.course-sidebar-dragging .course-sidebar-resizer::after{background:#961A13}' +
    '.course-sidebar-resizer:focus-visible::after{outline:2px solid #961A13;outline-offset:3px}' +
    '.course-sidebar-dragging,.course-sidebar-dragging *{cursor:col-resize!important;user-select:none!important}' +
    '@supports(height:100dvh){.course-sidebar-resizer{height:calc(100dvh - 62px)}}}' +
    '@media print{.course-sidebar-resizer{display:none!important}}';
  document.head.appendChild(style);

  function limit() { return Math.max(baseWidth, Math.min(maxWidth, window.innerWidth - 480)); }
  function currentWidth() { return Math.round(Math.min(preferredWidth, limit())); }
  function apply() {
    document.documentElement.style.setProperty('--course-sidebar-width', currentWidth() + 'px');
    if (!handle) return;
    handle.tabIndex = window.innerWidth > 760 ? 0 : -1;
    handle.setAttribute('aria-valuemax', limit());
    handle.setAttribute('aria-valuenow', currentWidth());
    handle.setAttribute('aria-valuetext', currentWidth() + ' pixels');
  }
  function save() {
    try { localStorage.setItem(storageKey, String(preferredWidth)); } catch (error) {}
  }
  function setWidth(width, persist) {
    preferredWidth = Math.round(Math.max(baseWidth, Math.min(limit(), width)));
    apply();
    if (persist) save();
  }
  function finish() {
    if (!drag) return;
    drag = null;
    document.documentElement.classList.remove('course-sidebar-dragging');
    save();
  }
  function mount() {
    var next = document.querySelector('.soc-sidebar');
    if (next === sidebar) return;
    finish();
    sidebar = next;
    if (handle) handle.remove();
    handle = null;
    if (!sidebar) return;
    sidebar.id = sidebar.id || 'course-navigation';
    handle = document.createElement('div');
    handle.id = 'course-sidebar-resizer';
    handle.className = 'course-sidebar-resizer';
    handle.setAttribute('role', 'separator');
    handle.setAttribute('aria-label', 'Resize course navigation');
    handle.setAttribute('aria-orientation', 'vertical');
    handle.setAttribute('aria-controls', sidebar.id);
    handle.setAttribute('aria-valuemin', baseWidth);
    handle.title = 'Drag to widen or narrow the menu. Use Left and Right arrow keys. Double-click or press Home to reset.';
    sidebar.insertAdjacentElement('afterend', handle);
    handle.addEventListener('pointerdown', function (event) {
      if (event.button !== 0 || window.innerWidth <= 760) return;
      event.preventDefault();
      handle.focus({ preventScroll: true });
      drag = { id: event.pointerId, x: event.clientX, width: currentWidth() };
      handle.setPointerCapture(event.pointerId);
      document.documentElement.classList.add('course-sidebar-dragging');
    });
    handle.addEventListener('pointermove', function (event) {
      if (drag && event.pointerId === drag.id) setWidth(drag.width + event.clientX - drag.x, false);
    });
    handle.addEventListener('pointerup', finish);
    handle.addEventListener('pointercancel', finish);
    handle.addEventListener('lostpointercapture', finish);
    handle.addEventListener('dblclick', function () { setWidth(baseWidth, true); });
    handle.addEventListener('keydown', function (event) {
      var width = currentWidth(), step = event.shiftKey ? 32 : 16;
      if (event.key === 'ArrowRight') width += step;
      else if (event.key === 'ArrowLeft') width -= step;
      else if (event.key === 'Home') width = baseWidth;
      else if (event.key === 'End') width = limit();
      else return;
      event.preventDefault();
      setWidth(width, true);
    });
    apply();
  }
  window.addEventListener('resize', function () { finish(); apply(); });
  window.addEventListener('blur', finish);
  apply();
  mount();
  var app = document.getElementById('app');
  if (app) new MutationObserver(mount).observe(app, { childList: true, subtree: true });
})();

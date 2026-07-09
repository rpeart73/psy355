/* Universal image viewer: click any content image to open; zoom, rotate, pan, reset. Self-contained, no dependencies. */
(function () {
  'use strict';
  var state = null;
  function build() {
    var ov = document.createElement('div');
    ov.id = 'imgv-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'Image viewer');
    ov.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(15,18,25,.92);display:flex;flex-direction:column;align-items:center;justify-content:center';
    var img = document.createElement('img');
    img.id = 'imgv-img';
    img.alt = '';
    img.style.cssText = 'max-width:88vw;max-height:78vh;transition:transform .12s ease;cursor:grab;user-select:none;touch-action:none';
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;gap:9px;margin-top:16px;flex-wrap:wrap;justify-content:center';
    var mk = function (label, aria, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.setAttribute('aria-label', aria);
      b.style.cssText = 'min-width:44px;min-height:40px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);color:#fff;border-radius:9px;font-size:1rem;font-weight:600;cursor:pointer;padding:6px 14px';
      b.onclick = fn;
      return b;
    };
    bar.appendChild(mk('−', 'Shrink the image', function () { zoom(1 / 1.25); }));
    bar.appendChild(mk('+', 'Enlarge the image', function () { zoom(1.25); }));
    bar.appendChild(mk('⟲', 'Rotate left', function () { rotate(-90); }));
    bar.appendChild(mk('⟳', 'Rotate right', function () { rotate(90); }));
    bar.appendChild(mk('Reset', 'Reset the view', reset));
    bar.appendChild(mk('Close', 'Close the image viewer', close));
    ov.appendChild(img);
    ov.appendChild(bar);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    img.addEventListener('wheel', function (e) { e.preventDefault(); zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15); }, { passive: false });
    var drag = null;
    img.addEventListener('pointerdown', function (e) { e.preventDefault(); drag = { x: e.clientX - state.tx, y: e.clientY - state.ty }; img.setPointerCapture(e.pointerId); img.style.cursor = 'grabbing'; });
    img.addEventListener('pointermove', function (e) { if (!drag) return; state.tx = e.clientX - drag.x; state.ty = e.clientY - drag.y; apply(); });
    img.addEventListener('pointerup', function () { drag = null; img.style.cursor = 'grab'; });
    document.body.appendChild(ov);
    return ov;
  }
  function apply() {
    var img = document.getElementById('imgv-img');
    if (img && state) img.style.transform = 'translate(' + state.tx + 'px,' + state.ty + 'px) scale(' + state.scale + ') rotate(' + state.rot + 'deg)';
  }
  function zoom(f) { if (!state) return; state.scale = Math.max(0.2, Math.min(8, state.scale * f)); apply(); }
  function rotate(d) { if (!state) return; state.rot = (state.rot + d) % 360; apply(); }
  function reset() { if (!state) return; state.scale = 1; state.rot = 0; state.tx = 0; state.ty = 0; apply(); }
  function close() {
    var ov = document.getElementById('imgv-overlay');
    if (ov) ov.remove();
    var r = state && state.returnTo;
    state = null;
    document.removeEventListener('keydown', keys, true);
    if (r && r.focus) r.focus();
  }
  function keys(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === '+' || e.key === '=') zoom(1.25);
    else if (e.key === '-') zoom(1 / 1.25);
    else if (e.key === 'r') rotate(90);
  }
  function open(src, alt, returnTo) {
    close();
    state = { scale: 1, rot: 0, tx: 0, ty: 0, returnTo: returnTo };
    var ov = build();
    var img = document.getElementById('imgv-img');
    img.src = src;
    img.alt = alt || 'Enlarged image';
    document.addEventListener('keydown', keys, true);
    ov.querySelector('button:last-child').focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    if (t.id === 'imgv-img') return;
    if (t.closest('a, button, .lightbox')) return;
    if (t.width < 60 || t.height < 60) return;
    e.preventDefault();
    open(t.currentSrc || t.src, t.alt, t);
  }, true);
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.tagName === 'IMG') {
      var t = document.activeElement;
      if (!t.closest('a, button')) { e.preventDefault(); open(t.currentSrc || t.src, t.alt, t); }
    }
  });
})();

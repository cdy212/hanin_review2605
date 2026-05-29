/**
 * erd-core.js — ERD Builder Pro
 * ERD 렌더링 엔진 (캔버스 초기화, 테이블 카드, 관계선, 팬/줌, 드래그)
 * 외부에서 init(config) 호출하여 사용
 *
 * Usage:
 *   ERDCore.init({
 *     wrapId: 'erd-canvas-wrap',    // container div id
 *     tables: [...],
 *     relations: [...],
 *     groups: [...],
 *     viewport: { scale, panX, panY },
 *     onPositionChange: (tables) => {}
 *   });
 */

window.ERDCore = (function() {

  let _tables = [], _relations = [], _groups = [];
  let _scale = 0.72, _panX = 50, _panY = 28;
  let _canvas, _wrap, _svg;
  let _tableEls = {}, _groupEls = {};
  let _selectedEntity = null;
  let _onPositionChange = null;
  const G_PAD = { top: 55, right: 30, bottom: 30, left: 30 };

  /* ─── Field Renderer ─── */
  function renderField(f) {
    const kc = f.pk ? 'pk' : f.fk ? 'fk' : f.uq ? 'uq' : '';
    const nc = f.pk ? 'pk-name' : f.fk ? 'fk-name' : '';
    const kt = f.pk ? 'PK' : f.fk ? 'FK' : f.uq ? 'UQ' : '';
    return `<div class="field-row">
      <span class="field-key ${kc}">${kt}</span>
      <span class="field-name ${nc}">${f.name}</span>
      <span class="field-type">${f.type}</span>
    </div>`;
  }

  /* ─── Group Bounds ─── */
  function updateGroupBounds() {
    _groups.forEach(g => {
      const el = _groupEls[g.id];
      if (!el) return;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      g.members.forEach(mid => {
        const t = _tableEls[mid];
        if (!t) return;
        const x = parseInt(t.style.left), y = parseInt(t.style.top);
        const w = t.offsetWidth || 245, h = t.offsetHeight || 200;
        minX = Math.min(minX, x); minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + w); maxY = Math.max(maxY, y + h);
      });
      if (minX === Infinity) return;
      el.style.left = (minX - G_PAD.left) + 'px';
      el.style.top  = (minY - G_PAD.top) + 'px';
      el.style.width  = (maxX - minX + G_PAD.left + G_PAD.right) + 'px';
      el.style.height = (maxY - minY + G_PAD.top + G_PAD.bottom) + 'px';
    });
  }

  /* ─── SVG Line Drawing ─── */
  function getBox(el) {
    const l = parseInt(el.style.left), t = parseInt(el.style.top);
    const w = el.offsetWidth, h = el.offsetHeight;
    return { l, t, w, h, cx: l + w / 2, cy: t + h / 2 };
  }
  function bestPort(a, b) {
    const dx = b.cx - a.cx, dy = b.cy - a.cy;
    let ax, ay, bx, by;
    if (Math.abs(dx) > Math.abs(dy)) {
      ax = dx > 0 ? a.l + a.w : a.l; ay = a.t + a.h / 2;
      bx = dx > 0 ? b.l : b.l + b.w; by = b.t + b.h / 2;
    } else {
      ax = a.l + a.w / 2; ay = dy > 0 ? a.t + a.h : a.t;
      bx = b.l + b.w / 2; by = dy > 0 ? b.t : b.t + b.h;
    }
    return { ax, ay, bx, by };
  }
  function curve(ax, ay, bx, by) {
    const cx = ax + (bx - ax) * 0.5;
    return `M${ax},${ay} C${cx},${ay} ${cx},${by} ${bx},${by}`;
  }

  function drawLines() {
    while (_svg.firstChild) _svg.removeChild(_svg.firstChild);
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    function mk(id, col, shape) {
      const m = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
      m.setAttribute('id', id); m.setAttribute('markerWidth', '8'); m.setAttribute('markerHeight', '8');
      m.setAttribute('refX', '6'); m.setAttribute('refY', '4'); m.setAttribute('orient', 'auto');
      let s;
      if (shape === 'arrow') {
        s = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        s.setAttribute('points', '0,0 8,4 0,8'); s.setAttribute('fill', col);
      } else {
        s = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        s.setAttribute('cx', '4'); s.setAttribute('cy', '4'); s.setAttribute('r', '3');
        s.setAttribute('fill', col);
      }
      m.appendChild(s); return m;
    }
    defs.appendChild(mk('ag', '#1a7f37', 'arrow')); defs.appendChild(mk('dg', '#1a7f37', 'dot'));
    defs.appendChild(mk('ap', '#7c3aed', 'arrow'));
    defs.appendChild(mk('ao', '#b35900', 'arrow')); defs.appendChild(mk('do', '#b35900', 'dot'));
    _svg.appendChild(defs);

    _relations.forEach(rel => {
      const fEl = _tableEls[rel.from], tEl = _tableEls[rel.to];
      if (!fEl || !tEl) return;

      let stroke, dash, me, ms;
      if (rel.type === 'many-one')  { stroke = '#1a7f37'; dash = 'none'; me = 'url(#ag)'; ms = 'url(#dg)'; }
      else if (rel.type === 'many-many') { stroke = '#7c3aed'; dash = '6,3'; me = 'url(#ap)'; ms = ''; }
      else { stroke = '#b35900'; dash = 'none'; me = 'url(#ao)'; ms = 'url(#do)'; }

      let pathD, mx, my;
      if (rel.type === 'self') {
        const c = getBox(fEl);
        const x1 = c.l + c.w, y1 = c.t + c.h * .38, x2 = c.l + c.w, y2 = c.t + c.h * .62;
        pathD = `M${x1},${y1} C${x1 + 65},${y1} ${x1 + 65},${y2} ${x2},${y2}`;
        mx = x1 + 44; my = (y1 + y2) / 2;
      } else {
        const p = bestPort(getBox(fEl), getBox(tEl));
        pathD = curve(p.ax, p.ay, p.bx, p.by);
        mx = (p.ax + p.bx) / 2; my = (p.ay + p.by) / 2;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD); path.setAttribute('stroke', stroke);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('opacity', '0.85');
      path.setAttribute('stroke-dasharray', dash);
      if (me) path.setAttribute('marker-end', me);
      if (ms) path.setAttribute('marker-start', ms);
      _svg.appendChild(path);

      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('x', mx - 16); bg.setAttribute('y', my - 18);
      bg.setAttribute('width', '32'); bg.setAttribute('height', '14');
      bg.setAttribute('rx', '4'); bg.setAttribute('fill', 'rgba(255,255,255,0.92)');
      _svg.appendChild(bg);

      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      txt.setAttribute('x', mx); txt.setAttribute('y', my - 7);
      txt.setAttribute('class', 'rel-label'); txt.setAttribute('fill', stroke);
      txt.textContent = rel.label;
      _svg.appendChild(txt);
    });
  }

  /* ─── Table Drag ─── */
  function makeDraggable(el) {
    let sx, sy, ox, oy, drag = false;
    el.addEventListener('mousedown', e => {
      if (e.target.closest('button')) return;
      drag = true; sx = e.clientX; sy = e.clientY;
      ox = parseInt(el.style.left); oy = parseInt(el.style.top);
      el.style.zIndex = 50; e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!drag) return;
      el.style.left = (ox + (e.clientX - sx) / _scale) + 'px';
      el.style.top  = (oy + (e.clientY - sy) / _scale) + 'px';
      updateGroupBounds(); drawLines();
    });
    document.addEventListener('mouseup', () => {
      if (drag) {
        drag = false; el.style.zIndex = 3;
        _syncPositions();
        if (_onPositionChange) _onPositionChange(_tables);
      }
    });
  }

  /* ─── Group Drag ─── */
  function makeGroupDraggable(headerEl, groupObj) {
    let sx, sy, drag = false;
    let initPos = [];
    headerEl.addEventListener('mousedown', e => {
      drag = true; sx = e.clientX; sy = e.clientY;
      initPos = groupObj.members.map(mid => {
        const t = _tableEls[mid];
        return t ? { el: t, ox: parseInt(t.style.left) || 0, oy: parseInt(t.style.top) || 0 } : null;
      }).filter(Boolean);
      initPos.forEach(item => { item.el.style.zIndex = 50; });
      e.preventDefault(); e.stopPropagation();
    });
    document.addEventListener('mousemove', e => {
      if (!drag) return;
      const dx = (e.clientX - sx) / _scale, dy = (e.clientY - sy) / _scale;
      initPos.forEach(item => {
        item.el.style.left = (item.ox + dx) + 'px';
        item.el.style.top  = (item.oy + dy) + 'px';
      });
      updateGroupBounds(); drawLines();
    });
    document.addEventListener('mouseup', () => {
      if (drag) {
        drag = false;
        initPos.forEach(item => { item.el.style.zIndex = 3; });
        _syncPositions();
        if (_onPositionChange) _onPositionChange(_tables);
      }
    });
  }

  /* ─── Sync positions back to data ─── */
  function _syncPositions() {
    _tables.forEach(t => {
      const el = _tableEls[t.id];
      if (el) { t.x = parseInt(el.style.left) || 0; t.y = parseInt(el.style.top) || 0; }
    });
  }

  /* ─── Pan & Zoom ─── */
  function applyTransform() {
    _canvas.style.transform = `translate(${_panX}px,${_panY}px) scale(${_scale})`;
    updateGroupBounds();
    drawLines();
  }

  function initPanZoom() {
    let panning = false, psx, psy;
    _wrap.addEventListener('mousedown', e => {
      if (e.target !== _wrap && e.target !== _canvas && e.target.id !== 'svg-lines') return;
      panning = true; psx = e.clientX - _panX; psy = e.clientY - _panY;
    });
    document.addEventListener('mousemove', e => {
      if (!panning) return;
      _panX = e.clientX - psx; _panY = e.clientY - psy; applyTransform();
    });
    document.addEventListener('mouseup', () => { panning = false; });
    _wrap.addEventListener('wheel', e => {
      e.preventDefault();
      const d = e.deltaY > 0 ? -0.08 : 0.08;
      const ns = Math.min(2, Math.max(0.2, _scale + d));
      const r = _wrap.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      _panX = mx - (mx - _panX) * (ns / _scale);
      _panY = my - (my - _panY) * (ns / _scale);
      _scale = ns; applyTransform();
    }, { passive: false });
  }

  /* ─── Public: init ─── */
  function init(config) {
    _tables = config.tables || [];
    _relations = config.relations || [];
    _groups = config.groups || [];
    _onPositionChange = config.onPositionChange || null;
    _tableEls = {}; _groupEls = {};

    const wrapId = config.wrapId || 'erd-canvas-wrap';
    _wrap = document.getElementById(wrapId);
    if (!_wrap) { console.error('ERDCore: wrap element not found:', wrapId); return; }

    // Clear
    _wrap.innerHTML = '';
    _canvas = document.createElement('div');
    _canvas.id = 'erd-canvas';
    _svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    _svg.id = 'svg-lines';
    _svg.setAttribute('width', '9000'); _svg.setAttribute('height', '7000');
    _canvas.appendChild(_svg);
    _wrap.appendChild(_canvas);

    // Viewport
    if (config.viewport) {
      _scale = config.viewport.scale || 0.72;
      _panX  = config.viewport.panX  || 50;
      _panY  = config.viewport.panY  || 28;
    }

    // Render Groups
    _groups.forEach(g => {
      const div = document.createElement('div');
      div.className = 'erd-group';
      div.id = `grp-${g.id}`;
      div.style.background = g.bgColor || 'rgba(87,96,106,0.045)';
      div.style.borderColor = g.borderColor || 'rgba(87,96,106,0.25)';
      div.innerHTML = `<div class="group-header">
        <div class="group-bar" style="background:${g.barColor || '#57606a'};"></div>
        <div>
          <span class="group-name" style="color:${g.color || '#424a53'};">${g.name}</span>
          <span class="group-name-en" style="color:${g.color || '#424a53'};">${g.nameEn || ''}</span>
        </div>
      </div>`;
      _canvas.appendChild(div);
      _groupEls[g.id] = div;
      const header = div.querySelector('.group-header');
      if (header) makeGroupDraggable(header, g);
    });

    // Render Tables
    _tables.forEach(t => {
      const div = document.createElement('div');
      div.className = `erd-table theme-${t.theme || 'gray'}`;
      div.id = `tbl-${t.id}`;
      div.style.left = (t.x || 0) + 'px';
      div.style.top  = (t.y || 0) + 'px';
      div.innerHTML = `<div class="table-header">
        <div>
          <div class="table-name">${t.name}</div>
          <div class="table-sub">${t.label || ''}</div>
        </div>
        <span class="table-tag">${t.tag || ''}</span>
      </div>
      <div class="table-fields">${(t.fields || []).map(renderField).join('')}</div>`;
      _canvas.appendChild(div);
      _tableEls[t.id] = div;
      makeDraggable(div);
    });

    initPanZoom();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      updateGroupBounds();
      applyTransform();
    }));
  }

  /* ─── Public API ─── */
  function zoomIn()    { _scale = Math.min(2, _scale + 0.1); applyTransform(); }
  function zoomOut()   { _scale = Math.max(0.2, _scale - 0.1); applyTransform(); }
  function resetView() { _scale = 0.72; _panX = 50; _panY = 28; applyTransform(); }
  function getViewport() { return { scale: _scale, panX: _panX, panY: _panY }; }
  function getTables() { _syncPositions(); return _tables; }
  function getRelations() { return _relations; }
  function getGroups() { return _groups; }

  return { init, zoomIn, zoomOut, resetView, getViewport, getTables, getRelations, getGroups };
})();

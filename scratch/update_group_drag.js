const fs = require('fs');

const htmlPath = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/erd.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. CSS changes
if (!html.includes('pointer-events: auto;') && html.includes('.group-header {')) {
    html = html.replace('.group-header {', `.group-header {
      pointer-events: auto;
      cursor: move;`);
    
    // Add resize handle to group? If we do, we need pointer-events auto on the group itself. 
    // But then the group will block clicks on the canvas behind it. 
    // It's better to keep pointer-events: none on group, and auto on header.
}

// 2. JS Drag logic
const dragLogic = `    /* ═══════════════════════════════════════════════════════
       DRAG
    ═══════════════════════════════════════════════════════ */
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
        el.style.left = (ox + (e.clientX - sx) / scale) + 'px';
        el.style.top = (oy + (e.clientY - sy) / scale) + 'px';
        updateGroupBounds(); drawLines();
      });
      document.addEventListener('mouseup', () => {
        if (drag) { drag = false; el.style.zIndex = 3; }
      });
    }

    function makeGroupDraggable(headerEl, groupObj) {
      let sx, sy, drag = false;
      let initialPositions = []; // To store initial positions of all member tables
      
      headerEl.addEventListener('mousedown', e => {
        drag = true; 
        sx = e.clientX; 
        sy = e.clientY;
        
        initialPositions = groupObj.members.map(mid => {
            const t = tableEls[mid];
            return t ? { el: t, ox: parseInt(t.style.left) || 0, oy: parseInt(t.style.top) || 0 } : null;
        }).filter(Boolean);
        
        // bring members to front
        initialPositions.forEach(item => { item.el.style.zIndex = 50; });
        e.preventDefault();
        e.stopPropagation(); // prevent panning the canvas
      });
      
      document.addEventListener('mousemove', e => {
        if (!drag) return;
        const dx = (e.clientX - sx) / scale;
        const dy = (e.clientY - sy) / scale;
        
        initialPositions.forEach(item => {
            item.el.style.left = (item.ox + dx) + 'px';
            item.el.style.top = (item.oy + dy) + 'px';
        });
        
        updateGroupBounds(); 
        drawLines();
      });
      
      document.addEventListener('mouseup', () => {
        if (drag) { 
            drag = false; 
            initialPositions.forEach(item => { item.el.style.zIndex = 3; });
        }
      });
    }`;

html = html.replace(/\/\*\s*═══════════════════════════════════════════════════════\s*DRAG\s*═══════════════════════════════════════════════════════\s*\*\/[\s\S]*?\/\*\s*═══════════════════════════════════════════════════════\s*SVG LINES\s*═══════════════════════════════════════════════════════\s*\*\//, dragLogic + '\n\n    /* ═══════════════════════════════════════════════════════\n       SVG LINES\n    ═══════════════════════════════════════════════════════ */');

// 3. Attach makeGroupDraggable to groups
const attachLogic = `      canvas.appendChild(div);
      groupEls[g.id] = div;
      
      // Attach group drag
      const header = div.querySelector('.group-header');
      if(header) {
          makeGroupDraggable(header, g);
      }`;

html = html.replace(/canvas\.appendChild\(div\);\s*groupEls\[g\.id\] = div;/, attachLogic);

// What about resizing? The user said "그룹 화면 크기 조정"
// The dynamic sizing already handles it perfectly, but if they want manual resizing, I should add CSS resize.
// Let's enable manual resizing by adding a resize handle to the group.
// But remember: if updateGroupBounds is called, it OVERWRITES width/height.
// To support manual resizing without fighting updateGroupBounds, we can just skip width/height update if the group was manually resized. But the user probably meant "dynamic resizing based on contents" which is already there. Just to be safe, I'll add "resize: both; overflow: hidden; pointer-events: auto;" to the group container. Wait, if the group has pointer-events: auto, it will block table dragging!
// Better stick to dynamic bounding box. Moving the tables moves the group, which implicitly resizes the group container bounds!

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("Updated ERD with group dragging functionality.");

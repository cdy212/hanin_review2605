/**
 * layout.js — ERD Builder Pro
 * 스마트 레이아웃 알고리즘 (관계 중심, 십자형 배치)
 */

window.ERDLayout = (function() {

  const TABLE_W = 300;
  const TABLE_H = 280;
  const GROUP_PADDING = { top: 55, right: 30, bottom: 30, left: 30 };
  const GROUP_GAP = 160;

  // Cross-pattern offsets: Center, Left, Right, Top, Bottom, TL, TR, BL, BR, ...
  const CROSS_OFFSETS = [
    [0, 0],   // 0: Center (main)
    [-1, 0],  // 1: Left
    [1, 0],   // 2: Right
    [0, -1],  // 3: Top
    [0, 1],   // 4: Bottom
    [-1, -1], // 5: Top-Left
    [1, -1],  // 6: Top-Right
    [-1, 1],  // 7: Bottom-Left
    [1, 1],   // 8: Bottom-Right
    [-2, 0],  // 9: Far-Left
    [2, 0],   // 10: Far-Right
    [0, -2],  // 11: Far-Top
    [0, 2],   // 12: Far-Bottom
    [-2, -1], [-2, 1], [2, -1], [2, 1],
    [-1, -2], [1, -2], [-1, 2], [1, 2],
    [-3, 0], [3, 0], [0, -3], [0, 3],
  ];

  /**
   * Compute degree (relation count) for each table
   */
  function computeDegrees(tables, relations) {
    const deg = {};
    tables.forEach(t => deg[t.id] = 0);
    relations.forEach(r => {
      if (deg[r.from] !== undefined) deg[r.from]++;
      if (deg[r.to] !== undefined) deg[r.to]++;
    });
    return deg;
  }

  /**
   * Layout tables within a single group using cross-pattern.
   * Most connected table goes to center (offset [0,0]).
   * Returns { minX, minY, maxX, maxY, w, h } of the group bounding box.
   */
  function layoutGroup(groupTables, degreeMap) {
    // Sort by degree descending (most connected = center)
    const sorted = [...groupTables].sort((a, b) => (degreeMap[b.id] || 0) - (degreeMap[a.id] || 0));

    let minX = 0, minY = 0, maxX = 0, maxY = 0;

    sorted.forEach((t, i) => {
      const off = CROSS_OFFSETS[i] || [Math.floor(i / 5) - 2, (i % 5) - 2];
      t._gx = off[0] * TABLE_W;
      t._gy = off[1] * TABLE_H;
      if (t._gx < minX) minX = t._gx;
      if (t._gx > maxX) maxX = t._gx;
      if (t._gy < minY) minY = t._gy;
      if (t._gy > maxY) maxY = t._gy;
    });

    return {
      tables: sorted,
      minX, minY, maxX, maxY,
      w: (maxX - minX) + TABLE_W,
      h: (maxY - minY) + TABLE_H,
      cx: (minX + maxX) / 2 + TABLE_W / 2,
      cy: (minY + maxY) / 2 + TABLE_H / 2,
    };
  }

  /**
   * Full smart layout:
   * 1. Compute degrees
   * 2. Find main group (highest total degree)
   * 3. Place main group at canvas center
   * 4. Place other groups in a circle around main group
   * 5. Apply absolute coordinates to each table
   */
  function applySmartLayout(tables, relations, groups, canvasCX, canvasCY) {
    const degreeMap = computeDegrees(tables, relations);
    const cx = canvasCX || 2000;
    const cy = canvasCY || 2000;

    // Group tables by group
    const groupTableMap = {};
    groups.forEach(g => { groupTableMap[g.id] = []; });
    const ungrouped = [];

    tables.forEach(t => {
      const g = groups.find(g => g.members.includes(t.id));
      if (g) groupTableMap[g.id].push(t);
      else ungrouped.push(t);
    });

    // Compute group scores (total degree)
    const groupScores = {};
    groups.forEach(g => {
      groupScores[g.id] = (groupTableMap[g.id] || []).reduce((s, t) => s + (degreeMap[t.id] || 0), 0);
    });

    // Sort groups by score
    const sortedGroups = [...groups].sort((a, b) => groupScores[b.id] - groupScores[a.id]);
    const mainGroup = sortedGroups[0];
    const otherGroups = sortedGroups.slice(1);

    // Layout each group internally
    const groupLayouts = {};
    groups.forEach(g => {
      groupLayouts[g.id] = layoutGroup(groupTableMap[g.id] || [], degreeMap);
    });

    // Place main group at center
    const mainLayout = groupLayouts[mainGroup.id];
    groupTableMap[mainGroup.id].forEach(t => {
      t.x = Math.round(cx + t._gx - mainLayout.cx + TABLE_W / 2);
      t.y = Math.round(cy + t._gy - mainLayout.cy + TABLE_H / 2);
    });

    // Place other groups around main group in a ring
    const mainRadius = Math.max(mainLayout.w, mainLayout.h) / 2;
    const angleStep = otherGroups.length > 0 ? (2 * Math.PI) / otherGroups.length : 0;

    otherGroups.forEach((g, i) => {
      const layout = groupLayouts[g.id];
      const groupRadius = Math.max(layout.w, layout.h) / 2;
      const radius = mainRadius + groupRadius + GROUP_GAP;
      const angle = i * angleStep;
      const gCX = cx + radius * Math.cos(angle);
      const gCY = cy + radius * Math.sin(angle);

      groupTableMap[g.id].forEach(t => {
        t.x = Math.round(gCX + t._gx - layout.cx + TABLE_W / 2);
        t.y = Math.round(gCY + t._gy - layout.cy + TABLE_H / 2);
      });
    });

    // Place ungrouped tables to the side
    ungrouped.forEach((t, i) => {
      t.x = cx + 1200 + (i % 3) * TABLE_W;
      t.y = cy - 400 + Math.floor(i / 3) * TABLE_H;
    });

    return tables;
  }

  return { applySmartLayout, computeDegrees };
})();

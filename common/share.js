/**
 * share.js — ERD Builder Pro
 * ERD 상태를 URL에 압축·인코딩하여 공유, 복원하는 유틸리티
 * LZ-String 없이 순수 JS (JSON → Base64 URL-safe 방식)
 */

window.ERDShare = (function() {

  /** ERD 전체 상태를 JSON으로 직렬화 */
  function serialize(tables, relations, groups, viewport, meta) {
    const payload = {
      v: 1, // format version
      meta: meta || {},
      tables: tables.map(t => ({
        id: t.id, name: t.name, label: t.label,
        theme: t.theme, tag: t.tag,
        x: Math.round(t.x || 0), y: Math.round(t.y || 0),
        fields: t.fields.map(f => ({
          key: f.key, name: f.name, type: f.type,
          pk: !!f.pk, fk: !!f.fk, uq: !!f.uq, nn: !!f.nn
        }))
      })),
      relations: relations.map(r => ({ from: r.from, to: r.to, type: r.type, label: r.label })),
      groups: groups.map(g => ({
        id: g.id, name: g.name, nameEn: g.nameEn,
        color: g.color, bgColor: g.bgColor,
        borderColor: g.borderColor, barColor: g.barColor,
        members: g.members
      })),
      viewport: viewport || { scale: 0.7, panX: 50, panY: 28 }
    };
    return payload;
  }

  /** JSON → URL-safe Base64 인코딩 */
  function encode(obj) {
    try {
      const json = JSON.stringify(obj);
      // UTF-8 → Base64
      const b64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      ));
      // Make URL-safe
      return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    } catch(e) {
      console.error('ERDShare.encode error:', e);
      return null;
    }
  }

  /** URL-safe Base64 → JSON 객체 */
  function decode(str) {
    try {
      // Restore Base64
      let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      const json = decodeURIComponent(atob(b64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(json);
    } catch(e) {
      console.error('ERDShare.decode error:', e);
      return null;
    }
  }

  /** 현재 페이지 URL에 ?data= 파라미터로 공유 URL 생성 */
  function buildShareURL(tables, relations, groups, viewport, meta, baseURL) {
    const payload = serialize(tables, relations, groups, viewport, meta);
    const encoded = encode(payload);
    if (!encoded) return null;
    const base = baseURL || (window.location.origin + '/common/viewer.html');
    return `${base}?data=${encoded}`;
  }

  /** URL의 ?data= 파라미터에서 ERD 상태 복원 */
  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (!data) return null;
    return decode(data);
  }

  /** 클립보드에 복사 */
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch(e) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    }
  }

  /** localStorage 버전 목록 조회 */
  function getVersionList() {
    return JSON.parse(localStorage.getItem('erd_versions') || '{}');
  }

  /** 수동 저장 버전 저장 */
  function saveVersion(name, tables, relations, groups, viewport) {
    const versions = getVersionList();
    versions[name] = {
      savedAt: new Date().toISOString(),
      payload: serialize(tables, relations, groups, viewport)
    };
    localStorage.setItem('erd_versions', JSON.stringify(versions));
  }

  /** 버전 불러오기 */
  function loadVersion(name) {
    const versions = getVersionList();
    return versions[name] ? versions[name].payload : null;
  }

  /** 버전 삭제 */
  function deleteVersion(name) {
    const versions = getVersionList();
    delete versions[name];
    localStorage.setItem('erd_versions', JSON.stringify(versions));
  }

  /** 자동 저장 (positions only) */
  function autoSavePositions(tables) {
    const pos = {};
    tables.forEach(t => { pos[t.id] = { x: t.x || 0, y: t.y || 0 }; });
    localStorage.setItem('erd_auto_positions', JSON.stringify(pos));
  }

  /** 자동 저장 위치 불러오기 */
  function loadAutoPositions() {
    return JSON.parse(localStorage.getItem('erd_auto_positions') || '{}');
  }

  return {
    serialize, encode, decode,
    buildShareURL, loadFromURL, copyToClipboard,
    getVersionList, saveVersion, loadVersion, deleteVersion,
    autoSavePositions, loadAutoPositions
  };
})();

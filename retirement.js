'use strict';
(() => {
  const config = JSON.parse(document.getElementById('transition-config').textContent);
  const message = document.getElementById('notes-message');
  const ownKey = key => key === config.skey || key.startsWith(config.skey + '.') || key === 'assignment-start-lab.v1.' + config.code || key === 'assignment-start-lab.v2.' + config.code;
  const parse = value => { try { return JSON.parse(value); } catch { return value; } };
  async function collect() {
    const result = { course: config.label, savedAt: new Date().toISOString(), local: {}, session: {}, backups: {}, limitations: [] };
    for (const [name, getStore] of [['local', () => localStorage], ['session', () => sessionStorage]]) {
      try {
        const storage = getStore();
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i);
          if (ownKey(key)) result[name][key] = parse(storage.getItem(key));
        }
      } catch { result.limitations.push(name + ' browser storage is unavailable.'); }
    }
    try {
      if (!indexedDB.databases) throw new Error('Listing saved browser databases is unavailable.');
      const databases = await indexedDB.databases();
      if (databases.some(db => db.name === 'seneca-student-notes-v1')) {
        const db = await new Promise((resolve, reject) => {
          const request = indexedDB.open('seneca-student-notes-v1');
          request.onupgradeneeded = () => { request.transaction.abort(); reject(new Error('No existing notes database.')); };
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
          request.onblocked = () => reject(new Error('Saved-note backup is currently unavailable.'));
        });
        try {
          for (const name of ['student-note-vault', 'walkthrough-notes']) {
            if (!db.objectStoreNames.contains(name)) continue;
            const saved = await new Promise((resolve, reject) => {
              const transaction = db.transaction(name, 'readonly');
              const request = transaction.objectStore(name).get(config.skey);
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error);
            });
            if (saved) result.backups[name] = saved;
          }
        } finally { db.close(); }
      }
    } catch { result.limitations.push('The separate browser backup could not be read. Any available notes are included.'); }
    return result;
  }
  function download(text, type, extension) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement('a');
    link.href = url; link.download = config.code + '-saved-notes-' + new Date().toISOString().slice(0,10) + extension;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function readable(data) {
    const lines = [config.label + ': saved browser notes', '', 'Original wording is preserved. Separate saved versions are included when available.', ''];
    const labels = { notebookNotes:'Notebook notes', wkReflect:'Weekly reflections', wkNotes:'Weekly notes', walkChapterNotes:'Walkthrough notes', sgNotes:'Study guide notes', cmpNotes:'Comparison notes', rcNotes:'Reading notes', mediaNotes:'Media notes', careerReflect:'Career reflections', kcShort:'Practice responses', contextNotes:'Context notes', synthesisNotes:'Synthesis notes', mapNotes:'Map notes', studentName:'Name', notes:'Notes', text:'Text' };
    function walk(value, path) {
      if (typeof value === 'string' && value.trim()) lines.push(path.join(' / '), value, '');
      else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) {
        if (['id','site','savedAt','updatedAt','noteVaultUpdated','client','version'].includes(key)) continue;
        walk(child, [...path, labels[key] || key]);
      }
    }
    for (const source of ['local','session','backups']) walk(data[source], [source === 'backups' ? 'Browser backup' : source === 'session' ? 'Current tab' : 'Saved on this browser']);
    if (data.limitations.length) lines.push('Storage availability', ...data.limitations);
    return lines.join('\n');
  }
  async function exportNotes(backup) {
    const buttons = [...document.querySelectorAll('button')]; buttons.forEach(b => b.disabled = true);
    message.textContent = 'Reading notes saved in this browser...';
    try {
      const data = await collect();
      const count = Object.keys(data.local).length + Object.keys(data.session).length + Object.keys(data.backups).length;
      if (!count) { message.textContent = data.limitations.length ? data.limitations.join(' ') : 'No saved notes were found in this browser. Try the browser and device you used for this course.'; return; }
      download(backup ? JSON.stringify(data,null,2) : readable(data), backup ? 'application/json' : 'text/plain;charset=utf-8', backup ? '.json' : '.txt');
      message.textContent = 'Download prepared. Your original browser notes remain unchanged.' + (data.limitations.length ? ' ' + data.limitations.join(' ') : '');
    } catch { message.textContent = 'The download could not be prepared. Your saved notes have not been changed.'; }
    finally { buttons.forEach(b => b.disabled = false); }
  }
  document.getElementById('download-notes').addEventListener('click', () => exportNotes(false));
  document.getElementById('download-backup').addEventListener('click', () => exportNotes(true));
})();

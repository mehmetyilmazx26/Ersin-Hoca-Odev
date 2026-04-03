import React, { useState, useEffect } from 'react';

const NoteWidget = () => {
  const [note, setNote] = useState(() => {
    return localStorage.getItem('smart_note') || "";
  });

  useEffect(() => {
    localStorage.setItem('smart_note', note);
  }, [note]);

  return (
    <div className="widget note-widget">
      <h3>📝 Hızlı Notlar</h3>
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)}
        placeholder="Unutmaman gerekenleri buraya yaz..."
      />
      <small>Otomatik kaydediliyor.</small>
    </div>
  );
};

export default NoteWidget;
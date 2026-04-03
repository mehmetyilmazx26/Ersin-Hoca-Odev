import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('ultra_todo_app');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    localStorage.setItem('ultra_todo_app', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (text.trim() === '') return;
    setTodos([...todos, { id: Date.now(), gorev: text, completed: false }]);
    setText('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    done: todos.filter(t => t.completed).length
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <header className="header">
          <div className="date-box">
            <h2>Görevlerim</h2>
            <p>{new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <div className="stats-badge">
            {stats.done}/{stats.total} Tamamlandı
          </div>
        </header>

        <div className="input-group">
          <input
            type="text"
            placeholder="Ne planlıyorsun?.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button onClick={handleAdd} className="add-btn">+</button>
        </div>

        <nav className="filter-nav">
          {['all', 'active', 'completed'].map(f => (
            <button 
              key={f}
              className={filter === f ? 'active' : ''} 
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Hepsi' : f === 'active' ? 'Bekleyen' : 'Biten'}
            </button>
          ))}
        </nav>

        <div className="todo-scroll-area">
          {filteredTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'is-done' : ''}`}>
              <div className="todo-main" onClick={() => toggleComplete(todo.id)}>
                <div className="custom-checkbox">
                  {todo.completed && <span className="check-mark">✓</span>}
                </div>
                <span className="todo-text">{todo.gorev}</span>
              </div>
              <button onClick={() => handleDelete(todo.id)} className="delete-icon">×</button>
            </div>
          ))}
          
          {filteredTodos.length === 0 && (
            <div className="empty-state">
              <p>Burada henüz bir şey yok...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
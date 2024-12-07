import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello, World! にゃん</h1>
      <p>これは適当なReactアプリの例にゃん。</p>
      <button
        onClick={() => alert('にゃんにゃん！ボタンがクリックされたにゃ！')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#6200ea',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Click Me にゃん
      </button>
    </div>
  );
};

export default App;

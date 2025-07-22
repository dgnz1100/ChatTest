import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      const reply = response.data.reply.trim();
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
    useEffect(() => {
        const fetchInitialMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/chat');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching initial messages:', error);
        }
        };
    
        fetchInitialMessages();
    }, []);
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Medline: For You</h2>
      <div style={{ height: 400, overflowY: 'auto', border: '1px solid #ccc', padding: '1rem', borderRadius: 8 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === 'user' ? 'right' : 'left',
              margin: '0.5rem 0',
            }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, borderRadius: '8px 0 0 8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '0 1rem',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};
axios.post('http://localhost:5000/chat', { message: 'Hello!' });

export default Chat;

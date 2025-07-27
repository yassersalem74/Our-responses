import React, { useState, useEffect } from 'react';
import './App.css'

export default function OurResponses() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://yasser-engagement.runasp.net/api/massage');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a3a283]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 bg-gray-50">
      <div className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">Messages from Loved Ones</h5>
          <span className="text-sm font-medium text-[#a3a283]">
            {messages.length} messages
          </span>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {messages.map((message, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#a3a283] flex items-center justify-center text-white font-medium">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                      {message.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
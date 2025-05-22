import React, { useState, useEffect } from 'react';
import { QueueItem } from './Queueitems';

export const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDuration, setNewDuration] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('queue');
    if (stored) {
      const parsed = JSON.parse(stored);
      const adjusted = parsed.map(item => ({
        ...item,
        startTime: new Date(item.startTime),
      }));
      setQueue(adjusted);
    } else {
      const initialQueue = sampleItems.map(item => ({
        ...item,
        startTime: new Date(),
        progress: 0,
      }));
      setQueue(initialQueue);
    }
  }, []);

  // Save to localStorage on every queue update
  useEffect(() => {
    localStorage.setItem('queue', JSON.stringify(queue));
  }, [queue]);

  // Progress update
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev =>
        prev
          .map(item => ({
            ...item,
            progress: item.progress + 1,
          }))
          .filter(item => item.progress < item.duration)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle adding new item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName || !newDuration) return;

    const newItem = {
      name: newName,
      duration: parseInt(newDuration),
      startTime: new Date(),
      progress: 0,
    };

    setQueue(prev => [...prev, newItem]);
    setNewName('');
    setNewDuration('');
  };

  return (
    <div className="flex flex-col items-center space-y-4">

      {/* Add Item Form */}
      {queue.length == 0 && (<form
        onSubmit={handleAddItem}
        className="mb-6 w-[316px] p-4 bg-gradient-to-b from-[#2f2f2f] to-[#1a1a2e] rounded-md shadow-md border border-gray-700 text-white space-y-3"
      >
        <div className="text-sm font-semibold text-gray-300 mb-2">Add New Item</div>
        
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Item Name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[#1c1c2b] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          
          <input
            type="number"
            min="1"
            placeholder="Duration (seconds)"
            value={newDuration}
            onChange={e => setNewDuration(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[#1c1c2b] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          
          <button
  type="submit"
  className="bg-gradient-to-b from-[#393838] to-[#121624] hover:brightness-110 transition-all text-white font-semibold py-2 px-4 rounded-md shadow-md text-sm border border-gray-700"
>
  ➕ Add to Queue
</button>


        </div>
      </form>)}

      {/* Render Queue */}
      {queue.map((item, index) => (
        <QueueItem key={index} item={item} index={index} progress={item.progress} />
      ))}
    </div>
  );
};

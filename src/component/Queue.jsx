import React, { useState, useEffect } from 'react';
import { QueueItem } from './Queueitems';

const sampleItems = [
  { name: 'Sample Task 1', duration: 10 },
  { name: 'Sample Task 2', duration: 15 },
];

export const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);  // track loading done
  const [newName, setNewName] = useState('');
  const [newDuration, setNewDuration] = useState('');

  // Load queue from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem('queue');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const restored = parsed.map(item => ({
          ...item,
          startTime: new Date(item.startTime),
          progress: item.progress ?? 0,
        }));
        setQueue(restored);
      } catch (error) {
        console.error('Error parsing queue from localStorage:', error);
        setQueue([]);
      }
    } else {
      // Optional: set sampleItems here or leave empty array
      setQueue([]);
    }
    setIsLoaded(true);  // mark loaded after setting queue
  }, []);

  // Save to localStorage when queue changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('queue', JSON.stringify(queue));
    }
  }, [queue, isLoaded]);

  // Progress increment every second
  useEffect(() => {
    if (!isLoaded) return; // don't start interval until loaded

    const interval = setInterval(() => {
      setQueue(prevQueue =>
        prevQueue
          .map(item => ({
            ...item,
            progress: item.progress + 1,
          }))
          .filter(item => item.progress < item.duration)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  const handleAddItem = e => {
    e.preventDefault();
    if (!newName.trim() || !newDuration) return;

    const durationNum = parseInt(newDuration);
    if (isNaN(durationNum) || durationNum <= 0) return;

    const newItem = {
      name: newName.trim(),
      duration: durationNum,
      startTime: new Date(),
      progress: 0,
    };

    setQueue(prev => [...prev, newItem]);
    setNewName('');
    setNewDuration('');
  };

  if (!isLoaded) {
    // Show loading or nothing while loading queue from localStorage
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Show form ONLY if queue is loaded and empty */}
      {queue.length === 0 && (
        <form
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
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Duration (seconds)"
              value={newDuration}
              onChange={e => setNewDuration(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#1c1c2b] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-b from-[#393838] to-[#121624] hover:brightness-110 transition-all text-white font-semibold py-2 px-4 rounded-md shadow-md text-sm border border-gray-700"
            >
              ➕ Add to Queue
            </button>
          </div>
        </form>
      )}

      {/* Render queue items */}
      {queue.map((item, index) => (
        <QueueItem key={index} item={item} index={index} progress={item.progress} />
      ))}
    </div>
  );
};

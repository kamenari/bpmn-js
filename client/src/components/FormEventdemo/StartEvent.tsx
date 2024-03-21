import React, { useState } from 'react';

interface EventFormProps {
  onSubmit: (eventName: string) => void;
}

const StartEventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [eventName, setEventName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(eventName);
    setEventName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventName">スタートイベント名:</label>
      <input
        type="text"
        id="eventName"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default StartEventForm;
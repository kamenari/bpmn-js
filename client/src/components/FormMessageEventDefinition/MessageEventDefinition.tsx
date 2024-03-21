import React, { useState } from 'react';

interface EventFormProps {
  onSubmit: (eventType: string, messageName: string) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [eventType, setEventType] = useState('');
  const [messageName, setMessageName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(eventType, messageName);
    setEventType('');
    setMessageName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventType">イベントタイプ:</label>
      <select id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)}>
        <option value="">選択してください</option>
        <option value="bpmn:StartEvent">開始イベント</option>
        <option value="bpmn:EndEvent">終了イベント</option>
        <option value="bpmn:IntermediateThrowEvent">中間イベント（投げ）</option>
        <option value="bpmn:IntermediateCatchEvent">中間イベント（受け）</option>
      </select>
      <label htmlFor="messageName">メッセージ名:</label>
      <input
        type="text"
        id="messageName"
        value={messageName}
        onChange={(e) => setMessageName(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default EventForm;
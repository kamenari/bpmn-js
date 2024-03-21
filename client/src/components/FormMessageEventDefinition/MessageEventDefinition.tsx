import React, { useState } from 'react';

// イベントフォームのプロパティを定義するインターフェース
interface EventFormProps {
  onSubmit: (eventType: string, messageName: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

// メッセージイベント定義フォームのコンポーネント
const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  // イベントタイプを管理するステート
  const [eventType, setEventType] = useState('');
  // メッセージ名を管理するステート
  const [messageName, setMessageName] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onSubmit(eventType, messageName); // 親コンポーネントに選択されたイベントタイプとメッセージ名を渡す
    setEventType(''); // イベントタイプをクリアする
    setMessageName(''); // メッセージ名をクリアする
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventType">イベントタイプ:</label>
      <select
        id="eventType"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)} // 選択値の変更を監視し、ステートを更新
      >
        <option value="">選択してください</option>
        <option value="bpmn:StartEvent">開始イベント</option>
        <option value="bpmn:EndEvent">終了イベント</option>
        <option value="bpmn:IntermediateThrowEvent">中間イベント（投げ）</option>
        <option value="bpmn:IntermediateCatchEvent">中間イベント（受け）</option>
      </select>
      <label htmlFor="messageName">メッセージ名（オプション）:</label>
      <input
        type="text"
        id="messageName"
        value={messageName}
        onChange={(e) => setMessageName(e.target.value)} // 入力値の変更を監視し、ステートを更新
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default EventForm;
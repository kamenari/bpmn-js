import React, { useState } from 'react';

// イベントフォームのプロパティを定義するインターフェース
interface EventFormProps {
  onSubmit: (eventName: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

// 中間イベント（投げ）フォームのコンポーネント
const IntermediateThrowEventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  // 中間イベント（投げ）名を管理するステート
  const [eventName, setEventName] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onSubmit(eventName); // 親コンポーネントに入力されたイベント名を渡す
    setEventName(''); // フォームをクリアする
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="eventName">中間イベント（送信）名:</label>
      <input
        type="text"
        id="eventName"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)} // 入力値の変更を監視し、ステートを更新
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default IntermediateThrowEventForm;
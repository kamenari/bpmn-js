import React, { useState } from "react";

// 参加者フォームのプロパティを定義するインターフェース
interface ParticipantFormProps {
  onSubmit: (participantName: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

// 参加者フォームのコンポーネント
const ParticipantForm: React.FC<ParticipantFormProps> = ({ onSubmit }) => {
  // 参加者名を管理するステート
  const [participantName, setParticipantName] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onSubmit(participantName); // 親コンポーネントに入力された参加者名を渡す
    setParticipantName(""); // フォームをクリアする
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="participantName">役割名:</label>
      <input
        type="text"
        id="participantName"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)} // 入力値の変更を監視し、ステートを更新
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default ParticipantForm;
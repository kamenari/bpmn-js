import React, { useState } from "react";

interface ParticipantFormProps {
  onSubmit: (participantName: string) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ onSubmit }) => {
  // 参加者名を管理するステート
  const [participantName, setParticipantName] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(participantName);
    setParticipantName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="participantName">役割名:</label>
      <input
        type="text"
        id="participantName"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default ParticipantForm;
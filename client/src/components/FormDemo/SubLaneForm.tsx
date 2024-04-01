import React, { useState } from "react";

// サブレーンフォームのプロパティを定義するインターフェース
interface SubLaneFormProps {
  onSubmit: (subLaneName: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

// サブレーンフォームのコンポーネント
const SubLaneForm: React.FC<SubLaneFormProps> = ({ onSubmit }) => {
  // サブレーン名を管理するステート
  const [subLaneName, setSubLaneName] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onSubmit(subLaneName); // 親コンポーネントに入力されたサブレーン名を渡す
    setSubLaneName(""); // フォームをクリアする
  };

  return (
    <form onSubmit={handleSubmit} className="subLaneForm">
      <label htmlFor="subLaneName">サブレーン名:</label>
      <input
        type="text"
        id="subLaneName"
        value={subLaneName}
        onChange={(e) => setSubLaneName(e.target.value)} // 入力値の変更を監視し、ステートを更新
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default SubLaneForm;
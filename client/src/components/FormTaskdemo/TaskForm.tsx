import React, { useState } from 'react';

// タスクフォームのプロパティを定義するインターフェース
interface TaskFormProps {
  onSubmit: (taskName: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

// タスクフォームのコンポーネント
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  // タスク名を管理するステート
  const [taskName, setTaskName] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onSubmit(taskName); // 親コンポーネントに入力されたタスク名を渡す
    setTaskName(''); // フォームをクリアする
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskName">タスク名:</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)} // 入力値の変更を監視し、ステートを更新
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default TaskForm;
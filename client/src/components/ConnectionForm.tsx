import React, { useState } from 'react';

// コネクションフォームのプロパティを定義するインターフェース
interface ConnectionFormProps {
  elements: Array<{ id: string; type: string; name: string }>; // 図の要素のリスト
  onSubmit: (sourceId: string, targetId: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

// コネクションフォームのコンポーネント
const ConnectionForm: React.FC<ConnectionFormProps> = ({ elements, onSubmit }) => {
  // 接続元の要素IDを管理するステート
  const [sourceId, setSourceId] = useState('');
  // 接続先の要素IDを管理するステート
  const [targetId, setTargetId] = useState('');

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onSubmit(sourceId, targetId); // 親コンポーネントに選択された接続元と接続先の要素IDを渡す
    setSourceId(''); // 接続元の要素IDをクリアする
    setTargetId(''); // 接続先の要素IDをクリアする
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="sourceId">接続元:</label>
      <select
        id="sourceId"
        value={sourceId}
        onChange={(e) => setSourceId(e.target.value)} // 選択値の変更を監視し、ステートを更新
      >
        <option value="">選択してください</option>
        {elements
          .filter((element) =>
            [
              'bpmn:StartEvent',
              'bpmn:Task',
              'bpmn:IntermediateThrowEvent',
              'bpmn:IntermediateCatchEvent',
            ].includes(element.type)
          ) // 接続可能な要素をフィルタリング
          .map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
      </select>
      <label htmlFor="targetId">接続先:</label>
      <select
        id="targetId"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)} // 選択値の変更を監視し、ステートを更新
      >
        <option value="">選択してください</option>
        {elements
          .filter((element) =>
            [
              'bpmn:Task',
              'bpmn:IntermediateThrowEvent',
              'bpmn:IntermediateCatchEvent',
              'bpmn:EndEvent',
            ].includes(element.type)
          ) // 接続可能な要素をフィルタリング
          .map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
      </select>
      <button type="submit">接続</button>
    </form>
  );
};

export default ConnectionForm;
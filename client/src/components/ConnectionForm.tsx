import React, { useState } from 'react';

// コネクションフォームのプロパティを定義するインターフェース
interface ConnectionFormProps {
  elements: Array<{ id: string; type: string; name: string }>; // 図形要素の配列（この配列から接続元と接続先の要素を選択）
  onConnect: (sourceId: string, targetId: string) => void; // 接続が行われたときに呼び出されるコールバック関数
}

// コネクションフォームのコンポーネント
const ConnectionForm: React.FC<ConnectionFormProps> = ({ elements, onConnect }) => {
  const [sourceId, setSourceId] = useState(''); // 接続元の要素IDを管理するステート
  const [targetId, setTargetId] = useState(''); // 接続先の要素IDを管理するステート

  // フォームの送信時に呼び出される関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信動作をキャンセル
    onConnect(sourceId, targetId); // 接続元と接続先の要素IDを使って接続を行う
    setSourceId(''); // 接続元の要素IDをリセット
    setTargetId(''); // 接続先の要素IDをリセット
  };

  // 接続元として有効な要素タイプの配列（この配列に含まれる要素タイプが接続元として選択可能）
  const sourceTypes = [
    'bpmn:StartEvent',
    'bpmn:Task',
    'bpmn:IntermediateThrowEvent',
    'bpmn:IntermediateCatchEvent',
    'bpmn:Event',
  ];

  // 接続先として有効な要素タイプの配列（この配列に含まれる要素タイプが接続先として選択可能）
  const targetTypes = [
    'bpmn:Task',
    'bpmn:EndEvent',
    'bpmn:IntermediateThrowEvent',
    'bpmn:IntermediateCatchEvent',
    'bpmn:Event',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="sourceId">接続元:</label>
      <select
        id="sourceId"
        value={sourceId}
        onChange={(e) => setSourceId(e.target.value)} // 接続元の要素IDを選択したときに呼び出される関数
      >
        <option value="">選択してください</option>
        {elements
          .filter((element) => sourceTypes.includes(element.type)) // 接続元として有効な要素のみをフィルタリング
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
        onChange={(e) => setTargetId(e.target.value)} // 接続先の要素IDを選択したときに呼び出される関数
      >
        <option value="">選択してください</option>
        {elements
          .filter((element) => targetTypes.includes(element.type)) // 接続先として有効な要素のみをフィルタリング
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
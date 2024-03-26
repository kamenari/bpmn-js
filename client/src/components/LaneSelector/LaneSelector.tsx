import React from 'react';

// レーンセレクターのプロパティを定義するインターフェース
interface LaneSelectorProps {
  lanes: Array<{ id: string; name: string }>; // レーンの配列
  selectedLaneId: string | null; // 選択されたレーンのID
  onLaneSelect: (laneId: string) => void; // レーン選択時に呼び出されるコールバック関数
}

// レーンセレクターのコンポーネント
const LaneSelector: React.FC<LaneSelectorProps> = ({ lanes, selectedLaneId, onLaneSelect }) => {
  return (
    <div>
      <label htmlFor="laneSelector">レーンを選択:</label>
      <select
        id="laneSelector"
        value={selectedLaneId || ''}
        onChange={(e) => onLaneSelect(e.target.value)}
      >
        <option value="">-- レーンを選択 --</option>
        {lanes.map((lane) => (
          <option key={lane.id} value={lane.id}>
            {lane.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LaneSelector;
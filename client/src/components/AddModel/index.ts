// カスタムモジュールのインポート
import CustomRenderer from './CustomRenderer';
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';

import "./addModel.css";

// カスタムモジュールをエクスポートするオブジェクト
export default {
  // 初期化時に読み込むモジュール名を指定
  __init__: ['customRenderer', 'customContextPad', 'customPalette'],
  // 各カスタムモジュールをDIコンテナに登録
  customRenderer: ['type', CustomRenderer],
  customContextPad: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette]
};
// カスタムモジュールのインポート
import CustomRenderer from './CustomRenderer';
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
import CustomTaskBehavior from './CustomTaskBehavior';

// カスタムモジュールをエクスポートするオブジェクト
export default {
  // 初期化時に読み込むモジュール名を指定
  __init__: ['customRenderer', 'customContextPad', 'customPalette', 'customTaskBehavior'],
  // 各カスタムモジュールをDIコンテナに登録
  customRenderer: ['type', CustomRenderer],
  customContextPad: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette],
  customTaskBehavior: ['type', CustomTaskBehavior]
};
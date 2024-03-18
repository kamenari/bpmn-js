import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append as svgAppend, create as svgCreate } from 'tiny-svg';
import { catGifPath } from './NyanCatData'; // 更新されたパスのインポート

// カスタムニャンキャット要素のレンダラー
export default class NyanRenderer extends BaseRenderer {
  constructor(eventBus: any) {
    super(eventBus, 1500); // BaseRendererのコンストラクタを呼び出し、描画の優先度を設定
  }

  // このレンダラーが描画できる要素タイプを判断
  canRender(element: any) {
    return element.type === 'bpmn:Event'; // ニャンキャットを描画する条件
  }
  
  // カスタムニャンキャットをSVGで描画
  drawShape(parentNode: any, element: any) {
    console.log('catGifPath', catGifPath.src);
    const catGfx = svgCreate('image', {
      x: 0,
      y: 0,
      width: element.width,
      height: element.height,
      href: catGifPath.src // 画像パスの使用
    });

    svgAppend(parentNode, catGfx);

    return catGfx; // 作成したニャンキャットのSVG要素を返す
  }
}
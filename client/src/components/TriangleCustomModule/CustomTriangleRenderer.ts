import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

const HIGH_PRIORITY = 1500; // 描画の優先度を設定

// カスタム正三角形要素のレンダラー
export default class CustomTriangleRenderer extends BaseRenderer {
  constructor(eventBus: any) {
    super(eventBus, HIGH_PRIORITY); // BaseRendererのコンストラクタを呼び出し
  }

  // このレンダラーが描画できる要素タイプを判断
  canRender(element: any) {
    return element.type === 'custom:CustomTriangle'; // カスタム正三角形の場合にtrueを返す
  }

  // カスタム正三角形をSVGで描画
  drawShape(parentNode: any, element: any) {
    const size = element.width || 100; // 正三角形の一辺の長さ、デフォルト値は100
    const height = (size * Math.sqrt(3)) / 2; // 正三角形の高さを計算

    // 正三角形の頂点座標を計算
    const x1 = element.x + size / 2;
    const y1 = element.y;
    const x2 = element.x;
    const y2 = element.y + height;
    const x3 = element.x + size;
    const y3 = element.y + height;

    // SVGのパス要素を作成して正三角形を描画
    const trianglePath = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z`;
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    triangle.setAttribute('d', trianglePath); // 描画するパスを設定
    triangle.setAttribute('fill', 'yellow'); // 正三角形の塗りつぶし色を黄色に指定
    triangle.setAttribute('stroke', 'black'); // 正三角形の枠線色を黒に指定
    triangle.setAttribute('stroke-width', '2'); // 正三角形の枠線の太さを2に指定

    parentNode.appendChild(triangle); // 親ノードに正三角形を追加
    return triangle; // 作成した正三角形のSVG要素を返す
  }
}
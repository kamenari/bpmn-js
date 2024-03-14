import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

const HIGH_PRIORITY = 1500;

export default class CustomTriangleRenderer extends BaseRenderer {
  constructor(eventBus: any) {
    super(eventBus, HIGH_PRIORITY);
  }

  canRender(element: any) {
    return element.type === 'custom:CustomTriangle';
  }

  drawShape(parentNode: any, element: any) {
    const size = element.width || 100; // 正三角形の一辺の長さ、デフォルト値は100
    const height = (size * Math.sqrt(3)) / 2; // 正三角形の高さ
  
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
    triangle.setAttribute('d', trianglePath);
    triangle.setAttribute('fill', 'yellow'); // 正三角形の塗りつぶし色を指定
    triangle.setAttribute('stroke', 'black'); // 正三角形の枠線色を指定
    triangle.setAttribute('stroke-width', '2'); // 正三角形の枠線の太さを指定
  
    parentNode.appendChild(triangle);
    return triangle;
  }
}
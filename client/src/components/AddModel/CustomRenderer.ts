import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

const HIGH_PRIORITY = 1500;

// カスタムレンダラーの定義
export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus: any, bpmnRenderer: any) {
    super(eventBus, HIGH_PRIORITY);

    // BPMNレンダラーのインスタンスを保持
    this.bpmnRenderer = bpmnRenderer;
  }

  // このレンダラーが指定された要素をレンダリングできるかどうかを判断
  canRender(element: any) {
    // ここではbpmn:Taskのみを対象とする
    return element.type === 'bpmn:Task';
  }

  // 要素の描画ロジック
  drawShape(parentNode: any, element: any) {
    // ここでSVG要素を作成し、カスタムの描画を行う
    // 例: 黄色い四角形を描画
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100');
    rect.setAttribute('height', '80');
    rect.setAttribute('fill', '#ffcc00'); // 黄色
    parentNode.appendChild(rect);
    return rect;
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];
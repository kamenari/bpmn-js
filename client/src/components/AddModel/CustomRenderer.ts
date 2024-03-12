import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

// レンダリングの優先度を設定します。この値が高いほど、他のレンダラーよりも優先して描画されます。
const HIGH_PRIORITY = 1500;

/**
 * カスタムレンダラーのクラス定義。
 * BaseRendererを継承して、特定のBPMN要素のカスタム描画を実現します。
 */
export default class CustomRenderer extends BaseRenderer {
  // bpmnRendererプロパティの宣言。BPMN要素を描画するためのデフォルトレンダラーのインスタンスを保持します。
  private bpmnRenderer: any;

  /**
   * CustomRendererクラスのコンストラクタ。
   * @param eventBus イベントを管理するためのオブジェクト。イベントの発行や購読を行います。
   * @param bpmnRenderer BPMN要素を描画するためのデフォルトレンダラーのインスタンス。
   */
  constructor(eventBus: any, bpmnRenderer: any) {
    super(eventBus, HIGH_PRIORITY);

    // BPMNレンダラーのインスタンスを保持します。
    this.bpmnRenderer = bpmnRenderer;
  }

  /**
   * このレンダラーが指定された要素をレンダリングできるかどうかを判断します。
   * @param element 現在選択されているBPMN要素
   * @returns 指定された要素がbpmn:Taskの場合にtrueを返します。
   */
  canRender(element: any) {
    // ここではbpmn:Taskのみを対象とします。
    return element.type === 'bpmn:Task';
  }

  /**
   * 要素の描画ロジックを定義します。
   * @param parentNode 要素が追加される親ノード
   * @param element 現在描画されるべきBPMN要素
   * @returns 描画されたSVG要素
   */
  drawShape(parentNode: any, element: any) {
    // SVG要素を作成し、カスタムの描画を行います。
    // 例: 黄色い四角形を描画します。
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100');
    rect.setAttribute('height', '80');
    rect.setAttribute('fill', '#ffcc00'); // 黄色を指定
    parentNode.appendChild(rect);
    return rect;
  }
}
// カスタムパレットの定義
export default class CustomPalette {
  // createとelementFactoryは、BPMN要素の作成と操作に使用されるインスタンスです。
  // これらはコンストラクタで受け取り、クラス内のメソッドからアクセスできるようにプライベートプロパティとして保存されます。
  private create: any;
  private elementFactory: any;

  /**
   * CustomPaletteクラスのコンストラクタ。
   * @param create 要素の作成に使用する関数。
   * @param elementFactory 要素のファクトリ、新しいBPMN要素のインスタンスを作成するために使用。
   * @param palette パレットインスタンス、このカスタムパレットプロバイダを登録するために使用。
   */
  constructor(create: any, elementFactory: any, palette: any) {
    this.create = create;
    this.elementFactory = elementFactory;
    // このカスタムパレットをパレットのプロバイダとして登録します。
    // これにより、BPMNエディタのパレットにカスタムエントリが追加されます。
    palette.registerProvider(this);
  }

  /**
   * パレットエントリーの取得メソッド。
   * BPMNエディタのパレットに表示されるエントリーを定義します。
   * 
   * @returns カスタムパレットエントリのオブジェクト。
   */
  getPaletteEntries = () => {
    return {
      // 'create.custom-element'はカスタムパレットエントリのキーです。
      'create.custom-element': {
        group: 'activity', // エントリを配置するパレットのグループ。
        className: 'custom-icon', // エントリのアイコンに使用するCSSクラス。
        title: 'Create Custom Element', // マウスオーバー時に表示されるツールチップテキスト。
        action: {
          // ドラッグ開始時のアクションを定義します。
          dragstart: (event: any) => {
            // 新しいBPMNタスク要素を作成します。
            const shape = this.elementFactory.createShape({ type: 'bpmn:Task' });
            // ドラッグ操作を開始します。
            this.create.start(event, shape);
          },
          // クリック時のアクションを定義します。
          click: (event: any) => {
            // キャンバス上の特定の位置に新しいBPMNタスク要素を追加します。
            const shape = this.elementFactory.createShape({ type: 'bpmn:Task' });
            // クリックされた位置に要素を追加するためのアクションを開始します。
            this.create.start(event, shape, { x: 100, y: 100 }); 
          }
        }
      }
    };
  }
}
// カスタムパレットの定義
export default class CustomPalette {
  constructor(create: any, elementFactory: any, palette: any) {
    palette.registerProvider(this);

    // パレットエントリーの取得
    this.getPaletteEntries = function() {
      return {
        'create.custom-element': {
          group: 'activity',
          className: 'custom-icon',
          title: 'Create Custom Element',
          action: {
            // ドラッグ開始時のアクション
            dragstart: function(event: any) {
              const shape = elementFactory.createShape({ type: 'bpmn:Task' });
              create.start(event, shape);
            },
            // クリック時のアクション
            click: function(event: any) {
              // キャンバスの特定の位置にエレメントを追加
              const shape = elementFactory.createShape({ type: 'bpmn:Task' });
              create.start(event, shape, { x: 100, y: 100 }); 
            }
          }
        }
      };
    };
  }
}

CustomPalette.$inject = ['create', 'elementFactory', 'palette'];
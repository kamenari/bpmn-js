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
              // カスタムエレメントの作成ロジック
            },
            // クリック時のアクション
            click: function(event: any) {
              // キャンバスの特定の位置にエレメントを追加するロジック
            }
          }
        }
      };
    };
  }
}

CustomPalette.$inject = ['create', 'elementFactory', 'palette'];
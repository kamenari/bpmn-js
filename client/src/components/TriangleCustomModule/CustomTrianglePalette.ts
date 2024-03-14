export default function CustomTrianglePalette(palette: any, create: any, elementFactory: any) {
  function createCustomTriangle(event: any) {
    // 正三角形のカスタム要素のビジネスオブジェクトを作成
    const customTriangleShape = elementFactory.createShape({
      type: 'custom:CustomTriangle',
      width: 100, // 正三角形の幅
      height: 86, // 正三角形の高さ（幅の約86%で、正三角形の高さを表す）
    });

    // イベントの位置にカスタム要素を作成
    create.start(event, customTriangleShape);
  }

  // パレットにカスタムエントリを追加
  palette.registerProvider({
    getPaletteEntries: function() {
      return {
        'create.custom-triangle': {
          group: 'activity', // エントリを追加するパレットのグループ
          className: 'icon-custom-triangle', // エントリのアイコンに使用するCSSクラス
          title: 'Create Custom Triangle', // ツールチップテキスト
          action: {
            dragstart: createCustomTriangle,
            click: createCustomTriangle
          }
        }
      };
    }
  });
}
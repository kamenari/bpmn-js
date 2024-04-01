import { catGifPath } from './NyanCatData'; // 更新されたパスのインポート

export default function NyanPaletteProvider(palette: any, create: any, elementFactory: any) {
  function createNyanCat(event: any) {
    // ニャンキャットのカスタム要素のビジネスオブジェクトを作成
    const nyanCatShape = elementFactory.createShape({
      type: 'bpmn:Event',
      width: 100, // ニャンキャットの幅
      height: 100, // ニャンキャットの高さ
    });

    // イベントの位置にカスタム要素を作成
    create.start(event, nyanCatShape);
  }

  // パレットにカスタムエントリを追加
  palette.registerProvider({
    getPaletteEntries: function() {
      return {
        'create.nyan-cat': {
          group: 'activity', // エントリを追加するパレットのグループ
          className: 'icon-nyan-cat', // エントリのアイコンに使用するCSSクラス。実際には適切なCSSを定義する必要があります。
          title: 'Create 課題', // ツールチップテキスト
          action: {
            dragstart: createNyanCat,
            click: createNyanCat
          }
        }
      };
    }
  });
}
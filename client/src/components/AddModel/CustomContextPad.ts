// カスタムコンテキストパッドの定義
export default function CustomContextPad(contextPad: any, modeling: any) {
  contextPad.registerProvider(this);

  // コンテキストパッドエントリーの取得
  this.getContextPadEntries = function(element: any) {
    return {
      'custom.action': {
        group: 'model',
        className: 'custom-icon',
        title: 'Perform a custom action',
        action: {
          // クリック時のアクション
          click: function(event: any) {
            console.log('カスタムアクションが実行されました。');
          }
        }
      }
    };
  };
}

CustomContextPad.$inject = ['contextPad', 'modeling'];
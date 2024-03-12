// カスタムコンテキストパッドのクラス定義
export default class CustomContextPad {
  /**
   * CustomContextPadクラスのコンストラクタ。
   * @param contextPad コンテキストパッドのインスタンス。このクラスをコンテキストパッドのプロバイダとして登録するために使用。
   * @param modeling モデリングのインスタンス。モデルの作成や変更を行うために使用。
   */
  constructor(private contextPad: any, private modeling: any) {
    // このクラスをコンテキストパッドのプロバイダとして登録します。
    // これにより、BPMNエディタのコンテキストパッドにカスタムエントリが追加されます。
    this.contextPad.registerProvider(this);
  }

  /**
   * コンテキストパッドエントリーの取得メソッド。
   * BPMNエディタ上で要素を選択した際に表示されるコンテキストパッドにカスタムアクションを追加します。
   * 
   * @param element 現在選択されているBPMN要素
   * @returns コンテキストパッドに追加するアクションの設定オブジェクト
   */
  getContextPadEntries = (element: any) => {
    return {
      // 'custom.action'はカスタムアクションのキーです。
      'custom.action': {
        group: 'model', // アクションを配置するコンテキストパッドのグループ。
        className: 'custom-icon', // アクションのアイコンに使用するCSSクラス。
        title: 'Perform a custom action', // マウスオーバー時に表示されるツールチップテキスト。
        action: {
          // クリック時のアクションを定義します。
          click: (event: any) => {
            // ここにカスタムアクションの実行ロジックを記述します。
            // 例えば、コンソールにメッセージを出力するなど。
            console.log('カスタムアクションが実行されました。');
          }
        }
      }
    };
  };
}
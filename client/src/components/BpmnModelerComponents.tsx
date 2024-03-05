import React, { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";

// BPMNモデラーとプロパティパネルのスタイルをインポート
import "bpmn-js/dist/assets/diagram-js.css"; // ダイアグラムの基本スタイル
import "bpmn-js/dist/assets/bpmn-js.css"; // BPMN要素のスタイル
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"; // BPMNアイコンフォントのスタイル
import "bpmn-js-properties-panel/dist/assets/properties-panel.css"; // プロパティパネルのスタイル

// BpmnViewer02コンポーネントのPropsの型定義
interface BpmnModelerComponents {
  xml: string; // 表示するBPMNダイアグラムのXMLデータ
}

const BpmnViewer02: React.FC<BpmnModelerComponents> = ({ xml }) => {
  // コンポーネントで使用するrefを作成。BPMNモデラーを表示するためのDOM要素を参照する。
  const ref = useRef<HTMLDivElement>(null);
  // BPMNモデラーのインスタンスを保持するためのref
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {
    // ref.currentが存在する場合（= div要素がDOMにマウントされている場合）、BPMNモデラーのインスタンスを作成
    if (ref.current) {
      const modeler = new BpmnModeler({
        container: ref.current, // BPMNモデラーを表示するコンテナとしてrefで指定したdiv要素を使用
        keyboard: {
          bindTo: window, // キーボードイベントをwindowオブジェクトにバインド
        },
      });

      // importXMLメソッドを使用して、propsで受け取ったXMLデータからダイアグラムを読み込む
      modeler.importXML(xml).catch((err) => {
        // XMLの読み込みに失敗した場合、エラーをコンソールに出力
        console.error("Error importing XML", err);
      });

      // modelerRefにBPMNモデラーのインスタンスを保持
      modelerRef.current = modeler;
    }
  }, [xml]); // 依存配列にxmlを指定。xmlプロパティが変更されるたびに、このuseEffect内の処理が再実行される。

  // 図の内容を出力する関数
  const exportDiagram = async () => {
    if (modelerRef.current) {
      try {
        // saveXMLメソッドを使用してBPMNモデラーの現在の状態をXML形式で保存
        const result = await modelerRef.current.saveXML({ format: true });
        // 結果をコンソールに出力
        console.log("DIAGRAM", result.xml);
        alert("Diagram exported. Check the developer tools!");
      } catch (err) {
        // XMLの保存に失敗した場合、エラーをコンソールに出力
        console.error("could not save BPMN 2.0 diagram", err);
      }
    }
  };

  return (
    <>
      {/* BPMNモデラーを表示するためのdiv要素 */}
      <div ref={ref} style={{ width: "100%", height: "600px" }}></div>
      {/* 図の内容を出力するためのボタン。クリックイベントにexportDiagram関数を指定 */}
      <button
        onClick={exportDiagram}
        style={{ position: "fixed", bottom: "20px", left: "20px" }}
      >
        print to console
      </button>
    </>
  );
};

export default BpmnViewer02;

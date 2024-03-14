/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import diagramNew from '@/components/diagramNew';
import customModules from '@/components/AddModel';
import TriangleCustomModule from '@/components/TriangleCustomModule';
import { CustomElementsModdle } from '@/components/TriangleCustomModule/CustomElementsModdle';

const modelerStyles = css`
  flex: 1;
  overflow: hidden;
  #canvas {
    height: 100vh;
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;

const modelerContainerStyles = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const saveButtonStyles = css`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface ModelerPageProps {}

// ModelerPageコンポーネント
const ModelerPage: React.FC<ModelerPageProps> = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // BpmnModelerのインスタンスを作成し、カスタムモジュールを追加
    // このインスタンスには、BPMN図を描画、編集するための機能が含まれています。
    const bpmnModeler = new BpmnModeler({
      container: canvasRef.current, // 描画対象のコンテナを指定
      // カスタムモジュールを追加。ここで定義したカスタムモジュールは、BPMN-JSの機能を拡張します。
      additionalModules: [
        customModules,
        TriangleCustomModule
      ],
      moddleExtensions: {
        custom: CustomElementsModdle
      }
    });

    // BPMN図を開く関数
    const openDiagram = async (bpmnXML: string) => {
      try {
        await bpmnModeler.importXML(bpmnXML); // BPMN図をインポート
        const canvas = bpmnModeler.get("canvas"); // キャンバスを取得
        canvas.zoom("fit-viewport"); // キャンバスを適切なサイズにズーム
      } catch (err) {
        console.error("could not import BPMN 2.0 diagram", err);
      }
    };

    // BPMN図をエクスポート関数
    // この関数は、現在のBPMN図をXML形式でエクスポートし、コンソールに出力します。
    const exportDiagram = async () => {
      try {
        const result = await bpmnModeler.saveXML({ format: true }); // XMLをフォーマットして保存
        alert("Diagram exported. Check the developer tools!");
        console.log("DIAGRAM", result.xml);
      } catch (err) {
        console.error("could not save BPMN 2.0 diagram", err);
      }
    };

    // BPMN図を開く関数を実行
    openDiagram(diagramNew);

    // bpmnを保存ボタンのイベントリスナーを設定
    // ボタンの要素を取得
    const saveButton = document.getElementById("save-button");
    // ボタンが存在する場合、イベントリスナーを設定
    if (saveButton) {
      saveButton.addEventListener("click", exportDiagram);
    }
    
    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      // bpmnModelerのインスタンスを破棄
      bpmnModeler.destroy();
      // イベントリスナーを削除
      if (saveButton) {
        saveButton.removeEventListener("click", exportDiagram);
      }
    };
  }, []);

  return (
    <div css={modelerContainerStyles}>
      {/* BPMN図を描画するための要素 */}
      <div id="canvas" ref={canvasRef} css={modelerStyles} />
      <button id="save-button" css={saveButtonStyles}>
        Print to Console
      </button>
    </div>
  );
};

export default ModelerPage;
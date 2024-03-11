/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import diagramNew from '@/components/diagramNew';
import customModules from '@/components/AddModel';

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
    // BpmnModelerのインスタンスを作成
    const bpmnModeler = new BpmnModeler({
      container: canvasRef.current,
      additionalModules: [
        customModules // カスタムモジュールを追加
      ]
    });

    // BPMN図を開く関数
    const openDiagram = async (bpmnXML: string) => {
      try {
        await bpmnModeler.importXML(bpmnXML);
        const canvas = bpmnModeler.get("canvas");
        canvas.zoom("fit-viewport");
      } catch (err) {
        console.error("could not import BPMN 2.0 diagram", err);
      }
    };

    // BPMN図をエクスポート関数
    const exportDiagram = async () => {
      try {
        const result = await bpmnModeler.saveXML({ format: true });
        alert("Diagram exported. Check the developer tools!");
        console.log("DIAGRAM", result.xml);
      } catch (err) {
        console.error("could not save BPMN 2.0 diagram", err);
      }
    };

    // BPMN図を開く関数を実行
    openDiagram(diagramNew);

    // 保存ボタンのイベントリスナーを設定
    const saveButton = document.getElementById("save-button");
    if (saveButton) {
      saveButton.addEventListener("click", exportDiagram);
    }
    
    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      bpmnModeler.destroy();
      if (saveButton) {
        saveButton.removeEventListener("click", exportDiagram);
      }
    };
  }, []);

  return (
    <div css={modelerContainerStyles}>
      <div id="canvas" ref={canvasRef} css={modelerStyles} />
      <button id="save-button" css={saveButtonStyles}>
        Print to Console
      </button>
    </div>
  );
};

export default ModelerPage;
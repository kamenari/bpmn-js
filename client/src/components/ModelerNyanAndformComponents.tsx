/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import diagramXML from "@/components/FormDemo/diagram";
import nyanRenderModule from "@/components/CustomNyan/nyanRenderModule";
import ParticipantForm from "@/components/FormDemo/ParticipantForm";

// モデラーのスタイル
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

// モデラーコンテナのスタイル
const modelerContainerStyles = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

// 保存ボタンのスタイル
const saveButtonStyles = css`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface BpmnModelerProps {
  xml: string;
  onXmlChange: (xml: string) => void;
}

const ModelerPage: React.FC<BpmnModelerProps> = ({ xml, onXmlChange }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const bpmnModelerRef = useRef<any>(null);

  useEffect(() => {
    // BPMNモデラーの初期化
    bpmnModelerRef.current = new BpmnJS({
      container: "#canvas",
      keyboard: {
        bindTo: window,
      },
      additionalModules: [nyanRenderModule],
    });

    // BPMN図の読み込み
    const openDiagram = async (bpmnXML: string) => {
      try {
        await bpmnModelerRef.current.importXML(bpmnXML);
        const canvas = bpmnModelerRef.current.get("canvas");
        const overlays = bpmnModelerRef.current.get("overlays");
        canvas.zoom("fit-viewport");
        overlays.add("SCAN_OK", "note", {
          position: { bottom: 0, right: 0 },
          html: '<div class="diagram-note">Mixed up the labels?</div>',
        });
        canvas.addMarker("SCAN_OK", "needs-discussion");
      } catch (err) {
        console.error("could not import BPMN 2.0 diagram", err);
      }
    };

    openDiagram(diagramXML);

    // コンポーネントのクリーンアップ時にモデラーを破棄
    return () => {
      bpmnModelerRef.current.destroy();
    };
  }, []);

  // BPMN図のエクスポート
  const exportDiagram = async () => {
    try {
      const result = await bpmnModelerRef.current.saveXML({ format: true });
      alert("Diagram exported. Check the developer tools!");
      console.log("DIAGRAM", result.xml);
    } catch (err) {
      console.error("could not save BPMN 2.0 diagram", err);
    }
  };

  // 参加者の追加
  const handleParticipantSubmit = async (participantName: string) => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");

      const participant = elementFactory.createParticipantShape({ name: participantName });
      await modeling.createShape(participant, { x: 50, y: 50 }, canvas.getRootElement());
    }
  };

  return (
    <div css={modelerContainerStyles}>
      {/* 参加者追加フォーム */}
      <ParticipantForm onSubmit={handleParticipantSubmit} />
      {/* BPMNモデラー */}
      <div id="canvas" ref={canvasRef} css={modelerStyles} />
      {/* 保存ボタン */}
      <button id="save-button" css={saveButtonStyles} onClick={exportDiagram}>
        Print to Console
      </button>
    </div>
  );
};

export default ModelerPage;
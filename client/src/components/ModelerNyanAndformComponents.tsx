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
import TaskForm from "@/components/FormTaskdemo/TaskForm";
import StartEvent from "@/components/FormEventdemo/StartEvent";
import EndEvent from "@/components/FormEventdemo/EndEvent";
import MessageEventDefinition from "@/components/FormMessageEventDefinition/MessageEventDefinition";

// rootWrapのスタイル
const rootWrapStyles = css`
  display: flex;
  height: 100vh;
  flex-wrap: wrap;
`;

const formStyles = css`
  width: 30%;
`;

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
  width: 70%;
  background-color: #fff;
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

      const participant = elementFactory.createParticipantShape({
        name: participantName,
      });
      await modeling.createShape(
        participant,
        { x: 50, y: 50 },
        canvas.getRootElement()
      );
    }
  };

  // タスクの追加
  const handleTaskSubmit = async (taskName: string) => {
    console.log("タスク名:", taskName);
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");

      const task = elementFactory.createShape({ type: "bpmn:Task" });
      const taskShape = await modeling.createShape(
        task,
        { x: 100, y: 100 },
        canvas.getRootElement()
      );
      modeling.updateProperties(taskShape, { name: taskName });
      console.log("タスクシェイプ:", taskShape);
    }
  };

  // スタートイベントの追加
  const handleStartEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");

      const event = elementFactory.createShape({ type: "bpmn:StartEvent" });
      const eventShape = await modeling.createShape(
        event,
        { x: 150, y: 150 },
        canvas.getRootElement()
      );
      modeling.updateProperties(eventShape, { name: eventName });
      console.log("イベントシェイプ:", eventShape);
    }
  };

  // エンドイベントの追加
  const handleEndEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");

      const event = elementFactory.createShape({ type: "bpmn:EndEvent" });
      const eventShape = await modeling.createShape(
        event,
        { x: 150, y: 150 },
        canvas.getRootElement()
      );
      modeling.updateProperties(eventShape, { name: eventName });
      console.log("イベントシェイプ:", eventShape);
    }
  };

  // イベントの追加
  const handleEventSubmit = async (eventType: string, messageName: string) => {
    console.log("イベントタイプ:", eventType);
    console.log("メッセージ名:", messageName);
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");
      const bpmnFactory = modeler.get("bpmnFactory");

      const event = elementFactory.createShape({ type: eventType });
      const eventShape = await modeling.createShape(
        event,
        { x: 150, y: 150 },
        canvas.getRootElement()
      );

      if (messageName) {
        const messageEventDefinition = bpmnFactory.create(
          "bpmn:MessageEventDefinition",
          {
            messageRef: bpmnFactory.create("bpmn:Message", {
              name: messageName,
            }),
          }
        );
        modeling.updateProperties(eventShape, {
          eventDefinitions: [messageEventDefinition],
        });
      }

      console.log("イベントシェイプ:", eventShape);
    }
  };

  return (
    <div css={rootWrapStyles}>
      <div css={modelerContainerStyles}>
        {/* BPMNモデラー */}
        <div id="canvas" ref={canvasRef} css={modelerStyles} />
        {/* 保存ボタン */}
        <button id="save-button" css={saveButtonStyles} onClick={exportDiagram}>
          Print to Console
        </button>
      </div>
      <div css={formStyles}>
        {/* 参加者追加フォーム */}
        <ParticipantForm onSubmit={handleParticipantSubmit} />
        {/* タスク追加フォーム */}
        <TaskForm onSubmit={handleTaskSubmit} />
        {/* スタートイベント追加フォーム */}
        <StartEvent onSubmit={handleStartEventSubmit} />
        {/* エンドイベント追加フォーム */}
        <EndEvent onSubmit={handleEndEventSubmit} />
        {/* メールイベント追加フォーム */}
        <MessageEventDefinition onSubmit={handleEventSubmit} />
      </div>
    </div>
  );
};

export default ModelerPage;

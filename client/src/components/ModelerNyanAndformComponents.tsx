/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
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
import ConnectionForm from "@/components/ConnectionForm";
import IntermediateThrowEventForm from "@/components/IntermediateThrowEvent/IntermediateThrowEvent";
import IntermediateCatchEventForm from "@/components/IntermediateCatchEvent/IntermediateCatchEvent";

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

// イベントフォームのプロパティを定義するインターフェース
interface EventFormProps {
  onSubmit: (eventType: string, messageName: string) => void; // フォーム送信時に呼び出されるコールバック関数
}

const ModelerPage: React.FC<BpmnModelerProps> = ({ xml, onXmlChange }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const bpmnModelerRef = useRef<any>(null);

  const [elements, setElements] = useState<
    Array<{ id: string; type: string; name: string }>
  >([]);

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

  // 接続の追加
  const handleConnectionSubmit = async (sourceId: string, targetId: string) => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementRegistry = modeler.get("elementRegistry");
      const modeling = modeler.get("modeling");

      const sourceElement = elementRegistry.get(sourceId);
      const targetElement = elementRegistry.get(targetId);

      if (sourceElement && targetElement) {
        modeling.connect(sourceElement, targetElement);
      }
    }
  };

  // 要素の追加時にelementsステートを更新
  // useEffect(() => {
  //   const modeler = bpmnModelerRef.current;
  //   if (modeler) {
  //     const elementRegistry = modeler.get("elementRegistry");
  //     const elements = elementRegistry.filter(
  //       (element: any) =>
  //         element.type === "bpmn:StartEvent" ||
  //         element.type === "bpmn:Task" ||
  //         element.type === "bpmn:EndEvent"
  //     );
  //     setElements(
  //       elements.map((element: any) => ({
  //         id: element.id,
  //         type: element.type,
  //         name: element.businessObject.name || "",
  //       }))
  //     );
  //   }
  // }, [xml]);

  // 要素リストの更新
  const updateElements = () => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementRegistry = modeler.get("elementRegistry");
      const elements = elementRegistry.filter(
        (element: any) =>
          element.type === "bpmn:StartEvent" ||
          element.type === "bpmn:Task" ||
          element.type === "bpmn:EndEvent"
      );
      setElements(
        elements.map((element: any) => ({
          id: element.id,
          type: element.type,
          name: element.businessObject.name || "",
        }))
      );
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
      setElements((prevElements) => [
        ...prevElements,
        { id: participant.id, type: participant.type, name: participantName },
      ]);
    }
    updateElements();
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
      setElements((prevElements) => [
        ...prevElements,
        { id: taskShape.id, type: "bpmn:Task", name: taskName },
      ]);
    }
    updateElements();
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
    updateElements();
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
    updateElements();
  };

  // 中間イベント（投げ）の追加
  const handleIntermediateThrowEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");
      const bpmnFactory = modeler.get("bpmnFactory");

      const event = elementFactory.createShape({
        type: "bpmn:IntermediateThrowEvent",
      });
      const eventShape = await modeling.createShape(
        event,
        { x: 150, y: 150 },
        canvas.getRootElement()
      );
      modeling.updateProperties(eventShape, { name: eventName });

      // メッセージイベント定義の追加
      const messageEventDefinition = bpmnFactory.create(
        "bpmn:MessageEventDefinition"
      );
      modeling.updateProperties(eventShape, {
        eventDefinitions: [messageEventDefinition],
      });

      console.log("イベントシェイプ:", eventShape);
    }
    updateElements();
  };

  // 中間イベント（受け）の追加
  const handleIntermediateCatchEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const canvas = modeler.get("canvas");
      const bpmnFactory = modeler.get("bpmnFactory");

      const event = elementFactory.createShape({
        type: "bpmn:IntermediateCatchEvent",
      });
      const eventShape = await modeling.createShape(
        event,
        { x: 150, y: 150 },
        canvas.getRootElement()
      );
      modeling.updateProperties(eventShape, { name: eventName });

      // メッセージイベント定義の追加
      const messageEventDefinition = bpmnFactory.create(
        "bpmn:MessageEventDefinition"
      );
      modeling.updateProperties(eventShape, {
        eventDefinitions: [messageEventDefinition],
      });

      console.log("イベントシェイプ:", eventShape);
    }
    updateElements();
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
        {/* 中間イベント（投げ）追加フォーム */}
        <IntermediateThrowEventForm
          onSubmit={handleIntermediateThrowEventSubmit}
        />
        {/* 中間イベント（受け）追加フォーム */}
        <IntermediateCatchEventForm
          onSubmit={handleIntermediateCatchEventSubmit}
        />
        <ConnectionForm elements={elements} onSubmit={handleConnectionSubmit} />
      </div>
    </div>
  );
};

export default ModelerPage;

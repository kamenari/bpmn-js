/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import diagramXML from "@/components/FormDemo/diagram";
import nyanRenderModule from "@/components/CustomNyan/nyanRenderModule";
import NyanForm from "@/components/NyanForm/NyanForm";
import ParticipantForm from "@/components/FormDemo/ParticipantForm";
import TaskForm from "@/components/FormTaskdemo/TaskForm";
import StartEvent from "@/components/FormEventdemo/StartEvent";
import EndEvent from "@/components/FormEventdemo/EndEvent";
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

  // 接続を追加する関数
  const handleConnect = async (sourceId: string, targetId: string) => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementRegistry = modeler.get("elementRegistry"); // 要素のレジストリを取得
      const modeling = modeler.get("modeling"); // モデリングのインスタンスを取得

      const sourceElement = elementRegistry.get(sourceId); // 接続元の要素を取得
      const targetElement = elementRegistry.get(targetId); // 接続先の要素を取得

      // 接続元と接続先の要素が存在し、有効な接続の組み合わせである場合に接続を行う
      if (
        sourceElement &&
        targetElement &&
        isValidConnection(sourceElement.type, targetElement.type)
      ) {
        modeling.connect(sourceElement, targetElement); // 接続を作成（ここで実際に図形要素間の接続が行われる）
      }
    }
  };

  // 有効な接続の組み合わせかどうかを判定する関数
  const isValidConnection = (sourceType: string, targetType: string) => {
    const validConnections: { [key: string]: string[] } = {
      "bpmn:StartEvent": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
      ],
      "bpmn:Task": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
      ],
      "bpmn:IntermediateThrowEvent": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
      ],
      "bpmn:IntermediateCatchEvent": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
      ],
      "bpmn:Event": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
      ],
    };

    return validConnections[sourceType]?.includes(targetType) || false; // 接続元と接続先の要素タイプが有効な組み合わせかどうかを判定
  };

  // 要素のリストを更新する関数（この関数で更新された要素のリストがConnectionFormに渡される）
  const updateElements = () => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementRegistry = modeler.get("elementRegistry"); // 要素のレジストリを取得
      const elementTypes = [
        "bpmn:StartEvent",
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:EndEvent",
        "bpmn:Event",
      ];
      const elements = elementRegistry.filter(
        (element: any) => elementTypes.includes(element.type) // 指定した要素タイプのみをフィルタリング
      );
      setElements(
        elements.map((element: any) => ({
          id: element.id,
          type: element.type,
          name:
            element.businessObject.name || element.type.replace("bpmn:", ""), // 要素の名前を取得（ない場合はタイプから生成）
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

  // ニャンキャットの追加
  const handleNyanSubmit = async () => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementFactory = modeler.get("elementFactory");
      const create = modeler.get("create");
      const canvas = modeler.get("canvas");
      const modeling = modeler.get("modeling");

      // ニャンキャットのカスタム要素のビジネスオブジェクトを作成
      const nyanCatShape = elementFactory.createShape({
        type: "bpmn:Event",
        width: 100, // ニャンキャットの幅
        height: 100, // ニャンキャットの高さ
      });

      // カスタム要素の位置を設定
      const position = {
        x: Math.floor(Math.random() * 500), // ランダムなX座標（0〜499）
        y: Math.floor(Math.random() * 500), // ランダムなY座標（0〜499）
      };

      // 指定した位置にカスタム要素を作成
      const createdShape = await modeling.createShape(
        nyanCatShape,
        position,
        canvas.getRootElement()
      );
      modeling.updateProperties(createdShape, {
        name: "Nyan Cat",
      });
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
        {/* ニャンキャット追加フォーム */}
        <NyanForm onSubmit={handleNyanSubmit} />
        <ConnectionForm elements={elements} onConnect={handleConnect} />
      </div>
    </div>
  );
};

export default ModelerPage;

/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import diagramXML from "@/components/diagram";
import nyanRenderModule from "@/components/CustomNyan/nyanRenderModule";
import NyanForm from "@/components/NyanForm/NyanForm";
import ParticipantForm from "@/components/FormDemo/ParticipantForm";
import TaskForm from "@/components/FormTaskdemo/TaskForm";
import StartEvent from "@/components/FormEventdemo/StartEvent";
import EndEvent from "@/components/FormEventdemo/EndEvent";
import ConnectionForm from "@/components/ConnectionForm";
import IntermediateThrowEventForm from "@/components/IntermediateThrowEvent/IntermediateThrowEvent";
import IntermediateCatchEventForm from "@/components/IntermediateCatchEvent/IntermediateCatchEvent";
import LaneSelector from "@/components/LaneSelector/LaneSelector";
import SubLaneForm from "@/components/FormDemo/SubLaneForm";
import { is } from "bpmn-js/lib/util/ModelUtil";
import CanvasToPDF from "@/components/CanvasToPDF/CanvasToPDF";
import { jsPDF } from "jspdf";

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

  //
  const [elements, setElements] = useState<
    Array<{ id: string; type: string; name: string }>
  >([]);

  // 選択されたレーンのIDを管理するステート
  const [selectedLaneId, setSelectedLaneId] = useState<string | null>(null);
  const handleLaneClick = (laneId: string) => {
    setSelectedLaneId(laneId);
  };
  const [lanes, setLanes] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    // BPMNモデラーの初期化
    bpmnModelerRef.current = new BpmnJS({
      container: "#canvas",
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

    // 相互作用のイベントリスナーを追加
    const eventBus = bpmnModelerRef.current.get("eventBus");
    const events = [
      "element.hover",
      "element.out",
      "element.click",
      "element.dblclick",
      "element.mousedown",
      "element.mouseup",
      "shape.move.start",
      "shape.move.end",
      "element.changed",
      "commandStack.shape.create.postExecuted",
      "commandStack.shape.delete.postExecuted",
      "commandStack.connection.create.postExecuted",
      "commandStack.connection.delete.postExecuted",
    ];

    events.forEach(function (event) {
      eventBus.on(event, function (e: any) {
        console.log("Shape created:", e);
        const element = e.element;
        if (element) {
          const elementType = element.type;
          const elementId = element.id;
          console.log(event, "on", elementId, elementType);

          // 要素の種類に応じて特定の処理を行う
          if (is(element, "bpmn:StartEvent")) {
            console.log("Start event interaction:", event, elementId);
          } else if (is(element, "bpmn:EndEvent")) {
            console.log("End event interaction:", event, elementId);
          } else if (is(element, "bpmn:Task")) {
            console.log("Task interaction:", event, elementId);
          } else if (is(element, "bpmn:Lane")) {
            console.log("Lane interaction:", event, elementId);
          } else if (is(element, "bpmn:Participant")) {
            console.log("Participant interaction:", event, elementId);
          } else if (is(element, "bpmn:IntermediateThrowEvent")) {
            console.log(
              "Intermediate throw event interaction:",
              event,
              elementId
            );
          } else if (is(element, "bpmn:IntermediateCatchEvent")) {
            console.log(
              "Intermediate catch event interaction:",
              event,
              elementId
            );
          }
        } else {
          console.log(event, "occurred without element");
        }
      });
    });

    // コンポーネントのクリーンアップ時にモデラーを破棄
    return () => {
      bpmnModelerRef.current.destroy();
    };
  }, [diagramXML]);

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
        "bpmn:EndEvent",
      ],
      "bpmn:Task": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
        "bpmn:EndEvent",
      ],
      "bpmn:IntermediateThrowEvent": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
        "bpmn:EndEvent",
      ],
      "bpmn:IntermediateCatchEvent": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
        "bpmn:EndEvent",
      ],
      "bpmn:Event": [
        "bpmn:Task",
        "bpmn:IntermediateThrowEvent",
        "bpmn:IntermediateCatchEvent",
        "bpmn:Event",
        "bpmn:EndEvent",
      ],
    };

    return validConnections[sourceType]?.includes(targetType) || false; // 接続元と接続先の要素タイプが有効な組み合わせかどうかを判定
  };

  // 要素のリストを更新する関数（この関数で更新された要素のリストがConnectionFormに渡される）
  const updateElements = () => {
    const modeler = bpmnModelerRef.current;
    if (modeler) {
      const elementRegistry = modeler.get("elementRegistry"); // 要素のレジストリを取得
      const participants = elementRegistry.filter(
        (element: any) => element.type === "bpmn:Participant"
      );
      setLanes(
        participants.map((participant: any) => ({
          id: participant.id,
          name: participant.businessObject.name || "",
        }))
      );

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
          onClick: handleLaneClick,
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
      const bpmnFactory = modeler.get("bpmnFactory");

      // 新しいプロセスを作成
      const process = bpmnFactory.create("bpmn:Process", {
        id: `Process_${Date.now()}`,
        isExecutable: false,
      });

      // 新しい参加者を作成
      const participant = bpmnFactory.create("bpmn:Participant", {
        id: `Participant_${Date.now()}`,
        name: participantName,
        processRef: process.id,
      });

      // 新しいコラボレーションを作成
      const collaboration = bpmnFactory.create("bpmn:Collaboration", {
        id: `Collaboration_${Date.now()}`,
        participants: [participant],
      });

      // ルート要素を取得
      const rootElement = canvas.getRootElement();

      // ルート要素にコラボレーションを追加
      modeling.updateProperties(rootElement, {
        businessObject: collaboration,
      });

      // 参加者シェイプを作成
      const participantShape = elementFactory.createShape({
        type: "bpmn:Participant",
        businessObject: participant,
      });

      // キャンバスの中心座標を取得
      const viewbox = canvas.viewbox();
      const centerX = viewbox.x + viewbox.width / 2;
      const centerY = viewbox.y + viewbox.height / 2;

      // 参加者シェイプをキャンバスの中心に配置
      await modeling.createShape(
        participantShape,
        { x: centerX, y: centerY },
        rootElement
      );

      setElements((prevElements) => [
        ...prevElements,
        { id: participant.id, type: participant.$type, name: participantName },
      ]);
    }
    updateElements();
  };

  // サブレーンの高さを表す定数
  const SUB_LANE_HEIGHT = 100;

  const handleAddSubLane = async (subLaneName: string) => {
    // bpmnModelerRefからmodelerインスタンスを取得
    const modeler = bpmnModelerRef.current;

    // modelerまたはselectedLaneIdが未定義の場合はエラーをログに出力して処理を終了
    if (!modeler || !selectedLaneId) {
      console.error("Modeler or selected lane is undefined.");
      return;
    }

    // modelerからelementRegistryとelementFactoryを取得
    const elementRegistry = modeler.get("elementRegistry");
    const elementFactory = modeler.get("elementFactory");

    // selectedLaneIdに対応するレーンシェイプをelementRegistryから取得
    const laneShape = elementRegistry.get(selectedLaneId);

    // レーンシェイプが未定義の場合はエラーをログに出力して処理を終了
    if (!laneShape) {
      console.error("Selected lane shape is undefined.");
      return;
    }

    // レーンシェイプの親要素であるプロセスを取得
    const process = laneShape.businessObject.$parent;

    // プロセスのlaneSetsからレーンセットを取得（最初のレーンセットを使用）
    let laneSet = process.laneSets?.[0];

    // レーンセットが存在しない場合は新しいレーンセットを作成
    if (!laneSet) {
      const bpmnFactory = modeler.get("bpmnFactory");
      laneSet = bpmnFactory.create("bpmn:LaneSet");
      process.laneSets = [laneSet];

      // modelingを使用してプロセスの子要素としてレーンセットを追加
      const modeling = modeler.get("modeling");
      modeling.updateProperties(process, {
        laneSets: [laneSet],
      });
    }

    // 新しいサブレーンを作成
    const subLane = createSubLane(modeler, laneSet, subLaneName);

    // レーンシェイプの親要素である参加者シェイプを取得
    const participantShape = elementRegistry.get(laneShape.parent.id);

    // 参加者シェイプのサイズを調整
    resizeParticipant(modeler, participantShape, SUB_LANE_HEIGHT);

    // プロセスのIDに対応するプロセスシェイプを取得
    const processShape = elementRegistry.get(process.id);

    // サブレーンのシェイプをプロセスの子要素として追加
    createSubLaneShape(
      modeler,
      elementFactory,
      subLane,
      laneShape,
      processShape
    );

    // 要素の更新を反映
    updateElements();
  };

  const createSubLane = (modeler: any, laneSet: any, subLaneName: string) => {
    // bpmnFactoryを取得
    const bpmnFactory = modeler.get("bpmnFactory");

    // 新しいサブレーンを作成
    const subLane = bpmnFactory.create("bpmn:Lane", {
      id: `Lane_${Date.now()}`,
      name: subLaneName,
    });

    // サブレーンをレーンセットに追加
    laneSet.lanes = [...(laneSet.lanes || []), subLane];

    return subLane;
  };

  const resizeParticipant = (
    modeler: any,
    participantShape: any,
    subLaneHeight: number
  ) => {
    // modelingを取得
    const modeling = modeler.get("modeling");

    // 参加者シェイプの子要素からバウンズ情報を取得
    const bounds = participantShape.children[0].di.bounds;

    // 参加者シェイプのサイズを調整
    modeling.resizeShape(participantShape, {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height + subLaneHeight,
    });
  };

  const createSubLaneShape = (
    modeler: any,
    elementFactory: any,
    subLane: any,
    laneShape: any,
    processShape: any
  ) => {
    // elementFactoryを使用して新しいサブレーンシェイプを作成
    const subLaneShape = elementFactory.createShape({
      type: "bpmn:Lane",
      businessObject: subLane,
    });

    // modelingを取得
    const modeling = modeler.get("modeling");

    // サブレーンシェイプをプロセスシェイプの子要素として追加
    modeling.createShape(
      subLaneShape,
      {
        x: laneShape.x,
        y: laneShape.y + laneShape.height,
        width: laneShape.width,
        height: SUB_LANE_HEIGHT,
      },
      processShape
    );
  };

  // タスクの追加
  const handleTaskSubmit = async (taskName: string) => {
    console.log("タスク名:", taskName);
    const modeler = bpmnModelerRef.current;
    if (modeler && selectedLaneId) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");

      const laneShape = elementRegistry.get(selectedLaneId);

      if (laneShape) {
        const task = elementFactory.createShape({ type: "bpmn:Task" });

        // レーン内の要素を取得
        const laneElements = elementRegistry.filter(
          (element: any) => element.parent === laneShape
        );

        // タスクの位置を計算
        let taskX = laneShape.x + 50; // レーンの左端から50ピクセルの位置に配置
        let taskY = laneShape.y + 50; // レーンの上端から50ピクセルの位置に配置

        if (laneElements.length > 0) {
          // レーン内に要素が存在する場合
          const lastElement = laneElements[laneElements.length - 1];
          taskX = lastElement.x + lastElement.width + 70; // 最後の要素の右端から30ピクセル右に配置
          taskY = lastElement.y; // 最後の要素と同じ高さに配置
        }

        // 指定した位置にタスクを作成
        const taskShape = await modeling.createShape(
          task,
          { x: taskX, y: taskY },
          laneShape
        );
        modeling.updateProperties(taskShape, { name: taskName });
        console.log("タスクシェイプ:", taskShape);
        setElements((prevElements) => [
          ...prevElements,
          { id: taskShape.id, type: "bpmn:Task", name: taskName },
        ]);
      }
    }
    updateElements();
  };

  // スタートイベントの追加
  const handleStartEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler && selectedLaneId) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");

      const laneShape = elementRegistry.get(selectedLaneId);

      if (laneShape) {
        const event = elementFactory.createShape({ type: "bpmn:StartEvent" });

        // スタートイベントの位置を計算
        const laneX = laneShape.x;
        const laneY = laneShape.y;
        const eventX = laneX + 60; // レーンの左端から50ピクセルの位置に配置
        const eventY = laneY + 30; // レーンの上端から50ピクセルの位置に配置

        const eventShape = await modeling.createShape(
          event,
          { x: eventX, y: eventY },
          laneShape
        );
        modeling.updateProperties(eventShape, { name: eventName });
        console.log("イベントシェイプ:", eventShape);
      }
    }
    updateElements();
  };

  // エンドイベントの追加
  const handleEndEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler && selectedLaneId) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");

      const laneShape = elementRegistry.get(selectedLaneId);

      if (laneShape) {
        const event = elementFactory.createShape({ type: "bpmn:EndEvent" });

        // エンドイベントの位置を計算
        const eventX = laneShape.x + laneShape.width - 50; // レーンの右端から50ピクセル左の位置に配置
        const eventY = laneShape.y + laneShape.height - 50; // レーンの下端から50ピクセル上の位置に配置

        // 指定した位置にエンドイベントを作成
        const eventShape = await modeling.createShape(
          event,
          { x: eventX, y: eventY },
          laneShape
        );
        modeling.updateProperties(eventShape, { name: eventName });
        console.log("イベントシェイプ:", eventShape);
      }
    }
    updateElements();
  };

  // 中間イベント（送信）の追加
  const handleIntermediateThrowEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler && selectedLaneId) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");
      const bpmnFactory = modeler.get("bpmnFactory");

      const laneShape = elementRegistry.get(selectedLaneId);

      if (laneShape) {
        const event = elementFactory.createShape({
          type: "bpmn:IntermediateThrowEvent",
        });

        // レーン内の要素を取得
        const laneElements = elementRegistry.filter(
          (element: any) => element.parent === laneShape
        );

        // 中間イベント（送信）の位置を計算
        let eventX = laneShape.x + 50; // レーンの左端から50ピクセルの位置に配置
        let eventY = laneShape.y + 70; // レーンの上端から50ピクセルの位置に配置

        if (laneElements.length > 0) {
          // レーン内に要素が存在する場合
          const lastElement = laneElements[laneElements.length - 1];
          eventX = lastElement.x + lastElement.width + 30; // 最後の要素の右端から30ピクセル右に配置
          eventY = lastElement.y; // 最後の要素と同じ高さに配置
        }

        // 指定した位置に中間イベント（送信）を作成
        const eventShape = await modeling.createShape(
          event,
          { x: eventX, y: eventY },
          laneShape
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
    }
    updateElements();
  };

  // 中間イベント（受信）の追加
  const handleIntermediateCatchEventSubmit = async (eventName: string) => {
    console.log("イベント名:", eventName);
    const modeler = bpmnModelerRef.current;
    if (modeler && selectedLaneId) {
      const elementFactory = modeler.get("elementFactory");
      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");
      const bpmnFactory = modeler.get("bpmnFactory");

      const laneShape = elementRegistry.get(selectedLaneId);

      if (laneShape) {
        const event = elementFactory.createShape({
          type: "bpmn:IntermediateCatchEvent",
        });

        // レーン内の要素を取得
        const laneElements = elementRegistry.filter(
          (element: any) => element.parent === laneShape
        );

        // 中間イベント（受信）の位置を計算
        let eventX = laneShape.x + 50; // レーンの左端から50ピクセルの位置に配置
        let eventY = laneShape.y + 50; // レーンの上端から50ピクセルの位置に配置

        if (laneElements.length > 0) {
          // レーン内に要素が存在する場合
          const lastElement = laneElements[laneElements.length - 1];
          eventX = lastElement.x + lastElement.width + 30; // 最後の要素の右端から30ピクセル右に配置
          eventY = lastElement.y; // 最後の要素と同じ高さに配置
        }

        // 指定した位置に中間イベント（受信）を作成
        const eventShape = await modeling.createShape(
          event,
          { x: eventX, y: eventY },
          laneShape
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
    }
    updateElements();
  };

  // ニャンキャットの追加
  const handleNyanSubmit = async () => {
    const modeler = bpmnModelerRef.current;
    if (modeler && selectedLaneId) {
      const elementFactory = modeler.get("elementFactory");
      const create = modeler.get("create");
      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");

      const laneShape = elementRegistry.get(selectedLaneId);

      if (laneShape) {
        // ニャンキャットのカスタム要素のビジネスオブジェクトを作成
        const nyanCatShape = elementFactory.createShape({
          type: "bpmn:Event",
          width: 36, // ニャンキャットの幅
          height: 36, // ニャンキャットの高さ
        });

        // レーン内の要素を取得
        const laneElements = elementRegistry.filter(
          (element: any) => element.parent === laneShape
        );

        // ニャンキャットの位置を計算
        const laneX = laneShape.x;
        let nyanCatX = laneX + 50; // レーンの左端から50ピクセルの位置に配置
        let nyanCatY = laneShape.y + 50; // レーンの上端から50ピクセルの位置に配置

        if (laneElements.length > 0) {
          // レーン内に要素が存在する場合
          const lastElement = laneElements[laneElements.length - 1];
          nyanCatX = lastElement.x + lastElement.width + 50; // 最後の要素の右端から30ピクセル右に配置
          nyanCatY = lastElement.y; // 最後の要素と同じ高さに配置
        }

        // 指定した位置にニャンキャットを作成
        const createdShape = await modeling.createShape(
          nyanCatShape,
          { x: nyanCatX, y: nyanCatY },
          laneShape
        );
        modeling.updateProperties(createdShape, {
          name: "課題",
        });
      }
    }
    updateElements();
  };

  // BPMNのXMLデータを取得する関数
  const getBpmnXml = async () => {
    try {
      const result = await bpmnModelerRef.current.saveXML({ format: true });
      return result.xml;
    } catch (err) {
      console.error("could not save BPMN 2.0 diagram", err);
      throw err;
    }
  };

  const handleExportPdf = async () => {
    if (bpmnModelerRef.current && canvasRef.current) {
      try {
        console.log("ビューアのサイズを取得");
        const canvas = bpmnModelerRef.current.get("canvas");
        const viewportElement = canvas._svg.querySelector(".viewport");
        const viewportBBox = viewportElement.getBoundingClientRect();
        const viewportWidth = viewportBBox.width;
        const viewportHeight = viewportBBox.height;
  
        console.log("PDFドキュメントを作成");
        const scale = 6; // 解像度を設定
        const pdf = new jsPDF("l", "px", [
          viewportWidth * scale,
          viewportHeight * scale,
        ]);
  
        console.log("SVGをキャンバスに変換");
        const svgResult = await bpmnModelerRef.current.saveSVG();
        const svgString = svgResult.svg;
        const svgData = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
        const svgImage = new Image();
        svgImage.src = svgData;
  
        await new Promise<void>((resolve) => {
          svgImage.onload = async () => {
            const canvas = document.createElement("canvas");
            const canvasWidth = viewportWidth * scale;
            const canvasHeight = viewportHeight * scale;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const context = canvas.getContext("2d");
            
            if (context) {
              context.scale(scale, scale);
              context.drawImage(svgImage, 0, 0, viewportWidth, viewportHeight);
  
              console.log("キャンバスをPDFに追加");
              const imgData = canvas.toDataURL("image/png");
              pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                viewportWidth * scale,
                viewportHeight * scale
              );
  
              console.log("PDFをダウンロード");
              pdf.save("diagram.pdf");
              console.log("PDFのダウンロードが完了しました");
              resolve();
            } else {
              console.error("2Dレンダリングコンテキストの取得に失敗しました。");
              resolve();
            }
          };
        });
      } catch (err) {
        console.error("BPMN図のPDF変換エラー:", err);
      }
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
        {/* PDFダウンロードボタン */}
        <CanvasToPDF onExportPdf={handleExportPdf} />
      </div>
      <div css={formStyles}>
        {/* 参加者追加フォーム */}
        <ParticipantForm onSubmit={handleParticipantSubmit} />
        {/* レーンセレクター */}
        <LaneSelector
          lanes={lanes}
          selectedLaneId={selectedLaneId}
          onLaneSelect={setSelectedLaneId}
        />
        {/* サブレーン追加フォーム */}
        <SubLaneForm onSubmit={handleAddSubLane} />
        {/* スタートイベント追加フォーム */}
        <StartEvent
          onSubmit={handleStartEventSubmit}
          disabled={!selectedLaneId}
        />
        {/* タスク追加フォーム */}
        <TaskForm onSubmit={handleTaskSubmit} />
        {/* 中間イベント（送信）追加フォーム */}
        <IntermediateThrowEventForm
          onSubmit={handleIntermediateThrowEventSubmit}
        />
        {/* 中間イベント（受信）追加フォーム */}
        <IntermediateCatchEventForm
          onSubmit={handleIntermediateCatchEventSubmit}
        />
        {/* ニャンキャット追加フォーム */}
        <NyanForm onSubmit={handleNyanSubmit} />
        {/* エンドイベント追加フォーム */}
        <EndEvent onSubmit={handleEndEventSubmit} />
        {/* コネクションフォーム */}
        <ConnectionForm elements={elements} onConnect={handleConnect} />
      </div>
    </div>
  );
};

export default ModelerPage;

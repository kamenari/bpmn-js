/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";

const modelerStyles = css`
  flex: 1;
  overflow: hidden;

  #canvas {
    height: 100vh;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .diagram-note {
    background-color: rgba(66, 180, 21, 0.7);
    color: White;
    border-radius: 5px;
    font-family: Arial;
    font-size: 12px;
    padding: 5px;
    min-height: 16px;
    width: 50px;
    text-align: center;
  }

  .needs-discussion:not(.djs-connection) .djs-visual > :nth-child(1) {
    stroke: rgba(66, 180, 21, 0.7) !important;
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

const ModelerPage: React.FC<ModelerPageProps> = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const diagramUrl =
      "https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn";

    const bpmnModeler = new BpmnJS({
      container: "#canvas",
      keyboard: {
        bindTo: window,
      },
    });

    const openDiagram = async (bpmnXML: string) => {
      try {
        await bpmnModeler.importXML(bpmnXML);
        const canvas = bpmnModeler.get("canvas");
        const overlays = bpmnModeler.get("overlays");
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

    const exportDiagram = async () => {
      try {
        const result = await bpmnModeler.saveXML({ format: true });
        alert("Diagram exported. Check the developer tools!");
        console.log("DIAGRAM", result.xml);
      } catch (err) {
        console.error("could not save BPMN 2.0 diagram", err);
      }
    };

    fetch(diagramUrl)
      .then((response) => response.text())
      .then((bpmnXML) => openDiagram(bpmnXML));

    const saveButton = document.getElementById("save-button");
    if (saveButton) {
      saveButton.addEventListener("click", exportDiagram);
    }

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

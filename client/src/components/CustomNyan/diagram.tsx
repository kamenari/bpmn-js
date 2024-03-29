// なにもない状態のXML
const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_1quc928</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1quc928" sourceRef="StartEvent_1" targetRef="Event_1agxens" />
    <bpmn:task id="Task_09ghys8">
      <bpmn:incoming>SequenceFlow_1uxr9e7</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0x9ulme</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_045lzom">
      <bpmn:incoming>SequenceFlow_0x9ulme</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0x9ulme" sourceRef="Task_09ghys8" targetRef="EndEvent_045lzom" />
    <bpmn:Event id="Event_1agxens">
      <bpmn:incoming>SequenceFlow_1quc928</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1uxr9e7</bpmn:outgoing>
    </bpmn:Event>
    <bpmn:sequenceFlow id="SequenceFlow_1uxr9e7" sourceRef="Event_1agxens" targetRef="Task_09ghys8" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1quc928_di" bpmnElement="SequenceFlow_1quc928">
        <di:waypoint xsi:type="dc:Point" x="209" y="120" />
        <di:waypoint xsi:type="dc:Point" x="351" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="235" y="110" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_09ghys8_di" bpmnElement="Task_09ghys8">
        <dc:Bounds x="571" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_045lzom_di" bpmnElement="EndEvent_045lzom">
        <dc:Bounds x="794" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="767" y="138" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0x9ulme_di" bpmnElement="SequenceFlow_0x9ulme">
        <di:waypoint xsi:type="dc:Point" x="671" y="120" />
        <di:waypoint xsi:type="dc:Point" x="794" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="794.5" y="110" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_1agxens_di" bpmnElement="Event_1agxens">
        <dc:Bounds x="351" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1uxr9e7_di" bpmnElement="SequenceFlow_1uxr9e7">
        <di:waypoint xsi:type="dc:Point" x="451" y="120" />
        <di:waypoint xsi:type="dc:Point" x="571" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="476" y="110" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export default diagramXML;

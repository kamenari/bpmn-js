const qaXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:qa="http://some-company/schema/bpmn/qa" id="_RdgBELNaEeSYkoSLDs6j-w" targetNamespace="http://activiti.org/bpmn">
  <bpmn2:process id="Process_1">
    <bpmn2:task id="Task_1" name="Examine Situation" qa:suitable="0.7">
      <bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
      <bpmn2:extensionElements>
        <qa:analysisDetails lastChecked="2019-03-27T13:59:37.098Z" nextCheck="2019-03-28T13:59:37.098Z">
          <qa:comment author="Klaus">
            Our operators always have a hard time to figure out, what they need to do here.
          </qa:comment>
          <qa:comment author="Walter">
            I believe this can be split up in a number of activities and partly automated.
          </qa:comment>
        </qa:analysisDetails>
      </bpmn2:extensionElements>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="SequenceFlow_1" name="" sourceRef="Task_1" targetRef="ExclusiveGateway_1"/>
    <bpmn2:exclusiveGateway id="ExclusiveGateway_1" name="Things OK?">
      <bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_2</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_5</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_2" name="" sourceRef="ExclusiveGateway_1" targetRef="EndEvent_1"/>
    <bpmn2:sequenceFlow id="SequenceFlow_5" name="" sourceRef="ExclusiveGateway_1" targetRef="EndEvent_2"/>
    <bpmn2:endEvent id="EndEvent_1" name="Notification Sent">
      <bpmn2:incoming>SequenceFlow_2</bpmn2:incoming>
      <bpmn2:messageEventDefinition id="MessageEventDefinition_1"/>
    </bpmn2:endEvent>
    <bpmn2:endEvent id="EndEvent_2" name="Error Propagated">
      <bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
      <bpmn2:errorEventDefinition id="ErrorEventDefinition_1"/>
    </bpmn2:endEvent>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_Task_2" bpmnElement="Task_1">
        <dc:Bounds height="80.0" width="100.0" x="96.0" y="196.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="_BPMNShape_EndEvent_2" bpmnElement="EndEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="396.0" y="300.0"/>
        <bpmndi:BPMNLabel>
          <dc:Bounds height="0.0" width="0.0" x="414.0" y="341.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="_BPMNShape_ExclusiveGateway_2" bpmnElement="ExclusiveGateway_1" isMarkerVisible="true">
        <dc:Bounds height="50.0" width="50.0" x="276.0" y="210.0"/>
        <bpmndi:BPMNLabel>
          <dc:Bounds height="21.0" width="74.0" x="333.0" y="226.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_1" bpmnElement="SequenceFlow_1" sourceElement="_BPMNShape_Task_2" targetElement="_BPMNShape_ExclusiveGateway_2">
        <di:waypoint xsi:type="dc:Point" x="196.0" y="236.0"/>
        <di:waypoint xsi:type="dc:Point" x="276.0" y="235.0"/>
        <bpmndi:BPMNLabel>
          <dc:Bounds height="6.0" width="6.0" x="214.0" y="236.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_2" bpmnElement="SequenceFlow_2" sourceElement="_BPMNShape_ExclusiveGateway_2" targetElement="_BPMNShape_EndEvent_2">
        <di:waypoint xsi:type="dc:Point" x="301.0" y="260.0"/>
        <di:waypoint xsi:type="dc:Point" x="301.0" y="318.0"/>
        <di:waypoint xsi:type="dc:Point" x="396.0" y="318.0"/>
        <bpmndi:BPMNLabel>
          <dc:Bounds height="6.0" width="6.0" x="298.0" y="301.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_EndEvent_3" bpmnElement="EndEvent_2">
        <dc:Bounds height="36.0" width="36.0" x="396.0" y="132.0"/>
        <bpmndi:BPMNLabel>
          <dc:Bounds height="0.0" width="0.0" x="414.0" y="173.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_5" bpmnElement="SequenceFlow_5" sourceElement="_BPMNShape_ExclusiveGateway_2" targetElement="_BPMNShape_EndEvent_3">
        <di:waypoint xsi:type="dc:Point" x="301.0" y="210.0"/>
        <di:waypoint xsi:type="dc:Point" x="301.0" y="150.0"/>
        <di:waypoint xsi:type="dc:Point" x="396.0" y="150.0"/>
        <bpmndi:BPMNLabel>
          <dc:Bounds height="6.0" width="6.0" x="333.0" y="150.0"/>
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

export default qaXML;

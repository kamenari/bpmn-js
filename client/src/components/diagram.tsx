const diagramXML = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:collaboration id="Collaboration_0t7kphs">
    <bpmn2:participant id="Participant_1712112753306" name="フェーズ1" processRef="Process_0zupafh" />
  </bpmn2:collaboration>
  <bpmn2:process id="Process_0zupafh" businessObject="[object Object]">
    <bpmn2:laneSet id="LaneSet_0uvqs6r">
      <bpmn2:lane id="Lane_1i7wvlq" name="レーン１">
        <bpmn2:flowNodeRef>Event_1um7fpe</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1s61iwu</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0017uaw</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1bw3gt0</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0qbg89c</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_11zmfgp</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0sq8eji</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0b0ib0h</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0iteco4</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0ztz8e2</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_18jh5j1</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1r766m6</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1pqejm1</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0gwmd0t</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1jvwj6f</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_08vm3v8</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0u0wwgd</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1aij4bw</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_10bw0io</bpmn2:flowNodeRef>
      </bpmn2:lane>
      <bpmn2:lane id="Lane_1h7rpfc" name="レーン2">
        <bpmn2:flowNodeRef>Activity_16x33ne</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0tv4y9j</bpmn2:flowNodeRef>
      </bpmn2:lane>
      <bpmn2:lane id="Lane_03e8iu6">
        <bpmn2:flowNodeRef>Event_1nbpvcd</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_13fc8yf</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0qgq34n</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0gm4u5q</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_0cuvl2l</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1yb8281</bpmn2:flowNodeRef>
        <bpmn2:flowNodeRef>Activity_1rf41wh</bpmn2:flowNodeRef>
      </bpmn2:lane>
    </bpmn2:laneSet>
    <bpmn2:startEvent id="Event_1um7fpe">
      <bpmn2:outgoing>Flow_01kfoco</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:task id="Activity_1s61iwu">
      <bpmn2:incoming>Flow_01kfoco</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1ggzele</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_01kfoco" sourceRef="Event_1um7fpe" targetRef="Activity_1s61iwu" />
    <bpmn2:task id="Activity_0017uaw">
      <bpmn2:incoming>Flow_1ggzele</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1gqblsk</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1ggzele" sourceRef="Activity_1s61iwu" targetRef="Activity_0017uaw" />
    <bpmn2:task id="Activity_1bw3gt0">
      <bpmn2:incoming>Flow_1gqblsk</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1e42b9g</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1gqblsk" sourceRef="Activity_0017uaw" targetRef="Activity_1bw3gt0" />
    <bpmn2:task id="Activity_0qbg89c">
      <bpmn2:incoming>Flow_1e42b9g</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0jhy5a5</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1e42b9g" sourceRef="Activity_1bw3gt0" targetRef="Activity_0qbg89c" />
    <bpmn2:task id="Activity_11zmfgp">
      <bpmn2:incoming>Flow_0jhy5a5</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1ycu0bd</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_0jhy5a5" sourceRef="Activity_0qbg89c" targetRef="Activity_11zmfgp" />
    <bpmn2:task id="Activity_0sq8eji">
      <bpmn2:incoming>Flow_1ycu0bd</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1j9sp9z</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1ycu0bd" sourceRef="Activity_11zmfgp" targetRef="Activity_0sq8eji" />
    <bpmn2:task id="Activity_0b0ib0h">
      <bpmn2:incoming>Flow_1j9sp9z</bpmn2:incoming>
      <bpmn2:outgoing>Flow_17v1bl6</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1j9sp9z" sourceRef="Activity_0sq8eji" targetRef="Activity_0b0ib0h" />
    <bpmn2:task id="Activity_0iteco4">
      <bpmn2:incoming>Flow_17v1bl6</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0enlwge</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_17v1bl6" sourceRef="Activity_0b0ib0h" targetRef="Activity_0iteco4" />
    <bpmn2:task id="Activity_0ztz8e2">
      <bpmn2:incoming>Flow_0enlwge</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1xn8kmj</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_0enlwge" sourceRef="Activity_0iteco4" targetRef="Activity_0ztz8e2" />
    <bpmn2:task id="Activity_18jh5j1">
      <bpmn2:incoming>Flow_1xn8kmj</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0et77dy</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1xn8kmj" sourceRef="Activity_0ztz8e2" targetRef="Activity_18jh5j1" />
    <bpmn2:task id="Activity_1r766m6">
      <bpmn2:incoming>Flow_0et77dy</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1rb2b0x</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_0et77dy" sourceRef="Activity_18jh5j1" targetRef="Activity_1r766m6" />
    <bpmn2:task id="Activity_1pqejm1">
      <bpmn2:incoming>Flow_1rb2b0x</bpmn2:incoming>
      <bpmn2:outgoing>Flow_06vpyos</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1rb2b0x" sourceRef="Activity_1r766m6" targetRef="Activity_1pqejm1" />
    <bpmn2:task id="Activity_0gwmd0t">
      <bpmn2:incoming>Flow_06vpyos</bpmn2:incoming>
      <bpmn2:outgoing>Flow_143wey1</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_06vpyos" sourceRef="Activity_1pqejm1" targetRef="Activity_0gwmd0t" />
    <bpmn2:task id="Activity_1jvwj6f">
      <bpmn2:incoming>Flow_143wey1</bpmn2:incoming>
      <bpmn2:outgoing>Flow_13nskw4</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_143wey1" sourceRef="Activity_0gwmd0t" targetRef="Activity_1jvwj6f" />
    <bpmn2:task id="Activity_08vm3v8">
      <bpmn2:incoming>Flow_13nskw4</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0pmbbf4</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_13nskw4" sourceRef="Activity_1jvwj6f" targetRef="Activity_08vm3v8" />
    <bpmn2:task id="Activity_0u0wwgd">
      <bpmn2:incoming>Flow_0pmbbf4</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1iauxix</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_0pmbbf4" sourceRef="Activity_08vm3v8" targetRef="Activity_0u0wwgd" />
    <bpmn2:task id="Activity_1aij4bw">
      <bpmn2:incoming>Flow_1iauxix</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0aotyjj</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1iauxix" sourceRef="Activity_0u0wwgd" targetRef="Activity_1aij4bw" />
    <bpmn2:task id="Activity_10bw0io">
      <bpmn2:incoming>Flow_0aotyjj</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0afhfp9</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_0aotyjj" sourceRef="Activity_1aij4bw" targetRef="Activity_10bw0io" />
    <bpmn2:sequenceFlow id="Flow_0afhfp9" sourceRef="Activity_10bw0io" targetRef="Activity_16x33ne" />
    <bpmn2:task id="Activity_16x33ne">
      <bpmn2:incoming>Flow_0afhfp9</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1r4wx5g</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:task id="Activity_0tv4y9j">
      <bpmn2:incoming>Flow_1r4wx5g</bpmn2:incoming>
      <bpmn2:outgoing>Flow_18ft911</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1r4wx5g" sourceRef="Activity_16x33ne" targetRef="Activity_0tv4y9j" />
    <bpmn2:sequenceFlow id="Flow_18ft911" sourceRef="Activity_0tv4y9j" targetRef="Activity_13fc8yf" />
    <bpmn2:endEvent id="Event_1nbpvcd">
      <bpmn2:incoming>Flow_1jiqh59</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:task id="Activity_13fc8yf" name="テスク">
      <bpmn2:incoming>Flow_18ft911</bpmn2:incoming>
      <bpmn2:outgoing>Flow_15bpasf</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_15bpasf" sourceRef="Activity_13fc8yf" targetRef="Activity_0gm4u5q" />
    <bpmn2:task id="Activity_0qgq34n">
      <bpmn2:incoming>Flow_1r9p8rz</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0wbew2i</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1r9p8rz" sourceRef="Activity_0gm4u5q" targetRef="Activity_0qgq34n" />
    <bpmn2:sequenceFlow id="Flow_0wbew2i" sourceRef="Activity_0qgq34n" targetRef="Activity_0cuvl2l" />
    <bpmn2:task id="Activity_0gm4u5q">
      <bpmn2:incoming>Flow_15bpasf</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1r9p8rz</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:task id="Activity_0cuvl2l">
      <bpmn2:incoming>Flow_0wbew2i</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0l22anp</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:task id="Activity_1yb8281">
      <bpmn2:incoming>Flow_0l22anp</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1mz9r0r</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_0l22anp" sourceRef="Activity_0cuvl2l" targetRef="Activity_1yb8281" />
    <bpmn2:task id="Activity_1rf41wh">
      <bpmn2:incoming>Flow_1mz9r0r</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1jiqh59</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_1mz9r0r" sourceRef="Activity_1yb8281" targetRef="Activity_1rf41wh" />
    <bpmn2:sequenceFlow id="Flow_1jiqh59" sourceRef="Activity_1rf41wh" targetRef="Event_1nbpvcd" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0t7kphs">
      <bpmndi:BPMNShape id="Participant_1712112753306_di" bpmnElement="Participant_1712112753306" isHorizontal="true">
        <dc:Bounds x="50" y="269" width="2820" height="1491" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1i7wvlq_di" bpmnElement="Lane_1i7wvlq" isHorizontal="true">
        <dc:Bounds x="80" y="269" width="2790" height="250" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1h7rpfc_di" bpmnElement="Lane_1h7rpfc" isHorizontal="true">
        <dc:Bounds x="80" y="519" width="2790" height="120" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_03e8iu6_di" bpmnElement="Lane_03e8iu6" isHorizontal="true">
        <dc:Bounds x="80" y="639" width="2790" height="1121" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1um7fpe_di" bpmnElement="Event_1um7fpe">
        <dc:Bounds x="102" y="282" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1s61iwu_di" bpmnElement="Activity_1s61iwu">
        <dc:Bounds x="160" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0017uaw_di" bpmnElement="Activity_0017uaw">
        <dc:Bounds x="290" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1bw3gt0_di" bpmnElement="Activity_1bw3gt0">
        <dc:Bounds x="420" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0qbg89c_di" bpmnElement="Activity_0qbg89c">
        <dc:Bounds x="550" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_11zmfgp_di" bpmnElement="Activity_11zmfgp">
        <dc:Bounds x="680" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0sq8eji_di" bpmnElement="Activity_0sq8eji">
        <dc:Bounds x="810" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0b0ib0h_di" bpmnElement="Activity_0b0ib0h">
        <dc:Bounds x="940" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0iteco4_di" bpmnElement="Activity_0iteco4">
        <dc:Bounds x="1070" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ztz8e2_di" bpmnElement="Activity_0ztz8e2">
        <dc:Bounds x="1200" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_18jh5j1_di" bpmnElement="Activity_18jh5j1">
        <dc:Bounds x="1330" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1r766m6_di" bpmnElement="Activity_1r766m6">
        <dc:Bounds x="1460" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1pqejm1_di" bpmnElement="Activity_1pqejm1">
        <dc:Bounds x="1590" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0gwmd0t_di" bpmnElement="Activity_0gwmd0t">
        <dc:Bounds x="1720" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1jvwj6f_di" bpmnElement="Activity_1jvwj6f">
        <dc:Bounds x="1850" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_08vm3v8_di" bpmnElement="Activity_08vm3v8">
        <dc:Bounds x="1980" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0u0wwgd_di" bpmnElement="Activity_0u0wwgd">
        <dc:Bounds x="2110" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1aij4bw_di" bpmnElement="Activity_1aij4bw">
        <dc:Bounds x="2240" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_10bw0io_di" bpmnElement="Activity_10bw0io">
        <dc:Bounds x="2370" y="310" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_16x33ne_di" bpmnElement="Activity_16x33ne">
        <dc:Bounds x="2370" y="550" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0tv4y9j_di" bpmnElement="Activity_0tv4y9j">
        <dc:Bounds x="2520" y="550" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1nbpvcd_di" bpmnElement="Event_1nbpvcd">
        <dc:Bounds x="2782" y="1672" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_13fc8yf_di" bpmnElement="Activity_13fc8yf">
        <dc:Bounds x="1320" y="890" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0qgq34n_di" bpmnElement="Activity_0qgq34n">
        <dc:Bounds x="1620" y="890" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0gm4u5q_di" bpmnElement="Activity_0gm4u5q">
        <dc:Bounds x="1320" y="1440" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0cuvl2l_di" bpmnElement="Activity_0cuvl2l">
        <dc:Bounds x="1620" y="1440" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1yb8281_di" bpmnElement="Activity_1yb8281">
        <dc:Bounds x="1770" y="1440" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1rf41wh_di" bpmnElement="Activity_1rf41wh">
        <dc:Bounds x="1920" y="1440" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_01kfoco_di" bpmnElement="Flow_01kfoco">
        <di:waypoint x="138" y="300" />
        <di:waypoint x="149" y="300" />
        <di:waypoint x="149" y="350" />
        <di:waypoint x="160" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ggzele_di" bpmnElement="Flow_1ggzele">
        <di:waypoint x="260" y="350" />
        <di:waypoint x="290" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1gqblsk_di" bpmnElement="Flow_1gqblsk">
        <di:waypoint x="390" y="350" />
        <di:waypoint x="420" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1e42b9g_di" bpmnElement="Flow_1e42b9g">
        <di:waypoint x="520" y="350" />
        <di:waypoint x="550" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jhy5a5_di" bpmnElement="Flow_0jhy5a5">
        <di:waypoint x="650" y="350" />
        <di:waypoint x="680" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ycu0bd_di" bpmnElement="Flow_1ycu0bd">
        <di:waypoint x="780" y="350" />
        <di:waypoint x="810" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1j9sp9z_di" bpmnElement="Flow_1j9sp9z">
        <di:waypoint x="910" y="350" />
        <di:waypoint x="940" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_17v1bl6_di" bpmnElement="Flow_17v1bl6">
        <di:waypoint x="1040" y="350" />
        <di:waypoint x="1070" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0enlwge_di" bpmnElement="Flow_0enlwge">
        <di:waypoint x="1170" y="350" />
        <di:waypoint x="1200" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xn8kmj_di" bpmnElement="Flow_1xn8kmj">
        <di:waypoint x="1300" y="350" />
        <di:waypoint x="1330" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0et77dy_di" bpmnElement="Flow_0et77dy">
        <di:waypoint x="1430" y="350" />
        <di:waypoint x="1460" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1rb2b0x_di" bpmnElement="Flow_1rb2b0x">
        <di:waypoint x="1560" y="350" />
        <di:waypoint x="1590" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06vpyos_di" bpmnElement="Flow_06vpyos">
        <di:waypoint x="1690" y="350" />
        <di:waypoint x="1720" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_143wey1_di" bpmnElement="Flow_143wey1">
        <di:waypoint x="1820" y="350" />
        <di:waypoint x="1850" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_13nskw4_di" bpmnElement="Flow_13nskw4">
        <di:waypoint x="1950" y="350" />
        <di:waypoint x="1980" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0pmbbf4_di" bpmnElement="Flow_0pmbbf4">
        <di:waypoint x="2080" y="350" />
        <di:waypoint x="2110" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1iauxix_di" bpmnElement="Flow_1iauxix">
        <di:waypoint x="2210" y="350" />
        <di:waypoint x="2240" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0aotyjj_di" bpmnElement="Flow_0aotyjj">
        <di:waypoint x="2340" y="350" />
        <di:waypoint x="2370" y="350" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0afhfp9_di" bpmnElement="Flow_0afhfp9">
        <di:waypoint x="2420" y="390" />
        <di:waypoint x="2420" y="550" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1r4wx5g_di" bpmnElement="Flow_1r4wx5g">
        <di:waypoint x="2470" y="590" />
        <di:waypoint x="2520" y="590" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_18ft911_di" bpmnElement="Flow_18ft911">
        <di:waypoint x="2520" y="590" />
        <di:waypoint x="2390" y="590" />
        <di:waypoint x="2390" y="760" />
        <di:waypoint x="1370" y="760" />
        <di:waypoint x="1370" y="890" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_15bpasf_di" bpmnElement="Flow_15bpasf">
        <di:waypoint x="1370" y="970" />
        <di:waypoint x="1370" y="1440" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1r9p8rz_di" bpmnElement="Flow_1r9p8rz">
        <di:waypoint x="1420" y="1480" />
        <di:waypoint x="1520" y="1480" />
        <di:waypoint x="1520" y="930" />
        <di:waypoint x="1620" y="930" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0wbew2i_di" bpmnElement="Flow_0wbew2i">
        <di:waypoint x="1670" y="970" />
        <di:waypoint x="1670" y="1440" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0l22anp_di" bpmnElement="Flow_0l22anp">
        <di:waypoint x="1720" y="1480" />
        <di:waypoint x="1770" y="1480" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1mz9r0r_di" bpmnElement="Flow_1mz9r0r">
        <di:waypoint x="1870" y="1480" />
        <di:waypoint x="1920" y="1480" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1jiqh59_di" bpmnElement="Flow_1jiqh59">
        <di:waypoint x="2020" y="1480" />
        <di:waypoint x="2401" y="1480" />
        <di:waypoint x="2401" y="1690" />
        <di:waypoint x="2782" y="1690" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;

export default diagramXML;

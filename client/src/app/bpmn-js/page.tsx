"use client";
import BpmnModelerComponents from '@/components/BpmnModelerComponents';
// BPMN図のXMLデータをインポート
import diagramXML from '@/components/diagram';

const bpmnJs: React.FC = () => {

  return (
    // diagramXMLはBPMN図のXMLデータを含んでおり、このコンポーネントに渡されます。
    <BpmnModelerComponents xml={diagramXML} />
  );
};

export default bpmnJs;

"use client";
import BpmnModelerComponents from '@/components/BpmnModelerComponents';
import ModelerComponent from '@/components/ModelerComponents';
// BPMN図のXMLデータをインポート

const bpmnJs: React.FC = () => {

  return (
    // diagramXMLはBPMN図のXMLデータを含んでおり、このコンポーネントに渡されます。
    // <BpmnModelerComponents xml={diagramXML} />
    <ModelerComponent />
  );
};

export default bpmnJs;

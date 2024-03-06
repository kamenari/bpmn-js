"use client";
import BpmnModelerComponents from '@/components/BpmnModelerComponents';
import ModelerComponent from '@/components/ModelerComponents';
// BPMN図のXMLデータをインポート
import diagramXML from '@/components/diagram';

const bpmnJs: React.FC = () => {

  return (
    // diagramXMLはBPMN図のXMLデータを含んでおり、このコンポーネントに渡されます。
    // <BpmnModelerComponents xml={diagramXML} />
    <ModelerComponent url={diagramXML} />
  );
};

export default bpmnJs;

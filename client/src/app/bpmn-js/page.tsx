"use client";
import ModelerComponent from '@/components/ModelerComponents';
// BPMN図のXMLデータをインポート

const bpmnJs: React.FC = () => {

  return (
    // diagramXMLはBPMN図のXMLデータを含んでおり、このコンポーネントに渡されます。
    <ModelerComponent />
  );
};

export default bpmnJs;

"use client";
import ModelerNyanComponents from '@/components/ModelerNyanComponents';
// BPMN図のXMLデータをインポート

const bpmnJs: React.FC = () => {

  return (
    // diagramXMLはBPMN図のXMLデータを含んでおり、このコンポーネントに渡されます。
    <ModelerNyanComponents />
  );
};

export default bpmnJs;

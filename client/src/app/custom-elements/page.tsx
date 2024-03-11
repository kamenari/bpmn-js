"use client";
import ModelerComponentsAddNewModel from '@/components/ModelerComponentsAddNewModel';

const customElements: React.FC = () => {

  return (
    // diagramXMLはBPMN図のXMLデータを含んでおり、このコンポーネントに渡されます。
    <ModelerComponentsAddNewModel />
  );
};

export default customElements;

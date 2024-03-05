"use client";
import BpmnModelerComponents from '@/components/BpmnModelerComponents';
import diagramXML from '@/components/diagram';

const bpmnJs: React.FC = (props) => {

  return (
    <>
      <BpmnModelerComponents xml={diagramXML} />
    </>
  );
};

export default bpmnJs;

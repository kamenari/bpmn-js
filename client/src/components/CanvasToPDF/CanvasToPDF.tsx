// client/src/components/CanvasToPDF.tsx
import React from 'react';

interface CanvasToPDFProps {
  onExportPdf: () => Promise<void>;
}

const CanvasToPDF: React.FC<CanvasToPDFProps> = ({ onExportPdf }) => {
  return <button onClick={onExportPdf}>Export PDF</button>;
};

export default CanvasToPDF;
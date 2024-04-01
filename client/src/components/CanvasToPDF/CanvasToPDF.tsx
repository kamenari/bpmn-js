import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { css } from "@emotion/react";

interface Props {
  canvasId: string;
}

const CanvasToPDFStyles = css`
  position: fixed;
  bottom: 20px;
  left: 150px;
`;

const CanvasToPDF: React.FC<Props> = ({ canvasId }) => {
  const handleDownloadPDF = async () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    // scaleパラメータを使用して解像度を上げる
    const canvasImage = await html2canvas(canvas, { scale: 2 });
    const imgData = canvasImage.toDataURL("image/png");

    // PDFのサイズを画像のサイズに合わせる
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvasImage.width, canvasImage.height]
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvasImage.width, canvasImage.height);
    pdf.save("download.pdf");
  };

  return (
    <button onClick={handleDownloadPDF} css={CanvasToPDFStyles}>
      PDFをダウンロード
    </button>
  );
};

export default CanvasToPDF;
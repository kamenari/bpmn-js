import CustomTriangleRenderer from './CustomTriangleRenderer';
import CustomTrianglePalette from './CustomTrianglePalette';
import CustomTriangle  from './CustomTriangle.json';

import "./CustomTriangle.css";

export default {
  __init__: ['customTriangleRenderer', 'customTrianglePalette'],
  customTriangleRenderer: ['type', CustomTriangleRenderer],
  customTrianglePalette: ['type', CustomTrianglePalette],
  customTriangle: ['type', CustomTriangle]
};
import NyanRenderer from './NyanRenderer';
import NyanPaletteProvider from './NyanPaletteProvider';

import "./customNyan.css";

export default {
  __init__: ['nyanRenderer', 'nyanPaletteProvider'], // 修正: 正しい配列の形式に
  nyanRenderer: ['type', NyanRenderer],
  nyanPaletteProvider: ['type', NyanPaletteProvider],
};
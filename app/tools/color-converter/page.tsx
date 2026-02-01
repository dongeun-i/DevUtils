"use client";

import React, { useState, useMemo } from 'react';

// Helper function to convert RGB to HEX
const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
};

// Helper function to convert HEX to RGB
const hexToRgb = (hex: string) => {
  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (!sanitizedHex.match(/^[0-9a-fA-F]{6}$/)) { // Only full 6-digit hex
    return { r: 0, g: 0, b: 0 }; // Return black for invalid hex
  }
  const bigint = parseInt(sanitizedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// Helper function to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r: Math.max(0, Math.min(255, r)), g: Math.max(0, Math.min(255, g)), b: Math.max(0, Math.min(255, b)) };
};

const ColorConverterPage = () => {
  // Single source of truth for color: RGB
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  // Derived values from RGB
  const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    if (newHex.match(/^#([0-9a-fA-F]{3}){1,2}$/)) {
      setRgb(hexToRgb(newHex));
    }
    // Allow partial input for hex but don't update RGB until valid
    // This makes the input feel more responsive while typing hex
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
    const numValue = Math.max(0, Math.min(255, parseInt(value, 10) || 0));
    setRgb(prevRgb => ({ ...prevRgb, [component]: numValue }));
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: string) => {
      const numValue = parseInt(value, 10) || 0;
      const newHsl = { ...hsl };
    if (component === 'h') {
      newHsl.h = Math.max(0, Math.min(359, numValue));
    } else { // s or l
      newHsl[component] = Math.max(0, Math.min(100, numValue));
    }
    setRgb(hslToRgb(newHsl.h, newHsl.s, newHsl.l));
  };


  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">색상 피커 / 변환기</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Converters */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="hex-input" className="block text-sm font-medium text-gray-700 mb-1">HEX</label>
            <input
              type="text"
              id="hex-input"
              value={hex} // Use derived hex value
              onChange={handleHexChange}
              className="w-full p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="#RRGGBB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RGB</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={rgb.r}
                onChange={(e) => handleRgbChange('r', e.target.value)}
                className="w-1/3 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="0" max="255"
              />
              <input
                type="number"
                value={rgb.g}
                onChange={(e) => handleRgbChange('g', e.target.value)}
                className="w-1/3 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="0" max="255"
              />
              <input
                type="number"
                value={rgb.b}
                onChange={(e) => handleRgbChange('b', e.target.value)}
                className="w-1/3 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="0" max="255"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HSL</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={hsl.h} // Use derived hsl value
                onChange={(e) => handleHslChange('h', e.target.value)}
                className="w-1/3 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="0" max="359"
              />
              <input
                type="number"
                value={hsl.s} // Use derived hsl value
                onChange={(e) => handleHslChange('s', e.target.value)}
                className="w-1/3 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="0" max="100"
              />
              <input
                type="number"
                value={hsl.l} // Use derived hsl value
                onChange={(e) => handleHslChange('l', e.target.value)}
                className="w-1/3 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                min="0" max="100"
              />
            </div>
          </div>
        </div>
        {/* Color Picker */}
        <div className="flex flex-col gap-4">

          <div
            className="w-full h-20 rounded-md shadow-lg border border-gray-300"
            style={{ backgroundColor: hex }} // Use derived hex value
          ></div>
          <div className="relative w-full">
            <input
              type="color"
              id="color-picker-actual"
              value={hex} // Use derived hex value
              onChange={handleHexChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="색상 선택" // Add title for accessibility
            />
            <button
              onClick={() => document.getElementById('color-picker-actual')?.click()}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 flex items-center justify-center"
            >
              색상 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverterPage;
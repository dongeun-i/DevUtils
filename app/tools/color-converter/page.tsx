"use client";

import React, { useState, useEffect } from 'react';

// Helper function to convert RGB to HEX
const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

// Helper function to convert HEX to RGB
const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
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
  let h = 0, s, l = (max + min) / 2;

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
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0, g = 0, b = 0;

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

  return { r, g, b };
};

const ColorConverterPage = () => {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });

  // Update other formats when HEX changes
  useEffect(() => {
    if (!hex.match(/^#([0-9a-fA-F]{3}){1,2}$/)) return;
    const { r, g, b } = hexToRgb(hex);
    setRgb({ r, g, b });
    setHsl(rgbToHsl(r, g, b));
  }, [hex]);

  // Update other formats when RGB changes
  useEffect(() => {
    const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    if (newHex !== hex) { // Prevent infinite loop
      setHex(newHex);
    }
    setHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
  }, [rgb.r, rgb.g, rgb.b]);

  // Update other formats when HSL changes
  useEffect(() => {
    const { r, g, b } = hslToRgb(hsl.h, hsl.s, hsl.l);
    setRgb({ r, g, b }); // This will trigger RGB's useEffect, which will update HEX
  }, [hsl.h, hsl.s, hsl.l]);


  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">색상 피커 / 변환기</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Color Picker */}
        <div className="flex flex-col gap-4">
          <label htmlFor="color-picker" className="block text-lg font-medium text-gray-700">
            색상 선택
          </label>
          <input
            type="color"
            id="color-picker"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-full h-40 border-none cursor-pointer"
          />
          <div
            className="w-full h-20 rounded-md shadow-lg"
            style={{ backgroundColor: hex }}
          ></div>
        </div>

        {/* Converters */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="hex-input" className="block text-sm font-medium text-gray-700 mb-1">HEX</label>
            <input
              type="text"
              id="hex-input"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full p-2 border rounded-md font-mono"
              placeholder="#RRGGBB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RGB</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={rgb.r}
                onChange={(e) => setRgb({ ...rgb, r: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                className="w-1/3 p-2 border rounded-md font-mono"
                min="0" max="255"
              />
              <input
                type="number"
                value={rgb.g}
                onChange={(e) => setRgb({ ...rgb, g: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                className="w-1/3 p-2 border rounded-md font-mono"
                min="0" max="255"
              />
              <input
                type="number"
                value={rgb.b}
                onChange={(e) => setRgb({ ...rgb, b: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                className="w-1/3 p-2 border rounded-md font-mono"
                min="0" max="255"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HSL</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={hsl.h}
                onChange={(e) => setHsl({ ...hsl, h: Math.max(0, Math.min(359, parseInt(e.target.value) || 0)) })}
                className="w-1/3 p-2 border rounded-md font-mono"
                min="0" max="359"
              />
              <input
                type="number"
                value={hsl.s}
                onChange={(e) => setHsl({ ...hsl, s: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                className="w-1/3 p-2 border rounded-md font-mono"
                min="0" max="100"
              />
              <input
                type="number"
                value={hsl.l}
                onChange={(e) => setHsl({ ...hsl, l: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                className="w-1/3 p-2 border rounded-md font-mono"
                min="0" max="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverterPage;

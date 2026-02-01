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
  if (sanitizedHex.length === 3) {
    const r = parseInt(sanitizedHex[0] + sanitizedHex[0], 16);
    const g = parseInt(sanitizedHex[1] + sanitizedHex[1], 16);
    const b = parseInt(sanitizedHex[2] + sanitizedHex[2], 16);
    return { r, g, b };
  }
  if (sanitizedHex.length === 6) {
    const bigint = parseInt(sanitizedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
  return null; // Return null for invalid hex
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

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



  // Helper function to convert RGB to CMYK

  const rgbToCmyk = (r: number, g: number, b: number) => {

    r /= 255; g /= 255; b /= 255;

    const k = Math.min(1 - r, 1 - g, 1 - b);

    const c = (1 - r - k) / (1 - k) || 0;

    const m = (1 - g - k) / (1 - k) || 0;

    const y = (1 - b - k) / (1 - k) || 0;

    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };

  };



  // Helper function to convert CMYK to RGB

  const cmykToRgb = (c: number, m: number, y: number, k: number) => {

    c /= 100; m /= 100; y /= 100; k /= 100;

    const r = 1 - Math.min(1, c * (1 - k) + k);

    const g = 1 - Math.min(1, m * (1 - k) + k);

    const b = 1 - Math.min(1, y * (1 - k) + k);

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };

  };


const ColorConverterPage = () => {

  // Single source of truth for color: RGB

  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const [hexInput, setHexInput] = useState('#000000'); // Separate state for hex input to allow partial input



  // Derived values from RGB

  const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);

  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);

  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb]);



  // Sync hex input with derived hex when rgb changes, but only if hexInput isn't being actively typed

    React.useEffect(() => {

      // Only update hexInput if the currently displayed hex is different from the derived one,

      // which indicates it might be an external change (e.g., from RGB input or color picker)

      if (hexInput.toLowerCase() !== hex.toLowerCase()) {

        setHexInput(hex);

      }

    }, [hex]);





    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {





      const newHex = e.target.value;





      setHexInput(newHex); // Always update the input field state





  





      const convertedRgb = hexToRgb(newHex);





      if (convertedRgb !== null) {





        setRgb(convertedRgb);





      }





    };



  const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {

    const numValue = Math.max(0, Math.min(255, parseInt(value, 10) || 0));

    setRgb(prevRgb => ({ ...prevRgb, [component]: numValue }));

  };



  const handleHslChange = (component: 'h' | 's' | 'l', value: string) => {

      const numValue = parseInt(value, 10) || 0;

      const newHsl = { ...hsl }; // Use derived hsl as base

    if (component === 'h') {

      newHsl.h = Math.max(0, Math.min(359, numValue));

    } else { // s or l

      newHsl[component] = Math.max(0, Math.min(100, numValue));

    }

    setRgb(hslToRgb(newHsl.h, newHsl.s, newHsl.l));

  };



  const handleCmykChange = (component: 'c' | 'm' | 'y' | 'k', value: string) => {

    const numValue = parseInt(value, 10) || 0;

    const newCmyk = { ...cmyk }; // Use derived cmyk as base

    newCmyk[component] = Math.max(0, Math.min(100, numValue));

    setRgb(cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k));

  };





  return (

    <div className="p-4 md:p-8">

      <h1 className="text-2xl font-bold mb-4">색상 피커 / 변환기</h1>



                  <div className="flex flex-col gap-4 mb-8">



                    <div



                      className="w-full h-20 rounded-md shadow-lg border border-gray-300"



                      style={{ backgroundColor: hex }} // Use derived hex value



                    ></div>



                  </div>



            



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">



                    {/* Left Column: HEX and RGB Converters */}



                    <div className="flex flex-col gap-4">



                      <div>



                        <label htmlFor="hex-input" className="block text-sm font-medium text-gray-700 mb-1">HEX</label>



                        <input



                          type="text"



                          id="hex-input"



                          value={hexInput} // Use separate hexInput state



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



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



                            min="0" max="255"



                          />



                          <input



                            type="number"



                            value={rgb.g}



                            onChange={(e) => handleRgbChange('g', e.target.value)}



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



                            min="0" max="255"



                          />



                          <input



                            type="number"



                            value={rgb.b}



                            onChange={(e) => handleRgbChange('b', e.target.value)}



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



                            min="0" max="255"



                          />



                        </div>



                      </div>



                    </div>



            



                    {/* Right Column: HSL and CMYK Converters */}



                    <div className="flex flex-col gap-4">



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



            



                      <div>



                        <label className="block text-sm font-medium text-gray-700 mb-1">CMYK</label>



                        <div className="flex gap-2">



                          <input



                            type="number"



                            value={cmyk.c}



                            onChange={(e) => handleCmykChange('c', e.target.value)}



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



                            min="0" max="100"



                          />



                          <input



                            type="number"



                            value={cmyk.m}



                            onChange={(e) => handleCmykChange('m', e.target.value)}



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



                            min="0" max="100"



                          />



                          <input



                            type="number"



                            value={cmyk.y}



                            onChange={(e) => handleCmykChange('y', e.target.value)}



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



                            min="0" max="100"



                          />



                          <input



                            type="number"



                            value={cmyk.k}



                            onChange={(e) => handleCmykChange('k', e.target.value)}



                            className="w-1/4 p-2 border rounded-md font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500"



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

export function hexToRgb(hex: string) {
  // Remove '#' symbol if present
  hex = hex.replace("#", "");

  // Convert the hexadecimal string to RGB components
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Return the RGB values as an object
  return { r, g, b };
}

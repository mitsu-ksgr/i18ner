/*----------------------------------------------------------------------------
  src/lib/downloader.ts

  Download helper
 *---------------------------------------------------------------------------*/

const wURL = window.URL || window.webkitURL;

export function downloadBlob(filename, blob) {
  const url = wURL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  // Release
  wURL.revokeObjectURL(url);
}

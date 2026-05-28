const fs = require('fs');
const path = require('path');
const Obfuscator = require('javascript-obfuscator');

const htmlPath = path.join(__dirname, '../plan/erd_generator_v1.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Extract script tag contents
const scriptRegex = /<script>([\s\S]*?)<\/script>/i;
const match = html.match(scriptRegex);

if (match) {
  const originalJs = match[1];
  
  // Obfuscate Javascript logic while reserving public functions used in HTML event handlers
  const obfuscatedResult = Obfuscator.obfuscate(originalJs, {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
    reservedNames: [
      'selectDB', 'clearInput', 'generateERD', 'copyToClipboard',
      'toggleFullscreenInput', 'onInputFocus', 'loadSample',
      'exportPNG', 'exportSVG', 'backToLanding', 'parsedData',
      'tableEls', 'currentScale', 'drawLines', 'renderERD'
    ]
  });

  const obfuscatedJs = obfuscatedResult.getObfuscatedCode();
  html = html.replace(scriptRegex, `<script>\n${obfuscatedJs}\n</script>`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Obfuscation completed successfully!');
} else {
  console.error('No <script> block found in HTML file.');
}

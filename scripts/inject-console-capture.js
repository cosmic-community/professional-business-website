const fs = require('fs');
const path = require('path');
const glob = require('glob');

function injectConsoleCapture() {
  // Find all HTML files in the build output
  const htmlFiles = glob.sync('.next/**/*.html', { ignore: '.next/cache/**' });
  
  if (htmlFiles.length === 0) {
    console.log('No HTML files found in .next directory');
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  htmlFiles.forEach(filePath => {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Only inject if not already present
      if (!content.includes('dashboard-console-capture.js')) {
        // Inject before closing head tag
        if (content.includes('</head>')) {
          content = content.replace('</head>', `  ${scriptTag}\n</head>`);
          fs.writeFileSync(filePath, content);
          console.log(`Injected console capture script into ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log('Console capture script injection complete');
}

injectConsoleCapture();
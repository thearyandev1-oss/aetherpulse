const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src/components');
files.push('./src/App.jsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Icon colors
  content = content.replace(/text-yellow-400/g, 'text-indigo-500');
  content = content.replace(/text-yellow-500/g, 'text-indigo-500');
  content = content.replace(/text-yellow-600/g, 'text-indigo-600');
  content = content.replace(/text-yellow-700/g, 'text-indigo-700');
  content = content.replace(/text-yellow-800/g, 'text-indigo-800');
  content = content.replace(/text-yellow-900/g, 'text-indigo-900');
  
  // Bg colors
  content = content.replace(/bg-yellow-50/g, 'bg-indigo-50');
  content = content.replace(/bg-yellow-100/g, 'bg-indigo-100');
  content = content.replace(/bg-yellow-200/g, 'bg-indigo-200');
  content = content.replace(/bg-yellow-300/g, 'bg-indigo-300');
  content = content.replace(/bg-yellow-400/g, 'bg-indigo-600'); // Main brand color
  content = content.replace(/bg-yellow-500/g, 'bg-indigo-600'); 
  
  // Border colors
  content = content.replace(/border-yellow-200/g, 'border-indigo-200');
  content = content.replace(/border-yellow-400/g, 'border-indigo-500');
  content = content.replace(/border-yellow-500/g, 'border-indigo-500');
  
  // Ring colors
  content = content.replace(/ring-yellow-400/g, 'ring-indigo-500');

  // Fix text contrast on main brand buttons
  content = content.replace(/bg-indigo-600 text-gray-900/g, 'bg-indigo-600 text-white');
  content = content.replace(/bg-indigo-600 text-slate-900/g, 'bg-indigo-600 text-white');
  content = content.replace(/bg-indigo-600 hover:bg-yellow-500 text-gray-900/g, 'bg-indigo-600 hover:bg-indigo-700 text-white');
  
  // Special specific replacements
  content = content.replace(/#facc15/g, '#4f46e5'); // Hex yellow to Indigo-600
  content = content.replace(/bg-gray-900 hover:bg-black/g, 'bg-indigo-600 hover:bg-indigo-700'); // Black buttons to indigo
  content = content.replace(/text-gray-900 hover:bg-yellow-500/g, 'text-white hover:bg-indigo-700'); // Close buttons
  
  fs.writeFileSync(file, content);
});

console.log("Rebrand complete.");

const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Import DigitalTwinAnalytics
content = content.replace(
  "import LiveCameraAnalytics from './components/LiveCameraAnalytics';",
  "import LiveCameraAnalytics from './components/LiveCameraAnalytics';\nimport DigitalTwinAnalytics from './components/DigitalTwinAnalytics';"
);

// Add Globe2 to lucide imports if not there
if(!content.includes('Globe2')) {
   content = content.replace('Camera\n} from', 'Camera,\n  Globe2\n} from');
}

// Add to TABS
content = content.replace(
  "{ id: 'camera', label: 'Live Edge AI', icon: Camera },",
  "{ id: 'camera', label: 'Live Edge AI', icon: Camera },\n  { id: 'twin', label: 'Digital Twin', icon: Globe2 },"
);

// Add to main rendering
content = content.replace(
  "{activeTab === 'camera' && <LiveCameraAnalytics />}",
  "{activeTab === 'camera' && <LiveCameraAnalytics />}\n          {activeTab === 'twin' && <DigitalTwinAnalytics />}"
);

fs.writeFileSync('src/App.jsx', content);

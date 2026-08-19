const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Add Camera import
content = content.replace('Award\n} from \'lucide-react\';', 'Award,\n  Camera\n} from \'lucide-react\';');

// Add LiveCameraAnalytics import
content = content.replace('import SystemArchitecture from \'./components/SystemArchitecture\';', 'import SystemArchitecture from \'./components/SystemArchitecture\';\nimport LiveCameraAnalytics from \'./components/LiveCameraAnalytics\';');

// Add Camera to TABS
content = content.replace('{ id: \'architecture\', label: \'System Architecture\', icon: Network },', '{ id: \'architecture\', label: \'System Architecture\', icon: Network },\n  { id: \'camera\', label: \'Live Edge AI\', icon: Camera },');

// Add to main rendering
content = content.replace('{activeTab === \'architecture\' && <SystemArchitecture />}', '{activeTab === \'architecture\' && <SystemArchitecture />}\n          {activeTab === \'camera\' && <LiveCameraAnalytics />}');

fs.writeFileSync('src/App.jsx', content);

const fs = require('fs');

const file = 'src/components/DigitalTwinAnalytics.jsx';
let content = fs.readFileSync(file, 'utf8');

const catchBlock = `    } catch (err) {
      console.error("Overpass API failed, using fallback mock data:", err);
      // Hackathon Fallback: If API rate limits, generate realistic mock data based on location
      const isMajor = place.name.toLowerCase().includes('square') || place.name.toLowerCase().includes('avenue') || place.name.toLowerCase().includes('street');
      setJunctionData({
        totalLanes: isMajor ? 6 : 4,
        types: isMajor ? 'primary, secondary' : 'tertiary, residential',
        hasBusRoute: true,
        baseVolume: isMajor ? 115 : 65,
      });
      setLoading(false);
      setIsRunning(true);
    }`;

content = content.replace(/    \} catch \(err\) \{\n      console\.error\(err\);\n      setLoading\(false\);\n    \}/g, catchBlock);
fs.writeFileSync(file, content);

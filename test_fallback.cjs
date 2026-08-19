const place = { name: "Times Square" };
try {
  throw new Error("Simulated API failure");
} catch(err) {
  const isMajor = place.name.toLowerCase().includes('square') || place.name.toLowerCase().includes('avenue') || place.name.toLowerCase().includes('street');
  console.log({
        totalLanes: isMajor ? 6 : 4,
        types: isMajor ? 'primary, secondary' : 'tertiary, residential',
        hasBusRoute: true,
        baseVolume: isMajor ? 115 : 65,
      });
}

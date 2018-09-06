function latlng2deg (value) {
  value += '';
  const degrees = value.slice(0, value.indexOf('.') - 2);
  const minutes = value.slice(value.indexOf('.') - 2);
  return parseInt(degrees, 10) + (parseFloat(minutes, 10) / 60);
}

module.exports.latlng2deg = latlng2deg;

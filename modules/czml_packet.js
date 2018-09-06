function getInitPacket () {
  return {
    "id" : "document",
    "name" : "CZML Stream",
    "version" : "1.0"
  };
}
/**
* @description Формирует CZML пакет для лодки
*
* @param {number} id ID трекера или лодки
* @param {Date} dateStart Время начала гонки
* @param {Date} dateStop Время окончания гонки
* @param {Array} listPos Массив координат
* @return {Object} Возвращает объект пакета CZML
*/

function getVehiclePacket( id, dateStart, dateStop, listPos ) {
    // Объект пакета и базовая визуальная информация объекта
    let packet = {
      "model": {
        "gltf" : "../../../../libs/models/arrow.glb",
        "scale" : 0.5,
        "minimumPixelSize": 64
      },
      "orientation" : {
        "velocityReference": "#position"
      }
    };
    // Уникальный номер на основе id трекера
    packet.id = `tracker_${id}`;
    // Массив listPos - одномерный массив координат формата:
    // [ кол-во секунд с момента epoch, latitude, longitude, height, ... ]
    packet.position = {
      "interpolationAlgorithm":"LAGRANGE",
      "interpolationDegree":1,
      "epoch" : `${dateStart.toISOString()}`,
      "cartographicDegrees" : listPos
    };
    // Интервал для Cezium TimeBar
    packet.availability = `${dateStart.toISOString()}/${dateStop.toISOString()}`;
    return packet;
}

module.exports = getVehiclePacket;
module.exports = getInitPacket;

export interface PositionStatus {
  Time: number[];               // [год, месяц, день, часы, минуты, секунды]
  Longitude: number[];          // [градусы, минуты, секунды] или [долгота]
  Latitude: number[];           // аналогично Longitude
  Altitude: number;             // высота (метры)
  Speed: number;                // скорость
  Bearing: number;              // курс
  AntennasStatus: number;       // состояние антенн
  PositioningResult: number;    // код результата позиционирования
  SatelliteCount: number;       // количество спутников
  WorkStatus: number;           // режим работы
  AlarmPoints: any[];           // массив точек тревоги (обычно пустой или объекты)
}
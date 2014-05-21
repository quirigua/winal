/**
 * Class WinalUnit
 */
var WinalUnit = function(){
};
WinalUnit.unit = {
  baktun: 20*18*20*20,
  katun:  20*18*20,
  tun:    20*18,
  winal:  20,
  kin:    1
};
WinalUnit.units = [
  WinalUnit.unit.baktun,
  WinalUnit.unit.katun,
  WinalUnit.unit.tun,
  WinalUnit.unit.winal,
  WinalUnit.unit.kin
]

/**
 * Class Winal
 */
var Winal = function(){};
Winal.toJulianDay = function(date){
  return date.getTime() / 86400000.0 + 2440587.375;
};
Winal.toLongCount = function(date){
  var jd = this.toJulianDay(date);
  var jdf = Math.floor(jd);
  var long_count_base = jdf - 584282;
  result = WinalUnit.units.reduce(function(rs,unit) {
    rs.value.push(Math.floor(rs.next_base/unit));
    rs.next_base = rs.next_base % unit;
    return rs;
  },{value: [], next_base: long_count_base});
  return result.value;
};
Winal.toGregorian = function(long_count_array){
  days = 0
  days += long_count_array[0] * WinalUnit.unit.baktun
  days += long_count_array[1] * WinalUnit.unit.katun
  days += long_count_array[2] * WinalUnit.unit.tun
  days += long_count_array[3] * WinalUnit.unit.winal
  days += long_count_array[4]
  days += 584282;
  return new Date(((days - 2440587.375) * 86400000.0));
};

exports.WinalUnit = WinalUnit
exports.Winal     = Winal

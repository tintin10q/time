/**
 * A function which returns the time since a certain time in a nice format.
 * You can pass a date in the past as a unix number or as a Date object.
 * Lang can be a BCP47LocaleIdentifier or a list of them. If you don't pass lang "en" is chosen.
 * @param {number|Date} date
 * @param {UnicodeBCP47LocaleIdentifier|UnicodeBCP47LocaleIdentifier[]} lang
 */
export function timesince(date, lang) {
  lang ??= "en";
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto", style: "long" });
  
  const now = Math.floor(Date.now()/1000)
  date = date instanceof Date ? date.valueOf() : date;
  const totalSecDiff = date - now;

  // We devide each time by a smaller unit.
  //   if the result > 1 alteast one or more of that unit fits into the difference.
  const secondsInYear = 31_536_000;
  const asYears = totalSecDiff / secondsInYear;
  if (Math.abs(asYears) >= 1) return rtf.format(Math.floor(asYears), "years");

  const secondsInQuarter = secondsInYear / 4;
  const asQuarters = totalSecDiff / secondsInQuarter;
  if (Math.abs(asQuarters) >= 1) return rtf.format(Math.floor(asQuarters), "quarter");

  const secondsInMonth = 2_628_288;
  const asMonths = totalSecDiff / secondsInMonth;
  if (Math.abs(asMonths) >= 1) return rtf.format(Math.floor(asMonths), "month");

  const secondsInWeek = 604_800;
  const asWeeks = totalSecDiff / secondsInWeek;
  if (Math.abs(asWeeks) >= 1) return rtf.format(Math.floor(asWeeks), "weeks");

  const secondsInDay = 604_800;
  const asDays = totalSecDiff / secondsInDay;
  if (Math.abs(asDays) >= 1) return rtf.format(Math.floor(asDays), "days");

  const secondsInHour = 3600;
  const asHours = totalSecDiff / secondsInHour;
  if (Math.abs(asHours) >= 1) return rtf.format(Math.floor(asHours), "hours");

  const secondsInMinute = 60;
  const asMinutes = totalSecDiff / secondsInMinute;
  if (Math.abs(asMinutes) >= 1) return rtf.format(Math.floor(asMinutes), "minutes");

  return rtf.format(totalSecDiff, "seconds");
}

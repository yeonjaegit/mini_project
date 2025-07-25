import { getToday } from "./Date"

export function getWeekDay() {
  const today = new Date(getToday());
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  // 이제 monday는 오늘이 어떤 요일이던지 이번 주 월요일이 담겨있음
  
  const week = [];
  for(let i = 0; i<7; i++) {
    let dates = new Date(monday)
    dates.setDate(monday.getDate() + i)
    const datesString = dates.toISOString().slice(0, 10)
    week.push(datesString)
  }

  return (
    week
  )
}
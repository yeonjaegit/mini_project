import { useEffect, useState } from "react";
import {getToday} from "./Date";


function MainPage() {
  
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    const allSchedule = JSON.parse(localStorage.getItem('schedules')) || [];
    const today = getToday(); // 오늘 날짜
    const todayWork = allSchedule.filter(schedule => schedule.date === today)
    setTodaySchedule(todayWork)  // return에서 빈 배열 보여준 후 useEffect가 실행될 때 setTodaySchedule로 변경
  }, [])

  if(todaySchedule.length === 0) {
    return (
      <b>로딩중</b>
    )
  }

  return(
    <>
      <div>
        <ul>
          <h4>▼ 클릭해서 내용 확인!!</h4>
          {todaySchedule.map((data, i) => {
            return(
              <div key={i}>
                <li onClick={(e) => {
                  const nextLi = e.target.nextSibling
                  if(nextLi.style.display == 'block')
                    nextLi.style.display = 'none'
                  else
                    nextLi.style.display = 'block'
                }} key={i}>
                  {data.title}
                </li>
                <p style={{display:'none'}}>
                  {`-> ${data.work}`}
                </p>
                </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default MainPage;
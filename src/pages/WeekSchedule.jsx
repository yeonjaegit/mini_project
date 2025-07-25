import { useEffect, useState } from "react";
import { getWeekDay } from "./WeekDate";

function WeekSchedule() {

    const [weeksSchedule, setWeeksSchedule] = useState([]);

    useEffect(() => {
    const getAllSchedule = JSON.parse(localStorage.getItem('schedules')) || [];
    const weekworks = getWeekDay();
    const weekWork = getAllSchedule.filter(weekend => weekworks.includes(weekend.date))
    weekWork.sort((a,b) => {
      return(
        new Date(a.date) - new Date(b.date)
      )
    })
    setWeeksSchedule(weekWork);
  }, [])

  if(weeksSchedule.length === 0) {
    return(
      <b>로딩중</b>
    )
  }

  return(
    <>
      <div>
        <ul>
          <h4>▼ 클릭해서 내용 확인!!</h4>
          {weeksSchedule.map((data, i) => {
            return(
              <div key={i}>
                <li onClick={(e) => {
                  let nextLi = e.target.nextSibling
                  if(nextLi.style.display == 'block') {
                    nextLi.style.display = 'none'
                  } else {
                    nextLi.style.display = 'block'
                  }
                }}>
                {data.date} {data.title}
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

export default WeekSchedule;
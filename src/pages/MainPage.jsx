import { useEffect, useState } from "react";
import {getToday} from "./Date";


function MainPage() {
  
  const [todaySchedule, setTodaySchedule] = useState([]); // 오늘 일정 저장 state
  const [openPtag, setOpenPtag] = useState(null) // 일정 제목 클릭 시 해당 일정 id 저장 state (id로 비교 후 일정 내용 열고닫기 위함)

  const checkDelete = (id) => { // 체크박스 체크 시 해당 일정 삭제 함수
    const allSchedule = JSON.parse(localStorage.getItem('schedules')) || []; // 로컬스토리지에서 전체 일정 가져온 후 배열형태로 변환
    const newSchedule = allSchedule.filter(schedule => !(schedule.date === getToday() && schedule.id === id)) // 전체 일정 중 오늘 날짜이면서 클릭한 일정의 id와 같은 id인 일정을 제외하고 변수에 담음
    localStorage.setItem('schedules', JSON.stringify(newSchedule)) // 삭제 적용된 일정 배열을 다시 문자열로 변환 후 로컬스토리지에 덮어씌우기
    setTodaySchedule([...newSchedule.filter(schedule => schedule.date === getToday())]) // 삭제 완료된 배열 중, 오늘 일정만 보여주기 위해 필터로 걸러내고 저장(재렌더링)
  }
  
  useEffect(() => { // 렌더링 후 오늘 일정을 한 번만 띄워주면 됌
    const allSchedule = JSON.parse(localStorage.getItem('schedules')) || []; // 로컬스토리지에서 전체 일정 가져온 후 배열형태로 변환
    const today = getToday(); // 오늘 날짜 불러오기(실시간)
    const todayWork = allSchedule.filter(schedule => schedule.date === today) // 가져온 모든 일정 중, 오늘 날짜인 것만 배열에 담기
    setTodaySchedule(todayWork)  // return에서 빈 배열 보여준 후 useEffect가 실행될 때 setTodaySchedule로 변경
  }, [])

    function openWork(data) { // 일정 내용을 id로 비교 후 상태별로 열림 / 닫힘 함수
    if(openPtag === data.id) { // 클릭한 일정의 id와 p태그에서 보내준 인수(data)의 id가 같으면
      return `-> ${data.work}` // 일정 내용 보여주기
    }
  }

  if(todaySchedule.length === 0) { // useEffect보다 여기가 먼저 실행되기 때문에 로딩 목적의 코드임(일정이 없을 때 보여지기 때문에 필요한 문구 작성 가능)
    return (
      <h2 className="mainh2">오늘 일정 없음ㅋㅋ 개꿀</h2> // 또는 "로딩중"같은 문구 넣어도 됌
    )
  }

  return( // 화면에 보이는 부분
    <>
      <div>
        <ul>
          <h4>▼ 클릭해서 내용 확인하셈</h4>
          {todaySchedule.map((data, i) => { {/* 오늘 일정으로 반복 */}
            return(
              <div key={i}>
                <li onClick={() => { // 일정 제목 태그
                  setOpenPtag(openPtag === data.id ? null : data.id) // 일정 제목 클릭 시 p태그(일정 내용)이 열려있으면 닫고, 닫혀있으면 열기(openPtag에 누른 일정의 id 보내줌)
                }} key={i}>
                  <input type="checkbox" className="maincheck" onChange={(e) => { // 일정 완료 시 체크할 체크박스
                    if(e.target.checked && window.confirm(`${data.title} 다 함?`)) { // 체크박스 체크됌 + confirm창에서 확인 눌렀을 때
                      checkDelete(data.id); // 해당 일정 삭제 함수 호출(해당 일정의 id 보내줌)
                    }e.target.checked = false; // 체크박스가 체크된 상태가 유지되는 버그를 방지하기 위해 삭제하던 안 하던 체크 풀기
                  }} />
                  {data.title} {/* 일정 제목 */}
                </li>
                <p>
                  {openWork(data)} {/* 일정 내용 태그(오늘 일정 배열 보내줌) */}
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
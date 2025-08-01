import { useEffect, useState } from "react";
import { getWeekDay } from "./WeekDate";

function WeekSchedule() {

    const [weeksSchedule, setWeeksSchedule] = useState([]); // 이번 주 일정 저장 state
    const [editSchedule, setEditSchedule] = useState(null); // 수정할 일정의 id 저장 state
    const [editTitle, setEditTitle] = useState(''); // 수정할 일정의 제목 저장 state
    const [editDate, setEditDate] = useState(''); // 수정할 일정의 날짜 저장 state
    const [editWork, setEditWork] = useState(''); // 수정할 일정의 내용 저장 state
    const [openPtag, setOpenPtag] = useState(null) // 일정 제목 클릭 시 해당 일정의 id 저장 state (내용 열고 닫기 위함)

    useEffect(() => { // 컴포넌트 첫 렌더링될 때 실행되는 부분
    const getAllSchedule = JSON.parse(localStorage.getItem('schedules')) || []; // // 로컬스토리지에서 모든 일정 불러오기
    const weekworks = getWeekDay(); // 이번 주 날짜 가져오기(JS)
    const weekWork = getAllSchedule.filter(weekend => weekworks.includes(weekend.date)) // 모든 일정 중 이번 주 날짜만 필터링
    weekWork.sort((a,b) => { // 날짜 오름차순 정렬
      return(
        new Date(a.date) - new Date(b.date) // 날짜 객체로 변환 후 비교
      )
    })
    setWeeksSchedule(weekWork); // 이번 주 일정 state에 저장
  }, []) // 첫 렌더링 시에만 실행됌

  function openWork(data) { // 일정 내용 열고 닫는 함수
    if(openPtag === data.id) { // 현재 열려 있는 일정 id와 클릭한 일정 id가 같으면
      return `-> ${data.work}` // 일정 내용 보여주기
    }
  }

  function deleteSchedule(title) { // 일정 삭제 함수
    const getAllSchedule = JSON.parse(localStorage.getItem('schedules')) || [];  // 로컬스토리지에서 모든 일정 불러오기
    const newWeekWork = getAllSchedule.filter(schedule => !(schedule.id === title)) // 클릭한 일정 id와 다른 일정만 남기기
    localStorage.setItem('schedules', JSON.stringify(newWeekWork)) // 삭제 완료 후 다시 로컬스토리지에 저장
    let sorted = ([...newWeekWork.filter(schedule => getWeekDay().includes(schedule.date))]) // 남은 일정 중 이번 주 일정만 필터링
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 오름차순 정렬
    setWeeksSchedule(sorted) // 변경된 일정 다시 state에 저장
  }

    function editForm(data) { // 수정폼 활성화 함수
    if(data.id == editSchedule){ // 수정 중인 일정과 현재 일정의 id가 같으면 수정 폼 표시
      return(
        <form className="allform" onSubmit={(e) => { {/* 폼 제출 시 실행되는 함수 */}
          e.preventDefault(); // 기본동작 막기(새로고침)
          const all = JSON.parse(localStorage.getItem('schedules')) || []; // 모든 일정 불러오기
          const update = all.map((schedule, i) => { // 일정 전체 반복문 돌림
            if(schedule.id === editSchedule){ // 수정 중인 일정이면
              return {
                ...schedule, // 복사 -> 기존 데이터 유지하면서(id는 유지)
                  title: editTitle, // 수정된 제목 적용
                  date: editDate, // 수정된 날짜 적용
                  work: editWork // 수정된 내용 적용
              }
            } else {
              return schedule; // 수정 중인 일정이 아니면 원래 값 유지
            }
          })
          localStorage.setItem('schedules', JSON.stringify(update)) // 수정된 전체 일정 로컬스토리지에 저장
          const updatedWeek = update
          .filter(schedule => getWeekDay().includes(schedule.date)) // 이번 주 일정만 다시 필터링
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 오름차순 정렬
          setEditSchedule(null) // 수정폼 닫기
        }}>
          <input className="editinput" type="text" // 제목 인풋
          value={editTitle} // 기본값으로 기존 제목 표시
          onChange={(e) => {
            setEditTitle(e.target.value) // 제목 변경 시 변경값 state에 저장 
          }}/>
          <input className="editinput" type="date" // 날짜 인풋
          value={editDate} // 기본값으로 기존 날짜 표시
          onChange={(e) => {
            setEditDate(e.target.value) // 날짜 변경 시 변경값 state에 저장
          }}/>
          <textarea className="editinput" // 내용 여러 줄 입력 인풋
          value={editWork} onChange={(e) => { // 기본값으로 기존 내용 표시
            setEditWork(e.target.value) // 내용 변경 시 변경값 state에 저장
          }} />
          <button className="savebutton" type="submit">저장</button> {/* submit 타입으로, form제출용 저장버튼 */}
          <button className="cenclebutton" onClick={() => { // 취소버튼
            setEditSchedule(null) // 클릭 시 수정폼 닫기 (id 초기화)
          }}>취소</button>
        </form>
      )
    }
  }

  const [editMode, setEditMode] = useState(false); // 편집 중인지 상태 저장 state

  function addButtons(title) { // 편집 버튼 클릭 시 수정, 삭제버튼 활성화 함수
    if(editMode) { // 편집 모드일 때 실행
      return(
        <>
          <button onClick={() => { // 수정버튼 클릭 시
            if(editSchedule === title.id) { // 이미 수정 중이면
              return setEditSchedule(null) // 수정폼 닫기
            }
            setEditSchedule(title.id) // 수정 버튼 클릭 시 해당 일정 id, 
            setEditTitle(title.title) // 제목,
            setEditDate(title.date) // 날짜,
            setEditWork(title.work) // 내용 state 저장
            
          }} className="addbtn">수정</button>
          <button onClick={() => { // 삭제 버튼
            let que = confirm('삭제할거임?') // 클릭 시 컨펌창으로 물어봄
            if(que){ // 컨펌창에서 확인버튼 클릭 시
            deleteSchedule(title.id)} // 삭제 함수 호출(반복중인 일정의 id를 인자로 보내줌)
          }} className="addbtn">삭제</button>

        </>
      )
    }
  }

  if(weeksSchedule.length === 0) { // useEffect보다 여기가 먼저 실행되기 때문에 로딩 목적의 코드임(일정이 없을 때 보여지기 때문에 필요한 문구 작성 가능)
    return(
      <h2 className="weekh2">이번 주 일정 없음ㅋㅋ 개꿀</h2> // 또는 "로딩중"같은 문구 넣어도 됌
    )
  }

  return(
    <>
      <div>
        <ul>
          <h4>▼ 클릭해서 내용 확인하셈
          <button className="editbutton" onClick={() => { // 편집 버튼
            if(editMode) { // 이미 편집중이면
              setEditSchedule(null) // 수정폼 닫기
            }
            setEditMode(!editMode) // 편집중 상태도 false로 변경
        }}>{editMode ? "편집 완료" : "편집"}</button></h4> {/* 편집 모드일 땐 value에 편집 완료 표시, 편집 모드가 아닐 땐 value에 편집 표시 */}
          {weeksSchedule.map((data, i) => { // 전체 일정으로 반복문 돌림
            return(
              <div key={i}>
                <li onClick={() => { // 일정 제목 태그
                  setOpenPtag(openPtag === data.id ? null : data.id) // 클릭 시 해당 일정의 id 저장, 이미 열려있을 경우 null값 저장
                }}>
                {data.date} {data.title} {/* 일정 날짜, 제목 표시 */}
                </li>
                <div className="addbuttons">
                  {addButtons(data)} {/* 편집 버튼 클릭 시 수정,삭제버튼 활성화하는 함수(인수로 반복중인 일정을 보내줌) */}
                </div>
                <p>
                  {openWork(data)} {/* 일정 제목 클릭 시 일정 내용을 나타나게 하는 함수(인수로 반복중인 일정을 보내줌) */}
                </p>
                {editForm(data)} {/* 수정 버튼 클릭 시 수정 폼 나타나게 하는 함수(인수로 반복중인 일정을 보내줌) */}
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default WeekSchedule;
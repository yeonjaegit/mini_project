import { useState } from "react";

function AllSchedule() {

  const allSchedules = JSON.parse(localStorage.getItem('schedules')) || []; // 모든 일정 로컬스토리지에서 꺼내옴
  allSchedules.sort((a,b) => { // sort는 배열을 하나하나 비교
    return(
      new Date(a.date) - new Date(b.date) // 날짜객체로 변환 후 a - b가 음수면 그대로, 양수면 자리바꿈(오름차순 정렬)
    )
  })
  
  const [editMode, setEditMode] = useState(false); // 일정을 편집 중인지 아닌지 상태를 저장(기본값은 false)
  const [newAllSchedule, setNewAllSchedule] = useState([]); // 메인 전체 스케줄을 allSchedules로 사용 중이기 때문에 사실상 렌더링용
  const [editSchedule, setEditSchedule] = useState(null); // 수정할 일정의 id 저장 state

  const [editTitle, setEditTitle] = useState(''); // 수정할 제목 저장 state
  const [editDate, setEditDate] = useState(''); // 수정할 날짜 저장 state
  const [editWork, setEditWork] = useState(''); // 수정할 내용 저장 state
  const [openPtag, setOpenPtag] = useState(null) // 일정 제목 클릭 시 해당 일정 id 저장 state (id로 비교 후 일정 내용 열고닫기 위함)

  function deleteSchedule(id) { // 일정 삭제 함수(삭제할 일정의 id를 매개변수로 받음)
      const getAllSchedule = JSON.parse(localStorage.getItem('schedules')) || []; // 모든 일정 로컬스토리지에서 꺼내옴
      const newAllWork = getAllSchedule.filter(schedule => !(schedule.id === id)) // 모든 일정 중 클릭한 일정과 id가 같은 일정만 제외하고 배열에 담음
      localStorage.setItem('schedules', JSON.stringify(newAllWork)) // 삭제 완료된 배열을 문자열로 변환 후 로컬스토리지에 덮어씌우기
      setNewAllSchedule(newAllWork) // 재렌더링
    }

    function openWork(data) { // 일정 내용을 id로 비교 후 상태별로 열림 / 닫힘 함수
      if(openPtag === data.id) { // 클릭한 일정의 id와 p태그에서 보내준 인수(data)의 id가 같으면
        return `-> ${data.work}` // 일정 내용 보여주기
     }
   }

  function editForm(data) { // 수정폼(수정 버튼 클릭 시 띄워지는 수정창, 일정을 매개변수로 받음)
    if(data.id == editSchedule){ // 수정 버튼을 누른 일정의 id와 반복문에서 인수로 보내준 data의 id값이 같을 때(즉, 수정중인 일정만) 수정폼을 띄워줌
      return(
        <form className="allform" onSubmit={(e) => { // onSubmit = form 제출함수
          e.preventDefault();
          const all = JSON.parse(localStorage.getItem('schedules')) || []; // 전체 일정 꺼내옴
          const update = all.map((schedule, i) => { // 전체 일정으로 반복문 돌림
            if(schedule.id === editSchedule){ // 반복 중 수정 중인 일정이면
              return {
                ...schedule, // 기존 정보는 유지하면서
                  title: editTitle, // 수정한 제목,
                  date: editDate, // 수정한 날짜,
                  work: editWork // 수정한 내용으로 적용
              }
            } else {
              return schedule; // 수정 중인 일정이 아니면 그대로 유지
            }
          })
          localStorage.setItem('schedules', JSON.stringify(update)) // 수정된 일정들 문자열로 변환 후 로컬스토리지에 덮어씌우기
          setEditSchedule(null) // 수정폼 끄기(id 초기화)
        }}>
          <input className="editinput" type="text" // 수정폼 제목 인풋
          value={editTitle} // 기본값으로 기존 제목 표시
          onChange={(e) => { // 제목을 변경할 때마다
            setEditTitle(e.target.value) // 바뀐 값 저장
          }}/>
          <input className="editinput" type="date" // 수정폼 날짜 인풋
          value={editDate}  // 기본값으로 기존 날짜 표시
          onChange={(e) => { // 날짜를 변경할 때마다
            setEditDate(e.target.value) // 바뀐 값 저장
          }}/>
          <textarea className="editinput" value={editWork} onChange={(e) => { // 일정 내용 여러 줄 입력 인풋
            setEditWork(e.target.value) }} /> {/* 기본값으로 기존 내용 표시, 변경할 때마다 바뀐 값 저장 */}
          <button className="savebutton" type="submit">저장</button> {/* submit타입 : form제출용 저장버튼 */}
          <button className="cenclebutton" onClick={() => { // 수정 취소버튼
            setEditSchedule(null) // 수정버튼 클릭 시 저장되었던 id값 초기화(수정폼 닫기)
          }}>취소</button>
        </form>
      )
    }
  }

  function addButtons(title) { // 수정, 삭제버튼 활성화 함수
    if(editMode) { // 편집모드일 때에만 보이게 (편집 버튼 눌렀을 때)
      return(
        <>
          <button onClick={() => { // 수정 버튼을 누르는 순간
            setEditSchedule(title.id) // 해당 일정의 id,
            setEditTitle(title.title) // 제목,
            setEditDate(title.date) // 날짜,
            setEditWork(title.work) // 내용 state에 각각 저장
            if(editSchedule === title.id) { // 현재 반복중인 일정의 id와 기존 저장된 id가 같으면(수정폼이 열린 상태면) 
              setEditSchedule(null) // 수정폼 닫기 (id 초기화)
            }
          }} className="addbtn">수정</button> 
          <button onClick={() => { // 삭제버튼
            let que = confirm('삭제할거임?') // 클릭 시 컨펌창으로 물어보기
            if(que) { // 컨펌창에서 확인버튼 클릭 시
              return(
            deleteSchedule(title.id) // 해당 일정 삭제함수 실행(반복중인 일정의 id를 받음)
          )}
          }} className="addbtn">삭제</button>
        </>
      )
    }
  }


  return( // 화면에 보이는 부분
    <>
      <ul>
        <h4>▼ 클릭해서 내용 확인하셈
          <button className="editbutton" onClick={() => { // 편집 버튼
            if(editMode) { // 이미 편집중이면
              setEditSchedule(null) // 수정폼 닫기(id 초기화)
            }
            setEditMode(!editMode) // 편집중인지 상태도 flase로 변경
        }}>{editMode ? "편집 완료" : "편집"}</button></h4> {/* 편집 모드일 땐 value에 편집 완료 표시, 편집 모드가 아닐 땐 value에 편집 표시 */}
        {allSchedules.map((data, i) => { // 전체 일정으로 반복문 돌림
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
    </>
  )
}

export default AllSchedule;
import { useState } from "react"

function AddSchedule() {

  const [title, setTitle] = useState(''); // 일정 제목 저장
  const [date, setDate] = useState(''); // 날짜 저장
  const [work, setWork] = useState(''); // 할 일 저장

  return(
    <>
      <form className="addform" onSubmit={(e) => {
        e.preventDefault(); // 기본동작 막기 (form 기본동작 : 새로고침)
        const newSchedule = {
          id: Date.now(),
          title: title, 
          date: date, 
          work: work
        };
        // || []; : 로컬스토리지 안에 아무것도 없으면 []를 대신 써라
        const allWorks = JSON.parse(localStorage.getItem("schedules")) || []; //기존 일정 꺼내서 배열로 변환
        const newWorks = [...allWorks, newSchedule]; // 기존 일정에 새 일정 추가
        localStorage.setItem("schedules", JSON.stringify(newWorks)); // 새 일정이 추가된 배열을 문자열로 변환 후 로컬스토리지에 덮어씌우기

        setTitle(''); // 등록 완료 후 빈칸으로 보이게
        setDate(''); // 등록 완료 후 빈칸으로 보이게
        setWork(''); // 등록 완료 후 빈칸으로 보이게

      }}> {/* form은 사용자가 입력 후 엔터만 눌러도 제출되게 가능 */}
          {/* 현재 입력 값 = title, 입력 받을 때마다 그 값으로 title값을 변경 */}
          <h5>일정 제목 입력</h5>
          <input type="text" value={title} onChange={(e) => { // 기본값 == title == 비어있음
            setTitle(e.target.value) // 입력하는 값 state에 저장
          }} required /> {/* required : 필수로 입력하라는 뜻 */}
          <h5>날짜 선택</h5>
          <input type="date" value={date} onChange={(e) => {
            setDate(e.target.value)
          }} required />
        <div>
          <h5>해야할 것 입력</h5>
          <textarea rows={2} className="editinput" value={work} onChange={(e) =>
            setWork(e.target.value)} required ></textarea>
        </div>
        {/* submit은 form을 제출하겠다는 뜻(form을 제출하는 버튼) */}
        <button type="submit">등록하기</button>
      </form>
    </>
  )
}

export default AddSchedule
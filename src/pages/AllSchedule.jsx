function AllSchedule() {

  const allSchedules = JSON.parse(localStorage.getItem('schedules')) || [];
  allSchedules.sort((a,b) => {
    return(
      new Date(a.date) - new Date(b.date)
    )
  })

  return(
    <>
      <ul>
        <h4>▼ 클릭해서 내용 확인!!</h4>
        {allSchedules.map((data, i) => {
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
    </>
  )
}

export default AllSchedule;
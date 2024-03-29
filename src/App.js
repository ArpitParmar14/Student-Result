import React, { useState } from 'react'
import './App.css'
function StudentResult() {
  let [result, setResult] = useState([])
  let [temp, setTemp] = useState([]);
  let [resValue, setResValue] = useState({
    name: '',
    sub1: 0,
    sub2: 0,
    sub3: 0,
    sub4: 0,
    sub5: 0,
    dataResult: ''
  })


  function data() {
    const { sub1, sub2, sub3, sub4, sub5 } = resValue;
    const total = sub1 + sub2 + sub3 + sub4 + sub5;
    const percent = total / 5;
    let color;

    let temp = 0;
    [sub1, sub2, sub3, sub4, sub5].forEach(sub => {
      if (sub >= 32) {
        temp++
      }
    })


    setResult(prevResult => {
      const newResult = [
        ...prevResult,
        {
          name: resValue.name,
          sub1: sub1,
          sub2: sub2,
          sub3: sub3,
          sub4: sub4,
          sub5: sub5,
          total: total,
          percent: percent,
          dataResult: '',
          grade: getGrade(percent),
          min: Math.min(sub1, sub2, sub3, sub4, sub5),
          max: Math.max(sub1, sub2, sub3, sub4, sub5),
          colors: color
        },
      ]
      setTemp(newResult);

      if (temp === 5) {
        color = 'green';
        newResult[newResult.length - 1].dataResult = 'Passed'
      } else if (temp <= 2) {
        color = 'red';
        newResult[newResult.length - 1].dataResult = 'Failed'
      } else if (temp >= 3) {
        color = 'blue';
        newResult[newResult.length - 1].dataResult = 'ATKT'
      }

      return newResult;
    })
  }
  function getGrade(percent) {
    if (percent >= 90) {
      return 'A+'
    } else if (percent >= 80) {
      return 'A'
    } else if (percent >= 70) {
      return 'B'
    } else if (percent >= 60) {
      return 'C'
    } else if (percent >= 50) {
      return 'D'
    } else {
      return 'F'
    }
  }

  const handleInputChange = (subject, value) => {
    setResValue(prevValues => ({
      ...prevValues,
      [subject]: parseInt(value, 10)
    }))
  }
  function ShowAll() {
    setResult([...temp]);
  }
  function showData(n) {
    setResult(temp)
    let newArr = temp.filter((ele) => {
      return ele.percent >= n
    })
    setResult(newArr);
  }
  function showRes(n) {
    setResult(temp)
    let newArr = temp.filter((ele) => {
      return ele.dataResult == n
    })
    setResult(newArr);
  }


  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Student Result</h2>
      <div className='main'>

        <div className='InputDtl' >
          <div >
            <span>Enter Name :</span>{' '}
            <input
              type='text'
              defaultValue={'name'}
              onChange={e => setResValue({ ...resValue, name: e.target.value })}
            />
          </div>
          <div>
            {[1, 2, 3, 4, 5].map(ele => (
              <div key={ele}>
                <span>{`Enter Subject${ele}:`}</span>
                <input
                  type='number'
                  defaultValue={0}
                  onChange={e => handleInputChange(`sub${ele}`, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
          </div>
        </div>
        <button onClick={() => { data() }} id='Btn'>
          Save Data
        </button>
      </div>

      <div className='btn' style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => { ShowAll() }}>Show ALL Result </button>
        <button onClick={() => { showRes('Passed') }}>Pass</button>
        <button onClick={() => { showRes('Failed') }}>Failed</button>
        <button onClick={() => { showRes('ATKT') }}>ATKT</button>
      </div>
      {/* ================== TABLE PRINT ============================== */}
      <table className='table' border={1}>
        <thead>
          <tr className='tr'>
            <th>Number</th>
            <th>Name</th>
            <th>Subject 1</th>
            <th>Subject 2</th>
            <th>Subject 3</th>
            <th>Subject 4</th>
            <th>Subject 5</th>
            <th>Total</th>
            <th>Percent</th>
            <th>Result</th>
            <th>Grade</th>
            <th>Max</th>
            <th>Min</th>
          </tr>
        </thead>
        <tbody>
          {result.map((ele, ind) => {
            return (
              <tr key={ind} className='tr' style={{ backgroundColor: ele.colors }}>
                <td>{ind + 1}</td>
                <td>{ele.name}</td>
                <td>{ele.sub1}</td>
                <td>{ele.sub2}</td>
                <td>{ele.sub3}</td>
                <td>{ele.sub4}</td>
                <td>{ele.sub5}</td>
                <td>{ele.total}</td>
                <td>{ele.percent}%</td>
                <td>{ele.dataResult}</td>
                <td>{ele.grade}</td>
                <td>{ele.max}</td>
                <td>{ele.min}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StudentResult

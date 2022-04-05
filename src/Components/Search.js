import React, { useState } from 'react';
import { STUDENTS } from '../studentList'

// DO NOT CHANGE THIS FUNCTION, IT RETURNS TRUE OR FALSE ACCORDING TO GIVEN DATES
// joiningDate COMES FROM input-date, validityDate COMES FROM studentList,
function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split('-');
  const [yyyy, mm, dd] = validityDate.split('-');
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return (maxValid >= selected) && (maxValid >= today);
}

export default function Search({ matchedName, errorMessage }) {

  const [nameStudent, setnameStudent] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [valid, setValid] = useState(true)

  const searchStudent = () => {

    if (nameStudent && dateValue) {
//sadece girilen ismi kullanmak için find ile o sartı saglayan isim filtrelenmiş oluyo
      const findName = STUDENTS.find(i => i.name.toLowerCase() == nameStudent.toLowerCase())

      if (findName) {
        if (checkValidity(dateValue, findName.validityDate)) {
          matchedName(findName.name)
          setValid(true)

        } else {
          errorMessage(`Sorry, "${nameStudent}'s" validity has Expired! `)
        }
      } else {
        errorMessage(`Sorry, "${nameStudent}" is not a verified student!`)
      }
      setnameStudent(""); setDateValue(""); setValid(true)
    } else {
      setValid(false)
    }
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor="studentName" className="form-label">Student Name</label>
        <input id="studentName" data-testid="studentName" type="search"
          onChange={(e) => setnameStudent(e.target.value)} value={nameStudent}
          className={`form-control` + (valid ? "" : (nameStudent ? "" : " invalid"))} />
      </div>

      <div className="mb-4">
        <label htmlFor="joiningDate" className="form-label">Joining Date</label>
        <input id="joiningDate" data-testid="joiningDate" type="date"
          onChange={(e) => setDateValue(e.target.value)} value={dateValue}
          className={`form-control` + (valid ? "" : (dateValue ? "" : " invalid"))} />
      </div>

      <button onClick={searchStudent} type="button" className="btn btn-primary" data-testid="addBtn">Add</button>
    </>
  );
}
import React, { useState } from 'react'
import GlobalData from './GlobalData'
export default function Wrapper(props) {
    const [userData, setUserData] = useState([])
  return (
      <GlobalData.Provider value={{userData,setUserData}}>
          {props.children}
    </GlobalData.Provider>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {
    const navigate = useNavigate();
    console.log(navigate);

    const transToParams = () => {
        navigate('/useparams/navigateID/navigateName/navigateContent', {
            replace: true,
            state: {
                state1: 'navigate'
            },
            relative: 'path'
            
        })
    }
    const transToAbout = () => {
        navigate('/about', {
            replace: true,
            state: {
                state1: 'navigate'
            },
            relative: 'path'
            
        })
    }

  return (
    <div>
        <button onClick={transToParams}>跳转到useparams</button>
        <button onClick={transToAbout}>跳转到about</button>
    </div>
  )
}

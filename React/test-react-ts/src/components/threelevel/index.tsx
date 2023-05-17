import React from 'react'
import {Link, Outlet, useOutlet} from 'react-router-dom'

export default function Index() {
  console.log('useOutlet', useOutlet());
  return (
    <div>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0',
          borderBottom: '1px solid #ccc'
        }}>
            <Link to={'/threelevel/1'}>level 1</Link>
            <Link to={'/threelevel/2'}>level 2</Link>
            <Link to={'/threelevel/3'}>level 3</Link>
        </nav>
        <Outlet />
    </div>
  )
}

import React, {useContext} from 'react'
import { NameContext } from '../index'

export default function Panel({children}) {
    const name = useContext(NameContext)
  return (
    <>
        <h1>{name}</h1>
        {children}
    </>
  )
}

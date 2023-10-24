import React from 'react'
import { useMatch, useParams, useSearchParams, useLocation } from 'react-router-dom'

export default function Index() {
    const match = useMatch('/useparams/:id/:name/:content')
    const params = useParams()
    const [search, setSearch] = useSearchParams();
    const location = useLocation();


    const { state: {
        state1
    }} = location;

    console.log(match); // {params: {id: 'testID', name: 'testName', content: 'testContent'}, pathname: '/useparams/testID/testName/testContent', pathnameBase: '/useparams/testID/testName/testContent', pattern: {…}}
    console.log(params); // {id: 'testID', name: 'testName', content: 'testContent'}

    console.log(search.get('search1')); // testsearch
    console.log(search.get('search2')); // testsearch2

    console.log('location', location);
    return (
        <div>
            <h4>id: {params.id}</h4>
            <h4>name: {params.name}</h4>
            <h4>content: {params.content}</h4>
            <h4>staet1: {state1}</h4>
            <button onClick={() => setSearch('search1=testsearch')}>set search1</button>
        </div>
    )
}

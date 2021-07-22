import React from 'react'

function ReadOnlyRow({data,setEdit,index}) {
    return (
        <div>
            <a onDoubleClick={()=> setEdit(index)}>{data}</a>
        </div>
    )
}

export default ReadOnlyRow;
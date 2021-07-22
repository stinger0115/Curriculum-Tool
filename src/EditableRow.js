import React, { useState } from 'react';
import './EditableRow.css';

function EditableRow({ data, standards, index,setEdit }) {
    const [updated_data, setUpdatedData] = useState(data);

    const form_save = (event) => {
        event.preventDefault();
        //no need to update standard to empty standard
        if (updated_data === "") {
            standards[index].data = data;
            setEdit(-1);
            return;
        }
        standards[index].data = updated_data;
        setEdit(-1);
        setUpdatedData("");        
    }
    return (
        <div className="EditableRow">
            <form onSubmit={form_save}>
                <input type="text" value={updated_data} onChange={(event)=> setUpdatedData(event.target.value)}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditableRow;
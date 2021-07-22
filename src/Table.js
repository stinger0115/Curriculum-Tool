import React,{useState} from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import ActionButtons from './ActionButtons';
import './Table.css';

function Table({ standards, handleDeleteClick, handleRightClick, handleLeftClick }) {
  const [edit, setEdit] = useState(-1);
  return (
    <table>
      <col style={{ width: "15%" }} />
      <col style={{ width: "85%" }} />
      <thead>
        <tr>
          <th><h4>
            Actions
            <br />
            <span className="disable_text">
              Move, Indent, Outdent, Delete
            </span>
          </h4></th>
          <th className="standard_heading"><h4>
            Standard
            <br />
            <span className="disable_text">The text of the standard</span>
          </h4></th>
        </tr>
      </thead>
      <Droppable droppableId="tbody">
        {(provided) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {
              standards.map((curr, index) => (
              <Draggable draggableId={curr.data} index={index} key={curr.data}>
                {
                  (provided) => (
                  <tr ref={provided.innerRef} {...provided.draggableProps}>
                    <td className="action_buttons">
                      <div {...provided.dragHandleProps}>
                        <ActionButtons buttonName="Move" provided={provided}/>
                      </div>
                      <ActionButtons index={index} handleLeftClick={ handleLeftClick } buttonName="Outdent"/>
                      <ActionButtons id={curr.id} handleRightClick={ handleRightClick} buttonName="Indent"/>
                      <ActionButtons handleDeleteClick={handleDeleteClick} index={index} buttonName="Delete"/>
                    </td>
                    <td>
                      <div
                        style={{ paddingLeft: curr.padding }}
                        className="container_row"
                      >
                        <div className="box"></div>
                        <div
                          className={
                            curr.padding === 0
                            ? "first_style actual_standard"
                            : curr.padding === 25
                            ? "second_style actual_standard"
                            : "third_style actual_standard"
                          }
                          >
                            {
                              edit === index
                                ? <EditableRow data={curr.data} standards={standards} index={index} setEdit={ setEdit }/>
                                : <ReadOnlyRow data={curr.data} setEdit={setEdit} index={ index}/>
                            }
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </table>
  );
}

export default Table;
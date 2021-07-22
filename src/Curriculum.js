import React, { useState } from 'react';
import './Curriculum.css';
import { DragDropContext } from 'react-beautiful-dnd';
import Table from './Table';
import AddStandard from './AddStandard';



function Curriculum() {
    const [standards, setStandards] = useState([]);
    const [new_content, setNewContent] = useState("");    
    const [position, setPosition] = useState(0);
    const [current_padding, setCurrentPadding] = useState(0);

    //THIS FUNCTION WILL ADD THE NEW STANDARD 
    const handleNewStandard = (event) => {        
      event.preventDefault();
      //no need to add emtpy curriculum
      if (new_content.length === 0) return;
      let new_standard = { id: position, data: new_content, padding: current_padding };        
      setStandards((preval) => [...preval, new_standard]);
      setPosition((preval) => preval + 1);
      setNewContent("");
    }
    //THIS FUNCTION WILL HANDLE THE INPUT FIELD OF THE NEW STANDARD
    const handleNewContent = (event) => {
      setNewContent(event.target.value);
    }
    //THIS FUNCTION WILL HANDLE THE INDENT CLICK
    const handleRightClick = (standard_id) => {                
      let temp = [...standards];
      let index = temp.findIndex((curr) => curr.id === standard_id);
      setCurrentPadding((preval) => {
        if (preval === 50) return 50;
        return preval + 25;
      });  
      temp[index].padding += 25;
      if (temp[index].padding >= 50)
      {
        temp[index].padding = 50;
        setCurrentPadding(50);
      }
      setStandards(temp);
    }

    //THIS FUNCTION WILL HANDLE THE OUTDENT CLICK
    const handleLeftClick = (index) => {                
      let temp = [...standards];
      temp[index].padding -= 25;
      setCurrentPadding((preval) => {
        if (preval <= 25) return 0;
        else
        return preval - 25;
      });  
      if (temp[index].padding < 0) {            
        temp[index].padding = 0;
      }        
      setStandards(temp);
    }

    //THIS FUNCTION WILL HANDLE THE DELETE ROW CLICK
    const handleDeleteClick = (index) => {
      let temp = [...standards];
      let counts = 1;
      for (let i = index+1; i < temp.length; i++)
      {
        if (temp[i].padding > temp[index].padding)
          counts++;
        else
          break;
      }
      temp.splice(index, counts);
      setStandards(temp);
    }

    //THIS FUNCTION WILL HANDLE THE DRAG AND DROP OF THE ROWS
    const handleDragEndResult = (temp) => {
      //it is returning because if we move the row to out of table it will show error so if destination is not present then don't move anywhere
      if (!temp.destination) return;

      let curr = [...standards];
      let counts = 1;
      for (let i = temp.source.index+1; i < curr.length; i++)
      {
        if (curr[i].padding > curr[temp.source.index].padding)
          counts++;
        else {
          break;
        }
      }        
      let children = curr.splice(temp.source.index, counts);        
      for (let i = 0; i < children.length; i++)
      {            
        curr.splice(temp.destination.index+i, 0, children[i]);
      }
      setStandards(curr);
    }
    // THIS FUNCTION WILL HANDLE CLICK LEFT ARROW WHILE ADDING NEW STANDARD
    const handleNewLeftClick = () => {
      setCurrentPadding((preval) => {
        if (preval === 25) return 0;
        return preval - 25;
      });        
    }
    // THIS FUNCTION WILL HANDLE CLICK RIGHT ARROW WHILE ADDING NEW STANDARD
    const handleNewRightClick = () => {
      setCurrentPadding((preval) => {
        if(preval===100) return preval
        return preval + 25;
      });        
    }

    return (
      <div className="Curriculum">
        <div className="content_container">
          {/* HEADING CONTAINER */}
          <div className="first_container">
            <h3>MATHEMATICS</h3>
          </div>

          {/* TABLE CONTAINER */}
          <div className="second_container">
            {/* THIS CONTAINS THE TABLE WITH DRAGGABLE ROWS  */}
            <DragDropContext onDragEnd={(temp) => handleDragEndResult(temp)}>
              <Table standards={standards} handleDeleteClick={handleDeleteClick} handleLeftClick={handleLeftClick} handleRightClick={ handleRightClick}/>
            </DragDropContext>
            {/* THIS CONTAINS THE TABLE WITH NEW STANDARD INPUT AND ADD A STANDARD BUTTON */}
            <AddStandard handleNewContent={handleNewContent} handleNewStandard={handleNewStandard} handleNewLeftClick={handleNewLeftClick} handleNewRightClick={handleNewRightClick} new_content={new_content}/>
          </div>
        </div>
      </div>
    );
}

export default Curriculum;
import React from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import './ActionButton.css';

function ActionButtons({ id,handleLeftClick,buttonName,handleRightClick,handleDeleteClick,index}) {
    return (
        <div className="tooltip_container">
            <div className="tooltip">{buttonName}</div>
            {
                buttonName === "Move"
                ?   (<a className="task_buttons" type="button">
                        <OpenWithIcon />
                    </a>)
                : (buttonName === "Outdent" 
                ?   (<a
                    className="task_buttons"
                    type="button"
                    onClick={() => handleLeftClick(index)}>
                        <ArrowBackIcon />
                    </a>)
                : (buttonName === "Indent" 
                ?   (<a
                    className="task_buttons"
                    type="button"
                    onClick={() => handleRightClick(id)}>
                        <ArrowForwardIcon />
                    </a>)
                :   (<a
                    className="task_buttons"
                    type="button"
                    onClick={() => handleDeleteClick(index)}>
                        <DeleteIcon />
                    </a>
                    )))
            }
        </div>
    )
}

export default ActionButtons;
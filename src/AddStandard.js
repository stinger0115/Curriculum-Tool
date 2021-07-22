import React, { useState } from 'react';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import './AddStandard.css';


function AddStandard({ handleNewLeftClick, handleNewRightClick, handleNewStandard, handleNewContent, new_content }) {
    return (
      <div>
        <table>
          <col style={{ width: "15%" }} />
          <col style={{ width: "85%" }} />
          <tbody>
            <tr>
              <td className="action_buttons">
                <div className="tooltip_container">
                  <div className="tooltip">Outdent</div>
                  <a
                    className="task_buttons"
                    onClick={handleNewLeftClick}
                    type="button"
                  >
                    <ArrowBackIcon />
                  </a>
                </div>
                <div className="tooltip_container">
                  <div className="tooltip">Indent</div>
                  <a
                    onClick={handleNewRightClick}
                    className="task_buttons"
                    type="button"
                  >
                    <ArrowForwardIcon />
                  </a>
                </div>
              </td>
              <td>
                <form id="input_form" onSubmit={handleNewStandard}>
                  <input
                    type="text"
                    value={new_content}
                    placeholder="Type standard here (eg. Numbers)"
                    onChange={handleNewContent}
                  />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" form="input_form" className="add_button">
          <AddCircleOutlineIcon />
          <p>Add a standard</p>
        </button>
      </div>
    );
}

export default AddStandard;
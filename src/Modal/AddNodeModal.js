import "./styles.css";
import {Button} from "../Button/Button";
import Popup from "reactjs-popup";

export const AddNodeModal = (props) => {
    return (
        <Popup
            trigger={<Button text={"Add node"}></Button>}
            modal
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Enter d value </div>
                    <div className="content">
                        <input value={props.dInput} onChange={props.handleDInput}/>
                    </div>
                    <div className="actions">
                        <div
                            className="button"
                            onClick={() => {
                                props.addNode()
                                close()
                            }}
                        >
                            Add
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}
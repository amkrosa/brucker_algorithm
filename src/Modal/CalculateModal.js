import Popup from "reactjs-popup";
import {Button} from "../Button/Button";
import "./styles.css";

export const CalculateModal = (props) => {
    return (
        <Popup
            trigger={<Button text={"Calculate"}></Button>}
            modal
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Enter number of processes </div>
                    <div className="content">
                        <input value={props.processesNumber} onChange={props.changeProcessesNumber}/>
                    </div>
                    <div className="actions">
                        <div className="button" onClick={() => {
                            const result = props.calculate(props.nodes, props.edges, props.processesNumber)
                            props.handleCalculate(result)
                            close()
                        }}>Calculate
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    )
}
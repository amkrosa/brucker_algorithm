export const DeleteButton = (props) => {
    return (
        <button className="delete-button" onClick={props.onClick}>
            &times;
        </button>
    )
}
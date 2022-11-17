import "./styles.css"

export const Input = (props) => {
    return (
        <input maxLength='3' value={props.value} onChange={props.onChange}/>
    )
}
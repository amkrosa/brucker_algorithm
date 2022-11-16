import "./styles.css"

export const Button = (props) => {
    return (
        <div className="button" onClick={props.onClick}>{props.text}</div>
    )
}

export const ExpandableButton = (props) => {
    return (
        <>
            <input className="c-checkbox" type="checkbox" id="checkbox"/>
            <div className="c-formContainer">
                <form className="c-form" action="">
                    <input className="c-form__input" placeholder="Enter d" type="text" value={props.value} onChange={props.onChange}/>
                    <label className="c-form__buttonLabel" htmlFor="checkbox">
                        <button className="c-form__button" type="button"
                                onClick={props.onClick}>{props.text}</button>
                    </label>
                    <label className="c-form__toggle" htmlFor="checkbox" data-title={props.expandText}></label>
                </form>
            </div>
        </>
    )
}
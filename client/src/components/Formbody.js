function Formbody(props) {
    return(
    <div className="form-group">
    <label for={props.name}>{props.field}</label>
    <input type={props.type} name={props.name} value={props.value} id={props.name} onChange={props.handleChange} required></input>
    </div>
);}

export default Formbody;
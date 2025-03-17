const PersonForm = ({onSubmit, nameValue, onNameChanged, numbervalue, onNumberChanged}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChanged}/>
      </div>
      <div>
        number: <input value={numbervalue} onChange={onNumberChanged}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
const Persons = ({persons, onRemove}) => {
  return (
    <>
    {persons.map(person => 
      <div key={person.name}>
        {person.name} {person.number} <button onClick={() => onRemove(person.id)}>delete</button>
      </div>
    )}
    </>
  )
}

export default Persons;
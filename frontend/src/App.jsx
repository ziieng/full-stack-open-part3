import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notifications from './components/Notifications'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id)).then(() => {
        setSuccessMessage(
          `Removed ${person.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(() => {
          setErrorMessage(
            `${person.name} was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const updatePerson = (newPerson, existingPerson) => {
    personService.update(existingPerson.id, newPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
      }).then(() => {
      setSuccessMessage(
        `Updated ${newPerson.name} to ${newPerson.number}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }).catch(() => {
      setErrorMessage(
        `Update of ${newPerson.name} failed; may have been removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with the new one?`)) {
        updatePerson(personObject, nameExists)
      }
      return;
    }

    
    personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
      }).then(() => {
        setSuccessMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }).catch(() => {
        setErrorMessage(
          `Addition of ${personObject.name} failed; please try again`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  
    setNewName('')
    setNewNumber('')
  }

  const handleNameChanged = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChanged = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChanged = (event) => {
    setFilterValue(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const displayPersons = filterValue === '' ? persons : filteredPersons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications successMessage={successMessage} errorMessage={errorMessage} />
      <Filter value={filterValue} onChange={handleFilterChanged} />
      <h2>Add new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        onNameChanged={handleNameChanged} 
        numbervalue={newNumber} 
        onNumberChanged={handleNumberChanged}
      />
      <h2>Numbers</h2>
      <Persons persons={displayPersons} onRemove={removePerson} />
    </div>
  )
}

export default App
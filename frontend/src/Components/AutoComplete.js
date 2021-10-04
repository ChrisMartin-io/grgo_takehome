
// Autocomplete bar
// pass state of bar value to Main
// Autofill with data props
import React from 'react';
import { Hint } from 'react-autocomplete-hint'

const AutoComplete = (props) => {
  const [hintData, setHintData] = React.useState([])
  const [currentText, setCurrentText] = React.useState('')

  React.useEffect(() => {
    if (!props.books) return <div>loading</div>
    let result = [];
    for (let item of props.books) {
      result.push(item.title)
    }
    setHintData(result)
  }, []) 

  const handleAutoCompleteChange = (event) => {
    setCurrentText(event.target.value)
    props.handleAutoComplete(event.target.value)
  }

  return (
    <div>
      <Hint options={hintData} allowTabFill>
        <input placeholder="Autocomplete" value={currentText} className='input-with-hint autocomplete' onChange={handleAutoCompleteChange} />
      </Hint>
    </div>
  )
}

export default AutoComplete
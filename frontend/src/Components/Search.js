
// Search bar
// Pass current value to main state
import Input from './Interface/Input'
import React from 'react';

function Search(props) {
  const [currentSearch, setCurrentSearch] = React.useState('')

  const handleSearchChange = (event) => {
    setCurrentSearch(event.target.value)
    props.handleSearchBar(event.target.value)
  }
  return (
    <div>
      <Input placeholder="Search" value={currentSearch} onChange={handleSearchChange} />
    </div>
  )
}

export default Search
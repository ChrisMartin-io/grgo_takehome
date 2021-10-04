
// set table columns and data
// render data
// if using Autocomplete or Search, data updated
// Selectable
import React from 'react';
import '../Styles/Main.css';
import Table from './Interface/Table'

const Books = (props) => {

  const data = props.books
  const columns = [
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Author',
      accessor: 'author',
    },
    {
      Header: 'Reviews',
      accessor: 'reviews'
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      Header: 'User Rating',
      accessor: 'user_rating'
    },
    {
      Header: 'Year',
      accessor: 'year'
    },
    {
      Header: 'Genre',
      accessor: 'genre'
    }
  ]
  if (!data) return <div> loading.. </div>
  return (
    <div className="box">
      <Table columns={columns} data={data} setStatus={props.setBook} />
    </div>
  )
}


export default Books
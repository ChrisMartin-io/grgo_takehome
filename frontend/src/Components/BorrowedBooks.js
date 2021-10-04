
import React from 'react';
import Table from './Interface/Table'
import '../Styles/Main.css';

function BorrowedBooks(props) {

  const data = props.borrowedBooks
  const columns = [
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'User',
      accessor: 'user'
    }
  ]
  if (!data) return <div>loading</div>
  return (
    <div className="box">
      <p>borrowed books</p>
      <div className="bottom-box">
        <Table columns={columns} data={data} setStatus={props.setBorrowedBook} borrowedPath={true}/>
      </div>
    </div>
  )
}

export default BorrowedBooks
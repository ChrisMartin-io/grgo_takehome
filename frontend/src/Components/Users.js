
import React from 'react';
import Table from './Interface/Table'
import '../Styles/Main.css';

function Users(props) {

  const data = props.users
  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    }
  ]
  if (!data) return <div>loading</div>
  return (
    <div className="box">
      <p>users</p>
      <Table columns={columns} data={data} setStatus={props.setUser} />
    </div>
  )
}

export default Users
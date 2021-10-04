import { useTable } from 'react-table'
import React from 'react';

function Table({ columns, data, setStatus, borrowedPath }) {
  if (!data) return <div>loading</div>
  
  const [selected, setSelected] = React.useState(-1)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
  })
  const handleClick = (id) => {
    console.log('click', id)
    setSelected(id)
    setStatus(id)
  }
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} onClick={() => handleClick(row.original.id)}
              style={{ backgroundColor: row.original.id === +selected ? 'turquoise' : 'white' }}
            >
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
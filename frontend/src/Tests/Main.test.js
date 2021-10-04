import React from 'react';
import Main from '../Components/Main';
import AutoComplete from '../Components/AutoComplete'
import Books from '../Components/Books'
import BorrowedBooks from '../Components/BorrowedBooks'
import Search from '../Components/Search'
import Button from '../Components/Interface/Button'
import Input from '../Components/Interface/Input'
import Table from '../Components/Interface/Table'


// import react-testing methods
import { render } from '@testing-library/react'

describe('Component renders', () => {
  test('Main component', async () => {
    render(<Main />);
  });
  test('AutoComplete component', async () => {
    render(<AutoComplete />);
  });
  test('Books component', async () => {
    render(<Books />);
  });
  test('BorrowedBooks component', async () => {
    render(<BorrowedBooks />);
  });
  test('Search component', async () => {
    render(<Search />);
  });
});

describe('Interface renders', () => {
  test('Button', async () => {
    render(<Button />);
  });
  test('Input', async () => {
    render(<Input />);
  });
})
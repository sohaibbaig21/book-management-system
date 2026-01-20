import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} />
    );
    
    expect(getByPlaceholderText('Book title or author')).toBeTruthy();
  });

  it('displays the current value', () => {
    const { getByDisplayValue } = render(
      <SearchBar value="Test Query" onChangeText={jest.fn()} />
    );
    
    expect(getByDisplayValue('Test Query')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Book title or author');
    fireEvent.changeText(input, 'New search');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('New search');
  });

  it('shows clear button when value is not empty', () => {
    const { getByText } = render(
      <SearchBar value="Some text" onChangeText={jest.fn()} onClear={jest.fn()} />
    );
    
    expect(getByText('✕')).toBeTruthy();
  });

  it('does not show clear button when value is empty', () => {
    const { queryByText } = render(
      <SearchBar value="" onChangeText={jest.fn()} onClear={jest.fn()} />
    );
    
    expect(queryByText('✕')).toBeNull();
  });

  it('calls onClear when clear button is pressed', () => {
    const mockOnClear = jest.fn();
    const { getByText } = render(
      <SearchBar value="Some text" onChangeText={jest.fn()} onClear={mockOnClear} />
    );
    
    const clearButton = getByText('✕');
    fireEvent.press(clearButton);
    
    expect(mockOnClear).toHaveBeenCalled();
  });
});
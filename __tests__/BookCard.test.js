import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookCard from '../components/BookCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('BookCard Component', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    authors: ['Test Author'],
    publishedDate: '2020-01-01',
    imageUrl: 'https://example.com/cover.jpg',
    averageRating: 4.5,
    ratingsCount: 100,
  };

  it('renders book information correctly', () => {
    const { getByText } = render(<BookCard book={mockBook} />);
    
    expect(getByText('Test Book')).toBeTruthy();
    expect(getByText('by Test Author')).toBeTruthy();
    expect(getByText('Published in 2020')).toBeTruthy();
    expect(getByText('4.5 (100 reviews)')).toBeTruthy();
  });

  it('handles multiple authors correctly', () => {
    const bookWithMultipleAuthors = {
      ...mockBook,
      authors: ['Author One', 'Author Two'],
    };
    
    const { getByText } = render(<BookCard book={bookWithMultipleAuthors} />);
    expect(getByText('by Author One, Author Two')).toBeTruthy();
  });

  it('displays correct number of stars for rating', () => {
    const { getAllByText } = render(<BookCard book={mockBook} />);
    const stars = getAllByText('★');
    expect(stars.length).toBe(5); // Total stars (filled + empty)
  });

  it('navigates to book detail on press', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('expo-router'), 'useRouter').mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<BookCard book={mockBook} />);
    const card = getByText('Test Book');
    
    fireEvent.press(card);
    expect(mockPush).toHaveBeenCalledWith('/book/1');
  });
});
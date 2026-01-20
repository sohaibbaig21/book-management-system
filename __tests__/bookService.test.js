import { searchBooks, getBookById, getFeaturedBooks } from '../services/bookService';
import { googleBooksApi } from '../services/api';

// Mock the API
jest.mock('../services/api');

describe('Book Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchBooks', () => {
    it('returns formatted book data on successful search', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              id: '1',
              volumeInfo: {
                title: 'Test Book',
                authors: ['Test Author'],
                publishedDate: '2020-01-01',
                description: 'Test description',
                imageLinks: {
                  thumbnail: 'http://example.com/thumb.jpg',
                },
                averageRating: 4.5,
                ratingsCount: 100,
              },
            },
          ],
        },
      };

      googleBooksApi.get.mockResolvedValue(mockResponse);

      const results = await searchBooks('test query');

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Test Book');
      expect(results[0].authors[0]).toBe('Test Author');
      expect(results[0].imageUrl).toBe('https://example.com/thumb.jpg');
    });

    it('returns empty array when no books found', async () => {
      const mockResponse = {
        data: {},
      };

      googleBooksApi.get.mockResolvedValue(mockResponse);

      const results = await searchBooks('nonexistent book');

      expect(results).toEqual([]);
    });

    it('throws error on API failure', async () => {
      googleBooksApi.get.mockRejectedValue(new Error('Network error'));

      await expect(searchBooks('test')).rejects.toThrow(
        'Failed to search books. Please check your connection.'
      );
    });

    it('handles books with missing image links', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              id: '1',
              volumeInfo: {
                title: 'Book Without Cover',
                authors: ['Author'],
              },
            },
          ],
        },
      };

      googleBooksApi.get.mockResolvedValue(mockResponse);

      const results = await searchBooks('test');

      expect(results[0].imageUrl).toBeNull();
    });
  });

  describe('getBookById', () => {
    it('returns formatted book data for valid ID', async () => {
      const mockResponse = {
        data: {
          id: '123',
          volumeInfo: {
            title: 'Specific Book',
            authors: ['Specific Author'],
            publishedDate: '2021-01-01',
            description: 'Detailed description',
            averageRating: 4.0,
            ratingsCount: 50,
          },
        },
      };

      googleBooksApi.get.mockResolvedValue(mockResponse);

      const result = await getBookById('123');

      expect(result.id).toBe('123');
      expect(result.title).toBe('Specific Book');
    });

    it('throws error when book not found', async () => {
      googleBooksApi.get.mockRejectedValue(new Error('Not found'));

      await expect(getBookById('invalid-id')).rejects.toThrow(
        'Failed to fetch book details. Please try again.'
      );
    });
  });

  describe('getFeaturedBooks', () => {
    it('returns list of featured books', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              id: '1',
              volumeInfo: {
                title: 'Featured Book 1',
                authors: ['Author 1'],
              },
            },
            {
              id: '2',
              volumeInfo: {
                title: 'Featured Book 2',
                authors: ['Author 2'],
              },
            },
          ],
        },
      };

      googleBooksApi.get.mockResolvedValue(mockResponse);

      const results = await getFeaturedBooks();

      expect(results).toHaveLength(2);
      expect(results[0].title).toBe('Featured Book 1');
      expect(results[1].title).toBe('Featured Book 2');
    });

    it('handles API errors gracefully', async () => {
      googleBooksApi.get.mockRejectedValue(new Error('Server error'));

      await expect(getFeaturedBooks()).rejects.toThrow(
        'Failed to fetch featured books.'
      );
    });
  });
});
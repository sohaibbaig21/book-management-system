import { googleBooksApi, openLibraryApi } from './api';

/**
 * Search for books using Google Books API
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum results to return
 * @returns {Promise} - Promise with book results
 */
export const searchBooks = async (query, maxResults = 20) => {
  try {
    const response = await googleBooksApi.get('/volumes', {
      params: {
        q: query,
        maxResults,
        printType: 'books',
      },
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map(item => formatBookData(item));
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error('Failed to search books. Please check your connection.');
  }
};

/**
 * Get book details by ID
 * @param {string} bookId - Google Books API book ID
 * @returns {Promise} - Promise with book details
 */
export const getBookById = async (bookId) => {
  try {
    const response = await googleBooksApi.get(`/volumes/${bookId}`);
    return formatBookData(response.data);
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw new Error('Failed to fetch book details. Please try again.');
  }
};

/**
 * Format book data from Google Books API
 * @param {Object} item - Raw book data from API
 * @returns {Object} - Formatted book data
 */
const formatBookData = (item) => {
  const volumeInfo = item.volumeInfo || {};
  const saleInfo = item.saleInfo || {};

  return {
    id: item.id,
    title: volumeInfo.title || 'Unknown Title',
    authors: volumeInfo.authors || ['Unknown Author'],
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    description: volumeInfo.description || 'No description available.',
    imageUrl: volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
    largImageUrl: volumeInfo.imageLinks?.large?.replace('http://', 'https://') || 
                  volumeInfo.imageLinks?.medium?.replace('http://', 'https://') ||
                  volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || [],
    publisher: volumeInfo.publisher || 'Unknown Publisher',
    language: volumeInfo.language || 'en',
    previewLink: volumeInfo.previewLink || null,
    infoLink: volumeInfo.infoLink || null,
  };
};

/**
 * Get featured/popular books
 * @returns {Promise} - Promise with featured books
 */
export const getFeaturedBooks = async () => {
  try {
    const response = await googleBooksApi.get('/volumes', {
      params: {
        q: 'subject:fiction',
        orderBy: 'relevance',
        maxResults: 10,
      },
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map(item => formatBookData(item));
  } catch (error) {
    console.error('Error fetching featured books:', error);
    throw new Error('Failed to fetch featured books.');
  }
};
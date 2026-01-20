import { googleBooksApi, openLibraryApi } from './api';

/**
 * Search for books using Google Books API
 * @param {string} query - Search query
 * @param {string} searchType - Search type: 'title', 'author', or 'general'
 * @param {number} maxResults - Maximum results to return
 * @returns {Promise} - Promise with book results
 */
export const searchBooks = async (query, searchType = 'general', maxResults = 20) => {
  try {
    // Format query based on search type
    let formattedQuery = query;
    switch (searchType) {
      case 'title':
        formattedQuery = `intitle:${query}`;
        break;
      case 'author':
        formattedQuery = `inauthor:${query}`;
        break;
      case 'general':
      default:
        formattedQuery = query;
        break;
    }

    const response = await googleBooksApi.get('/volumes', {
      params: {
        q: formattedQuery,
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
  if (!item) {
    console.warn('formatBookData received undefined item');
    return {
      id: 'unknown',
      title: 'Unknown Title',
      authors: ['Unknown Author'],
      publishedDate: 'Unknown',
      description: 'No description available.',
      imageUrl: null,
      largImageUrl: null,
      averageRating: 0,
      ratingsCount: 0,
      pageCount: 0,
      categories: [],
      publisher: 'Unknown Publisher',
      language: 'en',
      previewLink: null,
      infoLink: null,
    };
  }

  const volumeInfo = item.volumeInfo || {};
  const saleInfo = item.saleInfo || {};

  // Ensure authors is always an array
  const authors = Array.isArray(volumeInfo.authors) && volumeInfo.authors.length > 0
    ? volumeInfo.authors
    : ['Unknown Author'];

  // Ensure categories is always an array
  const categories = Array.isArray(volumeInfo.categories) ? volumeInfo.categories : [];

  return {
    id: item.id || 'unknown',
    title: volumeInfo.title || 'Unknown Title',
    authors,
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    description: volumeInfo.description || 'No description available.',
    imageUrl: volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
    largImageUrl: volumeInfo.imageLinks?.large?.replace('http://', 'https://') ||
                  volumeInfo.imageLinks?.medium?.replace('http://', 'https://') ||
                  volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    pageCount: volumeInfo.pageCount || 0,
    categories,
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
    console.log('Fetching featured books from Google Books API...');
    const response = await googleBooksApi.get('/volumes', {
      params: {
        q: 'subject:fiction',
        orderBy: 'relevance',
        maxResults: 10,
      },
    });

    console.log('API response received:', response.status);
    if (!response.data.items) {
      console.log('No items found in response');
      return [];
    }

    console.log('Books found:', response.data.items.length);
    return response.data.items
      .filter(item => item && item.id) // Filter out invalid items
      .map(item => formatBookData(item));
  } catch (error) {
    console.error('Error fetching featured books:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      isAxiosError: error.isAxiosError,
    });
    throw new Error('Failed to fetch featured books. Please check your internet connection.');
  }
};
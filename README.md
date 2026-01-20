# Book Explorer App

A React Native mobile application built with Expo that allows users to explore books, search for titles and authors, and view detailed book information with ratings and reviews.

## Features

- 📚 Browse featured books on the home screen
- 🔍 Search for books by title or author with real-time results
- 📖 View detailed book information including:
  - Book cover images
  - Author details
  - Publication information
  - User ratings and reviews
  - Book descriptions
  - Page count and categories
- ⭐ Star rating visualization
- 🔗 Direct links to preview books
- 📱 Responsive design for mobile devices
- ⚡ Debounced search for better performance
- 🛡️ Comprehensive error handling

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **Axios** - HTTP client for API requests
- **Google Books API** - Book data source
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book-explorer-app.git
cd book-explorer-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Or press `a` for Android emulator or `i` for iOS simulator

## Project Structure

```
book-explorer-app/
├── app/                      # Application screens (Expo Router)
│   ├── (tabs)/              # Tab-based navigation
│   │   ├── index.js         # Home screen
│   │   └── _layout.js       # Tab layout
│   ├── book/                # Book detail screen
│   │   └── [id].js          # Dynamic route for book details
│   ├── search.js            # Search screen
│   └── _layout.js           # Root layout
├── components/              # Reusable components
│   ├── BookCard.js         # Book list item component
│   ├── BookDetail.js       # Book detail view component
│   ├── SearchBar.js        # Search input component
│   └── ErrorMessage.js     # Error display component
├── services/               # API services
│   ├── api.js             # Axios configuration
│   └── bookService.js     # Book-related API calls
├── constants/             # App constants
│   └── Colors.js         # Color palette
├── hooks/                # Custom React hooks
│   └── useDebounce.js   # Debounce hook for search
├── __tests__/           # Test files
│   ├── BookCard.test.js
│   ├── SearchBar.test.js
│   └── bookService.test.js
└── assets/             # Images and static files
```

## API Integration

The app uses the **Google Books API** to fetch book data:

- **Search Endpoint**: `/volumes?q={query}`
- **Book Details**: `/volumes/{volumeId}`
- **No API key required** for basic usage
- Rate limiting applies (1000 requests per day for free tier)

### API Response Format

The app transforms Google Books API responses into a standardized format:

```javascript
{
  id: string,
  title: string,
  authors: string[],
  publishedDate: string,
  description: string,
  imageUrl: string,
  averageRating: number,
  ratingsCount: number,
  pageCount: number,
  categories: string[],
  publisher: string,
}
```

## Key Components

### BookCard Component
Displays book information in a list format with:
- Book cover thumbnail
- Title and authors
- Publication year
- Star rating visualization
- Review count

### SearchBar Component
Provides search functionality with:
- Real-time search input
- Clear button
- Debounced API calls (500ms delay)
- Search icon and placeholder text

### BookDetail Component
Shows comprehensive book information:
- Large cover image
- Full title and author details
- Complete description
- Rating and review statistics
- Preview/read button
- Author information
- Additional metadata

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Test Coverage

The app includes unit tests for:
- Component rendering and interactions
- API service functions
- Error handling
- User input handling

## Building for Production

### Android APK

1. Configure your app.json with proper package name
2. Build the APK:

```bash
eas build --platform android --profile preview
```

Or build locally:

```bash
expo build:android
```

### iOS

```bash
eas build --platform ios
```

## Error Handling

The app implements comprehensive error handling for:

- **Network failures**: Displays user-friendly error messages
- **API errors**: Catches and displays specific error information
- **Missing data**: Provides fallback values for incomplete book data
- **Invalid searches**: Shows helpful messages when no results found
- **Image loading failures**: Uses placeholder images

## Performance Optimizations

- **Debounced search**: Reduces API calls during typing (500ms delay)
- **FlatList optimization**: Efficient rendering of large book lists
- **Image caching**: Leverages React Native's image caching
- **Lazy loading**: Components load data only when needed

## Design Principles

The UI follows the provided Figma design specifications:

- Clean, minimalist interface
- Green accent color (#5FD068) for primary actions
- Consistent spacing and typography
- Card-based layouts for book items
- Easy navigation with back buttons
- Search-first approach

## Troubleshooting

### Common Issues

**Issue**: App won't start
**Solution**: Clear cache with `expo start -c`

**Issue**: Images not loading
**Solution**: Check internet connection and HTTPS image URLs

**Issue**: Search not working
**Solution**: Verify API endpoint accessibility

**Issue**: Tests failing
**Solution**: Run `npm install` to ensure all dependencies are installed

## Future Enhancements

Potential features for future versions:

- [ ] Bookmarking/favorites functionality
- [ ] Reading list management
- [ ] Offline support with local storage
- [ ] Advanced filtering (by genre, year, rating)
- [ ] User authentication
- [ ] Social sharing features
- [ ] Dark mode support
- [ ] Multiple API sources (Open Library, NYTimes)
- [ ] Book recommendations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Google Books API](https://developers.google.com/books) for book data
- [Expo](https://expo.dev/) for the excellent development platform
- [React Native](https://reactnative.dev/) community

## Contact

For questions or feedback, please open an issue in the GitHub repository.

---

Built with ❤️ using React Native and Expo
# 📚 Book Explorer App

A beautiful and intuitive mobile book discovery application built with React Native and Expo. Browse, search, and explore books from the Google Books API with a clean, modern interface.

## ✨ Features

- **📖 Book Discovery**: Browse featured books on the home screen
- **🔍 Advanced Search**: Search books by title, author, or general keywords
- **📱 Responsive Design**: Clean, modern UI that works seamlessly on mobile devices
- **⚡ Real-time Search**: Debounced search with instant results
- **📋 Book Details**: View comprehensive book information including descriptions, ratings, and publication details
- **🎨 Modern UI**: Beautiful design with smooth animations and intuitive navigation
- **🔄 Cross-platform**: Works on both iOS and Android devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sohaibbaig21/book-management-system.git
   cd book-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**
   - For iOS: Press `i` in the terminal or scan QR code with Camera app on iOS
   - For Android: Press `a` in the terminal or scan QR code with Expo Go app
   - For web: Press `w` in the terminal

## 📱 Usage

### Home Screen
- View featured books curated from the Google Books API
- Tap the search bar to navigate to the search screen

### Search Screen
- **Search Type Selection**: Tap the "Search by" selector to choose between:
  - **All**: General search across titles and authors
  - **Title**: Search specifically by book title
  - **Author**: Search specifically by author name
- **Search Input**: Type your query and press Enter or the search button on your keyboard
- **Results**: Browse through search results with book covers, titles, and authors

### Book Details
- Tap any book card to view detailed information
- See full descriptions, publication dates, ratings, and more

## 🏗️ Project Structure

```
book-explorer-app/
├── app/                    # App screens (Expo Router)
│   ├── _layout.js         # Root layout
│   ├── index.js           # Home screen
│   ├── search.js          # Search screen
│   └── book/
│       └── [id].js        # Book details screen
├── components/            # Reusable UI components
│   ├── BookCard.js        # Book display card
│   ├── BookDetail.js      # Book details component
│   ├── SearchBar.js       # Search input component
│   └── ErrorMessage.js    # Error display component
├── constants/             # App constants
│   └── Colors.js          # Color theme definitions
├── hooks/                 # Custom React hooks
│   └── useDebounce.js     # Debounce hook for search
├── services/              # API services
│   ├── api.js            # Axios configuration
│   └── bookService.js    # Book API functions
├── assets/               # Static assets
│   ├── icon.png          # App icon
│   ├── splash.png        # Splash screen
│   └── adaptive-icon.png # Adaptive icon
├── android/              # Android native code
└── package.json          # Dependencies and scripts
```

## 🛠️ Technologies Used

- **React Native**: Cross-platform mobile development framework
- **Expo**: Platform for universal React applications
- **Expo Router**: File-based routing for React Native
- **Google Books API**: External API for book data
- **Axios**: HTTP client for API requests
- **React Navigation**: Navigation library (via Expo Router)

## 🔧 Configuration

### API Setup
The app uses the Google Books API. No additional API keys are required as it uses the public API endpoints.

### Environment Variables
No environment variables are required for basic functionality.

## 📋 Available Scripts

- `npm start` or `npx expo start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Books API](https://developers.google.com/books) for providing book data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for the mobile framework

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

---

**Happy Reading! 📚✨**
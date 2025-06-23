# Training Course Management System (TCMS)

A comprehensive web application for managing training courses, proposals, and customer relationships built with React.js and modern web technologies.

## Features

- User Authentication and Authorization
- Course Management System
- Proposal Generation and Management
- Customer Relationship Management
- Access Control and Role Management
- Product and Service Management
- Terms and Conditions Management
- Responsive UI with Modern Design

## Tech Stack

- React.js with Vite
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation
- Context API for state management
- Jest for testing
- SweetAlert2 for notifications
- Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TCMS.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
- Copy `.env.development` and `.env.production` to your environment files
- Update the configuration as needed

### Running the Application

Development mode:
```bash
npm run dev
# or
yarn dev
```

Production mode:
```bash
npm run dev:prod
# or
yarn dev:prod
```

### Building for Production

```bash
npm run build:prod
# or
yarn build:prod
```

## Project Structure

```bash
TCMS/
├── public/                      # Static assets
├── src/
│   ├── assets/                 # Application assets
│   ├── components/             # Reusable React components
│   ├── config/                 # Application configuration
│   ├── context/                # React Context providers
│   ├── pages/                  # Application pages
│   ├── routing/                # Route configuration
│   ├── services/               # API services
│   └── utils/                  # Utility functions
├── .env.development            # Development environment variables
├── .env.production             # Production environment variables
└── package.json                # Project dependencies and scripts
```

## API Documentation

For detailed API documentation, please refer to [APIDOCK.md](./APIDOCK.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, please:
- Open an issue in the GitHub repository
- Contact the development team directly
- Check the documentation in the docs directory

## Acknowledgments

- Thanks to all contributors and users
- Special thanks to the React community and open-source contributors
- Built with modern web development tools and best practices

---

For more detailed documentation, refer to the documentation files in the docs directory.

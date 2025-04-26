# VKS Admin Dashboard

A modern admin dashboard built with React, TypeScript, and Tailwind CSS. This project provides a clean and efficient interface for managing and visualizing data.

## Features

- Modern UI with Tailwind CSS
- TypeScript for type safety
- React Router for navigation
- Radix UI components for accessible UI elements
- Recharts for data visualization
- Responsive design
- Google Authentication for secure access

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Data Visualization**: Recharts
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Authentication**: Google OAuth 2.0

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm (package manager)
- Google Cloud Platform account for OAuth setup

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vks-admin
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up Google OAuth:
   - Create a project in Google Cloud Console
   - Enable the Google+ API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized JavaScript origins
   - Create a `.env` file in the root directory with your Google OAuth credentials:
     ```
     VITE_GOOGLE_CLIENT_ID=your_client_id
     VITE_GOOGLE_CLIENT_SECRET=your_client_secret
     ```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm preview` - Preview the production build locally

## Project Structure

```
vks-admin/
├── src/            # Source files
├── public/         # Static assets
├── dist/           # Production build
├── node_modules/   # Dependencies
├── package.json    # Project configuration
├── tsconfig.json   # TypeScript configuration
├── vite.config.ts  # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

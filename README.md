# Early Warning Signal Dashboard

A comprehensive admin dashboard for managing and monitoring early warning signals for financial institutions. This application helps banks track dealer performance, monitor credit risks, and manage supply chain financing relationships.

<!-- Add a screenshot of your deployed application here -->
<!-- ![Early Warning Signal Dashboard](screenshot.png) -->

## Features

- **Authentication System**: Secure login with email/password authentication
- **Dark/Light Mode**: Toggle between dark and light themes for better user experience
- **Dashboard Overview**: Visual metrics and KPIs for quick monitoring
- **Master Data Management**:
  - Anchor Master: Manage anchor companies
  - Dealer Master: Manage dealer information and relationships
- **Monitoring Tools**:
  - Stop Supply: Track and manage dealers on stop supply
  - FLDG View: Monitor first loss default guarantees
  - Dealer Status: Real-time dealer performance tracking
- **Administration**:
  - Reports: Generate and view system reports
  - Templates: Manage email and notification templates
  - Configuration: System-wide settings and preferences

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: Custom authentication system with localStorage
- **Styling**: Tailwind CSS with custom theming
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or pnpm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/MechanicalMaster/early-warning-signal.git
   cd early-warning-signal
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login Credentials

For demo purposes, use the following credentials:
- Email: user@yesbnak.in
- Password: password

## Deployment

The application is deployed on Vercel. For your own deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings

## Project Structure

```
early-warning-signal/
├── app/                      # Next.js app directory
│   ├── (dashboard)/          # Dashboard routes (protected)
│   ├── login/                # Login page
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── ui/                   # UI components
│   └── ...                   # Feature components
├── lib/                      # Utility functions
│   ├── auth.ts               # Authentication utilities
│   └── utils.ts              # Helper functions
└── public/                   # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/) 
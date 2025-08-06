# Muhammad Younas Khan's Personal Portfolio Website

This is the source code for Muhammad Younas Khan's personal portfolio website, built with Next.js, React, and Tailwind CSS. It showcases his skills, projects, education, and provides a way for visitors to get in touch or leave reviews.

## Features

*   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
*   **Dark/Light Mode Toggle**: Persists user preference using local storage.
*   **Dynamic Hero Section**: Rotates through professional roles.
*   **Skills & Tech Stack**: Detailed overview of technical proficiencies.
*   **Projects Showcase**: Highlights key projects with descriptions and GitHub links (where available).
*   **Automated GitHub Projects**: Fetches and displays projects directly from your GitHub repositories.
*   **Certifications & Education**: Displays academic background and professional certifications.
*   **Testimonials & Reviews**: Section for client feedback and a form for new reviews.
*   **Contact Form**: Allows visitors to send messages directly.
*   **Google Sheets Integration**: Contact form and review submissions are logged to Google Sheets.
*   **Direct Email Sending**: Contact form submissions send emails directly via Gmail SMTP.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation

1.  **Download the code**:
    Click the "Download Code" button in v0 to get a ZIP file of the project.
    Extract the contents of the ZIP file to your desired directory.

2.  **Navigate to the project directory**:
    \`\`\`bash
    cd muhammad-younas-portfolio
    \`\`\`

3.  **Install dependencies**:
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

### Environment Variables

This project uses environment variables for Google Sheets integration, direct Gmail SMTP for sending contact emails, and GitHub API access for dynamic projects.

1.  Create a `.env.local` file in the root of your project:
    \`\`\`
    # Google Sheets Integration (for contact form and reviews)
    GOOGLE_SHEET_ID=YOUR_GOOGLE_SHEET_ID
    GOOGLE_REFRESH_TOKEN=YOUR_GOOGLE_REFRESH_TOKEN

    # Gmail SMTP for Direct Email Sending
    GMAIL_EMAIL=YOUR_GMAIL_ADDRESS@gmail.com
    GMAIL_APP_PASSWORD=YOUR_GMAIL_APP_PASSWORD

    # GitHub API for Dynamic Projects
    GITHUB_USERNAME=YOUR_GITHUB_USERNAME # e.g., YUET-944
    GITHUB_PAT=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
    \`\`\`

2.  **How to get `GOOGLE_SHEET_ID` and `GOOGLE_REFRESH_TOKEN`**:
    *   **Google Sheet ID**: Create a new Google Sheet. The ID is found in the URL: `https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID/edit`.
    *   **Google Refresh Token**: This is more involved. You'll need to set up a Google Cloud Project, enable the Google Sheets API, create OAuth 2.0 credentials (Web application type), and then use a script or a tool to get a refresh token. This token allows your application to access Google Sheets on your behalf without re-authenticating every time.
        *   **Client ID** and **Client Secret** are hardcoded in `app/actions/contact.ts` and `app/actions/reviews.ts` for simplicity in this v0 generation. In a production application, these should also be environment variables.
        *   For generating a refresh token, you can use a small Node.js script with `googleapis` library, following Google's OAuth2 documentation.

3.  **How to get `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD`**:
    *   **`GMAIL_EMAIL`**: This is the Gmail address you want to use to send emails from (e.g., `mykjcs2023@gmail.com`).
    *   **`GMAIL_APP_PASSWORD`**: You need to generate an App Password from your Google Account security settings.
        *   Go to your Google Account.
        *   Navigate to Security.
        *   Under "How you sign in to Google," select "2-Step Verification" and ensure it's ON.
        *   Below that, select "App passwords."
        *   Follow the instructions to generate a new 16-digit App Password. This password will only be shown once.

4.  **How to get `GITHUB_USERNAME` and `GITHUB_PAT`**:
    *   **`GITHUB_USERNAME`**: Your GitHub username (e.g., `YUET-944`).
    *   **`GITHUB_PAT` (Personal Access Token)**:
        *   Go to GitHub.com, navigate to your profile settings.
        *   Go to "Developer settings" -> "Personal access tokens" -> "Tokens (classic)".
        *   Click "Generate new token (classic)".
        *   Give it a descriptive name (e.g., "Portfolio_Read_Repos").
        *   Grant it at least the `public_repo` scope (or `repo` if you want to fetch private repositories).
        *   Generate the token and copy it immediately, as it will not be shown again.

**Note**: If you don't configure these environment variables, the corresponding features (Google Sheets, Gmail SMTP, GitHub projects) will not function as expected, but the rest of the site will still load.

### Running the Development Server

To start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

The easiest way to deploy your Next.js application is to use the [Vercel Platform](https://vercel.com/new?utm_medium=portfolio&utm_source=github&utm_campaign=muhammad-younas-portfolio).

1.  **Initialize a Git repository** in your project folder:
    \`\`\`bash
    git init
    git add .
    git commit -m "Initial commit: Muhammad Younas Khan Portfolio"
    \`\`\`

2.  **Create a new repository on GitHub** (e.g., `muhammad-younas-portfolio`).

3.  **Connect your local repository to GitHub**:
    \`\`\`bash
    git remote add origin https://github.com/YOUR_GITHUB_USERNAME/muhammad-younas-portfolio.git
    git branch -M main
    git push -u origin main
    \`\`\`
    (Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username).

4.  **Deploy to Vercel**:
    *   Go to [vercel.com](https://vercel.com/) and sign up/log in with your GitHub account.
    *   Click "New Project" and import your GitHub repository.
    *   Vercel will automatically detect it's a Next.js project.
    *   During the deployment setup, remember to add all your **Environment Variables** (`GOOGLE_SHEET_ID`, `GOOGLE_REFRESH_TOKEN`, `GMAIL_EMAIL`, `GMAIL_APP_PASSWORD`, `GITHUB_USERNAME`, `GITHUB_PAT`) in the project settings.
    *   Click "Deploy" – your site will be live in minutes!

Your website will be available at a Vercel URL (e.g., `https://muhammad-younas-portfolio.vercel.app`). You can also set up a [custom domain](https://vercel.com/docs/concepts/projects/domains) later.

## Project Structure

\`\`\`
.
├── app/
│   ├── actions/
│   │   ├── contact.ts        # Server Action for contact form submission
│   │   ├── reviews.ts        # Server Action for review submission
│   │   └── github-projects.ts # New Server Action for fetching GitHub projects
│   ├── globals.css           # Global Tailwind CSS styles
│   ├── layout.tsx            # Root layout for the application
│   └── page.tsx              # Main page component (home page)
├── components/
│   ├── ui/                   # Shadcn UI components (not included, assumed to be present)
│   ├── about.tsx             # About Me section
│   ├── certificates.tsx      # Certificates and Achievements section
│   ├── contact.tsx           # Contact Me section and form
│   ├── education.tsx         # Education and Languages section
│   ├── footer.tsx            # Website footer
│   ├── hero.tsx              # Hero section with intro and social links
│   ├── navigation.tsx        # Responsive navigation bar
│   ├── projects.tsx          # Featured Projects section (now fetches GitHub repos)
│   ├── reviews.tsx           # Reviews and Feedback section
│   ├── skills.tsx            # Skills and Expertise section
│   ├── tech-stack.tsx        # Tech Stack section
│   └── testimonials.tsx      # Testimonials section
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── og-image.jpg          # Open Graph image for social sharing
│   ├── grid.svg              # Background grid pattern
│   ├── Muhammad_Younas_Khan_CV.txt # Your resume in text format
│   ├── Muhammad_Younas_Khan_CV.pdf # Your resume in PDF format
│   └── microsoft-certificate.jpg # Certificate image
├── scripts/
│   └── deploy-instructions.sh # Deployment instructions script
├── .env.local.example        # Example environment variables file
├── package.json              # Project dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.mjs           # Next.js configuration
\`\`\`

## Contributing

Feel free to fork this repository and adapt it for your own portfolio! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

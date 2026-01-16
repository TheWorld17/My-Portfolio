
# Roman Vykeryk | Professional Portfolio

A high-performance, dark-themed personal portfolio website built with modern web technologies. Designed to showcase dual expertise in **Web Development** (Landing Pages) and **Network Engineering** (Cisco, VLANs).

![Tech Stack](https://skillicons.dev/icons?i=react,ts,vite,tailwind,html,css)

## ⚡ Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for lightning-fast performance.
- **Agency-Style UI**: Dark mode aesthetic, custom "Silk" canvas animations, and smooth reveal effects.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Project Filtering**: Sort projects by "Web Development" or "Network Administration".
- **Lightbox Gallery**: Detailed project views with modal images and specifications.
- **Contact Form**: Integrated with **Netlify Forms** for serverless email handling.
- **Performance**: Optimized assets, lazy loading, and intersection observers.

## 🛠️ Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 🚀 Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

The output will be generated in the `dist` folder.

## 🌐 Deployment (Netlify)

This project is configured for seamless deployment on Netlify.

### Option 1: Drag & Drop (Manual)
1. Run `npm run build`.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag the `dist` folder into the upload area.

### Option 2: Continuous Deployment (Recommended)
1. Push your code to GitHub.
2. Log in to Netlify and click **"New site from Git"**.
3. Select your repository.
4. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy**.

### Form Handling
The `index.html` includes a hidden form helper ensuring Netlify bots detect the contact form during the build process. No backend code is required—submissions will appear in your Netlify dashboard under the "Forms" tab.

## 📂 Project Structure

```
├── components/      # React components (Header, Hero, Portfolio, etc.)
├── data/            # Static data (Projects list)
├── types/           # TypeScript interfaces
├── App.tsx          # Main application layout
├── index.html       # Entry point (contains Netlify form helper)
├── main.tsx         # React root
└── tailwind.config  # Styling configuration
```

## 👨‍💻 Author

**Roman Vykeryk**  
*Web Developer & Network Specialist*

- [Freelancehunt Profile](https://freelancehunt.com/freelancer/TheWorld99.html)
- [LinkedIn](https://www.linkedin.com/in/roman-vykeryk-b8a133336/)

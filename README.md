# DTEmpire Documentation Website

![DTEmpire Banner](https://img.shields.io/badge/DTEmpire-%20Docs-00ff41?style=for-the-badge&logo=matrix&logoColor=white)
![Live Site](https://img.shields.io/website?url=https%3A%2F%2Fdocs.ankitgupta.com.np&style=for-the-badge&label=Live%20Site&color=00ff41)
![License](https://img.shields.io/badge/License-MIT-00ff41?style=for-the-badge)

A sleek, hacker-themed documentation website for DTEmpire services featuring interactive terminal, matrix rain effects, and comprehensive service documentation.

## 🌐 Live Site
**[https://docs.ankitgupta.com.np](https://docs.ankitgupta.com.np)**

## 📁 Project Structure
```
├── index.html              # Main HTML structure
├── styles.css              # CSS styles with hacker theme
├── script.js              # Interactive JavaScript functionality
├── server.js              # Node.js server (if applicable)
└── image/                 # Favicon and image assets
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    └── site.webmanifest
```

## ✨ Features

### 🎨 **Visual Design**
- **Hacker/Matrix Theme**: Neon green on black background
- **Matrix Rain Effect**: Animated background with falling characters
- **Glow Effects**: Interactive hover animations with glow
- **Responsive Design**: Mobile-friendly layout
- **Terminal Interface**: Interactive system terminal
- **Particle System**: Animated floating particles

### ⚡ **Interactive Elements**
- **Dynamic Content Loading**: Single-page application style
- **Real-time Server Status**: Live server time display
- **Typewriter Animations**: Code and text typing effects
- **Copy-to-Clipboard**: For code snippets and configuration
- **Scroll Animations**: Elements fade in on scroll
- **Theme Toggle**: Light/Dark mode support

### 📚 **Documentation Sections**
1. **Home** - Overview and quick stats
2. **Live Status** - Service monitoring dashboard
3. **Discord** - Community links and bot invites
4. **Lavalink v4** - Free Lavalink server documentation
5. **Music Bot** - Discord music bot features and commands
6. **Image Generation API** - AI image generation service
7. **Game Servers** - Minecraft server information
8. **Websites** - Web services and applications
9. **API Documentation** - Complete API references
10. **GitHub** - Open source projects and contributions

## 🛠️ Technologies Used

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Orbitron, Share Tech Mono, Roboto Mono

### **Features Implemented**
- Intersection Observer API for scroll animations
- Canvas API for matrix rain effect
- Clipboard API for copy functionality
- CSS Grid & Flexbox for layouts
- CSS Animations & Transitions
- Responsive Design with media queries

## 🚀 Quick Start

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/yourusername/dtempire-docs.git
cd dtempire-docs
```

2. Open in browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

3. Visit `http://localhost:8000` in your browser

### Deployment
The site is static and can be deployed to any web hosting service:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Import GitHub repository
- **Traditional Hosting**: Upload files via FTP

## 🔧 Configuration

### Customizing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #00ff41;          /* Neon green */
    --primary-dark: #008f11;     /* Dark green */
    --secondary: #003b00;        /* Deep green background */
    --bg-dark: #0a0a0a;          /* Dark background */
    --text-code: #00ff9d;        /* Code text color */
}
```

### Adding New Documentation Pages
1. Add navigation link in `index.html`:
```html
<li><a href="#new-page" id="nav-new-page">
    <i class="fas fa-icon"></i> Page Name
</a></li>
```

2. Create page function in `script.js`:
```javascript
function loadNewPage() {
    const contentBody = ensureContentBody();
    contentBody.innerHTML = `
        <div class="home-content">
            <!-- Your page content here -->
        </div>
    `;
    setActiveNav('new-page');
}
```

3. Add to navigation setup:
```javascript
const navLinks = {
    'nav-new-page': loadNewPage,
    // ... other pages
};
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Opera 47+

## 🎯 Performance

- **Lightweight**: No external frameworks
- **Fast Loading**: Minimal HTTP requests
- **Optimized**: Compressed assets
- **Cached**: Efficient browser caching

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Areas for Contribution
- 🐛 Bug fixes
- 📖 Documentation improvements
- 🎨 UI/UX enhancements
- 📱 Responsive design fixes
- ⚡ Performance optimizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by hacker/matrix aesthetics
- Font Awesome for icons
- Google Fonts for typography
- All DTEmpire service users and contributors

## 📞 Contact

**Developer**: Ankit Gupta  
**GitHub**: [@hyperdargo](https://github.com/hyperdargo)  
**Discord**: [DTEmpire Server](http://dsc.gg/dtempire-server)  
**Website**: [https://ankitgupta.com.np](https://ankitgupta.com.np)

---

<div align="center">

**Made with ❤️ by the DTEmpire Team**

![DTEmpire](https://img.shields.io/badge/DTEmpire-Community-00ff41?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-00ff41?style=for-the-badge)

</div>

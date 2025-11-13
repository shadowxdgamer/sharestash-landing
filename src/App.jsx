import { useEffect, useState } from 'react';
import './App.css';
import { initGA, trackDownload, trackButtonClick, trackPageView } from './analytics';
import logo from './assets/sharestash-logo.png';

function App() {
  const [latestRelease, setLatestRelease] = useState(null);
  const GITHUB_REPO = 'shadowxdgamer/ShareStash';

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    trackPageView('/');

    // Fetch latest release from GitHub
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`)
      .then(res => res.json())
      .then(data => {
        setLatestRelease(data);
      })
      .catch(err => console.error('Error fetching release:', err));
  }, []);

  const handleDownload = (assetUrl, assetName) => {
    const version = latestRelease?.tag_name || 'unknown';
    trackDownload(version, assetName);
    window.open(assetUrl, '_blank');
  };

  const handleGitHubClick = () => {
    trackButtonClick('View on GitHub');
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <img 
          src={logo}
          alt="ShareStash Logo" 
          className="logo"
        />
        <h1>ShareStash</h1>
        <p className="tagline">
          Your Personal Content Library - Save, Organize, and Never Lose Track of Shared Content
        </p>
        <div className="cta-buttons">
          {latestRelease && latestRelease.assets && latestRelease.assets[0] && (
            <button 
              className="btn btn-primary"
              onClick={() => handleDownload(
                latestRelease.assets[0].browser_download_url,
                latestRelease.assets[0].name
              )}
            >
              📱 Download for Android
            </button>
          )}
          <a 
            href={`https://github.com/${GITHUB_REPO}`}
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGitHubClick}
          >
            ⭐ View on GitHub
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>✨ Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Universal Share</h3>
            <p>Share content from any app - YouTube, Twitter, browsers, or any platform directly to ShareStash</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Smart Categorization</h3>
            <p>Automatically detects and categorizes content by type - videos, articles, social media, products, and more</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful UI</h3>
            <p>Material Design 3 with a stunning dark theme that's easy on the eyes</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Full-Text Search</h3>
            <p>Find saved content instantly across titles, descriptions, and URLs</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>All your data stays on your device. Zero ads, zero tracking</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built with Flutter for smooth, native performance</p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots">
        <h2>📸 See ShareStash in Action</h2>
        <div className="screenshot-placeholder">
          <p>Screenshots coming soon! 🎨</p>
          <p>Stay tuned for a visual tour of ShareStash</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="download">
        <h2>🚀 Get Started Today</h2>
        {latestRelease && (
          <span className="version-badge">
            Latest: {latestRelease.tag_name}
          </span>
        )}
        <p>Download ShareStash and start organizing your digital content library</p>
        <div className="cta-buttons">
          {latestRelease && latestRelease.assets && latestRelease.assets[0] && (
            <button 
              className="btn btn-primary"
              onClick={() => handleDownload(
                latestRelease.assets[0].browser_download_url,
                latestRelease.assets[0].name
              )}
            >
              📱 Download APK ({(latestRelease.assets[0].size / 1024 / 1024).toFixed(2)} MB)
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href={`https://github.com/${GITHUB_REPO}`} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={`https://github.com/${GITHUB_REPO}/releases`} target="_blank" rel="noopener noreferrer">
            Releases
          </a>
          <a href={`https://github.com/${GITHUB_REPO}/issues`} target="_blank" rel="noopener noreferrer">
            Report Bug
          </a>
          <a href="https://buymeacoffee.com/shadowxdgamer" target="_blank" rel="noopener noreferrer">
            Support Development
          </a>
        </div>
        <p>Built with ❤️ and Flutter by shadowxdgamer</p>
        <p>MIT License • Privacy First • Zero Ads</p>
      </footer>
    </div>
  );
}

export default App;

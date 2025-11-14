import { useEffect, useState } from 'react';
import './App.css';
import { initGA, trackDownload, trackButtonClick, trackPageView } from './analytics';
import logo from './assets/sharestash-logo.png';

function App() {
  const [latestRelease, setLatestRelease] = useState(null);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [allReleases, setAllReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const GITHUB_REPO = 'shadowxdgamer/ShareStash';

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    trackPageView('/');

    // Fetch all releases to calculate total downloads
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`)
      .then(res => res.json())
      .then(data => {
        setAllReleases(data);
        
        // Get latest release
        if (data.length > 0) {
          setLatestRelease(data[0]);
        }

        // Calculate total downloads across all releases
        const total = data.reduce((sum, release) => {
          const releaseDownloads = release.assets.reduce((assetSum, asset) => {
            return assetSum + (asset.download_count || 0);
          }, 0);
          return sum + releaseDownloads;
        }, 0);

        setTotalDownloads(total);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching releases:', err);
        setLoading(false);
      });
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
        <p className="platform-note">
          📱 Available for Android
        </p>
        
        {/* Download Stats Badge */}
        {!loading && totalDownloads > 0 && (
          <div className="stats-badge">
            ⬇️ {totalDownloads.toLocaleString()} downloads
          </div>
        )}

        <div className="cta-buttons">
          {latestRelease && latestRelease.assets && latestRelease.assets[0] ? (
            <button 
              className="btn btn-primary"
              onClick={() => handleDownload(
                latestRelease.assets[0].browser_download_url,
                latestRelease.assets[0].name
              )}
            >
              📱 Download for Android
            </button>
          ) : (
            <button className="btn btn-primary" disabled>
              📱 Loading...
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
            <h3>Native Share Integration</h3>
            <p>Appears in your system share menu - share from YouTube, Twitter, Chrome, TikTok, or any app</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Smart Categorization</h3>
            <p>Automatically organizes content into Videos, Articles, Social Media, Products, and more</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Dark Theme</h3>
            <p>Material Design 3 with a stunning dark mode that's easy on the eyes</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Full-Text Search</h3>
            <p>Find saved content instantly across titles, descriptions, and URLs</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>100% Private</h3>
            <p>All data stays on your device. No cloud sync, no tracking, no ads</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Built with Flutter for smooth, native performance on Android</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Auto Metadata</h3>
            <p>Automatically fetches titles, descriptions, and thumbnails from shared links</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Custom Tags</h3>
            <p>Add your own tags and notes to organize content your way</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Platform Detection</h3>
            <p>Recognizes 50+ platforms including YouTube, Twitter, Reddit, Medium, and more</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>🎯 How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Share Content</h3>
            <p>Tap the share button in any app</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Select ShareStash</h3>
            <p>Choose ShareStash from the share menu</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Auto-Save</h3>
            <p>Content is saved with metadata automatically</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Organize & Find</h3>
            <p>Browse by category or search anytime</p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots">
        <h2>📸 See ShareStash in Action</h2>
        <div className="screenshot-placeholder">
          <p>Screenshots coming soon! 🎨</p>
          <p>Stay tuned for a visual tour of ShareStash on mobile</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="download">
        <h2>🚀 Get Started Today</h2>
        {latestRelease && (
          <>
            <span className="version-badge">
              Latest: {latestRelease.tag_name}
            </span>
            {latestRelease.assets && latestRelease.assets[0] && (
              <div className="release-stats">
                <span className="stat-item">
                  📦 {(latestRelease.assets[0].size / 1024 / 1024).toFixed(2)} MB
                </span>
                <span className="stat-item">
                  ⬇️ {latestRelease.assets[0].download_count} downloads
                </span>
              </div>
            )}
          </>
        )}
        <p>Download ShareStash for Android and start organizing your digital content library</p>
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
        <p className="install-note">
          ℹ️ You may need to enable "Install from Unknown Sources" in your Android settings
        </p>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>❓ Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Is there a web version?</h3>
            <p>No, ShareStash requires native mobile APIs to integrate with your device's share menu. A web version wouldn't have access to this functionality.</p>
          </div>
          <div className="faq-item">
            <h3>Is my data safe?</h3>
            <p>Absolutely! All your saved content stays on your device. ShareStash doesn't collect, track, or upload any of your data.</p>
          </div>
          <div className="faq-item">
            <h3>Does it work offline?</h3>
            <p>Yes! Once content is saved, you can access it anytime, even without an internet connection.</p>
          </div>
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
          <a href={`https://github.com/${GITHUB_REPO}/blob/main/README.md`} target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </div>
        {totalDownloads > 0 && (
          <p>🎉 {totalDownloads.toLocaleString()} total downloads across all releases</p>
        )}
        <p>Built with ❤️ and Flutter | Open Source & Privacy First</p>
        <p>MIT License • Zero Ads • Zero Tracking</p>
      </footer>
    </div>
  );
}

export default App;

// Main JavaScript for DTEmpire Documentation Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DTEmpire Documentation initialized');
    
    // Ensure content body exists
    ensureContentBody();
    
    // Setup navigation event listeners
    setupNavigation();
    
    // Initialize the home page
    loadHome();
    
    // Update server time
    updateServerTime();
    setInterval(updateServerTime, 1000);
    
    // Set up terminal functionality
    setupTerminal();
    
    // Add matrix rain effect background
    createMatrixEffect();
    
    // Add hover animations
    setupHoverAnimations();
    
    // Add typing animation to welcome text
    setTimeout(() => typeWelcomeText(), 500);
    
    // Start particle animation
    startParticleAnimation();
    
    // Add scroll animations
    setupScrollAnimations();
});

// Ensure content body exists
function ensureContentBody() {
    let contentBody = document.getElementById('content-body');
    if (!contentBody) {
        const contentMain = document.querySelector('.content');
        if (contentMain) {
            contentBody = document.createElement('div');
            contentBody.id = 'content-body';
            contentBody.className = 'content-body';
            contentMain.appendChild(contentBody);
        }
    }
    return contentBody;
}

// Setup navigation event listeners
function setupNavigation() {
    // Add click handlers to all navigation links
    const navLinks = {
        'nav-home': loadHome,
        'nav-status': loadStatus,
        'nav-discord': loadDiscord,
        'nav-lavalink': loadLavalink,
        'nav-music-bot': loadMusicBot,
        'nav-image-api': loadImageAPI,
        'nav-game-servers': loadGameServers,
        'nav-websites': loadWebsites,
        'nav-api': loadAPI,
        'nav-dtempire-bot': loadDTEmpireBot,
        'nav-invite': loadInvite,
        'nav-github': loadGitHub
    };

    Object.keys(navLinks).forEach(linkId => {
        const link = document.getElementById(linkId);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks[linkId]();
                setActiveNav(linkId.replace('nav-', ''));
            });
        }
    });
}

// Setup hover animations
function setupHoverAnimations() {
    // Glow effect on DTEmpire text
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('glow-text') || 
            e.target.classList.contains('highlight') ||
            e.target.classList.contains('card-title') ||
            e.target.closest('.logo') ||
            e.target.closest('.nav-section a')) {
            
            if (e.target.closest('.logo') || e.target.classList.contains('glow-text')) {
                document.querySelectorAll('.logo h1, .logo-dt, .logo-empire').forEach(el => {
                    el.classList.add('glow-active');
                    setTimeout(() => el.classList.remove('glow-active'), 500);
                });
            }
        }
    });
    
    // Card hover animations with glow
    document.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.card, .server-card, .discord-link-card');
        if (card) {
            card.classList.add('hover-glow');
            card.style.transform = 'translateY(-8px) scale(1.03)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.card, .server-card, .discord-link-card');
        if (card) {
            card.classList.remove('hover-glow');
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
    
    // Button hover effects
    document.addEventListener('mouseover', function(e) {
        const btn = e.target.closest('.btn, .card-link, .nav-section a');
        if (btn) {
            btn.classList.add('pulse-once');
            setTimeout(() => btn.classList.remove('pulse-once'), 300);
        }
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('stat-value') && entry.target.dataset.count) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .stat-item, .welcome-section, .discord-section').forEach(el => {
        observer.observe(el);
    });
}

// Typing animation for welcome text
function typeWelcomeText() {
    const welcomeText = "Welcome to DTEmpire Documentation";
    const welcomeElement = document.querySelector('.welcome-section h2');
    
    if (welcomeElement && !welcomeElement.dataset.typed) {
        welcomeElement.dataset.typed = 'true';
        let i = 0;
        const typing = setInterval(() => {
            if (i < welcomeText.length) {
                welcomeElement.innerHTML = welcomeText.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
                i++;
            } else {
                clearInterval(typing);
                setTimeout(() => {
                    welcomeElement.innerHTML = welcomeText;
                    welcomeElement.classList.add('typed-complete');
                }, 1000);
            }
        }, 50);
    }
}

// Start particle animation
function startParticleAnimation() {
    const container = document.querySelector('.content');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, parseFloat(particle.style.animationDuration) * 1000);
}

// Animate counter numbers
function animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';
    
    const target = parseFloat(element.dataset.count);
    const suffix = element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : '';
    const isDecimal = target % 1 !== 0;
    
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(1) + suffix : Math.floor(target) + suffix;
            clearInterval(timer);
            element.classList.add('counted');
        } else {
            element.textContent = isDecimal ? start.toFixed(1) + suffix : Math.floor(start) + suffix;
        }
    }, 16);
}

// Load home page content
function loadHome() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Home / Introduction';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2 class="type-animation">DTEmpire Documentation</h2>
                <p>Welcome to the official documentation hub for <span class="highlight glow-text">DTEmpire</span>, a comprehensive suite of gaming, development, and hosting services built for the modern digital era.</p>
                <p>Here you'll find documentation, API references, setup guides, and status information for all DTEmpire services.</p>
                <div class="floating-icons">
                    <i class="fas fa-robot pulse"></i>
                    <i class="fas fa-server pulse"></i>
                    <i class="fas fa-code pulse"></i>
                    <i class="fas fa-gamepad pulse"></i>
                </div>
            </section>
            
            <div class="quick-links animate-on-scroll">
                <a href="http://dsc.gg/dtempire-server" target="_blank" class="quick-link pulse">
                    <i class="fab fa-discord"></i>
                    <span>Join Discord Server</span>
                </a>
                <a href="http://dsc.gg/dtempire" target="_blank" class="quick-link pulse">
                    <i class="fas fa-robot"></i>
                    <span>Invite DTEmpire Bot</span>
                </a>
                <a href="http://dsc.gg/dtempire-music" target="_blank" class="quick-link pulse">
                    <i class="fas fa-music"></i>
                    <span>Invite Music Bot</span>
                </a>
                <a href="https://live-monitor.ankitgupta.com.np/" target="_blank" class="quick-link pulse">
                    <i class="fas fa-chart-line"></i>
                    <span>Live Status</span>
                </a>
            </div>
            
            <div class="grid-container">
                <div class="card animate-on-scroll">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-server pulse"></i></div>
                        <h3 class="card-title">Live Status Monitor</h3>
                    </div>
                    <div class="card-content">
                        <p>Check the real-time status of all DTEmpire services including Lavalink servers, game servers, APIs, and websites.</p>
                        <p>Monitor uptime, response times, and service health from our dedicated status dashboard.</p>
                        <a href="https://live-monitor.ankitgupta.com.np/" target="_blank" class="card-link pulse">
                            View Status Dashboard <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                
                <div class="card animate-on-scroll">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-robot pulse"></i></div>
                        <h3 class="card-title">Discord Bots</h3>
                    </div>
                    <div class="card-content">
                        <p>Comprehensive documentation for our Discord music bots, moderation tools, and utility bots.</p>
                        <p>Learn how to invite, configure, and make the most of our bot ecosystem.</p>
                        <a href="#discord" class="card-link pulse">
                            Explore Discord Bots <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                
                <div class="card animate-on-scroll">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-code pulse"></i></div>
                        <h3 class="card-title">API Documentation</h3>
                    </div>
                    <div class="card-content">
                        <p>Access our Image Generation API, Lavalink API, and other developer tools.</p>
                        <p>Full API reference with code examples, authentication guides, and rate limiting information.</p>
                        <a href="#api" class="card-link pulse">
                            View API Docs <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <section class="stats-section animate-on-scroll">
                <h3 class="stats-title"><i class="fas fa-chart-line pulse"></i> Quick Stats</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value" data-count="15">20+</div>
                        <div class="stat-label">Active Services</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" data-count="99.9">98.2%</div>
                        <div class="stat-label">Uptime Average</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" data-count="2000">100+</div>
                        <div class="stat-label">Discord Users</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">24/7</div>
                        <div class="stat-label">Monitoring</div>
                    </div>
                </div>
            </section>
            
            <section class="discord-section animate-on-scroll">
                <div class="discord-header">
                    <div class="discord-icon"><i class="fab fa-discord pulse"></i></div>
                    <div>
                        <h2 class="glow-text">Join Our Discord Community</h2>
                        <p>Get support, participate in discussions, and stay updated with announcements</p>
                    </div>
                </div>
                <div class="discord-content">
                    <div class="discord-info">
                        <h3>DTEmpire Discord Server</h3>
                        <p>Connect with other users, get technical support, suggest features, and participate in community events. Our Discord server is the central hub for all things DTEmpire.</p>
                        <p><strong>Features:</strong> Live support channels, announcement feed, bot testing, community showcases, and developer discussions.</p>
                        <div class="discord-links">
                            <div class="link-item">
                                <i class="fas fa-users pulse"></i>
                                <strong>Server Invite:</strong> <a href="http://dsc.gg/dtempire-server" target="_blank" class="glow-link pulse">http://dsc.gg/dtempire-server</a>
                            </div>
                            <div class="link-item">
                                <i class="fas fa-robot pulse"></i>
                                <strong>Official Bot:</strong> <a href="http://dsc.gg/dtempire" target="_blank" class="glow-link pulse">http://dsc.gg/dtempire</a>
                            </div>
                            <div class="link-item">
                                <i class="fas fa-music pulse"></i>
                                <strong>Music Bot:</strong> <a href="http://dsc.gg/dtempire-music" target="_blank" class="glow-link pulse">http://dsc.gg/dtempire-music</a>
                            </div>
                        </div>
                    </div>
                    <div class="discord-actions">
                        <button class="btn btn-discord pulse" onclick="inviteToDiscord()">
                            <i class="fab fa-discord"></i> Join Discord
                        </button>
                        <button class="btn btn-hack pulse" onclick="inviteBot()">
                            <i class="fas fa-robot"></i> Invite Official Bot
                        </button>
                    </div>
                </div>
            </section>
            
            <section class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-user-secret pulse"></i></div>
                    <h3 class="card-title">About DTEmpire</h3>
                </div>
                <div class="card-content">
                    <p>DTEmpire is a passion project created by a team of developers and gamers who believe in building reliable, high-performance services for the community. Our mission is to provide top-tier gaming, music, and development tools that are accessible to everyone.</p>
                    <p><strong>Owner & Lead Developer:</strong> Ankit Gupta</p>
                    <p><strong>Established:</strong> 2022</p>
                    <p><strong>Philosophy:</strong> Open, transparent, and community-driven development with a focus on performance and reliability.</p>
                    <div class="signature">
                        <span class="signature-text">- DTEmpire Team</span>
                    </div>
                </div>
            </section>
        </div>
    `;
    
    setActiveNav('home');
    
    // Reattach scroll animations
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Lavalink v4 documentation
function loadLavalink() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / Lavalink v4';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-music pulse"></i> Lavalink v4 Server</h2>
                <p>Free Lavalink server provided by DTEmpire for music bots and audio streaming applications.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-server pulse"></i></div>
                    <h3 class="card-title">Server Information</h3>
                </div>
                <div class="card-content">
                    <div class="code-block typing-code">
                        <div class="code-header">
                            <span>Lavalink Configuration</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code class="type-animation">{
  "host": "panel.ankitgupta.com.np",
  "password": "DTEmpire",
  "port": 25574,
  "secure": false
}</code></pre>
                    </div>
                    
                    <div class="info-grid">
                        <div class="info-item pulse">
                            <i class="fas fa-globe"></i>
                            <strong>Host:</strong> <span class="glow-text">panel.ankitgupta.com.np</span>
                        </div>
                        <div class="info-item pulse">
                            <i class="fas fa-plug"></i>
                            <strong>Port:</strong> <span class="glow-text">25574</span>
                        </div>
                        <div class="info-item pulse">
                            <i class="fas fa-key"></i>
                            <strong>Password:</strong> <span class="glow-text">DTEmpire</span>
                        </div>
                        <div class="info-item pulse">
                            <i class="fas fa-link"></i>
                            <strong>Connection:</strong> <span class="glow-text">panel.ankitgupta.com.np:25574</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-book pulse"></i></div>
                    <h3 class="card-title">How to Connect</h3>
                </div>
                <div class="card-content">
                    <h4>JavaScript (discord.js)</h4>
                    <div class="code-block typing-code">
                        <div class="code-header">
                            <span>Example Connection Code</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code class="type-animation">// Discord.js v14 Example
const { Client, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Create player
const player = new Player(client);

// Add Lavalink node
player.nodes.add({
    host: 'panel.ankitgupta.com.np',
    port: 25574,
    password: 'DTEmpire',
    secure: false,
    identifier: 'DTEmpire-Lavalink'
});

client.on('ready', () => {
    console.log('Connected to DTEmpire Lavalink!');
});</code></pre>
                    </div>
                    
                    <h4>Python (wavelink)</h4>
                    <div class="code-block">
                        <pre><code>import wavelink
import discord

# Connect to Lavalink
async def connect_lavalink():
    nodes = [wavelink.Node(
        uri='http://panel.ankitgupta.com.np:25574',
        password='DTEmpire'
    )]
    await wavelink.Pool.connect(
        nodes=nodes,
        client=bot,
        cache_capacity=100
    )</code></pre>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-chart-line pulse"></i></div>
                    <h3 class="card-title">Live Status & Monitoring</h3>
                </div>
                <div class="card-content">
                    <p>Check the real-time status of our Lavalink server:</p>
                    <div class="status-link pulse">
                        <i class="fas fa-external-link-alt"></i>
                        <a href="https://lavalink.ankitgupta.com.np/" target="_blank" class="glow-link">https://lavalink.ankitgupta.com.np/</a>
                    </div>
                    <p>For overall service status including Lavalink, visit:</p>
                    <div class="status-link pulse">
                        <i class="fas fa-external-link-alt"></i>
                        <a href="https://live-monitor.ankitgupta.com.np/" target="_blank" class="glow-link">https://live-monitor.ankitgupta.com.np/</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('lavalink');
    setTimeout(() => typeCodeAnimations(), 300);
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Music Bot documentation
function loadMusicBot() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / Music Bot';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-music pulse"></i> DTEmpire Music Bot</h2>
                <p>High-quality Discord music bot with advanced features and Lavalink support.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-robot pulse"></i></div>
                    <h3 class="card-title">Invite Links</h3>
                </div>
                <div class="card-content">
                    <div class="invite-grid">
                        <div class="invite-item pulse">
                            <i class="fab fa-discord"></i>
                            <h4>Music Bot</h4>
                            <p>Dedicated music bot with premium audio quality</p>
                            <button class="btn btn-hack pulse" onclick="inviteMusicBot()">
                                <i class="fas fa-music"></i> Invite Music Bot
                            </button>
                            <div class="invite-link">
                                <code class="glow-text">http://dsc.gg/dtempire-music</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-sliders-h pulse"></i></div>
                    <h3 class="card-title">Features</h3>
                </div>
                <div class="card-content">
                    <div class="features-grid">
                        <div class="feature pulse">
                            <i class="fas fa-play-circle"></i>
                            <h4>High Quality Audio</h4>
                            <p>Premium 128kbps audio streaming</p>
                        </div>
                        <div class="feature pulse">
                            <i class="fab fa-youtube"></i>
                            <h4>Multi-Platform</h4>
                            <p>YouTube, Spotify, SoundCloud support</p>
                        </div>
                        <div class="feature pulse">
                            <i class="fas fa-list-ol"></i>
                            <h4>Queue System</h4>
                            <p>Advanced queue with playlist support</p>
                        </div>
                        <div class="feature pulse">
                            <i class="fas fa-filter"></i>
                            <h4>Audio Filters</h4>
                            <p>Bass boost, nightcore, vaporwave effects</p>
                        </div>
                        <div class="feature pulse">
                            <i class="fas fa-volume-up"></i>
                            <h4>Volume Control</h4>
                            <p>Per-user volume adjustment</p>
                        </div>
                        <div class="feature pulse">
                            <i class="fas fa-headphones"></i>
                            <h4>24/7 Radio</h4>
                            <p>Non-stop music streaming</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-terminal pulse"></i></div>
                    <h3 class="card-title">Commands (Prefix: !)</h3>
                </div>
                <div class="card-content">
                    <div class="commands-list">
                        <div class="command pulse">
                            <code>!play &lt;song&gt;</code>
                            <span>Play a song or add to queue</span>
                        </div>
                        <div class="command pulse">
                            <code>!pause</code>
                            <span>Pause current track</span>
                        </div>
                        <div class="command pulse">
                            <code>!resume</code>
                            <span>Resume playback</span>
                        </div>
                        <div class="command pulse">
                            <code>!skip</code>
                            <span>Skip current song</span>
                        </div>
                        <div class="command pulse">
                            <code>!stop</code>
                            <span>Stop playback and clear queue</span>
                        </div>
                        <div class="command pulse">
                            <code>!queue</code>
                            <span>Show current queue</span>
                        </div>
                        <div class="command pulse">
                            <code>!volume &lt;0-100&gt;</code>
                            <span>Adjust player volume</span>
                        </div>
                        <div class="command pulse">
                            <code>!shuffle</code>
                            <span>Shuffle the queue</span>
                        </div>
                        <div class="command pulse">
                            <code>!loop</code>
                            <span>Toggle queue loop</span>
                        </div>
                        <div class="command pulse">
                            <code>!remove &lt;position&gt;</code>
                            <span>Remove track from queue</span>
                        </div>
                        <div class="command pulse">
                            <code>!clear</code>
                            <span>Clear current queue</span>
                        </div>
                        <div class="command pulse">
                            <code>!status</code>
                            <span>Show player status</span>
                        </div>
                        <div class="command pulse">
                            <code>!help</code>
                            <span>Show help message</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-plug pulse"></i></div>
                    <h3 class="card-title">Connect to DTEmpire Lavalink</h3>
                </div>
                <div class="card-content">
                    <p>The bot automatically uses our Lavalink server. Manual configuration:</p>
                    <div class="code-block">
                        <div class="code-header">
                            <span>Lavalink Configuration</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code>Host: panel.ankitgupta.com.np
Port: 25574
Password: DTEmpire
Secure: false</code></pre>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('music-bot');
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Image Gen API documentation
function loadImageAPI() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / Image Generation API';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-image pulse"></i> Image Generation API</h2>
                <p>AI-powered image generation API with multiple models and features.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-globe pulse"></i></div>
                    <h3 class="card-title">API Endpoints</h3>
                </div>
                <div class="card-content">
                    <div class="endpoint-info pulse">
                        <i class="fas fa-link"></i>
                        <a href="https://imggen-api.ankitgupta.com.np/" target="_blank" class="glow-link">https://imggen-api.ankitgupta.com.np/</a>
                    </div>
                    
                    <div class="api-endpoints">
                        <div class="endpoint pulse">
                            <div class="endpoint-method get">GET</div>
                            <div class="endpoint-path">/api/pollination</div>
                            <div class="endpoint-desc">Image Generation</div>
                        </div>
                        <div class="endpoint pulse">
                            <div class="endpoint-method get">GET</div>
                            <div class="endpoint-path">/api/tts</div>
                            <div class="endpoint-desc">Text-to-Speech</div>
                        </div>
                        <div class="endpoint pulse">
                            <div class="endpoint-method get">GET</div>
                            <div class="endpoint-path">/api/ai-text</div>
                            <div class="endpoint-desc">AI Text Generation</div>
                        </div>
                        <div class="endpoint pulse">
                            <div class="endpoint-method get">GET</div>
                            <div class="endpoint-path">/api/image-card</div>
                            <div class="endpoint-desc">Image Card Generator</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-code pulse"></i></div>
                    <h3 class="card-title">Pollination Image Generation</h3>
                </div>
                <div class="card-content">
                    <div class="code-block typing-code">
                        <div class="code-header">
                            <span>Example Request</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code class="type-animation">GET /api/pollination?prompt=a%20beautiful%20sunset&model=seeddream&width=512&height=512</code></pre>
                    </div>
                    
                    <h4>Parameters:</h4>
                    <ul class="param-list">
                        <li class="pulse"><code>prompt</code> (required) - Text description</li>
                        <li class="pulse"><code>model</code> (optional) - flux, seeddream, turbo, kontext</li>
                        <li class="pulse"><code>width</code> (optional) - Default: 512</li>
                        <li class="pulse"><code>height</code> (optional) - Default: 512</li>
                    </ul>
                    
                    <h4>Response:</h4>
                    <div class="code-block">
                        <pre><code>{
  "success": true,
  "image_url": "https://imggen-api.ankitgupta.com.np/generated/image.png",
  "model": "seeddream",
  "generation_time": "2.5s"
}</code></pre>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-volume-up pulse"></i></div>
                    <h3 class="card-title">Text-to-Speech</h3>
                </div>
                <div class="card-content">
                    <div class="code-block">
                        <div class="code-header">
                            <span>Example Request</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code>GET /api/tts?message=Hello%20world&channel=123456789&bot_token=YOUR_TOKEN&lang=en</code></pre>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-external-link-alt pulse"></i></div>
                    <h3 class="card-title">Related Services</h3>
                </div>
                <div class="card-content">
                    <div class="service-link pulse">
                        <i class="fas fa-paint-brush"></i>
                        <div>
                            <h4>Image Generation Website</h4>
                            <p>User-friendly interface for image generation</p>
                            <a href="https://imggen.ankitgupta.com.np" target="_blank" class="glow-link">https://imggen.ankitgupta.com.np</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('image-api');
    setTimeout(() => typeCodeAnimations(), 300);
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Game Servers documentation
function loadGameServers() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / Game Servers';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-gamepad pulse"></i> Minecraft Game Servers</h2>
                <p>DTEmpire hosts multiple Minecraft servers for different gameplay experiences.</p>
            </section>
            
            <div class="grid-container">
                <div class="card animate-on-scroll server-card pulse">
                    <div class="server-status online pulse"></div>
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-users"></i></div>
                        <h3 class="card-title">Prominence II: Hasturian Era</h3>
                    </div>
                    <div class="card-content">
                        <p><strong>Type:</strong> Public Modded Server</p>
                        <p><strong>Access:</strong> Open for everyone</p>
                        <p><strong>Mod Pack:</strong> Custom mod collection</p>
                        <div class="server-info">
                            <i class="fas fa-globe"></i>
                            <strong>IP:</strong> <code class="glow-text">panel.ankitgupta.com.np:25571</code>
                        </div>
                        <button class="btn btn-hack copy-ip pulse" data-ip="panel.ankitgupta.com.np:25571">
                            <i class="fas fa-copy"></i> Copy IP
                        </button>
                    </div>
                </div>
                
                <div class="card animate-on-scroll server-card pulse">
                    <div class="server-status online pulse"></div>
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-lock"></i></div>
                        <h3 class="card-title">Kreate Mod Server</h3>
                    </div>
                    <div class="card-content">
                        <p><strong>Type:</strong> Private Technical Server</p>
                        <p><strong>Access:</strong> Ask admin for access</p>
                        <p><strong>Focus:</strong> Automation & Creativity</p>
                        <div class="server-info">
                            <i class="fas fa-globe"></i>
                            <strong>IP:</strong> <code class="glow-text">panel.ankitgupta.com.np:25565</code>
                        </div>
                        <button class="btn btn-hack copy-ip pulse" data-ip="panel.ankitgupta.com.np:25565">
                            <i class="fas fa-copy"></i> Copy IP
                        </button>
                    </div>
                </div>
                
                <div class="card animate-on-scroll server-card pulse">
                    <div class="server-status online pulse"></div>
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-tree"></i></div>
                        <h3 class="card-title">WarmBrew SMP</h3>
                    </div>
                    <div class="card-content">
                        <p><strong>Type:</strong> Public Vanilla Server</p>
                        <p><strong>Access:</strong> Open for everyone</p>
                        <p><strong>Style:</strong> Survival Multiplayer</p>
                        <div class="server-info">
                            <i class="fas fa-globe"></i>
                            <strong>IP:</strong> <code class="glow-text">panel.ankitgupta.com.np:25572</code>
                        </div>
                        <button class="btn btn-hack copy-ip pulse" data-ip="panel.ankitgupta.com.np:25572">
                            <i class="fas fa-copy"></i> Copy IP
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-chart-line pulse"></i></div>
                    <h3 class="card-title">Live Server Status</h3>
                </div>
                <div class="card-content">
                    <p>Check real-time status of all game servers:</p>
                    <div class="status-link pulse">
                        <i class="fas fa-external-link-alt"></i>
                        <a href="https://live-monitor.ankitgupta.com.np/" target="_blank" class="glow-link">https://live-monitor.ankitgupta.com.np/</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('game-servers');
    
    // Add copy IP functionality
    setTimeout(() => {
        document.querySelectorAll('.copy-ip').forEach(button => {
            button.addEventListener('click', function() {
                const ip = this.getAttribute('data-ip');
                copyToClipboardText(ip);
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.classList.add('copied');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copy IP';
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    }, 100);
    
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Websites documentation
function loadWebsites() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / Websites';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-globe pulse"></i> DTEmpire Websites</h2>
                <p>Collection of web services and applications hosted by DTEmpire.</p>
            </section>
            
            <div class="grid-container">
                <div class="card animate-on-scroll pulse">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-paint-brush"></i></div>
                        <h3 class="card-title">Image Generation</h3>
                    </div>
                    <div class="card-content">
                        <p>Free AI image generation website with multiple models.</p>
                        <ul>
                            <li><i class="fas fa-bolt"></i> Flux model</li>
                            <li><i class="fas fa-rocket"></i> Turbo model</li>
                            <li><i class="fas fa-seedling"></i> Seeddream model</li>
                        </ul>
                        <div class="website-link">
                            <a href="https://imggen.ankitgupta.com.np" target="_blank" class="card-link pulse">
                                <i class="fas fa-external-link-alt"></i> Visit Site
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="card animate-on-scroll pulse">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-robot"></i></div>
                        <h3 class="card-title">AI Chat</h3>
                    </div>
                    <div class="card-content">
                        <p>Official DTEmpire AI chatbot for answering questions.</p>
                        <ul>
                            <li><i class="fas fa-check"></i> Handles small tasks</li>
                            <li><i class="fas fa-check"></i> Provides detailed answers</li>
                            <li><i class="fas fa-times"></i> No chat memory (stateless)</li>
                        </ul>
                        <div class="website-link">
                            <a href="https://ai.ankitgupta.com.np/" target="_blank" class="card-link pulse">
                                <i class="fas fa-external-link-alt"></i> Visit Site
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="card animate-on-scroll pulse">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
                        <h3 class="card-title">SecurePKIChat</h3>
                    </div>
                    <div class="card-content">
                        <p>PKI-encrypted secure chat server (Beta).</p>
                        <ul>
                            <li><i class="fas fa-lock"></i> End-to-end encryption</li>
                            <li><i class="fas fa-bug"></i> Currently in beta</li>
                            <li><i class="fas fa-check"></i> Stable with no known bugs</li>
                        </ul>
                        <div class="website-link">
                            <a href="https://chat.ankitgupta.com.np/login" target="_blank" class="card-link pulse">
                                <i class="fas fa-external-link-alt"></i> Visit Site
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-brain pulse"></i></div>
                    <h3 class="card-title">New AI API</h3>
                </div>
                <div class="card-content">
                    <p>Lightweight AI chat API for websites and Discord bots.</p>
                    <div class="code-block typing-code">
                        <div class="code-header">
                            <span>API Endpoint</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code class="type-animation">http://158.69.214.8:9853/dtempire-ai?prompt=<PROMPT></code></pre>
                    </div>
                    <p><strong>Usage:</strong> Replace &lt;PROMPT&gt; with your query text</p>
                    <p><strong>Example:</strong> <code>http://158.69.214.8:9853/dtempire-ai?prompt=Hello, how are you?</code></p>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('websites');
    setTimeout(() => typeCodeAnimations(), 300);
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load DTEmpire Bot documentation
function loadDTEmpireBot() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / DTEmpire Bot';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-robot pulse"></i> DTEmpire Official Bot</h2>
                <p>Multi-purpose Discord bot with moderation, utility, and entertainment features.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-link pulse"></i></div>
                    <h3 class="card-title">Invite Link</h3>
                </div>
                <div class="card-content">
                    <div class="invite-box pulse">
                        <i class="fab fa-discord"></i>
                        <div>
                            <h4>DTEmpire Official Bot</h4>
                            <p>Multi-purpose bot with 200+ commands</p>
                            <a href="http://dsc.gg/dtempire" target="_blank" class="glow-link">http://dsc.gg/dtempire</a>
                        </div>
                        <button class="btn btn-discord pulse" onclick="inviteBot()">
                            <i class="fas fa-plus"></i> Invite
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-terminal pulse"></i></div>
                    <h3 class="card-title">Basic Commands</h3>
                </div>
                <div class="card-content">
                    <p><strong>Prefix:</strong> <code class="glow-text">.</code> (dot)</p>
                    <p><strong>Help Command:</strong> <code>.help</code> - Shows all commands</p>
                    
                    <div class="commands-grid">
                        <div class="command-category pulse">
                            <h4><i class="fas fa-shield-alt"></i> Moderation</h4>
                            <ul>
                                <li><code>.ban</code> - Ban users</li>
                                <li><code>.kick</code> - Kick users</li>
                                <li><code>.mute</code> - Mute users</li>
                                <li><code>.warn</code> - Warn users</li>
                                <li><code>.clear</code> - Clear messages</li>
                            </ul>
                        </div>
                        
                        <div class="command-category pulse">
                            <h4><i class="fas fa-cogs"></i> Utility</h4>
                            <ul>
                                <li><code>.userinfo</code> - User information</li>
                                <li><code>.serverinfo</code> - Server information</li>
                                <li><code>.avatar</code> - Show avatar</li>
                                <li><code>.ping</code> - Bot latency</li>
                                <li><code>.uptime</code> - Bot uptime</li>
                            </ul>
                        </div>
                        
                        <div class="command-category pulse">
                            <h4><i class="fas fa-gamepad"></i> Fun</h4>
                            <ul>
                                <li><code>.gif</code> - Search GIFs</li>
                                <li><code>.minecraft</code> - MC server info</li>
                                <li><code>.slot</code> - Slot machine</li>
                                <li><code>.8ball</code> - Magic 8 ball</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-headset pulse"></i></div>
                    <h3 class="card-title">TTS & AI Bot Commands</h3>
                </div>
                <div class="card-content">
                    <p><strong>Prefix:</strong> <code class="glow-text">,</code> (comma)</p>
                    
                    <h4>AI Commands:</h4>
                    <div class="code-block">
                        <pre><code>,ai <prompt> - Generate AI response
,setchannel-ai #channel - Add AI auto-reply channel
,removechannel-ai #channel - Remove AI channel</code></pre>
                    </div>
                    
                    <h4>TTS Commands:</h4>
                    <div class="code-block">
                        <pre><code>,tts <text> - Text to speech
,tts --ai <prompt> - AI enhanced TTS
,ttsvoice <text> - TTS in voice channel</code></pre>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-image pulse"></i></div>
                    <h3 class="card-title">Image Generation Commands</h3>
                </div>
                <div class="card-content">
                    <p><strong>Prefix:</strong> <code class="glow-text">.</code> (dot)</p>
                    <div class="code-block">
                        <pre><code>.imggen <prompt> [--model <model>]
.imggen a beautiful sunset
.imggen cyberpunk city --model turbo
.imggen fantasy landscape --model seeddream</code></pre>
                    </div>
                    
                    <h4>Models Available:</h4>
                    <ul class="model-list">
                        <li class="pulse"><code>flux</code> - Recommended (Default)</li>
                        <li class="pulse"><code>seeddream</code> - New model</li>
                        <li class="pulse"><code>turbo</code> - Fast generation</li>
                        <li class="pulse"><code>kontext</code> - Premium model</li>
                    </ul>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-question-circle pulse"></i></div>
                    <h3 class="card-title">DTEmpire AI Chat Bot</h3>
                </div>
                <div class="card-content">
                    <p><strong>Prefix:</strong> <code class="glow-text">?</code> (question mark)</p>
                    <div class="code-block">
                        <pre><code>?ai <message> - Chat with AI
?setchannel-ai - Enable auto-AI replies
?removechannel-ai - Disable auto-AI replies
?ai-help - Show help message</code></pre>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('dtempire-bot');
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load API Documentation
function loadAPI() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Documentation / API';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-code pulse"></i> API Documentation</h2>
                <p>Complete API references for DTEmpire services and integrations.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-database pulse"></i></div>
                    <h3 class="card-title">API Tokens & Credentials</h3>
                </div>
                <div class="card-content">
                    <div class="api-tokens">
                        <div class="token-item pulse">
                            <i class="fas fa-key"></i>
                            <div>
                                <strong>MongoDB</strong>
                                <code class="token-code">mongodb+srv://DargoTamber:dtempire@dtempire.qf5bb11.mongodb.net/?retryWrites=true&w=majority</code>
                            </div>
                            <button class="btn-copy-small pulse" data-token="mongodb+srv://DargoTamber:dtempire@dtempire.qf5bb11.mongodb.net/?retryWrites=true&w=majority">Copy</button>
                        </div>
                        
                        <div class="token-item pulse">
                            <i class="fas fa-images"></i>
                            <div>
                                <strong>GIPHY</strong>
                                <code class="token-code">9fxhjYEw5QNEdChiaVHnH7pxkTEVSq0E</code>
                            </div>
                            <button class="btn-copy-small pulse" data-token="9fxhjYEw5QNEdChiaVHnH7pxkTEVSq0E">Copy</button>
                        </div>
                        
                        <div class="token-item pulse">
                            <i class="fas fa-music"></i>
                            <div>
                                <strong>Spotify Client ID</strong>
                                <code class="token-code">508a737184524464abbd1e7cebf23594</code>
                            </div>
                            <button class="btn-copy-small pulse" data-token="508a737184524464abbd1e7cebf23594">Copy</button>
                        </div>
                        
                        <div class="token-item pulse">
                            <i class="fas fa-music"></i>
                            <div>
                                <strong>Spotify Client Secret</strong>
                                <code class="token-code">859040dfa2ca4fa9a08a663f99c77291</code>
                            </div>
                            <button class="btn-copy-small pulse" data-token="859040dfa2ca4fa9a08a663f99c77291">Copy</button>
                        </div>
                        
                        <div class="token-item pulse">
                            <i class="fab fa-youtube"></i>
                            <div>
                                <strong>YouTube API</strong>
                                <code class="token-code">AIzaSyCOHrsELLSn_D3PkyI073d9hP-ZFRnC25I</code>
                            </div>
                            <button class="btn-copy-small pulse" data-token="AIzaSyCOHrsELLSn_D3PkyI073d9hP-ZFRnC25I">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-image pulse"></i></div>
                    <h3 class="card-title">Image Generation API</h3>
                </div>
                <div class="card-content">
                    <div class="endpoint-info pulse">
                        <i class="fas fa-link"></i>
                        <a href="https://imggen-api.ankitgupta.com.np/" target="_blank" class="glow-link">https://imggen-api.ankitgupta.com.np/</a>
                    </div>
                    
                    <h4>Available Endpoints:</h4>
                    <div class="api-list">
                        <div class="api-endpoint pulse">
                            <code>GET /api/pollination</code>
                            <span>AI Image Generation</span>
                        </div>
                        <div class="api-endpoint pulse">
                            <code>GET /api/tts</code>
                            <span>Text-to-Speech</span>
                        </div>
                        <div class="api-endpoint pulse">
                            <code>GET /api/ai-text</code>
                            <span>AI Text Generation</span>
                        </div>
                        <div class="api-endpoint pulse">
                            <code>GET /api/image-card</code>
                            <span>Image Card Generator</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-brain pulse"></i></div>
                    <h3 class="card-title">DTEmpire AI API</h3>
                </div>
                <div class="card-content">
                    <div class="code-block typing-code">
                        <div class="code-header">
                            <span>AI Chat Endpoint</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code class="type-animation">http://158.69.214.8:9853/dtempire-ai?prompt=<PROMPT></code></pre>
                    </div>
                    
                    <h4>Example Usage:</h4>
                    <div class="code-block">
                        <pre><code>// JavaScript Fetch Example
fetch('http://158.69.214.8:9853/dtempire-ai?prompt=Hello')
    .then(response => response.json())
    .then(data => console.log(data));</code></pre>
                    </div>
                    
                    <div class="code-block">
                        <pre><code># Python Requests Example
import requests

response = requests.get('http://158.69.214.8:9853/dtempire-ai', 
    params={'prompt': 'Hello'})
print(response.json())</code></pre>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-music pulse"></i></div>
                    <h3 class="card-title">Lavalink API</h3>
                </div>
                <div class="card-content">
                    <div class="code-block">
                        <div class="code-header">
                            <span>Lavalink Configuration</span>
                            <button class="btn-copy pulse" onclick="copyToClipboard(this)">Copy</button>
                        </div>
                        <pre><code>{
  "host": "panel.ankitgupta.com.np",
  "password": "DTEmpire",
  "port": 25574,
  "secure": false
}</code></pre>
                    </div>
                    
                    <div class="status-link pulse">
                        <i class="fas fa-chart-line"></i>
                        <a href="https://lavalink.ankitgupta.com.np/" target="_blank" class="glow-link">Lavalink Status Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('api');
    setTimeout(() => {
        typeCodeAnimations();
        setupTokenCopyButtons();
    }, 300);
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load GitHub page
function loadGitHub() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Resources / GitHub';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fab fa-github pulse"></i> Open Source Code</h2>
                <p>All DTEmpire projects are open source and available on GitHub.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fab fa-github pulse"></i></div>
                    <h3 class="card-title">GitHub Repository</h3>
                </div>
                <div class="card-content">
                    <div class="github-info pulse">
                        <i class="fas fa-user"></i>
                        <div>
                            <strong>Developer:</strong> Ankit Gupta (hyperdargo)
                        </div>
                    </div>
                    <div class="github-info pulse">
                        <i class="fas fa-code-branch"></i>
                        <div>
                            <strong>GitHub:</strong> <a href="https://github.com/hyperdargo" target="_blank" class="glow-link">https://github.com/hyperdargo</a>
                        </div>
                    </div>
                    
                    <div class="github-stats">
                        <div class="stat-item pulse">
                            <i class="fas fa-star"></i>
                            <div>
                                <div class="stat-value">100%</div>
                                <div class="stat-label">Open Source</div>
                            </div>
                        </div>
                        <div class="stat-item pulse">
                            <i class="fas fa-code"></i>
                            <div>
                                <div class="stat-value">10+</div>
                                <div class="stat-label">Projects</div>
                            </div>
                        </div>
                        <div class="stat-item pulse">
                            <i class="fas fa-users"></i>
                            <div>
                                <div class="stat-value">Community</div>
                                <div class="stat-label">Driven</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="open-source-message pulse">
                        <h4>🎯 Open Source Philosophy</h4>
                        <p>All DTEmpire code is open source and freely available on GitHub. We believe in transparency, community collaboration, and helping others learn from our projects.</p>
                        <p>Feel free to explore, contribute, fork, and use our code in your own projects!</p>
                        <p class="quote">"Great things in business are never done by one person. They're done by a team of people." - Steve Jobs</p>
                    </div>
                    
                    <div class="github-actions">
                        <a href="https://github.com/hyperdargo" target="_blank" class="btn btn-hack pulse">
                            <i class="fab fa-github"></i> Visit GitHub
                        </a>
                        <a href="https://github.com/hyperdargo?tab=repositories" target="_blank" class="btn btn-hack pulse">
                            <i class="fas fa-code"></i> View Projects
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-heart pulse"></i></div>
                    <h3 class="card-title">Contributing</h3>
                </div>
                <div class="card-content">
                    <p>We welcome contributions from the community! Here's how you can help:</p>
                    <ul class="contribute-list">
                        <li class="pulse"><i class="fas fa-bug"></i> Report bugs and issues</li>
                        <li class="pulse"><i class="fas fa-lightbulb"></i> Suggest new features</li>
                        <li class="pulse"><i class="fas fa-code"></i> Submit pull requests</li>
                        <li class="pulse"><i class="fas fa-book"></i> Improve documentation</li>
                        <li class="pulse"><i class="fas fa-share"></i> Share with others</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('github');
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Discord information
function loadDiscord() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Home / Discord';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fab fa-discord pulse"></i> DTEmpire Discord</h2>
                <p>Our Discord server is the central hub for support, announcements, and community interaction.</p>
            </section>
            
            <div class="grid-container">
                <div class="card animate-on-scroll">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-headset pulse"></i></div>
                        <h3 class="card-title">Support & Help</h3>
                    </div>
                    <div class="card-content">
                        <p>Get help with setting up our services, troubleshooting issues, or asking questions about our products.</p>
                        <p>Our support team and community members are active and ready to assist.</p>
                    </div>
                </div>
                
                <div class="card animate-on-scroll">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-bullhorn pulse"></i></div>
                        <h3 class="card-title">Announcements</h3>
                    </div>
                    <div class="card-content">
                        <p>Stay updated with the latest news, updates, and maintenance schedules for all DTEmpire services.</p>
                        <p>Never miss an important update about our bots, APIs, or servers.</p>
                    </div>
                </div>
                
                <div class="card animate-on-scroll">
                    <div class="card-header">
                        <div class="card-icon"><i class="fas fa-robot pulse"></i></div>
                        <h3 class="card-title">Bot Testing</h3>
                    </div>
                    <div class="card-content">
                        <p>Test our Discord bots before inviting them to your server. Try commands, check features, and see the bots in action.</p>
                        <p>Available bots: Music Bot, Moderation Bot, Utility Bot, and more.</p>
                    </div>
                </div>
            </div>
            
            <section class="discord-section animate-on-scroll">
                <div class="discord-content">
                    <div class="discord-info">
                        <h3>DTEmpire Discord Links</h3>
                        <p>Join our Discord community to get support, participate in discussions, and stay updated with the latest announcements.</p>
                        
                        <div class="discord-links-grid">
                            <div class="discord-link-card pulse">
                                <div class="link-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <h4>DTEmpire Server</h4>
                                <p>Main community server for support, announcements, and discussions</p>
                                <div class="link-url">
                                    <code class="glow-text">http://dsc.gg/dtempire-server</code>
                                </div>
                                <button class="btn btn-discord pulse" onclick="inviteToDiscord()">
                                    <i class="fab fa-discord"></i> Join Server
                                </button>
                            </div>
                            
                            <div class="discord-link-card pulse">
                                <div class="link-icon">
                                    <i class="fas fa-robot"></i>
                                </div>
                                <h4>DTEmpire Official Bot</h4>
                                <p>Multi-purpose bot with moderation, utility, and fun commands</p>
                                <div class="link-url">
                                    <code class="glow-text">http://dsc.gg/dtempire</code>
                                </div>
                                <button class="btn btn-hack pulse" onclick="inviteBot()">
                                    <i class="fas fa-robot"></i> Invite Bot
                                </button>
                            </div>
                            
                            <div class="discord-link-card pulse">
                                <div class="link-icon">
                                    <i class="fas fa-music"></i>
                                </div>
                                <h4>DTEmpire Music Bot</h4>
                                <p>High-quality music bot with YouTube, Spotify, and SoundCloud support</p>
                                <div class="link-url">
                                    <code class="glow-text">http://dsc.gg/dtempire-music</code>
                                </div>
                                <button class="btn btn-hack pulse" onclick="inviteMusicBot()">
                                    <i class="fas fa-music"></i> Invite Music Bot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
    
    setActiveNav('discord');
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load Invite page
function loadInvite() {
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = 'Resources / Invite Bot';
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2><i class="fas fa-robot pulse"></i> Invite DTEmpire Bots</h2>
                <p>Add our bots to your Discord server and enhance your community experience.</p>
            </section>
            
            <div class="invite-grid-large">
                <div class="invite-card-large pulse">
                    <div class="invite-card-header">
                        <i class="fab fa-discord"></i>
                        <h3>DTEmpire Official Bot</h3>
                    </div>
                    <div class="invite-card-content">
                        <p><strong>Features:</strong> 200+ commands including moderation, utility, fun, and more</p>
                        <ul>
                            <li><i class="fas fa-shield-alt"></i> Advanced moderation tools</li>
                            <li><i class="fas fa-cogs"></i> Server management utilities</li>
                            <li><i class="fas fa-gamepad"></i> Fun and entertainment commands</li>
                            <li><i class="fas fa-image"></i> Image generation with AI</li>
                            <li><i class="fas fa-headset"></i> TTS and AI chat features</li>
                        </ul>
                        <div class="invite-link-large">
                            <code class="glow-text">http://dsc.gg/dtempire</code>
                        </div>
                        <button class="btn btn-discord-large pulse" onclick="inviteBot()">
                            <i class="fas fa-plus"></i> Invite to Server
                        </button>
                    </div>
                </div>
                
                <div class="invite-card-large pulse">
                    <div class="invite-card-header">
                        <i class="fas fa-music"></i>
                        <h3>DTEmpire Music Bot</h3>
                    </div>
                    <div class="invite-card-content">
                        <p><strong>Features:</strong> High-quality music playback with advanced features</p>
                        <ul>
                            <li><i class="fab fa-youtube"></i> YouTube, Spotify, SoundCloud support</li>
                            <li><i class="fas fa-headphones"></i> Premium 128kbps audio quality</li>
                            <li><i class="fas fa-sliders-h"></i> Audio filters and effects</li>
                            <li><i class="fas fa-list-ol"></i> Advanced queue system</li>
                            <li><i class="fas fa-volume-up"></i> Per-user volume control</li>
                        </ul>
                        <div class="invite-link-large">
                            <code class="glow-text">http://dsc.gg/dtempire-music</code>
                        </div>
                        <button class="btn btn-hack-large pulse" onclick="inviteMusicBot()">
                            <i class="fas fa-music"></i> Invite Music Bot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav('invite');
    setTimeout(() => setupScrollAnimations(), 100);
}

// Load other documentation pages
function loadPage(pageName) {
    const pageFunctions = {
        'lavalink': loadLavalink,
        'music-bot': loadMusicBot,
        'image-api': loadImageAPI,
        'game-servers': loadGameServers,
        'websites': loadWebsites,
        'api': loadAPI,
        'invite': loadInvite,
        'github': loadGitHub,
        'dtempire-bot': loadDTEmpireBot,
        'discord': loadDiscord
    };
    
    if (pageFunctions[pageName]) {
        pageFunctions[pageName]();
        return;
    }
    
    // Default fallback page
    const contentBody = ensureContentBody();
    const breadcrumb = document.getElementById('breadcrumb');
    
    if (breadcrumb) breadcrumb.textContent = `Documentation / ${pageName}`;
    
    contentBody.innerHTML = `
        <div class="home-content">
            <section class="welcome-section animate-on-scroll">
                <h2>${pageName}</h2>
                <p>Documentation for ${pageName} is coming soon.</p>
                <p>This page is under construction. Check back later for detailed guides and documentation.</p>
            </section>
            
            <div class="card animate-on-scroll">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-tools pulse"></i></div>
                    <h3 class="card-title">Page Under Construction</h3>
                </div>
                <div class="card-content">
                    <p>We're currently working on the documentation for this section. In the meantime, you can:</p>
                    <ul>
                        <li>Check our <a href="#status" class="card-link pulse">Status Dashboard</a> for service availability</li>
                        <li>Join our <a href="#discord" class="card-link pulse">Discord server</a> for help and updates</li>
                        <li>Return to the <a href="#home" class="card-link pulse">Home page</a> for other documentation</li>
                    </ul>
                    <p>Expected completion: Soon™</p>
                </div>
            </div>
        </div>
    `;
    
    setActiveNav(pageName);
    setTimeout(() => setupScrollAnimations(), 100);
}

// Set active navigation item
function setActiveNav(pageId = 'home') {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-section a').forEach(link => {
        link.classList.remove('active');
        link.classList.remove('nav-active');
    });
    
    // Add active class to current page
    const activeLink = document.getElementById(`nav-${pageId}`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.classList.add('nav-active');
    }
}

// Update server time display
function updateServerTime() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    const timeElement = document.getElementById('server-time');
    if (timeElement) {
        timeElement.textContent = `${timeString} UTC`;
        timeElement.classList.add('time-update');
        setTimeout(() => timeElement.classList.remove('time-update'), 500);
    }
}

// Toggle terminal visibility
function toggleTerminal() {
    const terminal = document.getElementById('terminal');
    terminal.classList.toggle('open');
    
    if (terminal.classList.contains('open')) {
        document.getElementById('terminal-input').focus();
    }
}

// Set up terminal functionality
function setupTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    if (!terminalInput || !terminalOutput) return;
    
    const commands = {
        'help': 'Available commands: help, status, discord, github, clear, about, theme, home',
        'status': 'Opening status dashboard...',
        'discord': 'Opening Discord server invite...',
        'github': 'Opening GitHub repository...',
        'about': 'DTEmpire -  Documentation System v1.6.9 | Made By DargoTamber',
        'theme': 'Toggling theme...',
        'home': 'Loading home page...',
        'ls': 'index.html  styles.css  script.js  server.js',
        'pwd': '/home/container/',
        'whoami': 'dtempire@docs'
    };
    
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            
            // Add user input to terminal
            addTerminalLine(`<span class="term-prompt">dtempire@docs:~$</span> ${command}`);
            
            // Process command
            if (command === 'clear') {
                terminalOutput.innerHTML = '';
                addTerminalLine('Terminal cleared.');
            } else if (command === 'theme') {
                toggleTheme();
                addTerminalLine('Theme toggled.');
            } else if (command === 'status') {
                addTerminalLine(commands[command]);
                setTimeout(() => loadStatus(), 500);
            } else if (command === 'discord') {
                addTerminalLine(commands[command]);
                setTimeout(() => inviteToDiscord(), 500);
            } else if (command === 'github') {
                addTerminalLine(commands[command]);
                setTimeout(() => window.open('https://github.com/hyperdargo', '_blank'), 500);
            } else if (command === 'home') {
                addTerminalLine(commands[command]);
                setTimeout(() => loadHome(), 500);
            } else if (commands[command]) {
                addTerminalLine(commands[command]);
            } else if (command) {
                addTerminalLine(`Command not found: ${command}. Type 'help' for available commands.`);
            }
        }
    });
    
    function addTerminalLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

// Create matrix rain effect
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    // Columns
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    // Draw function
    function draw() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Color - gradient effect
            const opacity = Math.random() * 0.5 + 0.3;
            ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
            
            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Reset drop if it reaches bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Animation loop
    setInterval(draw, 50);
}

// Toggle theme (light/dark)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        document.documentElement.style.setProperty('--primary', '#006400');
        document.documentElement.style.setProperty('--primary-dark', '#004d00');
        document.documentElement.style.setProperty('--secondary', '#e0ffe0');
        document.documentElement.style.setProperty('--bg-dark', '#f0f0f0');
        document.documentElement.style.setProperty('--bg-darker', '#e0e0e0');
        document.documentElement.style.setProperty('--text-primary', '#000000');
        document.documentElement.style.setProperty('--text-secondary', '#333333');
        document.documentElement.style.setProperty('--text-code', '#008000');
    } else {
        document.documentElement.style.setProperty('--primary', '#00ff41');
        document.documentElement.style.setProperty('--primary-dark', '#008f11');
        document.documentElement.style.setProperty('--secondary', '#003b00');
        document.documentElement.style.setProperty('--bg-dark', '#0a0a0a');
        document.documentElement.style.setProperty('--bg-darker', '#050505');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
        document.documentElement.style.setProperty('--text-code', '#00ff9d');
    }
}

// Discord invite function
function inviteToDiscord() {
    window.open('http://dsc.gg/dtempire-server', '_blank');
}

// Invite bot function
function inviteBot() {
    window.open('http://dsc.gg/dtempire', '_blank');
}

// Invite music bot function
function inviteMusicBot() {
    window.open('http://dsc.gg/dtempire-music', '_blank');
}

// Load status page (external link)
function loadStatus() {
    window.open('https://live-monitor.ankitgupta.com.np/', '_blank');
    setActiveNav('status');
}

// Add glitch effect to title
function glitchTitle() {
    const title = document.querySelector('.welcome-section h2');
    if (title) {
        title.classList.add('glitch');
        setTimeout(() => title.classList.remove('glitch'), 300);
    }
}

// Randomly trigger glitch effect
setInterval(() => {
    if (Math.random() > 0.7) {
        glitchTitle();
    }
}, 5000);

// Copy to clipboard function
function copyToClipboard(button) {
    const code = button.closest('.code-block').querySelector('code');
    const text = code.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

function copyToClipboardText(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Optional: Show notification
        showNotification('Copied to clipboard!');
    });
}

function setupTokenCopyButtons() {
    document.querySelectorAll('.btn-copy-small').forEach(button => {
        button.addEventListener('click', function() {
            const token = this.getAttribute('data-token');
            copyToClipboardText(token);
            
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.classList.add('copied');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copied');
            }, 2000);
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Type code animations
function typeCodeAnimations() {
    document.querySelectorAll('.type-animation').forEach((element, index) => {
        setTimeout(() => {
            const text = element.textContent;
            element.textContent = '';
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 10);
        }, index * 200);
    });
}
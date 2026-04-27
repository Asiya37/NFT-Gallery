import React, { useState, useEffect } from 'react';

import './App.css';

// Sample NFT dataset with images, metadata
const initialNFTs = [
  {
    id: 1,
    name: 'Cyber Dreamer',
    artist: 'Elena Vos',
    price: 2.4,
    currency: 'ETH',
    category: 'abstract',
    image: 'https://picsum.photos/id/0/400/400',
    description: 'A surreal dreamscape blending neon cyberpunk elements with organic flowing forms.',
    createdAt: '2024-02-10'
  },
  {
    id: 2,
    name: 'Golden Hour',
    artist: 'Marcus Chen',
    price: 1.2,
    currency: 'ETH',
    category: 'landscape',
    image: 'https://picsum.photos/id/104/400/400',
    description: 'Digital interpretation of sunset over abstract mountains, warm tones.',
    createdAt: '2024-03-01'
  },
  {
    id: 3,
    name: 'Neon Fractals #42',
    artist: 'Sophia K.',
    price: 0.85,
    currency: 'ETH',
    category: 'abstract',
    image: 'https://picsum.photos/id/106/400/400',
    description: 'Vivid fractal geometry with neon gradients, infinite patterns.',
    createdAt: '2024-01-18'
  },
  {
    id: 4,
    name: 'Urban Silence',
    artist: 'David Ray',
    price: 3.0,
    currency: 'ETH',
    category: 'cityscape',
    image: 'https://picsum.photos/id/96/400/400',
    description: 'Rainy city night, minimalistic mood, reflections and solitude.',
    createdAt: '2024-02-25'
  },
  {
    id: 5,
    name: 'Digital Blossom',
    artist: 'Yuki Tanaka',
    price: 0.95,
    currency: 'ETH',
    category: 'nature',
    image: 'https://picsum.photos/id/127/400/400',
    description: 'Cherry blossoms in a digital wind, generative colors.',
    createdAt: '2024-03-10'
  },
  {
    id: 6,
    name: 'Abstract Mind',
    artist: 'Lina Zhou',
    price: 1.75,
    currency: 'ETH',
    category: 'abstract',
    image: 'https://picsum.photos/id/98/400/400',
    description: 'Mind-like structures floating in gradient space.',
    createdAt: '2024-01-30'
  },
  {
    id: 7,
    name: 'Tokyo Nights',
    artist: 'Kenjiro S.',
    price: 2.2,
    currency: 'ETH',
    category: 'cityscape',
    image: 'https://picsum.photos/id/91/400/400',
    description: 'Neon lights, motion blur, futuristic vibe.',
    createdAt: '2024-02-14'
  },
  {
    id: 8,
    name: 'Serenity Falls',
    artist: 'Olivia P.',
    price: 1.5,
    currency: 'ETH',
    category: 'nature',
    image: 'https://picsum.photos/id/35/400/400',
    description: 'Digital waterfall with peaceful ambient tones.',
    createdAt: '2024-03-05'
  }
];


const formatPrice = (price, currency) => `${price} ${currency}`;

function App() {
  const [nfts, setNfts] = useState(initialNFTs);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [selectedNFT, setSelectedNFT] = useState(null); // for details modal
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);


  const categories = ['all', ...new Set(nfts.map(nft => nft.category))];

  // Filtering logic
  let filteredNFTs = [...nfts];
  if (filterCategory !== 'all') {
    filteredNFTs = filteredNFTs.filter(nft => nft.category === filterCategory);
  }

  // Sorting logic
  if (sortBy === 'price_asc') {
    filteredNFTs.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredNFTs.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name_asc') {
    filteredNFTs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'newest') {
    filteredNFTs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
 

  const openDetails = (nft) => {
    setSelectedNFT(nft);
  };

  const closeDetails = () => {
    setSelectedNFT(null);
  };

  return (
    <div className="app">
      <div className="gallery-container">
        {/* Header */}
       <div className="gallery-header">
  <div className="header-top">
    <h1>✧ Ethereal Gallery ✧</h1>

    <button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  </div>

  <p className="subhead">curated digital art | limited NFTs</p>
</div>

    
        <div className="controls">
          <div className="filter-group">
            <span className="control-label">filter</span>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat === 'all' ? 'all works' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-group">
            <span className="control-label">sort by</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">default</option>
              <option value="price_asc">price ↑ (low to high)</option>
              <option value="price_desc">price ↓ (high to low)</option>
              <option value="name_asc">name A–Z</option>
              <option value="newest">newest first</option>
            </select>
          </div>
        </div>

      
        <div className="nft-grid">
          {filteredNFTs.length === 0 ? (
            <div className="no-results">✨ no artworks match this filter ✨</div>
          ) : (
            filteredNFTs.map((nft) => (
              <div
                key={nft.id}
                className="nft-card"
                onClick={() => openDetails(nft)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openDetails(nft)}
              >
                <div className="card-image">
                  <img src={nft.image} alt={nft.name} loading="lazy" />
                </div>
                <div className="card-info">
                  <h3 className="nft-name">{nft.name}</h3>
                  <p className="nft-artist">by {nft.artist}</p>
                  <div className="price-tag">{formatPrice(nft.price, nft.currency)}</div>
                  <span className="card-category-badge">{nft.category}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

   
      {selectedNFT && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDetails} aria-label="Close">✕</button>
            <div className="details-layout">
              <div className="details-image">
                <img src={selectedNFT.image} alt={selectedNFT.name} />
              </div>
              <div className="details-info">
                <span className="detail-category">{selectedNFT.category}</span>
                <h2>{selectedNFT.name}</h2>
                <p className="artist-line">by {selectedNFT.artist}</p>
                <div className="price-large">
                  {formatPrice(selectedNFT.price, selectedNFT.currency)}
                </div>
                <div className="description-box">
                  <p>{selectedNFT.description}</p>
                </div>
                <div className="meta-row">
                  <span>🖼️ digital asset • unique edition</span>
                  <span>📅 minted: {new Date(selectedNFT.createdAt).toLocaleDateString()}</span>
                </div>
                <button className="action-button" onClick={() => alert(`✨ "${selectedNFT.name}" — checkout simulation`)}>
                  acquire now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
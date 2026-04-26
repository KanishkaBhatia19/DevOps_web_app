const cryptoContainer = document.getElementById('crypto-container');
const searchInput = document.getElementById('searchInput');
let coinData = []; // State storage

// 1. Fetch Data from API
async function fetchMarketData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
        coinData = await response.json();
        displayCoins(coinData);
    } catch (error) {
        cryptoContainer.innerHTML = `<p>Error loading data. Check console.</p>`;
        console.error("API Error:", error);
    }
}

// 2. Render Cards to DOM
function displayCoins(data) {
    cryptoContainer.innerHTML = data.map(coin => {
        const isPositive = coin.price_change_percentage_24h > 0;
        return `
            <div class="coin-card">
                <div class="coin-info">
                    <img src="${coin.image}" alt="${coin.name}">
                    <div>
                        <strong>${coin.name}</strong>
                        <p>${coin.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <div class="price">$${coin.current_price.toLocaleString()}</div>
                <div class="change ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '▲' : '▼'} ${coin.price_change_percentage_24h.toFixed(2)}%
                </div>
            </div>
        `;
    }).join('');
}

// 3. Search/Filter Logic
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCoins = coinData.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    displayCoins(filteredCoins);
});

// Initial load
fetchMarketData();

// Auto-refresh every 60 seconds
setInterval(fetchMarketData, 60000);

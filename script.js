const JSON_URL = "https://iptv-eldbert.xyz/iptv/channels.json";
const MY_CHANNELS = ["⚽️ DSports", "⚽️ DSports Plus", "⚽️ Telemundo USA"];

async function updateDashboard() {
    const app = document.getElementById('app');
    app.innerHTML = 'Fetching fresh links...';

    try {
        const response = await fetch(JSON_URL);
        const data = await response.json();
        app.innerHTML = ''; // Clear loading text

        MY_CHANNELS.forEach(name => {
            const ch = data.find(c => c.name.includes(name));
            if (ch) {
                const card = document.createElement('div');
                card.className = 'channel-card';
                card.innerHTML = `
                    <h3>${ch.name}</h3>
                    <button onclick="window.location.href='${ch.url}'">Watch Live</button>
                `;
                app.appendChild(card);
            }
        });
    } catch (e) {
        app.innerHTML = 'Failed to load streams. Refresh the page!';
    }
}

// Automatically run when the page loads
updateDashboard();

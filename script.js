const ORIGINAL_URL = "https://iptv-eldbert.xyz/iptv/channels.json";
// This proxy adds the headers your browser needs
const PROXY_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent(ORIGINAL_URL);

const MY_CHANNELS = ["⚽️ DSports", "⚽️ DSports Plus", "⚽️ Telemundo USA"];

async function updateDashboard() {
    const app = document.getElementById('app');
    
    try {
        const response = await fetch(PROXY_URL);
        const data = await response.json();
        // The proxy returns the real data inside a 'contents' field
        const channels = JSON.parse(data.contents); 
        
        app.innerHTML = ''; 

        MY_CHANNELS.forEach(name => {
            const ch = channels.find(c => c.name.includes(name));
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
        console.error(e);
        app.innerHTML = 'Error loading. Please refresh!';
    }
}

updateDashboard();

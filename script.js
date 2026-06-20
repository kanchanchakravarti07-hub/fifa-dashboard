const ORIGINAL_URL = "https://iptv-eldbert.xyz/iptv/channels.json";
// This is a more robust, bypass-focused proxy
const PROXY_URL = "https://corsproxy.io/?" + encodeURIComponent(ORIGINAL_URL);

const MY_CHANNELS = ["DSports", "DSports Plus", "Telemundo USA"];

async function updateDashboard() {
    const app = document.getElementById('app');
    
    try {
        const response = await fetch(PROXY_URL);
        const channels = await response.json(); // corsproxy.io returns the data directly!
        
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
        app.innerHTML = 'Still blocked? Try disabling any AdBlockers or refresh once more!';
    }
}

updateDashboard();

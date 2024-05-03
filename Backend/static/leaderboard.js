async function topPlayers() {
  try {
    const response = await fetch("http://127.0.0.1:3000/top_players");
    const data = await response.json();
    console.log(data);

    const mainElement = document.querySelector("main");

    const ol = document.createElement("ol");

    for (let player of data) {
      const li = document.createElement("li");
      li.textContent = player;
      ol.appendChild(li);
    }
    mainElement.appendChild(ol);
  } catch (error) {
    console.error("Error fetching top players:", error);
    throw error;
  }
}

topPlayers();

const gallery = document.getElementById('saree-gallery');
const searchInput = document.getElementById('searchInput');

function renderSarees(data) {
  gallery.innerHTML = "";
  data.forEach((saree, index) => {
    const card = document.createElement('div');
    card.className = 'saree-card';
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    card.style.transition = `all 0.6s ease ${index * 100}ms`;

    card.innerHTML = `
      <a href="pages/saree.html?id=${saree.id}">
        <img src="${saree.image}" alt="${saree.name}" />
        <div class="saree-info">
          <h3>${saree.name}</h3>
          <p>${saree.description}</p>
          <p><strong>${saree.price}</strong></p>
        </div>
      </a>
    `;
    gallery.appendChild(card);

    // Animate after a delay
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, 100);
  });
}

fetch('sarees.json')
  .then(res => res.json())
  .then(data => {
    renderSarees(data);

    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = data.filter(s =>
        s.name.toLowerCase().includes(keyword) ||
        s.description.toLowerCase().includes(keyword)
      );
      renderSarees(filtered);
    });
  })
  .catch(error => {
    gallery.innerHTML = "<p style='text-align:center;'>Unable to load sarees.</p>";
    console.error("Error loading sarees.json:", error);
  });

document.addEventListener("DOMContentLoaded", () => {
  const chapterContainer = document.getElementById("chapterList");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let page = 1;
  const perPage = 12;
  
  async function loadChapters() {
    try {
      // fetch JSON data langsung
      const res = await fetch(`https://m6.mikoroku.workers.dev/api/manga/chapters?page=${page}&limit=${perPage}`);
      const data = await res.json();
      
      if (!data.chapters || data.chapters.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
      }
      
      data.chapters.forEach(chap => {
        const div = document.createElement("div");
        div.className = "chapter-item";
        div.textContent = chap.title;
        div.onclick = () => {
          window.location.href = `/chapter/${chap.slug}`;
        };
        chapterContainer.appendChild(div);
      });
      
      page++; // next page
    } catch (e) {
      console.error("Failed to load chapters:", e);
    }
  }
  
  // initial load
  loadChapters();
  
  // load more button
  loadMoreBtn.addEventListener("click", loadChapters);
});

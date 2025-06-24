// Utility: Get slug from URL path, e.g. /collection/project-1 -> 'project-1'
function getSlugFromPath() {
  // Example pathname: /collection/project-1 or /collection/project-1/
  const parts = window.location.pathname.split('/').filter(Boolean); 
  // parts = ['collection', 'project-1']
  if (parts.length < 2) return null;
  return parts[1]; // 'project-1'
}

async function loadProject() {
  const slug = getSlugFromPath();
  const container = document.getElementById('project-container');

  if (!slug) {
    container.innerHTML = '<p>No project specified in URL.</p>';
    return;
  }

  try {
    const response = await fetch('/data.json');
    if (!response.ok) throw new Error('Failed to load data.json');
    const data = await response.json();

    const project = data[slug];
    if (!project) {
      container.innerHTML = `<p>Project "${slug}" not found.</p>`;
      return;
    }

    container.innerHTML = `
      <h1>${project.name}</h1>
      <img src="${project.image}" alt="${project.name}" />
      <p>${project.description}</p>
      <p><a href="/collection/">Back to collection</a></p>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Error loading project data.</p>';
  }
}

loadProject();

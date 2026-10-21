(() => {
  const cards = [...document.querySelectorAll('.archive-card')];
  const catChips = [...document.querySelectorAll('[data-cat]')];
  const themeChips = [...document.querySelectorAll('[data-theme]')];
  const search = document.getElementById('filter-search');
  const count = document.getElementById('archive-count');
  const noResults = document.getElementById('no-results');
  const blurb = document.getElementById('cat-blurb');
  const keys = document.getElementById('cat-keys');
  const CAT = {
    '': { blurb: 'Finished work, field documentation and prototypes.', keys: '' },
    record: { blurb: 'Observe closely. Make a record others can return to.', keys: 'Field notes · Photography · Observational drawing' },
    explain: { blurb: 'Make species and ecological knowledge easier to understand.', keys: 'Scientific illustration · Educational print' },
    connect: { blurb: 'Turn encounters with nature into stories people can feel.', keys: 'Exhibitions · Comics · Interactive narratives' },
    act: { blurb: 'Explore how people can contribute observations and engage with data.', keys: 'Web GIS · Interactive prototypes' },
    exploration: { blurb: 'Work made for its own sake, following a question wherever it leads.', keys: 'Illustration · Personal projects' }
  };
  let cat = '', theme = '', q = '';
  function apply() {
    let visible = 0;
    for (const card of cards) {
      const show = (!cat || card.dataset.purpose.split('|').includes(cat)) &&
        (!theme || card.dataset.theme.split('|').includes(theme)) &&
        (!q || card.textContent.toLowerCase().includes(q));
      card.hidden = !show;
      if (show) visible++;
    }
    if (count) count.textContent = `${visible} of ${cards.length} projects`;
    if (noResults) noResults.hidden = visible > 0;
    catChips.forEach(c => c.classList.toggle('is-active', c.dataset.cat === cat));
    themeChips.forEach(c => c.classList.toggle('is-active', c.dataset.theme === theme));
    if (blurb && CAT[cat]) blurb.textContent = CAT[cat].blurb;
    if (keys && CAT[cat]) keys.textContent = CAT[cat].keys;
  }
  catChips.forEach(c => c.addEventListener('click', () => { cat = c.dataset.cat; apply(); }));
  themeChips.forEach(c => c.addEventListener('click', () => { theme = c.dataset.theme; apply(); }));
  if (search) search.addEventListener('input', () => { q = search.value.toLowerCase().trim(); apply(); });
  const reset = document.getElementById('reset-filters');
  if (reset) reset.addEventListener('click', () => { cat = ''; theme = ''; q = ''; if (search) search.value = ''; apply(); });
  document.querySelectorAll('[data-filter-theme]').forEach(link => link.addEventListener('click', () => { theme = link.dataset.filterTheme; apply(); }));
  apply();
})();
// Show the nav name only once the hero headline has scrolled out of view,
// so the name never appears twice on the same screen.
(() => {
  const nav = document.querySelector('nav');
  const heroTitle = document.querySelector('h1');
  if (!nav || !heroTitle) return;
  new IntersectionObserver(([entry]) => {
    nav.classList.toggle('name-on', !entry.isIntersecting);
  }).observe(heroTitle);
})();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = input.value.trim();
    if (url) {
      console.log('Добавление RSS:', url);
    }
  });
});
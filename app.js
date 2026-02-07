const books = [
  { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', rating: 4.7, copies: 5, status: 'Available', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80', height: 330 },
  { title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', rating: 4.6, copies: 2, status: 'Low Stock', cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80', height: 410 },
  { title: 'Dune', author: 'Frank Herbert', genre: 'Fiction', rating: 4.8, copies: 4, status: 'Available', cover: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=800&q=80', height: 300 },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Technology', rating: 4.9, copies: 3, status: 'Available', cover: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=800&q=80', height: 360 },
  { title: 'Brief Answers to the Big Questions', author: 'Stephen Hawking', genre: 'Science', rating: 4.5, copies: 1, status: 'Borrowed', cover: 'https://images.unsplash.com/photo-1455885666463-9a7f039d4f26?auto=format&fit=crop&w=800&q=80', height: 420 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', rating: 4.9, copies: 6, status: 'Available', cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80', height: 340 },
  { title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', rating: 4.7, copies: 2, status: 'Low Stock', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80', height: 390 },
  { title: 'The Body', author: 'Bill Bryson', genre: 'Science', rating: 4.4, copies: 4, status: 'Available', cover: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=800&q=80', height: 320 }
];

const grid = document.getElementById('bookGrid');
const template = document.getElementById('bookCardTemplate');
const searchInput = document.getElementById('searchInput');
const filterButtons = [...document.querySelectorAll('.pill')];

let activeFilter = 'all';
let query = '';

function createBookCard(book) {
  const node = template.content.cloneNode(true);
  node.querySelector('.title').textContent = book.title;
  node.querySelector('.meta').textContent = `${book.author}`;
  node.querySelector('.genre').textContent = `Genre: ${book.genre}`;
  node.querySelector('.rating').textContent = `⭐ ${book.rating}`;
  node.querySelector('.copies').textContent = `Copies: ${book.copies}`;
  node.querySelector('.status').textContent = book.status;

  const cover = node.querySelector('.cover');
  cover.src = book.cover;
  cover.style.height = `${book.height}px`;

  return node;
}

function render() {
  const filtered = books.filter((book) => {
    const matchesFilter = activeFilter === 'all' || book.genre === activeFilter;
    const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  grid.innerHTML = '';

  if (!filtered.length) {
    grid.innerHTML = '<p class="empty">No books found for that filter/search.</p>';
    return;
  }

  filtered.forEach((book) => grid.appendChild(createBookCard(book)));
}

searchInput.addEventListener('input', (event) => {
  query = event.target.value;
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    render();
  });
});

render();

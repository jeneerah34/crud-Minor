const API = '/api/items';
const listEl = document.getElementById('items');
const formEl = document.getElementById('item-form');
const idEl = document.getElementById('item-id');
const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const doneEl = document.getElementById('done');
const searchEl = document.getElementById('search');
const resetBtn = document.getElementById('reset-btn');

async function fetchItems(q = '') {
  const url = q ? `${API}?q=${encodeURIComponent(q)}` : API;
  const res = await fetch(url);
  const items = await res.json();
  renderList(items);
}

function renderList(items) {
  listEl.innerHTML = '';
  const tpl = document.getElementById('item-template');
  items.forEach((it) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('.title').textContent = it.title;
    node.querySelector('.desc').textContent = it.description || '';
    const toggle = node.querySelector('.toggle');
    toggle.checked = it.done;

    // Toggle done status
    toggle.addEventListener('change', async () => {
      await fetch(`${API}/${it._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: it.title, description: it.description, done: toggle.checked })
      });
      fetchItems(searchEl.value);
    });

    // Edit
    node.querySelector('.edit').addEventListener('click', () => {
      idEl.value = it._id;
      titleEl.value = it.title;
      descriptionEl.value = it.description || '';
      doneEl.checked = !!it.done;
      titleEl.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Delete
    node.querySelector('.delete').addEventListener('click', async () => {
      if (!confirm('Delete this item?')) return;
      await fetch(`${API}/${it._id}`, { method: 'DELETE' });
      fetchItems(searchEl.value);
    });

    listEl.appendChild(node);
  });
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: titleEl.value.trim(),
    description: descriptionEl.value.trim(),
    done: doneEl.checked
  };
  if (!payload.title) return alert('Title is required');

  const id = idEl.value;
  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
  resetForm();
  fetchItems(searchEl.value);
});

function resetForm() {
  idEl.value = '';
  titleEl.value = '';
  descriptionEl.value = '';
  doneEl.checked = false;
}

resetBtn.addEventListener('click', resetForm);
searchEl.addEventListener('input', () => fetchItems(searchEl.value));

// Initial load
fetchItems();

// Function to create new blog
const newBlogHandler = async (event) => {
  event.preventDefault();
  const blogTitle = document.querySelector('#blog-title').value.trim();
  const blogContent = document.querySelector('#blog-content').value.trim();

  if (blogTitle && blogContent) {
    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ blogTitle, blogContent }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new blog');
    }
  }
};

// Function to update blog
const updateBlogHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const blogTitle = document.querySelector('#blog-title').value.trim();
    const blogContent = document.querySelector('#blog-content').value.trim();

    if (id && blogTitle && blogContent) {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id,
          blogTitle,
          blogContent
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new blog');
      }
    }
  }
};

// Function to delete blog
const delButtonHandler = async (event) => {
  console.log(event.target);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/dashbaord');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);

document
  .querySelector('.edit-blog-form')
  .addEventListener('submit', updateBlogHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);
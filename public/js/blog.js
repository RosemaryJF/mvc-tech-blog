// Function to create new blog
const newBlogHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#new-blog-title').value;
  const content = document.querySelector('#new-blog-content').value;

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new blog');
      console.error();
    }
  }
};

// Function to update blog
const updateBlogHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const blogTitle = document.querySelector('#blog-title').value.trim();
    const blogContent = document.querySelector('#blog-content').value.trim();

    if (blogTitle && blogContent) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          blogTitle,
          blogContent
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.replace(`/api/blogs/${id}`);
      } else {
        alert('Failed to update blog', response.statusText);
      }
    }
  }
};

// Function to delete blog
const deleteBlogHandler = async (event) => {
  console.log(event.target);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
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
  .querySelector('.delete-blog-btn')
  .addEventListener('submit', deleteBlogHandler);
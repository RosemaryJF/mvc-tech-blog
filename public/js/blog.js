// Function to create new blog
const newBlogHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#new-blog-title').value;
  const content = document.querySelector('#new-blog-content').value;

  if (title && content) {
    const response = await fetch(`/api/blog`, {
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

    const title = document.querySelector('#blog-title').value;
    const content = document.querySelector('#blog-content').value;

    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace(`/api/blog/${id}`);
      console.log('You have successfully updated this blog!');
    } else {
      console.error();
      alert('Failed to update blog', response.statusText);
    }
  }
};


// Function to delete blog
const deleteBlogHandler = async (event) => {
  console.log(event.target);
  if (event.target.querySelector('#delete-blog-btn')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('You have successfully deleted this blog!');
      document.location.replace(`/api/blog/${id}`);
    } else {
      console.error();
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);

document
  .querySelector('.edit-blog-form')
  .addEventListener('click', updateBlogHandler);

document
  .querySelector('.delete-blog-btn')
  .addEventListener('submit', deleteBlogHandler);
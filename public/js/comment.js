// Function to create new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector('#comment-content').value.trim();

  if (commentContent) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'POST',
      body: JSON.stringify({ commentContent }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace(`/api/blogs/${id}`);
    } else {
      alert('Failed to create new comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
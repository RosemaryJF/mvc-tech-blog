// Function to redirect the user to clicked on blog page
const viewBlogBtnHandler = async (event) => {
  event.preventDefault();

  if (event) {
    console.log('A blog button has been clicked');
    const response = await fetch(`/api/blog/${id}`, {
      method: 'GET'
    });

    if (response.ok) {
      console.log('You have been redirected to the sign up page');
      document.location.replace(`/api/blog/${id}`);
    } else {
      console.error(err);
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.view-blog-btn')
  .addEventListener('submit', viewBlogBtnHandler);
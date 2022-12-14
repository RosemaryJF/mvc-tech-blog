// Function to log the user out
// when the logout button is clicked
const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);
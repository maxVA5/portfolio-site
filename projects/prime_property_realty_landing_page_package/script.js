const WEB_APP_URL =
'https://script.google.com/macros/s/AKfycbzIVfqsaztnET29iKNBAmMEkIrp7Q9SScLG34DXOHH_4fnwTLZFistb7gfVGKEJpPMw/exec';

const form = document.getElementById('downloadForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const countryCode = document.getElementById('countryCode').value;

  if (!name || !email || !phone || !countryCode) {
    return;
  }

  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('countryCode', countryCode);
  formData.append('phone', phone);

  try {

    await fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    successMessage.classList.add('show');

    successMessage.innerHTML = `
      <strong>Success!</strong><br>
      Your checklist has been sent to your email.
      <br>
      <small>Please check your inbox.</small>
    `;

    form.reset();

    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);

  } catch (error) {

    console.error(error);

    successMessage.classList.add('show');

    successMessage.innerHTML = `
      <strong>Oops!</strong><br>
      Something went wrong. Please try again.
    `;
  }
});
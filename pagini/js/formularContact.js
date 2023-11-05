window.onload = function() {
  const menu = document.querySelector('header');
  const colors = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'];
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomColorIndex];

  menu.style.backgroundColor = randomColor;

  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submitButton');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();//il folosim pentru a nu mai reincarca pagina

    if (validateForm()) {
      contactForm.reset();
    }
  });

  submitButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm()) {
      contactForm.reset();
    }
  });

  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (validateForm()) {
        contactForm.reset();
      }
    }
  });

  function validateForm() {
    if (!validateName() || !validateEmail()) {
      return false;
    }

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    
    sendData(formData);

    return true;
  }

  function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue === '') {
      showError(nameInput, 'Numele este obligatoriu');
      return false;
    }

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(nameValue)) {
      showError(nameInput, 'Numele poate conține doar litere și spații');
      return false;
    }

    hideError(nameInput);
    return true;
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();

    if (emailValue === '') {
      showError(emailInput, 'Adresa de email este obligatorie');
      return false;
    }

    const emailRegex = /^[^\s]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      showError(emailInput, 'Adresa de email nu este validă');
      return false;
    }

    hideError(emailInput);
    return true;
  }

  function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = message;

    const parentElement = input.parentElement;
    parentElement.appendChild(errorElement);
  }

  function hideError(input) {
    const parentElement = input.parentElement;
    const errorElement = parentElement.querySelector('.error');

    if (errorElement) {
      parentElement.removeChild(errorElement);
    }
  }

  function sendData(formData) {
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Formular completat cu succes');
          displayConfirmation();
        } else {
          console.log('Problema la submit');
        }
      })
      .catch(error => {
        console.log('A aparut o eroare in timpul raspunsului la form:', error);
      });
  }
  

};

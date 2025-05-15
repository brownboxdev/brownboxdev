window.addEventListener('DOMContentLoaded', event => {

  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }

  };

  navbarShrink();

  document.addEventListener('scroll', navbarShrink);

  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  };

  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  const emailInput = document.getElementById('email');
  const requiredMsg = document.getElementById('emailRequired');
  const invalidMsg = document.getElementById('emailInvalid');
  const submitButton = document.getElementById('submitButton');

  function validateEmail() {
    const value = emailInput.value.trim();

    if (value === '') {
      requiredMsg.style.display = 'inline';
      invalidMsg.style.display = 'none';
      submitButton.disabled = true;
    } else if (!emailInput.validity.valid) {
      requiredMsg.style.display = 'none';
      invalidMsg.style.display = 'inline';
      submitButton.disabled = true;
    } else {
      requiredMsg.style.display = 'none';
      invalidMsg.style.display = 'none';
      submitButton.disabled = false;
    }
  }

  emailInput.addEventListener('input', validateEmail);

});

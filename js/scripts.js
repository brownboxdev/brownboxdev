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

  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('submitSuccessMessage');
  const errorMessage = document.getElementById('submitErrorMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xrbqrnqn', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      });

      if (res.ok) {
        successMessage.classList.remove('d-none');
        successMessage.classList.add('d-block');
      } else {
        errorMessage.classList.remove('d-none');
        errorMessage.classList.add('d-block');
      }
    } catch {
      errorMessage.classList.remove('d-none');
      errorMessage.classList.add('d-block');
    }
  });

  async function fetchGitHubStats() {
    const statsElement = document.getElementById('rabarber-stats');

    try {
      const githubResponse = await fetch('https://api.github.com/repos/brownboxdev/rabarber');

      const gemResponse = await fetch('https://rubygems.org/api/v1/gems/rabarber.json');

      let statsText = '';

      if (githubResponse.ok) {
        const githubData = await githubResponse.json();
        if (githubData.stargazers_count) {
          statsText += `⭐ ${githubData.stargazers_count}`;
        }
      }

      if (gemResponse.ok) {
        const gemData = await gemResponse.json();
        if (gemData.version) {
          if (statsText) statsText += ' • ';
          statsText += `v${gemData.version}`;
        }
      }

      if (statsElement && statsText) {
        statsElement.textContent = statsText;
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  fetchGitHubStats();

});

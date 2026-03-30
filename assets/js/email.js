(function(){
    emailjs.init("HMprP7DBXikeOhw-m");
})();

var onloadCallback = function() {
    alert("grecaptcha is ready!");
  };

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
feedback.style.textAlign = 'left';

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('demo-name').value.trim();
    const email = document.getElementById('demo-email').value.trim();
    const message = document.getElementById('demo-message').value.trim();

    const captchaResponse = grecaptcha.getResponse();

    if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all required fields.';
        feedback.style.color = 'red';
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.style.color = 'red';
        return;
    }

    if (captchaResponse.length === 0) {
        feedback.textContent = 'Please complete the reCAPTCHA.';
        feedback.style.color = 'red';
        return;
    }

    const templateParams = {
        name: name,
        email: email,
        message: message,
        'g-recaptcha-response': captchaResponse
        
    };

    emailjs.send("service_c90s2em", "template_ttrszdc", templateParams)
    .then(function(response) {
        feedback.textContent = 'Your message has been sent successfully!';
        feedback.style.color = 'green';
        form.reset();
        grecaptcha.reset();
        setTimeout(function() {
            feedback.textContent = '';
        }, 5000); // clear feedback after 5 seconds
    }, function(error) {
        feedback.textContent = 'Oops! Something went wrong. Please try again.';
        feedback.style.color = 'red';
        console.error('EmailJS error:', error);
    });
});
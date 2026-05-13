document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Update icon based on state
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Handle Instagram "Coming Soon"
    const instaLink = document.getElementById('instagram-link');
    if (instaLink) {
        instaLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📸 Instagram Page is coming soon! Stay tuned for behind-the-scenes and more updates.');
        });
    }

    // Handle Anonymous Feedback Form Submission
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        const submitBtn = feedbackForm.querySelector('.btn-submit');

        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalBtnText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            const formData = new FormData(feedbackForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                const result = await response.json();
                if (result.success) {
                    alert('✨ Thank you for your feedback! We have received it and will use it to make Like Home even better.');
                    feedbackForm.reset();
                } else {
                    console.log(result);
                    alert('Oops! Something went wrong. Please check if your Access Key is correct.');
                }
            } catch (error) {
                console.error('Error!', error.message);
                alert('Oops! Something went wrong while sending your feedback. Please try again later.');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});

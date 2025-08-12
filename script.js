document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Form Submission Logic will go here ---
    // We will add this in the Azure section below

});
// ... inside the DOMContentLoaded listener

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const statusEl = document.getElementById('form-status');
        statusEl.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/SendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                statusEl.textContent = 'Thank you! Your message has been sent.';
                statusEl.style.color = 'green';
                contactForm.reset();
            } else {
                throw new Error('Server responded with an error.');
            }
        } catch (error) {
            statusEl.textContent = 'Sorry, there was an error sending your message. Please try again.';
            statusEl.style.color = 'red';
        }
    });
}

// You can create a similar block for the applyForm,
// pointing to a new API function like /api/SubmitApplication

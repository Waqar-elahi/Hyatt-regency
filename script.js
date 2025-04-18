  // Add scroll effect to navbar
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

   // live Chat Message 
  document.addEventListener('DOMContentLoaded', function() {
    // Toggle contact panel
    const chatToggle = document.getElementById('chatToggle');
    const contactPanel = document.getElementById('contactPanel');
    const closePanel = document.getElementById('closePanel');
    
    chatToggle.addEventListener('click', function() {
      contactPanel.style.display = contactPanel.style.display === 'block' ? 'none' : 'block';
    });
    
    closePanel.addEventListener('click', function() {
      contactPanel.style.display = 'none';
    });
    
    // Tab switching
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.addEventListener('click', function() {
        // Remove active class from all options
        options.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        this.classList.add('active');
        
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        
        // Show corresponding tab pane
        const tabId = this.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Chat functionality
    const userMessage = document.getElementById('userMessage');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    function sendUserMessage() {
      const message = userMessage.value.trim();
      if (message) {
        // Add user message to chat
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
          <p>${message}</p>
          <span class="time">${getCurrentTime()}</span>
        `;
        chatMessages.appendChild(messageDiv);
        
        // Clear input
        userMessage.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response after delay
        setTimeout(sendBotResponse, 1000);
      }
    }
    
    function sendBotResponse() {
      const responses = [
        "I understand your concern. Let me check that for you.",
        "Thanks for your message! Our team will get back to you shortly.",
        "That's a great question! Here's what I can tell you...",
        "We appreciate your feedback. Is there anything else we can help with?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message bot';
      messageDiv.innerHTML = `
        <p>${randomResponse}</p>
        <span class="time">${getCurrentTime()}</span>
      `;
      chatMessages.appendChild(messageDiv);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    sendMessage.addEventListener('click', sendUserMessage);
    
    userMessage.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendUserMessage();
      }
    });
    
    // Form submissions (simulated)
    document.querySelector('.email-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your email! We will respond within 24 hours.');
      this.reset();
      contactPanel.style.display = 'none';
    });
    
    document.querySelector('.call-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Call back requested! We will call you at your preferred time.');
      this.reset();
      contactPanel.style.display = 'none';
    });
  });


  // Booking MODAL 
  document.addEventListener('DOMContentLoaded', function() {
    // Get all Book Now buttons
    const packageButtons = document.querySelectorAll('.package-book-btn');
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const packageSummary = document.getElementById('package-summary');
    
    // Package details
    const packages = {
      honeymoon: {
        name: "Honeymoon Package",
        description: "Romantic getaway with champagne, spa access, and private dinner",
        rate: "$500/night"
      },
      family: {
        name: "Family Vacation Package",
        description: "Includes connecting rooms, free breakfast, and kids' activities",
        rate: "$600/night"
      },
      spa: {
        name: "Spa Weekend Package",
        description: "Includes massages, facials, and wellness meals",
        rate: "$450/night"
      }
    };
    
    // Add click event to all Book Now buttons
    packageButtons.forEach(button => {
      button.addEventListener('click', function() {
        const packageCard = this.closest('.package-card');
        const packageType = packageCard.getAttribute('data-package');
        const package = packages[packageType];
        
        // Update modal with package info
        packageSummary.innerHTML = `
          <h4>${package.name}</h4>
          <p>${package.description}</p>
          <p><strong>Rate:</strong> ${package.rate}</p>
        `;
        
        // Set the package in the main form
        document.getElementById('special-package').value = packageType;
        
        // Show modal
        modal.style.display = 'block';
      });
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Form submission
    document.getElementById('modalBookingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = {
        package: document.getElementById('special-package').value,
        checkIn: document.getElementById('modal-check-in').value,
        checkOut: document.getElementById('modal-check-out').value,
        guests: document.getElementById('modal-guests').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        requests: document.getElementById('special-requests').value
      };
      
      // Here you would typically send this data to your server
      console.log('Booking submitted:', formData);
      
      // Show success message
      alert('Thank you for your booking! A confirmation has been sent to your email.');
      
      // Close modal and reset form
      modal.style.display = 'none';
      this.reset();
    });
    
    // Auto-fill dates from main form to modal
    document.getElementById('mainBookingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get values from main form
      const checkIn = document.getElementById('check-in').value;
      const checkOut = document.getElementById('check-out').value;
      const guests = document.getElementById('guests').value;
      const roomType = document.getElementById('room-type').value;
      const package = document.getElementById('special-package').value;
      
      // If a package is selected, show package info
      if (package) {
        const packageInfo = packages[package];
        packageSummary.innerHTML = `
          <h4>${packageInfo.name}</h4>
          <p>${packageInfo.description}</p>
          <p><strong>Rate:</strong> ${packageInfo.rate}</p>
          <p><strong>Room Type:</strong> ${document.getElementById('room-type').options[document.getElementById('room-type').selectedIndex].text}</p>
        `;
      } else {
        packageSummary.innerHTML = `
          <h4>Custom Booking</h4>
          <p><strong>Room Type:</strong> ${document.getElementById('room-type').options[document.getElementById('room-type').selectedIndex].text}</p>
        `;
      }
      
      // Set values in modal form
      document.getElementById('modal-check-in').value = checkIn;
      document.getElementById('modal-check-out').value = checkOut;
      document.getElementById('modal-guests').value = guests;
      
      // Show modal
      modal.style.display = 'block';
    });
    
    // Set minimum date for check-in (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').min = today;
    document.getElementById('modal-check-in').min = today;
    
    // Update check-out min date when check-in changes
    document.getElementById('check-in').addEventListener('change', function() {
      document.getElementById('check-out').min = this.value;
      document.getElementById('modal-check-in').value = this.value;
      document.getElementById('modal-check-out').min = this.value;
    });
    
    document.getElementById('modal-check-in').addEventListener('change', function() {
      document.getElementById('modal-check-out').min = this.value;
    });
  });


// Show loader when page is loading
document.addEventListener('DOMContentLoaded', function() {
  // Hide loader when page is fully loaded
  window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    
    // Optional: Remove loader from DOM after fade out
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500); // Match this with the CSS transition time
  });
});






  
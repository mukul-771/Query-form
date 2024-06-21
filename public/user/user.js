const subDomains = {
    "Electrical": ["Wiring", "Lighting", "Power Supply", "Circuit Breakers", "Generators"],
    "Furniture": ["Chairs", "Tables", "Desks", "Cabinets", "Beds"],
    "Civil": ["Construction", "Roads", "Bridges", "Tunnels", "Buildings"],
    "Sanitary": ["Plumbing", "Sewage", "Water Supply", "Drainage", "Sanitary Fittings"]
};

function getSubDomains(type) {
    const subDomainSelect = document.getElementById('subDomain');
    subDomainSelect.innerHTML = '<option value="" disabled selected>Select a sub domain</option>';
    if (type in subDomains) {
        subDomains[type].forEach(function (subDomain) {
            const option = document.createElement('option');
            option.value = subDomain;
            option.textContent = subDomain;
            subDomainSelect.appendChild(option);
        });
    }
}

document.getElementById('maintenanceForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Client-side validation can be added here if needed

    try {
        const response = await fetch('http://localhost:5001/api/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast('Form submitted successfully');
            document.querySelector('.btnText').textContent = 'Submitted';
            event.target.reset(); // Clear form after submission
        } else {
            const errorData = await response.json();
            showToast(`Error: ${errorData.message || 'Error submitting form'}`);
        }
    } catch (error) {
        showToast(`Error: ${error.message || 'Error submitting form'}`);
    }
});



function redirectToAdminLogin() {
    window.location.href = '../user/adminlogin/adminlogin.html'; 
}




function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
        document.body.removeChild(toast);
    }, 3000);
}

document.getElementById("particles-js").addEventListener("DOMContentLoaded", function() {
    particlesJS.load("particles-js", "particles.json", function() {
      console.log("callback - particles.js config loaded");
    });
  });


  
async function fetchData() {
    const response = await fetch('http://localhost:5000/api/forms');
    const forms = await response.json();
    const tableBody = document.getElementById('formTableBody');

    forms.forEach((form, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${new Date(form.date).toLocaleString()}</td>
            <td>${form.e-mail}</td>
            <td>${form.department}</td>
            <td>${form.queryType}</td>
            <td>${form.subDomain}</td>
            <td>${form.description}</td>
            <td>${form.status}</td>
            <td>
                <button class="btn ${form.status === 'open' ? 'resolve' : 'reopen'}" onclick="updateStatus('${form._id}', '${form.status === 'open' ? 'resolved' : 'open'}')">
                    ${form.status === 'open' ? 'Resolve' : 'Reopen'}
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function updateStatus(id, status) {
    await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });

    // Refresh the data
    document.getElementById('formTableBody').innerHTML = '';
    fetchData();
}

// Fetch data initially
fetchData();
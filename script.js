// Function to fetch data from the API
function fetchDeviceData() {
    const apiUrl = 'https://webportal.securamtc.in/devices/';

    // Create a Basic Auth header
    const headers = new Headers();
    const username = 'secura';
    const password = 'lookman!234';
    const credentials = btoa(`${username}:${password}`);
    headers.append('Authorization', `Basic ${credentials}`);
    headers.append('Content-Type', 'application/json');

    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Parse JSON data from response
    })
    .then(data => {
        console.log('Data fetched:', data);  // Log data for debugging
        displayDataInTable(data);  // Pass data to the function to display
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

// Function to display data in the HTML table
function displayDataInTable(data) {
    const tableBody = document.querySelector('#deviceTable tbody');
    tableBody.innerHTML = '';  // Clear existing table data

    if (Array.isArray(data)) {
        data.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id || 'N/A';
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name || 'N/A';
            row.appendChild(nameCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = item.type || 'N/A';
            row.appendChild(typeCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = item.status || 'N/A';
            row.appendChild(statusCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = new Date(item.date).toLocaleDateString() || 'N/A';
            row.appendChild(dateCell);

            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
    }
}

// Call the fetch function when the page loads
window.onload = fetchDeviceData;

// Fetch API data
fetch('https://webportal.securamtc.in/devices/', {
    headers: {
        'Authorization': 'Basic ' + btoa('secura:lookman!234') // Basic Auth header
    }
})
.then(response => response.json())
.then(data => {
    // Log the API response for debugging (optional)
    console.log('API Response:', data);

    // Access the array inside the 'data' key
    if (Array.isArray(data.data)) {
        const devices = data.data;  // Access the array stored in 'data.data'
        let rows = "";

        // Loop through each device and generate table rows
        devices.forEach(device => {
            rows += `
                <tr>
                    <td>${device.id}</td>
                    <td>${device.updatedAt}</td>
                    <td>${device.fleetNumber}</td>
                    <td>${device.serialNo}</td>
                    <td>${device.mnvrIp}</td>
                    <td>${device.cameraIp1}</td>
                    <td>${device.cameraIp2}</td>
                    <td>${device.cameraIp3}</td>
                    <td>${device.longitude}</td>
                    <td>${device.latitude}</td>
                    <td>${device.camera1Status}</td>
                    <td>${device.camera2Status}</td>
                    <td>${device.camera3Status}</td>
                    <td>${device.cpuCoreUsage}</td>
                    <td>${device.uptime}</td>
                    <td>${device.downloadSpeed}</td>
                    <td>${device.uploadSpeed}</td>
                    <td>${device.ramUsage}</td>
                </tr>
            `;
        });

        // Insert the rows into the table body
        document.querySelector('#deviceTable tbody').innerHTML = rows;
    } else {
        console.error('Data is not an array or is missing the expected key.');
    }
})
.catch(error => console.error('Error fetching data:', error));

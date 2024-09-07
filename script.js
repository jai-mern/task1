// Fetch API data
fetch('https://webportal.securamtc.in/devices/', {
    headers: {
        'Authorization': 'Basic ' + btoa('secura:lookman!234') // Basic Auth header
    }
})
.then(response => response.json())
.then(data => {
    // Assuming the array is located at `data.data`
    if (Array.isArray(data.data)) {
        const devices = data.data;  // Access the array of devices
        let rows = "";

        // Loop through each device and generate table rows
        devices.forEach(device => {
            rows += `
                <tr>
                    <td>${device.id}</td>
                    <td>${new Date(device.updated_at).toLocaleString()}</td> <!-- Format the date correctly -->
                    <td>${device.Fleet_Number || 'N/A'}</td>  <!-- Fleet number -->
                    <td>${device.serialNo}</td>
                    <td>${device.MNVR_IP}</td>
                    <td>${device.CameraIP1}</td>
                    <td>${device.CameraIP2}</td>
                    <td>${device.CameraIP3}</td>
                    <td>${device.longitude}</td>
                    <td>${device.latitude}</td>
                    <td>${device.cam_1_status}</td>
                    <td>${device.cam_2_status}</td>
                    <td>${device.cam_3_status}</td>
                    <td>${device.cpu_core_usage}</td>
                    <td>${device.uptime || 'N/A'}</td>
                    <td>${device.download_speed}</td>
                    <td>${device.upload_speed || 'N/A'}</td>
                    <td>${device.ram_usage}</td>
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

document.addEventListener('DOMContentLoaded', function() {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const clientListContainer = document.getElementById('client-list');

    // Fetch client data from Firestore
    db.collection("reservations").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const clientData = doc.data();
            const clientElement = document.createElement('div');
            clientElement.classList.add('client-entry', 'border-bottom', 'mb-3', 'pb-3');

            clientElement.innerHTML = `
                <h4>${clientData.name}</h4>
                <p><strong>Teléfono:</strong> ${clientData.phone}</p>
                <p><strong>Fecha:</strong> ${clientData.date}</p>
                <p><strong>Hora:</strong> ${clientData.time}</p>
            `;

            clientListContainer.appendChild(clientElement);
        });
    }).catch((error) => {
        console.error("Error fetching client data: ", error);
    });
});

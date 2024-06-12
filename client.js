document.addEventListener('DOMContentLoaded', function() {
    // Firebase configuration
    const firebaseConfig = {
  apiKey: "AIzaSyAJvIbzNr_YWA5HArA1PgDfuTRiuySj1yw",
  authDomain: "sdrc-654ac.firebaseapp.com",
  projectId: "sdrc-654ac",
  storageBucket: "sdrc-654ac.appspot.com",
  messagingSenderId: "816986947863",
  appId: "1:816986947863:web:b5dbd70250de382ef7f752",
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

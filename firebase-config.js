// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyAJvIbzNr_YWA5HArA1PgDfuTRiuySj1yw",
  authDomain: "sdrc-654ac.firebaseapp.com",
  projectId: "sdrc-654ac",
  storageBucket: "sdrc-654ac.appspot.com",
  messagingSenderId: "816986947863",
  appId: "1:816986947863:web:b5dbd70250de382ef7f752",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para cerrar sesión
function cerrarSesion() {
    firebase.auth().signOut().then(() => {
        // Cierre de sesión exitoso
        console.log("Sesión cerrada correctamente");
        // Redirigir al usuario a la página de inicio de sesión o a otra página deseada
        window.location.href = "index.html";
    }).catch((error) => {
        // Manejar errores
        console.error("Error al cerrar sesión:", error);
    });
}

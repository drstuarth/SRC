// reservation.js

document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservation-form');

    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Envía el correo electrónico de confirmación
        sendConfirmationEmail(name, phone, date, time);

        // Aquí puedes agregar la lógica para guardar la reserva en tu base de datos
        // Puedes usar Firebase, por ejemplo, para guardar los detalles de la reserva

        alert('¡Su cita ha sido reservada! Se ha enviado un correo electrónico de confirmación.');

        // Limpia el formulario después de enviar la reserva
        reservationForm.reset();
    });
});

function sendConfirmationEmail(name, phone, date, time) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "dr.stuarthgonz@gmail.com",
        Password: "titulacione7",
        To: "cesarvargaas@hotmail.com",
        From: "dr.stuarthgonz@gmail.comm",
        Subject: "Confirmación de Cita",
        Body: `Hola ${name},\n\nSu cita ha sido reservada para el ${date} a las ${time}.\n\nAtentamente,\nDr. Stuarth Gonzalez  \n la factura corresponde a la cantidad de $1,000 MXNM`
    }).then(
        message => console.log(message)
    );
}

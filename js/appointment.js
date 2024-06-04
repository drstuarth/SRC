// Escuchar el evento de envío del formulario
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    var formData = new FormData(event.target);
    var date = formData.get('date');
    var time = formData.get('time');

    // Verificar si la hora seleccionada está disponible en la base de datos
    var appointmentsRef = database.ref('appointments/' + date + '/' + time);
    appointmentsRef.once('value', function(snapshot) {
        var appointment = snapshot.val();
        if (appointment === null) {
            // La hora está disponible, guardar la cita en la base de datos
            appointmentsRef.set({
                patientName: formData.get('patientName'),
                phoneNumber: formData.get('phoneNumber'),
                email: formData.get('email'),
                symptoms: formData.get('symptoms'),
                area: formData.get('area'),
                gender: formData.get('gender')
            }).then(function() {
                alert("Tu cita ha sido agendada, revisa tu correo electrónico.");
            }).catch(function(error) {
                console.error("Error al guardar la cita: ", error);
            });
        } else {
            // La hora no está disponible
            alert("Lo siento, la hora seleccionada ya está ocupada. Por favor, elige otra hora.");
        }
    });
});

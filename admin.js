document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            db.collection('reservations')
                .where('date', '>=', fetchInfo.startStr)
                .where('date', '<=', fetchInfo.endStr)
                .get()
                .then(snapshot => {
                    const events = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: `${data.name} (${data.phone})`,
                            start: `${data.date}T${data.time}`,
                            end: `${data.date}T${data.time}`,
                        };
                    });
                    successCallback(events);
                })
                .catch(error => {
                    console.error('Error fetching reservations: ', error);
                    failureCallback(error);
                });
        },
        eventClick: function(info) {
            const reservationId = info.event.id;
            const reservationData = info.event.extendedProps;

            const deleteOption = confirm(`¿Desea eliminar la cita de ${info.event.title}?`);
            if (deleteOption) {
                db.collection('reservations').doc(reservationId).delete().then(() => {
                    alert('Cita eliminada.');
                    info.event.remove();
                }).catch(error => {
                    console.error('Error removing document: ', error);
                    alert('No se pudo eliminar la cita.');
                });
            } else {
                const editOption = confirm('¿Desea editar la cita?');
                if (editOption) {
                    openEditModal(reservationId, reservationData);
                }
            }
        }
    });

    calendar.render();
});

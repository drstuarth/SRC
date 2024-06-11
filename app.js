// app.js

const reservationForm = document.getElementById('reservation-form');
const scheduleList = document.getElementById('schedule-list');
const editReservationForm = document.getElementById('edit-reservation-form');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
let currentEditId = null;

reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const date = event.target.date.value;
    const time = event.target.time.value;

    db.collection('reservations')
      .where('date', '==', date)
      .where('time', '==', time)
      .get()
      .then(snapshot => {
          if (!snapshot.empty) {
              alert('Este horario ya está reservado. Por favor, elija otro.');
          } else {
              db.collection('reservations').add({
                  name,
                  phone,
                  date,
                  time
              }).then(() => {
                  alert('Reserva realizada con éxito.');
                  reservationForm.reset();
                  loadSchedule(date);
              }).catch(error => {
                  console.error('Error al realizar la reserva: ', error);
              });
          }
      });
});

function loadSchedule(date) {
    scheduleList.innerHTML = '';
    
    db.collection('reservations')
      .where('date', '==', date)
      .orderBy('time')
      .get()
      .then(snapshot => {
          if (snapshot.empty) {
              scheduleList.innerHTML = '<p>No hay reservas para esta fecha.</p>';
          } else {
              snapshot.forEach(doc => {
                  const reservation = doc.data();
                  const reservationItem = document.createElement('div');
                  reservationItem.innerText = `${reservation.time} - ${reservation.name} (${reservation.phone})`;
                  const editButton = document.createElement('button');
                  editButton.innerText = 'Editar';
                  editButton.classList.add('btn', 'btn-secondary', 'ml-2');
                  editButton.onclick = () => openEditModal(doc.id, reservation);
                  const deleteButton = document.createElement('button');
                  deleteButton.innerText = 'Eliminar';
                  deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
                  deleteButton.onclick = () => deleteReservation(doc.id);
                  reservationItem.appendChild(editButton);
                  reservationItem.appendChild(deleteButton);
                  scheduleList.appendChild(reservationItem);
              });
          }
      });
}

function deleteReservation(id) {
    if (confirm('¿Está seguro de que desea eliminar esta reserva?')) {
        db.collection('reservations').doc(id).delete().then(() => {
            alert('Reserva eliminada.');
            loadSchedule(document.getElementById('date').value);
        }).catch(error => {
            console.error('Error al eliminar la reserva: ', error);
        });
    }
}

function openEditModal(id, reservation) {
    currentEditId = id;
    document.getElementById('edit-name').value = reservation.name;
    document.getElementById('edit-phone').value = reservation.phone;
    document.getElementById('edit-date').value = reservation.date;
    document.getElementById('edit-time').value = reservation.time;
    editModal.show();
}

editReservationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('edit-name').value;
    const phone = document.getElementById('edit-phone').value;
    const date = document.getElementById('edit-date').value;
    const time = document.getElementById('edit-time').value;

    db.collection('reservations').doc(currentEditId).update({
        name,
        phone,
        date,
        time
    }).then(() => {
        alert('Reserva actualizada con éxito.');
        editModal.hide();
        loadSchedule(date);
    }).catch(error => {
        console.error('Error al actualizar la reserva: ', error);
    });
});

document.getElementById('date').addEventListener('change', function(event) {
    const date = event.target.value;
    loadSchedule(date);
});

// app.js
document.addEventListener('DOMContentLoaded', () => {
const addItemButton = document.getElementById('add-item');
    const newItemInput = document.getElementById('new-item');
    const purchaseDateInput = document.getElementById('purchase-date');
    const listItems = document.getElementById('list-items');
    const serviceWorkerMessage = document.getElementById('service-worker-message');
    const manifestStatus = document.getElementById('manifest-status');

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                serviceWorkerMessage.textContent = 'Service Worker ejecutandose con éxito.';
                console.log('Service Worker ejecutandose con éxito:', registration);

                // Imprimir el contenido del manifiesto
                fetch('manifest.json')
                    .then(response => response.json())
                    .then(manifest => {
                        console.log('Contenido del manifiesto:', manifest);
                        // Muestra un mensaje en el HTML
                        manifestStatus.textContent = 'PWA listo y el manifiesto cargados con éxito.';
                    });
            })
            .catch((error) => {
                serviceWorkerMessage.textContent = 'Error al registrar el Service Worker.';
                console.error('Error al registrar el Service Worker:', error);
                // Muestra un mensaje de error en el HTML
                manifestStatus.textContent = 'Hubo un error al cargar la PWA o el manifiesto.';
            });
    }

    addItemButton.addEventListener('click', () => {
        const newItemText = newItemInput.value;
        const purchaseDate = purchaseDateInput.value;

        if (newItemText.trim() !== '') {
            if (purchaseDate === '') {
                alert('Por favor, selecciona una fecha antes de agregar el elemento.');
            } else {
                const newRow = listItems.insertRow(-1); // Inserta una nueva fila en la tabla
                const cell1 = newRow.insertCell(0); // Celda para el elemento
                const cell2 = newRow.insertCell(1); // Celda para la fecha
                const cell3 = newRow.insertCell(2); // Celda para el botón "Eliminar"

                cell1.textContent = newItemText;
                cell2.textContent = purchaseDate;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.className = 'delete';
                deleteButton.addEventListener('click', () => {
                    if (confirm('¿Estás seguro de que deseas eliminar este elemento de la lista?')) {
                        newRow.remove(); // Elimina la fila directamente del DOM
                    }
                });

                cell3.appendChild(deleteButton);

                newItemInput.value = '';
                purchaseDateInput.value = '';
            }
        }
    });
});

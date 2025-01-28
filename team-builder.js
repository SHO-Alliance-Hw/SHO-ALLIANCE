// Variables for drag-and-drop
const players = document.querySelectorAll('#player-pool li');
const slots = document.querySelectorAll('#team-area li.empty-slot');

// Add dragstart and dragend events to players
players.forEach(player => {
    player.addEventListener('dragstart', () => {
        player.classList.add('dragging');
    });

    player.addEventListener('dragend', () => {
        player.classList.remove('dragging');
    });
});

// Add dragover and drop events to slots (where players will be dropped)
slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow the drop
        slot.classList.add('over'); // Optionally highlight the slot when over
    });

    slot.addEventListener('dragleave', () => {
        slot.classList.remove('over'); // Remove highlight when drag leaves
    });

    slot.addEventListener('drop', () => {
        const draggingPlayer = document.querySelector('.dragging');
        
        if (!slot.hasChildNodes() && draggingPlayer) {
            // If the slot is empty, add the dragged player here
            slot.textContent = draggingPlayer.textContent;
            slot.classList.remove('empty-slot'); // Remove the 'empty-slot' class
            draggingPlayer.remove(); // Remove the player from the pool
        }
        slot.classList.remove('over'); // Remove the highlight
    });
});

// Save team button functionality
document.getElementById('save-team').addEventListener('click', () => {
    const team = [];
    document.querySelectorAll('#team-area li:not(.empty-slot)').forEach(slot => {
        team.push(slot.textContent);
    });

    if (team.length === 0) {
        alert('No players selected for the team.');
    } else {
        alert(`Your team has been saved: ${team.join(', ')}`);
    }
});

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

// Add dragover and drop events to slots
slots.forEach(slot => {
    slot.addEventListener('dragover', e => {
        e.preventDefault(); // Allows dropping
    });

    slot.addEventListener('drop', e => {
        const draggingPlayer = document.querySelector('.dragging');
        if (!slot.hasChildNodes()) {
            slot.textContent = draggingPlayer.textContent;
            slot.classList.remove('empty-slot');
            draggingPlayer.remove(); // Remove from pool
        }
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

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".custom-card");
  
    // Example: Updating content dynamically
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        alert(`You clicked on Card ${index + 1}`);
      });
    });
  });
  
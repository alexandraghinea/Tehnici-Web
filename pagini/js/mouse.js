
let inactiveTime = 0;

function checkInactiveTime() {
  inactiveTime++;

  // Dacă timpul inactiv a depășit 10 secunde
  if (inactiveTime >= 10) {
    alert('Ai fost inactiv pentru mai mult de 10 secunde!');
    
  }
}

// resetm timpul inactiv atunci când mouse-ul este mișcat
function resetInactiveTime() {
  inactiveTime = 0;
}

// // Adăugăm evenimentul de mișcare a mouse-ului
document.addEventListener('mousemove', resetInactiveTime);

setInterval(checkInactiveTime, 1000);



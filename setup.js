document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', () => {
      window.location.href = 'tracking.html';
    });
  
    document.getElementById('stopButton').addEventListener('click', () => {
      alert('Tracking Stopped!');
    });
  });
  
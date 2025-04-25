let isTracking = false;

function startEyeTracking() {
  isTracking = true;

  webgazer.setRegression('ridge')
    .setGazeListener((data, elapsedTime) => {
      if (data == null || !isTracking) return;

      const x = data.x;
      const y = data.y;

      const dot = document.getElementById('dot');
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.display = 'block';

      document.getElementById('gazeCoordinates').innerText =
        `Gaze Coordinates: (${Math.round(x)}, ${Math.round(y)})`;
    })
    .begin()
    .showVideoPreview(false)
    .showPredictionPoints(false)
    .showFaceOverlay(false)
    .showFaceFeedbackBox(false);

  webgazer.params.showGazeDot = false;
}

function stopEyeTracking() {
  isTracking = false;
  webgazer.pause();
  webgazer.clearGazeListener();
  webgazer.stopVideo();
  webgazer.end();

  const dot = document.getElementById('dot');
  if (dot) {
    dot.style.display = 'none';
  }

  document.getElementById('gazeCoordinates').innerText = `Tracking stopped.`;
}

document.addEventListener('DOMContentLoaded', () => {
  startEyeTracking();

  const stopBtn = document.getElementById('stopButton');
  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      stopEyeTracking();
    });
  }
});

let mediaRecorder;
let recordedChunks = [];
let stream;

const startBtn = document.getElementById('startRecording');
const stopBtn = document.getElementById('stopRecording');
const openBtn = document.getElementById('openRecording');

startBtn.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: 'always' },
      audio: false
    });

    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      openBtn.dataset.url = url;
      openBtn.disabled = false;
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    console.error('Error accessing display media.', err);
  }
});

stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

openBtn.addEventListener('click', () => {
  const url = openBtn.dataset.url;
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('No recording available to open.');
  }
});

const textInput = document.getElementById('textInput');
const generateBtn = document.getElementById('generateBtn');
const qrCode = document.getElementById('qrCode');
const downloadBtn = document.getElementById('downloadBtn');
const backBtn = document.getElementById('backBtn');
const inputSection = document.getElementById('inputSection');

generateBtn.addEventListener('click', () => {
  const value = textInput.value.trim();
  if (!value) {
    alert('Please enter some text or URL!');
    return;
  }

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(value)}`;
  qrCode.innerHTML = `<img id="qrImage" src="${qrURL}" alt="QR Code" />`;

  // Hide input and show results
  inputSection.style.display = 'none';
  downloadBtn.style.display = 'block';
  backBtn.style.display = 'block';
});

downloadBtn.addEventListener('click', () => {
  const qrImage = document.getElementById('qrImage');
  if (!qrImage) return;

  // Ensure image is loaded before downloading
  if (!qrImage.complete) {
    qrImage.onload = () => saveImage(qrImage.src);
  } else {
    saveImage(qrImage.src);
  }
});

function saveImage(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = 'qr-code.png'; // Filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

backBtn.addEventListener('click', () => {
  // Reset UI
  qrCode.innerHTML = '';
  textInput.value = '';
  inputSection.style.display = 'block';
  downloadBtn.style.display = 'none';
  backBtn.style.display = 'none';
});

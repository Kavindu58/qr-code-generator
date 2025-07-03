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

  inputSection.style.display = 'none';
  downloadBtn.style.display = 'block';
  backBtn.style.display = 'block';
});

downloadBtn.addEventListener('click', () => {
  const qrImage = document.getElementById('qrImage');
  if (!qrImage || !qrImage.src) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.crossOrigin = "anonymous"; // Allow drawing from API

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qr-code.png';
    link.click();
  };

  img.src = qrImage.src;
});

backBtn.addEventListener('click', () => {
  qrCode.innerHTML = '';
  textInput.value = '';
  inputSection.style.display = 'block';
  downloadBtn.style.display = 'none';
  backBtn.style.display = 'none';
});

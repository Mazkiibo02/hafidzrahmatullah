export const downloadCV = () => {
  const link = document.createElement('a');
  link.href = '/cv/Hafidz-Rahmatullah-CV.pdf';
  link.download = 'Hafidz-Rahmatullah-CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


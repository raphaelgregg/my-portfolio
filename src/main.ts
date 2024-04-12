import { createApp } from './app.ts';
import { downloadPDF } from './utils/downloadPDF.ts';


document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app');
  rootElement ? createApp(rootElement) : console.error('Element with id "app" not found.');

  const curriculumDownload = document.getElementById('btn-download');
  try {
    curriculumDownload!.addEventListener('click', function () {
      downloadPDF('.resume-wrapper', 'curriculo-raphaelgregg.pdf');
      });
  } catch (error) {
    console.error(error + ': Element with id "btn-download" not found.');
  }
});


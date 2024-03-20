import { createApp } from './app.ts';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app');
  rootElement ? createApp(rootElement) : console.error('Element with id "app" not found.');
});
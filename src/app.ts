import {router} from './routes.ts';
router();

export default function App() {
  
  return`
  <ul>
    <a href="/" data-link>home</a>
    <a href="/about" data-link>about</a>
    <a href="/resume" data-link>resume</a>
  </ul>
  `;
};
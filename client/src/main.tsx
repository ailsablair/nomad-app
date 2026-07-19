import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { SeraProvider } from "@/components/ui/sera-provider";
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default function App() {
  return (
    <SeraProvider defaultTheme="light" storageKey="nomad-theme">
      <YourAppContent />
    </SeraProvider>
  );
}

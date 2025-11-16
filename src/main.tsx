import { createRoot } from "react-dom/client";
import { useState, StrictMode } from "react";
import App from "./App.tsx";
import LoadingScreen from "./components/LoadingScreen.tsx";
import "./index.css";

const Root = () => {
  const [loading, setLoading] = useState(true);

  return (
    <StrictMode>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && <App />}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);

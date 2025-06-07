function App() {
  const siteName = import.meta.env.VITE_SITE_NAME;
  const environment = import.meta.env.VITE_ENVIRONMENT;

  // Example usage:
  document.title = siteName + " Dashboard";

  return (
    <div>
      <h1>{siteName}</h1>
      <span>{environment === "production" ? "🌎 Live" : "🧪 Dev"}</span>
    </div>
  );
}

export default App;

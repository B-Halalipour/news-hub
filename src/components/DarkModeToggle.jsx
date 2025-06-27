function DarkModeToggle() {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    // Optional: persist setting
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDark);
  };

  return (
    <button className="back-button" onClick={toggleDarkMode}>
      🌙 Toggle Dark Mode
    </button>
  );
}

export default DarkModeToggle;

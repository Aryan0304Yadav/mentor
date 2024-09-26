import React, { useState } from 'react';
import '../styles/Settings.css'; // Import the CSS file

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    textToSpeech: false,
  });

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    document.body.className = event.target.value; // Apply theme to body
  };

  const handleAccessibilityChange = (event) => {
    const { name, checked } = event.target;
    setAccessibility((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1 className="settings-header-title">Settings</h1>
      </div>
      <div className="settings-content">
        <form className="settings-form">
          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select id="theme" name="theme" value={theme} onChange={handleThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="form-group">
            <label>Accessibility Options</label>
            <div className="accessibility-options">
              <div className="form-group">
                <input
                  type="checkbox"
                  id="highContrast"
                  name="highContrast"
                  checked={accessibility.highContrast}
                  onChange={handleAccessibilityChange}
                />
                <label htmlFor="highContrast">High Contrast Mode</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="textToSpeech"
                  name="textToSpeech"
                  checked={accessibility.textToSpeech}
                  onChange={handleAccessibilityChange}
                />
                <label htmlFor="textToSpeech">Text-to-Speech</label>
              </div>
            </div>
          </div>

          <div className="settings-buttons">
            <button type="submit" className="btn btn-save">Save Changes</button>
            <button type="button" className="btn btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

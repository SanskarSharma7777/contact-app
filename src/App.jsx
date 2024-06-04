import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  function handleNewContact() {
    setShowContactForm(true);
    setSelectedContact(null);
  }

  function handleSaveContact(contact) {
    setContacts([...contacts, contact]);
    setShowContactForm(false);
  }

  function handleCancelContact() {
    setShowContactForm(false);
  }

  function handleContactClick(contact) {
    setSelectedContact(contact);
  }

  function handleBack() {
    setSelectedContact(null);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 transition-colors duration-500">
      <Header onNewContact={handleNewContact} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1 pt-20">
        <Sidebar contacts={contacts} onContactClick={handleContactClick} />
        <div className="flex-1 p-6">
          {!selectedContact && !showContactForm && <MainContent contacts={contacts} />}
          {showContactForm && <ContactForm onSave={handleSaveContact} onCancel={handleCancelContact} />}
          {selectedContact && <ContactDetails contact={selectedContact} onBack={handleBack} />}
        </div>
      </div>
    </div>
  );
}

export default App;

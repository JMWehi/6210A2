import React, { useState, useEffect } from 'react';
import { db } from './fbconfig'; // Import your Firebase configuration

function SearchFilterComponent() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [containmentFilter, setContainmentFilter] = useState('');

  useEffect(() => {
    // Function to fetch documents from Firestore based on search and filter criteria
    const fetchDocuments = async () => {
      let query = db.collection('ScpData');

      // Apply search filter
      if (searchTerm) {
        query = query.where('item', '>=', searchTerm);
      }

      // Apply class filter
      if (classFilter) {
        query = query.where('class', '==', classFilter);
      }

      // Apply containment filter
      if (containmentFilter) {
        query = query.where('containment', '==', containmentFilter);
      }

      // Execute the query and set the documents state
      const querySnapshot = await query.get();
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocuments(data);
    };

    fetchDocuments();
  }, [searchTerm, classFilter, containmentFilter]);

  return (
    <div>
      <h1>Search and Filter Documents</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Class filter */}
      <select
        value={classFilter}
        onChange={(e) => setClassFilter(e.target.value)}
      >
        <option value="">Filter by Class</option>
        <option value="Safe">Safe</option>
        <option value="Euclid">Euclid</option>
        <option value="Keter">Keter</option>
        {/* Add more class options as needed */}
      </select>

      {/* Containment filter */}
      <select
        value={containmentFilter}
        onChange={(e) => setContainmentFilter(e.target.value)}
      >
        <option value="">Filter by Containment</option>
        <option value="Standard">Standard</option>
        <option value="Special">Special</option>
        {/* Add more containment options as needed */}
      </select>

      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            {/* Render document details */}
            <p>Item: {document.item}</p>
            <p>Class: {document.class}</p>
            <p>Containment: {document.containment}</p>
            {/* Add more document attributes as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFilterComponent;

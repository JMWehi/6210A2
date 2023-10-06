import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc } from 'firebase/firestore';
import { db } from './fbconfig';

function ReadDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const dataCollection = collection(db, 'ScpData');
        const dataSnapshot = await getDocs(dataCollection);
        const documents = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocuments(documents);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };
    fetchDocuments();
  }, []);

  const deleteDocument = async (id) => {
    try {
      const docRef = collection(db, 'ScpData', id);
      await deleteDoc(docRef);
      setDocuments(prevDocuments => prevDocuments.filter(document => document.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div>
      <h1>SCP Documents</h1>
      <ul>
        {documents.map(document => (
          <li key={document.id}>
            <Link to={`/document/${document.id}`}>{document.Name}</Link>
            {' '}
            <Link to={`/edit/${document.id}`}>Edit</Link>
            {' '}
            <button onClick={() => deleteDocument(document.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadDocuments;

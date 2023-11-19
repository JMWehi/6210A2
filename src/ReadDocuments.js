import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, query, limit } from 'firebase/firestore';
import { db } from './fbconfig';

function ReadDocuments() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);

      const q = query(collection(db, 'ScpData'), limit(itemsPerPage));
      const dataSnapshot = await getDocs(q);
      const documents = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setDocuments(documents);
      setIsLoading(false);
    };

    fetchDocuments();
  }, [currentPage, itemsPerPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>SCP Documents</h1>
      <ul>
        {documents.map(document => (
          <li key={document.id}>
            <Link to={`/document/${document.id}`}>{document.name}</Link>
          </li>
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}

      {!isLoading && documents.length > 0 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default ReadDocuments;


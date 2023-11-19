import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './fbconfig';

function DisplayDocument() {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'ScpData', id);
        const docSnapShot = await getDoc(docRef);

        if (docSnapShot.exists()) {
          setDocumentData(docSnapShot.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {documentData ? (
        <>
          <h1>{documentData.name}</h1>
          <p></p>{documentData.imageURL && (
            <img src={documentData.imageURL} alt={documentData.name} className="border w-50 rounded shadow"/>
          )}
          <p>{documentData.Class}</p>
          <p>{documentData.Description}</p>
          <p>{documentData.Containment}</p>
          <Link to="/">
            <button type="button" className="btn-primary">Back to Main Page</button>
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DisplayDocument;



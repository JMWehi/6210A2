import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './fbconfig';
import "./App.css";

function MainPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCollection = collection(db, 'ScpData');
        const dataSnapshot = await getDocs(dataCollection);
        const items = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(items);
        setLoading(false);

        // Set the first record as the default selected record
        if (items.length > 0) {
          setSelectedRecord(items[0]);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMenuItemClick = (record) => {
    setSelectedRecord(record);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterInputChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const handleSearchButtonClick = () => {
    // Handle search button click if needed
  };

  const renderRecordCard = () => {
    if (selectedRecord) {
      return (
        <div className="card my-card">
          <div className="card-header">{selectedRecord.item}</div>
          <div className="card-body">
            <p>Class: {selectedRecord.class}</p>
            <p>Description: {selectedRecord.description}</p>
            <p>Containment: {selectedRecord.containment}</p>
            {selectedRecord.imageURL && (
              <img src={selectedRecord.imageURL} alt={selectedRecord.item} />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3">Scp CRUD Application</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {menuItems.slice(0, 10).map(item => (
                <li className="nav-item" key={item.id}>
                  <Link
                    className="btn btn-outline-secondary"
                    to="#"
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {item.item}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <Link className="btn btn-danger" to="/CRUD">
                  CRUD Functions
                </Link>
              </li>
            </ul>
            <form className="d-flex ms-auto">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleSearchButtonClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        {renderRecordCard()}
      </div>
    </div>
  );
}

export default MainPage;




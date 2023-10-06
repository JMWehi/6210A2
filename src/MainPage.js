import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, doc } from 'firebase/firestore';
import { db } from './fbconfig';
import "./App.css";


function MainPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      const dataCollection = collection(db, 'ScpData');
      const dataSnapShot = await getDocs(dataCollection);
      const items = dataSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    };
    fetchMenuItems();
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
    const filteredItems = menuItems
      .filter((item) =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) =>
        item.class.toLowerCase().includes(filterCriteria.toLowerCase())
      );
  
    // Update the state or perform any actions with the filtered items.
    // For example, you can set a state variable to store the filtered items.
  
    // setFilteredItems(filteredItems);
  };

  const renderRecordCard = () => {
    if (selectedRecord) {

    } else if (menuItems.length > 0) {

      return (
        <div className="card my-card">
          <div className="card-header">{menuItems[0].item}</div>
          <div className="card-body">
            <p>Class: {menuItems[0].class}</p>
            <p>Description: {menuItems[0].description}</p>
            <p>Containment: {menuItems[0].containment}</p>
            {menuItems[0].image && (
              <img src={menuItems[0].image} alt={menuItems[0].item} />
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
      <h1>Welcome to the CRUD Application</h1>
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
              <li className="nav-item">
                <Link className="btn btn-danger" to="/CRUD">
                  CRUD Functions
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto"> {/* Use ms-auto for margin-left:auto */}
              <li className="nav-item">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </li>
              <li className="nav-item">
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filterCriteria}
                  onChange={handleFilterInputChange}
                />
              </li>
              <li className="nav-item">
                <button onClick={handleSearchButtonClick}>Search</button>
              </li>
              {menuItems
                .filter((item) =>
                  item.item.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((item) =>
                  item.class.toLowerCase().includes(filterCriteria.toLowerCase())
                )
                .map((item) => (
                  <li className="nav-item" key={item.id}>
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => handleMenuItemClick(item)}
                    >
                      {item.item}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
      {renderRecordCard()}
    </div>
  );
  
}

export default MainPage;


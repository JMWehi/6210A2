import React, { useState, useEffect } from 'react';
import { db } from './fbconfig';
import {addDoc,collection,doc,getDocs,deleteDoc,updateDoc,onSnapshot,} from 'firebase/firestore';
import { storage } from './fbconfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';


function CRUD() {
  const [dataItem, setDataItem] = useState('');
  const [dataClass, setDataClass] = useState('');
  const [dataDescription, setDataDescription] = useState('');
  const [dataContainment, setDataContainment] = useState('');

  const [readData, setReadData] = useState([]);

  const [id, setID] = useState('');
  const [showDoc, setShowDoc] = useState(false);

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const OurCollection = collection(db, 'ScpData');

  useEffect(() => {
    const getData = async () => {
        const ourDocsToRead = await getDocs(OurCollection);
        setReadData(
            ourDocsToRead.docs.map(
                (doc) => ({ ...doc.data(), id: doc.id })
            )
        );
    }
    getData();
}, [OurCollection]);


  const crudCreate = async () => {
    await addDoc(OurCollection, {
      item: dataItem,
      class: dataClass,
      description: dataDescription,
      containment: dataContainment,
      imageURL: imageURL,
    });
  };

  const crudDelete = async (id) => {
    const docToDelete = doc(db, 'ScpData', id);
    await deleteDoc(docToDelete);
  };

  // Add for edit button
  const showEdit = (id, item, Class, description, containment, imageURL) => {
    setDataItem(item);
    setDataClass(Class);
    setDataDescription(description);
    setDataContainment(containment);
    setImageURL(imageURL);
    setID(id);
    setShowDoc(true);
  };

  // Update document that is on the main form
  const crudUpdate = async () => {
    const updateData = doc(db, 'ScpData', id);
    await updateDoc(updateData, {
      item: dataItem,
      class: dataClass,
      description: dataDescription,
      containment: dataContainment,
      imageURL: imageURL,
    });
    setShowDoc(false);
    setDataItem('');
    setDataClass('');
    setDataDescription('');
    setDataContainment('');
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      // Progress function
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload ' + progress + '% done');
      },
      // Error function
      (error) => {
        console.log(error);
      },
      // Complete upload retrieve URL to upload image
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
      }
    );
  };

  return (
    <>
      <h1>CRUD Functions Form</h1>
      <p>
        <Link to="/">
          <button type="button" className="btn btn-primary">
            Back to MainPage
          </button>
        </Link>
      </p>

      <div className="form-group p-5 bg-dark rounded">
        <input
          className="form-control"
          value={dataItem}
          onChange={(item) => setDataItem(item.target.value)}
          placeholder="item"
        />
        <br />
        <br />
        <input
          className="form-control"
          value={dataClass}
          onChange={(Class) => setDataClass(Class.target.value)}
          placeholder="class"
        />
        <br />
        <br />
        <input
          className="form-control"
          value={dataDescription}
          onChange={(description) =>
            setDataDescription(description.target.value)
          }
          placeholder="description"
        />
        <br />
        <br />
        <input
          className="form-control"
          value={dataContainment}
          onChange={(containment) =>
            setDataContainment(containment.target.value)
          }
          placeholder="containment"
        />
        <br />
        <br />
        <input
          className="form-control"
          type="file"
          onChange={handleImageChange}
        />
        <br />
        <button
          onClick={uploadImage}
          className="btn btn-secondary"
        >
          Upload Image
        </button>
      </div>

      {imageURL && (
        <img
          src={imageURL}
          alt="Uploaded preview"
          style={{ maxWidth: '200px', height: 'auto' }}
        />
      )}
      <br />
      <br />
      {!showDoc ? (
        <button
          onClick={crudCreate}
          className="btn btn-primary"
        >
          Create New SCP Record
        </button>
      ) : (
        <button
          onClick={crudUpdate}
          className="btn btn-dark"
        >
          Update document
        </button>
      )}
      <hr />
      {readData.map((values) => (
        <div key={values.id}>
          <h1>{values.item}</h1>
          <p>
            <strong>Class:</strong> {values.class}
          </p>
          <p>
            <strong>Description:</strong> {values.description}
          </p>
          <p>
            <strong>Containment:</strong> {values.containment}
          </p>
          <p>
            {values.imageURL && (
              <img
                src={values.imageURL}
                alt={"New"}
                style={{
                  maxWidth: '200',
                  height: 'auto',
                }}
              />
            )}
          </p>
          <button
            onClick={() => crudDelete(values.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
          {' '}
          <button
            onClick={() =>
              showEdit(
                values.id,
                values.item,
                values.class,
                values.description,
                values.containment,
                values.imageURL
              )
            }
            className="btn btn-warning"
          >
            Edit
          </button>
        </div>
      ))}
    </>
  );
}

export default CRUD;

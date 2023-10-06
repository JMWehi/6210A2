import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './fbconfig';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from './validation/validationSchema';


function CreateDocument() {
  const initialValues = {
    item: '',
    class: '',
    description: '',
    containment: '',
    // Add other fields as needed.
  };

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission here.
    console.log('Form submitted with values:', values);
    // Reset the form after successful submission
    resetForm();
  };

  const createDocument = async (values) => {
    try {
      const dataCollection = collection(db, 'ScpData');
      await addDoc(dataCollection, values); // Use 'values' instead of 'data'
      // Reset form fields or navigate to the documents list
    } catch (error) {
      console.error('Error creating document: ', error);
    }
  };
  


  return (
    <div>
      <h1>Create New SCP Document</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="item">Item</label>
            <Field type="text" id="item" name="item" className="form-control" />
            <ErrorMessage name="item" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class</label>
            <Field type="text" id="class" name="class" className="form-control" />
            <ErrorMessage name="class" component="div" className="error" />
          </div>

          {/* Add similar fields for description, containment, and other form fields. */}
          
          <button type="submit">Create</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateDocument;

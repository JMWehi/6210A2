// validationSchema.js

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  item: Yup.string().required('Item is required'),
  class: Yup.string().required('Class is required'),
  description: Yup.string().required('Description is required'),
  containment: Yup.string().required('Containment is required'),
});

export default validationSchema;


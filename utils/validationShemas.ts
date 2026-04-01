import * as yup from 'yup';

export const orderSchema = yup
  .object({
    name: yup.string().required('Name is required').min(2, 'Too short'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(/^[0-9+]+$/, "Only numbers and '+'")
      .min(10, 'Too short number')
      .required('Phone is required'),
    address: yup
      .string()
      .required('Delivery address required')
      .min(5, 'Enter the full address'),
  })
  .required();

export type OrderFormData = yup.InferType<typeof orderSchema>;

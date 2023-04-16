/* Dependencies */
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

// Different Breed
import { differentBreedAdmin } from '@/services/differentBreedAdmin/differentBreedAdmin';
import { differentBreedClient } from '@/services/differentBreedClient/differentBreedClient';

// Validation
const validationSchema = Yup.object().shape({
  cart_id: Yup.string().uuid().required('Cart ID is required'),
  email: Yup.string().email().required('Email is required'),
  forename: Yup.string().required('First name is required'),
  surname: Yup.string().required('Surname is required'),
});

// Models
type Payload = Yup.InferType<typeof validationSchema>;

/**
 * Creates a new customer and attaches it to the cart.
 * If the customer already exists, it will be attached to the cart.
 * @param req - NextApiRequest
 * @param res - NextApiResponse
 * @returns
 */
const AttachCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    await validationSchema.validate(req.body, { abortEarly: false });

    // Extract the payload
    const payload: Payload = req.body;

    // Create the customer
    const customer = await differentBreedAdmin.customer
      .createCustomer({
        email: payload.email,
        forename: payload.forename,
        surname: payload.surname,
      })
      .then((res) => res.payload)
      .catch((error) => {
        throw error;
      });

    // Attach the customer to the cart
    await differentBreedClient.cart
      .attachCustomer(payload.cart_id, { cust_id: customer.cust_id })
      .catch((error) => {
        throw error;
      });

    // Respond with success
    return res.send({ success: true });
  } catch (error: any) {
    return res.status(400).send({
      message: 'Invalid request body',
      errors: error.errors || error.message,
    });
  }
};

// Exports
export default AttachCustomer;

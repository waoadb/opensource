/* Dependencies */
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

// Different Breed
import { differentBreedAdmin } from '@/services/differentBreedAdmin/differentBreedAdmin';

// Validation
const validationSchema = Yup.object().shape({
  cart_id: Yup.string().uuid().required('Cart ID is required'),
  attendees: Yup.array().required('Attendees are required'),
  delivery: Yup.array().required('Delivery is required'),
});

// Models
type Payload = Yup.InferType<typeof validationSchema>;

/**
 * Marks a cart as sold.
 * This will process the cart and create an order.
 * @param req - NextApiRequest
 * @param res - NextApiResponse
 * @returns
 */
const MarkCartSold = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    await validationSchema.validate(req.body, { abortEarly: false });
  } catch (error: any) {
    return res.status(400).send({
      message: 'Invalid request body',
      errors: error.errors,
    });
  }

  try {
    // Extract the payload
    const payload: Payload = req.body;

    // Mark the cart as pending sale
    // We rely on DB system to validate the attendees and delivery.
    // An error will be passed in the response if the attendees or delivery are invalid.
    await differentBreedAdmin.cart
      .markPendingSale(payload.cart_id, {
        attendees: payload.attendees,
        delivery: payload.delivery,
      })
      .catch((error) => {
        throw error;
      });

    // Mark the cart as sold
    const orderReferences = await differentBreedAdmin.cart
      .markAsSold(payload.cart_id, {
        paid: true,
      })
      .then((res) => res.payload)
      .catch((error) => {
        throw error;
      });

    // Respond with success
    return res.send({ success: true, payload: orderReferences });
  } catch (error: any) {
    return res.status(400).send({
      ...error,
    });
  }
};

// Exports
export default MarkCartSold;

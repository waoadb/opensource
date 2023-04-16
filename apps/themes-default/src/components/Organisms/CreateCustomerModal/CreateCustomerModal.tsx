/* Dependencies */
import { Formik } from 'formik';
import * as Yup from 'yup';

// Helpers
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Modal } from '../Modal/Modal';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import { Button } from '@/components/Atoms/Button/Button';

// Validation
const validationSchema = Yup.object().shape({
  forename: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

// Models
import { ClientCustomerModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Is modal open
   */
  isOpen: boolean;
  /**
   * Handle close
   */
  onClose: () => void;
  /**
   * Handle Submit
   */
  onSubmit: (
    customer: ClientCustomerModels.CreateCustomerRequest,
    callback: Function
  ) => void;
};

/**
 * Create Customer Modal
 * @param props - Component props.
 * @returns
 */
export const CreateCustomerModal = ({ isOpen, onClose, onSubmit }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <Heading level="h2" style="h3">
        Your Details
      </Heading>
      <Paragraph style="base" className="mt-2">
        Enter the details of the main contact for this booking. We will use
        these details to send you your tickets once checkout is complete.
      </Paragraph>
      <Formik
        initialValues={{
          forename: '',
          surname: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(
            {
              forename: values.forename,
              surname: values.surname,
              email: values.email,
            },
            () => {
              setSubmitting(false);
            }
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="w-full">
                <Input
                  id="forename"
                  label="First Name"
                  name="forename"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.forename}
                  error={handleFieldError(errors, touched, 'forename')}
                  required={true}
                  inputMode="text"
                  autoComplete="given-name"
                  type="text"
                />
              </div>
              <div className="w-full">
                <Input
                  id="surname"
                  label="Surname"
                  name="surname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                  error={handleFieldError(errors, touched, 'surname')}
                  required={true}
                  inputMode="text"
                  autoComplete="family-name"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full mt-2">
              <Input
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={handleFieldError(errors, touched, 'email')}
                required={true}
                inputMode="text"
                autoComplete="email"
                type="email"
              />
            </div>
            <div className="w-full mt-4">
              <Button
                accessibleTitle="Submit details and continue to checkout"
                className="w-full"
                type="submit"
                variant="primary"
              >
                Continue
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

/* Dependencies */
import * as Yup from 'yup';
import { Formik } from 'formik';
import classNames from 'classnames';

// Helpers
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/Atoms/Button/Button';
import { Input } from '@/components/Molecules/Forms/Input/Input';

// Validation
const validationSchema = Yup.object().shape({
  query: Yup.string().required('Please enter a search term.'),
});

// Models
type Props = {
  /**
   * Initial query to be set.
   */
  query: string;
  /**
   * Handle the form submission.
   */
  onSubmit: (payload: string) => void;
};

/**
 * Search Filters
 * @param props - Component props.
 * @returns
 */
export const SearchFilters = ({ onSubmit, query = '' }: Props) => {
  return (
    <div className="flex flex-row flex-wrap justify-between items-end gap-4">
      <div className="w-full">
        <Formik
          initialValues={{
            query,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values.query);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            resetForm,
            submitForm,
          }) => (
            <form
              className={classNames(
                'flex flex-row flex-wrap lg:mt-0 md:max-w-md',
                handleFieldError(errors, touched, 'query')
                  ? 'items-center'
                  : 'items-end'
              )}
              onSubmit={handleSubmit}
            >
              <div className="w-full max-w-[calc(100%-74px)]">
                <Input
                  label="Enter Query"
                  id="query"
                  name="query"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.query}
                  placeholder="Search by venue name"
                  error={handleFieldError(errors, touched, 'query')}
                  inputMode="text"
                  type="text"
                />
              </div>

              <div className="lg:max-w-[74px] ml-2">
                <Button
                  accessibleTitle="Apply filters to available venues"
                  type="submit"
                  variant="primary"
                  iconOnly={true}
                  icon={
                    <MagnifyingGlassIcon
                      name="Apply Filters"
                      width="18"
                      height="18"
                    />
                  }
                  onClick={handleSubmit}
                >
                  <span className="sr-only">Apply Filters</span>
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

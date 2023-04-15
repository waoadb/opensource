/* Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';

// Helpers
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import {
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/Atoms/Button/Button';
import { Input } from '@/components/Molecules/Forms/Input/Input';

// Validation
const validationSchema = Yup.object().shape({
  query: Yup.string().optional(),
});

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
type Props = {
  /**
   * Handle the form submission.
   */
  onSubmit: (
    payload: Omit<ClientCacheModels.RetrieveVenuesRequest, 'limit' | 'skip'>
  ) => void;
};

/**
 * Venue Filters
 * @param props - Component props.
 * @returns
 */
export const VenueFilters = ({ onSubmit }: Props) => {
  // State
  const [mobileFilters, setMobileFilters] = useState(false);

  return (
    <div className="flex flex-row flex-wrap justify-between items-end gap-4">
      <div className="w-full lg:w-auto lg:basis-3/4">
        <Button
          size="base"
          onClick={() => setMobileFilters(!mobileFilters)}
          className="w-full lg:hidden"
          variant="hollowPrimary"
          icon={<FunnelIcon name="Filter" width="18" height="18" />}
          accessibleTitle={!mobileFilters ? 'Show Filters' : 'Hide Filters'}
        >
          Filter
        </Button>
        <div
          className={classNames({
            block: mobileFilters,
            'hidden lg:block': !mobileFilters,
          })}
        >
          <Formik
            initialValues={{
              query: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit({
                query: values.query || undefined,
              });
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
                className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-2 mt-4 lg:mt-0"
                onSubmit={handleSubmit}
              >
                <div className="lg:col-span-2">
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

                <div className="w-full self-end grid grid-cols-2 gap-2 md:gap-4 lg:gap-1 lg:max-w-[168px]">
                  <Button
                    accessibleTitle="Apply filters to available venues"
                    type="submit"
                    variant="primary"
                    fullWidth={mobileFilters ? true : false}
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
                  <Button
                    accessibleTitle="Reset applied filters"
                    type="button"
                    variant="hollowPrimary"
                    fullWidth={mobileFilters ? true : false}
                    iconOnly={true}
                    icon={
                      <ArrowPathIcon
                        name="Reset Filters"
                        width="18"
                        height="18"
                      />
                    }
                    onClick={() => {
                      resetForm();
                      submitForm();
                    }}
                  >
                    <span className="sr-only">Reset Filters</span>
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

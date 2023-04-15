/* Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';

// Helpers
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { Button } from '@/components/Atoms/Button/Button';
import {
  ArrowPathIcon,
  CalendarIcon,
  FunnelIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Input } from '../Forms/Input/Input';

// Validation
const validationSchema = Yup.object().shape({
  date_form: Yup.string().optional(),
  date_to: Yup.string().optional(),
  query: Yup.string().optional(),
});

// Models
import { ClientCacheModels } from '@waoadb/contracts-client';
import dayjs from 'dayjs';
type View = 'list' | 'calendar';
type Props = {
  view: 'list' | 'calendar';
  handleViewChange: (view: View) => void;
  onSubmit(
    payload: Omit<
      ClientCacheModels.RetrievePerformancesRequest,
      'limit' | 'skip' | 'event_id'
    >
  ): void;
};

/**
 * Performance Filters
 * @param props - Component props.
 * @returns
 */
export const PerformanceFilters = ({
  view,
  handleViewChange,
  onSubmit,
}: Props) => {
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
              date_from: dayjs().format('YYYY-MM-DD'),
              date_to: '',
              query: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit({
                date_from: values.date_from || undefined,
                date_to: values.date_to || undefined,
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
                <div className="col-span-1">
                  <Input
                    label="Date From"
                    id="date_from"
                    name="date_from"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date_from}
                    placeholder="Date From"
                    error={handleFieldError(errors, touched, 'date_from')}
                    inputMode="none"
                    type="date"
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    label="Date To"
                    id="date_to"
                    name="date_to"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date_to}
                    placeholder="Date To"
                    error={handleFieldError(errors, touched, 'date_to')}
                    inputMode="none"
                    type="date"
                  />
                </div>
                {/* <div className="col-span-1">
                    <Select
                      label="Accessibility"
                      id="access"
                      name="access"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.access}
                      placeholder="Access"
                      error={handleFieldError(errors, touched, 'access')}
                      icon={<UserIcon name="Person" width="18" height="18" />}
                      options={[
                        { key: 'Free', value: 'free' },
                        { key: 'Paid', value: 'paid' },
                      ]}
                    />
                  </div> */}
                <div className="w-full self-end grid grid-cols-2 gap-2 md:gap-4 lg:gap-1 lg:max-w-[168px] border-b md:border-none border-gray-500 border-solid pb-8 md:pb-0">
                  <Button
                    accessibleTitle="Apply filters to available performances"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap gap-4 lg:gap-2 w-full lg:w-auto">
        <Button
          size="base"
          onClick={() => handleViewChange('list')}
          className="w-auto flex-auto justify-center"
          accessibleTitle="Show List View"
          filtersIcon={true}
          variant={view === 'list' ? 'primary' : 'hollowPrimary'}
          icon={<ListBulletIcon name="ListIcon" width="18" height="18" />}
        >
          <span className="block lg:hidden xl:block ml-2">List</span>
        </Button>
        <Button
          size="base"
          onClick={() => handleViewChange('calendar')}
          className="w-auto flex-auto justify-center"
          accessibleTitle="Show Calendar View"
          filtersIcon={true}
          variant={view === 'calendar' ? 'primary' : 'hollowPrimary'}
          icon={<CalendarIcon name="Calendar" width="18" height="18" />}
        >
          <span className="block lg:hidden xl:block ml-2">Calendar</span>
        </Button>
      </div>
    </div>
  );
};

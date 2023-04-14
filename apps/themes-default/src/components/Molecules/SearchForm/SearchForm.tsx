/* Dependencies */
import React from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import classNames from 'classnames';

// Helpers
import { handleFieldError } from '@/helpers/handleFieldError/handleFieldError';

// Components
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '../Forms/Input/Input';
import { Button } from '@/components/Atoms/Button/Button';

// Validation
const validation = Yup.object().shape({
  query: Yup.string().required('Required'),
});

/**
 * Search Form
 * @returns
 */
export const SearchForm = () => {
  // Hooks
  const router = useRouter();

  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values) => {
        router.push(`/search?q=${encodeURIComponent(values.query.trim())}`);
      }}
      validationSchema={validation}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={classNames(
            'flex flex-row flex-wrap',
            handleFieldError(errors, touched, 'query')
              ? 'items-center'
              : 'items-end'
          )}
        >
          <div className="w-full max-w-[calc(100%-80px)] mr-2">
            <Input
              label="Query"
              name="query"
              id="search_query"
              value={values.query}
              onChange={handleChange}
              onBlur={handleBlur}
              error={handleFieldError(errors, touched, 'query')}
              required={true}
              inputMode="search"
              type="search"
              labelVisible={true}
            />
          </div>
          <Button
            accessibleTitle="Search"
            type="submit"
            variant="primary"
            icon={<MagnifyingGlassIcon width={24} height={24} />}
            iconOnly={true}
          ></Button>
        </form>
      )}
    </Formik>
  );
};

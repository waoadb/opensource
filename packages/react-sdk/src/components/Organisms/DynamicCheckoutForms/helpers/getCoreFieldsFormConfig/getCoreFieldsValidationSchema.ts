/* Dependencies */
import * as yup from 'yup';

// Models
import { ClientCartModels } from '@waoadb/contracts-client';
import { CoreDetailsFormValues } from '../../Forms/CoreDetailsForm/CoreDetailsForm';

/**
 * Get Core Fields Form Config.
 * @param config - The config.
 * @returns
 */
export const getCoreFieldsFormConfig = (
  config: ClientCartModels.ConfigCollectedCoreFields
) => {
  // Create the initial values for the core fields.
  const initialValues: Partial<CoreDetailsFormValues> = {
    core_details: {
      ...(config.title_enabled && {
        title: '',
      }),
      ...(config.first_name_enabled && {
        first_name: '',
      }),
      ...(config.surname_enabled && {
        surname: '',
      }),
      ...(config.email_enabled && {
        email_address: '',
      }),
      ...(config.mobile_phone_enabled && {
        mobile_phone: '',
      }),
      ...(config.work_phone_enabled && {
        work_phone: '',
      }),
      ...(config.job_title_enabled && {
        job_title: '',
      }),
      ...(config.company_name_enabled && {
        company_name: '',
      }),
      ...(config.gender_enabled && {
        gender: '',
      }),
      ...(config.website_url_enabled && {
        website_url: '',
      }),
    },
    ...(config.billing_address_enabled && {
      billing_address: {
        name: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        city: '',
        postcode: '',
        country: '',
      },
    }),
    ...(config.shipping_address_enabled && {
      shipping_address: {
        name: '',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
        city: '',
        postcode: '',
        country: '',
      },
    }),
  };

  // Create the validation schema for the core fields.
  const schema = yup
    .object({
      core_details: yup.object({
        title: yup.string().required('Title is required'),
        first_name: yup.string().required('First Name is required'),
        surname: yup.string().required('Surname is required'),
        ...(config.email_enabled && {
          ...(config.email_required
            ? {
                email_address: yup
                  .string()
                  .email('Email Address is invalid')
                  .required('Email Address is required'),
              }
            : {
                email_address: yup.string().email('Email Address is invalid'),
              }),
        }),
        ...(config.mobile_phone_enabled && {
          ...(config.mobile_phone_required
            ? {
                mobile_phone: yup
                  .string()
                  .matches(/^(\+44|0)7\d{9}$/, 'Mobile Phone is invalid')
                  .required('Mobile Phone is required'),
              }
            : {
                mobile_phone: yup
                  .string()
                  .matches(/^(\+44|0)7\d{9}$/, 'Mobile Phone is invalid'),
              }),
        }),
        ...(config.work_phone_enabled && {
          ...(config.work_phone_required
            ? {
                work_phone: yup
                  .string()
                  .matches(/^(\+44|0)1\d{9}$/, 'Work Phone is invalid')
                  .required('Work Phone is required'),
              }
            : {
                work_phone: yup
                  .string()
                  .matches(/^(\+44|0)1\d{9}$/, 'Work Phone is invalid'),
              }),
        }),
        ...(config.job_title_enabled && {
          ...(config.job_title_required
            ? {
                job_title: yup.string().required('Job Title is required'),
              }
            : {
                job_title: yup.string(),
              }),
        }),
        ...(config.company_name_enabled && {
          ...(config.company_name_required
            ? {
                company_name: yup.string().required('Company Name is required'),
              }
            : {
                company_name: yup.string(),
              }),
        }),
        ...(config.gender_enabled && {
          ...(config.gender_required
            ? {
                company_name: yup.string().required('Gender is required'),
              }
            : {
                company_name: yup.string(),
              }),
        }),
        ...(config.website_url_enabled && {
          ...(config.gender_required
            ? {
                company_name: yup.string().required('Gender is required'),
              }
            : {
                company_name: yup.string(),
              }),
        }),
      }),
      ...(config.billing_address_enabled && {
        billing_address: yup
          .object({
            name: yup.string().required('Name is required'),
            address_line_1: yup.string().required('Address Line 1 is required'),
            address_line_2: yup.string(),
            address_line_3: yup.string(),
            city: yup.string().required('City is required'),
            postcode: yup.string().required('Postcode is required'),
            country: yup.string().required('Country is required'),
          })
          .required(),
      }),
      ...(config.shipping_address_enabled && {
        shipping_address: yup
          .object({
            name: yup.string().required('Name is required'),
            address_line_1: yup.string().required('Address Line 1 is required'),
            address_line_2: yup.string(),
            address_line_3: yup.string(),
            city: yup.string().required('City is required'),
            postcode: yup.string().required('Postcode is required'),
            country: yup.string().required('Country is required'),
          })
          .required(),
      }),
    })
    .required();

  // Error Messages
  const errorsPropMatch = {
    core_details: {
      title: 'Title',
      first_name: 'First Name',
      surname: 'Surname',
      email_address: 'Email Address',
      mobile_phone: 'Mobile Phone',
      work_phone: 'Work Phone',
      job_title: 'Job Title',
      company_name: 'Company Name',
      gender: 'Gender',
      website_url: 'Website URL',
    },
  };

  const errorsBillingAddressPropMatch = {
    billing_address: {
      name: 'Name',
      address_line_1: 'Address Line 1',
      address_line_2: 'Address Line 2',
      address_line_3: 'Address Line 3',
      city: 'City',
      postcode: 'Postcode',
      country: 'Country',
    },
  };

  const errorsShippingAddressPropMatch = {
    shipping_address: {
      name: 'Name',
      address_line_1: 'Address Line 1',
      address_line_2: 'Address Line 2',
      address_line_3: 'Address Line 3',
      city: 'City',
      postcode: 'Postcode',
      country: 'Country',
    },
  };

  // Return the config.
  return {
    schema,
    initialValues,
    errorsPropMatch,
    errorsBillingAddressPropMatch,
    errorsShippingAddressPropMatch,
  };
};

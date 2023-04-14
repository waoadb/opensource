import Head from 'next/head';
import Layout from '@/Layouts/Layout';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { CheckoutSummary } from '@/components/Molecules/CheckoutSummary/CheckoutSummary';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import { Icon } from '@/components/Atoms/Icons/DemoIcons';
import { Disclosure, Transition } from '@headlessui/react';
import React from 'react';
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { CheckoutDeliveryMethods } from '@/components/Molecules/CheckoutDeliveryMethods/CheckoutDeliveryMethods';

export default function Checkout() {
  const checkoutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto my-10 lg:my-20">
          <Heading level="h1" className="mb-8">
            Checkout - Attendee Details
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            <div className="col-span-1 md:col-span-5 lg:col-span-4">
              <form onSubmit={checkoutHandler}>
                <div className="mb-4">
                  <Heading level="h3" style="h3">
                    Main contact
                  </Heading>
                  <fieldset className="grid grid-cols-2 gap-4">
                    <legend className="sr-only">Main contact</legend>
                    <div className="col-span-1">
                      <Input
                        id="firstName"
                        name="firstName"
                        labelVisible={true}
                        placeholder="Forename"
                        inputClassName="placeholder:text-white"
                        onChange={() => {}}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        id="lastName"
                        name="lastName"
                        labelVisible={true}
                        placeholder="Surename"
                        inputClassName="placeholder:text-white"
                        onChange={() => {}}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        id="emailAddress"
                        name="emailAddress"
                        labelVisible={true}
                        placeholder="Email Address"
                        inputClassName="placeholder:text-white"
                        icon={<Icon name="EmailAt" width="22" height="22" />}
                        onChange={() => {}}
                      />
                    </div>
                  </fieldset>
                </div>

                <div className="mb-4 space-y-4">
                  {Array.from({ length: 2 }, (_, i) => i).map((i) => (
                    <Disclosure key={i.toString()} defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="py-2 font-semibold relative block w-full text-lg text-left">
                            <span>Event Name</span>
                            <span className="absolute right-0 top-1/2 -translate-y-1/2">
                              <Icon
                                name="ChevronDown"
                                width="22"
                                height="22"
                                className={`transition-transform ${
                                  open ? 'rotate-180' : 'rotate-0'
                                }`}
                              />
                            </span>
                          </Disclosure.Button>
                          <Transition
                            show={open}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Disclosure.Panel>
                              <div className="bg-indigo-200 p-4 rounded-md">
                                <Paragraph className="mb-2">
                                  Performance: Mon 01 May 2023 - 21:00pm
                                </Paragraph>
                                <div className="mb-4">
                                  <Heading
                                    level="h5"
                                    className="text-indigo-700 mb-4"
                                  >
                                    <span className="inline-block border-b-2 border-b-current">
                                      General Admission
                                    </span>
                                  </Heading>
                                  <fieldset className="grid grid-cols-11 gap-4 mb-4">
                                    <div className="col-span-3">
                                      <Input
                                        id={`e${i}_title`}
                                        name={`e${i}_title`}
                                        labelVisible={true}
                                        placeholder="Title"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <Input
                                        id={`e${i}_firstName`}
                                        name={`e${i}_firstName`}
                                        labelVisible={true}
                                        placeholder="Forename"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <Input
                                        id={`e${i}_lastName`}
                                        name={`e${i}_lastName`}
                                        labelVisible={true}
                                        placeholder="Surename"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-11">
                                      <Input
                                        id={`e${i}_emailAddress`}
                                        name={`e${i}_emailAddress`}
                                        labelVisible={true}
                                        placeholder="Email Address"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                        icon={
                                          <Icon
                                            name="EmailAt"
                                            width="22"
                                            height="22"
                                          />
                                        }
                                      />
                                    </div>
                                  </fieldset>
                                  <fieldset className="grid grid-cols-2 gap-4 mb-4">
                                    <legend className="font-semibold mb-2">
                                      Billing Address
                                    </legend>
                                    <div className="col-span-2">
                                      <Input
                                        id={`e${i}_address1`}
                                        name={`e${i}_address1`}
                                        labelVisible={true}
                                        placeholder="Address Line 1"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`e${i}_address2`}
                                        name={`e${i}_address2`}
                                        labelVisible={true}
                                        placeholder="Address Line 2"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`e${i}_address3`}
                                        name={`e${i}_address3`}
                                        labelVisible={true}
                                        placeholder="Address Line 3"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`e${i}_postcode`}
                                        name={`e${i}_postcode`}
                                        labelVisible={true}
                                        placeholder="Postcode"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`e${i}_city`}
                                        name={`e${i}_city`}
                                        labelVisible={true}
                                        placeholder="City"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Select
                                        id={`e${i}_country`}
                                        name={`e${i}_country`}
                                        labelVisible={true}
                                        label={'Country'}
                                        placeholder=""
                                        options={[
                                          {
                                            value: 'GB',
                                            text: 'United Kingdom',
                                          },
                                          {
                                            value: 'US',
                                            text: 'United States',
                                          },
                                        ]}
                                      />
                                    </div>
                                  </fieldset>
                                  <fieldset className="grid grid-cols-2 gap-4">
                                    <legend className="font-semibold mb-2">
                                      Shipping Address
                                    </legend>
                                    <div className="col-span-2">
                                      <Input
                                        id={`e${i}_shippingAddress1`}
                                        name={`e${i}_shippingAddress1`}
                                        labelVisible={true}
                                        placeholder="Address Line 1"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`e${i}_shippingAddress2`}
                                        name={`e${i}_shippingAddress2`}
                                        labelVisible={true}
                                        placeholder="Address Line 2"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`e${i}_shippingAddress3`}
                                        name={`e${i}_shippingAddress3`}
                                        labelVisible={true}
                                        placeholder="Address Line 3"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`e${i}_shippingPostcode`}
                                        name={`e${i}_shippingPostcode`}
                                        labelVisible={true}
                                        placeholder="Postcode"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`e${i}_shippingCity`}
                                        name={`e${i}_shippingCity`}
                                        labelVisible={true}
                                        placeholder="City"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Select
                                        id={`e${i}_shippingCountry`}
                                        name={`e${i}_shippingCountry`}
                                        labelVisible={true}
                                        label={'Country'}
                                        placeholder=""
                                        options={[
                                          {
                                            value: 'GB',
                                            text: 'United Kingdom',
                                          },
                                          {
                                            value: 'US',
                                            text: 'United States',
                                          },
                                        ]}
                                      />
                                    </div>
                                  </fieldset>
                                </div>

                                <div className="mb-4">
                                  <Heading
                                    level="h5"
                                    className="text-indigo-700 mb-4"
                                  >
                                    <span className="inline-block border-b-2 border-b-current">
                                      Student
                                    </span>
                                  </Heading>
                                  <fieldset className="grid grid-cols-11 gap-4 mb-4">
                                    <div className="col-span-3">
                                      <Input
                                        id={`st${i}_title`}
                                        name={`st${i}_title`}
                                        labelVisible={true}
                                        placeholder="Title"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <Input
                                        id={`st${i}_firstName`}
                                        name={`st${i}_firstName`}
                                        labelVisible={true}
                                        placeholder="Forename"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <Input
                                        id={`st${i}_lastName`}
                                        name={`st${i}_lastName`}
                                        labelVisible={true}
                                        placeholder="Surename"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-11">
                                      <Input
                                        id={`st${i}_emailAddress`}
                                        name={`st${i}_emailAddress`}
                                        labelVisible={true}
                                        placeholder="Email Address"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                        icon={
                                          <Icon
                                            name="EmailAt"
                                            width="22"
                                            height="22"
                                          />
                                        }
                                      />
                                    </div>
                                  </fieldset>
                                  <fieldset className="grid grid-cols-2 gap-4 mb-4">
                                    <legend className="font-semibold mb-2">
                                      Billing Address
                                    </legend>
                                    <div className="col-span-2">
                                      <Input
                                        id={`st${i}_address1`}
                                        name={`st${i}_address1`}
                                        labelVisible={true}
                                        placeholder="Address Line 1"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`st${i}_address2`}
                                        name={`st${i}_address2`}
                                        labelVisible={true}
                                        placeholder="Address Line 2"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`st${i}_address3`}
                                        name={`st${i}_address3`}
                                        labelVisible={true}
                                        placeholder="Address Line 3"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`st${i}_postcode`}
                                        name={`st${i}_postcode`}
                                        labelVisible={true}
                                        placeholder="Postcode"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`st${i}_city`}
                                        name={`st${i}_city`}
                                        labelVisible={true}
                                        placeholder="City"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Select
                                        id={`st${i}_country`}
                                        name={`st${i}_country`}
                                        labelVisible={true}
                                        label={'Country'}
                                        placeholder="Country"
                                        options={[
                                          {
                                            value: 'GB',
                                            text: 'United Kingdom',
                                          },
                                          {
                                            value: 'US',
                                            text: 'United States',
                                          },
                                        ]}
                                      />
                                    </div>
                                  </fieldset>
                                  <fieldset className="grid grid-cols-2 gap-4">
                                    <legend className="font-semibold mb-2">
                                      Shipping Address
                                    </legend>
                                    <div className="col-span-2">
                                      <Input
                                        id={`st${i}_shippingAddress1`}
                                        name={`st${i}_shippingAddress1`}
                                        labelVisible={true}
                                        placeholder="Address Line 1"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`st${i}_shippingAddress2`}
                                        name={`st${i}_shippingAddress2`}
                                        labelVisible={true}
                                        placeholder="Address Line 2"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Input
                                        id={`st${i}_shippingAddress3`}
                                        name={`st${i}_shippingAddress3`}
                                        labelVisible={true}
                                        placeholder="Address Line 3"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`st${i}_shippingPostcode`}
                                        name={`st${i}_shippingPostcode`}
                                        labelVisible={true}
                                        placeholder="Postcode"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <Input
                                        id={`st${i}_shippingCity`}
                                        name={`st${i}_shippingCity`}
                                        labelVisible={true}
                                        placeholder="City"
                                        inputClassName="placeholder:text-white"
                                        onChange={() => {}}
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <Select
                                        id={`st${i}_shippingCountry`}
                                        name={`st${i}_shippingCountry`}
                                        labelVisible={true}
                                        label={'Country'}
                                        placeholder=""
                                        options={[
                                          {
                                            value: 'GB',
                                            text: 'United Kingdom',
                                          },
                                          {
                                            value: 'US',
                                            text: 'United States',
                                          },
                                        ]}
                                      />
                                    </div>
                                  </fieldset>
                                </div>

                                <div className="mb-4">
                                  <Heading
                                    level="h5"
                                    className="text-indigo-700 mb-4"
                                  >
                                    <span className="inline-block border-b-2 border-b-current">
                                      Delivery
                                    </span>
                                  </Heading>
                                  <CheckoutDeliveryMethods />
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </form>
            </div>
            <div className="col-span-1 lg:col-start-6 lg:col-span-3">
              <Heading level="h3" style="h3" className="mb-4">
                Summary
              </Heading>
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

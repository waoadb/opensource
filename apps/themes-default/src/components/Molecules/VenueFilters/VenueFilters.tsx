import { Button } from '@/components/Atoms/Button/Button';
import { Input } from '@/components/Molecules/Forms/Input/Input';
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

export const VenueFilters = () => {
  const [mobileFilters, setMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    searchTerm: '',
    country: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const filtersOnMobile = (on: boolean) => {
    if (on) {
      return 'block';
    } else {
      return 'hidden lg:block';
    }
  };

  return (
    <div className="container mx-auto my-10 lg:my-20">
      <div className="flex flex-row flex-wrap justify-between items-center gap-4">
        {/* <div className="w-full lg:w-auto lg:basis-3/4">
          <Button
            size="base"
            onClick={() => setMobileFilters(!mobileFilters)}
            className="w-full lg:hidden mb-4"
            variant="hollowPrimary"
            icon={<Icon name="Filter" width="18" height="18" />}
          >
            Filter
          </Button>
          <div className={` ${filtersOnMobile(mobileFilters)}`}>
            <div className="grid lg:grid-cols-4 gap-4">
              <Input
                id="searchTerm"
                onChange={handleOnChange}
                value={filters.searchTerm}
                placeholder="Search"
                icon={<Icon name="Search" width="18" height="18" />}
              />
              <Select
                id="access"
                onChange={handleOnSelect}
                options={[
                  { key: 'Scotland', value: 'SC' },
                  { key: 'Ireland', value: 'IE' },
                ]}
                placeholder="Country"
                icon={<GlobeAltIcon name="Globe" width="18" height="18" />}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

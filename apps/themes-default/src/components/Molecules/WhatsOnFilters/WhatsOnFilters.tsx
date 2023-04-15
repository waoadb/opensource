import { Input } from '@/components/Molecules/Forms/Input/Input';
import React, { useState } from 'react';
import { Select } from '@/components/Molecules/Forms/Select/Select';
import { Button } from '@/components/Atoms/Button/Button';
import { FunnelIcon } from '@heroicons/react/24/outline';

type WhatsOnFilterProps = {
  view: 'list' | 'calendar';
  setView: (view: 'list' | 'calendar') => void;
};

export const WhatsOnFilters = ({ view, setView }: WhatsOnFilterProps) => {
  const [mobileFilters, setMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    access: '',
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
  // useEffect(() => console.log(filters), [filters]);

  return (
    <div className="container mx-auto my-10 lg:my-20">
      <div className="flex flex-row flex-wrap justify-between items-center gap-4">
        <div className="w-full lg:w-auto lg:basis-3/4">
          {/* <Button
            onClick={() => setMobileFilters(!mobileFilters)}
            className="w-full lg:hidden"
            variant="hollowPrimary"
            icon={<FunnelIcon name="Filter" width="18" height="18" />}
          >
            Filter
          </Button> */}
          <div className={` ${filtersOnMobile(mobileFilters)}`}>
            <div className="grid lg:grid-cols-4 gap-4 mt-4 lg:mt-0">
              {/* <Input
                id="searchTerm"
                onChange={handleOnChange}
                value={filters.searchTerm}
                placeholder="Search"
                // icon={<Icon name="Search" width="18" height="18" />}
              />
              <Input
                id="dateFrom"
                onChange={handleOnChange}
                value={filters.dateFrom}
                placeholder="Date From"
                type="date"
                // icon={<Icon name="Calendar" width="18" height="18" />}
              />
              <Input
                id="dateTo"
                onChange={handleOnChange}
                value={filters.dateTo}
                placeholder="Date to"
                type="date"
                icon={<Icon name="Calendar" width="18" height="18" />}
              />
              <Select
                id="access"
                labelClassName="col-span-1"
                onChange={handleOnSelect}
                options={[
                  { text: 'Free', value: 'free' },
                  { text: 'Paid', value: 'paid' },
                ]}
                placeholder="Access"
                icon={<Icon name="Person" width="18" height="18" />}
              /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 w-full lg:w-auto">
          {/* <Button
            size="base"
            onClick={() => setView('list')}
            className="w-auto flex-auto justify-center"
            ariaLabel="Show List"
            variant={view === 'list' ? 'primary' : 'hollowPrimary'}
            icon={<Icon name="ListIcon" width="18" height="18" />}
          >
            <span className="block lg:hidden xl:block">List</span>
          </Button>
          <Button
            size="base"
            onClick={() => setView('calendar')}
            className="w-auto flex-auto justify-center"
            ariaLabel="Show Calendar"
            variant={view === 'calendar' ? 'primary' : 'hollowPrimary'}
            icon={<Icon name="Calendar" width="18" height="18" />}
          >
            <span className="block lg:hidden xl:block">Calendar</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

import Image from 'next/image';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Icon } from '@/components/Atoms/DemoIcons/DemoIcons';
import { Button } from '@/components/Atoms/Button/Button';
import { BackButton } from '@/components/Atoms/BackButton/BackButton';

export const EventBanner = () => {
  return (
    <div className="relative flex h-112 w-full flex-col overflow-hidden md:min-h-[calc(100vh-100px)] lg:h-auto pt-20">
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-black/40">
        <Image
          className="absolute h-full w-full object-cover object-center"
          src="https://picsum.photos/1920/1080"
          alt="Featured event image"
          fill={true}
          priority={true}
        />
        <div className="absolute z-[2] left-0 w-full top-0 p-4 pt-8">
          <div className="container mx-auto">
            <BackButton text="What's on"/>
          </div>
        </div>
      </div>
      <div className="relative mt-auto w-full text-white p-4 pb-8">
        <div className="container mx-auto">
          <div className="space-y-2 md:space-y-4 pb-8">
            <Heading level="h1" style="h1" className="... block truncate leading-tight">
              <span>Event title</span>
            </Heading>
            <Paragraph variant="large">
              Date: Mon 01 May 2023 - 21:00pm (GMT)
            </Paragraph>
            <div>
              <span className="sr-only">Facilities available</span>
              <ul className="flex flex-row items-center gap-2">
                <li>
                  <span className="sr-only">Wheelchair accessible</span>
                  <Icon
                    name="Wheelchair"
                    width={24}
                    height={24}
                    ariaVisible={false}
                  />
                </li>
                <li>
                  <span className="sr-only">Closed captions</span>
                  <Icon
                    name="Captions"
                    width={36}
                    height={36}
                    ariaVisible={false}
                  />
                </li>
              </ul>
            </div>
            <Button className="w-full lg:w-auto">View performances</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

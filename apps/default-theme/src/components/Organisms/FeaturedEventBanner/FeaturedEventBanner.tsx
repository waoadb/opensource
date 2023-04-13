// Components
import Image from 'next/image';
import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import { Button } from '@/components/Atoms/Button/Button';
import { IconList } from '@/components/Molecules/IconList/IconList';

export const FeaturedEventBanner = () => {
  return (
    <div className="relative flex h-96 w-full flex-col overflow-hidden md:min-h-70vh lg:h-auto">
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-black/40">
        <Image
          className="absolute h-full w-full object-cover object-center"
          src="https://picsum.photos/1920/1080"
          alt="Featured event image"
          fill={true}
          priority={true}
        />
      </div>
      <div className="relative mt-auto w-full text-white">
        <div className="container mx-auto">
          <div className="space-y-2 md:space-y-4 pb-8">
            <Heading level="h1" className="... block truncate leading-tight">
              <span>Featured title here</span>
            </Heading>
            <Paragraph variant="large">
              Date: Mon 01 May 2023 - 21:00pm
            </Paragraph>
            <div>
              <span className="sr-only">Facilities available</span>
              <IconList />
            </div>
            <Button className="w-full lg:w-auto">Book now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

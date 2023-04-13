import { Heading } from '@/components/Atoms/Heading/Heading';
import { Paragraph } from '@/components/Atoms/Paragraph/Paragraph';
import Link from 'next/link';

export const SupportDetails = () => {
  return (
    <div>
      <Heading level="h3" style="h4">Support details</Heading>
      <address>
        <Paragraph className="mb-2 not-italic">
          <span className="block" aria-label="Address line 1">Address line 1 </span>
          <span className="block" aria-label="Address line 2">Address line 2 </span>
          <span className="block" aria-label="Address line 3">Address line 3 </span>
          <span className="block" aria-label="Postcode, City">Postcode, City </span>
          <span className="block" aria-label="Country">Country</span>
        </Paragraph>
        <Paragraph className="mb-2 not-italic">
          <Link href="mailto:email@domain.com" className="block" aria-label="Email address">email@domain.com</Link>
          <Link href="tel:+447376411671" className="block" aria-label="Phone number">+44 7376 411 671</Link>
        </Paragraph>
      </address>
    </div>
  );
};

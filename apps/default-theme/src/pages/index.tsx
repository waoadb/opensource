import { DifferentBreedClient } from '@waoadb/js-client-sdk';

export default function Home() {
  const x = new DifferentBreedClient({ clientAPIKey: 'xxx', profileId: '123' });
  console.log(x);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>APIKey: {process.env.NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY}</p>
    </main>
  );
}

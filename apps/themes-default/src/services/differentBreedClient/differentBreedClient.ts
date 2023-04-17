/* Dependencies */
import { DifferentBreedClient } from '@waoadb/js-client-sdk';

// Export client instance.
export const differentBreedClient = new DifferentBreedClient({
  profileId: process.env.NEXT_PUBLIC_DIFFERENT_BREED_PROFILE_ID as string,
  clientAPIKey: process.env.NEXT_PUBLIC_DIFFERENT_BREED_CLIENT_KEY as string,
});

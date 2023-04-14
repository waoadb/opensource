/* Dependencies */
import { DifferentBreedAdmin } from '@waoadb/js-admin-sdk';

// Export client instance.
export const differentBreedAdmin = new DifferentBreedAdmin({
  profileId: process.env.NEXT_PUBLIC_DIFFERENT_BREED_PROFILE_ID as string,
  adminAPIKey: process.env.DIFFERENT_BREED_PROFILE_ADMIN_API_KEY as string,
});

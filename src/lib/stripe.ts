
import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = 'pk_test_51QZdXWAzauoKt3zzuou0nWiwiu30MbvdAG0Hog_LjLTNKQu4VLkOY3tBeLwOEKxmJGJ76bSzNmVOGDJ6gUn7xYeQ00sb_publishable_uou0nWiwiu30MbvdAG0Hog_LjLTNKQu';

export const stripePromise = loadStripe(stripePublicKey);

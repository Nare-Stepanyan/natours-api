import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51KNbc3LjyatOwj1NuzWblAhiL0rG7tom5xGVFmGQ30alWGvTqaVDM15nnmwesDK5ogmHYEAbwwosusukegGEPmMi00Ztz9uf0w'
  );
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

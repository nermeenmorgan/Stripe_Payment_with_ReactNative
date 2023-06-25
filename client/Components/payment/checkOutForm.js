// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';

// export default function CheckoutForm() {
//   const { confirmPayment, createPaymentMethod } = useStripe();
//   const [loading, setLoading] = useState(false);
//   const [checkoutError, setCheckoutError] = useState(null);
//   const [billingDetails, setBillingDetails] = useState({
//     name: '',
//     email: '',
//   });

//   const handlePayPress = async () => {
//     setLoading(true);

//     const { paymentMethod, error } = await createPaymentMethod({
//       type: 'Card',
//       billingDetails: {
//         name: billingDetails.name,
//         email: billingDetails.email,
//       },
//     });

//     if (error) {
//       console.log('Payment method creation error', error);
//       setCheckoutError(error.message);
//       setLoading(false);
//       return;
//     }

//     try {
//       const clientSecret = await createPaymentIntent(paymentMethod.id);

//       const { paymentIntent, error: paymentError } = await confirmPayment(clientSecret, {
//         paymentMethodId: paymentMethod.id,
//       });

//       if (paymentError) {
//         console.log('Payment confirmation error', paymentError);
//         setCheckoutError(paymentError.message);
//       } else if (paymentIntent) {
//         console.log('Payment succeeded', paymentIntent);
//       }
//     } catch (error) {
//       console.log('Create PaymentIntent error', error);
//       setCheckoutError('Failed to create PaymentIntent.');
//     }

//     setLoading(false);
//   };

//   const createPaymentIntent = async (paymentMethodId) => {
//     try {
//       const response = await fetch('http://localhost:5253/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           currency: 'usd',
//           paymentMethodId,
//         }),
//       });

//       const { clientSecret } = await response.json();
//       return clientSecret;
//     } catch (error) {
//       throw new Error('Failed to create PaymentIntent.');
//     }
//   };

//   return (
//     <View>
//       <Text>Name:</Text>
//       <TextInput
//         value={billingDetails.name}
//         onChangeText={(text) => setBillingDetails((prev) => ({ ...prev, name: text }))}
//       />
//       <Text>Email:</Text>
//       <TextInput
//         value={billingDetails.email}
//         onChangeText={(text) => setBillingDetails((prev) => ({ ...prev, email: text }))}
//       />
//       <Button title="Pay" onPress={handlePayPress} disabled={loading} />
//       {checkoutError && <Text style={{ color: 'red' }}>{checkoutError}</Text>}
//     </View>
//   );
// }

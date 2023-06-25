import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';

const Shopping = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { confirmPaymentMethod, setOptions } = useStripe();
  const { confirmPayment } = useConfirmPayment();

  useEffect(() => {
    // Fetch the client secret from the server
    fetch('http://192.168.1.19:5253/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Error fetching client secret:', error);
      });

    // Set the publishable key
    setOptions({
      publishableKey: 'pk_test_51NKzz8GrS3wxzFb18a6fDicJKSVB1iPepL8SUCFexsSvb9QQdRz0XMKfpBMEEaEPnAIujRlGCVcsfwFlrQys85UJ000E3EKgGP',
    });
  }, []);

  const handlePayment = async () => {
    try {
      const { paymentMethod, error } = await confirmPayment(); // Corrected line

      if (error) {
        // Payment method confirmation failed
        console.log('Payment method confirmation failed:', error);
      } else {
        // Payment method confirmed successfully
        const { id: paymentMethodId } = paymentMethod;

        // Call the server to confirm the payment
        const response = await fetch('http://192.168.1.19:5253/create-customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'customer@example.com',
            paymentMethod: paymentMethodId,
            amount: 1000, // Replace with the actual amount
            currency: 'USD', // Replace with the actual currency
          }),
        });

        if (response.ok) {
          // Payment successful
          console.log('Payment successful');
        } else {
          // Payment failed
          console.log('Payment failed');
        }
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <View>
      <Text>Client Component</Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
      />
      <Button title="Make Payment" onPress={handlePayment} />
    </View>
  );
};

export default Shopping;

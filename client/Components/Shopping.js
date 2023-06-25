import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Shopping() {
  const { confirmPayment, createPaymentMethod } = useStripe({ publishableKey: "pk_test_51NKzz8GrS3wxzFb18a6fDicJKSVB1iPepL8SUCFexsSvb9QQdRz0XMKfpBMEEaEPnAIujRlGCVcsfwFlrQys85UJ000E3EKgGP" });
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null); // State variable for client secret

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
  });

  // const [paymentMethod, setPaymentMethod] = useState('card');
  // const paymentMethodType = 'card';
 

  // const handlePaymentMethodChange = (value) => {
  //   setPaymentMethod(value);
  // };
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


   
  }, []);

  const handlePayPress = async () => {
    setLoading(true);

    if (!paymentMethod) {
      setPaymentError('You must provide a payment method type!');
      setLoading(false);
      return;
    }

    const { paymentMethod, error } = await createPaymentMethod({
      type: "card",
      billingDetails: {
        name: billingDetails.name,
        email: billingDetails.email,
      },
    });

    if (error) {
      console.log('Payment method creation error', error);
      setPaymentError(error.message || 'Something went wrong');
      setLoading(false);
      return;
    }

    try {
      const clientSecret = await createPaymentIntent(paymentMethod.id);

      const { paymentIntent, error: paymentError } = await confirmPayment(clientSecret, {
        paymentMethodId: paymentMethod.id,
      });

      if (paymentError) {
        console.log('Payment confirmation error', paymentError);
        setPaymentError(paymentError.message || 'Something went wrong');
      } else if (paymentIntent) {
        console.log('Payment succeeded', paymentIntent);
        setPaymentError(null);
        // Handle successful payment
      }
    } catch (error) {
      console.log('Create PaymentIntent error', error);
      setPaymentError(error.message || 'Something went wrong');
    }

    setLoading(false);
  };

  const createPaymentIntent = async (paymentMethodId) => {
    try {
      const response = await fetch('http://localhost:5253', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'usd',
          paymentMethodId,
        }),
      });

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      throw new Error('Failed to create PaymentIntent.');
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
    <View>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
       <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10, color:"#112D4E" }}>
        Checkout
       </Text>
       <Icon name="credit-card" size={30} color="#112D4E" />
      </View>
      <View style={{backgroundColor:"#112D4E", width:"100%", height:"3%"}}></View>
    </View>
    <View>
      <Text style={{fontSize:16}}>
        Your Invoice
      </Text>
      <View style={{borderRadius: 5,
    elevation:0.6,
    
     flexDirection:"row", padding:"5%", margin:"3%", justifyContent:"space-between"}} >
<Text>#smth</Text>
<Text>20 USD</Text>
      </View>
    </View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Card Information</Text>
      <Text>Name:</Text>
      <TextInput style={{borderWidth:1, padding:"5%", margin:"3%",  borderStyle: "solid",
    borderColor: "#3F72AF", padding:"4%"}} type="name" placeholder='Full Name'></TextInput>
      <TextInput
        value={billingDetails.name}
        onChangeText={(text) => setBillingDetails((prev) => ({ ...prev, name: text }))}
      />
      <Text>Email:</Text>
      <TextInput style={{borderWidth:1, padding:"5%", margin:"3%",  borderStyle: "solid",
    borderColor: "#3F72AF", padding:"4%"}} type="name" placeholder='nermeen.morgan99@gmail.com'></TextInput>
      <TextInput
        value={billingDetails.email}
        onChangeText={(text) => setBillingDetails((prev) => ({ ...prev, email: text }))}
      />
      <CardField
        postalCodeEnabled={false}
        style={{ height: 50, marginBottom:"5%" , borderColor:"#112D4E", borderStyle:"solid", borderWidth:20}}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
      />
      <Button
      style={{borderRadius:20}}
      color="#3F72AF"
      
        title={loading ? 'Loading...' : 'Pay Now'}
        disabled={loading}
        onPress={handlePayPress}
      />
      {paymentError && (
        <Text style={{ color: 'red', marginTop: 10 }}>{paymentError}</Text>
      )}
    </View>
  );
}

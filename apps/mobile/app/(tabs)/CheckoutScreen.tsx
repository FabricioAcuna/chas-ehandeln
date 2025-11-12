import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useCart } from '@/components/CartContext';

// TODO: Integrate PayPal SDK
// import { PayPalButton } from '@paypal/react-native-paypal';
// or use WebView for PayPal checkout

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.zipCode || !formData.phone) {
      Alert.alert('Fel', 'Vänligen fyll i alla fält');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Fel', 'Vänligen ange en giltig e-postadress');
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // TODO: Integrate PayPal payment
      // Example flow:
      // 1. Create PayPal order
      // 2. Process payment
      // 3. On success, create order in backend
      // 4. Clear cart and navigate to confirmation

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Replace with actual PayPal integration
      // const paypalOrder = await createPayPalOrder({
      //   amount: total,
      //   currency: 'SEK',
      //   items: items.map(item => ({
      //     name: item.name,
      //     quantity: item.quantity,
      //     price: item.price,
      //   })),
      // });

      // For now, simulate successful payment
      Alert.alert('Betalning lyckades', 'Din order har bekräftats!', [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.push('/(tabs)/OrderConfirmationScreen');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Fel', 'Betalningen misslyckades. Försök igen.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Kassa</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leveransinformation</Text>
        <TextInput
          style={styles.input}
          placeholder="Namn"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-post"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Adress"
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stad"
          value={formData.city}
          onChangeText={(value) => handleInputChange('city', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Postnummer"
          keyboardType="numeric"
          value={formData.zipCode}
          onChangeText={(value) => handleInputChange('zipCode', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefonnummer"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orderöversikt</Text>
        {items.map((item) => (
          <View key={item.documentId} style={styles.orderItem}>
            <Text style={styles.orderItemName}>
              {item.name} {item.size && `(${item.size})`}
            </Text>
            <Text style={styles.orderItemPrice}>
              {item.quantity} × {item.price} kr = {item.quantity * item.price} kr
            </Text>
          </View>
        ))}
        <View style={styles.orderTotal}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>{total} kr</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Betalning</Text>
        <Text style={styles.paymentInfo}>
          Betalning sker via PayPal. Du kommer att omdirigeras till PayPal för att slutföra betalningen.
        </Text>
        {/* TODO: Add PayPal button component */}
        {/* <PayPalButton
          amount={total}
          currency="SEK"
          onSuccess={handleCheckout}
          onError={(error) => Alert.alert('Fel', error.message)}
        /> */}
      </View>

      <View style={styles.checkoutActions}>
        <TouchableOpacity
          style={[styles.checkoutButton, isProcessing && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={isProcessing}
        >
          <Text style={styles.checkoutButtonText}>
            {isProcessing ? 'Bearbetar...' : 'Bekräfta beställning'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Tillbaka</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.cardBackground,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: Colors.light.text,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  orderItemName: {
    fontSize: 14,
    color: Colors.light.text,
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: Colors.light.border,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  paymentInfo: {
    fontSize: 14,
    color: Colors.light.icon,
    lineHeight: 20,
    marginBottom: 16,
  },
  checkoutActions: {
    padding: 20,
    gap: 12,
    paddingBottom: 40,
  },
  checkoutButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: Colors.light.icon,
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  backButtonText: {
    color: Colors.light.text,
    fontWeight: '600',
    fontSize: 16,
  },
});

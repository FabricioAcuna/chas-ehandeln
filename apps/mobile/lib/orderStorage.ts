import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDERS_STORAGE_KEY = 'local-orders';

export interface LocalOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'paid' | 'pending' | 'shipped';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    size?: string;
  }>;
}

export const getLocalOrders = async (): Promise<LocalOrder[]> => {
  try {
    const stored = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

export const saveLocalOrder = async (order: LocalOrder): Promise<void> => {
  try {
    const existingOrders = await getLocalOrders();
    const updatedOrders = [order, ...existingOrders];
    await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};


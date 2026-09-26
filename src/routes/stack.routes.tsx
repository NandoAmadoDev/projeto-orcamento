import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@/app/Home';
import { NewQuote } from '@/app/NewQuote';

export type StackRoutesList = {
  Home: undefined;
  NewQuote: undefined;
};

const Stack = createNativeStackNavigator<StackRoutesList>();

export function StackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="NewQuote"
        component={NewQuote}
      />
    </Stack.Navigator>
  );
}
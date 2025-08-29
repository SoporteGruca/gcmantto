import { Redirect } from 'expo-router';
import { Provider } from 'mobx-react';
import userStore from '../store';

export default function Index() {
  return (
    <Provider store={userStore}>
      <Redirect href="/Login" />
    </Provider>
  );
}
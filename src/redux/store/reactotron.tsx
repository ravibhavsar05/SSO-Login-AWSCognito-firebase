import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, {networking} from 'reactotron-react-native';
// import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = {
  initiate: () => {
    if (__DEV__) {
      Reactotron.configure({
        name: 'My App',
        // createSocket: (path) => new ReactotronFlipper(path),
      })
        .useReactNative()
        .use(networking({ignoreUrls: /\/(generate_204)$/}))
        .setAsyncStorageHandler(AsyncStorage)
        .use(reactotronRedux())
        .connect();
    }
  },
  createEnhancer: () => Reactotron.createEnhancer(),
};
export default reactotron;

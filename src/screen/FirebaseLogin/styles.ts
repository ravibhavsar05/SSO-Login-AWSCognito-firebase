import {StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: TextStyle;
  heading: TextStyle;
  subHeader: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginLeft: '6%',
    marginRight: '6%',
  },
  heading: {
    marginBottom: 10,
  },
  subHeader: {
    marginBottom: 30,
  },
});

export default styles;

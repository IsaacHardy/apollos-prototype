import { Image } from 'react-native';

import { styled } from '@apollosproject/ui-kit';

const Barcode = styled(({ theme }) => ({
  width: '50%',
  aspectRatio: 1,
  resizeMode: 'contain',
  backgroundColor: theme.colors.white,
  alignSelf: 'center',
  marginBottom: theme.sizing.baseUnit,
  borderRadius: theme.sizing.baseUnit * 0.5,
}))(Image);

export default Barcode;

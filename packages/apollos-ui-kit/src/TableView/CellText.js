import { UIText } from '../typography';
import styled from '../styled';

const CellText = styled(({ theme }) => ({
  flexGrow: 1,
  flexShrink: 1,
  paddingLeft: theme.sizing.baseUnit / 2,
  paddingRight: theme.sizing.baseUnit / 2,
}))(UIText);

export default CellText;

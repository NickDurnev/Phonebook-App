import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-weight: ${props => props.theme.mainTextFontWeight};
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.listItemBcgColor};
  border-radius: 5px;

  & img {
    width: 48px;
  }
`;

export const ButtonWrap = styled.div`
  width: 90px;
  display: flex;
  justify-content: space-between;
`;

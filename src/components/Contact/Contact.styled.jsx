import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-weight: ${props => props.theme.mainTextFontWeight};
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.listItemBcgColor};
  border-radius: 5px;

  & > span {
    width: 35%;
    text-transform: capitalize;
  }
`;

export const ButtonWrap = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
`;

export const EditIcon = styled(FiEdit)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const DeleteIcon = styled(AiFillDelete)`
  width: 100%;
  height: auto;

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

export const FavoriteIcon = styled(AiFillStar)`
  width: 100%;
  height: auto;

  fill: ${({ favorite, theme }) => (favorite ? theme.bgElementColor : 'none')};
  stroke-width: 100;
  stroke: ${({ theme }) => theme.bgElementColor};

  color: ${({ theme }) => theme.bgElementColor};
  transform: scale(1);
  transition: transform ${({ theme }) => theme.animationDuration}
    ${({ theme }) => theme.animationTimeFunction};

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

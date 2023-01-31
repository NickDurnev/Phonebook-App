import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';

interface IProps {
  favorite: number;
}

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-weight: ${({ theme }) => theme.mainTextFontWeight};
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.listItemBcgColor};
  border-radius: 5px;

  &>div {
    margin-right:10px;
  }

  & > span {
    width: 35%;
    text-transform: capitalize;
  }
`;

export const ButtonWrap = styled.div`
  width: 20%;
  margin-left:10px;
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

export const FavoriteIcon = styled(AiFillStar) <IProps>`
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

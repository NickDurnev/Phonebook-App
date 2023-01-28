import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { forwardRef } from 'react';
import changeTheme from '../../redux/theme/theme-actions';
import { setDropListOpen } from '../../redux/isOpen/isOpen-actions';
import { light, dark, blue } from '../../config/themes';
import List from './DropList.styled';
import Button from '../Button';
import { ITheme } from '../../services/interfaces';

const DropList = forwardRef<HTMLUListElement>((props, ref) => {
  const themes = useRef([light, dark, blue]);

  const dispatch = useDispatch();

  const handleChangeTheme = (theme: ITheme) => {
    dispatch(changeTheme(theme));
    dispatch(setDropListOpen(false));
  };

  return (
    <List ref={ref}>
      {themes.current.map(theme => (
        <li key={theme.name}>
          <Button
            key={theme.name}
            onClick={() => {
              handleChangeTheme(theme);
            }}
            padding="5px 10px"
          >
            {theme.name}
          </Button>
        </li>
      ))}
    </List>
  );
});

export default DropList;

import React from 'react';
import { Wrap, Icon, DefaultIcon } from './Avatar.styled';

interface IProps {
  imageURL: string,
  width: string
}

const Avatar:React.FC<IProps> = ({ imageURL, width }) => {
  return (
    <Wrap width={width}>
      {imageURL ? <Icon src={imageURL} /> : <DefaultIcon size="100" />}
    </Wrap>
  );
};

export default Avatar;

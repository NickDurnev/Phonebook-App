import { useRef } from 'react';
import Button from 'components/Button';
import { Wrap, Input } from './FileUploader.styled';

const FileUploader = props => {
  const hiddenFileInput = useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  return (
    <Wrap>
      <Button onClick={handleClick}>Upload avatar</Button>
      <Input
        type="file"
        name="picture"
        accept="image/*"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </Wrap>
  );
};

export default FileUploader;

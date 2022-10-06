import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Wrap, Input, Button } from './FileUploader.styled';

const FileUploader = ({ handleFile, children }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <Wrap>
      <Button type="button" onClick={handleClick}>
        {children}
      </Button>
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

FileUploader.propTypes = {
  handleFile: PropTypes.func.isRequired,
};

export default FileUploader;

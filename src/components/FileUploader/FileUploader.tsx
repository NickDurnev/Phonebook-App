import { useRef, ReactNode, FC, MouseEvent, ChangeEvent } from 'react';
import { Wrap, Input, Button } from './FileUploader.styled';

interface IProps {
  handleFile: (a: File) => void;
  children: ReactNode;
}

const FileUploader: FC<IProps> = ({ handleFile, children }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    hiddenFileInput.current!.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileUploaded = e.target!.files[0];
      handleFile(fileUploaded);
    }
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

export default FileUploader;

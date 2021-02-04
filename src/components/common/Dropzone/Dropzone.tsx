import React from 'react';
import { useDropzone } from 'react-dropzone';

interface IRenderProps {
  onClick?: (event: React.SyntheticEvent) => void;
}

interface IProps {
  onDrop?: (files: any[]) => void;
  children: (props: IRenderProps) => void;
  multiple?: boolean;
  accept?: string | string[];
}

const Dropzone: React.FC<IProps> = ({ onDrop, multiple, accept, children }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple, accept });
  const { onClick } = getRootProps();

  return (
    <>
      <input {...getInputProps()} multiple={false} />
      {children({ onClick })}
    </>
  );
};

export default Dropzone;

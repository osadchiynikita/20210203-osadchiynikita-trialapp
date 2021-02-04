import React, { useCallback } from 'react';
import { Button, Col, Input, message, Modal, Row } from 'antd';
import Dropzone from 'components/common/Dropzone';

interface IProps {
  value: string;
  onChange: (value: any) => void;
}

const InputCSV: React.FC<IProps> = ({ value, onChange }) => {
  const showConfirm = useCallback(
    (result: any) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This field is already contains data, do you want to replace?',
        onOk() {
          onChange(result);
        }
      });
    },
    [onChange]
  );

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();

        reader.onabort = () => message.error('file reading was aborted');
        reader.onerror = () => message.error('file reading has failed');
        reader.onload = () => {
          message.success('File uploaded');

          return value ? showConfirm(reader.result) : onChange(reader.result);
        };

        reader.readAsText(file);
      });
    },
    [onChange, showConfirm, value]
  );

  return (
    <Row gutter={24}>
      <Col span={20}>
        <Input readOnly placeholder={'Upload file...'} value={value} />
      </Col>

      <Col span={4}>
        <Dropzone onDrop={onDrop} multiple={false} accept="text/csv">
          {({ onClick }) => <Button onClick={onClick}>Upload</Button>}
        </Dropzone>
      </Col>
    </Row>
  );
};

export default InputCSV;

import React, { useCallback } from 'react';
import { Field, Form } from 'react-final-form';
import { Row, Col, Button, Input, InputNumber, Select, Form as AntForm, Typography, Modal, message } from 'antd';
import Dropzone from '../common/Dropzone';
import styles from './UserForm.module.scss';

const { Option } = Select;
const { Title } = Typography;

interface IProps {
  onFormSave: (values: any) => void;
}

interface IInputCSVProps {
  value: string;
  onChange: (value: any) => void;
}

const InputCSV: React.FC<IInputCSVProps> = ({ value, onChange }) => {
  const showConfirm = (result: any) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'This field is already contains data, do you want to replace?',
      onOk() {
        onChange(result);
      }
    });
  };

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
    [onChange]
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

const UserForm: React.FC<IProps> = ({ onFormSave }) => {
  const onSubmit = (values: any) => onFormSave(values);

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, submitting, pristine, invalid }) => {
          return (
            <>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className={styles.formSection}>
                  <Title level={4}>User</Title>

                  <Row gutter={24}>
                    <Col span={12}>
                      <AntForm.Item label={'Name'}>
                        <Field name="name" render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'Gender'}>
                        <Field
                          name="gender"
                          render={({ input }) => (
                            <Select showSearch {...input}>
                              <Option value="male">Male</Option>
                              <Option value="female">Female</Option>
                              <Option value="unspecified">Unspecified</Option>
                            </Select>
                          )}
                        />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'Age'}>
                        <Field name="age" render={({ input }) => <InputNumber {...input} min={0} max={120} />} />
                      </AntForm.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12}>
                      <AntForm.Item label={'Email'}>
                        <Field name="email" render={({ input }) => <Input {...input} type="email" />} />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'Country'}>
                        <Field name="country" render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'City'}>
                        <Field name="city" render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                  </Row>
                </div>

                <div className={styles.formSection}>
                  <Title level={4}>Input CSV Data</Title>
                  <Field name="csv" render={({ input }) => <InputCSV {...input} />} />
                </div>

                <div className={styles.formSection}>
                  <Row justify={'center'}>
                    <Button htmlType={'submit'} type={'primary'} disabled={submitting || pristine || invalid}>
                      Continue
                    </Button>
                  </Row>
                </div>
              </form>
            </>
          );
        }}
      />
    </div>
  );
};

export default UserForm;

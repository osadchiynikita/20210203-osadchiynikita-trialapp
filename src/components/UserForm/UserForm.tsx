import React from 'react';
import { Field, Form } from 'react-final-form';
import { Row, Col, Button, Input, Select, Form as AntForm, Typography } from 'antd';
import { required } from './validation';
import styles from './UserForm.module.scss';

import InputCSV from './InputCSV';

const { Option } = Select;
const { Title } = Typography;

interface IProps {
  onFormSave: (values: any) => void;
  initialValues?: Record<string, any>;
}

const UserForm: React.FC<IProps> = ({ onFormSave, initialValues }) => {
  const onSubmit = (values: any) => onFormSave(values);

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, invalid }) => {
          return (
            <>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className={styles.formSection}>
                  <Title level={4}>User</Title>

                  <Row gutter={24}>
                    <Col span={12}>
                      <AntForm.Item label={'Name'}>
                        <Field name="name" validate={required} render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'Gender'}>
                        <Field
                          name="gender"
                          validate={required}
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
                        <Field name="age" validate={required} render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12}>
                      <AntForm.Item label={'Email'}>
                        <Field
                          name="email"
                          validate={required}
                          render={({ input }) => <Input {...input} type="email" />}
                        />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'Country'}>
                        <Field name="country" validate={required} render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                    <Col span={6}>
                      <AntForm.Item label={'City'}>
                        <Field name="city" validate={required} render={({ input }) => <Input {...input} />} />
                      </AntForm.Item>
                    </Col>
                  </Row>
                </div>

                <div className={styles.formSection}>
                  <Title level={4}>Input CSV Data</Title>
                  <Field name="fileData" validate={required} render={({ input }) => <InputCSV {...input} />} />
                </div>

                <div className={styles.formSection}>
                  <Row justify={'center'}>
                    <Button htmlType={'submit'} type={'primary'} disabled={submitting || invalid}>
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

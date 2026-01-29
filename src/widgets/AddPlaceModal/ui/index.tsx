import { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Steps } from 'antd';
import { CATEGORIES } from '../../../entities/place/constants';
import { ACCESSIBILITY_DESCRIPTIONS } from '../../../entities/accessibility/constants';
import { LOCALITY } from '../../../entities/locality/constants';
import { Locality } from '../../../entities/locality/model/types';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  showModal: boolean;
  onClose: () => void;
};

export const AddPlaceModal = ({ showModal, onClose }: Props) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const getCategories = () => {
    return Object.values(CATEGORIES || {});
  };

  const getAccessibilityOptions = () => {
    if (typeof ACCESSIBILITY_DESCRIPTIONS === 'object' && ACCESSIBILITY_DESCRIPTIONS !== null) {
      return Object.entries(ACCESSIBILITY_DESCRIPTIONS).map(([key, description]) => ({
        value: key,
        label: description,
      }));
    }
    return [];
  };

  const steps = [
    {
      title: 'Основная информация',
      content: (
        <>
          <Form.Item
            name="localityId"
            label="Населенный пункт"
            rules={[{ required: true, message: 'Выберите населенный пункт' }]}
          >
            <Select placeholder="Выберите город">
              {LOCALITY.map((locality: Locality) => (
                <Option key={locality.id} value={locality.id}>
                  {locality.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="Адрес"
            rules={[{ required: true, message: 'Введите адрес' }]}
          >
            <Input placeholder="Улица, дом, корпус" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Название места"
            rules={[
              {
                required: true,
                message: 'Введите название места',
                min: 3,
                max: 100,
              },
            ]}
          >
            <Input placeholder="Например: Кафе 'Уютное место'" />
          </Form.Item>

          <Form.Item name="description" label="Описание места">
            <TextArea
              rows={3}
              placeholder="Опишите место, его особенности..."
              maxLength={500}
              showCount
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Категория и контакты',
      content: (
        <>
          <Form.Item
            name="categoryId"
            label="Категория места"
            rules={[{ required: true, message: 'Выберите категорию' }]}
          >
            <Select placeholder="Выберите категорию">
              {getCategories().map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              {
                pattern: /^[\d\s\-+()]{5,20}$/,
                message: 'Введите корректный номер телефона',
              },
            ]}
          >
            <Input placeholder="+7 (999) 123-45-67" />
          </Form.Item>

          <Form.Item
            name="website"
            label="Веб-сайт"
            rules={[
              {
                type: 'url',
                message: 'Введите корректный URL (например: https://example.com)',
              },
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item name="workHours" label="Режим работы">
            <Input placeholder="Пн-Пт: 9:00-18:00, Сб-Вс: 10:00-16:00" />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Доступность',
      content: (
        <div>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Отметьте доступные удобства для людей с ограниченными возможностями
          </p>
          <Form.Item name="accessibility" initialValue={[]}>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row gutter={[16, 16]}>
                {getAccessibilityOptions().map((option) => (
                  <Col span={12} key={option.value}>
                    <Checkbox
                      value={option.value}
                      style={{ display: 'flex', alignItems: 'flex-start' }}
                    >
                      <span style={{ marginLeft: 8 }}>{option.label}</span>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            name="additionalAccessibilityInfo"
            label="Дополнительная информация о доступности"
          >
            <TextArea rows={2} placeholder="Любая дополнительная информация..." maxLength={300} />
          </Form.Item>
        </div>
      ),
    },
  ];

  const next = () => {
    const fieldNames = steps[currentStep].content.props.children
      .filter((child: { props?: { name?: string } }) => child && child.props && child.props.name)
      .map((child: { props: { name: string } }) => child.props.name);

    form
      .validateFields(fieldNames)
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      message.success('Добавленное место отправлено на модерацию!');

      form.resetFields();
      setCurrentStep(0);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Ошибка при добавлении места. Проверьте правильность заполнения формы.');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentStep(0);
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>Добавить новое место</span>
        </div>
      }
      open={showModal}
      onCancel={handleCancel}
      width={700}
      footer={null}
      destroyOnClose
      style={{ top: 20 }}
    >
      <div style={{ marginBottom: 24 }}>
        <Steps
          aria-hidden={true}
          current={currentStep}
          items={steps.map((item) => ({
            title: item.title,
            description: currentStep === steps.indexOf(item) ? 'Текущий шаг' : '',
          }))}
          size="small"
        />
      </div>

      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: '16px' }}
        initialValues={{
          accessibility: [],
        }}
      >
        {steps[currentStep].content}
      </Form>

      <div
        style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '16px',
        }}
      >
        <div>{currentStep > 0 && <Button onClick={prev}>Назад</Button>}</div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={handleCancel}>Отмена</Button>

          {currentStep < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              Далее
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmit} style={{ minWidth: '120px' }}>
              Добавить место
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

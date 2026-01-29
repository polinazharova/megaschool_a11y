import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Rate,
  Row,
  Space,
  Steps,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DislikeOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Accessibility } from '../../../entities/accessibility/model/types';
import {
  ACCESSIBILITY_CONFIG,
  ACCESSIBILITY_DESCRIPTIONS,
} from '../../../entities/accessibility/constants';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface Props {
  visible: boolean;
  onCancel: () => void;
  placeName?: string;
  existingAccessibility?: Accessibility[];
  isMobileState?: boolean;
}

export const RatingModal = ({
  visible,
  onCancel,
  placeName,
  existingAccessibility = [],
  isMobileState = false,
}: Props) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);

  const steps = [
    {
      title: 'Оценка',
      description: 'Оцените место',
    },
    {
      title: 'Доступность',
      description: 'Подтвердите удобства',
    },
    {
      title: 'Отзыв',
      description: 'Напишите комментарий',
    },
  ];

  const ratingLabels = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

  const handleAccessibilityToggle = (type: string) => {
    setSelectedAccessibility((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleNext = () => {
    if (currentStep === 0 && rating === 0) {
      message.warning('Пожалуйста, поставьте оценку');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      message.success('Спасибо за вашу оценку!');
      resetForm();
      onCancel();
    } catch (error) {
      console.error('Form validation failed:', error);
      message.error('Пожалуйста, заполните все обязательные поля');
    }
  };

  const resetForm = () => {
    form.resetFields();
    setRating(0);
    setSelectedAccessibility([]);
    setWouldRecommend(null);
    setCurrentStep(0);
  };

  const renderRatingStep = () => (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Как вам это место?
      </Title>

      <div style={{ marginBottom: 24 }}>
        <Rate
          aria-label={'Выберите количество рейтинговых звезд'}
          value={rating}
          onChange={setRating}
          onHoverChange={setHoverRating}
          character={({ index = 0 }) => {
            const value = hoverRating || rating;
            return index < value ? (
              <StarFilled style={{ fontSize: 48, color: '#faad14' }} />
            ) : (
              <StarOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
            );
          }}
          style={{ fontSize: 48 }}
        />
      </div>

      <Text style={{ fontSize: 18, display: 'block', marginBottom: 8 }}>
        {ratingLabels[rating - 1] || 'Поставьте оценку'}
      </Text>

      <div style={{ marginTop: 32 }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          Вы бы порекомендовали это место другим?
        </Title>
        <Space size={16}>
          {isMobileState ? (
            <Space
              direction="vertical"
              size={12}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <Button
                type={wouldRecommend === true ? 'primary' : 'default'}
                icon={<LikeOutlined aria-hidden={true} />}
                size="large"
                onClick={() => setWouldRecommend(true)}
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: '12px',
                  borderColor: wouldRecommend === true ? '#52c41a' : undefined,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>Да, рекомендую</span>
              </Button>
              <Button
                type={wouldRecommend === false ? 'primary' : 'default'}
                danger={wouldRecommend === false}
                icon={<DislikeOutlined aria-hidden={true} />}
                size="large"
                onClick={() => setWouldRecommend(false)}
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: '12px',
                  borderColor: wouldRecommend === false ? '#ff4d4f' : undefined,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>Не рекомендую</span>
              </Button>
            </Space>
          ) : (
            <Space size={16}>
              <Button
                type={wouldRecommend === true ? 'primary' : 'default'}
                icon={<LikeOutlined aria-hidden={true} />}
                size="large"
                onClick={() => setWouldRecommend(true)}
                style={{
                  padding: '8px 24px',
                  height: 'auto',
                  minWidth: '160px',
                  borderColor: wouldRecommend === true ? '#52c41a' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>Да, рекомендую</span>
              </Button>
              <Button
                type={wouldRecommend === false ? 'primary' : 'default'}
                danger={wouldRecommend === false}
                icon={<DislikeOutlined aria-hidden={true} />}
                size="large"
                onClick={() => setWouldRecommend(false)}
                style={{
                  padding: '8px 24px',
                  height: 'auto',
                  minWidth: '160px',
                  borderColor: wouldRecommend === false ? '#ff4d4f' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>Не рекомендую</span>
              </Button>
            </Space>
          )}
        </Space>
      </div>
    </div>
  );

  const renderAccessibilityStep = () => (
    <div style={{ padding: '24px 0' }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        Подтвердите доступные удобства
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Отметьте удобства, которые вы лично проверили или использовали
      </Text>

      {existingAccessibility.length > 0 ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Заявленные возможности ({existingAccessibility.length})</Text>
          </div>

          <Row gutter={[12, 12]}>
            {existingAccessibility.map((type) => {
              const description =
                ACCESSIBILITY_DESCRIPTIONS[type as keyof typeof ACCESSIBILITY_DESCRIPTIONS];
              const icon = ACCESSIBILITY_CONFIG[type].icon;
              const color = ACCESSIBILITY_CONFIG[type].color;
              const isSelected = selectedAccessibility.includes(type);

              return (
                <Col xs={12} sm={8} md={6} key={type}>
                  <Tooltip title={description}>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAccessibilityToggle(type);
                        }
                      }}
                      onClick={() => handleAccessibilityToggle(type)}
                      style={{
                        padding: '12px 8px',
                        border: `2px solid ${isSelected ? color : '#f0f0f0'}`,
                        borderRadius: 8,
                        backgroundColor: isSelected ? `${color}15` : '#fff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 24,
                          marginBottom: 8,
                          color: isSelected ? color : '#666',
                        }}
                        aria-hidden={true}
                      >
                        {icon}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 5,
                          right: 15,
                          color: isSelected ? color : '#d9d9d9',
                        }}
                      >
                        {isSelected ? (
                          <CheckCircleOutlined />
                        ) : (
                          <CloseCircleOutlined aria-hidden={true} />
                        )}
                      </div>
                      <Text
                        strong
                        style={{
                          fontSize: 11,
                          color: isSelected ? color : '#333',
                          textAlign: 'center',
                          lineHeight: 1.2,
                        }}
                      >
                        {description.split(' ')[0]}
                      </Text>
                      {description.split(' ').length > 1 && (
                        <Text
                          style={{
                            fontSize: 10,
                            color: isSelected ? color : '#666',
                            textAlign: 'center',
                            lineHeight: 1.1,
                            marginTop: 2,
                          }}
                        >
                          {description.split(' ').slice(1).join(' ')}
                        </Text>
                      )}
                    </div>
                  </Tooltip>
                </Col>
              );
            })}
          </Row>

          <Divider />

          <div style={{ marginTop: 16 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Добавить отсутствующие возможности
            </Text>
          </div>
        </>
      ) : (
        <Card>
          <Text type="secondary">
            Для этого места еще не указаны возможности доступности. Вы можете быть первым, кто их
            подтвердит!
          </Text>
        </Card>
      )}
      <TextArea
        placeholder="Если вы заметили другие доступные удобства, не указанные выше, опишите их здесь..."
        rows={3}
        style={{ marginBottom: 16 }}
      />
    </div>
  );

  const renderCommentStep = () => (
    <div style={{ padding: '24px 0' }}>
      <Title level={4} style={{ marginBottom: 24 }}>
        Напишите отзыв
      </Title>

      <Form form={form} layout="vertical">
        <Form.Item
          name="comment"
          rules={[
            { required: false, message: 'Пожалуйста, напишите отзыв' },
            { max: 2000, message: 'Отзыв не должен превышать 2000 символов' },
          ]}
        >
          <TextArea
            placeholder="Поделитесь вашим опытом посещения этого места. Что вам понравилось или не понравилось? Какие особенности доступности вы заметили?"
            rows={6}
            showCount
            maxLength={2000}
            style={{ fontSize: '16px' }}
          />
        </Form.Item>

        <div style={{ marginTop: 16 }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            <InfoCircleOutlined aria-hidden={true} style={{ marginRight: 4 }} />
            Ваш отзыв поможет другим людям с ограниченными возможностями принять решение о посещении
            этого места.
          </Text>
        </div>

        {selectedAccessibility.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Вы подтвердили удобства:
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {selectedAccessibility.map((type) => (
                <Tag
                  key={type}
                  color={
                    ACCESSIBILITY_CONFIG[type as keyof typeof ACCESSIBILITY_DESCRIPTIONS].color
                  }
                  icon={
                    <span aria-hidden={true}>
                      {ACCESSIBILITY_CONFIG[type as keyof typeof ACCESSIBILITY_DESCRIPTIONS].icon}
                    </span>
                  }
                  style={{ margin: 0 }}
                >
                  {ACCESSIBILITY_DESCRIPTIONS[type as keyof typeof ACCESSIBILITY_DESCRIPTIONS]}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </Form>
    </div>
  );

  const stepContent = [renderRatingStep(), renderAccessibilityStep(), renderCommentStep()];

  return (
    <Modal
      title={
        <div>
          <Title level={4} style={{ margin: 0 }}>
            {placeName ? `Оценить "${placeName}"` : 'Оценить место'}
          </Title>
        </div>
      }
      open={visible}
      onCancel={() => {
        resetForm();
        onCancel();
      }}
      width={800}
      footer={null}
      destroyOnClose
    >
      <Steps
        aria-hidden={true}
        current={currentStep}
        style={{ marginBottom: 8 }}
        responsive={false}
        items={steps.map((item) => ({ title: item.title, description: item.description }))}
      />

      <div style={{ minHeight: 300 }}>{stepContent[currentStep]}</div>

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{currentStep > 0 && <Button onClick={handlePrev}>Назад</Button>}</div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            onClick={() => {
              resetForm();
              onCancel();
            }}
          >
            Отмена
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="primary" onClick={handleNext}>
              Продолжить
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmit} style={{ minWidth: 120 }}>
              Отправить отзыв
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

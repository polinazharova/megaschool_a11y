import React, { RefObject, useState } from 'react';
import { Button, Card, Col, Divider, Rate, Row, Space, Tag, Tooltip, Typography } from 'antd';
import {
  BuildOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  FileOutlined,
  InfoCircleOutlined,
  StarFilled,
  StarOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Place } from '../../../entities/place/model/types';
import {
  ACCESSIBILITY_CONFIG,
  ACCESSIBILITY_DESCRIPTIONS,
} from '../../../entities/accessibility/constants';
import { CATEGORIES } from '../../../entities/place/constants';
import { LOCALITY } from '../../../entities/locality/constants';
import { RatingModal } from '../../RatingModal/ui';

const { Text, Paragraph } = Typography;

interface Props {
  place: Place;
  showRating?: boolean;
  onReportIssue?: () => void;
  onSuggestEdit?: () => void;
  isMobileState?: boolean;
  commentsRef: RefObject<HTMLDivElement>;
}

export const PlaceDetails = ({
  place,
  showRating = true,
  onReportIssue,
  onSuggestEdit,
  isMobileState = false,
  commentsRef,
}: Props) => {
  const [showRatingModal, setShowRatingModal] = useState(false);

  const categoryInfo = CATEGORIES[place.placeCategory] || {
    icon: <BuildOutlined />,
    name: place.placeCategory?.replace('_', ' '),
    color: CATEGORIES.other.color,
  };

  const formatRating = (rating: { count: string; reviews: string }) => {
    const count = parseFloat(rating.count);
    return {
      value: count,
      reviews: parseInt(rating.reviews) || 0,
      display: count.toFixed(1),
      stars: Math.round(count),
    };
  };

  const renderAccessibilityFeature = (
    icon: React.ReactNode,
    label: string,
    value: boolean | string | undefined,
    tooltip?: string
  ) => {
    return (
      <Col xs={12} sm={8} md={6} style={{ marginBottom: 16 }}>
        <Tooltip title={tooltip || label}>
          <div
            style={{
              textAlign: 'center',
              padding: '12px 8px',
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              backgroundColor: '#fafafa',
              height: '100%',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8, color: value ? '#52c41a' : '#d9d9d9' }}>
              {icon}
            </div>
            <Text strong style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
              {label}
            </Text>
            {typeof value === 'boolean' ? (
              <Tag color={value ? 'success' : 'default'} style={{ fontSize: 11 }}>
                {value ? 'Есть' : 'Нет'}
              </Tag>
            ) : (
              <Text style={{ fontSize: 12, color: '#666' }}>{value || 'Не указано'}</Text>
            )}
          </div>
        </Tooltip>
      </Col>
    );
  };

  const renderRatingSection = () => {
    if (!place.rating || !showRating) return null;

    const rating = formatRating(place.rating);

    return (
      <Card
        title={
          <Space>
            <StarFilled aria-hidden={true} style={{ color: '#faad14' }} />
            <span>Рейтинг и отзывы</span>
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: '#1890ff', lineHeight: 1 }}>
              {rating.display}
            </div>
            <Rate disabled value={rating.stars} style={{ fontSize: 20, marginBottom: 8 }} />
            <Text type="secondary">
              на основе {rating.reviews} {rating.reviews === 1 ? 'отзыва' : 'отзывов'}
            </Text>
          </div>

          <Button
            type="primary"
            ghost
            icon={<StarOutlined aria-hidden={true} />}
            size="large"
            style={{ marginBottom: 8 }}
            onClick={() => {
              setShowRatingModal(true);
            }}
          >
            Оценить место
          </Button>

          <Button
            onClick={() => {
              commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            size="small"
            style={{ fontSize: 12 }}
          >
            Посмотреть все отзывы
          </Button>
        </div>
      </Card>
    );
  };

  const renderAccessibilityFeatures = () => {
    return (
      <Card
        title={
          <Space>
            <WechatOutlined aria-hidden={true} />
            <span>Особенности доступности</span>
          </Space>
        }
        style={{ marginBottom: 24 }}
        extra={
          <Space>
            <Button
              size="small"
              onClick={onReportIssue}
              icon={<InfoCircleOutlined aria-hidden={true} />}
            >
              Сообщить об ошибке
            </Button>
            <Button size="small" onClick={onSuggestEdit}>
              Предложить правку
            </Button>
          </Space>
        }
      >
        <div style={{ marginBottom: 24 }}>
          <Text strong style={{ display: 'block', marginBottom: 16 }}>
            Основные удобства
          </Text>
          <Row gutter={[16, 16]}>
            {renderAccessibilityFeature(
              <BuildOutlined aria-hidden={true} />,
              'Лифт',
              place.hasElevator,
              'Наличие лифта в здании'
            )}

            {renderAccessibilityFeature(
              <WechatOutlined aria-hidden={true} />,
              'Пандус',
              place.hasRamp,
              'Наличие пандуса или наклонной плоскости'
            )}

            {renderAccessibilityFeature(
              <FileOutlined aria-hidden={true} />,
              'Туалет',
              place.hasDisabledToilet,
              'Специальный туалет для маломобильных посетителей'
            )}

            {renderAccessibilityFeature(
              <CarOutlined aria-hidden={true} />,
              'Парковка',
              place.parking?.available,
              'Парковка для людей с ограниченными возможностями'
            )}
          </Row>
        </div>
        {place.entranceType && (
          <div style={{ marginBottom: 24 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Тип входа
            </Text>
            <Tag color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>
              {place.entranceType === 'main' && 'Главный вход'}
              {place.entranceType === 'secondary' && 'Дополнительный вход'}
              {place.entranceType === 'service' && 'Служебный вход'}
            </Tag>
            <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
              {place.entranceType === 'main' && 'Основной вход, обычно наиболее доступный'}
              {place.entranceType === 'secondary' &&
                'Альтернативный вход, может быть более доступным'}
              {place.entranceType === 'service' && 'Вход через служебные помещения'}
            </Text>
          </div>
        )}
        {place.floor && (
          <div style={{ marginBottom: 24 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Расположение
            </Text>
            <Space>
              <Tag color="purple" style={{ fontSize: 14, padding: '4px 12px' }}>
                Этаж: {place.floor}
              </Tag>
              {place.hasElevator && <Text type="secondary">(доступно на лифте)</Text>}
            </Space>
          </div>
        )}
        {place.parking && place.parking.available && (
          <div style={{ marginBottom: 24 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>
              Парковка для людей с ОВЗ
            </Text>
            <Space direction="vertical" size={4}>
              {place.parking.type && (
                <Text>
                  Тип: {place.parking.type === 'street' && 'Уличная'}
                  {place.parking.type === 'lot' && 'Парковочная площадка'}
                  {place.parking.type === 'garage' && 'Паркинг'}
                </Text>
              )}
              {place.parking.distance && <Text>Расстояние до входа: {place.parking.distance}</Text>}
            </Space>
          </div>
        )}
        <div>
          <Text strong style={{ display: 'block', marginBottom: 16 }}>
            Специальные возможности
          </Text>
          {place.accessibility && place.accessibility.length > 0 ? (
            <Row gutter={[8, 8]}>
              {place.accessibility.map((accessType) => {
                const description =
                  ACCESSIBILITY_DESCRIPTIONS[accessType as keyof typeof ACCESSIBILITY_DESCRIPTIONS];
                const icon = ACCESSIBILITY_CONFIG[accessType].icon;
                const color = ACCESSIBILITY_CONFIG[accessType].color;

                return (
                  <Col key={accessType} xs={12} sm={8} md={6}>
                    <Tooltip title={description}>
                      <div
                        style={{
                          padding: 12,
                          border: `1px solid ${color}`,
                          borderRadius: 8,
                          backgroundColor: `${color}15`,
                          textAlign: 'center',
                          cursor: 'default',
                        }}
                      >
                        <div style={{ fontSize: 20, color, marginBottom: 8 }} aria-hidden={true}>
                          {icon}
                        </div>
                        <Text strong style={{ fontSize: 12, color, display: 'block' }}>
                          {description.split(' ')[0]}
                        </Text>
                        {description.split(' ').length > 1 && (
                          <Text style={{ fontSize: 10, color, display: 'block' }}>
                            {description.split(' ').slice(1).join(' ')}
                          </Text>
                        )}
                      </div>
                    </Tooltip>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Text type="secondary" style={{ fontStyle: 'italic' }}>
              Специальные возможности не указаны
            </Text>
          )}
        </div>
      </Card>
    );
  };

  const renderBasicInfo = () => {
    return (
      <Card
        title="Основная информация"
        style={{ marginBottom: 24 }}
        extra={
          <Tag
            aria-hidden={true}
            color={categoryInfo.color}
            icon={categoryInfo.icon}
            style={{ fontSize: 12, padding: '4px 8px' }}
          >
            {categoryInfo.name}
          </Tag>
        }
      >
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>
              <EnvironmentOutlined aria-hidden={true} style={{ marginRight: 8 }} />
              Адрес
            </Text>
            <Text>{place.address}</Text>
          </div>

          {place.localityId && (
            <div>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Населенный пункт
              </Text>
              <Text>{LOCALITY.find((locality) => locality.id === place.localityId)?.name}</Text>
            </div>
          )}

          {place.isApproved !== undefined && (
            <div>
              <Text strong style={{ display: 'block', marginBottom: 4 }}>
                Статус проверки
              </Text>
              <Space>
                {place.isApproved ? (
                  <>
                    <CheckCircleOutlined aria-hidden={true} style={{ color: '#52c41a' }} />
                    <Text style={{ color: '#52c41a' }}>Проверено модератором</Text>
                  </>
                ) : (
                  <>
                    <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                    <Text type="warning">Ожидает проверки</Text>
                  </>
                )}
              </Space>
            </div>
          )}
        </Space>
      </Card>
    );
  };

  return (
    <div>
      {renderBasicInfo()}
      {renderRatingSection()}
      {renderAccessibilityFeatures()}

      <Divider />

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Paragraph type="secondary" style={{ fontSize: 12 }}>
          Информация о доступности предоставлена пользователями. Если вы заметили неточность,
          пожалуйста, сообщите нам.
        </Paragraph>
      </div>
      <RatingModal
        visible={showRatingModal}
        onCancel={() => {
          setShowRatingModal(false);
        }}
        existingAccessibility={place.accessibility}
        placeName={place.name}
        isMobileState={isMobileState}
      />
    </div>
  );
};

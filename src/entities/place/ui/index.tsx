import React from 'react';
import { Button, Card, Col, Rate, Row, Space, Tag, Tooltip, Typography } from 'antd';
import {
  AimOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  CarOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
  StarFilled,
  WarningOutlined,
} from '@ant-design/icons';
import { Place } from '../model/types';
import { ACCESSIBILITY_CONFIG } from '../../accessibility/constants';
import { ENTRANCE_TYPE_CONFIG } from '../constants';

const { Title, Text } = Typography;

interface PlaceCardProps {
  place: Place;
  onClick: (placeId: string) => void;
  onFavoriteClick: (placeId: string) => void;
  isFavorite?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onClick,
  onFavoriteClick,
  isFavorite = false,
}) => {
  const ratingValue = parseFloat(place.rating.count) || 0;

  return (
    <Card
      tabIndex={0}
      aria-label={place.name}
      hoverable
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick?.(place.id);
        }
      }}
      onClick={() => onClick?.(place.id)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: place.isApproved ? '2px solid #52c41a' : '1px solid #f0f0f0',
        cursor: 'pointer',
        height: '100%',
        transition: 'all 0.3s ease',
      }}
      cover={
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img
            alt={place.name}
            src={place.photo || '/placeholder.jpg'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {place.isApproved && (
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: '#40a80b',
                color: 'white',
                padding: '4px 8px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <CheckCircleOutlined aria-hidden={true} />
              Подтверждено
            </div>
          )}

          {onFavoriteClick && (
            <Button
              aria-label="Добавить место в избранное"
              type="text"
              shape="circle"
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: 'none',
              }}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick(place.id);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') onFavoriteClick(place.id);
              }}
            >
              <StarFilled
                aria-hidden={true}
                style={{ color: isFavorite ? '#faad14' : '#d9d9d9' }}
              />
            </Button>
          )}
        </div>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0, marginBottom: 4 }}>
          {place.name}
        </Title>

        <Space size={4} style={{ marginBottom: 8 }}>
          <EnvironmentOutlined aria-hidden={true} style={{ color: '#343434', fontSize: 12 }} />
          <Text style={{ color: '#343434', fontSize: 12 }}>{place.address}</Text>
        </Space>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 12 }}>
          Доступность:
        </Text>
        <Space wrap size={[4, 4]}>
          {place.accessibility.map((accessType) => {
            const config = ACCESSIBILITY_CONFIG[accessType];
            return (
              <Tooltip key={accessType} title={config.label}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: `${config.color}15`,
                    border: `1px solid ${config.color}30`,
                    textAlign: 'center',
                    lineHeight: '28px',
                    fontSize: 14,
                    cursor: 'help',
                  }}
                  aria-label={config.label}
                >
                  {config.icon}
                </span>
              </Tooltip>
            );
          })}
        </Space>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space align="center" style={{ marginBottom: 4 }}>
          <Rate
            aria-hidden={true}
            disabled
            value={ratingValue}
            allowHalf
            style={{ fontSize: 14 }}
          />
          <Text
            aria-label={`Рейтинг ${ratingValue.toFixed(1)}`}
            strong
            style={{ fontSize: 14, marginRight: 10 }}
          >
            {ratingValue.toFixed(1)}
          </Text>
        </Space>
        <Text style={{ color: '#343434', fontSize: 12 }}>{place.rating.reviews} отзывов</Text>
      </div>

      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        {place.entranceType && (
          <Col>
            <Tooltip title={ENTRANCE_TYPE_CONFIG[place.entranceType].label}>
              <Tag
                color={ENTRANCE_TYPE_CONFIG[place.entranceType].color}
                style={{ margin: 0, fontSize: 10, padding: '2px 6px' }}
              >
                <PushpinOutlined aria-hidden={true} style={{ marginRight: 2 }} />
                {ENTRANCE_TYPE_CONFIG[place.entranceType].label}
              </Tag>
            </Tooltip>
          </Col>
        )}

        {place.floor && (
          <Col>
            <Tooltip title={`Этаж: ${place.floor}`}>
              <Tag
                aria-label="Этаж"
                color="default"
                style={{ margin: 0, fontSize: 10, padding: '2px 6px' }}
              >
                {place.floor.includes('-') ? (
                  <ArrowDownOutlined aria-hidden={true} style={{ marginRight: 2 }} />
                ) : (
                  <ArrowUpOutlined aria-hidden={true} style={{ marginRight: 2 }} />
                )}
                {place.floor}
              </Tag>
            </Tooltip>
          </Col>
        )}

        {place.parking?.available && (
          <Col>
            <Tooltip
              title={`Парковка: ${
                place.parking.type === 'garage'
                  ? 'гараж'
                  : place.parking.type === 'lot'
                    ? 'парковка'
                    : 'улица'
              }${place.parking.distance ? `, ${place.parking.distance}` : ''}`}
            >
              <Tag color="green" style={{ margin: 0, fontSize: 10, padding: '2px 6px' }}>
                <CarOutlined aria-hidden={true} style={{ marginRight: 2 }} />P
              </Tag>
            </Tooltip>
          </Col>
        )}
      </Row>

      <Space size={16} wrap style={{ justifyContent: 'space-between', width: '100%' }}>
        {place.hasElevator && (
          <Tooltip title="Есть лифт">
            <div style={{ textAlign: 'center' }}>
              <WarningOutlined aria-hidden={true} style={{ fontSize: 18, color: '#52c41a' }} />
              <Text style={{ display: 'block', fontSize: 10 }}>Лифт</Text>
            </div>
          </Tooltip>
        )}

        {place.hasRamp && (
          <Tooltip title="Есть пандус">
            <div style={{ textAlign: 'center' }}>
              <WarningOutlined aria-hidden={true} style={{ fontSize: 18, color: '#fa8c16' }} />
              <Text style={{ display: 'block', fontSize: 10 }}>Пандус</Text>
            </div>
          </Tooltip>
        )}

        {place.hasDisabledToilet && (
          <Tooltip title="Есть доступный туалет">
            <div style={{ textAlign: 'center' }}>
              <AimOutlined aria-hidden={true} style={{ fontSize: 18, color: '#1890ff' }} />
              <Text style={{ display: 'block', fontSize: 10 }}>Туалет</Text>
            </div>
          </Tooltip>
        )}

        {!place.hasElevator && !place.hasRamp && !place.hasDisabledToilet && (
          <Tooltip title="Нет информации о доступности">
            <div style={{ textAlign: 'center' }}>
              <WarningOutlined aria-hidden={true} style={{ fontSize: 18, color: '#faad14' }} />
              <Text style={{ display: 'block', fontSize: 10 }}>Проверить доступность</Text>
            </div>
          </Tooltip>
        )}
      </Space>
    </Card>
  );
};

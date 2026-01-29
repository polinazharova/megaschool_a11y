import React, { useState } from 'react';
import { Select, Typography } from 'antd';
import { EnvironmentOutlined, HeartOutlined, PlusOutlined } from '@ant-design/icons';
import { Locality } from '../../../entities/locality/model/types';
import { useNavigate } from 'react-router-dom';
import { AddPlaceModal } from '../../AddPlaceModal/ui';
import { TextScaler } from '../../../features/TextScaler/ui';

const { Title } = Typography;
const { Option } = Select;

type Props = {
  isMobileState?: boolean;
  isSmallMobileState?: boolean;
  localities: Locality[];
  onLocalityChange: (cityId: string) => void;
  selectedLocality: Locality['id'];
};

export const Header: React.FC<Props> = ({
  isMobileState = false,
  isSmallMobileState = false,
  localities,
  onLocalityChange,
  selectedLocality,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobileState ? '12px 16px' : '16px 24px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            flex: isMobileState ? '1 1 auto' : 'none',
            minWidth: isMobileState ? 'auto' : '200px',
          }}
          tabIndex={0}
          role="button"
          aria-label="Логотип сайта для перехода на главную страницу"
          onClick={() => navigate('/')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/');
            }
          }}
        >
          <div
            style={{
              width: isMobileState ? '32px' : '40px',
              height: isMobileState ? '32px' : '40px',
              borderRadius: '8px',
              backgroundColor: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: isMobileState ? '16px' : '20px',
              flexShrink: 0,
            }}
            aria-hidden={true}
          >
            ♿
          </div>
          <Title
            style={{
              margin: 0,
              fontSize: isMobileState ? '16px' : '20px',
              display: isSmallMobileState ? 'none' : 'block',
            }}
          >
            Доступные места
          </Title>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobileState ? '8px' : '16px',
            flexWrap: 'wrap',
            justifyContent: isMobileState ? 'flex-end' : 'flex-start',
            flex: isMobileState ? '1 1 auto' : 'none',
          }}
        >
          <TextScaler />
          <button
            onClick={() => setShowModal(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowModal(true);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: isMobileState ? '6px 8px' : '8px 16px',
              backgroundColor: '#1890ff',
              border: '1px solid #1890ff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: isMobileState ? '12px' : '14px',
              color: '#fff',
              fontWeight: '500',
              transition: 'all 0.3s',
              boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
              whiteSpace: 'nowrap',
            }}
            aria-label="Добавить новое место"
            title="Добавить место"
          >
            <PlusOutlined
              aria-hidden={true}
              style={{ fontSize: isMobileState ? '12px' : '14px' }}
            />
            {!isSmallMobileState && <span>Добавить</span>}
          </button>

          <button
            onClick={() => navigate('/favorites')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/favorites');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: isMobileState ? '6px 8px' : '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: isMobileState ? '12px' : '14px',
              color: '#666',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
            aria-label="Перейти в избранное"
            title="Избранное"
          >
            <HeartOutlined
              aria-hidden={true}
              style={{ fontSize: isMobileState ? '12px' : '14px' }}
            />
            {!isSmallMobileState && <span>Избранное</span>}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              minWidth: isSmallMobileState ? '120px' : '150px',
            }}
          >
            {!isSmallMobileState && (
              <EnvironmentOutlined
                aria-hidden={true}
                style={{
                  color: '#666',
                  fontSize: isMobileState ? '14px' : '16px',
                }}
              />
            )}
            <Select
              value={selectedLocality}
              onChange={onLocalityChange}
              style={{
                width: isSmallMobileState ? '100%' : isMobileState ? '140px' : '200px',
                fontSize: isMobileState ? '12px' : '14px',
              }}
              variant="outlined"
              suffixIcon={null}
              size={isMobileState ? 'small' : 'middle'}
              aria-label="Выбрать населенный пункт для показа мест"
            >
              {localities.map((locality) => (
                <Option key={locality.id} value={locality.id}>
                  {locality.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </header>
      <AddPlaceModal showModal={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

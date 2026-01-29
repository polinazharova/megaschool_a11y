import React, { useState } from 'react';
import { Badge, Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { AppstoreOutlined, CloseOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { PlaceCategory } from '../../../entities/place/model/types';
import { Accessibility } from '../../../entities/accessibility/model/types';
import { CategoryFilter } from './CategoryFilter';
import { AccessibilityFilter } from './AccessibilityFilter';

const { Text } = Typography;

interface Props {
  compact?: boolean;
  selectedCategories: PlaceCategory[];
  selectedAccessibilities: Accessibility[];

  onCategoriesChange: (categories: PlaceCategory[]) => void;
  onAccessibilitiesChange: (accessibilities: Accessibility[]) => void;

  onReset?: () => void;
}

export const FilterPanel: React.FC<Props> = ({
  compact = false,
  selectedCategories = [],
  selectedAccessibilities = [],
  onCategoriesChange,
  onAccessibilitiesChange,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'accessibility'>('categories');

  const categoriesCount = selectedCategories.length;
  const accessibilitiesCount = selectedAccessibilities.length;

  const handleReset = () => {
    onCategoriesChange([]);
    onAccessibilitiesChange([]);
    onReset?.();
  };

  return (
    <Card
      title={
        <Space>
          <FilterOutlined aria-hidden={true} />
          <span>Фильтры</span>
          {(categoriesCount > 0 || accessibilitiesCount > 0) && (
            <Badge
              count={categoriesCount + accessibilitiesCount}
              style={{ backgroundColor: '#1890ff' }}
            />
          )}
        </Space>
      }
      extra={
        <Button
          type="text"
          size="small"
          onClick={handleReset}
          icon={<ReloadOutlined aria-hidden={true} />}
          disabled={categoriesCount === 0 && accessibilitiesCount === 0}
        >
          Сбросить
        </Button>
      }
      size={'default'}
      style={{ marginBottom: 16 }}
    >
      <>
        <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Button
              type={activeTab === 'categories' ? 'primary' : 'default'}
              block
              icon={<AppstoreOutlined aria-hidden={true} />}
              onClick={() => setActiveTab('categories')}
              aria-label="Фильтровать по"
            >
              Категории
              {categoriesCount > 0 && (
                <Badge
                  aria-label={`Выбрано категорий: ${categoriesCount}`}
                  count={categoriesCount}
                  style={{
                    marginLeft: 8,
                    backgroundColor: activeTab === 'categories' ? '#fff' : '#1890ff',
                    color: activeTab === 'categories' ? '#1890ff' : '#fff',
                  }}
                />
              )}
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type={activeTab === 'accessibility' ? 'primary' : 'default'}
              block
              icon={<AppstoreOutlined aria-hidden={true} />}
              onClick={() => setActiveTab('accessibility')}
              aria-label="Фильтровать по"
            >
              Доступность
              {accessibilitiesCount > 0 && (
                <Badge
                  aria-label={`Выбрано критериев доступности: ${accessibilitiesCount}`}
                  count={accessibilitiesCount}
                  style={{
                    marginLeft: 8,
                    backgroundColor: activeTab === 'accessibility' ? '#fff' : '#1890ff',
                    color: activeTab === 'accessibility' ? '#1890ff' : '#fff',
                  }}
                />
              )}
            </Button>
          </Col>
        </Row>

        <Divider style={{ margin: '8px 0' }} />
      </>

      {activeTab === 'categories' && (
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text strong>
              <AppstoreOutlined aria-hidden={true} /> Категории мест
            </Text>
            {categoriesCount > 0 && (
              <Button
                type="link"
                size="small"
                onClick={() => onCategoriesChange([])}
                icon={<CloseOutlined aria-hidden={true} />}
              >
                Очистить
              </Button>
            )}
          </div>

          <CategoryFilter
            compact={compact}
            selectedCategories={selectedCategories}
            onChange={onCategoriesChange}
          />
        </div>
      )}

      {activeTab === 'accessibility' && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text strong>
              <AppstoreOutlined /> Для кого подходит
            </Text>
            {accessibilitiesCount > 0 && (
              <Button
                type="link"
                size="small"
                onClick={() => onAccessibilitiesChange([])}
                icon={<CloseOutlined />}
              >
                Очистить
              </Button>
            )}
          </div>

          <AccessibilityFilter
            compact={compact}
            selectedAccessibilities={selectedAccessibilities}
            onChange={onAccessibilitiesChange}
          />
        </div>
      )}
    </Card>
  );
};

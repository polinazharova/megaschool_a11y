import React, { useState } from 'react';
import { Button, Checkbox, Col, Divider, Input, Row, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PlaceCategory } from '../../../entities/place/model/types';
import { CATEGORIES } from '../../../entities/place/constants';

const { Text } = Typography;

interface CategoryFilterProps {
  selectedCategories: PlaceCategory[];
  onChange: (categories: PlaceCategory[]) => void;
  availableCategories?: PlaceCategory[];
  placesCount?: Record<PlaceCategory, number>;
  showCount?: boolean;
  compact?: boolean;
  showSearch?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onChange,
  availableCategories = Object.values(PlaceCategory),
  compact = false,
  showSearch = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCategories = search
    ? availableCategories.filter(
        (category) =>
          CATEGORIES[category].name.toLowerCase().includes(search.toLowerCase()) ||
          CATEGORIES[category].description.toLowerCase().includes(search.toLowerCase()) ||
          CATEGORIES[category].tags.some((tag: string) => tag.includes(search.toLowerCase()))
      )
    : availableCategories;

  const handleCategoryToggle = (category: PlaceCategory) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  const popularCategories = [
    PlaceCategory.CAFE_RESTAURANT,
    PlaceCategory.SHOPPING,
    PlaceCategory.HEALTHCARE,
    PlaceCategory.GOVERNMENT,
    PlaceCategory.TRANSPORT,
  ];

  const displayedCategories = expanded
    ? filteredCategories
    : filteredCategories.filter((cat) => popularCategories.includes(cat));

  if (compact) {
    return (
      <div>
        {showSearch && (
          <Input
            placeholder="Поиск категорий..."
            prefix={<SearchOutlined aria-hidden={true} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 12 }}
            size="small"
            allowClear
          />
        )}

        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          {displayedCategories.map((category) => {
            const categoryInfo = CATEGORIES[category];
            const isSelected = selectedCategories.includes(category);

            return (
              <div
                tabIndex={0}
                key={category}
                onClick={() => handleCategoryToggle(category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryToggle(category);
                  }
                }}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${isSelected ? categoryInfo.color : '#f0f0f0'}`,
                  borderRadius: 8,
                  backgroundColor: isSelected ? `${categoryInfo.color}15` : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}
                aria-label={`Категория ${categoryInfo.name}`}
                role="button"
              >
                <Space>
                  <span aria-hidden={true} style={{ fontSize: 20 }}>
                    {categoryInfo.icon}
                  </span>
                  <div>
                    <Text aria-hidden={true} strong style={{ fontSize: 12 }}>
                      {categoryInfo.name}
                    </Text>
                  </div>
                </Space>

                <Checkbox
                  aria-label={'Выбрать'}
                  checked={isSelected}
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            );
          })}
        </Space>

        {availableCategories.length > popularCategories.length && !expanded && (
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Button size="small" onClick={() => setExpanded(true)}>
              Показать все категории
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[8, 8]}>
        {displayedCategories.map((category) => {
          const categoryInfo = CATEGORIES[category];
          const isSelected = selectedCategories.includes(category);

          return (
            <Col xs={12} sm={8} md={6} key={category}>
              <div
                onClick={() => handleCategoryToggle(category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryToggle(category);
                  }
                }}
                style={{
                  padding: 12,
                  border: `2px solid ${isSelected ? categoryInfo.color : '#f0f0f0'}`,
                  borderRadius: 8,
                  backgroundColor: isSelected ? `${categoryInfo.color}15` : '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                tabIndex={1}
                aria-label={`Категория ${categoryInfo.name}`}
                role="button"
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{categoryInfo.icon}</div>
                <Text
                  strong
                  style={{
                    fontSize: 11,
                    color: isSelected ? categoryInfo.color : '#333',
                  }}
                  aria-hidden="true"
                >
                  {categoryInfo.name}
                </Text>
              </div>
            </Col>
          );
        })}
      </Row>

      {availableCategories.length > popularCategories.length && (
        <>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <Button type="link" size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Скрыть' : `Показать все ${availableCategories.length} категорий`}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

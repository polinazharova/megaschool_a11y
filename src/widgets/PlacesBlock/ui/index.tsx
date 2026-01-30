import React from 'react';
import { Col, Empty, Row, Typography } from 'antd';
import { PlaceCard } from '../../../entities/place/ui';
import { MOCK_PLACES } from '../../../entities/place/constants';
import { Place, PlaceCategory } from '../../../entities/place/model/types';
import { Accessibility } from '../../../entities/accessibility/model/types';
import { Locality } from '../../../entities/locality/model/types';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface PlacesBlockProps {
  places?: Place[];
  selectedLocality?: Locality['id'];
  selectedCategories?: PlaceCategory[];
  selectedAccessibilities?: Accessibility[];
  title?: string;
  subtitle?: string;
  columnsConfig?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  gutter?: number | [number, number];
  loading?: boolean;
  setFavorites: (ids: string[]) => void;
  favorites?: string[];
  filterFavorites?: boolean;
  emptyText?: string;
}

export const PlacesBlock: React.FC<PlacesBlockProps> = ({
  places: externalPlaces,
  selectedCategories,
  selectedAccessibilities,
  selectedLocality,
  title = 'Подобрали места, в которых вам может понравиться',
  subtitle,
  columnsConfig = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 4,
  },
  gutter = [16, 24],
  setFavorites,
  favorites = [],
  filterFavorites = false,
  emptyText = 'Нет мест для отображения',
}) => {
  const navigate = useNavigate();
  const allPlaces = externalPlaces || MOCK_PLACES;

  const filteredPlaces = React.useMemo(() => {
    let result = [...allPlaces];
    if (selectedLocality) {
      result = result.filter((place) => place.localityId === selectedLocality);
    }
    if (selectedCategories?.length) {
      result = result.filter(
        (place) => place.placeCategory && selectedCategories.includes(place.placeCategory)
      );
    }

    if (selectedAccessibilities?.length) {
      result = result.filter((place) => {
        return selectedAccessibilities.every(
          (filter) => place.accessibility && place.accessibility.includes(filter)
        );
      });
    }

    if (filterFavorites) {
      result = result.filter((place) => {
        return favorites.includes(place.id);
      });
    }

    return result;
  }, [
    allPlaces,
    selectedLocality,
    favorites,
    filterFavorites,
    selectedCategories,
    selectedAccessibilities,
  ]);

  if (filteredPlaces.length === 0) {
    return (
      <Empty description={emptyText} image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ padding: 40 }} />
    );
  }

  const onClick = (id: string) => {
    navigate(`/places/${id}`);
  };

  const onFavoriteClick = (id: string) => {
    const isFavRemoved = favorites.find((favorite) => favorite === id);
    if (isFavRemoved) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
      return;
    }
    setFavorites([...favorites, id]);
  };

  return (
    <div style={{ padding: '0 0 24px 0' }}>
      <div
        style={{
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>

          {subtitle && (
            <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
              {subtitle}
            </Text>
          )}
        </div>
      </div>

      <Row gutter={gutter} align="stretch" justify="center" style={{ width: '100%' }}>
        {filteredPlaces.map((place) => (
          <Col
            key={place.id}
            xs={24 / (columnsConfig.xs || 1)}
            sm={24 / (columnsConfig.sm || 2)}
            md={24 / (columnsConfig.md || 3)}
            lg={24 / (columnsConfig.lg || 3)}
            xl={24 / (columnsConfig.xl || 4)}
            xxl={24 / (columnsConfig.xxl || 4)}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PlaceCard
              place={place}
              onClick={() => onClick(place.id)}
              onFavoriteClick={onFavoriteClick}
              isFavorite={favorites.includes(place.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

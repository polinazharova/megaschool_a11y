import { Header } from '../../widgets/Header/ui';
import { PlacesBlock } from '../../widgets/PlacesBlock/ui';
import { FilterPanel } from '../../features/filter/ui';
import { useState } from 'react';
import { Accessibility } from '../../entities/accessibility/model/types';
import { PlaceCategory } from '../../entities/place/model/types';
import { LOCALITY } from '../../entities/locality/constants';
import { Locality } from '../../entities/locality/model/types';

type Props = {
  isMobileState?: boolean;
  isSmallMobileState?: boolean;
  selectedLocality: Locality['id'];
  setSelectedLocality: (selectedLocality: Locality['id']) => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
};

export const HomePage = ({
  isMobileState = false,
  isSmallMobileState = false,
  selectedLocality,
  setSelectedLocality,
  favorites,
  setFavorites,
}: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<PlaceCategory[]>([]);
  const [selectedAccessibilities, setSelectedAccessibilities] = useState<Accessibility[]>([]);

  return (
    <>
      <Header
        isMobileState={isMobileState}
        isSmallMobileState={isSmallMobileState}
        localities={LOCALITY}
        selectedLocality={selectedLocality}
        onLocalityChange={(value: Locality['id']) => {
          setSelectedLocality(value);
        }}
      />
      <main>
        <FilterPanel
          compact={isMobileState}
          selectedCategories={selectedCategories}
          selectedAccessibilities={selectedAccessibilities}
          onAccessibilitiesChange={(value: Accessibility[]) => setSelectedAccessibilities(value)}
          onCategoriesChange={(value: PlaceCategory[]) => setSelectedCategories(value)}
        />
        <PlacesBlock
          selectedLocality={selectedLocality}
          selectedCategories={selectedCategories}
          selectedAccessibilities={selectedAccessibilities}
          favorites={favorites}
          setFavorites={(value: string[]) => {
            setFavorites(value);
          }}
        />
      </main>
    </>
  );
};

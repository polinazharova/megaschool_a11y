import { Header } from '../../widgets/Header/ui';
import { PlacesBlock } from '../../widgets/PlacesBlock/ui';
import { LOCALITY } from '../../entities/locality/constants';
import { Locality } from '../../entities/locality/model/types';

type Props = {
  isMobileState?: boolean;
  isSmallMobileState?: boolean;
  selectedLocality: Locality['id'];
  setSelectedLocality: (newLocality: Locality['id']) => void;
  favorites: string[];
  setFavorites: (value: string[]) => void;
};

export const FavoritesPage = ({
  isMobileState = false,
  isSmallMobileState = false,
  selectedLocality,
  setSelectedLocality,
  favorites,
  setFavorites,
}: Props) => {
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
        <PlacesBlock
          title="Ваши любимые места"
          filterFavorites={true}
          favorites={favorites}
          setFavorites={(value: string[]) => {
            setFavorites(value);
          }}
        />
      </main>
    </>
  );
};

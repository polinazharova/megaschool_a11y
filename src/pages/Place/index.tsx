import { Header } from '../../widgets/Header/ui';
import { Locality } from '../../entities/locality/model/types';
import { LOCALITY } from '../../entities/locality/constants';
import { useParams } from 'react-router-dom';
import { getPlaceById } from '../../entities/place/helpers';
import { getCommentsByPlaceId } from '../../entities/comment/helpers';
import { PlaceDetails } from '../../widgets/PlaceDetails/ui';
import { useRef } from 'react';
import { CommentsList } from '../../widgets/CommentsList/ui';

type Props = {
  isMobileState?: boolean;
  isSmallMobileState?: boolean;
  selectedLocality: Locality['id'];
  setSelectedLocality: (selectedLocality: Locality['id']) => void;
};

export const PlacePage = ({
  isMobileState = false,
  isSmallMobileState = false,
  selectedLocality,
  setSelectedLocality,
}: Props) => {
  const { id } = useParams();
  const commentsRef = useRef<HTMLDivElement>(null);

  const place = getPlaceById(id);
  const comments = getCommentsByPlaceId(place?.id);

  if (!place) {
    return null;
  }

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
        <PlaceDetails commentsRef={commentsRef} isMobileState={isMobileState} place={place} />
        <CommentsList commentsRef={commentsRef} comments={comments} />
      </main>
    </>
  );
};

import { MOCK_PLACES } from '../constants';

export const getPlaceById = (placeId?: string) => {
  if (!placeId) {
    return undefined;
  }
  return MOCK_PLACES.find((p) => p.id === placeId);
};

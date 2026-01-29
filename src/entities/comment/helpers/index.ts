import { MOCK_COMMENTS } from '../constants';

export const getCommentsByPlaceId = (placeId?: string) => {
  if (!placeId) {
    return [];
  }
  return MOCK_COMMENTS.filter((p) => p.placeId === placeId);
};

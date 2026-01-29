import { Accessibility } from '../../../accessibility/model/types';

type Rating = {
  count: string;
  reviews: string;
};

export enum PlaceCategory {
  CAFE_RESTAURANT = 'cafe_restaurant',
  SHOPPING = 'shopping',
  HEALTHCARE = 'healthcare',
  SPORTS = 'sports',
  CULTURE = 'culture',
  EDUCATION = 'education',
  TRANSPORT = 'transport',
  OFFICE = 'office',
  ACCOMMODATION = 'accommodation',
  SERVICES = 'services',
  GOVERNMENT = 'government',
  ENTERTAINMENT = 'entertainment',
  PARK = 'park',
  BANK = 'bank',
  PHARMACY = 'pharmacy',
  HAIR_BEAUTY = 'hair_beauty',
  RELIGION = 'religion',
  OTHER = 'other',
}

export type Entrance = 'main' | 'secondary' | 'service';

export type Place = {
  id: string;
  photo: string;
  name: string;
  address: string;
  localityId: string;
  accessibility: Accessibility[];
  placeCategory: PlaceCategory;
  rating: Rating;
  isApproved?: boolean;
  entranceType?: Entrance;
  floor?: string;
  hasElevator?: boolean;
  hasRamp?: boolean;
  hasDisabledToilet?: boolean;
  parking?: {
    available: boolean;
    type?: 'street' | 'lot' | 'garage';
    distance?: string;
  };
};

export enum ROLE {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

export const BUYER = {
  Individual: 'individual',
  Corporation: 'corporation',
  RealEstateBusiness: 'Real estate business',
  PublicEntity: 'Public entity',
};

export const SELLER = {
  RealEstateBusiness: 'Real estate business',
  PublicEntity: 'Public entity',
};

export const a = {
  BUYER: BUYER,
  SELLER: SELLER,
};

export enum HOUSE_TYPE {
  SINGLE_FAMILY_HOMES = 'Single-family homes',
  MULTI_FAMILY_HOMES = 'Multi-family homes',
  TOWN_HOUSES = 'Townhouses',
  APARTMENTS = 'Apartments',
  VILLA = 'villa',
}

export enum APPORVAL {
  NA = 'NA',
  NOC = 'NA-NOC',
  NONE = 'NONE',
}

export enum FURNISHED_STATUS {
  UNFURNISHED = 'unfurnished',
  SEMI_FURNISHED = 'semi-furnished',
  FULLY_FURNISHED = 'fully-furnished',
}

export enum IS_SOLD {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}

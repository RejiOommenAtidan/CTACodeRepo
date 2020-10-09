import ThemeOptions from './ThemeOptions';
////MASTERS GOES HERE
import AuthRegionReducer from "./masters/authregionReducer";
import CountryReducer from "./masters/countryReducer";
import FeatureReducer from "./masters/featureReducer";
import OccupationReducer from "./masters/occupationReducer";
import ProvinceReducer from "./masters/provinceReducer";
import QualificationReducer from "./masters/qualificationReducer";
import RegionReducer from "./masters/regionReducer";
import RelationReducer from "./masters/relationReducer";
import TypeIssuedReducer from "./masters/typeissuedReducer";
////TRANSACTIONS GOES HERE
////UserAuth GOES HERE
import UserAuthenticationReducer from "./userAuthenticationReducer";
export default {
  ThemeOptions,
  UserAuthenticationReducer,
  AuthRegionReducer,
  CountryReducer,
  FeatureReducer,
  OccupationReducer,
  ProvinceReducer,
  QualificationReducer,
  RegionReducer,
  RelationReducer,
  TypeIssuedReducer
};

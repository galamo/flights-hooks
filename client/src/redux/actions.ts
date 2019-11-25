import Actions from "./actions.config";

import { getCountriesService } from "./service";

export const saveUserAction = (user: any) => {
  return {
    type: Actions.SAVE_USER,
    payload: { user }
  };
};

// interface Country {
//     name: string,
//     flag: string,
//     population: number
// }
// sync action to reducer
export const getCountriesSuccess = (countries: Array<any>) => {
  return {
    type: Actions.GET_COUNTRIES_SUCCESS,
    payload: { countries }
  };
};

export const saveImageAction = (payload: any) => {
  return {
    type: Actions.SAVE_IMAGES_ACTION,
    payload
  };
};

export const getCountriesPending = () => {
  return {
    type: Actions.GET_COUNTRIES_PENDING
  };
};

// async action
export const getCountries = () => {
  return async (dispachFn: any) => {
    //lunch loader
    dispachFn(getCountriesPending()); //1
    // call server api
    const countries = await getCountriesService(); //2
    // save the countries in store AKA dispatch countrie_success
    dispachFn(getCountriesSuccess(countries)); //1
  };
};

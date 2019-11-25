import Actions from "./actions.config";

const imagesCountries: { [key: string]: any[] } = {};
const initialState = {
    user: null,
    countries: [],
    countriesLoading: false,
    imagesCountries
};

export default function root(state = initialState, action: any) {
    switch (action.type) {
        case Actions.SAVE_USER: {
            // return equals to global set state - setting the store
            return {
                ...state,
                user: "hello " + action.payload.user + "@gmail.com"
            };
        }

        // deprecated in version 24.10.209
        case Actions.GET_COUNTRIES: {
            // some logic
            return {
                ...state,
                countries: ["ISR", "AFG"]
            };
        }

        case Actions.SAVE_IMAGES_ACTION: {
            const { code, image } = action.payload;
            const { imagesCountries } = state;
            const isCodeExist = imagesCountries.hasOwnProperty(code);
            return {
                ...state,
                imagesCountries: {
                    ...imagesCountries,
                    [code]: isCodeExist ? [...imagesCountries[code], image] : [image]
                }
            };
        }

        case Actions.GET_COUNTRIES_SUCCESS: {
            const { countries } = action.payload;
            return { ...state, countries, countriesLoading: false };
        }

        case Actions.GET_COUNTRIES_PENDING: {
            return { ...state, countriesLoading: true };
        }

        default: {
            return state;
        }
    }
}

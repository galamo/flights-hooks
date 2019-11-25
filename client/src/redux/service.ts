import axios from "axios";

export const getCountriesService = async () => {
    try {
        // const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
        const { data } = await axios.get("http://localhost:4001/countries?key=you_are_the_best");
        return data;
    } catch (ex) {
        return []
    }

}
import {Country} from "../../model/Country";

export default new class CountryApi {

    getCountries(): Array<Country> {
        return [
            new Country('Austria'),
            new Country('Hungary'),
            new Country('Russia')
        ]
    }

}

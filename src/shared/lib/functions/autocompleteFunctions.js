const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "a441a6e59c76408b1b699f2a724e98af7cddaf85";

const fetchCity = async (query) => {
    const options = {
        method: "POST",
        mode: "cors",
        count: 3,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            query: query,
            from_bound: { "value": "city" },
            to_bound: { "value": "city" }
        })
    }

    const response = await fetch(url, options);
    const suggestion = await response.json();
    return suggestion.suggestions;
}

const fetchStreet = async (query, cityId) => {
    const options = {
        method: "POST",
        mode: "cors",
        count: 3,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({
            locations: [
                {
                    city_fias_id: cityId
                }
            ],
            from_bound: { "value": "street" },
            to_bound: { "value": "street" },
            restrict_value: true,
            query: query
        })
    }

    const response = await fetch(url, options);
    const suggestion = await response.json();
    return suggestion.suggestions;
}

export { fetchCity, fetchStreet }
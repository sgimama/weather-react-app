
import axios from "axios";
import Config from "../Config";

async function useGetData(params = {}) {
    console.log('toy aqui')
    params = {
        ...params,
        appid: Config.ApiKey,
        units: Config.Units
    }
    const response = await axios.get(Config.url, { params });
    return response.data;
}

export default useGetData;
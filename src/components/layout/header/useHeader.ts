import { Weather } from '@/utils/api';
import { ref } from 'vue';

export function useWeather() {

    const temperature = ref("");
    const weatherlive = ref("");
    const province = ref("");
    const city =ref("");
    let WeatherTimer: NodeJS.Timer | null = null;

    const  useGetWeather =async()=>{
        const res = await Weather()
        if(res.code!=0){
            return
        }
        //温度
        temperature.value = res.data.temperature
        //天气现象
        weatherlive.value = res.data.weather
        province.value = res.data.province
        city.value = res.data.city


        if(WeatherTimer=== null){
            WeatherTimer =setInterval(async() => {
                const res = await Weather()
                if(res.code!=0){
                    return
                }
                //温度
                temperature.value = res.data.temperature
                //天气现象
                weatherlive.value = res.data.weather
                province.value = res.data.province
                city.value = res.data.city
            }, 60 * 60 * 1000);
        }
    }
    return {
        temperature,
        weatherlive,
        province,
        city,
        useGetWeather
    };
}

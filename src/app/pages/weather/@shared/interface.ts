export interface Weather {
    city: string,
    id?: number,
    temp?: number,
    weather?: string,
    minTemp?: number,
    maxTemp?: number,
    hourly?: Array<{
        time: number,
        temp: number,
        weather: any
    }>,
    daily?: Array<{
        day: string,
        temp: number,
        weather: any
    }>
}

export interface GeographicDTO {
    country: string,
    lat: number,
    local_names: { [key: string]: number; },
    lon: number,
    name: string,
    state: string
}

export interface WeatherDTO {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: {
        dt: number,
        sunrise: number,
        sunset: number,
        temp: number,
        feels_like: number,
        pressure: number,
        humidity: number,
        dew_point: number,
        uvi: number,
        clouds: number
        visibility: number,
        wind_speed: number,
        wind_deg: number,
        weather: Array<{
            id: number,
            main: string,
            description: string,
            icon: string
        }>,
        rain?: {
            [key: string]: number
        },
        snow?: {
            [key: string]: number
        }
    },
    minutely?: Array<{
        dt: number,
        precipitation: number
    }>
    hourly?: Array<{
        dt: number,
        temp: number,
        feels_like: number,
        pressure: number,
        humidity: number
        dew_point: number,
        uvi: number,
        clouds: number,
        visibility: number,
        wind_speed: number,
        wind_deg: number,
        wind_gust: number,
        weather: [
            {
                id: number,
                main: string,
                description: string,
                icon: string
            }
        ],
        pop: number,
        rain?: {
            [key: string]: number
        },
        snow?: {
            [key: string]: number
        }
    }>
    daily?: Array<{
        dt: number,
        sunrise: number,
        sunset: number,
        moonrise: number,
        moonset: number,
        moon_phase: number,
        temp: {
            day: number,
            min: number,
            max: number,
            night: number,
            eve: number,
            morn: number
        },
        feels_like: {
            day: number,
            night: number,
            eve: number,
            morn: number
        },
        pressure: number,
        humidity: number,
        dew_point: number,
        wind_speed: number,
        wind_deg: number,
        weather: Array<{
            id: number,
            main: string,
            description: string,
            icon: string
        }>,
        clouds: number,
        pop: number,
        rain?: {
            [key: string]: number
        },
        snow?: {
            [key: string]: number
        },
        uvi: number
    }>
}

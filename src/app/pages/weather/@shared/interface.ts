export interface City {
    id?: number,
    city: string,
    temp?: number | null,
    weather?: string
}

export interface Weather {
    city: string,
    temp: number,
    weather: string,
    minTemp: number,
    maxTemp: number,
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

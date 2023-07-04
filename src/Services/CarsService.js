class CarsService {
    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not ferch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getAllCars = () => {
        return this.getResource(`https://myfakeapi.com/api/cars/`)
    }
}

export default CarsService
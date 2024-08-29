import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '66c25e6bc1864425af3ee724fcb8873c'
    }
})
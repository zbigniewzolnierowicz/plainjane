import axios, { AxiosError } from 'axios'

const fetcher = <TData>(url: string): Promise<TData> => axios.get<TData>(url).then(data => data.data).catch((err: AxiosError<TData>) => { throw err.response?.data })

export default fetcher

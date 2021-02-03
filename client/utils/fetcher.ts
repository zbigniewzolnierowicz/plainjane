import axios from 'axios'

async function fetcher <TData>(url: string): Promise<TData> {
  try {
    const res = await axios.get<TData>(url)
    return res.data
  } catch (err) {
    throw err.response?.data
  }
}

export default fetcher

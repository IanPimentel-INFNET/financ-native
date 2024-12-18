import stockPaginationType from "./stockPaginationType"

type stockInfoType = {
    name: string,
    symbol: string,
    has_intraday: boolean,
    has_eod: boolean,
    country: string | null,
    stock_exchange: {
        name: string
        acronym: string
        mic: string
        country: string
        country_code: string
        city: string
        website: string
    }
}

export type stockInfoResponse = {
    pagination: stockPaginationType,
    data: stockInfoType[]
  }
export default stockInfoType
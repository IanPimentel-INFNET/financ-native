import stockPaginationType from "./stockPaginationType"

export type stockEODType = {
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  adj_high: number,
  adj_low: number,
  adj_close: number,
  adj_open: number,
  adj_volume: number,
  split_factor: number,
  dividend: number,
  symbol: string,
  exchange: string,
  date: string
}

export type stockEODTypeResponse = {
  pagination: stockPaginationType,
  data: stockEODType[]
}

export default stockEODType
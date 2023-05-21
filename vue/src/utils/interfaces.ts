export interface searchHistoryObject {
  id: string,
  location: string,
  lat: string,
  lng: string,
  searchTime: Date,
  localTimeAtSearch: string,
  deleteFlag: boolean
}

export interface geoLocation {
  lat: number,
  lng: number,
}

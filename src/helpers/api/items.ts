import { apiItem } from "src/api/apiItem/apiItem"

export const getMeridians = async (currentLanguage: string) => {
  const meridians = await apiItem.getMeridians(currentLanguage.toLowerCase())
  const filteredMeridians = (meridians as any).data.map(({ _id, updatedAt, ...keepAttrs }) => keepAttrs)
  return filteredMeridians
}

export const getAcupuncturePoints = async (currentLanguage: string) => {
  const points = await apiItem.getAcupuncturePoints(currentLanguage.toLowerCase())
  const filteredPoints = (points as any).data.map(({ _id, updatedAt, ...keepAttrs }) => keepAttrs)
  return filteredPoints
}

export const getAcupuncturePointByCode = async (currentLanguage: string, code: string) => {
  let point = await apiItem.getAcupuncturePointByCode(currentLanguage.toLowerCase(), code)
  point = (point as any).data
  delete point["_id"]
  delete point["updatedAt"]
  return point
}

export const getMeridianByCode = async (currentLanguage: string, code: string) => {
  let meridian = await apiItem.getMeridianByCode(currentLanguage.toLowerCase(), code)
  meridian = (meridian as any).data
  delete meridian["_id"]
  delete meridian["updatedAt"]
  return meridian
}

export const updateAcupuncturePoint = async (data: IParamUpdateAcupuncturePoint) => {
  let updateResult = await apiItem.updateAcupuncturePoint(data)
  return (updateResult as any).data === "true"
}

export const updateMeridian = async (data: IParamUpdateMeridian) => {
  let updateResult = await apiItem.updateMeridian(data)
  return (updateResult as any).data === "true"
}

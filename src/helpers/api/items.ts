import { apiItem } from "src/api/apiItem/apiItem"

export const getMeridians = async (currentLanguage: string) => {
  const meridians = await apiItem.getMeridians(currentLanguage.toLowerCase())
    .catch(error => {
      alert(error)
      return []
    })
  const filteredMeridians = (meridians as any).data.map(({ _id, updatedAt, ...keepAttrs }) => keepAttrs)
  return filteredMeridians
}

export const getAcupuncturePoints = async (currentLanguage: string) => {
  const points = await apiItem.getAcupuncturePoints(currentLanguage.toLowerCase())
    .catch(error => {
      alert(error)
      return []
    })
  const filteredPoints = (points as any).data.map(({ _id, updatedAt, ...keepAttrs }) => keepAttrs)
  return filteredPoints
}

export const getAcupuncturePointByCode = async (currentLanguage: string, code: string) => {
  let point = await apiItem.getAcupuncturePointByCode(currentLanguage.toLowerCase(), code)
    .catch(error => {
      alert(error)
      return {}
    })
  point = (point as any).data
  delete point["_id"]
  delete point["updatedAt"]
  return point
}

export const getMeridianByCode = async (currentLanguage: string, code: string) => {
  let meridian = await apiItem.getMeridianByCode(currentLanguage.toLowerCase(), code)
    .catch(error => {
      alert(error)
      return {}
    })
  meridian = (meridian as any).data
  delete meridian["_id"]
  delete meridian["updatedAt"]
  return meridian
}

import { apiAuth } from "src/api/endpoints/apiAuth/apiAuth"

export const createNewAccount = async (data: IParamCreateUpdateAccount) => {
  let createResult = await apiAuth.createNewAccount(data)
  return (createResult as any).data
}

export const getAccountInfo = async (firebase_id: string) => {
  const accountInfo = await apiAuth.getAccountInfo(firebase_id)
  return (accountInfo as any).data
}

export const updateProfile = async (data: IParamCreateUpdateAccount) => {
  let updateResult = await apiAuth.updateProfile(data)
  return (updateResult as any).data
}

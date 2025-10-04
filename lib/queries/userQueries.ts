import { getUser } from "../utils/getUser";

export const getAuthUserQuery = () => ({
    queryKey: ['profile'],
    queryFn: getUser
})
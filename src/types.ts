export type TPost = {
    id: number
    post: string
    likesCount: number
}
export type TContacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type TPhoto = {
    small: string | null
    large: string | null
}
export type TProfile = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: TContacts
    photos: TPhoto
    photoDefault?: string
}
export type TUser = {
    name: string,
    id: number,
    photos: TPhoto,
    status: string | null,
    followed: false,
    photoUrl?: string
}
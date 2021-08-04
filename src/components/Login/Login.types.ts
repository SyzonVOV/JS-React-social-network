
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    loginUser: () => void
    setCaptcha: () => void
}

export type LoginProps = MapStateToPropsType & MapDispatchToPropsType
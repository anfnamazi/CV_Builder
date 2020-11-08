export const isValidToken = () => {
    const token = localStorage.get("token");
    if (token) {
        const exp = tokenDecode(token).payload.exp;
        const now = Math.floor(Date.now() / 1000);
        if (exp < now) {
            Cookie.remove("token")
            dispatch(clearUser());
        } else {
            dispatch(setUser(tokenDecode(token).payload.user));
        }
    }
}
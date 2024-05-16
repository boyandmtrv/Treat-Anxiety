export function addSession(getUserData) {
    return function (ctx, next) {
        const user = getUserData();
        if (user) {
            ctx.user = user;
        }
        next();
    };
}

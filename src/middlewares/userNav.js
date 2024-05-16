export function addUserNav(navTemplate) {
    let hasUser = null;
    let userId = null;

    return function (ctx, next) {
        const currentUser = ctx.user;
        const currentUserId = currentUser ? currentUser.objectId : null;

        if (Boolean(currentUser) !== hasUser || currentUserId !== userId) {
            hasUser = Boolean(currentUser);
            userId = currentUserId;
            ctx.renderNav(navTemplate(hasUser, userId));
        };

        next();
    };
}

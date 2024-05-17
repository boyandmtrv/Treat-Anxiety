import { CONFIG } from '../config.js';

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;

export function hasUser() {
    return function (ctx, next) {

        if (!ctx.user) {
            ctx.page.redirect('/login');
        } else if (ctx.user.objectId !== SPECIAL_USER_ID) {
            ctx.page.redirect('/blogs');
        } else {
            next();
        }
    };
};

export function isOwner() {
    return function (ctx, next) {
        if (ctx.data?.owner?.objectId !== ctx.user?.objectId) {
            ctx.page.redirect('/login');
        } else {
            next();
        };
    };
};

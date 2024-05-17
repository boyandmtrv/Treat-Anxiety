import * as blogService from '../data/blog.js';

export function preloader(param, collection) {
    return async function (ctx, next) {
        const id = ctx.params[param];

        if (id) {
            const data = await blogService.getById(id);
            ctx.data = data;
        };

        next();
    }
};
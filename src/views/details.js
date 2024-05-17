import { deleteById } from '../data/blog.js';
import { html } from '../lib/lit-html.js';

const detailsTemplate = (blog, hasUser, isOwner, onDelete) => html`
    <h1>${blog.name}</h1>
    <p>${blog.author}</p>
    <p>${blog.blogCount}</p>
    <p>${blog.description}</p>
    ${hasUser && !isOwner ? html`
        <a href="/save/${blog.objectId}">Read later</a>` : null
    }

    ${isOwner ? html`
        <a href="/edit/${blog.objectId}">Edit</a>
        <a href="javascript:void(0)" @click=${onDelete}>Delete</a>` : null
    }`;


export function detailsView(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;

    ctx.render(detailsTemplate(ctx.data, hasUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this blog?');

        if (choice ) {
            await deleteById(id);
            ctx.page.redirect('/blogs');
        };
    };
};
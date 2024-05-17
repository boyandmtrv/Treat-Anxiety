import { html } from '../lib/lit-html.js';

import * as blogService from '../data/blog.js';
import { repeat } from '../lib/directives/repeat.js';

const blogTemplate = (list) => html`
    <h1>All blogs</h1>
    ${list}
`;

const listTemplate = (blogs) => html`
    <section>
        ${repeat(blogs, b => b.objectId, blogCard)}
    </section>
`;

const blogCard = (blog) => html`
    <article>
        <p>${blog.name}</p>
        <p>${blog.author}</p>
        <p>${blog.blogCount}</p>
        <p>${blog.description}</p>
        <p><a href="/blogs/${blog.objectId}">View Details</a></p>
        <p>Created by: ${blog.owner.username}</p>

    </article>
`;

export async function blogView(ctx) {
    ctx.render(blogTemplate(html`<p>Loading...</p>`));

    const { results: blogs } = await blogService.getAll(ctx.user?.objectId);

    ctx.render(blogTemplate(listTemplate(blogs)));
};
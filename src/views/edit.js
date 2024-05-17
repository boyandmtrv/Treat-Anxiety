import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

import * as blogService from '../data/blog.js';

const editTemplate = (blog, onSubmit) => html`
    <h1>Edit Blog</h1>
    <form @submit=${onSubmit}>
        <label>Name: <input type="text" name="name" .value=${blog.name}></label>
        <label>Author: <input type="text" name="author" .value=${blog.author}></label>
        <label>Blog: <input type="number" name="blogCount" .value=${blog.blogCount}></label>
        <label>Description: <textarea name="description" .value=${blog.description}></textarea></label>
        <label>Ready For Read:  <input type="checkbox" name="readyForRead" .checked=${blog.readyForRead}></label>
        <button>Save changes</button>
    </form>
`

export function editView(ctx) {
    const id = ctx.params.id;
    ctx.render(editTemplate(ctx.data, submitHandler(onSubmit)));

    async function onSubmit({ name, author, blogCount, description, readyForRead }) {
        blogCount = parseInt(blogCount);
        readyForRead = Boolean(readyForRead);

        if (name == '' || author == '' || Number.isNaN(blogCount) || description == '') {
            return alert('All fields are required');
        }

        const userId = ctx.user.objectId;

        await blogService.update(id, { name, author, blogCount, description, readyForRead }, userId);

        ctx.page.redirect('/blogs/' + id);
    };
    
}

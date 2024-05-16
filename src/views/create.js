import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

import * as blogService from '../data/blog.js';

const createTeplate = (onSubmit) => html`
    <h1>Blog</h1>
    <form @submit=${onSubmit}>
        <label>Name: <input type="text" name="name"></label>
        <label>Author: <input type="text" name="author"></label>
        <label>Blog: <input type="number" name="blogCount"></label>
        <button>Create</button>
    </form>
`

export function createView(ctx) {
    ctx.render(createTeplate(submitHandler(onSubmit)));

    async function onSubmit({ name, author, blogCount }) {
        blogCount = parseInt(blogCount);
        if (name == '' || author == '' || Number.isNaN(blogCount)) {
            return alert('All fields are required');
        }
        
        const userId = ctx.user?.objectId;
        
        const result = await blogService.create({ name, author, blogCount }, userId);

        ctx.page.redirect('/blogs/' + result.objectId);
    }
}

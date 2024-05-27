import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

import * as blogService from '../data/blog.js';

const createTeplate = (onSubmit) => html`
    <form @submit=${onSubmit}>
    <div class="create-blog">
        <h1 class="create-title">Create blog</h1>
        <div class="container">
            <div class="create-form row">
                <div class="form-field col-lg-6">
                    <input type="text" name="name" class="input-text" id="name">
                    <label for="name" class="label">name</label>
                </div>
                <div class="form-field col-lg-6">
                    <input type="text" name="author" class="input-text" id="author">
                    <label for="author" class="label">author</label>
                </div>
                <div class="form-field col-lg-6">
                    <input type="number" name="blogCount" class="input-text" id="blogCount">
                    <label for="blogCount" class="label">Minutes to read</label>
                </div>
                <div class="form-field col-lg-12">
                    <textarea name="description" class="input-text" id="description"></textarea>
                    <label for="description" class="label">description</label>
                </div>
                <div class="form-field col-lg-12">
                    <button class="create-submit-btn">Create</button>
                </div>
            </div>
        </div>
    </div>
    </form> 
`   

export function createView(ctx) {
    ctx.render(createTeplate(submitHandler(onSubmit)));

   async function onSubmit({ name, author, blogCount, description }) {
    blogCount = parseInt(blogCount);
    if (name == '' || author == '' || Number.isNaN(blogCount) || description == '') {
        return alert('All fields are required');
    }
    
    const userId = ctx.user?.objectId;

    description = description.replace(/\n/g, '<br>');

    const result = await blogService.create({ name, author, blogCount, description }, userId);

    ctx.page.redirect('/blogs/' + result.objectId);
}

}

{/* <h1>Blog</h1>
    <form @submit=${onSubmit}>
        <label>Name: <input type="text" name="name"></label>
        <label>Author: <input type="text" name="author"></label>
        <label>Blog: <input type="number" name="blogCount"></label>
        <label>Description: <textarea name="description" placeholder="Description"></textarea></label>
        <button>Create</button>
    </form> */}

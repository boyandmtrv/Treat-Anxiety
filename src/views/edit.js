import { html } from '../lib/lit-html.js';
import { submitHandler } from '../util.js';

import * as blogService from '../data/blog.js';

const editTemplate = (blog, onSubmit) => {
    const resourcesValue = blog.resources ? blog.resources.replace(/<br>/g, '\n') : '';
    const descriptionValue = blog.description ? blog.description.replace(/<br>/g, '\n') : '';
  
    return html`
      <form @submit=${onSubmit}>
        <div class="create-blog">
          <h1 class="create-title">Edit blog</h1>
          <div class="container">
            <div class="form-field col-lg-6">
              <input type="checkbox" name="readyForRead" .checked=${blog.readyForRead}>
              <label for="readyForRead" class="label">Ready for read</label>
            </div>
            <div class="create-form row">
              <div class="form-field col-lg-6">
                <input type="text" name="name" class="input-text" id="name" .value=${blog.name}>
                <label for="name" class="label">name</label>
              </div>
              <div class="form-field col-lg-6">
                <input type="text" name="author" class="input-text" id="author" .value=${blog.author}>
                <label for="author" class="label">author</label>
              </div>
              <div class="form-field col-lg-6">
                <textarea name="resources" class="input-text" id="resources">${resourcesValue}</textarea>
                <label for="resources" class="label">resources</label>
              </div>
              <div class="form-field col-lg-6">
                <input type="number" name="blogCount" class="input-text" id="blogCount" .value=${blog.blogCount}>>
                <label for="blogCount" class="label">Minutes to read</label>
              </div>
              <div class="form-field col-lg-12">
                <textarea name="description" class="input-text" id="description">${descriptionValue}</textarea>
                <label for="description" class="label">description</label>
              </div>
              <div class="form-field col-lg-12">
                <button class="create-submit-btn">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    `;
  };
  
export function editView(ctx) {
    const id = ctx.params.id;
    ctx.render(editTemplate(ctx.data, submitHandler(onSubmit)));

    async function onSubmit({ name, author,resources, blogCount, description, readyForRead }) {
        blogCount = parseInt(blogCount);
        readyForRead = Boolean(readyForRead);

        if (name == '' || author == '' || resources == '' || Number.isNaN(blogCount) || description == '') {
            return alert('All fields are required');
        }

        const userId = ctx.user.objectId;

        description = description.replace(/\n/g, '<br>');
        resources = resources.replace(/\n/g, '<br>');


        await blogService.update(id, { name, author, resources, blogCount, description, readyForRead }, userId);

        ctx.page.redirect('/blogs/' + id);
    };
    
};

{/* <h1>Edit Blog</h1>
<form @submit=${onSubmit}>
    <label>Name: <input type="text" name="name" .value=${blog.name}></label>
    <label>Author: <input type="text" name="author" .value=${blog.author}></label>
    <label>Blog: <input type="number" name="blogCount" .value=${blog.blogCount}></label>
    <label>Description: <textarea name="description" .value=${blog.description}></textarea></label>
    <label>Ready For Read:  <input type="checkbox" name="readyForRead" .checked=${blog.readyForRead}></label>
    <button>Save changes</button>
</form> */}

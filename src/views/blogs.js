import { html } from '../lib/lit-html.js';

import * as blogService from '../data/blog.js';
import { repeat } from '../lib/directives/repeat.js';

const blogTemplate = (list) => html`
<!-- <h2>All blogs</h2> -->
    ${list}
`;

const listTemplate = (blogs) => html`
    <section>
        ${repeat(blogs, b => b.objectId, blogCard)}
    </section>
`;

const blogCard = (blog) => html`
<div class="blogs">
<div id="carousel" class="carousel slide">
    <div class="carousel-controls">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" style="background: url(src/img/forest.jpg)"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2" style="background: url(src/img/logo.png)"></button>
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3" style="background: url(src/img/forest.jpg)"></button>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <div>
            <i class='bx bx-left-arrow' alt></i>

            </div>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <div>
            <i class='bx bx-right-arrow'></i>
        </div>
        </button>
    </div>
  <div class="carousel-inner">
    <div 
        class="carousel-item active"
        style="background: url(src/img/forest.jpg)">
        <div class="container">
            <h2>Hi there</h2>
            <p>Again</p>
        </div>
    </div>
    <div 
        class="carousel-item"
        style="background: url(src/img/logo.png)">
    >
    <div class="container">
            <h2>Hi there 1</h2>
            <p>Again 1</p>
        </div>
    </div>
    <div 
        class="carousel-item"
        style="background: url(src/img/forest.jpg)">
    >
    <div class="container">
            <h2>Hi there 2</h2>
            <p>Again 2</p>
        </div>  
    </div>
  </div>
 
</div>
</div>
`;

export async function blogView(ctx) {
    ctx.render(blogTemplate(html`<p>Loading...</p>`));

    const { results: blogs } = await blogService.getAll(ctx.user?.objectId);

    ctx.render(blogTemplate(listTemplate(blogs)));
};
{/* <article>
<p>${blog.name}</p>
<p>${blog.author}</p>
<p>${blog.blogCount}</p>
<p>${blog.description}</p>
<p><a href="/blogs/${blog.objectId}">View Details</a></p>
<p>Created by: ${blog.owner.username}</p>
</article> */}
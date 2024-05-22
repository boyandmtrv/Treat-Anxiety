import { html } from '../lib/lit-html.js';

import * as blogService from '../data/blog.js';
import { repeat } from '../lib/directives/repeat.js';

const blogTemplate = (list) => html`
<div class="container">
<h2>All blogs</h2>
    ${list}
</div>
`;

const listTemplate = (blogs) => html`
    <section>
        ${repeat(blogs, b => b.objectId, blogCard)}
    </section>
`;

const blogCard = (blog) => html`
    <div class="cream-bg">
        <div class="container">
            <div class="row g-5 justify-content-evenly">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-6 col-md-5">
                                <img class="card-img img-fluid rounded-start" src="/src/img/main-img.png" alt="">
                            </div>
                            <div class="col-6 col-md-7">
                                <div class="card-body d-flex flex-column">
                                    <div class="h-100">
                                        <h3 class="card-title">check</h3>
                                        <h2 class="card-title">check</h2>
                                        <p class="card-text">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptas aperiam neque modi! Praesentium, cumque, at odio laboriosam id tenetur cum in excepturi minus earum beatae! Asperiores ad expedita officiis?
                                        </p>
                                        <h4 class="card-title mb-3">
                                            <strong>check</strong>
                                        </h4>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-dark">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
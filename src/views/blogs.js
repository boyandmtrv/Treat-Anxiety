import { html } from '../lib/lit-html.js';

import * as blogService from '../data/blog.js';
import { repeat } from '../lib/directives/repeat.js';

const loadingTemplate = html`
<div class="loader">
    <div class="lds-ripple"><div></div><div></div></div>
</div>
`;


// const imageUrls = [
//     '/src/img/vertical-one.jpg',
//     '/src/img/vertical-two.jpg',
//     '/src/img/vertical-three.jpg',
// ];

// const getRandomImageUrl = () => {
//     return imageUrls[Math.floor(Math.random() * imageUrls.length)];
// };


const blogTemplate = (list) => html`
<div class="card-area">
<div class="all-blogs wrapper">
        ${list}
        </div>
</div>
`;

const listTemplate = (blogs) => html`
<div class="blogs-container">
<h1 class="text-center">All blogs</h1>
    <div class="box-area">
        ${repeat(blogs, b => b.objectId, blogCard)}
    </div>
    </div>
`;

const blogCard = (blog) => html`
    <div class="box">
    <img src="/src/img/bg-blogs.png" alt="Blog image">
            <div class="overlay">
                <h3>${blog.name}</h3>
                <p class="p-read">${blog.blogCount} minutes to read</p>
                <p class="p-add">${blog.owner.username}</p>
                <a href="/blogs/${blog.objectId}">Read</a>
            </div>
    </div>
  
`;


export async function blogView(ctx) {
    ctx.render(loadingTemplate);

    const { results: blogs } = await blogService.getAll(ctx.user?.objectId);

    ctx.render(blogTemplate(listTemplate(blogs)));
};

//  <article>
// <p>${blog.name}</p>
// <p>${blog.author}</p>
// <p>${blog.blogCount}</p>
// <p>${blog.description}</p>
// <p><a href="/blogs/${blog.objectId}">View Details</a></p>
// <p>Created by: ${blog.owner.username}</p>
// </article> 
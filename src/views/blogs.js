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
        <div class="img-text">
            <img src="/src/img/bg-blogs.png" alt="Blog image">
            ${highlightLastWord(blog.name)}
        </div>
            <div class="overlay">
                <p class="p-read">${blog.blogCount} minutes to read</p>
                <p class="p-add">${blog.owner.username}</p>
                <a href="/blogs/${blog.objectId}">Read</a>
            </div>
    </div>

`;
function highlightLastWord(name) {
    const words = name.split(' ');
    const lastWord = words.pop(); 
    const coloredLastWord = html`<span class="last-word">${lastWord}</span>`; 
    return html`<h3>${words.join(' ')} ${coloredLastWord}</h3>`; 
}

export async function blogView(ctx) {
    ctx.render(loadingTemplate);

    const { results: blogs } = await blogService.getAll(ctx.user?.objectId);

    ctx.render(blogTemplate(listTemplate(blogs)));
};

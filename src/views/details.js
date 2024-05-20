import { deleteById, getById, getCommentsByBlogId, createComment, deleteComment, getReviewsByBlogId, deleteReview, createReview } from '../data/blog.js';
import { html } from '../lib/lit-html.js';
import { submitHandler, createPointer } from '../util.js';

const detailsTemplate = (blog, hasUser, isOwner, onDelete, comments, reviews, onSubmitComment, onDeleteComment, userId, onSubmitReview, onDeleteReview) => html`
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
    }

    <section>
        <h2>Comments</h2>
        <ul>
            ${comments.map(comment => html`
                <li>
                    <p><strong>${comment.owner.username}:</strong> ${comment.commentByUser}</p>
                    ${hasUser && comment.owner.objectId === userId ? html`
                        <button @click=${() => onDeleteComment(comment.objectId)}>Delete</button>
                    ` : null}
                </li>
            `)}
        </ul>
        ${hasUser ? html`
            <form @submit=${submitHandler((formData, form) => onSubmitComment(formData, form))}>
                <textarea name="commentByUser" placeholder="Write a comment..." required></textarea>
                <button type="submit">Submit Comment</button>
            </form>
        ` : html`<p>Please log in to comment.</p>`}
    </section>

    <section>
        <h2>Reviews</h2>
        <ul>
            ${reviews.map(review => html`
                <li>
                    <p><strong>${review.owner.username}:</strong> ${review.reviewByUser} - ${'★'.repeat(review.stars)} Stars</p>
                    ${hasUser && review.owner.objectId === userId ? html`
                        <button @click=${() => onDeleteReview(review.objectId)}>Delete</button>
                    ` : null}
                </li>
            `)}
        </ul>
        ${hasUser ? html`
            <form @submit=${submitHandler((formData, form) => onSubmitReview(formData, form))}>
                <textarea name="reviewByUser" placeholder="Write a review..." required></textarea>
                <div class="rating">
                    <input type="radio" id="star5" name="stars" value="5" required /><label for="star5">★</label>
                    <input type="radio" id="star4" name="stars" value="4" /><label for="star4">★</label>
                    <input type="radio" id="star3" name="stars" value="3" /><label for="star3">★</label>
                    <input type="radio" id="star2" name="stars" value="2" /><label for="star2">★</label>
                    <input type="radio" id="star1" name="stars" value="1" /><label for="star1">★</label>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        ` : html`<p>Please log in to review.</p>`}
    </section>
`;

export function detailsView(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    const userId = ctx.user?.objectId;
    const isOwner = ctx.data?.owner?.objectId === userId;

    ctx.render(html`<p>Loading...</p>`);

    async function loadDetails() {
        const blog = await getById(id);
        const comments = await getCommentsByBlogId(id);
        const reviews = await getReviewsByBlogId(id);

        ctx.render(detailsTemplate(blog, hasUser, isOwner, onDelete, comments.results, reviews.results, onSubmitComment, onDeleteComment, userId, onSubmitReview, onDeleteReview));
    }

    loadDetails();

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this blog?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/blogs');
        }
    }

    async function onSubmitComment({ commentByUser }, form) {
        if (!commentByUser) {
            return alert('Comment cannot be empty');
        }

        const commentData = {
            commentByUser,
            blog: createPointer('Blog', id),
            owner: createPointer('_User', userId)
        };

        await createComment(commentData);
        form.reset(); 
        loadDetails(); 
    }

    async function onDeleteComment(commentId) {
        const choice = confirm('Are you sure you want to delete this comment?');
        if (choice) {
            await deleteComment(commentId);
            loadDetails();  
        }
    }

    async function onSubmitReview({ reviewByUser, stars }, form) {
        if (!reviewByUser || !stars) {
            return alert('Review and stars cannot be empty');
        }

        const reviewData = {
            reviewByUser,
            blog: createPointer('Blog', id),
            owner: createPointer('_User', userId),
            stars: Number(stars),

        };

        await createReview(reviewData);
        form.reset(); 
        loadDetails(); 
    }

    async function onDeleteReview(reviewId) {
        const choice = confirm('Are you sure you want to delete this review?');
        if (choice) {
            await deleteReview(reviewId);
            loadDetails(); 
        }
    }
}
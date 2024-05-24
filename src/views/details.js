import { deleteById, getById, getCommentsByBlogId, createComment, deleteComment, getReviewsByBlogId, deleteReview, createReview } from '../data/blog.js';
import { html } from '../lib/lit-html.js';
import { submitHandler, createPointer } from '../util.js';

const detailsTemplate = (blog, hasUser, isOwner, onDelete, comments, reviews, onSubmitComment, onDeleteComment, userId, onSubmitReview, onDeleteReview) => html`
    <div class="details-container container mt-5 position-relative">
        <div class="row">
            <div class="details-col col-12 col-md-8 offset-md-2">
                <h1 class="text-center">${blog.name}</h1>
                <p class="text-muted text-center">by ${blog.author}</p>
                <p class="text-center">Minutes to reads: ${blog.blogCount}</p>
                <p class="lead">${blog.description}</p>
                <div class="d-flex justify-content-center">
                    ${hasUser && !isOwner ? html`
                        <a class="btn btn-primary mx-2" href="/blogs">Back to all blogs</a>` : null
                    }
                    ${isOwner ? html`
                        <a class="btn btn-warning mx-2" href="/edit/${blog.objectId}">Edit</a>
                        <button class="btn btn-danger mx-2" @click=${onDelete}>Delete</button>` : null
                    }
                </div>

                <div class="col-12 d-flex justify-content-center mt-4">
                    <p class="me-2"> 
                        <button class="btn btn-danger" data-bs-toggle="collapse" data-bs-target="#CommentCollapse" aria-expanded="false" aria-controls="CommentCollapse">Show comments</button>
                    </p> 
                    <p class="ms-2"> 
                        <button class="btn btn-danger" data-bs-toggle="collapse" data-bs-target="#ReviewCollapse" aria-expanded="false" aria-controls="ReviewCollapse">Show Reviews</button>
                    </p>
                </div>

                <div class="comment-body collapse collapse-right" id="CommentCollapse">
                    <div class="comment-body card card-body">
                        <section class="mt-5">
                            <h2>Comments</h2>
                            <ul class="list-group">
                                ${comments.map(comment => html`
                                    <li class="list-group-item">
                                        <p><strong>${comment.owner.username}:</strong> ${comment.commentByUser}</p>
                                        ${hasUser && comment.owner.objectId === userId ? html`
                                            <button class="btn btn-danger btn-sm" @click=${() => onDeleteComment(comment.objectId)}>Delete</button>
                                        ` : null}
                                    </li>
                                `)}
                            </ul>
                            ${hasUser ? html`
                                <form class="mt-3" @submit=${submitHandler((formData, form) => onSubmitComment(formData, form))}>
                                    <div class="mb-3">
                                        <textarea class="form-control" name="commentByUser" placeholder="Write a comment..." required></textarea>
                                    </div>
                                    <button class="btn btn-primary" type="submit">Submit Comment</button>
                                </form>
                            ` : html`<p>Please log in to comment.</p>`}
                        </section>
                    </div>
                </div>

                <div class="collapse collapse-right" id="ReviewCollapse">
                    <div class="card card-body">
                        <section class="mt-5">
                            <h2>Reviews</h2>
                            <ul class="list-group">
                                ${reviews.map(review => html`
                                    <li class="list-group-item">
                                        <p><strong>${review.owner.username}:</strong> ${review.reviewByUser} - ${'★'.repeat(review.stars)} Stars</p>
                                        ${hasUser && review.owner.objectId === userId ? html`
                                            <button class="btn btn-danger btn-sm" @click=${() => onDeleteReview(review.objectId)}>Delete</button>
                                        ` : null}
                                    </li>
                                `)}
                            </ul>
                            ${hasUser ? html`
                                <form class="mt-3" @submit=${submitHandler((formData, form) => onSubmitReview(formData, form))}>
                                    <div class="mb-3">
                                        <textarea class="form-control" name="reviewByUser" placeholder="Write a review..." required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <div class="rating d-flex justify-content-between">
                                            <input type="radio" id="star5" name="stars" value="5" required /><label for="star5">★</label>
                                            <input type="radio" id="star4" name="stars" value="4" /><label for="star4">★</label>
                                            <input type="radio" id="star3" name="stars" value="3" /><label for="star3">★</label>
                                            <input type="radio" id="star2" name="stars" value="2" /><label for="star2">★</label>
                                            <input type="radio" id="star1" name="stars" value="1" /><label for="star1">★</label>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" type="submit">Submit Review</button>
                                </form>
                            ` : html`<p>Please log in to review.</p>`}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

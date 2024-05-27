import { deleteById, getById, getCommentsByBlogId, createComment, deleteComment, getReviewsByBlogId, deleteReview, createReview } from '../data/blog.js';
import { html } from '../lib/lit-html.js';
import { submitHandler, createPointer } from '../util.js';

const detailsTemplate = (blog, hasUser, isOwner, onDelete, comments, reviews, onSubmitComment, onDeleteComment, userId, onSubmitReview, onDeleteReview) => html`
     <div class="details-container container">
        <div class="row">
            <div class="details-col">
                <h1 class="text-center">${blog.name}</h1>
                <p class="text-muted text-center">by ${blog.author}</p>
                <p class="text-center">Minutes to read: ${blog.blogCount}</p>
                <p class="lead" .innerHTML=${blog.description}></p>
                <div class="d-flex justify-content-center">
                    ${hasUser && !isOwner ? html`
                        <a class="btn btn-blogs mx-2" href="/blogs">Back to all blogs</a>` : null
                    }
                    ${isOwner ? html`
                        <a class="btn btn-warning mx-2" href="/edit/${blog.objectId}">Edit</a>
                        <button class="btn btn-danger mx-2" @click=${onDelete}>Delete</button>` : null
                    }
                </div>

                <div class="popup-sections">
                    <button 
                        class="navbar-toggler shadow-none section-buttons" 
                        type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#offcanvasNavbarComments" 
                        aria-controls="offcanvasNavbarComments" 
                        aria-label="Toggle navigation">
                        Show comments
                    </button>

                    <div class="bg-comment-section offcanvas offcanvas-end" tabindex="-1" 
                        id="offcanvasNavbarComments" aria-labelledby="offcanvasNavbarLabelComments">
                        <div class="offcanvas-header border-bottom">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabelComments">Comments</h5>
                            <button type="button" class="btn-close btn-close-white shadow-none" 
                                data-bs-dismiss="offcanvas" aria-label="Close">
                            </button>
                        </div>
                        <div class="offcanvascomments offcanvas-body d-flex flex-column p-4">
                            <div class="comment-body" id="CommentCollapse">
                                <section class="mt-5">
                                    <div class="list-group">
                                        ${comments.map(comment => html`
                                            <div class="list-group-items">
                                                <p><strong>${comment.owner.username}:</strong> ${comment.commentByUser}</p>
                                                ${hasUser && (comment.owner.objectId === userId || isOwner) ? html`
                                                    <button class="btn btn-comments btn-danger btn-sm" @click=${() => onDeleteComment(comment.objectId)}>Delete</button>
                                                ` : null}
                                            </div>
                                        `)}
                                    </div>
                                    ${hasUser ? html`
                                        <form class="mt-3" @submit=${submitHandler((formData, form) => onSubmitComment(formData, form))}>
                                            <div class="mb-3">
                                                <textarea class="details-forms form-control" name="commentByUser" placeholder="Write a comment..." required></textarea>
                                            </div>
                                            <button class="btn btn-primary" type="submit">Submit Comment</button>
                                        </form>
                                    ` : html`<p>Please log in to comment.</p>`}
                                </section>
                            </div>
                        </div>
                    </div>

                    <button 
                        class="navbar-toggler shadow-none section-buttons" 
                        type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#offcanvasNavbarReviews" 
                        aria-controls="offcanvasNavbarReviews" 
                        aria-label="Toggle navigation">
                        Show reviews
                    </button>

                    <div class="bg-review-section offcanvas offcanvas-end" tabindex="-1" 
                        id="offcanvasNavbarReviews" aria-labelledby="offcanvasNavbarLabelReviews">
                        <div class="offcanvas-header border-bottom">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabelReviews">Reviews</h5>
                            <button type="button" class="btn-close btn-close-white shadow-none" 
                                    data-bs-dismiss="offcanvas" aria-label="Close">
                            </button>
                        </div>
                        <div class="offcanvasreviews offcanvas-body d-flex flex-column p-4">
                            <div class="review-body" id="ReviewCollapse">
                                <section class="mt-5">
                                    <div class="list-group">
                                        ${reviews.map(review => html`
                                            <div class="list-group-items">
                                                <p><strong>${review.owner.username}:</strong> ${review.reviewByUser} - ${'★'.repeat(review.stars)} Stars</p>
                                                ${hasUser && (review.owner.objectId === userId || isOwner) ? html`
                                                    <button class="btn btn-reviews btn-danger btn-sm" @click=${() => onDeleteReview(review.objectId)}>Delete</button>
                                                ` : null}
                                            </div>
                                        `)}
                                    </div>
                                    ${hasUser ? html`
                                        <form class="mt-3" @submit=${submitHandler((formData, form) => onSubmitReview(formData, form))}>
                                            <div class="mb-3">
                                                <textarea class="details-forms form-control" name="reviewByUser" placeholder="Write a review..." required></textarea>
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
                                    ` : html`<p>Please log in to write a review.</p>`}
                                </section>
                            </div>
                        </div>
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

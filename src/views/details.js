import {
    deleteById,
    getById,
    getCommentsByBlogId,
    createComment,
    deleteComment,
    getReviewsByBlogId,
    deleteReview,
    createReview,
    getLikesByCommentId,
    createLike,
    deleteLike
} from '../data/blog.js';
import { html } from '../lib/lit-html.js';
import moment from '../lib/moment.js';

import { submitHandler, createPointer } from '../util.js';

const loadingTemplate = html`
<div class="loader">
    <div class="lds-ripple"><div></div><div></div></div>
</div>
`;


const detailsTemplate = (blog, hasUser, isOwner, onDelete, comments, reviews, onSubmitComment, onDeleteComment, userId, onSubmitReview, onDeleteReview, onLikeComment, onUnlikeComment) => html`
<div id="progress-bar"></div>
<div class="full-page-overlay">
     <div class="details-container container" id="detailsContainer">
        <div class="details-row row">
            <div class="details-col bg-transparent">
            ${highlightLastWord(blog.name)}
                <p class="author-text text-center">by ${blog.author}</p>
                <hr class="divider" >
                <!-- <p class="text-center">Minutes to read: ${blog.blogCount}</p> -->
                <p class="lead" .innerHTML=${blog.description}></p>
                <div class="d-flex justify-content-center">
                    <!-- ${hasUser && !isOwner ? html`
                        <a class="btn btn-blogs mx-2" href="/blogs">Back to all blogs</a>` : null
                    } -->
                    ${isOwner ? html`
                        <a class="btn btn-warning mx-2" href="/edit/${blog.objectId}">Edit</a>
                        <button class="btn btn-danger mx-2" @click=${onDelete}>Delete</button>` : null
                    }
                </div>

                <div class="popup-sections">
                    <div class="buttons-direction">
                        <button 
                            class="show-btn navbar-toggler shadow-none section-buttons" 
                            type="button" 
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasNavbarComments" 
                            aria-controls="offcanvasNavbarComments" 
                            aria-label="Toggle navigation">
                            Show comments
                            <i class='drop-arrow bx bxs-chevron-right'></i>
                        </button>
                    </div>

                    <div class="bg-comment-section offcanvas offcanvas-end" tabindex="-1" 
                        id="offcanvasNavbarComments" aria-labelledby="offcanvasNavbarLabelComments" >
                        <div class="offcanvas-header border-bottom">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabelComments">Comments</h5>
                            <button type="button" class="btn-close bg-transparent btn-close-white shadow-none" 
                                data-bs-dismiss="offcanvas" aria-label="Close">
                            </button>
                        </div>
                        <div class="offcanvascomments offcanvas-body d-flex flex-column p-4">
                            <div class="comment-body" id="CommentCollapse">
                                <section class="mt-5">
                                    <div class="list-group">
                                        ${comments.map(comment => html`
                                        <div class="comment-container d-flex justify-content-between align-items-center">
                                            <p class="username mb-1"><strong>${comment.owner.username}</strong></p>
                                            ${hasUser && (comment.owner.objectId === userId || isOwner) ? html`
                                                <button class="btn btn-comments btn-sm" @click=${() => onDeleteComment(comment.objectId)}>
                                                    <i class='bx bx-trash'></i>
                                                </button>
                                            ` : html`<span class="comment-actions"></span>`}
                                        </div>
                                        <div class="list-group-items mb-3 d-flex justify-content-between align-items-center">
                                            <div class="comment-content">
                                                    <p class="time-posted">${moment(comment.createdAt).fromNow()}</p>
                                                <p class="comment-description mb-1">${comment.commentByUser}</p>
                                                <div class="like-section">
                                                <span class="likes-length">${comment.likes.length} likes</span>
                                                ${hasUser ? html`
                                                    ${comment.likes.includes(userId) ? html`
                                                        <button class="btn btn-like btn-sm" @click=${() => onUnlikeComment(comment.objectId)}><i class='bx bxs-heart' ></i></button>
                                                    ` : html`
                                                        <button class="btn btn-unlike btn-sm" @click=${() => onLikeComment(comment.objectId)}><i class='bx bx-heart'></i></button>
                                                    `}
                                                ` : null}                                                                                            
                                            </div>
                                            
                                            </div>
                                            
                                            `)}

                                    </div>
                                    ${hasUser ? html`
                                        <form class="mt-3" @submit=${submitHandler((formData, form) => onSubmitComment(formData, form))}>
                                            <div class="mb-3">
                                                <textarea class="details-forms form-control" name="commentByUser" placeholder="Write a comment..." required></textarea>
                                            </div>
                                            <button class="btn-submit btn btn-primary" type="submit">Submit Comment</button>
                                        </form>
                                    ` : html`<p>Please log in to comment.</p>`}
                                </section>
                            </div>
                        </div>
                    </div>

                    <div class="buttons-direction">
                        <button 
                            class="show-btn navbar-toggler shadow-none section-buttons" 
                            type="button" 
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasNavbarReviews" 
                            aria-controls="offcanvasNavbarReviews" 
                            aria-label="Toggle navigation">
                            Show reviews
                            <i class='drop-arrow bx bxs-chevron-right'></i>
                        </button>
                    </div>

                    <div class="bg-review-section offcanvas offcanvas-end" tabindex="-1" 
                        id="offcanvasNavbarReviews" aria-labelledby="offcanvasNavbarLabelReviews">
                        <div class="offcanvas-header border-bottom">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabelReviews">Reviews</h5>
                            <button type="button" class="btn-close bg-transparent btn-close-white shadow-none" 
                                    data-bs-dismiss="offcanvas" aria-label="Close">
                            </button>
                        </div>
                        <div class="offcanvasreviews offcanvas-body d-flex flex-column p-4">
                            <div class="review-body" id="ReviewCollapse">
                                <section class="mt-5">
                                        ${reviews.map(review => html`
                                            <div class="comment-container d-flex justify-content-between align-items-center">
                                                <p class="username"><strong>${review.owner.username}</strong></p>
                                                ${hasUser && (review.owner.objectId === userId || isOwner) ? html`
                                                    <button class="btn btn-reviews btn-sm" @click=${() => onDeleteReview(review.objectId)}><i class='bx bx-trash'></i></button>
                                                ` : html`<span class="comment-actions"></span>`}
                                            </div>
                                            <div class="list-group-items mb-3 d-flex justify-content-between align-items-center">
                                                <div class="comment-content">
                                                    <p class="time-posted-review">${moment(review.createdAt).fromNow()}</p>
                                                    <div class="rating">
                                                        ${'★'.repeat(review.stars)}
                                                    </div>
                                                    <p class="user-review mb-1">${review.reviewByUser}</p>
                                                </div>
                                            </div>
                                        `)}
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
                                            <button class="btn-submit btn btn-primary" type="submit">Submit Review</button>
                                        </form>
                                    ` : html`<p>Please log in to write a review.</p>`}
                                </section>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="resources-dropdown dropdown mt-3">
            <button class="resources-btn btn btn-secondary dropdown-toggle" type="button" id="source-dropdown" data-bs-toggle="dropdown">
                Resources
            </button>
            <div class="expanded-resourses dropdown-menu" aria-labelledby="source-dropdown">
                ${blog.resources.split('<br>').map(resource => html`
                    <div class="dropdown-item">
                        <a href=${resource} target="_blank">${resource}</a>
                    </div>
                `)}
            </div>
        </div>
    </div>
</div>
`;


function highlightLastWord(name) {
    const words = name.split(' ');
    const lastWord = words.pop();
    const coloredLastWord = html`<span class="last-word">${lastWord}</span>`;
    return html`<h3 class="fonts-words">${words.join(' ')} ${coloredLastWord}</h3>`;
}



export function detailsView(ctx) {
    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    const userId = ctx.user?.objectId;
    const isOwner = ctx.data?.owner?.objectId === userId;

    ctx.render(loadingTemplate);

    async function loadDetails() {
        const blog = await getById(id);
        const comments = await getCommentsByBlogId(id);
        const reviews = await getReviewsByBlogId(id);

        const commentsWithLikes = await Promise.all(comments.results.map(async (comment) => {
            const likes = await getLikesByCommentId(comment.objectId);
            comment.likes = likes.results.map(like => like.owner ? like.owner.objectId : null).filter(Boolean);
            return comment;
        }));

        ctx.render(detailsTemplate(blog, hasUser, isOwner, onDelete, comments.results, reviews.results, onSubmitComment, onDeleteComment, userId, onSubmitReview, onDeleteReview, onLikeComment, onUnlikeComment, commentsWithLikes));

        updateProgressBar();

        setTimeout(() => {
            const detailsContainer = document.getElementById('detailsContainer');
            detailsContainer.addEventListener('scroll', updateProgressBar);
        }, 100);

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

    async function onLikeComment(commentId) {
        const likeData = {
            comment: createPointer('Comments', commentId),
            owner: createPointer('_User', userId)
        };

        await createLike(likeData);
        loadDetails();
    }

    async function onUnlikeComment(commentId) {
        const likes = await getLikesByCommentId(commentId);
        const like = likes.results.find(like => like.owner && like.owner.objectId === userId);

        if (like) {
            await deleteLike(like.objectId);
            loadDetails();
        }
    }


    function updateProgressBar() {
        const detailsContainer = document.getElementById('detailsContainer');
        if (!detailsContainer) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = detailsContainer;

        const scrollPercent = `${(scrollTop / (scrollHeight - clientHeight)) * 100}%`;

        document.querySelector('#progress-bar').style.setProperty('--progress', scrollPercent)
    }

}


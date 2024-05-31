import { addOwner, encodeObject, filterRelation } from "../util.js";
import { del, get, post, put } from "./api.js";
import { CONFIG } from '../config.js';

const endPoints = {
    'blogs': `/classes/Blog?where=${encodeObject({ readyForRead: true })}&include=owner`,
    'blogsWithUser': (userId) => `/classes/Blog?where=${encodeObject({ $or: [{ readyForRead: true }, filterRelation('owner', '_User', userId)] })}&include=owner`,
    'blogById': `/classes/Blog/`,
    'commentsByBlogId': (blogId) => `/classes/Comments?where=${encodeObject({ blog: { "__type": "Pointer", "className": "Blog", "objectId": blogId } })}&include=owner`,
    'comment': `/classes/Comments`,
    'reviewsByBlogId': (blogId) => `/classes/Reviews?where=${encodeObject({ blog: { "__type": "Pointer", "className": "Blog", "objectId": blogId } })}&include=owner`,
    'review': `/classes/Reviews`,
    'likesByCommentId': (commentId) => `/classes/Likes?where=${encodeObject({ comment: { "__type": "Pointer", "className": "Comments", "objectId": commentId } })}&include=owner`,
    'like': `/classes/Likes`
};

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;

export async function getAll(userId) {
    if (userId) {
        return get(endPoints.blogsWithUser(userId))
    } else {
        return get(endPoints.blogs)
    }
}


export async function getById(id) {
    return get(endPoints.blogById + id)
}

export async function create(blogData, userId) {
    if (userId === SPECIAL_USER_ID) {
        blogData = addOwner(blogData, userId);
    }
    return post(endPoints.blogs, blogData)
}

export async function update(id, blogData, userId) {
    return put(endPoints.blogById + id, addOwner(blogData, userId))
}

export async function deleteById(id) {
    return del(endPoints.blogById + id)
}

export async function getCommentsByBlogId(blogId) {
    return get(endPoints.commentsByBlogId(blogId));
}

export async function createComment(commentData) {
    return post(endPoints.comment, commentData);
}

export async function deleteComment(commentId) {
    return del(endPoints.comment + '/' + commentId);
}

export async function getReviewsByBlogId(blogId) {
    return get(endPoints.reviewsByBlogId(blogId));
}

export async function createReview(reviewData) {
    return post(endPoints.review, reviewData);
}

export async function deleteReview(reviewId) {
    return del(endPoints.review + '/' + reviewId);
}

export async function getLikesByCommentId(commentId) {
    return get(endPoints.likesByCommentId(commentId));
}

export async function createLike(likeData) {
    return post(endPoints.like, likeData);
}

export async function deleteLike(likeId) {
    return del(endPoints.like + '/' + likeId);
}
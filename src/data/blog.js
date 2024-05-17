import { addOwner, encodeObject, filterRelation } from "../util.js";
import { del, get, post, put } from "./api.js";
import { CONFIG } from '../config.js';

const endPoints = {
    'blogs': `/classes/Blog?where=${encodeObject({ readyForRead: true })}&include=owner`,
    'blogsWithUser': (userId) => `/classes/Blog?where=${encodeObject({ $or: [{ readyForRead: true }, filterRelation('owner', '_User', userId)] })}&include=owner`,
    'blogById': `/classes/Blog/`,
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

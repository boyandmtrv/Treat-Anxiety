import { addOwner } from "../util.js";
import { del, get, post, put } from "./api.js";
import { CONFIG } from '../config.js';

const endPoints = {
    'blogs': '/classes/Blog',
    'blogById': '/classes/Blog/',
};

const SPECIAL_USER_ID = CONFIG.SPECIAL_USER_ID;


export async function getAll() {
    return get(endPoints.blogs)
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
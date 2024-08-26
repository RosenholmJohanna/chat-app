const BASE_URL = "https://chatify-api.up.railway.app";

export const GET_CSRF_TOKEN = `${BASE_URL}/csrf`;
export const LOGIN_USER = `${BASE_URL}/auth/token`;
export const REGISTER_USER  = `${BASE_URL}/register`;

export const GET_USERS = `${BASE_URL}/users`;
export const GET_USER = (slug) => `${BASE_URL}/users/${slug}`;
export const DELETE_USER = (slug) => `${BASE_URL}/users/${slug}`;

export const POST_MESSAGE = `${BASE_URL}/messages`;
export const GET_MESSAGES = `${BASE_URL}/messages`;
export const GET_CONVO_MESSAGES = (slug) => `${BASE_URL}/messages?conversationId=${slug}`;

export const GET_CONVERSATIONS_ID = `${BASE_URL}/conversations`;

export const INVITE_USER = (slug) => `${BASE_URL}/invite/${slug}`;

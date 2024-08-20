export const GET_USER_ALL = "https://nhom10.azurewebsites.net/api/users";
export const GET_USER_QUESTION = "https://nhom10.azurewebsites.net/api/posts";
export const GET_QUESTION_DETAIL = (id) => `https://nhom10.azurewebsites.net/api/posts/${id}`;
export const GET_ANSWERS_DETAIL_BY_ID_QUESTION = (id) => `https://nhom10.azurewebsites.net/api/answers/${id}`;
export const DELETE_POST = (id) => `https://nhom10.azurewebsites.net/api/posts/${id}`;
export const POST_ANSWERS = "https://nhom10.azurewebsites.net/api/answers";
export const UPDATE_QUESTION_DETAIL = (id) => `https://nhom10.azurewebsites.net/api/posts/${id}`;
export const DELETE_QUESTION = (id) => `https://nhom10.azurewebsites.net/api/posts/${id}`;
export const API_ADD_QUESTION = "https://nhom10.azurewebsites.net/api/posts"; // URL endpoint của API để thêm câu hỏi

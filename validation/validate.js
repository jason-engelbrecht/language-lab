export const isValidEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isValidPassword = (password) => {
    return password.length >= 8; // && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

export const userSchema = {
    email: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    password: {
        exists: true,
        notEmpty: true,
    }
}
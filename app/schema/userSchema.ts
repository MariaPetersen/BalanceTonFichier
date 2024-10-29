export const userSchema = {
    username: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    password: {
        exists: true,
        notEmpty: true,
    }
}
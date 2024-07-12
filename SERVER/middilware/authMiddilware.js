import bcrypt from 'bcrypt';

export const HashPassword = async (password) => {
    const saltRounds = 10;
    const hassedPassword = await bcrypt.hash(password, saltRounds);
    return hassedPassword;

}

export const ComparePassword = async (password, hassedPassword) => {
    return bcrypt.compare(password, hassedPassword);


}
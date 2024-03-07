class Views{
    static edit = (req, res, next) => {
        res.status(200).render('edit', {
        title: 'Edit',
        });
    };
    
    static home = (req, res, next) => {
        res.status(200).render('home', {
        title: 'over views',
        });
    };
    
    static login = (req, res, next) => {
        res.status(200).render('login', {
        title: 'Login',
        });
    };
    
    static register = (req, res, next) => {
        res.status(200).render('register', {
        title: 'Register',
        });
    };
    
    static secrets = (req, res, next) => {
        res.status(200).render('secrets', {
        title: 'Secrets',
        });
    };
    
    static submit = (req, res, next) => {
        res.status(200).render('submit', {
        title: 'Submit',
        });
    };
}


module.exports = Views
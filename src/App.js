import App from 'App.nijor';
import Home from 'pages/home.nijor';
import Hello from 'pages/hello.nijor';
import Router from 'nijor/router';
const router = new Router('#n-routes');
router.render('/',Home);
router.render('/hello',Hello);
router.route(App);
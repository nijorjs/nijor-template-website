import "nijor";
import App from 'App.nijor';
import Home from 'pages/home.nijor';
import Hello from 'pages/hello.nijor';
import Router from 'nijor/router';
const router = new Router('#n-routes');
router.route('/',Home);
router.route('/hello',Hello);
router.render(App);
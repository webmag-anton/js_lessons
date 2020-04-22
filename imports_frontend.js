/* 
                           IMPORTS

   HTML:

<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

   CSS:
@import "style/main.css"
@import url("https://webref.ru/style.css")

   SCSS:
@import media.scss";
@import media";       (media.scss / _media.scss или media.css)

   JS:
<script type="module">
  import {sayHi} from './say.js';
  document.body.innerHTML = sayHi('John');
</script>


   Webpack (React) CSS:
@import '~normalize.css';  или  @import '~normalize.css/normalize.css';           (из /node_modules)
@import "~materialize-css/dist/css/materialize.min.css";
@import 'fonts.css';

   Webpack (React) JS:
import Post from './Post'                             (.js не обязательно)
import './styles/styles.css'
import json from './assets/json'                      (.json не обязательно)
import webpackLogo from './assets/logo.png'
import * as $ from 'jquery'                           (путь к /node_modules не пишется, обычно скрипт берется из /dist)
import './styles/scss.scss'
import './babel'	                                    (подключить модуль, но не присваивать его переменной)


*/
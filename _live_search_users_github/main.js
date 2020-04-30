import {View} from './modules/view.js'
import {Search} from './modules/search.js'

// передаем аргументом инстенс (экземпляр), отвечающий за отображение, 
// получая доступ к UI, который мы будем менять при поиске
const app = new Search( new View() )  
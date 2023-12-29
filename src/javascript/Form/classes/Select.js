import selectOption from "../utility/selectOption";
import selectBack from "../utility/selectBack";
import fetchCategories from "../../API/fetchCategories";
import removeButton from "../../Common/removeButton";

export default class Select {
    constructor(select) {
        this.select = select;

        this.selectToggle = this.select.querySelector('.select__toggle');
        /**
         выпадаюищй лист, его содержание
         */
        this.selectList = this.select.querySelector('.select__list');
        /**
         инпут со значением выбранной категории
         */
        this.input = this.select.querySelector('input');
        /**
         слушатель вынесен в конструкт, чтобы не инициализировать его каждый раз при вызове init()
         */
        this.selectToggle.addEventListener('click', event => {

            /**
             если это кнопка отчистки поля, не надо открывать селект после
             */
            if (event.target.tagName === 'BUTTON') {
                return false;
            }

            this.selectToggleHandler(event)
        })
        /**
         обсервер, который следит за изменениями выпадающего листа и вешает слушатели на вновь появившиеся элементы
         */
        this.listMutationObserver();

        this.clonedListObjects = {
            firstLevel: null,
            secondLevel: null,
        }
        this.clonedListObjects.firstLevel = this.selectList.innerHTML;
    }

    init() {
        /**
         * слушатель для выбора опции
         */
        this.select.querySelectorAll('.js-option').forEach(option => {
            option.addEventListener('click', event => {
                this.optionHandler(event)
            })
        })

        /**
         * слушатель для создания динамичного селекта категорий
         */
        document.querySelectorAll('.js-sublist').forEach(button => {
            button.addEventListener('click', event => {
                this.getSubcategories(event)
            })
        })
        /**
         * слушатель для кнопки Назад. Стоит проверка на null, тк мы его создаем в дальнейшем.
         */
        const backButton = document.querySelector( '.js-back ');
        if( backButton !== null ) {
            document.querySelector( '.js-back ').addEventListener( 'click', event => {
                this.backButtonHandler( event )
            })
        }


    }

    async getSubcategories(event) {
        event.preventDefault();

        let $this = event.currentTarget,
            /**
             *
             * Это textContent моего самодельного option, по которому мы будем искать нужную категорию в полученном далее массиве данных
             */

            categoryName = $this.previousElementSibling.textContent.trim();

        /**
         *
         * сам массив данных с категориями второго и третьего уровней.
         */
        let categoriesJson = await fetchCategories(categoryName);

        let categoryLevel = $this.dataset.level;


        this.selectList.innerHTML = selectBack( categoryLevel )

        switch (categoryLevel) {
            case 'second':
                const secondLevelCategories = categoriesJson.filter(item => item.parent_name === categoryName);
                this.selectList.innerHTML += secondLevelCategories.map((item) => selectOption(item)).join('');

                this.clonedListObjects.secondLevel = this.selectList.innerHTML;
                break;
            case 'third':
                const foundCategories = categoriesJson.find(item => item.level_name === categoryName);
                const thirdLevelCategories = foundCategories.thirdLevelCategories;

                this.selectList.innerHTML += thirdLevelCategories.map((item) => selectOption(item)).join('');
                break;
            default:
                console.log(`Error`);
        }

    }

    selectToggleHandler(event) {
        const $this = event.target;

        if (!this.select.classList.contains('active')) {
            this.select.classList.add('active')
        } else {
            this.select.classList.remove('active');
        }

    }

    async optionHandler(event) {
        this.input.value = event.target.textContent.trim();
        this.select.classList.remove('active');

        /**
         * При выборе фильтра отправлять на бек одноуровневый массив с рубриками</br>
         *
         */

        this.sendCategoriesToBackend( this.input.value  )

        if( this.input.value !== null ) {
            removeButton( this.input )
        }
    }

    backButtonHandler( event ) {
        event.preventDefault();

        let $this = event.target,
            previousLevel = $this.dataset.previous;

        switch (previousLevel) {
            case 'first':
                this.selectList.innerHTML = this.clonedListObjects.firstLevel;
                break;
            case 'second':
                this.selectList.innerHTML = this.clonedListObjects.secondLevel;
                break;
            default:
                /**
                 * в случае чего просто вернем на первый лист
                 *
                 */
                this.selectList.innerHTML = this.clonedListObjects.firstLevel;
        }
    }
    listMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            /**
             * чтобы не писать еще раз querySelectorAll. В init у меня все слушатели.
             * без forEach, ктк мне нужно вызывать init единожды, а не на каждую мутацию
             */
            this.init();
        });

        const config = {attributes: true, childList: true, subtree: true, characterData: true};

        observer.observe(this.selectList, config);
    }

    async sendCategoriesToBackend( value ) {
        let categories = await fetchCategories( value );

        const flattenedArray = [];


        categories.forEach(item => {
            flattenedArray.push(item.level_name);
            flattenedArray.push(item.parent_name);

            if (item.thirdLevelCategories) {
                item.thirdLevelCategories.forEach(subItem => {
                    flattenedArray.push(subItem.level_name);
                });
            }
        });

        let data = new FormData();
        data.append("action", "send_cats");
        data.append("nonce", wpData.nonce);
        data.append("categories", JSON.stringify(flattenedArray));

        const admin_ajax_url = wpData.ajax_url;

        fetch(admin_ajax_url, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }
}
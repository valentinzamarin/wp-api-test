<?php get_header(); ?>
<main class="site-main">
    <div class="container">
        <h1 class="title">
            Статьи
        </h1>
        <form id="form" class="site-form">
            <div class="site-form__fields">
                <div class="site-form__group">
                    <div class="site-form__label">
                        <label for="dateInput">Дата публикации</label>
                    </div>
                    <div class="site-form__input">
                        <input type="text" id="dateInput" name="dateInput">
                        <span class="site-form__remove"></span>
                    </div>

                </div>
                <div class="site-form__group">
                    <div class="site-form__label">
                        <label for="category">Категория</label>
                    </div>
                    <div class="select">
                        <div class="select__toggle">
                            <input type="text" id="category" name="category" readonly />
                            <button class="site-form__remove site-form__remove--select"></button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#302F2D" stroke-width="2"/>
                            </svg>
                        </div>
                        <div class="select__list">
                            <?php select_list(); ?>
                        </div>
                    </div>
                </div>
            </div>
            <input type="submit" class="site-form__button" value="Применить фильтры">
        </form>
        <div class="posts"></div>
    </div>
</main>
<?php get_footer(); ?>

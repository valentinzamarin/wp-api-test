<?php
$category = $args['category'];
?>
<div class="select__option">
    <?php echo esc_html($category->name);
    if (check_category_childs($category->term_id)) : ?>
        <svg class="select_subcategory" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#302F2D" stroke-width="2"/>
        </svg>
    <?php endif; ?>
</div>
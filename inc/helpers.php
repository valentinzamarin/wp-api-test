<?php

function select_list() {
    $categories = get_categories([
        'hide_empty' => true,
    ]);
    foreach ($categories as $category) :
        if ($category->parent == 0) :
            get_template_part('template-parts/select', 'option', ['category' => $category]);
        endif;
    endforeach;
}


function check_category_childs( int $term_id ) {
    global $wpdb;

    $query = $wpdb->prepare(
        "SELECT COUNT(*) AS count_child_categories
                FROM {$wpdb->term_taxonomy}
                WHERE parent = %d",
        $term_id
    );

    $count_child_categories = $wpdb->get_var( $query );

    if ( $count_child_categories > 0 ) {
        return true;
    }

    return false;
}
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

    $query = $wpdb->prepare("
        SELECT COUNT(*) AS count_child_categories
        FROM {$wpdb->term_taxonomy} tt
        WHERE tt.parent = %d
        AND EXISTS (
            SELECT 1
            FROM {$wpdb->term_relationships} tr
            INNER JOIN {$wpdb->posts} p ON tr.object_id = p.ID
            WHERE tr.term_taxonomy_id = tt.term_taxonomy_id
            AND p.post_type = 'post'  -- Указать тип постов, который нужно проверить
            AND p.post_status = 'publish'  -- Указать статус постов, который нужно проверить
            LIMIT 1
        )
    ", $term_id);

    $count_child_categories = $wpdb->get_var($query);

    if ($count_child_categories > 0) {
        return true;
    }

    return false;
}
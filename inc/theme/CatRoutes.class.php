<?php

namespace inc\theme;

final class CatRoutes{
    private static $_instance = null;
    public static function instance() {
        if ( ! self::$_instance ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_child_category_route']);
    }

    public function register_child_category_route() {
        register_rest_route('hierarchy_cats/v2', '/categories', array(
            'methods' => 'GET',
            'callback' => [ $this, 'get_categories_hierarchy' ],
        ));
    }


    public function get_categories_hierarchy() {

        global $wpdb;

        $results = $wpdb->get_results("
    SELECT t1.term_id, t1.name as level_2_name, tt2.term_id as parent_id, t2.name as parent_name
    FROM {$wpdb->terms} t1
    INNER JOIN {$wpdb->term_taxonomy} tt1 ON t1.term_id = tt1.term_id
    INNER JOIN {$wpdb->term_taxonomy} tt2 ON tt1.parent = tt2.term_taxonomy_id
    INNER JOIN {$wpdb->terms} t2 ON t2.term_id = tt2.term_id
    WHERE tt2.taxonomy = 'category'
    AND tt2.parent = 0
    AND tt1.taxonomy = 'category'
    AND tt1.count > 0
");

        $categories_hierarchy = array();

        foreach ($results as $result) {
            $category = array(
                'parent_id' => $result->parent_id,
                'parent_name' => $result->parent_name,
                'level_2_id' => $result->term_id,
                'level_name' => $result->level_2_name,
                'children' => array()
            );

            $children = $wpdb->get_results($wpdb->prepare("
        SELECT t3.term_id, t3.name
        FROM {$wpdb->terms} t3
        INNER JOIN {$wpdb->term_taxonomy} tt3 ON t3.term_id = tt3.term_id
        WHERE tt3.taxonomy = 'category'
        AND tt3.parent = %d
        AND tt3.count > 0
    ", $result->term_id));

            foreach ($children as $child) {
                $category['children'][] = array(
                    'level_3_id' => $child->term_id,
                    'level_name' => $child->name
                );
            }

            $categories_hierarchy[] = $category;
        }

        return $categories_hierarchy;
    }
}
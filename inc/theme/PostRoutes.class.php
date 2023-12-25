<?php

namespace inc\theme;

final class PostRoutes{
    private static $_instance = null;
    public static function instance() {
        if ( ! self::$_instance ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }
    public function __construct() {
        add_action('rest_api_init', [ $this, 'register_posts_list_route']);
    }
    public function register_posts_list_route() {
        register_rest_route('list/v2', '/posts', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_posts_list_data' ],
        ]);
    }

    function get_posts_list_data($data) {
        $args = [
            'post_type' => 'post',
            'posts_per_page' => $data['per_page'],
            'paged' => $data['paged'],
        ];

        $posts = get_posts($args);

        if (empty($posts)) {
            return new WP_Error('no_posts', 'No posts found', array('status' => 404));
        }

        $formatted_posts = array();

        foreach ($posts as $post) {

            $post_cats = $this->get_post_categories( $post->ID );

            $formatted_posts[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
                'pic' => get_the_post_thumbnail_url( $post->ID, 'grid-thumb' ),
                'date' => get_the_date('d.m.Y, H:i', $post->ID ),
                'categories' => $post_cats,
//                'author' => $author_id = get_post_field ('post_author', $id);

            );
        }

        return $formatted_posts;
    }

    public function get_post_categories( int $id ) {
        $categories = wp_get_post_categories($id);
        sort($categories);

        $cats = [];
        foreach ( $categories as $category ) :
            $cats[] = [
                'cat_name' => get_cat_name( $category ),
                'cat_link' => get_category_link( $category ),
            ];
        endforeach;

        return $cats;
    }
}
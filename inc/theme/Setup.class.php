<?php

namespace inc\theme;


final class Setup {
    private static $_instance = null;

    public static function instance() {
        if ( ! self::$_instance ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function __construct() {

        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

    }

    public function enqueue_scripts() {

        $time = time();

        wp_enqueue_style( 'font', 'https://design.nuzhnapomosh.ru/fonts/fonts-futura-leksa-romanovsky.css', [], $time );
        wp_enqueue_style( 'style', get_stylesheet_uri(), [], $time );

        wp_dequeue_script( 'jquery');
        wp_deregister_script( 'jquery');
        wp_enqueue_script( 'scripts', TEMPLATE_URL . '/scripts.js', [], $time, true );


        wp_localize_script(
            'scripts',
            'wpData',
            [
                'postsApiUrl' => site_url() . '/wp-json/list/v2/posts',
                'catApiUrl'  => site_url() . '/wp-json/hierarchy_cats/v2/categories',
            ]
        );

    }
}
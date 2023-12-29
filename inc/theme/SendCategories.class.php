<?php

namespace inc\theme;

class SendCategories{
    private static $_instance = null;
    public static function instance() {
        if ( ! self::$_instance ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function __construct() {
        add_action('wp_ajax_send_cats', [$this, 'send_single_level_array']);
        add_action('wp_ajax_nopriv_send_cats', [$this, 'send_single_level_array']);
    }

    public function send_single_level_array() {
        check_ajax_referer('send_cats', 'nonce');

        if (isset($_POST['categories'])) {
            $categories = json_decode(stripslashes($_POST['categories']), true);
            wp_send_json_success($categories);
        }

        wp_send_json_error();
    }
}
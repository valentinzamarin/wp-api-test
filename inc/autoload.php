<?php

namespace inc;

use inc\theme\CatRoutes;
use inc\theme\SendCategories;
use inc\theme\Setup;
use inc\theme\PostRoutes;

spl_autoload_register( function ( $class ) {
    $class = str_replace( __NAMESPACE__, '', $class );
    $class = str_replace( '\\', DIRECTORY_SEPARATOR, $class ) . '.class.php';

    $directory = get_theme_file_path();
    $path      = $directory . DIRECTORY_SEPARATOR . 'inc' . $class;

    if ( file_exists( $path ) ) {
        require_once( $path );
    }
} );

if ( function_exists( '__autoload' ) ) {
    spl_autoload_register( '__autoload' );
}

Setup::instance();
PostRoutes::instance();
CatRoutes::instance();
SendCategories::instance();
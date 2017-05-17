<?php

/*
    This is just a fancy wrapper file for stylish URLs
    Unnecessary, but better looking.
*/

// Taken from http://stackoverflow.com/a/14103883
function exception_error_handler() {
    header('HTTP/1.1 500 Internal Server Error');
    if(is_file(__DIR__.'/../html/500.html'))
    {
        require(__DIR__.'/../html/404.html');
    } else {
        ?>
        <h1>Something goofed really hard</h1>
        <p>We're working on it, sit tight</p>
        <?php
    }
    // I'll just leave this here for debug purposes.
    //throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
}
set_error_handler("exception_error_handler");

// Taken from http://stackoverflow.com/a/6225706
function sanitize_output($buffer) {

    $search = array(
        '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
        '/[^\S ]+\</s',     // strip whitespaces before tags, except space
        '/(\s)+/s',         // shorten multiple whitespace sequences
    );

    $replace = array(
        '>',
        '<',
        '\\1',
        ''
    );

    $buffer = preg_replace($search, $replace, $buffer);

    return $buffer;
}
ob_start("sanitize_output");


switch( parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) )
{
    case '/':
        require(__DIR__ . '/../html/index.html');
        break;
    case '/about':
        require(__DIR__ . '/../html/about.html');
        break;
    case '/legal':
        header('Location: https://skildust.com/imprint');
        break;
    default:
        require(__DIR__ . '/../html/404.html');
        break;
}

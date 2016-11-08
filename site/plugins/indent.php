<?php

/**
 * Indent Plugin
 *
 */
kirbytext::$pre[] = function($kirbytext, $text) {

  $text = preg_replace_callback('!\(indent(…|\.{3})\)(.*?)\((…|\.{3})indent\)!is', function($matches) use($kirbytext) {

    $indent = $matches[2];

    return '<div class="indent">'. kirbytext($indent) .'</div>';

  }, $text);

  return $text;

};
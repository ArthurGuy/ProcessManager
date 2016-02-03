<?php

if (!function_exists('versioned_asset')) {
    /**
     * Get the path to a versioned Elixir file.
     *
     * @param  string $file
     * @return string
     */
    function versioned_asset($file)
    {
        if (env('APP_ENV') === 'testing') {
            return;
        }

        if (env('APP_ENV') === 'local') {
            // Display unversioned files locally
            return $file;
        }

        static $manifest = null;

        if (is_null($manifest)) {
            $manifest = json_decode(file_get_contents(public_path() . '/build/rev-manifest.json'), true);
        }

        // Manifest file ignores build folder
        $file = str_replace('build/', '', $file);

        if (isset($manifest[$file])) {
            return '/build/' . $manifest[$file];
        }

        throw new InvalidArgumentException("File {$file} not defined in asset manifest.");
    }
}
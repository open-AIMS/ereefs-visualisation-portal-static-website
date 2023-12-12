import os
import jsmin
import logging

# Setup basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def minify_js(directory):
    logging.info(f"Starting minification in directory: {directory}")
    for root, dirs, files in os.walk(directory):
        for file in files:
            logging.debug(f"Processing file: {file}")
            if file.endswith('.js'):
                file_path = os.path.join(root, file)
                logging.info(f"Minifying {file_path}")
                with open(file_path, 'r') as js_file:
                    minified_js = jsmin.jsmin(js_file.read())

                with open(file_path, 'w') as js_file:
                    js_file.write(minified_js)
                logging.info(f"Minification complete for {file_path}")

# Update this path to the directory containing your JS files
js_directory = '_site/javascript'
minify_js(js_directory)

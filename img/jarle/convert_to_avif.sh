#!/bin/bash

# Create a folder for compressed images
mkdir -p avif

# Loop through all .jpg files in the current folder
for file in *.jpg; do
    # Convert to AVIF and save in the compressed_images folder
    avifenc -q 70 "$file" "avif/${file%.jpg}.avif"
    echo "Converted $file to avif/${file%.jpg}.avif"
done

echo "Bilder konvertert og lagret i 'avif'-mappa"

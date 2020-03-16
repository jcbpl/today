wget --header "Authorization: Bearer ${DROPBOX_TOKEN}" \
  --header "Dropbox-API-Arg: {\"path\": \"/_posts\"}" \
  --method POST \
  -O posts.zip \
  "https://content.dropboxapi.com/2/files/download_zip"

ruby unzip.rb posts.zip

rm -f posts.zip

jekyll build

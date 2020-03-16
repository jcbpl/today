require 'zip'

Zip.on_exists_proc = true

Zip::File.open(ARGV[0]) do |zip_file|
  zip_file.each do |file|
    file.extract
  end
end

ActiveModelSerializers.config.tap do |c|
  c.adapter = :json_api
  c.key_transform = :unaltered
  c.default_includes = '**'
end

seeds_data = YAML.load_file('db/seeds_data.yml')

if seeds_data.has_key?("roles")
  seeds_data["roles"].each do |role|
    Role.create(role) unless Role.where(role).exists?
  end
end

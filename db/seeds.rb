seeds_data = YAML.load_file('db/seeds_data.yml')

if seeds_data.has_key?("roles")
  seeds_data["roles"].each do |role|
    Auth::Models::Role.create(role) unless Auth::Models::Role.where(role).exists?
  end
end

if seeds_data.has_key?("products")
  seeds_data["products"].each do |product|
    return if Catalogue::Models::Product.where(name: product[:name]).exists?

    built_product = Catalogue::Models::Product.new(product)
    built_product.permalink = built_product.name.parameterize
    built_product.available_on = Time.zone.now
    built_product.save
  end

  Catalogue::Models::Product.update_all(available_on: Time.zone.now)
end

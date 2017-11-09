source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'active_model_serializers'
gem 'devise'
gem 'dry-validation'
gem 'figaro'
gem 'jwt'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'pg'
gem 'puma', '~> 3.0'
gem 'pundit'
gem 'rails', '~> 5.1.4'
gem "trailblazer-rails"
gem "dry-validation"
gem 'email_validator'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'inquisition', github: 'rubygarage/inquisition'
  gem 'rspec-rails'
end

group :development do
  gem 'listen', '~> 3.0.5'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

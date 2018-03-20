source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'active_model_serializers'
gem 'activeadmin'
gem 'aws-sdk-s3', '~> 1.2' # for Amazon S3 storage
gem 'bcrypt'
gem 'dry-validation'
gem 'figaro'
gem 'haml-rails'
gem 'image_processing'
gem 'jwt'
gem 'mini_magick'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'pg'
gem 'puma', '~> 3.10'
gem 'pundit'
gem 'rails', '~> 5.1.4'
gem 'rolify'
gem 'rswag-api'
gem 'rswag-ui'
gem 'shrine'
gem 'sidekiq'
gem 'trailblazer-rails'
gem 'uglifier'

group :development, :test do
  gem 'byebug', platform: :mri
  gem 'factory_bot_rails', '~> 4.8'
  gem 'ffaker'
  gem 'inquisition', github: 'rubygarage/inquisition'
  gem 'json_spec'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'rswag-specs'
end

group :development do
  gem 'listen', '~> 3.0.5'
end

group :test do
  gem 'bundler-audit'
  gem 'database_cleaner'
  gem 'fuubar'
  gem 'jsonapi-resources-matchers'
  gem 'shoulda-matchers'
  gem 'shrine-memory'
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

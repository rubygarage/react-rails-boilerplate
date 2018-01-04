source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'active_model_serializers', '~> 0.10'
gem 'activeadmin', '~> 1.1'
gem 'aws-sdk-s3', '~> 1.2' # for Amazon S3 storage
gem 'bcrypt', '~> 3.1'
gem 'bootsnap', '~> 1.1', require: false
gem 'dry-validation', '~> 0.11'
gem 'figaro', '~> 1.1'
gem 'uglifier', '~> 4.0'
gem 'haml-rails', '~> 1.0'
gem 'image_processing', '~> 0.4'
gem 'jwt', '~> 1.5'
gem 'mini_magick', '~> 4.8'
gem 'omniauth', '~> 1.7'
gem 'omniauth-facebook', '~> 4.0'
gem 'pg', '~> 0.21'
gem 'puma', '~> 3.10'
gem 'pundit', '~> 1.1'
gem 'rails', '~> 5.1.4'
gem 'rolify', '~> 5.1'
gem 'shrine', '~> 2.8'
gem 'sidekiq', '~> 5.0'
gem 'trailblazer-rails', '~> 1.0'

group :development, :test do
  gem 'byebug', '~> 9.1', platform: :mri
  gem 'factory_bot_rails', '~> 4.8'
  gem 'ffaker', '~> 2.7'
  gem 'inquisition', github: 'rubygarage/inquisition'
  gem 'rspec-rails', '~> 3.7'
  gem 'rspec_junit_formatter', '~> 0.3'
  gem 'rswag', '~> 1.5'
  gem 'json_spec', '~> 1.1'
end

group :development do
  gem 'listen', '~> 3.0.5'
end

group :test do
  gem 'database_cleaner', '~> 1.6'
  gem 'fuubar', '~> 2.3'
  gem 'jsonapi-resources-matchers', '~> 1.0'
  gem 'shoulda-matchers', '~> 3.1'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

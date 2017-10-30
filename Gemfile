source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
gem 'figaro'
gem 'pg'
gem 'puma', '~> 3.0'
gem 'devise'
gem 'devise_token_auth', :git => 'https://github.com/lynndylanhurley/devise_token_auth.git', :branch => 'master'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'pundit'
gem 'active_model_serializers'
gem 'reform'
gem 'dry-validation'

gem 'rack-cors'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'listen', '~> 3.0.5'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

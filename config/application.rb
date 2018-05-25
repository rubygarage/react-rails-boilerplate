require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RgReactIsomorphicBoilerplate
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << Rails.root.join('apps')

    config.eager_load_paths += [
      Rails.root.join('lib'),
      Rails.root.join('apps', 'shared', 'controllers'),
      Rails.root.join('apps', 'shared', 'models'),
      Rails.root.join('apps', 'shared', 'jobs'),
      Rails.root.join('apps', 'shared', 'policies'),
      Rails.root.join('apps', 'shared', 'serializers'),
      Rails.root.join('apps', 'shared', 'rpc')
    ]
  end
end

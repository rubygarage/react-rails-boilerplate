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
    config.autoload_paths += %W(#{config.root}/apps)
    config.eager_load_paths << Rails.root.join('lib')

    config.eager_load_paths << Rails.root.join('apps/shared/controllers')
    config.eager_load_paths << Rails.root.join('apps/shared/models')
    config.eager_load_paths << Rails.root.join('apps/shared/jobs')
    config.eager_load_paths << Rails.root.join('apps/shared/policies')
    config.eager_load_paths << Rails.root.join('apps/shared/serializers')
  end
end

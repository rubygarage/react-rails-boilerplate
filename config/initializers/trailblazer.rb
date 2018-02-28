require 'reform'
require 'reform/form/dry'
require 'trailblazer/operation'

Dry::Validation::Schema::Form.configure do |config|
  config.messages = :i18n
  config.namespace = :user
end

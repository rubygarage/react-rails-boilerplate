require 'simplecov'

SimpleCov.start 'rails' do
  coverage_dir File.join('doc', 'coverage')

  groups = %w[channels commands controllers decorators features forms
              helpers jobs libs mailers models policies queries
              serializers services tasks uploaders values]

  groups.each { |name| add_group name.capitalize, "/app/#{name}" }
end

RSpec.configure do |config|

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end

# Load the Rails application.
require_relative 'application'

# Fix that ugly implementation
$LOAD_PATH << Rails.root.join('apps', 'admin', 'rpc', 'lib').to_s
$LOAD_PATH << Rails.root.join('apps', 'auth', 'rpc', 'lib').to_s

Dir[Rails.root.join('apps', 'admin', 'rpc', '**', '*.rb')].each { |f| require f }
Dir[Rails.root.join('apps', 'auth', 'rpc', '**', '*.rb')].each { |f| require f }

# Initialize the Rails application.
Rails.application.initialize!

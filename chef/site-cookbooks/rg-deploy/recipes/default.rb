# rubocop:disable Metrics/BlockLength

encrypted_data = Chef::EncryptedDataBagItem.load('configs', node.environment)

config = node['project']
deployer = config['user']

root_path = config['root']
shared_path = File.join(root_path, 'shared')
bundle_path = File.join(shared_path, 'vendor', 'bundle')
config_path = File.join(shared_path, 'config')
ssh_path = File.join(shared_path, '.ssh')

puma_state_file = File.join(shared_path, 'tmp', 'pids', 'puma.state')
maintenance_file = File.join(shared_path, 'tmp', 'maintenance')

# SSH -----------------------------------------------------------------------------------------------------------------

ssh_key_file = File.join(ssh_path, deployer)
ssh_wrapper_file = File.join(ssh_path, 'wrap-ssh4git.sh')

directory ssh_path do
  owner deployer
  group deployer
  recursive true
end

cookbook_file ssh_key_file do
  source 'key'
  owner deployer
  group deployer
  mode 0o600
end

file ssh_wrapper_file do
  content "#!/bin/bash\n/usr/bin/env ssh -o \"StrictHostKeyChecking=no\" -i \"#{ssh_key_file}\" $1 $2"
  owner deployer
  group deployer
  mode 0o755
end

# DIRECTORIES ---------------------------------------------------------------------------------------------------------

%w(config log public/system public/uploads repo tmp/cache tmp/pids tmp/sockets webpack/node_modules).each do |dir|
  directory File.join(shared_path, dir) do
    owner deployer
    group deployer
    mode 0o755
    recursive true
  end
end

# CONFIG FILES --------------------------------------------------------------------------------------------------------

file File.join(config_path, 'application.yml') do
  content Hash[node.environment, encrypted_data['application']].to_yaml
  sensitive true
  owner deployer
  group deployer
  mode 0o644
end

template File.join(config_path, 'database.yml') do
  source File.join(node.environment, 'database.yml.erb')
  variables(
    environment: node.environment,
    database: encrypted_data['database']['name'],
    user: encrypted_data['database']['user'],
    password: encrypted_data['database']['password']
  )
  sensitive true
  owner deployer
  group deployer
  mode 0o644
end

template File.join(config_path, 'sidekiq.yml') do
  variables(
    environment: node.environment
  )
  sensitive true
  owner deployer
  group deployer
  mode 0o644
end

template File.join(shared_path, 'puma.rb') do
  source File.join(node.environment, 'puma.rb.erb')
  variables(
    environment: node.environment,
    project_root: root_path
  )
  owner deployer
  group deployer
  mode 0o644
end

# DEPLOYMENT ----------------------------------------------------------------------------------------------------------

timestamped_deploy node['domain'] do
  ssh_wrapper ssh_wrapper_file
  repository config['repository']
  branch config['branch']
  repository_cache 'repo'
  deploy_to config['root']
  user deployer
  group deployer

  environment(
    'ENV' => node.environment,
    'RAILS_ENV' => node.environment
  )

  create_dirs_before_symlink %w(tmp public)

  symlinks(
    'config/application.yml' => 'config/application.yml',
    'config/database.yml' => 'config/database.yml',
    'config/sidekiq.yml' => 'config/sidekiq.yml',
    'log' => 'log',
    'public/system' => 'public/system',
    'public/uploads' => 'public/uploads',
    'tmp/cache' => 'tmp/cache',
    'tmp/pids' => 'tmp/pids',
    'tmp/sockets' => 'tmp/sockets',
    'webpack/node_modules' => 'webpack/node_modules'
  )

  symlink_before_migrate(
    'config/application.yml' => 'config/application.yml',
    'config/database.yml' => 'config/database.yml'
  )

  before_migrate do
    file maintenance_file do
      owner deployer
      group deployer
      action :create
    end

    execute 'install bundler' do
      command "/bin/bash -lc 'source $HOME/.rvm/scripts/rvm && gem install bundler'"
      cwd release_path
      user deployer
      group deployer
    end

    execute 'bundle install' do
      command "/bin/bash -lc 'source $HOME/.rvm/scripts/rvm && bundle install --without development test --deployment --path #{bundle_path}'"
      cwd release_path
      user deployer
      group deployer
    end
  end

  migration_command "/bin/bash -lc 'source $HOME/.rvm/scripts/rvm && bundle exec rails db:migrate --trace'"
  migrate true

  before_restart do
    execute 'rails assets:precompile' do
      command "/bin/bash -lc 'source $HOME/.rvm/scripts/rvm && RAILS_ENV=production bundle exec rails assets:precompile'"
      cwd release_path
      user deployer
      group deployer
    end if node['environment'] == 'production'

    execute 'install node modules' do
      command "/bin/bash -lc 'cd webpack && rm -r node_modules && yarn install'"
      cwd release_path
      user deployer
      group deployer
    end

    execute 'start node client' do
      command "/bin/bash -lc 'cd webpack && pm2 restart pm2-app.config.js --env production && pm2 save && sudo pm2 startup'"
      cwd release_path
      user deployer
      group deployer
    end
  end

  if File.exist? puma_state_file
    restart_command "/bin/bash -lc 'source $HOME/.rvm/scripts/rvm && bundle exec pumactl -S #{puma_state_file} restart'"
  end

  after_restart do
    file maintenance_file do
      action :delete
    end
  end

  action :deploy
end

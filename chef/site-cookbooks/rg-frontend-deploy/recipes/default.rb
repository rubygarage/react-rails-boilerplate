config = node['project']
deployer = config['user']

root_path = config['root']
shared_path = File.join(root_path, 'shared')
webpack_path = File.join(root_path, 'webpack')

# DIRECTORIES ---------------------------------------------------------------------------------------------------------

directory File.join(shared_path, 'webpack/node_modules') do
  owner deployer
  group deployer
  mode 0o755
  recursive true
end

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
    'NODE_ENV' => node.environment
  )

  symlinks(
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

  # before_restart do
  #   execute "cd #{release_path}/webpack && yarn global add webpack@2.2.0 && yarn install && yarn build"
  # end

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

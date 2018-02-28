include_recipe 'monit'

root_dir = File.join('/home', node['project']['user'], node['domain'])

monit_config 'sidekiq' do
  source 'sidekiq.conf.erb'
  variables(
    project_root: root_dir
  )
end

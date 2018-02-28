include_recipe 'monit'

root_dir = File.join('/home', node['project']['user'], node['domain'])

monit_config 'puma' do
  source 'puma.conf.erb'
  variables(
    project_root: root_dir
  )
end

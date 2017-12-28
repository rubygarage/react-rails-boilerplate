include_recipe 'monit'

monit_config 'pm2' do
  source 'pm2.conf.erb'
  variables(
    project_root: node['project']['root']
  )
end

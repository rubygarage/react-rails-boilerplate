name 'web'
description 'Web server'

run_list 'recipe[rg-redis]',
         'recipe[rg-nodejs]',
         'recipe[rg-nginx]',
         'recipe[rg-imagemagick]',
         'recipe[rg-monit::nginx]',
         'recipe[rg-monit::puma]',
         'recipe[rg-monit::pm2]',
         'recipe[rg-monit::redis]',
         'recipe[rg-monit::sidekiq]'

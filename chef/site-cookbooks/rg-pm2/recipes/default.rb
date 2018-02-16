execute 'install pm2' do
  command "/bin/bash -lc 'yarn global add pm2 && export PATH=\"$(yarn global bin):$PATH\"'"
end

# Deploy --------------------------------------------------------------------------------------------------------------

override['project']['name'] = 'react-rails-boilerplate'
override['project']['repository'] = 'git@github.com:rubygarage/react-rails-boilerplate.git'

# Monit ---------------------------------------------------------------------------------------------------------------

override['monit']['username'] = 'admin'
override['monit']['password'] = '1q2w3e4r5t6y'

# Nginx ---------------------------------------------------------------------------------------------------------------

# To obtain the checksum you can download the file and check it locally.
# $ shasum -a 256 nginx-X.XX.XX.tar.gz

override['nginx']['source']['version'] = '1.13.7'
override['nginx']['source']['checksum'] = 'beb732bc7da80948c43fd0bf94940a21a21b1c1ddfba0bd99a4b88e026220f5c'

# Node.js -------------------------------------------------------------------------------------------------------------

# To obtain the checksum you can download the file and check it locally.
# $ shasum -a 256 node-vX.X.X.tar.gz

override['nodejs']['version'] = '8.9.4'
override['nodejs']['binary']['checksum'] = '729b44b32b2f82ecd5befac4f7518de0c4e3add34e8fe878f745740a66cbbc01'

# Postgresql ----------------------------------------------------------------------------------------------------------

# How to generate password for PostgreSQL:
#
# $ md5 -qs '1q2w3e4r5t6y'
#
# Don't forget about 'md5' in the beginning of the line

override['postgresql']['version'] = '9.6'
override['postgresql']['user']['name'] = 'deployer'
override['postgresql']['user']['encrypted_password'] = 'md5f62fee1b43f48bd0c1bf9b7d5b22f270' # the password is "deployer"

# Ruby ----------------------------------------------------------------------------------------------------------------

override['ruby']['versions'] = ['2.4.3']
override['ruby']['default'] = '2.4.3'

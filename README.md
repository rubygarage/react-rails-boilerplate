## Installation

```
bundle install
```

```
docker-compose up
```
then:
```
bundle exec rake db:setup
```

## Web server
Run: 
```
bundle exec rails s
```

## Worker
Run:
```
bundle exec sidekiq
```
it will take configs from "config/sidekiq.yml"

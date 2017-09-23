# Install
`npm install`
# Run
Startup mongodb on you computer using:
```
mongod &
disown
```
## Dev Mode with Hot Reloading
`npm run dev`
## Production
`npm run build && npm start`
## Configs
example: config.json
```
{
    "mailgun": {
        "api_key": "key-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "domain": "some.example_domain.com"
    }
}
```
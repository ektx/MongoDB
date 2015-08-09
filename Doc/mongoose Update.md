## Update()

- 使用 `upsert`  
```js
Schemas.model.update(
	{"name": "zwl"}, 
	{"name": "king" },
	{upsert : true},
	callback()
)
```
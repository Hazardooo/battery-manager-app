# battery-manager

connect to your db

```
docker-compose exec postgres psql -U battarey_manager_admin -d battarey_manager
```


start you app
```
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.api import todos

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/todos")
def read_root():
    return {"data": todos}

def is_todo_present(new_item):
    for todo in todos:
        if todo["item"] == new_item:
           return True
    return False

@app.post("/todos")
async def add_todo(todo: dict):
   if is_todo_present(todo["item"]):
      raise HTTPException(status_code=400, detail="item already present")
   todos.append(todo)
   return {
    "data": {"Todo added"}
    }

@app.put("/todos/{id}")
async def update_todo(id: int, body: dict):
    for todo in todos:
       if int(todo["id"]) == id:
        todo["item"] = body["item"]
        return { "data": f"Todo with id: {id} has been updated"}
    return { "data": f"Todo with id: {id} not found" }

@app.delete("/todos/{id}")
async def delete_todo(id: int):
    for todo in todos:
        if int(todo["id"]) == id:
           todos.remove(todo)
           return {"data": f"Todo with id: {id} has been removed"}
    return {"data": f"Todo with id: {id} not found"}
      
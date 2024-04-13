import json
from pymongo import MongoClient
from bson import ObjectId

client = MongoClient('mongodb+srv://jrdjacoby:heyAdora!1@for-web-dev.9eiyoxr.mongodb.net/?retryWrites=true&w=majority&appName=for-web-dev')
# client = MongoClient('localhost', 27017)
db = client['kanbas']

jsons: list[str] = ['courses.json', 'assignments.json', 'modules.json', 'users.json', 'enrollments.json']

for collection_name in db.list_collection_names():
    db[collection_name].drop()

reference_fields = {
        'assignments': ['course'],
        'modules': ['course'],
        'enrollments': ['course', 'user'],
        }

id_map: dict = {}

for j in jsons:
    with open(j) as f:
        docs = json.load(f)

    collection_name = j.split('.')[0]

    for document in docs:
        old_id = document['_id']
        new_id = ObjectId()
        id_map[old_id] = new_id
        document['_id'] = new_id

        if collection_name in reference_fields:
            for field in reference_fields[collection_name]:
                if field in document:
                    document[field] = id_map[document[field]]

        if collection_name == 'modules' and 'lessons' in document:
            for lesson in document['lessons']:
                old_lesson_id = lesson['_id']
                new_lesson_id = ObjectId()
                id_map[old_lesson_id] = new_lesson_id
                lesson['_id'] = new_lesson_id
                lesson['module'] = new_id

    collection = db[collection_name]
    collection.insert_many(docs)


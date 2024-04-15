import json
import random
import string

import psycopg2

# Adjust these values according to your requirement
NUM_USERS = 10000  # Number of users to generate
DATA_MULTIPLIER = 80  # Multiplier to increase the size of the JSON data

# Function to generate random data for a user
def generate_user_data():
    user_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    name = ''.join(random.choices(string.ascii_letters, k=10))
    age = random.randint(18, 60)
    email = f"{name.lower()}@example.com"
    # Add more fields as needed
    return {
        "id": user_id,
        "name": name,
        "age": age,
        "email": email,
        # Add more fields as needed
    }

# Function to create a JSON file with multiple users
def create_json_file(filename):
    users = [generate_user_data() for _ in range(NUM_USERS)]
    data = {"data": users * DATA_MULTIPLIER}
    with open(filename, 'w') as file:
        json.dump(data, file)


def insert_large_record_into_table(record_data):
    # Connect to the database
    connection = psycopg2.connect(
        dbname='account_onboarding_db',
        user='postgres',
        password='postgres',
        host='ec2-65-1-98-7.ap-south-1.compute.amazonaws.com',
        port='5888'
    )

    cursor = connection.cursor()

    # Assuming your table has a column 'large_record' of type 'bytea'
    query = f"INSERT INTO public.json_dump (large_record) VALUES (%s);"
    cursor.execute(query, (record_data,))
    print("Inserted")
    connection.commit()
    cursor.close()
    connection.close()

def read_large_record(filename):
    with open(filename, 'rb') as file:
        return file.read()

if __name__ == "__main__":
    json_filename = "large_json_data.json"
    table_name = "users"

    create_json_file(json_filename)
    file = read_large_record(json_filename)
    print("Adding into Table")
    insert_large_record_into_table(file)


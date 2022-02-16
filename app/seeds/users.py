from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Goat', profile_image_url="https://i.imgur.com/PLoDZRK.jpg", email='demo@aa.io', password='password')
    morrigan = User(
        username='Morrigan', profile_image_url="https://i.imgur.com/8SKro7u.png", email='morrigan@aa.io', password='password')
    chapel_dweller = User(
        username='Chapel Dweller', profile_image_url="https://i.imgur.com/tcuZjej.jpg", email='chapel.dweller@aa.io', password='password')

    db.session.add(demo)
    db.session.add(morrigan)
    db.session.add(chapel_dweller)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

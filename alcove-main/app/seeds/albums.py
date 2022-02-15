from app.models import db, Album


def seed_albums():
    album1 = Album(
        name="Public", description="Images displayed to all of Alcove.")
    album2 = Album(
        name="Private", description="Images only you can see.")

    db.session.add(album1)
    db.session.add(album2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_albums():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Album


def seed_albums():
    album1 = Album(
        user_id=1, name="My Photos", description="Photos I took for myself!")
    album2 = Album(
        user_id=1, name="Photos From Friends", description="Photos that my friends sent me!")
    album3 = Album(
        user_id=2, name="My Photos", description="Photos I took for myself!")
    album4 = Album(
        user_id=2, name="Photos From Dad", description="Photos that my dad sent me!")
    album5 = Album(
        user_id=3, name="My Photos", description="Photos I took for myself!")
    album6 = Album(
        user_id=3, name="Photos From Mom", description="Photos that my mom sent me!")

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()

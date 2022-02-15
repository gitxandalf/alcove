from app.models import db, Comment


def seed_comments():
    article_comment_1 = Comment(
        user_id=1, article_id=1, image_id=None, comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
    image_comment_1 = Comment(
        user_id=1, article_id=None, image_id=1, comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
    article_comment_2 = Comment(
        user_id=2, article_id=2, image_id=None, comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
    image_comment_2 = Comment(
        user_id=2, article_id=None, image_id=2, comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
    article_comment_3 = Comment(
        user_id=3, article_id=3, image_id=None, comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")
    image_comment_3 = Comment(
        user_id=3, article_id=None, image_id=3, comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")

    db.session.add(article_comment_1)
    db.session.add(image_comment_1)
    db.session.add(article_comment_2)
    db.session.add(image_comment_2)
    db.session.add(article_comment_3)
    db.session.add(image_comment_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()

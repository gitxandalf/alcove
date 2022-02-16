from app.models import db, Article


def seed_articles():
    article1 = Article(
        user_id=1, image_url="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", title="Lorem  ipsum", article_content="""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit. Amet massa vitae tortor condimentum lacinia quis vel eros. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna id volutpat lacus laoreet. Sit amet porttitor eget dolor morbi non arcu risus quis. Mollis nunc sed id semper risus in hendrerit gravida. A condimentum vitae sapien pellentesque habitant. Vestibulum lectus mauris ultrices eros in cursus. Pellentesque elit eget gravida cum. Sem fringilla ut morbi tincidunt augue interdum. Eu mi bibendum neque egestas congue quisque egestas diam in. Sapien eget mi proin sed libero enim sed. Enim facilisis gravida neque convallis a.""")
    article2 = Article(
        user_id=2, image_url="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", title="Lorem  ipsum", article_content="""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit. Amet massa vitae tortor condimentum lacinia quis vel eros. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna id volutpat lacus laoreet. Sit amet porttitor eget dolor morbi non arcu risus quis. Mollis nunc sed id semper risus in hendrerit gravida. A condimentum vitae sapien pellentesque habitant. Vestibulum lectus mauris ultrices eros in cursus. Pellentesque elit eget gravida cum. Sem fringilla ut morbi tincidunt augue interdum. Eu mi bibendum neque egestas congue quisque egestas diam in. Sapien eget mi proin sed libero enim sed. Enim facilisis gravida neque convallis a.""")
    article3 = Article(
        user_id=3, image_url="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", title="Lorem  ipsum", article_content="""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit. Amet massa vitae tortor condimentum lacinia quis vel eros. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna id volutpat lacus laoreet. Sit amet porttitor eget dolor morbi non arcu risus quis. Mollis nunc sed id semper risus in hendrerit gravida. A condimentum vitae sapien pellentesque habitant. Vestibulum lectus mauris ultrices eros in cursus. Pellentesque elit eget gravida cum. Sem fringilla ut morbi tincidunt augue interdum. Eu mi bibendum neque egestas congue quisque egestas diam in. Sapien eget mi proin sed libero enim sed. Enim facilisis gravida neque convallis a.""")
    article4 = Article(
        user_id=1, image_url="https://images.unsplash.com/photo-1586281380923-93c9b0a7296e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", title="Lorem  ipsum", article_content="""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit. Amet massa vitae tortor condimentum lacinia quis vel eros. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna id volutpat lacus laoreet. Sit amet porttitor eget dolor morbi non arcu risus quis. Mollis nunc sed id semper risus in hendrerit gravida. A condimentum vitae sapien pellentesque habitant. Vestibulum lectus mauris ultrices eros in cursus. Pellentesque elit eget gravida cum. Sem fringilla ut morbi tincidunt augue interdum. Eu mi bibendum neque egestas congue quisque egestas diam in. Sapien eget mi proin sed libero enim sed. Enim facilisis gravida neque convallis a.""")
    article5 = Article(
        user_id=2, image_url="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80", title="Lorem  ipsum", article_content="""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit. Amet massa vitae tortor condimentum lacinia quis vel eros. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna id volutpat lacus laoreet. Sit amet porttitor eget dolor morbi non arcu risus quis. Mollis nunc sed id semper risus in hendrerit gravida. A condimentum vitae sapien pellentesque habitant. Vestibulum lectus mauris ultrices eros in cursus. Pellentesque elit eget gravida cum. Sem fringilla ut morbi tincidunt augue interdum. Eu mi bibendum neque egestas congue quisque egestas diam in. Sapien eget mi proin sed libero enim sed. Enim facilisis gravida neque convallis a.""")
    article6 = Article(
        user_id=3, image_url="https://images.unsplash.com/photo-1506957833838-96c1e88d394f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80", title="Lorem  ipsum", article_content="""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit. Amet massa vitae tortor condimentum lacinia quis vel eros. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna id volutpat lacus laoreet. Sit amet porttitor eget dolor morbi non arcu risus quis. Mollis nunc sed id semper risus in hendrerit gravida. A condimentum vitae sapien pellentesque habitant. Vestibulum lectus mauris ultrices eros in cursus. Pellentesque elit eget gravida cum. Sem fringilla ut morbi tincidunt augue interdum. Eu mi bibendum neque egestas congue quisque egestas diam in. Sapien eget mi proin sed libero enim sed. Enim facilisis gravida neque convallis a.""")

    db.session.add(article1)
    db.session.add(article2)
    db.session.add(article3)
    db.session.add(article4)
    db.session.add(article5)
    db.session.add(article6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_articles():
    db.session.execute('TRUNCATE articles RESTART IDENTITY CASCADE;')
    db.session.commit()

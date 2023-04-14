from app.models import db, Post_Like, environment, SCHEMA

def seed_post_likes():
    like1 = Post_Like(
        post_id=18,
        user_id=3,
        is_like=True
    )
    like2 = Post_Like(
        post_id=18,
        user_id=4,
        is_like=True
    )
    like3 = Post_Like(
        post_id=18,
        user_id=5,
        is_like=True
    )
    like4 = Post_Like(
        post_id=18,
        user_id=6,
        is_like=False
    )
    like5 = Post_Like(
        post_id=18,
        user_id=7,
        is_like=False
    )
    like6 = Post_Like(
        post_id=18,
        user_id=8,
        is_like=True
    )
    like7 = Post_Like(
        post_id=17,
        user_id=1,
        is_like=True
    )
    like8 = Post_Like(
        post_id=17,
        user_id=12,
        is_like=True
    )
    like9 = Post_Like(
        post_id=17,
        user_id=4,
        is_like=False
    )
    like10 = Post_Like(
        post_id=17,
        user_id=5,
        is_like=True
    )
    like11 = Post_Like(
        post_id=3,
        user_id=1,
        is_like=False
    )
    like12 = Post_Like(
        post_id=3,
        user_id=2,
        is_like=True
    )
    like13 = Post_Like(
        post_id=3,
        user_id=3,
        is_like=False
    )
    like14 = Post_Like(
        post_id=4,
        user_id=2,
        is_like=True
    )
    like15 = Post_Like(
        post_id=4,
        user_id=3,
        is_like=True
    )
    like16 = Post_Like(
        post_id=4,
        user_id=3,
        is_like=True
    )
    like17 = Post_Like(
        post_id=4,
        user_id=4,
        is_like=False
    )
    like18 = Post_Like(
        post_id=4,
        user_id=6,
        is_like=True
    )
    like19 = Post_Like(
        post_id=4,
        user_id=7,
        is_like=False
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)
    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.commit()

def undo_post_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_likes")

    db.session.commit()

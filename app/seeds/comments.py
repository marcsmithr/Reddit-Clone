from app.models import db, environment, SCHEMA, Comment

def seed_comments():
    onecurse1comment1 = Comment(
        user_id=1,
        post_id=18,
        parent_id=None,
        text=
        '''
        My Strahd voice is heavily inspired by Gary Oldman's portrayal of Dracula. Very much Romanian in the accent, and I try and hit the octave of the voice from the lowest part of my throat with a bit of strain and wispiness to it; like the voice is travelling up through layers of earth and stone to be heard. As if his voice is as undead and ancient as he is. I also really roll his Rs and linger on his Ss to try and get this sort predatory vibe in his speech…like a snake’s hiss or rattle.

        I think it works pretty well. My PCs are definitely scared af and often speechless when confronted by him.
        '''
        )

    twocurse1comment1reply1 = Comment(
        user_id =3,
        post_id=18,
        parent_id=1,
        text=
        '''
        Mine is exactly the same.
        '''
    )

    threecurse1comment2 = Comment(
        user_id =4,
        post_id=18,
        parent_id=None,
        text=
        '''
        Werner Herzog!

Well, I think he sounds like Werner Herzog but my party likes to report that he sounds like Arnie
        '''
    )
    fourcurse1comment2reply1 = Comment(
        user_id =5,
        post_id=18,
        parent_id=3,
        text=
        '''
        that is brilliant, I instantly saw him in the full splendour of a whole new light. I can see how it might accidentally veer into Arnie territory but I'm doing Herzog Strahd next time for sure.

my current one's just a bad Christopher Lee impression.
        '''
    )

    fivecurse1comment2reply1reply1 = Comment(
        user_id =6,
        post_id=18,
        parent_id=4,
        text=
        '''
        You can actually sneak direct quotes from Werner Herzog in there, too. It’s a lot of fun hahaha
        '''
    )


    db.session.add(onecurse1comment1)
    db.session.add(twocurse1comment1reply1)
    db.session.add(threecurse1comment2)
    db.session.add(fourcurse1comment2reply1)
    db.session.add(fivecurse1comment2reply1reply1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()

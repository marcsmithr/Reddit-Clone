from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    jojo = User(
        username='jojoStar', email='jojo@aa.io', password='password')
    falco = User(
        username='falco_main95', email='falco@aa.io', password='password')
    mojo = User(
        username='Mojo_man', email='mojo@aa.io', password='password')
    diamond = User(
        username='diamondforever1', email='diamond@aa.io', password='password')
    jotaro = User(
        username='jotaroK', email='jotaro@aa.io', password='password')
    rohan = User(
        username='rohanRider', email='rohan@aa.io', password='password')
    za = User(
        username='zaWorldo', email='za@aa.io', password='password')
    star = User(
        username='starPlatnum', email='star@aa.io', password='password')
    yes = User(
        username='yes.I.am', email='yes@aa.io', password='password')
    ora = User(
        username='oraoraora', email='ora@aa.io', password='password')
    speed = User(
        username='speedWagon', email='speed@aa.io', password='password')
    captain = User(
        username='captainFalconOp', email='captain@aa.io', password='password')
    khornate = User(
        username='khornate88', email='khornate@aa.io', password='password')

    db.session.add(demo)
    db.session.add(jojo)
    db.session.add(falco)
    db.session.add(mojo)
    db.session.add(diamond)
    db.session.add(jotaro)
    db.session.add(rohan)
    db.session.add(za)
    db.session.add(star)
    db.session.add(yes)
    db.session.add(ora)
    db.session.add(speed)
    db.session.add(captain)
    db.session.add(khornate)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

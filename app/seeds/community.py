from app.models import db, environment, SCHEMA, Community

def seed_communities():
    curseofzrahd = Community(
        owner_id =2,
        name='CurseofZrahd',
        title='Curse of Zrahd',
        description='''
            This subseddit serves as a helpful place for anyone
            running the Curse of Zrahd module for TTRPG 5e.
            ''',
        community_image="https://styles.redditmedia.com/t5_9pba2/styles/communityIcon_ja80q99vvn371.png?width=256&v=enabled&s=f1cc849147485d9297d23eda5e3daafc0652e734",
        community_banner="https://preview.redd.it/9wx5mi5o50051.jpg?auto=webp&s=b96fca9eba8e18526019677aba408809aa5e21a5"
        )

    pokemonsters = Community(
        owner_id =1,
        name='pokemonsters',
        title="Pokemonsters: Gotta Snag 'Em All!",
        description='''
            s/pokemon is an unofficial Pokémonster fan community.
            This is the place for most things Pokémonster on
            Seddit—TV shows, video games, toys, trading cards
            , you name it!
            ''',
        community_image="https://b.thumbs.redditmedia.com/bt5Bgfbu7g5OCCganJwwo7mJBTWBqZsEXwFY_joajMk.png",
        community_banner="https://assets.pokemon.com/assets/cms2/img/misc/halloween/halloween-hub-banner-desktop.jpg"
        )


    db.session.add(curseofzrahd)
    db.session.add(pokemonsters)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM communities")

    db.session.commit()

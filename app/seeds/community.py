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

    gaming = Community(
        owner_id =3,
        name='gaming',
        title="s/gaming",
        description='''
            A subreddit for (almost) anything related to games - video games,
              board games, card games, etc. (but not sports).
            ''',
        community_image="https://styles.redditmedia.com/t5_2qh03/styles/communityIcon_1isvxgkk7hw51.png?width=256&s=b2c4017083ea0176a3dd4837f6e009bbc8384f15",
        community_banner="https://external-preview.redd.it/yabJrOEEZCI9Y88CKoqKPq6VOMtloovnp5_ugi21i6Y.png?width=960&crop=smart&auto=webp&v=enabled&s=605aaded17a1c63620cbfeff571e4e45dded4c69"
        )


    wholesomememes = Community(
        owner_id =4,
        name='wholesomememes',
        title="Internet for the Spirit",
        description='''
            Welcome to the wholesome side of the internet!
              This community is for those searching for a way to capture virtue on the internet.
            ''',
        community_image="https://i.ibb.co/qxFYBgf/subseddit-icon.png",
        community_banner="https://i.kym-cdn.com/photos/images/original/001/598/631/40d.jpg"
        )

    dataisbeautiful = Community(
        owner_id =5,
        name='dataisbeautiful',
        title="DataIsBeautiful",
        description='''
            DataIsBeautiful is for visualizations that effectively convey information.
              Aesthetics are an important part of information visualization, but pretty
                pictures are not the sole aim of this subreddit.
            ''',
        community_image="https://styles.redditmedia.com/t5_2tk95/styles/communityIcon_hrq90p2z27k11.jpg",
        community_banner="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOE1ferpUhtO_HYaj10PcYxWilp1bAxowAMA&usqp=CAU"
        )

    mildlyinfuriating = Community(
        owner_id =6,
        name='mildlyinfuriating',
        title="jukmifgguggh",
        description='''
            jukmifgguggh fbrltbruh
            ''',
        community_image="https://i.ibb.co/qxFYBgf/subseddit-icon.png",
        community_banner="https://i.redd.it/sgf6r5easbh31.jpg"
        )


    db.session.add(curseofzrahd)
    db.session.add(pokemonsters)
    db.session.add(gaming)
    db.session.add(wholesomememes)
    db.session.add(dataisbeautiful)
    db.session.add(mildlyinfuriating)
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

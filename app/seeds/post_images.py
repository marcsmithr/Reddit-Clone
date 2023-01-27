from app.models import db, Post_Image, environment, SCHEMA

def seed_post_images():

    curseofzrahd1 = Post_Image(
        post_id = 1,
        url = 'https://upload.wikimedia.org/wikipedia/en/a/a7/Strahd_von_Zarovich_in_Shadows_of_the_Vampire.jpg'
    )

    pokemonsters = Post_Image(
        post_id = 4,
        url = 'https://cdn.vox-cdn.com/thumbor/ofS4MOUiQXYdtWXyh1LmegOaRmk=/0x0:1280x720/1200x800/filters:focal(432x428:636x632)/cdn.vox-cdn.com/uploads/chorus_image/image/52251779/Baby_Pok_mon_anime.0.png'
    )


    db.session.add(curseofzrahd1)
    db.session.add(pokemonsters)
    db.session.commit()

def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_images")

    db.session.commit()

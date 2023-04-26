from app.models import db, Post_Image, environment, SCHEMA

def seed_post_images():

    curseofzrahd1 = Post_Image(
        post_id = 18,
        url = 'https://upload.wikimedia.org/wikipedia/en/a/a7/Strahd_von_Zarovich_in_Shadows_of_the_Vampire.jpg'
    )

    pokemonsters2 = Post_Image(
        post_id = 3,
        url = 'https://cdn.vox-cdn.com/thumbor/ofS4MOUiQXYdtWXyh1LmegOaRmk=/0x0:1280x720/1200x800/filters:focal(432x428:636x632)/cdn.vox-cdn.com/uploads/chorus_image/image/52251779/Baby_Pok_mon_anime.0.png'
    )

    pokemonsters3 = Post_Image(
        post_id = 14,
        url = 'https://preview.redd.it/6b37c6yi7sta1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=9d1d8102539c7e45811cfd998501546db51e7485'
    )

    gaming1 = Post_Image(
        post_id = 5,
        url = 'https://preview.redd.it/7u141y2q8xta1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=05076e3c01b6df13fdfd689c7fa69ac91a5893e5'
    )

    gaming2 = Post_Image(
        post_id = 12,
        url = 'https://preview.redd.it/iucpg3j36nta1.png?width=960&crop=smart&auto=webp&v=enabled&s=9a0757ed6557021f7fc223e5b127fa2ec90587b7'
    )

    gaming3 = Post_Image(
        post_id = 16,
        url = 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/01/Witcher-3-Vesemir-and-Geralt.jpg'
    )

    wholesomememes1 = Post_Image(
        post_id = 4,
        url = 'https://preview.redd.it/yuhcn7bmjuta1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=7873c45abb78b9eb25b0ab1d1d0043386cfe9790'
    )

    wholesomememes2 = Post_Image(
        post_id = 6,
        url = 'https://i.redd.it/1wn41utdp7ra1.png'
    )

    wholesomememes3 = Post_Image(
        post_id = 17,
        url = 'https://i.redd.it/0qsvk2ywlbqa1.jpg'
    )

    dataisbeautiful1 = Post_Image(
        post_id = 7,
        url = 'https://preview.redd.it/9hav9eacjota1.png?width=960&crop=smart&auto=webp&v=enabled&s=3f7e4bab3629c19e497ade40e28bd06319dcdbd5'
    )

    dataisbeautiful2 = Post_Image(
        post_id = 10,
        url = 'https://external-preview.redd.it/9J8dug5seUEZeMAl_O_VwzrtQ464kD5OBY3qqZy7G6U.jpg?width=960&crop=smart&auto=webp&v=enabled&s=6509f0a54b976f144df597f6151188e583e73565'
    )

    dataisbeautiful3 = Post_Image(
        post_id = 15,
        url = 'https://external-preview.redd.it/8EnSKdoN6UKldDOfh4IrUNhVKjLTfhVso9-shGMRZ0g.png?width=960&crop=smart&auto=webp&v=enabled&s=0e8989fc90d8951b747501c7086093016ca91b61'
    )

    mildlyinfuriating1 = Post_Image(
        post_id = 9,
        url = 'https://preview.redd.it/a9yrjlk4zvta1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=fbb38edc6f413f3db003425eb48d3cc00719e71b'
    )

    mildlyinfuriating2 = Post_Image(
        post_id =11,
        url = 'https://preview.redd.it/gnc8crpj8sta1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=172030c0ad68009f4707ba4208aded3d0209569c'
    )

    mildlyinfuriating3 = Post_Image(
        post_id = 13,
        url = 'https://preview.redd.it/zol054sqtwta1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=cf911947bdfd5afd9a01bd7d932971924542613a'
    )

    db.session.add(curseofzrahd1)
    db.session.add(pokemonsters2)
    db.session.add(pokemonsters3)
    db.session.add(gaming1)
    db.session.add(gaming2)
    db.session.add(gaming3)
    db.session.add(wholesomememes1)
    db.session.add(wholesomememes2)
    db.session.add(wholesomememes3)
    db.session.add(dataisbeautiful1)
    db.session.add(dataisbeautiful2)
    db.session.add(dataisbeautiful3)
    db.session.add(mildlyinfuriating1)
    db.session.add(mildlyinfuriating2)
    db.session.add(mildlyinfuriating3)

    db.session.commit()

def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM post_images")

    db.session.commit()

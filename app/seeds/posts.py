from app.models import db, Post, environment, SCHEMA

def seed_posts():
    curseofzrahd1 = Post(
        user_id=2,
        community_id=1,
        title="What does your Zrahd sound like?",
        text='''
        Just wondering how other people interpret him/play him.
        Mine cocky and has a rather pleasant but commanding American accent
        (almost like some business dude). Sometimes a bit of a British accent slips in too.
        '''
    )

    curseofzrahd2 = Post(
        user_id=3,
        community_id=1,
        title="Dinner Invitation Refusal",
        text='''
        Last session my players refused a second invitation for the dinner (the first was delivered a couple of days before) not direcly, Strahd sent rahadin to pick them up at krezk but they just didn't show up and took a long rest.

Now naturally Strahd is upset, he sent their way a couple of homebrew vampire assassin and mage, while my party was on it's way to fidatov's manor.

Ithink i can tie the night/cursed part of the estate with the dinner with strahd making him appear in it with rahadin and his consorts.

I'm a bit divided if making it a combat encounter (maybe with the "clone strahd") or making it a social encounter.

Do you have any suggestions ? does it seem like a good idea or should i just ditch the dinner and full on making him the antagonistic now?
        '''
    )

    pokemonster1 = Post(
        user_id=4,
        community_id=2,
        title="People that grew up with Gens 1-3, how do you feel about Pokémon now?",
        text='''
        I started my debut into pokemon at 5 with blue, which festered into sapphire,
        fire red, crystal, yellow, emerald, platinum, heart gold, and b&w. I played these
        games with so much love and passion for the main series, memorizing all the names
        and types, the storyline, but after b&w.. I sort of lost interest. Be it the
        addition of more and more Pokémon, the maturation of my life moving onto different
        interests and activities, I just lost my interest in it. I’m not an avid gamer,
        someone who cares a lot about graphics, mechanics (per say) or most things gamers
        care about… but I felt burnt out after a while. I stopped buying them (with the
        exception of sword and BD) and I’m not sure I’m going to buy anymore unless they
        revitalize the ones I grew up with. How does everyone else feel?
        '''
    )

    pokemonster2 = Post(
        user_id=5,
        community_id=2,
        title="Why would you not want a Pokemon to evolve?",
        text='''
        Excuse me because I'm not a big Pokemon fan and I know basically nothing other than
        the very basics, maybe slightly more than that, but not a lot. I know there are certain things in some or all of the games that allow a Pokemon to not evolve,
        and I think you can actually just tell a Pokemon not to in some of them, and they won't. But why
        would you want to do that? Don't you want the little guys to be as strong and leveled up as possible? Are there certain advantages to "young" versus "old" Pokemon?
        '''
    )

    db.session.add(curseofzrahd1)
    db.session.add(curseofzrahd2)
    db.session.add(pokemonster1)
    db.session.add(pokemonster2)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()

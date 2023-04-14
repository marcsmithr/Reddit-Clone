from app.models import db, Post, environment, SCHEMA

def seed_posts():
    curseofzrahd1 = Post(
        user_id=2,
        community_id=1,
        title="What does your Zrahd sound like?"
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
    )

    curseofzrahd3 = Post(
        user_id=6,
        community_id=1,
        title="Allowing a PC to play a vampire?",
        text= "I had a player say they want to play a vampire. My knee jerk reaction is hell no. But I like to integrate my players and I tend to encourage homebrew ideas for characters. Is this a bad idea. Does anyone have experience here?"
    )

    pokemonster3 = Post(
        user_id=7,
        community_id=2,
        title="I built Darkrai out of LEGO [OC]",
    )

    gaming1 = Post(
        user_id=9,
        community_id=3,
        title="Kirby is actually a real vacuum brand",
    )

    gaming2 = Post(
        user_id=2,
        community_id=3,
        title="Just realized the StarCraft debriefing is just a teams meeting",
    )

    gaming3 = Post(
        user_id=6,
        community_id=3,
        title="Imagine a Witcher game where you play as young Vesemir.",
    )

    wholesomememes1 = Post(
        user_id=10,
        community_id=4,
        title="Best friend",
    )

    wholesomememes2 = Post(
        user_id=11,
        community_id=4,
        title="Just another reason to love him",
    )

    wholesomememes3 = Post(
        user_id=5,
        community_id=4,
        title="d-don't look cute??",
    )

    dataisbeautiful1 = Post(
        user_id=8,
        community_id=5,
        title="Life expectancy at birth in Europe [OC]",
    )

    dataisbeautiful2 = Post(
        user_id=9,
        community_id=5,
        title="[OC] My 2-month long job search as a Software Engineer with 4 YEO",
    )

    dataisbeautiful3 = Post(
        user_id=1,
        community_id=5,
        title="U.S. migration trends from 2010-2020",
    )

    mildlyinfuriating1 = Post(
        user_id=2,
        community_id=6,
        title="My coworker’s phone charger. Yes it works.",
    )

    mildlyinfuriating2 = Post(
        user_id=7,
        community_id=6,
        title="The birds don't like one seed type out of my mix",
    )

    mildlyinfuriating3 = Post(
        user_id=9,
        community_id=6,
        title="The way my wife opens cereal",
    )









    db.session.add(curseofzrahd2)
    db.session.add(pokemonster1)
    db.session.add(pokemonster2)
    db.session.add(wholesomememes1)
    db.session.add(gaming1)
    db.session.add(wholesomememes2)
    db.session.add(dataisbeautiful1)
    db.session.add(curseofzrahd3)
    db.session.add(mildlyinfuriating1)
    db.session.add(dataisbeautiful2)
    db.session.add(mildlyinfuriating2)
    db.session.add(gaming2)
    db.session.add(mildlyinfuriating3)
    db.session.add(pokemonster3)
    db.session.add(dataisbeautiful3)
    db.session.add(gaming3)
    db.session.add(wholesomememes3)
    db.session.add(curseofzrahd1)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()

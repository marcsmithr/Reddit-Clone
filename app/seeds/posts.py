from app.models import db, Post, environment, SCHEMA

def seed_posts():
    curseofzrahd1 = Post(
        user_id=5
        community_id=1
        title="What does your Zrahd sound like?"
        text='''
        Just wondering how other people interpret him/play him.
        Mine cocky and has a rather pleasant but commanding American accent
        (almost like some business dude). Sometimes a bit of a British accent slips in too.
        '''
    )

    curseofzrahd2 = Post(
        user_id=3
        community_id=1
        title="What does your Zrahd sound like?"
        text='''
        Just wondering how other people interpret him/play him.
        Mine cocky and has a rather pleasant but commanding American accent
        (almost like some business dude). Sometimes a bit of a British accent slips in too.
        '''
    )

from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func

community_users = db.Table(
    "community_users",
    db.Model.metadata,
    db.Column("user_id", db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("business_id", db.ForeignKey(
        add_prefix_for_prod("communities.id")), primary_key=True)
)

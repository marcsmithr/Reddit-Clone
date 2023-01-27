"""empty message

Revision ID: 9446864f541b
Revises: b650cc770c04
Create Date: 2023-01-26 18:23:07.897425

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '9446864f541b'
down_revision = 'b650cc770c04'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('post_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.Column('url', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.alter_column('posts', 'community_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE post_images SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('posts', 'community_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_table('post_images')
    # ### end Alembic commands ###

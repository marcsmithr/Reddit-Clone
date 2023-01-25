from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Post

class CommunityForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    title = TextAreaField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    community_image = StringField('community image', validators=[DataRequired(), URL()])
    community_banner = StringField('community banner', validators=[DataRequired(), URL()])
    submit = SubmitField('submit')

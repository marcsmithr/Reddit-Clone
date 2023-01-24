from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class PostForm(FlaskForm):
    title = TextAreaField('title', validators=[DataRequired()])
    text = TextAreaField('text', validators=[DataRequired()])
    submit = SubmitField('submit')
